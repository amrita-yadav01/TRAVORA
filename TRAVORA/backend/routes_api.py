from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from datetime import datetime
import random

from backend.database import get_db
from backend.models import (
    User, Destination, Hotel, Activity, Transport, Tour, ItineraryItem,
    ChangeEvent, AlternativeOption, Booking, Payment, Vendor, TourGroup, Review, Notification
)
from backend.schemas import (
    RegisterRequest, LoginRequest, ResetPasswordRequest, PlanTripRequest, TourSummaryResponse, TourDetailResponse,
    AddItineraryItemRequest, UpdateItemRequest, ApplyAlternativeRequest, BookTourRequest,
    AIChatRequest, ReviewRequest
)
from backend.auth_utils import hash_password, verify_password
from backend.engine_recommendation import (
    generate_personalized_itinerary_items, match_operators_for_tour,
    sense_places_and_personalize, LANDMARKS_CATALOG
)
from backend.engine_pricing import calculate_tour_pricing
from backend.engine_disruption import trigger_disruption_event, apply_alternative_resolution
from backend.engine_assistant import process_ai_assistant_query
from backend.sync_hook import auto_sync_database_views

router = APIRouter(prefix="/api")

# ==============================================================================
# AUTHENTICATION & USER MANAGEMENT (STRICT CREDENTIAL MATCHING & ROLE SUPPORT)
# ==============================================================================

@router.post("/auth/register")
def register_user(payload: RegisterRequest, db: Session = Depends(get_db)):
    email_clean = payload.email.strip().lower()
    if not email_clean or not payload.password:
        raise HTTPException(status_code=400, detail="Email and password are required")
    
    if len(payload.password) < 4:
        raise HTTPException(status_code=400, detail="Password must be at least 4 characters long")
        
    existing = db.query(User).filter(User.email.ilike(email_clean)).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email address already exists. Please log in.")

    is_op = payload.role == "operator"
    new_user = User(
        name=payload.name.strip(),
        email=email_clean,
        role="operator" if is_op else "traveler",
        password_hash=hash_password(payload.password),
        phone=payload.phone.strip() if payload.phone else "+91 98765 43210",
        company_name=payload.company_name.strip() if (payload.company_name and payload.company_name.strip()) else (f"{payload.name.strip()} Tour Expeditions" if is_op else None),
        specialties=payload.specialties.strip() if payload.specialties else ("Custom Tours, Sightseeing, Adventure" if is_op else None),
        operating_destinations=payload.operating_destinations.strip() if payload.operating_destinations else ("Goa, Jaipur, Kerala, Manali" if is_op else None),
        fleet_size=payload.fleet_size.strip() if payload.fleet_size else ("8 Multi-Axle Vehicles" if is_op else None),
        rating=4.9 if is_op else 4.8,
        tours_completed=25 if is_op else 0,
        response_time_minutes=3 if is_op else 5,
        badge="New Verified Operator" if is_op else "Verified Traveler",
        bio=payload.bio.strip() if payload.bio else (f"Certified Tour Operator based in {payload.operating_destinations or 'India'}." if is_op else None),
        created_at=datetime.utcnow()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    auto_sync_database_views()

    return {
        "success": True,
        "message": "Account created successfully! Welcome to TRAVORA.",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role,
            "phone": new_user.phone,
            "company_name": new_user.company_name,
            "specialties": new_user.specialties,
            "operating_destinations": new_user.operating_destinations
        }
    }

@router.post("/auth/login")
def login_user(payload: LoginRequest, db: Session = Depends(get_db)):
    email_clean = payload.email.strip().lower()
    user = db.query(User).filter(User.email.ilike(email_clean)).first()
    
    if not user:
        raise HTTPException(
            status_code=401, 
            detail="Account not found or has been deleted. Please create a new account to continue."
        )

    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid password. Please verify your credentials.")

    # If specific role requested, verify role compatibility
    if payload.role and payload.role != user.role:
        raise HTTPException(
            status_code=401, 
            detail=f"This account is registered as a {user.role.capitalize()}. Please select '{user.role.capitalize()}' mode to sign in."
        )

    return {
        "success": True,
        "message": f"Welcome back, {user.name}!",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "phone": user.phone,
            "company_name": user.company_name,
            "specialties": user.specialties,
            "operating_destinations": user.operating_destinations
        }
    }

@router.post("/auth/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    email_clean = payload.email.strip().lower()
    if not email_clean:
        raise HTTPException(status_code=400, detail="Registered email address is required")
        
    if not payload.new_password or len(payload.new_password) < 4:
        raise HTTPException(status_code=400, detail="New password must be at least 4 characters long")

    user = db.query(User).filter(User.email.ilike(email_clean)).first()
    if not user:
        raise HTTPException(
            status_code=404, 
            detail="No account found with this email address. Please check and enter your correct registered email."
        )

    user.password_hash = hash_password(payload.new_password)
    db.commit()

    auto_sync_database_views()

    return {
        "success": True,
        "message": f"Password updated successfully for {user.name}! You can now sign in with your new password.",
        "email": user.email
    }

@router.put("/auth/profile")
def update_user_profile(payload: Dict[str, Any], db: Session = Depends(get_db)):
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
        
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    name = payload.get("name")
    email = payload.get("email")
    phone = payload.get("phone")
    new_password = payload.get("new_password")
    
    if name and name.strip():
        user.name = name.strip()
        
    if email and email.strip():
        email_clean = email.strip().lower()
        existing = db.query(User).filter(User.email.ilike(email_clean), User.id != user.id).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email address is already in use by another account")
        user.email = email_clean
        
    if phone is not None:
        user.phone = phone.strip()
        
    if new_password and new_password.strip():
        if len(new_password.strip()) < 4:
            raise HTTPException(status_code=400, detail="New password must be at least 4 characters long")
        user.password_hash = hash_password(new_password.strip())
        
    db.commit()
    db.refresh(user)
    
    auto_sync_database_views()
    
    return {
        "success": True,
        "message": "Profile updated successfully!",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "phone": user.phone
        }
    }

@router.post("/auth/delete-account")
def delete_account(payload: Dict[str, Any], db: Session = Depends(get_db)):
    user_id = payload.get("user_id")
    user_email = payload.get("email")
    
    user = None
    if user_id:
        user = db.query(User).filter(User.id == user_id).first()
    elif user_email:
        user = db.query(User).filter(User.email.ilike(user_email.strip())).first()
        
    if not user:
        raise HTTPException(status_code=404, detail="Account not found or already deleted")

    user_name = user.name
    
    # Delete associated child records safely
    user_tours = db.query(Tour).filter(Tour.user_id == user.id).all()
    for t in user_tours:
        db.query(ItineraryItem).filter(ItineraryItem.tour_id == t.id).delete()
        db.query(ChangeEvent).filter(ChangeEvent.tour_id == t.id).delete()
        db.query(Booking).filter(Booking.tour_id == t.id).delete()
        db.delete(t)
        
    db.query(Notification).filter(Notification.user_id == user.id).delete()
    db.query(Review).filter(Review.user_id == user.id).delete()
    db.query(Booking).filter(Booking.user_id == user.id).delete()
    
    db.delete(user)
    db.commit()
    
    auto_sync_database_views()
    
    return {
        "success": True,
        "message": f"Account for '{user_name}' has been deleted permanently. You will need to create a new account to sign in."
    }

@router.delete("/users/{user_id}")
def delete_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_name = user.name
    user_tours = db.query(Tour).filter(Tour.user_id == user.id).all()
    for t in user_tours:
        db.query(ItineraryItem).filter(ItineraryItem.tour_id == t.id).delete()
        db.query(ChangeEvent).filter(ChangeEvent.tour_id == t.id).delete()
        db.query(Booking).filter(Booking.tour_id == t.id).delete()
        db.delete(t)
        
    db.query(Notification).filter(Notification.user_id == user.id).delete()
    db.query(Review).filter(Review.user_id == user.id).delete()
    db.query(Booking).filter(Booking.user_id == user.id).delete()
    
    db.delete(user)
    db.commit()
    
    auto_sync_database_views()
    return {"success": True, "message": f"User '{user_name}' deleted permanently"}

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "role": u.role,
        "phone": u.phone,
        "created_at": u.created_at
    } for u in users]

# ==============================================================================
# DESTINATIONS
# ==============================================================================

@router.get("/destinations")
def get_destinations(db: Session = Depends(get_db)):
    return db.query(Destination).all()

@router.get("/destinations/{dest_id}")
def get_destination_detail(dest_id: int, db: Session = Depends(get_db)):
    dest = db.query(Destination).filter(Destination.id == dest_id).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    hotels = db.query(Hotel).filter(Hotel.destination_id == dest.id).all()
    activities = db.query(Activity).filter(Activity.destination_id == dest.id).all()
    transports = db.query(Transport).filter(Transport.to_destination_id == dest.id).all()
    return {
        "destination": dest,
        "hotels": hotels,
        "activities": activities,
        "transports": transports
    }

@router.get("/landmarks")
def get_landmarks():
    """Returns curated landmark database categorized by destination for real-time sensing."""
    return LANDMARKS_CATALOG

# ==============================================================================
# TOUR OPERATORS & AI MATCHMAKING
# ==============================================================================

@router.get("/operators")
def get_operators(destination: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(User).filter(User.role == "operator")
    operators = query.all()
    results = []
    for op in operators:
        results.append({
            "id": op.id,
            "name": op.name,
            "company_name": op.company_name or op.name,
            "email": op.email,
            "phone": op.phone or "+91 98765 43210",
            "rating": op.rating or 4.8,
            "tours_completed": op.tours_completed or 120,
            "fleet_size": op.fleet_size or "12 Vehicles",
            "response_time_minutes": op.response_time_minutes or 5,
            "badge": op.badge or "Verified Partner",
            "bio": op.bio or "Certified tour operator partner delivering personalized travel experiences.",
            "specialties": [s.strip() for s in (op.specialties or "").split(",") if s.strip()],
            "operating_destinations": [d.strip() for d in (op.operating_destinations or "").split(",") if d.strip()]
        })
    return results

@router.post("/operators/match")
def match_operators_endpoint(payload: PlanTripRequest, db: Session = Depends(get_db)):
    sensed_places = list(payload.desired_places or [])
    if payload.custom_places_text:
        sensed_places.extend([p.strip() for p in payload.custom_places_text.split(",") if p.strip()])
        
    matches = match_operators_for_tour(
        destination_name=payload.destination_name,
        travel_style=payload.travel_style,
        interests=payload.interests,
        budget_total=payload.budget_total,
        desired_places=sensed_places,
        db=db
    )
    return matches

@router.post("/places/sense")
def sense_places_endpoint(payload: PlanTripRequest, db: Session = Depends(get_db)):
    sensed_places = list(payload.desired_places or [])
    if payload.custom_places_text:
        sensed_places.extend([p.strip() for p in payload.custom_places_text.split(",") if p.strip()])

    result = sense_places_and_personalize(
        destination_name=payload.destination_name,
        desired_places=sensed_places,
        travel_style=payload.travel_style,
        db=db
    )
    return result

# ==============================================================================
# TOUR PLANNING & ITINERARY GENERATION (WITH AI OPERATOR & REAL-TIME SENSING)
# ==============================================================================

@router.post("/tours/plan")
def plan_custom_tour(payload: PlanTripRequest, db: Session = Depends(get_db)):
    dest = db.query(Destination).filter(Destination.name.ilike(f"%{payload.destination_name}%")).first()
    if not dest:
        dest = db.query(Destination).first()
        
    user = db.query(User).filter(User.id == payload.user_id).first()
    if not user:
        user = db.query(User).filter(User.role == "traveler").first()
        
    try:
        d1 = datetime.strptime(payload.start_date, "%Y-%m-%d")
        d2 = datetime.strptime(payload.end_date, "%Y-%m-%d")
        duration = max(1, (d2 - d1).days + 1)
    except Exception:
        duration = 4

    tour_code = f"TR{random.randint(1030, 9999)}"
    
    # Extract sensed desired places
    sensed_places = list(payload.desired_places or [])
    if payload.custom_places_text:
        sensed_places.extend([p.strip() for p in payload.custom_places_text.split(",") if p.strip()])

    # Operator Matching Logic
    chosen_operator = None
    ai_reason = None
    if payload.operator_id:
        chosen_operator = db.query(User).filter(User.id == payload.operator_id, User.role == "operator").first()

    matched_ops = match_operators_for_tour(
        destination_name=dest.name,
        travel_style=payload.travel_style,
        interests=payload.interests,
        budget_total=payload.budget_total,
        desired_places=sensed_places,
        db=db
    )

    if not chosen_operator and matched_ops:
        top_op = matched_ops[0]
        chosen_operator = db.query(User).filter(User.id == top_op["id"]).first()
        ai_reason = top_op["ai_recommendation_reason"]
    elif chosen_operator:
        # Find match reason for the user's explicitly chosen operator
        matching_entry = next((m for m in matched_ops if m["id"] == chosen_operator.id), None)
        if matching_entry:
            ai_reason = f"⭐ Selected Partner ({matching_entry['match_score']}% Match): {chosen_operator.company_name or chosen_operator.name} assigned for {dest.name} {payload.travel_style}."

    if not chosen_operator:
        chosen_operator = db.query(User).filter(User.role == "operator").first()

    operator_name = chosen_operator.name if chosen_operator else "Aarav Mehta"
    operator_id = chosen_operator.id if chosen_operator else None
    
    if not ai_reason:
        ai_reason = f"🏆 Recommended Partner: {chosen_operator.company_name if chosen_operator else operator_name} assigned with {chosen_operator.rating if chosen_operator else 4.9}★ rating and 5-min dispatch."

    items_data = generate_personalized_itinerary_items(
        destination_name=dest.name,
        duration_days=duration,
        travel_style=payload.travel_style,
        interests=payload.interests,
        accommodation_type=payload.accommodation_type,
        transport_type=payload.transport_type,
        travelers_count=payload.travelers_count,
        desired_places=sensed_places
    )
    
    class DummyItem:
        def __init__(self, item_type, cost):
            self.item_type = item_type
            self.cost = cost
    dummy_items = [DummyItem(it["item_type"], it["cost"]) for it in items_data]
    pricing = calculate_tour_pricing(dummy_items, payload.budget_total, payload.travelers_count)

    new_tour = Tour(
        code=tour_code,
        user_id=user.id if user else 1,
        destination_id=dest.id,
        operator_id=operator_id,
        title=f"{dest.name} Personalized Discovery",
        duration_days=duration,
        travelers_count=payload.travelers_count,
        budget_total=payload.budget_total,
        estimated_cost=pricing["total"],
        status="planned",
        travel_style=payload.travel_style,
        accommodation_type=payload.accommodation_type,
        transport_type=payload.transport_type,
        start_date=payload.start_date,
        end_date=payload.end_date,
        match_percentage=random.randint(92, 98),
        coordinator_name=operator_name,
        desired_places=", ".join(sensed_places) if sensed_places else None,
        ai_recommendation_reason=ai_reason
    )
    db.add(new_tour)
    db.flush()

    for it in items_data:
        item = ItineraryItem(
            tour_id=new_tour.id,
            day_number=it["day_number"],
            item_type=it["item_type"],
            title=it["title"],
            subtitle=it.get("subtitle"),
            time_start=it["time_start"],
            time_end=it["time_end"],
            cost=it["cost"],
            location_name=it["location_name"],
            lat=it["lat"],
            lng=it["lng"],
            icon=it.get("icon", "map-pin"),
            order_index=it["order_index"]
        )
        db.add(item)
    
    db.commit()
    db.refresh(new_tour)
    
    auto_sync_database_views()
    
    return {
        "success": True,
        "tour_id": new_tour.id,
        "code": new_tour.code,
        "operator": {
            "id": operator_id,
            "name": operator_name,
            "company_name": chosen_operator.company_name if chosen_operator else operator_name,
            "rating": chosen_operator.rating if chosen_operator else 4.9,
            "phone": chosen_operator.phone if chosen_operator else "+91 98200 11223",
            "ai_reason": ai_reason
        },
        "desired_places": sensed_places,
        "pricing": pricing
    }

# ==============================================================================
# TOURS LIST & DETAIL
# ==============================================================================

@router.get("/tours")
def get_tours(status: Optional[str] = None, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Tour)
    if status:
        query = query.filter(Tour.status == status)
    if user_id:
        query = query.filter(Tour.user_id == user_id)
    tours = query.order_by(Tour.id.desc()).all()
    
    results = []
    for t in tours:
        results.append({
            "id": t.id,
            "code": t.code,
            "title": t.title,
            "destination_name": t.destination.name if t.destination else "Goa",
            "duration_days": t.duration_days,
            "travelers_count": t.travelers_count,
            "budget_total": t.budget_total,
            "estimated_cost": t.estimated_cost,
            "status": t.status,
            "travel_style": t.travel_style,
            "accommodation_type": t.accommodation_type,
            "transport_type": t.transport_type,
            "start_date": t.start_date,
            "end_date": t.end_date,
            "match_percentage": t.match_percentage,
            "coordinator_name": t.coordinator_name,
            "operator_id": t.operator_id,
            "operator_name": t.operator.name if t.operator else t.coordinator_name,
            "operator_company": t.operator.company_name if (t.operator and t.operator.company_name) else t.coordinator_name,
            "desired_places": t.desired_places,
            "ai_recommendation_reason": t.ai_recommendation_reason,
            "customer_name": t.user.name if t.user else "Krishna Singh",
            "customer_email": t.user.email if t.user else "traveler@travora.demo"
        })
    return results

@router.delete("/tours/{tour_id}")
def delete_tour_by_id(tour_id: int, db: Session = Depends(get_db)):
    tour = db.query(Tour).filter(Tour.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
        
    tour_title = tour.title
    tour_code = tour.code
    
    # Delete child records
    db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour.id).delete()
    db.query(ChangeEvent).filter(ChangeEvent.tour_id == tour.id).delete()
    db.query(Booking).filter(Booking.tour_id == tour.id).delete()
    db.query(Review).filter(Review.tour_id == tour.id).delete()
    db.query(Notification).filter(Notification.tour_id == tour.id).delete()
    
    db.delete(tour)
    db.commit()
    
    auto_sync_database_views()
    
    return {
        "success": True,
        "message": f"Planned itinerary '{tour_code} ({tour_title})' was deleted successfully."
    }

@router.get("/tours/{tour_id}")
def get_tour_detail(tour_id: int, db: Session = Depends(get_db)):
    tour = db.query(Tour).filter(Tour.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
        
    items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour.id).order_by(ItineraryItem.day_number, ItineraryItem.order_index, ItineraryItem.id).all()
    pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
    
    change_events = db.query(ChangeEvent).filter(ChangeEvent.tour_id == tour.id).order_by(ChangeEvent.id.desc()).all()
    
    events_data = []
    for ce in change_events:
        alts_data = []
        for alt in ce.alternatives:
            alts_data.append({
                "id": alt.id,
                "title": alt.title,
                "category": alt.category,
                "price_delta": alt.price_delta,
                "distance_km": alt.distance_km,
                "preference_match": alt.preference_match,
                "budget_match": alt.budget_match,
                "location_match": alt.location_match,
                "availability_match": alt.availability_match,
                "time_match": alt.time_match,
                "overall_score": alt.overall_score,
                "is_recommended": alt.is_recommended,
                "is_selected": alt.is_selected,
                "description": alt.description,
                "beach_proximity": alt.beach_proximity,
                "checkin_compatible": alt.checkin_compatible,
                "image_url": alt.image_url
            })
        events_data.append({
            "id": ce.id,
            "tour_id": ce.tour_id,
            "disrupted_item_id": ce.disrupted_item_id,
            "event_type": ce.event_type,
            "status": ce.status,
            "severity": ce.severity,
            "title": ce.title,
            "reason": ce.reason,
            "impact_summary": ce.impact_summary,
            "affected_accommodation": ce.affected_accommodation,
            "affected_checkin": ce.affected_checkin,
            "affected_transport": ce.affected_transport,
            "cost_delta": ce.cost_delta,
            "created_at": ce.created_at,
            "alternatives": alts_data
        })
    
    booking = db.query(Booking).filter(Booking.tour_id == tour.id).first()
    
    return {
        "id": tour.id,
        "code": tour.code,
        "title": tour.title,
        "destination_name": tour.destination.name if tour.destination else "Goa",
        "destination_lat": tour.destination.lat if tour.destination else 15.2993,
        "destination_lng": tour.destination.lng if tour.destination else 74.1240,
        "duration_days": tour.duration_days,
        "travelers_count": tour.travelers_count,
        "budget_total": tour.budget_total,
        "estimated_cost": tour.estimated_cost,
        "status": tour.status,
        "travel_style": tour.travel_style,
        "accommodation_type": tour.accommodation_type,
        "transport_type": tour.transport_type,
        "start_date": tour.start_date,
        "end_date": tour.end_date,
        "match_percentage": tour.match_percentage,
        "coordinator_name": tour.coordinator_name,
        "operator_id": tour.operator_id,
        "operator_name": tour.operator.name if tour.operator else tour.coordinator_name,
        "operator_company": tour.operator.company_name if (tour.operator and tour.operator.company_name) else tour.coordinator_name,
        "operator_phone": tour.operator.phone if (tour.operator and tour.operator.phone) else "+91 98200 11223",
        "operator_rating": tour.operator.rating if (tour.operator and tour.operator.rating) else 4.9,
        "desired_places": tour.desired_places,
        "ai_recommendation_reason": tour.ai_recommendation_reason,
        "customer_name": tour.user.name if tour.user else "Krishna Singh",
        "customer_email": tour.user.email if tour.user else "traveler@travora.demo",
        "customer_phone": tour.user.phone if tour.user else "+91 98765 43210",
        "booking_code": booking.booking_code if booking else "BK-PENDING",
        "is_booked": booking is not None,
        "itinerary_items": items,
        "change_events": events_data,
        "pricing": pricing
    }

# ==============================================================================
# INTERACTIVE ITINERARY MUTATION
# ==============================================================================

@router.post("/tours/{tour_id}/add-item")
def add_itinerary_item(tour_id: int, payload: AddItineraryItemRequest, db: Session = Depends(get_db)):
    tour = db.query(Tour).filter(Tour.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
        
    last_item = db.query(ItineraryItem).filter(
        ItineraryItem.tour_id == tour_id,
        ItineraryItem.day_number == payload.day_number
    ).order_by(ItineraryItem.order_index.desc()).first()
    
    next_order = (last_item.order_index + 1) if last_item else 1
    
    dest_name = tour.destination.name if tour.destination else "Experience"
    dest_lat = tour.destination.lat if tour.destination else 15.2993
    dest_lng = tour.destination.lng if tour.destination else 74.1240
    
    new_item = ItineraryItem(
        tour_id=tour_id,
        day_number=payload.day_number,
        order_index=next_order,
        item_type=payload.item_type,
        title=payload.title,
        subtitle=payload.subtitle or f"Curated {payload.item_type.capitalize()} on Day {payload.day_number}",
        time_start=payload.time_start or "02:00 PM",
        time_end=payload.time_end or "04:30 PM",
        cost=float(payload.cost),
        location_name=payload.location_name or f"{dest_name} Center",
        lat=payload.latitude if payload.latitude is not None else dest_lat,
        lng=payload.longitude if payload.longitude is not None else dest_lng,
        icon=payload.icon or "sparkles",
        is_disrupted=False,
        replacement_status="normal"
    )
    db.add(new_item)
    db.flush()
    
    # Recalculate tour pricing
    items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour_id).all()
    pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
    tour.estimated_cost = pricing["total"]
    db.commit()
    db.refresh(new_item)
    
    auto_sync_database_views()
    
    return {
        "success": True,
        "message": f"Added '{new_item.title}' to Day {new_item.day_number} itinerary.",
        "item": {
            "id": new_item.id,
            "day_number": new_item.day_number,
            "item_type": new_item.item_type,
            "title": new_item.title,
            "cost": new_item.cost
        },
        "pricing": pricing
    }

@router.put("/tours/{tour_id}/update-item")
def update_itinerary_component(tour_id: int, payload: UpdateItemRequest, db: Session = Depends(get_db)):
    tour = db.query(Tour).filter(Tour.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
        
    item = db.query(ItineraryItem).filter(ItineraryItem.id == payload.item_id, ItineraryItem.tour_id == tour.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Itinerary item not found")
        
    if payload.new_title:
        item.title = payload.new_title
    if payload.new_cost is not None:
        item.cost = payload.new_cost
    if payload.new_time_start:
        item.time_start = payload.new_time_start
    if payload.new_time_end:
        item.time_end = payload.new_time_end
    if payload.new_item_type:
        item.item_type = payload.new_item_type

    db.flush()
    
    items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour.id).all()
    pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
    tour.estimated_cost = pricing["total"]
    db.commit()
    
    auto_sync_database_views()
    
    return {
        "success": True,
        "message": "Itinerary item updated successfully",
        "pricing": pricing,
        "updated_item": item
    }

@router.delete("/tours/{tour_id}/items/{item_id}")
def delete_itinerary_item(tour_id: int, item_id: int, db: Session = Depends(get_db)):
    item = db.query(ItineraryItem).filter(ItineraryItem.id == item_id, ItineraryItem.tour_id == tour_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.flush()
    
    tour = db.query(Tour).filter(Tour.id == tour_id).first()
    items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour_id).all()
    pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
    tour.estimated_cost = pricing["total"]
    db.commit()
    
    auto_sync_database_views()
    
    return {"success": True, "pricing": pricing}

# ==============================================================================
# DISRUPTION SIMULATION & APPROVAL WORKFLOW
# ==============================================================================

@router.post("/tours/{tour_id}/disrupt")
def simulate_disruption(tour_id: int, db: Session = Depends(get_db)):
    try:
        change_event = trigger_disruption_event(tour_id=tour_id, db=db)
        auto_sync_database_views()
        return {
            "success": True,
            "message": "Disruption detected and impact analysis generated.",
            "change_event_id": change_event.id,
            "tour_id": tour_id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/changes/apply")
def apply_change_alternative(payload: ApplyAlternativeRequest, db: Session = Depends(get_db)):
    try:
        result = apply_alternative_resolution(
            change_event_id=payload.change_event_id,
            alternative_id=payload.alternative_id,
            db=db
        )
        auto_sync_database_views()
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ==============================================================================
# BOOKINGS & PAYMENTS
# ==============================================================================

@router.post("/tours/book")
def book_tour(payload: BookTourRequest, db: Session = Depends(get_db)):
    tour = db.query(Tour).filter(Tour.id == payload.tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
        
    user = db.query(User).filter(User.id == payload.user_id).first()
    if not user:
        user = db.query(User).filter(User.role == "traveler").first()
        
    existing_booking = db.query(Booking).filter(Booking.tour_id == tour.id).first()
    if existing_booking:
        return {
            "success": True,
            "message": "Tour already booked",
            "booking_code": existing_booking.booking_code,
            "amount_paid": existing_booking.amount_paid
        }
        
    booking_code = f"BK-{tour.code}-{random.randint(10, 99)}"
    new_booking = Booking(
        booking_code=booking_code,
        tour_id=tour.id,
        user_id=user.id,
        amount_paid=tour.estimated_cost,
        payment_status="completed",
        booking_status="confirmed"
    )
    db.add(new_booking)
    db.flush()
    
    items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour.id).all()
    pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
    
    payment = Payment(
        booking_id=new_booking.id,
        subtotal=pricing["subtotal"],
        taxes=pricing["taxes"],
        service_fee=pricing["service_fee"],
        discount=0.0,
        total=pricing["total"],
        method=payload.payment_method,
        status="Success",
        transaction_ref=f"TXN-TRV-{random.randint(10000, 99999)}"
    )
    db.add(payment)
    
    tour.status = "booked"
    
    notif = Notification(
        user_id=user.id,
        role="traveler",
        tour_id=tour.id,
        title="🎉 Booking Successful!",
        message=f"Your trip to {tour.destination.name if tour.destination else 'Goa'} is confirmed. Booking Code: {booking_code}",
        type="success"
    )
    db.add(notif)
    db.commit()
    
    auto_sync_database_views()
    
    return {
        "success": True,
        "booking_code": booking_code,
        "amount_paid": pricing["total"],
        "transaction_ref": payment.transaction_ref
    }

# ==============================================================================
# OPERATOR DASHBOARD & ANALYTICS
# ==============================================================================

@router.get("/operator/dashboard")
def get_operator_dashboard(db: Session = Depends(get_db)):
    active_tours_count = db.query(Tour).filter(Tour.status.in_(["active", "booked"])).count()
    attention_tours_count = db.query(Tour).filter(Tour.status.in_(["attention", "disrupted"])).count()
    pending_changes_count = db.query(ChangeEvent).filter(ChangeEvent.status == "pending").count()
    
    tours = db.query(Tour).order_by(Tour.id.desc()).all()
    tours_list = []
    for t in tours:
        tours_list.append({
            "id": t.id,
            "code": t.code,
            "customer_name": t.user.name if t.user else "Krishna Singh",
            "destination": t.destination.name if t.destination else "Goa",
            "dates": f"{t.start_date[5:]} to {t.end_date[5:]}",
            "coordinator": t.coordinator_name,
            "status": t.status,
            "travelers": t.travelers_count,
            "budget": t.budget_total,
            "cost": t.estimated_cost
        })
        
    return {
        "kpis": {
            "active_tours": 24,
            "live_active": active_tours_count,
            "today_checkins": 8,
            "pending_changes": pending_changes_count,
            "alerts": attention_tours_count + pending_changes_count,
            "revenue": "₹4.2L",
            "resolution_time": "8 min",
            "success_rate": "94%"
        },
        "active_tours": tours_list
    }

@router.get("/operator/alerts")
def get_operator_alerts(db: Session = Depends(get_db)):
    changes = db.query(ChangeEvent).order_by(ChangeEvent.id.desc()).all()
    results = []
    for c in changes:
        results.append({
            "id": c.id,
            "tour_id": c.tour_id,
            "tour_code": c.tour.code if c.tour else f"TR{1000 + c.tour_id}",
            "customer_name": c.tour.user.name if (c.tour and c.tour.user) else "Krishna Singh",
            "title": c.title,
            "reason": c.reason,
            "severity": c.severity,
            "status": c.status,
            "impact_summary": c.impact_summary,
            "cost_delta": c.cost_delta,
            "created_at": str(c.created_at) if c.created_at else ""
        })
    return results

@router.get("/operator/vendors")
def get_vendors(db: Session = Depends(get_db)):
    return db.query(Vendor).all()

@router.get("/operator/groups")
def get_tour_groups(db: Session = Depends(get_db)):
    return db.query(TourGroup).all()

@router.get("/operator/analytics")
def get_operator_analytics(db: Session = Depends(get_db)):
    return {
        "overview": {
            "total_booking_value": 420000.0,
            "active_tours": 24,
            "successful_operations_rate": 93.8,
            "changes_handled": 14,
            "avg_resolution_minutes": 7.6,
            "satisfaction_rating": 4.9
        },
        "destinations_share": [
            {"name": "Goa", "share": 38, "revenue": 160000},
            {"name": "Kerala", "share": 24, "revenue": 105000},
            {"name": "Jaipur", "share": 18, "revenue": 78000},
            {"name": "Manali", "share": 12, "revenue": 52000},
            {"name": "Others", "share": 8, "revenue": 25000}
        ],
        "activity_performance": [
            {"name": "Scuba Diving & Watersports", "bookings": 42, "rating": 4.9},
            {"name": "Fort Aguada Heritage", "bookings": 38, "rating": 4.7},
            {"name": "Sunset Mandovi Cruise", "bookings": 35, "rating": 4.8},
            {"name": "Latin Quarter Heritage Walk", "bookings": 29, "rating": 4.6}
        ],
        "disruption_causes": [
            {"cause": "Hotel Room Inventory Locks", "count": 8, "pct": 57},
            {"cause": "Flight / Bus Schedule Delays", "count": 4, "pct": 28},
            {"cause": "Weather Adjustments", "count": 2, "pct": 15}
        ]
    }

# ==============================================================================
# AI ASSISTANT
# ==============================================================================

@router.post("/ai/chat")
def ai_assistant_chat(payload: AIChatRequest, db: Session = Depends(get_db)):
    response = process_ai_assistant_query(
        query=payload.message,
        tour_id=payload.tour_id,
        db=db
    )
    return response

# ==============================================================================
# NOTIFICATIONS & REVIEWS
# ==============================================================================

@router.get("/notifications")
def get_notifications(role: str = "traveler", user_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Notification)
    if role == "traveler" and user_id:
        query = query.filter((Notification.user_id == user_id) | (Notification.role == "traveler"))
    elif role == "operator":
        query = query.filter(Notification.role.in_(["operator", "all"]))
    notifs = query.order_by(Notification.id.desc()).limit(15).all()
    return notifs

@router.post("/notifications/mark-read")
def mark_notifications_read(db: Session = Depends(get_db)):
    db.query(Notification).update({Notification.is_read: True})
    db.commit()
    return {"success": True}

@router.post("/reviews")
def submit_review(payload: ReviewRequest, db: Session = Depends(get_db)):
    review = Review(
        tour_id=payload.tour_id,
        user_id=payload.user_id,
        overall_rating=payload.overall_rating,
        hotel_rating=payload.hotel_rating,
        activity_rating=payload.activity_rating,
        transport_rating=payload.transport_rating,
        operator_rating=payload.operator_rating,
        comment=payload.comment
    )
    db.add(review)
    db.commit()
    
    auto_sync_database_views()
    
    return {"success": True, "message": "Thank you! Your feedback helps us continually adapt and improve."}

# ==============================================================================
# PROGRAMMATIC CRUD ENDPOINTS
# ==============================================================================

@router.get("/crud/stats")
def get_crud_database_stats(db: Session = Depends(get_db)):
    return {
        "users": db.query(User).count(),
        "destinations": db.query(Destination).count(),
        "hotels": db.query(Hotel).count(),
        "activities": db.query(Activity).count(),
        "transports": db.query(Transport).count(),
        "tours": db.query(Tour).count(),
        "itinerary_items": db.query(ItineraryItem).count(),
        "vendors": db.query(Vendor).count(),
        "tour_groups": db.query(TourGroup).count(),
        "bookings": db.query(Booking).count(),
        "change_events": db.query(ChangeEvent).count(),
        "reviews": db.query(Review).count(),
        "notifications": db.query(Notification).count()
    }

@router.get("/crud/users")
def crud_get_users(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.id.desc()).all()
    return [{
        "id": u.id, "name": u.name, "email": u.email, "role": u.role, "phone": u.phone,
        "created_at": u.created_at.strftime("%Y-%m-%d %H:%M") if u.created_at else ""
    } for u in users]

@router.post("/crud/users")
def crud_create_user(payload: Dict[str, Any], db: Session = Depends(get_db)):
    email_clean = payload.get("email", "").strip().lower()
    if not email_clean:
        raise HTTPException(status_code=400, detail="Email is required")
    existing = db.query(User).filter(User.email.ilike(email_clean)).first()
    if existing:
        raise HTTPException(status_code=400, detail="User email already exists")
    
    password = payload.get("password", "password123")
    user = User(
        name=payload.get("name", "New User"),
        email=email_clean,
        role=payload.get("role", "traveler"),
        password_hash=hash_password(password),
        phone=payload.get("phone", "+91 98765 43210"),
        created_at=datetime.utcnow()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    auto_sync_database_views()
    return {"success": True, "message": "User created successfully", "id": user.id}

@router.put("/crud/users/{user_id}")
def crud_update_user(user_id: int, payload: Dict[str, Any], db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if "name" in payload: user.name = payload["name"]
    if "role" in payload: user.role = payload["role"]
    if "phone" in payload: user.phone = payload["phone"]
    if "password" in payload and payload["password"]:
        user.password_hash = hash_password(payload["password"])
    db.commit()
    auto_sync_database_views()
    return {"success": True, "message": "User updated successfully"}

@router.delete("/crud/users/{user_id}")
def crud_delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_tours = db.query(Tour).filter(Tour.user_id == user.id).all()
    for t in user_tours:
        db.query(ItineraryItem).filter(ItineraryItem.tour_id == t.id).delete()
        db.query(ChangeEvent).filter(ChangeEvent.tour_id == t.id).delete()
        db.query(Booking).filter(Booking.tour_id == t.id).delete()
        db.delete(t)
        
    db.query(Notification).filter(Notification.user_id == user.id).delete()
    db.query(Review).filter(Review.user_id == user.id).delete()
    db.query(Booking).filter(Booking.user_id == user.id).delete()
    
    db.delete(user)
    db.commit()
    auto_sync_database_views()
    return {"success": True, "message": "User deleted"}

@router.get("/crud/destinations")
def crud_get_destinations(db: Session = Depends(get_db)):
    dests = db.query(Destination).all()
    return [{
        "id": d.id, "name": d.name, "state": d.state, "description": d.description,
        "starting_price": d.starting_price, "travel_styles": d.travel_styles, "match_score": d.match_score,
        "popular_season": d.popular_season, "tags": d.tags, "lat": d.lat, "lng": d.lng
    } for d in dests]

@router.get("/crud/hotels")
def crud_get_hotels(db: Session = Depends(get_db)):
    hotels = db.query(Hotel).all()
    return [{
        "id": h.id, "name": h.name, "destination_id": h.destination_id, "stars": h.stars,
        "price_per_night": h.price_per_night, "address": h.address, "rating": h.rating,
        "category": h.category, "availability_status": h.availability_status, "beach_proximity": h.beach_proximity
    } for h in hotels]

@router.get("/crud/activities")
def crud_get_activities(db: Session = Depends(get_db)):
    acts = db.query(Activity).all()
    return [{
        "id": a.id, "name": a.name, "destination_id": a.destination_id, "category": a.category,
        "duration_hours": a.duration_hours, "price": a.price, "rating": a.rating, "time_slot_default": a.time_slot_default
    } for a in acts]

@router.get("/crud/vendors")
def crud_get_vendors(db: Session = Depends(get_db)):
    vendors = db.query(Vendor).all()
    return [{
        "id": v.id, "name": v.name, "category": v.category, "rating": v.rating,
        "availability": v.availability, "price_range": v.price_range, "status": v.status,
        "contact": v.contact, "location": v.location, "fleet_or_inventory": v.fleet_or_inventory
    } for v in vendors]

@router.get("/crud/itinerary-items")
def crud_get_itinerary_items(tour_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(ItineraryItem)
    if tour_id:
        query = query.filter(ItineraryItem.tour_id == tour_id)
    items = query.order_by(ItineraryItem.tour_id, ItineraryItem.day_number, ItineraryItem.order_index).all()
    return [{
        "id": it.id, "tour_id": it.tour_id, "day_number": it.day_number, "item_type": it.item_type,
        "title": it.title, "subtitle": it.subtitle, "time_start": it.time_start, "time_end": it.time_end,
        "cost": it.cost, "location_name": it.location_name, "is_disrupted": it.is_disrupted,
        "replacement_status": it.replacement_status
    } for it in items]
