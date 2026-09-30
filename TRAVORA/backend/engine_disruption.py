from sqlalchemy.orm import Session
from datetime import datetime
from backend.models import Tour, ItineraryItem, ChangeEvent, AlternativeOption, Notification
from backend.engine_pricing import calculate_tour_pricing

def calculate_explainable_score(
    pref_match: int,
    budget_match: int,
    loc_match: int,
    avail_match: int,
    time_match: int
) -> int:
    """
    Explainable Multi-Criteria Scoring Formula:
    30% Preference Match + 25% Budget Match + 20% Location + 15% Availability + 10% Time Compatibility
    """
    raw_score = (
        0.30 * pref_match +
        0.25 * budget_match +
        0.20 * loc_match +
        0.15 * avail_match +
        0.10 * time_match
    )
    return int(round(raw_score))

def trigger_disruption_event(tour_id: int, db: Session, target_item_id: int = None) -> ChangeEvent:
    """
    Simulates real-world disruption on a tour (e.g. Hotel cancellation on Day 2).
    Generates impact dependency analysis and 3 ranked alternatives.
    """
    tour = db.query(Tour).filter(Tour.id == tour_id).first()
    if not tour:
        raise ValueError(f"Tour {tour_id} not found")
        
    # Find the target hotel item (prefer Day 2 hotel or first hotel)
    hotel_item = None
    if target_item_id:
        hotel_item = db.query(ItineraryItem).filter(ItineraryItem.id == target_item_id).first()
    
    if not hotel_item:
        hotel_item = db.query(ItineraryItem).filter(
            ItineraryItem.tour_id == tour.id,
            ItineraryItem.item_type == "hotel"
        ).first()
        
    if not hotel_item:
        # Fallback to any item on day 1 or 2
        hotel_item = db.query(ItineraryItem).filter(
            ItineraryItem.tour_id == tour.id
        ).first()

    if hotel_item:
        hotel_item.is_disrupted = True
        hotel_item.disruption_note = "Hotel XYZ inventory locked/cancelled for Day 2."
        hotel_item.replacement_status = "affected"

    tour.status = "attention"
    
    # Check if there is already an active pending change event for this tour
    existing_event = db.query(ChangeEvent).filter(
        ChangeEvent.tour_id == tour.id,
        ChangeEvent.status == "pending"
    ).first()
    
    if existing_event:
        return existing_event

    # Create Change Event
    change_event = ChangeEvent(
        tour_id=tour.id,
        disrupted_item_id=hotel_item.id if hotel_item else None,
        event_type="hotel_cancellation",
        status="pending",
        severity="critical",
        title="Hotel Unavailable — Day 2 Check-in Collision",
        reason="Vendor inventory lock: Hotel XYZ unable to fulfill Day 2 booking reservation.",
        impact_summary="Accommodation unavailable; Day 2 check-in affected; Minor cab rerouting required (+2.1 km); Net cost delta: +₹900.",
        affected_accommodation="Hotel XYZ (Day 2 Deluxe)",
        affected_checkin="Check-in slot delayed / needs immediate reassignment",
        affected_transport="Minor cab rerouting required (+2.1 km, ~10 min)",
        cost_delta=900.0,
        created_at=datetime.utcnow()
    )
    db.add(change_event)
    db.flush()

    # Generate 3 explainable alternatives
    alt1_score = calculate_explainable_score(92, 90, 95, 100, 94)  # 94%
    alt2_score = calculate_explainable_score(78, 98, 70, 100, 85)  # 84%
    alt3_score = calculate_explainable_score(88, 75, 82, 80, 88)   # 82%

    alt1 = AlternativeOption(
        change_event_id=change_event.id,
        title="Hotel Paradise Goa (3-Star Deluxe)",
        category="3-Star Beachfront Hotel",
        price_delta=900.0,
        distance_km=2.1,
        preference_match=92,
        budget_match=90,
        location_match=95,
        availability_match=100,
        time_match=94,
        overall_score=alt1_score,
        is_recommended=True,
        is_selected=False,
        description="Prime Baga beach proximity (250m), immediate check-in compatibility, 92% traveler style match. Minimal itinerary friction.",
        beach_proximity="250m to Baga Beach",
        checkin_compatible=True,
        image_url="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
    )

    alt2 = AlternativeOption(
        change_event_id=change_event.id,
        title="Hotel Sunset Residency",
        category="3-Star Comfort Hotel",
        price_delta=-200.0,
        distance_km=5.4,
        preference_match=78,
        budget_match=98,
        location_match=70,
        availability_match=100,
        time_match=85,
        overall_score=alt2_score,
        is_recommended=False,
        is_selected=False,
        description="Budget-friendly option saving ₹200. Located 5.4 km from initial hub with higher transport transit overhead.",
        beach_proximity="1.2 km to Calangute Beach",
        checkin_compatible=True,
        image_url="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600"
    )

    alt3 = AlternativeOption(
        change_event_id=change_event.id,
        title="Beach View Resort & Suites",
        category="3.5-Star Boutique Resort",
        price_delta=0.0,
        distance_km=3.8,
        preference_match=88,
        budget_match=75,
        location_match=82,
        availability_match=80,
        time_match=88,
        overall_score=alt3_score,
        is_recommended=False,
        is_selected=False,
        description="Equal baseline price, ocean view rooms. Check-in available only after 06:30 PM which may cause afternoon delay.",
        beach_proximity="Direct Beach Access",
        checkin_compatible=False,
        image_url="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600"
    )

    db.add_all([alt1, alt2, alt3])

    # Add Operator Alert Notification
    notif_op = Notification(
        user_id=None,
        role="operator",
        tour_id=tour.id,
        title=f"⚠️ Critical Disruption on Tour #{tour.code}",
        message=f"Hotel XYZ cancellation on Day 2 for {tour.user.name if tour.user else 'Traveler'}. Impact calculated and 3 alternatives ranked.",
        type="critical",
        is_read=False
    )
    # Add Traveler Notification
    notif_tr = Notification(
        user_id=tour.user_id,
        role="traveler",
        tour_id=tour.id,
        title="⚠️ Schedule Adjustment In Progress",
        message="A hotel availability change was detected for Day 2. Your tour operator is applying the highest-rated alternative.",
        type="warning",
        is_read=False
    )
    db.add_all([notif_op, notif_tr])
    db.commit()
    db.refresh(change_event)
    return change_event

def apply_alternative_resolution(change_event_id: int, alternative_id: int, db: Session) -> Dict[str, Any]:
    """
    Applies the chosen alternative option, modifies the itinerary item seamlessly,
    recalculates dynamic pricing, sets status to resolved, and notifies the traveler.
    """
    change_event = db.query(ChangeEvent).filter(ChangeEvent.id == change_event_id).first()
    if not change_event:
        raise ValueError("Change event not found")
        
    alt = db.query(AlternativeOption).filter(AlternativeOption.id == alternative_id).first()
    if not alt:
        raise ValueError("Alternative option not found")

    tour = db.query(Tour).filter(Tour.id == change_event.tour_id).first()
    
    # Mark alternative selection
    for other_alt in change_event.alternatives:
        other_alt.is_selected = (other_alt.id == alt.id)
        
    change_event.status = "resolved"
    change_event.resolved_at = datetime.utcnow()
    
    # Update Itinerary Item
    if change_event.disrupted_item_id:
        item = db.query(ItineraryItem).filter(ItineraryItem.id == change_event.disrupted_item_id).first()
        if item:
            item.title = f"Check-in at {alt.title}"
            item.subtitle = f"Upgraded alternative with {alt.beach_proximity} • Check-in synchronized"
            item.cost = max(0.0, item.cost + alt.price_delta)
            item.is_disrupted = False
            item.disruption_note = None
            item.replacement_status = "replaced"
            item.lat = 15.5528
            item.lng = 73.7516
            
    # Recalculate Tour total
    items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour.id).all()
    pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
    tour.estimated_cost = pricing["total"]
    tour.status = "active"

    # Push Success Notifications
    notif_tr = Notification(
        user_id=tour.user_id,
        role="traveler",
        tour_id=tour.id,
        title="✓ Your Itinerary Has Been Updated",
        message=f"Hotel confirmed: {alt.title}. Seamlessly integrated into Day 2 with zero schedule friction.",
        type="success",
        is_read=False
    )
    notif_op = Notification(
        user_id=None,
        role="operator",
        tour_id=tour.id,
        title=f"✓ Tour #{tour.code} Disruption Resolved",
        message=f"Applied {alt.title} ({alt.overall_score}% match). Itinerary, pricing, and traveler views synchronized.",
        type="success",
        is_read=False
    )
    db.add_all([notif_tr, notif_op])
    db.commit()
    db.refresh(tour)
    
    return {
        "success": True,
        "message": f"Successfully applied {alt.title}",
        "tour_code": tour.code,
        "new_estimated_cost": tour.estimated_cost,
        "pricing": pricing
    }
