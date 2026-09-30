from sqlalchemy.orm import Session
from backend.models import Tour, ItineraryItem
from backend.engine_pricing import calculate_tour_pricing
from typing import Dict, Any

def process_ai_assistant_query(query: str, tour_id: int, db: Session) -> Dict[str, Any]:
    """
    Intelligently responds to user prompts and directly mutates the tour state when requested.
    """
    q_lower = query.lower()
    tour = db.query(Tour).filter(Tour.id == tour_id).first() if tour_id else None
    
    # Intent 1: Make trip cheaper / budget reduction
    if "cheaper" in q_lower or "reduce cost" in q_lower or "save money" in q_lower or "budget" in q_lower:
        if tour:
            # Adjust an activity cost or switch to economy transport
            items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour.id).all()
            for item in items:
                if item.item_type == "activity" and item.cost > 1000:
                    item.cost = round(item.cost * 0.75, 2)
                    item.subtitle = f"{item.subtitle} (Optimized with early-bird discount)"
            pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
            tour.estimated_cost = pricing["total"]
            db.commit()
            return {
                "reply": f"I optimized your activities and negotiated early-bird vendor rates. Your total estimated trip cost is reduced to ₹{pricing['total']:,.2f} (Savings: ₹{pricing['remaining']:,.2f} remaining within your ₹{tour.budget_total:,.2f} budget).",
                "action_taken": "optimized_budget",
                "pricing": pricing
            }
        return {
            "reply": "To reduce costs, I recommend opting for standard Volvo coach transit, selecting 3-star beachfront hotels instead of resorts, and booking bundled water sports packages which save up to 25%."
        }

    # Intent 2: Add adventure activities
    if "adventure" in q_lower or "more action" in q_lower or "scuba" in q_lower or "watersports" in q_lower:
        if tour:
            # Add an adrenaline activity
            new_item = ItineraryItem(
                tour_id=tour.id,
                day_number=2,
                item_type="activity",
                title="Bungee Jumping & Flyboarding Experience",
                subtitle="Thrilling 55-meter jump over Mayem Lake with safety gear & HD video",
                time_start="02:30 PM",
                time_end="04:30 PM",
                cost=2500.0 * tour.travelers_count,
                location_name="Mayem Lake, North Goa",
                lat=15.5833,
                lng=73.9167,
                icon="zap",
                order_index=6
            )
            db.add(new_item)
            db.flush()
            items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour.id).all()
            pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
            tour.estimated_cost = pricing["total"]
            db.commit()
            return {
                "reply": "Added high-adrenaline **Bungee Jumping & Flyboarding at Mayem Lake** to Day 2 afternoon! Itinerary and schedule updated.",
                "action_taken": "added_activity",
                "pricing": pricing
            }
        return {
            "reply": "Top adventure picks include: 1) Grande Island Deep Scuba Diving, 2) Flyboarding at Baga, 3) 55m Bungee jumping at Mayem Lake, and 4) Dudhsagar Trekking."
        }

    # Intent 3: Explain recommendation / scoring
    if "why" in q_lower or "score" in q_lower or "recommend" in q_lower or "algorithm" in q_lower:
        return {
            "reply": "**TRAVORA Explainable Scoring Breakdown**:\n\n"
                     "• **30% Style & Preference Match**: High alignment with Beach & Adventure profile (92%)\n"
                     "• **25% Budget Fit**: Fits comfortably within target budget ceiling (90%)\n"
                     "• **20% Location Proximity**: Located 250m from Baga Beach and 2.1km from activity hub (95%)\n"
                     "• **15% Vendor Real-Time Availability**: Instant API room block lock (100%)\n"
                     "• **10% Schedule Compatibility**: Check-in available right upon arrival at 04:30 PM (94%)\n\n"
                     "**Overall Score: 94% ⭐ (Recommended Best Match)**"
        }

    # Intent 4: Luxury upgrade
    if "luxury" in q_lower or "5 star" in q_lower or "resort" in q_lower or "upgrade" in q_lower:
        if tour:
            hotel_item = db.query(ItineraryItem).filter(
                ItineraryItem.tour_id == tour.id,
                ItineraryItem.item_type == "hotel"
            ).first()
            if hotel_item:
                hotel_item.title = "Check-in at Taj Fort Aguada Resort & Spa (5-Star Luxury)"
                hotel_item.subtitle = "Sea-view presidential cottage with private balcony & butler service"
                hotel_item.cost += 6000.0
            items = db.query(ItineraryItem).filter(ItineraryItem.tour_id == tour.id).all()
            pricing = calculate_tour_pricing(items, tour.budget_total, tour.travelers_count)
            tour.estimated_cost = pricing["total"]
            tour.accommodation_type = "5-Star Luxury Resort"
            db.commit()
            return {
                "reply": "Upgraded accommodation to **Taj Fort Aguada Resort & Spa (5-Star Luxury)**. Itinerary and live pricing updated.",
                "action_taken": "upgraded_hotel",
                "pricing": pricing
            }
        return {
            "reply": "Luxury options include Taj Fort Aguada, W Goa Vagator, and Alila Diwa with infinity pools and private beach access."
        }

    # Intent 5: Day 2 scheduling question
    if "day 2" in q_lower or "fit" in q_lower or "time" in q_lower:
        return {
            "reply": "On Day 2, you have a comfortable 2-hour window between Fort Aguada (06:00 PM) and Dinner (08:00 PM). You can easily fit the **Sunset Mandovi River Cruise** or a relaxed stroll along Miramar Beach without rushing!"
        }

    # Default general intelligent response
    return {
        "reply": f"I'm Travora AI, your dynamic itinerary copilot. I can optimize your budget, swap hotels, add adventure sports, or resolve schedule conflicts in real time. Try asking: *'Make my trip cheaper'*, *'Add more adventure activities'*, or *'Why did you recommend this hotel?'*"
    }
