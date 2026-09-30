# 🗺️ TRAVORA Database Architecture & SQL Table Studio
> **Database File:** `travora.db` (SQLite 3) | **Generated:** `2026-09-05 11:50:16 UTC`
> **Live Interactive Studio:** [http://127.0.0.1:8000/db-view](http://127.0.0.1:8000/db-view)

---

## 📌 Database Table Index
| Table Name | Record Count | Description / Role |
| :--- | :---: | :--- |
| [**`activities`**](#table-activities) | `10` | Adventure sports, cultural walks, scuba packages, and sightseeing |
| [**`alternative_options`**](#table-alternative_options) | `3` | Explainable 5-factor AI replacement packages |
| [**`bookings`**](#table-bookings) | `0` | Confirmed reservations and payment status tracking |
| [**`change_events`**](#table-change_events) | `1` | Disruptions, weather delays, and multi-component impact events |
| [**`destinations`**](#table-destinations) | `7` | Indian holiday hubs (Goa, Jaipur, Kerala, Manali, Udaipur, Kashmir, Rishikesh) |
| [**`hotels`**](#table-hotels) | `8` | Accommodations, star ratings, nightly tariffs, and beach proximity |
| [**`itinerary_items`**](#table-itinerary_items) | `40` | Day-by-day scheduled timeline slots, lat/lng coordinates, and icons |
| [**`notifications`**](#table-notifications) | `4` | Real-time traveler and operator alerts |
| [**`operator_proposals`**](#table-operator_proposals) | `126` | Operator bidding and negotiation proposals |
| [**`payments`**](#table-payments) | `0` | Financial transactions, GST breakdown, and payment methods |
| [**`reviews`**](#table-reviews) | `0` | Multi-dimensional traveler ratings & testimonials |
| [**`tour_groups`**](#table-tour_groups) | `0` | Batch departures, group coordinators, and assigned transport |
| [**`tours`**](#table-tours) | `3` | Personalized custom dynamic itineraries created for travelers |
| [**`transports`**](#table-transports) | `2` | Volvo buses, express trains, flights, and cab routes |
| [**`users`**](#table-users) | `18` | Registered travelers, tour operators, and profile accounts |
| [**`vendors`**](#table-vendors) | `4` | Supply chain partners, fleet inventory, and live status |

---


## <a id='table-activities'></a> 📋 Table: `activities`

**Total Records:** `10` | **Columns:** `12`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`destination_id`** | `INTEGER` | YES | - | - |
| 2 | **`name`** | `VARCHAR` | YES | - | - |
| 3 | **`category`** | `VARCHAR` | YES | - | - |
| 4 | **`duration_hours`** | `FLOAT` | NO | - | - |
| 5 | **`price`** | `FLOAT` | YES | - | - |
| 6 | **`lat`** | `FLOAT` | YES | - | - |
| 7 | **`lng`** | `FLOAT` | YES | - | - |
| 8 | **`description`** | `TEXT` | YES | - | - |
| 9 | **`image_url`** | `VARCHAR` | YES | - | - |
| 10 | **`rating`** | `FLOAT` | NO | - | - |
| 11 | **`time_slot_default`** | `VARCHAR` | NO | - | - |

</details>

| **ID** | **DESTINATION_ID** | **NAME** | **CATEGORY** | **DURATION_HOURS** | **PRICE** | **LAT** | **LNG** | **DESCRIPTION** | **IMAGE_URL** | **RATING** | **TIME_SLOT_DEFAULT** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | Calangute Water Sports Package | Adventure | 3.50 | 1600.00 | 15.54 | 73.76 | Parasailing with sea dip, jet ski speed circuit, banana ride, and bumper boat adventure. | https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600 | 4.80 | Morning |
| 2 | 1 | Grande Island Scuba Diving & Dolphin Cruise | Adventure | 6.00 | 2200.00 | 15.35 | 73.77 | Scenic boat ride to Grande Island, professional dive master underwater session, dolphin spotting, and beach buffet. | https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=600 | 4.90 | Morning |
| 3 | 1 | Fort Aguada & Lighthouse Historic Tour | Heritage | 2.50 | 400.00 | 15.49 | 73.77 | 17th-century Portuguese fortress overlooking Arabian Sea with panoramic coastline views. | https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600 | 4.60 | Morning |
| 4 | 1 | Fontainhas Latin Quarter Walking Tour | Heritage | 2.00 | 600.00 | 15.50 | 73.83 | Colorful Portuguese heritage villas, vintage bakeries, art galleries, and authentic Goan street coffee. | https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600 | 4.70 | Afternoon |
| 5 | 1 | Dudhsagar Waterfalls & Spice Plantation Safari | Nature | 7.00 | 1800.00 | 15.31 | 74.31 | Jeep safari through Bhagwan Mahavir Wildlife Sanctuary, roaring milky cascade, and traditional Goan lunch. | https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600 | 4.80 | Morning |
| 6 | 1 | Mandovi River Luxury Sunset Cruise | Relaxed | 2.00 | 850.00 | 15.50 | 73.83 | Live Goan folk dance (Dekhni & Fugdi), DJ music, welcome drinks, and sun descending into Arabian Sea. | https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600 | 4.50 | Evening |
| 7 | 1 | Anjuna & Vagator Sunset Beach Lounge Experience | Nightlife | 3.50 | 1200.00 | 15.57 | 73.74 | Cliffside dining at Curlies / Shiva Valley with curated trance beats, sea breezes, and fresh seafood. | https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600 | 4.70 | Evening |
| 8 | 2 | Amber Fort Guided Elephant & Jeep Tour | Heritage | 3.50 | 800.00 | 26.99 | 75.85 | Majestic Rajputana fortress, Sheesh Mahal (Mirror Palace), and Maota Lake panoramic views. | https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600 | 4.90 | Morning |
| 9 | 2 | Hawa Mahal & City Palace Royal Walk | Culture | 3.00 | 650.00 | 26.92 | 75.83 | Palace of Winds 953 honeycombed windows and Royal Museum textiles collection. | https://images.unsplash.com/photo-1603228254119-e6aef3836ed3?w=600 | 4.70 | Afternoon |
| 10 | 3 | Alleppey Luxury Houseboat Day Cruise | Relaxed | 5.00 | 2400.00 | 9.50 | 76.34 | Private traditional Kettuvallam gliding through palm-fringed backwaters with authentic Karimeen fish lunch. | https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600 | 4.90 | Morning |

---


## <a id='table-alternative_options'></a> 📋 Table: `alternative_options`

**Total Records:** `3` | **Columns:** `18`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`change_event_id`** | `INTEGER` | YES | - | - |
| 2 | **`title`** | `VARCHAR` | YES | - | - |
| 3 | **`category`** | `VARCHAR` | NO | - | - |
| 4 | **`price_delta`** | `FLOAT` | NO | - | - |
| 5 | **`distance_km`** | `FLOAT` | NO | - | - |
| 6 | **`preference_match`** | `INTEGER` | NO | - | - |
| 7 | **`budget_match`** | `INTEGER` | NO | - | - |
| 8 | **`location_match`** | `INTEGER` | NO | - | - |
| 9 | **`availability_match`** | `INTEGER` | NO | - | - |
| 10 | **`time_match`** | `INTEGER` | NO | - | - |
| 11 | **`overall_score`** | `INTEGER` | NO | - | - |
| 12 | **`is_recommended`** | `BOOLEAN` | NO | - | - |
| 13 | **`is_selected`** | `BOOLEAN` | NO | - | - |
| 14 | **`description`** | `TEXT` | NO | - | - |
| 15 | **`beach_proximity`** | `VARCHAR` | NO | - | - |
| 16 | **`checkin_compatible`** | `BOOLEAN` | NO | - | - |
| 17 | **`image_url`** | `VARCHAR` | NO | - | - |

</details>

| **ID** | **CHANGE_EVENT_ID** | **TITLE** | **CATEGORY** | **PRICE_DELTA** | **DISTANCE_KM** | **PREFERENCE_MATCH** | **BUDGET_MATCH** | **LOCATION_MATCH** | **AVAILABILITY_MATCH** | **TIME_MATCH** | **OVERALL_SCORE** | **IS_RECOMMENDED** | **IS_SELECTED** | **DESCRIPTION** | **BEACH_PROXIMITY** | **CHECKIN_COMPATIBLE** | **IMAGE_URL** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | Hotel Paradise Goa (3-Star Deluxe) | 3-Star Beachfront Hotel | 900.00 | 2.10 | 92 | 90 | 95 | 100 | 94 | 94 | 1 | 1 | Prime Baga beach proximity (250m), immediate check-in compatibility, 92% traveler style match. Minimal itinerary friction. | 250m to Baga Beach | 1 | https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600 |
| 2 | 1 | Hotel Sunset Residency | 3-Star Comfort Hotel | -200.00 | 5.40 | 78 | 98 | 70 | 100 | 85 | 85 | 0 | 0 | Budget-friendly option saving ₹200. Located 5.4 km from initial hub with higher transport transit overhead. | 1.2 km to Calangute Beach | 1 | https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600 |
| 3 | 1 | Beach View Resort & Suites | 3.5-Star Boutique Resort | 0.00 | 3.80 | 88 | 75 | 82 | 80 | 88 | 82 | 0 | 0 | Equal baseline price, ocean view rooms. Check-in available only after 06:30 PM which may cause afternoon delay. | Direct Beach Access | 0 | https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600 |

---


## <a id='table-bookings'></a> 📋 Table: `bookings`

**Total Records:** `0` | **Columns:** `8`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`booking_code`** | `VARCHAR` | YES | - | - |
| 2 | **`tour_id`** | `INTEGER` | YES | - | - |
| 3 | **`user_id`** | `INTEGER` | YES | - | - |
| 4 | **`amount_paid`** | `FLOAT` | NO | - | - |
| 5 | **`payment_status`** | `VARCHAR` | NO | - | - |
| 6 | **`booking_status`** | `VARCHAR` | NO | - | - |
| 7 | **`created_at`** | `DATETIME` | NO | - | - |

</details>

*(No records in this table currently — start fresh or create new records)*


---


## <a id='table-change_events'></a> 📋 Table: `change_events`

**Total Records:** `1` | **Columns:** `15`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`tour_id`** | `INTEGER` | YES | - | - |
| 2 | **`disrupted_item_id`** | `INTEGER` | NO | - | - |
| 3 | **`event_type`** | `VARCHAR` | NO | - | - |
| 4 | **`status`** | `VARCHAR` | NO | - | - |
| 5 | **`severity`** | `VARCHAR` | NO | - | - |
| 6 | **`title`** | `VARCHAR` | YES | - | - |
| 7 | **`reason`** | `TEXT` | YES | - | - |
| 8 | **`impact_summary`** | `TEXT` | YES | - | - |
| 9 | **`affected_accommodation`** | `VARCHAR` | NO | - | - |
| 10 | **`affected_checkin`** | `VARCHAR` | NO | - | - |
| 11 | **`affected_transport`** | `VARCHAR` | NO | - | - |
| 12 | **`cost_delta`** | `FLOAT` | NO | - | - |
| 13 | **`created_at`** | `DATETIME` | NO | - | - |
| 14 | **`resolved_at`** | `DATETIME` | NO | - | - |

</details>

| **ID** | **TOUR_ID** | **DISRUPTED_ITEM_ID** | **EVENT_TYPE** | **STATUS** | **SEVERITY** | **TITLE** | **REASON** | **IMPACT_SUMMARY** | **AFFECTED_ACCOMMODATION** | **AFFECTED_CHECKIN** | **AFFECTED_TRANSPORT** | **COST_DELTA** | **CREATED_AT** | **RESOLVED_AT** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 3 | 28 | hotel_cancellation | resolved | critical | Hotel Unavailable — Day 2 Check-in Collision | Vendor inventory lock: Hotel XYZ unable to fulfill Day 2 booking reservation. | Accommodation unavailable; Day 2 check-in affected; Minor cab rerouting required (+2.1 km); Net cost delta: +₹900. | Hotel XYZ (Day 2 Deluxe) | Check-in slot delayed / needs immediate reassignment | Minor cab rerouting required (+2.1 km, ~10 min) | 900.00 | 2026-09-05 11:48:28.849736 | 2026-09-05 11:50:16.474369 |

---


## <a id='table-destinations'></a> 📋 Table: `destinations`

**Total Records:** `7` | **Columns:** `12`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`name`** | `VARCHAR` | YES | - | - |
| 2 | **`state`** | `VARCHAR` | YES | - | - |
| 3 | **`description`** | `TEXT` | YES | - | - |
| 4 | **`image_url`** | `VARCHAR` | YES | - | - |
| 5 | **`starting_price`** | `FLOAT` | YES | - | - |
| 6 | **`travel_styles`** | `VARCHAR` | YES | - | - |
| 7 | **`match_score`** | `INTEGER` | NO | - | - |
| 8 | **`lat`** | `FLOAT` | NO | - | - |
| 9 | **`lng`** | `FLOAT` | NO | - | - |
| 10 | **`popular_season`** | `VARCHAR` | NO | - | - |
| 11 | **`tags`** | `VARCHAR` | NO | - | - |

</details>

| **ID** | **NAME** | **STATE** | **DESCRIPTION** | **IMAGE_URL** | **STARTING_PRICE** | **TRAVEL_STYLES** | **MATCH_SCORE** | **LAT** | **LNG** | **POPULAR_SEASON** | **TAGS** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Goa | Goa | Sun-kissed coastline, thrilling water sports, historic Portuguese forts, vibrant nightlife, and mouthwatering coastal seafood. | https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800 | 18500.00 | Beach,Adventure,Food,Nightlife | 94 | 15.30 | 74.12 | Oct - Mar | Trending,Best for Friends,Coastal |
| 2 | Jaipur | Rajasthan | The Royal Pink City featuring grand palaces, majestic hilltop forts, vibrant bazaars, and rich Rajputana heritage. | https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800 | 16200.00 | Culture,Heritage,Shopping,Food | 91 | 26.91 | 75.79 | Nov - Feb | Royal,Heritage,Photography |
| 3 | Kerala (Alleppey & Munnar) | Kerala | God's Own Country: tranquil emerald backwaters, serene houseboat cruises, lush mist-covered tea plantations, and Ayurvedic wellness. | https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800 | 22000.00 | Nature,Relaxed,Romantic,Wellness | 96 | 9.93 | 76.27 | Sep - Mar | Scenic,Honeymoon,Nature |
| 4 | Manali | Himachal Pradesh | Snow-capped Himalayan peaks, roaring river rafting in Beas, Solang Valley paragliding, and cozy pine-wood cafes. | https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800 | 19500.00 | Adventure,Nature,Romantic | 89 | 32.24 | 77.19 | Dec - Jun | Snow,Mountains,Trekking |
| 5 | Udaipur | Rajasthan | The romantic City of Lakes with floating white marble palaces, Lake Pichola boat rides, and breathtaking sunset viewpoints. | https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800 | 21000.00 | Romantic,Luxury,Culture | 93 | 24.59 | 73.71 | Oct - Mar | Lakes,Royalty,Romantic |
| 6 | Kashmir (Srinagar & Gulmarg) | Jammu & Kashmir | Heaven on Earth featuring traditional Shikara rides on Dal Lake, Mughal Gardens, and world-class Gulmarg Gondola skiing. | https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800 | 28000.00 | Nature,Luxury,Adventure | 95 | 34.08 | 74.80 | All Year | Scenic,Iconic,Snow |
| 7 | Rishikesh | Uttarakhand | Yoga Capital of the World along the holy Ganges, famous for Grade IV river rafting, bungee jumping, and evening Ganga Aarti. | https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800 | 14500.00 | Adventure,Wellness,Culture | 88 | 30.09 | 78.27 | Sep - May | Spiritual,Rafting,Yoga |

---


## <a id='table-hotels'></a> 📋 Table: `hotels`

**Total Records:** `8` | **Columns:** `14`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`destination_id`** | `INTEGER` | YES | - | - |
| 2 | **`name`** | `VARCHAR` | YES | - | - |
| 3 | **`stars`** | `INTEGER` | NO | - | - |
| 4 | **`price_per_night`** | `FLOAT` | YES | - | - |
| 5 | **`lat`** | `FLOAT` | YES | - | - |
| 6 | **`lng`** | `FLOAT` | YES | - | - |
| 7 | **`address`** | `VARCHAR` | YES | - | - |
| 8 | **`amenities`** | `VARCHAR` | NO | - | - |
| 9 | **`image_url`** | `VARCHAR` | YES | - | - |
| 10 | **`rating`** | `FLOAT` | NO | - | - |
| 11 | **`category`** | `VARCHAR` | NO | - | - |
| 12 | **`availability_status`** | `VARCHAR` | NO | - | - |
| 13 | **`beach_proximity`** | `VARCHAR` | NO | - | - |

</details>

| **ID** | **DESTINATION_ID** | **NAME** | **STARS** | **PRICE_PER_NIGHT** | **LAT** | **LNG** | **ADDRESS** | **AMENITIES** | **IMAGE_URL** | **RATING** | **CATEGORY** | **AVAILABILITY_STATUS** | **BEACH_PROXIMITY** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | Hotel Paradise Goa | 3 | 3800.00 | 15.55 | 73.75 | Near Tito's Lane, Baga, Goa | WiFi,Swimming Pool,Free Breakfast,AC,Beach Access | https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600 | 4.70 | 3-Star | available | 250m |
| 2 | 1 | Hotel Sunset Residency | 3 | 2900.00 | 15.54 | 73.77 | Calangute-Candolim Road, Goa | WiFi,AC,Restaurant,Parking | https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600 | 4.30 | 3-Star | available | 1.2km |
| 3 | 1 | Beach View Resort & Suites | 4 | 4500.00 | 15.56 | 73.75 | Anjuna Cliff View, Goa | Infinity Pool,Sea Facing,Spa,Bar,WiFi | https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600 | 4.60 | 4-Star | limited | Direct Beach Access |
| 4 | 1 | Taj Fort Aguada Resort & Spa | 5 | 12500.00 | 15.49 | 73.77 | Sinquerim, Candolim, Goa | Private Beach,Luxury Spa,Butler Service,Fine Dining | https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600 | 4.90 | 5-Star Resort | available | Beachfront |
| 5 | 2 | Heritage Haveli Jaipur | 3 | 3200.00 | 26.92 | 75.83 | Near Hawa Mahal, Pink City, Jaipur | Rooftop Dining,WiFi,Traditional Folk Music,AC | https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600 | 4.60 | 3-Star | available | N/A |
| 6 | 2 | The Lalit Palace Jaipur | 5 | 9800.00 | 26.85 | 75.81 | Jagatpura Road, Jaipur | Luxury Spa,Multi-Cuisine Restaurants,Pool,Bar | https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600 | 4.80 | 5-Star Resort | available | N/A |
| 7 | 3 | Lake Palace Backwater Resort | 4 | 5400.00 | 9.50 | 76.34 | Vembanad Lake Shore, Alleppey | Houseboat Jetty,Ayurvedic Spa,Pool,Seafood Dining | https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600 | 4.80 | 4-Star | available | Lakefront |
| 8 | 4 | Snow Peak Pine Retreat | 3 | 3400.00 | 32.24 | 77.19 | Log Huts Area, Old Manali | Himalayan Mountain View,Heater,Bonfire,Cafe | https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600 | 4.60 | 3-Star | available | N/A |

---


## <a id='table-itinerary_items'></a> 📋 Table: `itinerary_items`

**Total Records:** `40` | **Columns:** `17`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`tour_id`** | `INTEGER` | YES | - | - |
| 2 | **`day_number`** | `INTEGER` | YES | - | - |
| 3 | **`item_type`** | `VARCHAR` | YES | - | - |
| 4 | **`title`** | `VARCHAR` | YES | - | - |
| 5 | **`subtitle`** | `VARCHAR` | NO | - | - |
| 6 | **`time_start`** | `VARCHAR` | NO | - | - |
| 7 | **`time_end`** | `VARCHAR` | NO | - | - |
| 8 | **`cost`** | `FLOAT` | NO | - | - |
| 9 | **`location_name`** | `VARCHAR` | NO | - | - |
| 10 | **`lat`** | `FLOAT` | NO | - | - |
| 11 | **`lng`** | `FLOAT` | NO | - | - |
| 12 | **`icon`** | `VARCHAR` | NO | - | - |
| 13 | **`is_disrupted`** | `BOOLEAN` | NO | - | - |
| 14 | **`disruption_note`** | `VARCHAR` | NO | - | - |
| 15 | **`replacement_status`** | `VARCHAR` | NO | - | - |
| 16 | **`order_index`** | `INTEGER` | NO | - | - |

</details>

| **ID** | **TOUR_ID** | **DAY_NUMBER** | **ITEM_TYPE** | **TITLE** | **SUBTITLE** | **TIME_START** | **TIME_END** | **COST** | **LOCATION_NAME** | **LAT** | **LNG** | **ICON** | **IS_DISRUPTED** | **DISRUPTION_NOTE** | **REPLACEMENT_STATUS** | **ORDER_INDEX** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 1 | activity | Manali Explorer - Day 1 Highlights | Curated Relaxed & Leisure experiences across landmark locations | 09:30 AM | 01:00 PM | 1600.00 | Manali City Center | 32.24 | 77.19 | map-pin | 0 | - | normal | 1 |
| 2 | 1 | 1 | food | Traditional Manali Culinary Tasting | Authentic regional specialties prepared by master chefs | 01:30 PM | 03:00 PM | 1000.00 | Manali Heritage Dining | 9.93 | 76.27 | utensils | 0 | - | normal | 2 |
| 3 | 1 | 1 | activity | Manali Evening Cultural Sensation | Sunset viewpoints and illuminated night monuments | 04:30 PM | 07:30 PM | 1300.00 | Manali Viewpoint | 9.93 | 76.27 | camera | 0 | - | normal | 3 |
| 4 | 1 | 2 | activity | Manali Explorer - Day 2 Highlights | Curated Relaxed & Leisure experiences across landmark locations | 09:30 AM | 01:00 PM | 1600.00 | Manali City Center | 32.24 | 77.19 | map-pin | 0 | - | normal | 4 |
| 5 | 1 | 2 | food | Traditional Manali Culinary Tasting | Authentic regional specialties prepared by master chefs | 01:30 PM | 03:00 PM | 1000.00 | Manali Heritage Dining | 9.93 | 76.27 | utensils | 0 | - | normal | 5 |
| 6 | 1 | 2 | activity | Manali Evening Cultural Sensation | Sunset viewpoints and illuminated night monuments | 04:30 PM | 07:30 PM | 1300.00 | Manali Viewpoint | 9.93 | 76.27 | camera | 0 | - | normal | 6 |
| 7 | 1 | 3 | activity | Manali Explorer - Day 3 Highlights | Curated Relaxed & Leisure experiences across landmark locations | 09:30 AM | 01:00 PM | 1600.00 | Manali City Center | 32.24 | 77.19 | map-pin | 0 | - | normal | 7 |
| 8 | 1 | 3 | food | Traditional Manali Culinary Tasting | Authentic regional specialties prepared by master chefs | 01:30 PM | 03:00 PM | 1000.00 | Manali Heritage Dining | 9.93 | 76.27 | utensils | 0 | - | normal | 8 |
| 9 | 1 | 3 | activity | Manali Evening Cultural Sensation | Sunset viewpoints and illuminated night monuments | 04:30 PM | 07:30 PM | 1300.00 | Manali Viewpoint | 9.93 | 76.27 | camera | 0 | - | normal | 9 |
| 10 | 1 | 4 | activity | Manali Explorer - Day 4 Highlights | Curated Relaxed & Leisure experiences across landmark locations | 09:30 AM | 01:00 PM | 1600.00 | Manali City Center | 32.24 | 77.19 | map-pin | 0 | - | normal | 10 |
| 11 | 1 | 4 | food | Traditional Manali Culinary Tasting | Authentic regional specialties prepared by master chefs | 01:30 PM | 03:00 PM | 1000.00 | Manali Heritage Dining | 9.93 | 76.27 | utensils | 0 | - | normal | 11 |
| 12 | 1 | 4 | activity | Manali Evening Cultural Sensation | Sunset viewpoints and illuminated night monuments | 04:30 PM | 07:30 PM | 1300.00 | Manali Viewpoint | 9.93 | 76.27 | camera | 0 | - | normal | 12 |
| 13 | 2 | 1 | transport | Arrival Transit to Goa (Volvo Bus) | Seamless journey via Volvo Bus with direct hotel transfer | 08:00 AM | 02:30 PM | 3600.00 | Goa Main Terminal | 15.58 | 73.77 | bus | 0 | - | normal | 1 |
| 14 | 2 | 1 | hotel | Check-in at Hotel Royal Goa (3-Star) | Deluxe room with panoramic views, welcome drinks & refreshment lounge | 03:30 PM | 04:30 PM | 11400.00 | Goa Central Hub | 15.56 | 73.75 | hotel | 0 | - | normal | 2 |
| 15 | 2 | 1 | activity | Fort Aguada & 17th-Century Lighthouse | Portuguese coastal fortress overlooking panoramic Arabian Sea | 05:00 PM | 07:30 PM | 800.00 | Fort Aguada | 15.49 | 73.77 | shield | 0 | - | normal | 3 |
| 16 | 2 | 1 | food | Welcome Dinner: Authentic Goa Cuisine | Handcrafted local delicacies & seasonal culinary spread | 08:00 PM | 09:45 PM | 1300.00 | Goa Promenade | 15.55 | 73.74 | utensils | 0 | - | normal | 4 |
| 17 | 2 | 2 | activity | Dudhsagar Waterfalls & Spice Safari | 4x4 jungle jeep safari through wildlife sanctuary to four-tiered milky cascade | 08:00 AM | 03:00 PM | 3600.00 | Dudhsagar Waterfalls | 15.31 | 74.31 | droplets | 0 | - | normal | 5 |
| 18 | 2 | 2 | food | Mid-Day Dining & Chef's Special at Goa | Refreshing beverages & multi-cuisine lunch | 01:15 PM | 02:30 PM | 1000.00 | Goa Food Hub | 15.32 | 74.32 | utensils | 0 | - | normal | 6 |
| 19 | 2 | 2 | activity | Baga Beach Watersports | Parasailing, jet ski speed runs, banana and bumper boat rides | 04:00 PM | 07:30 PM | 3200.00 | Baga Beach Watersports | 15.56 | 73.75 | waves | 0 | - | normal | 7 |
| 20 | 2 | 2 | food | Evening Starlight Dinner & Live Music | Relaxing dinner under the stars with live acoustic performances | 08:00 PM | 10:00 PM | 1600.00 | Goa Heritage Center | 15.56 | 73.76 | utensils | 0 | - | normal | 8 |
| 21 | 2 | 3 | activity | Grande Island Scuba Diving & Dolphin Spotting | PADI certified dive master session, underwater reef exploration & island buffet | 07:30 AM | 01:30 PM | 4800.00 | Grande Island Scuba Diving | 15.35 | 73.77 | compass | 0 | - | normal | 9 |
| 22 | 2 | 3 | food | Mid-Day Dining & Chef's Special at Goa | Refreshing beverages & multi-cuisine lunch | 01:15 PM | 02:30 PM | 1000.00 | Goa Food Hub | 15.36 | 73.77 | utensils | 0 | - | normal | 10 |
| 23 | 2 | 3 | activity | Fontainhas Latin Quarter Walking Tour | Vibrant 18th-century Portuguese colonial villas, azulejos tiles and heritage bakeries | 04:00 PM | 07:30 PM | 1000.00 | Fontainhas Latin Quarter Walking Tour | 15.50 | 73.83 | camera | 0 | - | normal | 11 |
| 24 | 2 | 3 | food | Evening Starlight Dinner & Live Music | Relaxing dinner under the stars with live acoustic performances | 08:00 PM | 10:00 PM | 1600.00 | Goa Heritage Center | 15.56 | 73.76 | utensils | 0 | - | normal | 12 |
| 25 | 2 | 4 | activity | Goa Artisan Souvenir Bazaar & Spices | Collect authentic handicrafts, regional sweets, and handwoven gifts | 09:30 AM | 12:00 PM | 600.00 | Goa Local Market | 15.56 | 73.75 | shopping-bag | 0 | - | normal | 13 |
| 26 | 2 | 4 | transport | Return Transit from Goa (Volvo Bus) | Comfortable return journey with unforgettable memories | 02:00 PM | 09:30 PM | 3600.00 | Goa Departure Gate | 15.58 | 73.77 | bus | 0 | - | normal | 14 |
| 27 | 3 | 1 | transport | Arrival Transit to Goa (Volvo Bus) | Seamless journey via Volvo Bus with direct hotel transfer | 08:00 AM | 02:30 PM | 3600.00 | Goa Main Terminal | 15.58 | 73.77 | bus | 0 | - | normal | 1 |
| 28 | 3 | 1 | hotel | Check-in at Hotel Paradise Goa (3-Star Deluxe) | Upgraded alternative with 250m to Baga Beach • Check-in synchronized | 03:30 PM | 04:30 PM | 12300.00 | Goa Central Hub | 15.55 | 73.75 | hotel | 0 | - | replaced | 2 |
| 29 | 3 | 1 | activity | Baga Beach Watersports | Parasailing, jet ski speed runs, banana and bumper boat rides | 05:00 PM | 07:30 PM | 3200.00 | Baga Beach Watersports | 15.56 | 73.75 | waves | 0 | - | normal | 3 |
| 30 | 3 | 1 | food | Welcome Dinner: Authentic Goa Cuisine | Handcrafted local delicacies & seasonal culinary spread | 08:00 PM | 09:45 PM | 1300.00 | Goa Promenade | 15.55 | 73.74 | utensils | 0 | - | normal | 4 |
| 31 | 3 | 2 | activity | Fort Aguada & 17th-Century Lighthouse | Portuguese coastal fortress overlooking panoramic Arabian Sea | 03:30 PM | 05:30 PM | 800.00 | Fort Aguada | 15.49 | 73.77 | shield | 0 | - | normal | 5 |
| 32 | 3 | 2 | food | Mid-Day Dining & Chef's Special at Goa | Refreshing beverages & multi-cuisine lunch | 01:15 PM | 02:30 PM | 1000.00 | Goa Food Hub | 15.50 | 73.78 | utensils | 0 | - | normal | 6 |
| 33 | 3 | 2 | activity | Grande Island Scuba Diving & Dolphin Spotting | PADI certified dive master session, underwater reef exploration & island buffet | 04:00 PM | 07:30 PM | 4800.00 | Grande Island Scuba Diving | 15.35 | 73.77 | compass | 0 | - | normal | 7 |
| 34 | 3 | 2 | food | Evening Starlight Dinner & Live Music | Relaxing dinner under the stars with live acoustic performances | 08:00 PM | 10:00 PM | 1600.00 | Goa Heritage Center | 15.56 | 73.76 | utensils | 0 | - | normal | 8 |
| 35 | 3 | 3 | activity | Dudhsagar Waterfalls & Spice Safari | 4x4 jungle jeep safari through wildlife sanctuary to four-tiered milky cascade | 08:00 AM | 03:00 PM | 3600.00 | Dudhsagar Waterfalls | 15.31 | 74.31 | droplets | 0 | - | normal | 9 |
| 36 | 3 | 3 | food | Mid-Day Dining & Chef's Special at Goa | Refreshing beverages & multi-cuisine lunch | 01:15 PM | 02:30 PM | 1000.00 | Goa Food Hub | 15.32 | 74.32 | utensils | 0 | - | normal | 10 |
| 37 | 3 | 3 | activity | Fontainhas Latin Quarter Walking Tour | Vibrant 18th-century Portuguese colonial villas, azulejos tiles and heritage bakeries | 04:00 PM | 07:30 PM | 1000.00 | Fontainhas Latin Quarter Walking Tour | 15.50 | 73.83 | camera | 0 | - | normal | 11 |
| 38 | 3 | 3 | food | Evening Starlight Dinner & Live Music | Relaxing dinner under the stars with live acoustic performances | 08:00 PM | 10:00 PM | 1600.00 | Goa Heritage Center | 15.56 | 73.76 | utensils | 0 | - | normal | 12 |
| 39 | 3 | 4 | activity | Goa Artisan Souvenir Bazaar & Spices | Collect authentic handicrafts, regional sweets, and handwoven gifts | 09:30 AM | 12:00 PM | 600.00 | Goa Local Market | 15.56 | 73.75 | shopping-bag | 0 | - | normal | 13 |
| 40 | 3 | 4 | transport | Return Transit from Goa (Volvo Bus) | Comfortable return journey with unforgettable memories | 02:00 PM | 09:30 PM | 3600.00 | Goa Departure Gate | 15.58 | 73.77 | bus | 0 | - | normal | 14 |

---


## <a id='table-notifications'></a> 📋 Table: `notifications`

**Total Records:** `4` | **Columns:** `9`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`user_id`** | `INTEGER` | NO | - | - |
| 2 | **`role`** | `VARCHAR` | NO | - | - |
| 3 | **`tour_id`** | `INTEGER` | NO | - | - |
| 4 | **`title`** | `VARCHAR` | YES | - | - |
| 5 | **`message`** | `TEXT` | YES | - | - |
| 6 | **`type`** | `VARCHAR` | NO | - | - |
| 7 | **`is_read`** | `BOOLEAN` | NO | - | - |
| 8 | **`created_at`** | `DATETIME` | NO | - | - |

</details>

| **ID** | **USER_ID** | **ROLE** | **TOUR_ID** | **TITLE** | **MESSAGE** | **TYPE** | **IS_READ** | **CREATED_AT** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | - | operator | 3 | ⚠️ Critical Disruption on Tour #TR4664 | Hotel XYZ cancellation on Day 2 for SOM SINGH. Impact calculated and 3 alternatives ranked. | critical | 0 | 2026-09-05 11:48:29.039326 |
| 2 | 19 | traveler | 3 | ⚠️ Schedule Adjustment In Progress | A hotel availability change was detected for Day 2. Your tour operator is applying the highest-rated alternative. | warning | 0 | 2026-09-05 11:48:29.039335 |
| 3 | 19 | traveler | 3 | ✓ Your Itinerary Has Been Updated | Hotel confirmed: Hotel Paradise Goa (3-Star Deluxe). Seamlessly integrated into Day 2 with zero schedule friction. | success | 0 | 2026-09-05 11:50:16.498428 |
| 4 | - | operator | 3 | ✓ Tour #TR4664 Disruption Resolved | Applied Hotel Paradise Goa (3-Star Deluxe) (94% match). Itinerary, pricing, and traveler views synchronized. | success | 0 | 2026-09-05 11:50:16.498435 |

---


## <a id='table-operator_proposals'></a> 📋 Table: `operator_proposals`

**Total Records:** `126` | **Columns:** `12`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`tour_id`** | `INTEGER` | YES | - | - |
| 2 | **`operator_id`** | `INTEGER` | YES | - | - |
| 3 | **`operator_name`** | `VARCHAR` | YES | - | - |
| 4 | **`operator_agency`** | `VARCHAR` | NO | - | - |
| 5 | **`specialty`** | `VARCHAR` | NO | - | - |
| 6 | **`quoted_cost`** | `FLOAT` | YES | - | - |
| 7 | **`operator_rating`** | `FLOAT` | NO | - | - |
| 8 | **`experience_years`** | `INTEGER` | NO | - | - |
| 9 | **`pitch_message`** | `TEXT` | NO | - | - |
| 10 | **`status`** | `VARCHAR` | NO | - | - |
| 11 | **`created_at`** | `DATETIME` | NO | - | - |

</details>

| **ID** | **TOUR_ID** | **OPERATOR_ID** | **OPERATOR_NAME** | **OPERATOR_AGENCY** | **SPECIALTY** | **QUOTED_COST** | **OPERATOR_RATING** | **EXPERIENCE_YEARS** | **PITCH_MESSAGE** | **STATUS** | **CREATED_AT** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 2 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 17800.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:32.788590 |
| 2 | 2 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 18250.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:32.788661 |
| 3 | 2 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 17450.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:32.788665 |
| 4 | 2 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 17950.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | accepted | 2026-09-03 14:55:32.788681 |
| 5 | 2 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 17800.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:32.788685 |
| 6 | 2 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 18250.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:32.788687 |
| 7 | 3 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 29400.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.106185 |
| 8 | 3 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 29850.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.106192 |
| 9 | 3 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 29050.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.106194 |
| 10 | 3 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 29550.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.106196 |
| 11 | 3 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 29400.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.106198 |
| 12 | 3 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 29850.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.106201 |
| 13 | 4 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36200.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.138206 |
| 14 | 4 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 36650.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.138212 |
| 15 | 4 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 35850.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.138214 |
| 16 | 4 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36350.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.138216 |
| 17 | 4 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36200.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.138219 |
| 18 | 4 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 36650.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.138221 |
| 19 | 5 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.187953 |
| 20 | 5 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.187958 |
| 21 | 5 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.187961 |
| 22 | 5 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.187963 |
| 23 | 5 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.187965 |
| 24 | 5 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.187968 |
| 25 | 6 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.220015 |
| 26 | 6 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.220020 |
| 27 | 6 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.220023 |
| 28 | 6 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.220025 |
| 29 | 6 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.220027 |
| 30 | 6 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.220029 |
| 31 | 8 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.247626 |
| 32 | 8 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.247631 |
| 33 | 8 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.247634 |
| 34 | 8 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.247636 |
| 35 | 8 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.247639 |
| 36 | 8 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.247641 |
| 37 | 9 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.277699 |
| 38 | 9 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.277705 |
| 39 | 9 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.277708 |
| 40 | 9 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.277710 |
| 41 | 9 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.277712 |
| 42 | 9 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.277714 |
| 43 | 10 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.303035 |
| 44 | 10 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.303041 |
| 45 | 10 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.303044 |
| 46 | 10 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.303046 |
| 47 | 10 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.303049 |
| 48 | 10 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.303051 |
| 49 | 11 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.330885 |
| 50 | 11 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.330893 |
| 51 | 11 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.330896 |
| 52 | 11 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.330898 |
| 53 | 11 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.330901 |
| 54 | 11 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.330903 |
| 55 | 12 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 41085.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.361836 |
| 56 | 12 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 41535.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.361844 |
| 57 | 12 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 40735.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.361846 |
| 58 | 12 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 41235.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.361849 |
| 59 | 12 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 41085.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.361852 |
| 60 | 12 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 41535.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.361854 |
| 61 | 13 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 14:55:33.389801 |
| 62 | 13 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.389807 |
| 63 | 13 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:55:33.389810 |
| 64 | 13 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:55:33.389812 |
| 65 | 13 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:55:33.389815 |
| 66 | 13 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:55:33.389817 |
| 67 | 14 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 32580.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | rejected | 2026-09-03 14:55:33.414460 |
| 68 | 14 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 33030.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | rejected | 2026-09-03 14:55:33.414466 |
| 69 | 14 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 32230.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | rejected | 2026-09-03 14:55:33.414468 |
| 70 | 14 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Royal Heritage & Luxury Stays | 21200.00 | 4.70 | 5 | We include VIP resort check-in and 24/7 dedicated local field escort. | accepted | 2026-09-03 14:55:33.414470 |
| 71 | 14 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 32580.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | rejected | 2026-09-03 14:55:33.414472 |
| 72 | 14 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & VIP Concierge | 33030.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | rejected | 2026-09-03 14:55:33.414475 |
| 73 | 15 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:58:50.669491 |
| 74 | 15 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:58:50.669498 |
| 75 | 15 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:58:50.669500 |
| 76 | 15 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:58:50.669502 |
| 77 | 15 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:58:50.669505 |
| 78 | 15 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:58:50.669507 |
| 79 | 16 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:59:37.471932 |
| 80 | 16 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:59:37.471938 |
| 81 | 16 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 14:59:37.471940 |
| 82 | 16 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 14:59:37.471942 |
| 83 | 16 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 14:59:37.471944 |
| 84 | 16 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 14:59:37.471947 |
| 85 | 17 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:00:16.115784 |
| 86 | 17 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:00:16.115791 |
| 87 | 17 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 15:00:16.115793 |
| 88 | 17 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 15:00:16.115795 |
| 89 | 17 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:00:16.115797 |
| 90 | 17 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:00:16.115800 |
| 91 | 18 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:00:58.690622 |
| 92 | 18 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:00:58.690629 |
| 93 | 18 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 15:00:58.690631 |
| 94 | 18 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 15:00:58.690633 |
| 95 | 18 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:00:58.690636 |
| 96 | 18 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:00:58.690638 |
| 97 | 19 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:04:03.516296 |
| 98 | 19 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:04:03.516302 |
| 99 | 19 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 15:04:03.516305 |
| 100 | 19 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 15:04:03.516307 |
| 101 | 19 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:04:03.516310 |
| 102 | 19 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:04:03.516312 |
| 103 | 20 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:05:31.489519 |
| 104 | 20 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:05:31.489525 |
| 105 | 20 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 15:05:31.489527 |
| 106 | 20 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 15:05:31.489529 |
| 107 | 20 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:05:31.489532 |
| 108 | 20 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:05:31.489534 |
| 109 | 21 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:05:57.191679 |
| 110 | 21 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:05:57.191685 |
| 111 | 21 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 15:05:57.191688 |
| 112 | 21 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 15:05:57.191690 |
| 113 | 21 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:05:57.191692 |
| 114 | 21 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:05:57.191694 |
| 115 | 22 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:06:21.739660 |
| 116 | 22 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:06:21.739666 |
| 117 | 22 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 36325.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | pending | 2026-09-03 15:06:21.739669 |
| 118 | 22 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 36825.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | pending | 2026-09-03 15:06:21.739671 |
| 119 | 22 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 36675.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | pending | 2026-09-03 15:06:21.739673 |
| 120 | 22 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 37125.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | pending | 2026-09-03 15:06:21.739675 |
| 121 | 23 | 2 | Aarav Mehta | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 41085.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | rejected | 2026-09-03 15:08:57.970960 |
| 122 | 23 | 7 | Test Operator 1907 | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 41535.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | rejected | 2026-09-03 15:08:57.970966 |
| 123 | 23 | 10 | Priya Deshmukh | EcoTransit & Active Journeys | Scenic Transit & Eco Operations | 40735.00 | 4.90 | 9 | Optimized scenic routes, zero transit friction, and real-time adaptive schedule rerouting. | rejected | 2026-09-03 15:08:57.970969 |
| 124 | 23 | 17 | Diya Sen | Himalayan & North India Holiday Ops | Fast Emergency Response | 41235.00 | 4.70 | 5 | Dedicated support coordinator with real-time GPS tracking and instant supplier escalation. | rejected | 2026-09-03 15:08:57.970971 |
| 125 | 23 | 18 | Vikram Nair | Goa Coastal & Adventure Logistics | Beach & Watersports Operations | 41085.00 | 4.90 | 8 | Certified guides, 24/7 on-ground vehicle dispatch, and VIP beach club access. | accepted | 2026-09-03 15:08:57.970974 |
| 126 | 23 | 19 | Priya Sharma | Royal Heritage Tours & Expeditions | Luxury Stays & Concierge | 41535.00 | 4.80 | 6 | Includes priority resort check-ins and curated dining experiences with dedicated field coordinator. | rejected | 2026-09-03 15:08:57.970976 |

---


## <a id='table-payments'></a> 📋 Table: `payments`

**Total Records:** `0` | **Columns:** `11`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`booking_id`** | `INTEGER` | YES | - | - |
| 2 | **`subtotal`** | `FLOAT` | NO | - | - |
| 3 | **`taxes`** | `FLOAT` | NO | - | - |
| 4 | **`service_fee`** | `FLOAT` | NO | - | - |
| 5 | **`discount`** | `FLOAT` | NO | - | - |
| 6 | **`total`** | `FLOAT` | NO | - | - |
| 7 | **`method`** | `VARCHAR` | NO | - | - |
| 8 | **`status`** | `VARCHAR` | NO | - | - |
| 9 | **`transaction_ref`** | `VARCHAR` | NO | - | - |
| 10 | **`created_at`** | `DATETIME` | NO | - | - |

</details>

*(No records in this table currently — start fresh or create new records)*


---


## <a id='table-reviews'></a> 📋 Table: `reviews`

**Total Records:** `0` | **Columns:** `10`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`tour_id`** | `INTEGER` | YES | - | - |
| 2 | **`user_id`** | `INTEGER` | YES | - | - |
| 3 | **`overall_rating`** | `FLOAT` | NO | - | - |
| 4 | **`hotel_rating`** | `FLOAT` | NO | - | - |
| 5 | **`activity_rating`** | `FLOAT` | NO | - | - |
| 6 | **`transport_rating`** | `FLOAT` | NO | - | - |
| 7 | **`operator_rating`** | `FLOAT` | NO | - | - |
| 8 | **`comment`** | `TEXT` | YES | - | - |
| 9 | **`created_at`** | `DATETIME` | NO | - | - |

</details>

*(No records in this table currently — start fresh or create new records)*


---


## <a id='table-tour_groups'></a> 📋 Table: `tour_groups`

**Total Records:** `0` | **Columns:** `8`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`group_code`** | `VARCHAR` | YES | - | - |
| 2 | **`tour_title`** | `VARCHAR` | YES | - | - |
| 3 | **`members_count`** | `INTEGER` | NO | - | - |
| 4 | **`coordinator_name`** | `VARCHAR` | NO | - | - |
| 5 | **`transport_info`** | `VARCHAR` | NO | - | - |
| 6 | **`hotel_info`** | `VARCHAR` | NO | - | - |
| 7 | **`status`** | `VARCHAR` | NO | - | - |

</details>

*(No records in this table currently — start fresh or create new records)*


---


## <a id='table-tours'></a> 📋 Table: `tours`

**Total Records:** `3` | **Columns:** `21`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`code`** | `VARCHAR` | YES | - | - |
| 2 | **`user_id`** | `INTEGER` | YES | - | - |
| 3 | **`destination_id`** | `INTEGER` | YES | - | - |
| 4 | **`title`** | `VARCHAR` | YES | - | - |
| 5 | **`duration_days`** | `INTEGER` | NO | - | - |
| 6 | **`travelers_count`** | `INTEGER` | NO | - | - |
| 7 | **`budget_total`** | `FLOAT` | NO | - | - |
| 8 | **`estimated_cost`** | `FLOAT` | NO | - | - |
| 9 | **`status`** | `VARCHAR` | NO | - | - |
| 10 | **`travel_style`** | `VARCHAR` | NO | - | - |
| 11 | **`accommodation_type`** | `VARCHAR` | NO | - | - |
| 12 | **`transport_type`** | `VARCHAR` | NO | - | - |
| 13 | **`start_date`** | `VARCHAR` | NO | - | - |
| 14 | **`end_date`** | `VARCHAR` | NO | - | - |
| 15 | **`match_percentage`** | `INTEGER` | NO | - | - |
| 16 | **`coordinator_name`** | `VARCHAR` | NO | - | - |
| 17 | **`created_at`** | `DATETIME` | NO | - | - |
| 18 | **`operator_id`** | `INTEGER` | NO | - | - |
| 19 | **`desired_places`** | `TEXT` | NO | - | - |
| 20 | **`ai_recommendation_reason`** | `TEXT` | NO | - | - |

</details>

| **ID** | **CODE** | **USER_ID** | **DESTINATION_ID** | **TITLE** | **DURATION_DAYS** | **TRAVELERS_COUNT** | **BUDGET_TOTAL** | **ESTIMATED_COST** | **STATUS** | **TRAVEL_STYLE** | **ACCOMMODATION_TYPE** | **TRANSPORT_TYPE** | **START_DATE** | **END_DATE** | **MATCH_PERCENTAGE** | **COORDINATOR_NAME** | **CREATED_AT** | **OPERATOR_ID** | **DESIRED_PLACES** | **AI_RECOMMENDATION_REASON** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | TR4297 | 2 | 4 | Manali Personalized Discovery | 4 | 2 | 30000.00 | 32580.00 | planned | Relaxed & Leisure | 3-Star | Volvo Bus | 2026-09-12 | 2026-09-15 | 93 | Aarav Mehta | 2026-09-03 19:49:59.535755 | - | - | - |
| 2 | TR4316 | 2 | 1 | Goa Personalized Discovery | 4 | 2 | 30000.00 | 44655.00 | planned | Beach + Adventure + Food | 3-Star | Volvo Bus | 2026-09-12 | 2026-09-15 | 98 | Aarav Mehta | 2026-09-03 20:22:35.983508 | 3 | Fort Aguada & 17th-Century Lighthouse, Dudhsagar Waterfalls & Spice Safari, Anjuna Flea Market, Curlies Sunset Shack | 🏆 #1 Top AI Pick (99% Match): Goa Coastal Expeditions & Watersports is the highest-compatibility operator for your requested places in Goa with 4.9★ traveler satisfaction. |
| 3 | TR4664 | 19 | 1 | Goa Personalized Discovery | 4 | 2 | 25000.00 | 45600.00 | active | Beach + Adventure + Food | 3-Star | Volvo Bus | 2026-09-12 | 2026-09-15 | 98 | Aarav Mehta | 2026-09-05 11:30:56.927724 | 3 | Baga Beach Watersports, Fort Aguada & 17th-Century Lighthouse, Grande Island Scuba Diving & Dolphin Spotting | ⭐ Selected Partner (99% Match): Goa Coastal Expeditions & Watersports assigned for Goa Beach + Adventure + Food. |

---


## <a id='table-transports'></a> 📋 Table: `transports`

**Total Records:** `2` | **Columns:** `7`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`transport_type`** | `VARCHAR` | YES | - | - |
| 2 | **`from_city`** | `VARCHAR` | NO | - | - |
| 3 | **`to_destination_id`** | `INTEGER` | YES | - | - |
| 4 | **`base_price`** | `FLOAT` | YES | - | - |
| 5 | **`duration_hours`** | `FLOAT` | NO | - | - |
| 6 | **`operator_name`** | `VARCHAR` | NO | - | - |

</details>

| **ID** | **TRANSPORT_TYPE** | **FROM_CITY** | **TO_DESTINATION_ID** | **BASE_PRICE** | **DURATION_HOURS** | **OPERATOR_NAME** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Volvo AC Multi-Axle Sleeper Bus | Mumbai | 1 | 1600.00 | 11.50 | Travora Royal Lines |
| 2 | Direct Flight (Indigo / Air India) | Mumbai | 1 | 4200.00 | 1.20 | Travora Air Express |

---


## <a id='table-users'></a> 📋 Table: `users`

**Total Records:** `18` | **Columns:** `16`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`email`** | `VARCHAR` | YES | - | - |
| 2 | **`name`** | `VARCHAR` | YES | - | - |
| 3 | **`role`** | `VARCHAR` | NO | - | - |
| 4 | **`phone`** | `VARCHAR` | NO | - | - |
| 5 | **`password_hash`** | `VARCHAR` | NO | - | - |
| 6 | **`created_at`** | `DATETIME` | NO | - | - |
| 7 | **`company_name`** | `TEXT` | NO | - | - |
| 8 | **`specialties`** | `TEXT` | NO | - | - |
| 9 | **`operating_destinations`** | `TEXT` | NO | - | - |
| 10 | **`rating`** | `FLOAT` | NO | - | 4.8 |
| 11 | **`tours_completed`** | `INTEGER` | NO | - | 120 |
| 12 | **`fleet_size`** | `TEXT` | NO | - | '12 Vehicles' |
| 13 | **`response_time_minutes`** | `INTEGER` | NO | - | 5 |
| 14 | **`badge`** | `TEXT` | NO | - | 'Verified Partner' |
| 15 | **`bio`** | `TEXT` | NO | - | - |

</details>

| **ID** | **EMAIL** | **NAME** | **ROLE** | **PHONE** | **CREATED_AT** | **COMPANY_NAME** | **SPECIALTIES** | **OPERATING_DESTINATIONS** | **RATING** | **TOURS_COMPLETED** | **FLEET_SIZE** | **RESPONSE_TIME_MINUTES** | **BADGE** | **BIO** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2 | krishna@gmail.com | KRISHNA | traveler | +91 98765 43210 | 2026-09-03 19:49:15.224708 | - | - | - | 4.80 | 120 | 12 Vehicles | 5 | Verified Partner | - |
| 3 | aarav.mehta@travora.demo | Aarav Mehta | operator | +91 98200 11223 | 2026-09-03 20:10:42.610766 | Goa Coastal Expeditions & Watersports | Beach, Adventure, Scuba Diving, Watersports, Nightlife | Goa, Mumbai | 4.90 | 184 | 14 Speedboats & Jet Skis, 8 AC Vans | 4 | 🏆 Top Rated Goa Partner | 12+ years organizing premier coastal expeditions, certified PADI scuba diving packages, and 24/7 on-ground dispatch in North & South Goa. |
| 4 | vikram.rathore@travora.demo | Vikram Rathore | operator | +91 98111 33445 | 2026-09-03 20:10:42.610774 | Royal Rajputana Heritage Journeys | Heritage, Culture, Palaces & Forts, Desert Safari, Royal Dining | Jaipur, Udaipur | 4.90 | 240 | 12 Luxury AC Coaches & Chauffeur Sedans | 5 | 👑 Royal Heritage Specialist | Descendant of royal court guides, crafting bespoke palace excursions, elephant sanctuary safaris, and exclusive Sheesh Mahal evening access. |
| 5 | ananya.nair@travora.demo | Ananya Nair | operator | +91 98450 77889 | 2026-09-03 20:10:42.610778 | Kerala Backwater Bliss & Ayurveda | Relaxed, Nature, Houseboats, Ayurvedic Wellness, Tea Plantations | Kerala (Alleppey & Munnar) | 4.90 | 195 | 9 Premium Houseboats, 6 AC Cabs | 5 | 🌿 Eco & Wellness Specialist | Curating tranquil luxury backwater cruises across Alleppey and organic tea plantation cloud walks in Munnar. |
| 6 | kavita.joshi@travora.demo | Kavita Joshi | operator | +91 98190 22334 | 2026-09-03 20:10:42.610780 | Himalayan High-Altitude Treks | Adventure, Snow, Trekking, Paragliding, River Rafting | Manali, Rishikesh | 4.80 | 152 | 10 4x4 Mountain SUVs | 7 | 🏔️ Mountain Adventure Lead | Certified mountaineer leading thrill-seekers through Solang Valley, Rohtang Pass, and Beas white-water rapids. |
| 7 | farooq.mir@travora.demo | Farooq Mir | operator | +91 98710 44556 | 2026-09-03 20:10:42.610782 | Paradise Kashmir Shikara & Alpine Tours | Luxury, Nature, Shikara Cruises, Gulmarg Skiing, Mughal Gardens | Kashmir (Srinagar & Gulmarg) | 4.90 | 215 | 16 Shikaras, 8 Luxury Vans | 4 | ⭐ Dal Lake Master Host | 3rd-generation Dal Lake host providing luxury carved cedar houseboats and private gondola ski transfers in Gulmarg. |
| 8 | devendra.sharma@travora.demo | Devendra Sharma | operator | +91 98220 55667 | 2026-09-03 20:10:42.610785 | Holy Ganges & Yoga Expeditions | Adventure, Wellness, River Rafting, Bungee, Spiritual Aarti | Rishikesh | 4.80 | 138 | 14 River Rafts, 6 Force Travelers | 6 | 🌊 Rapid Water Expert | Safety-certified Grade IV white water expedition leader and spiritual wellness coordinator along the sacred Ganges. |
| 9 | rohan.deshmukh@travora.demo | Rohan Deshmukh | operator | +91 98330 66778 | 2026-09-03 20:10:42.610787 | Konkan Express Tour Liners | Budget, Backpackers, Beach Shacks, Foodie Trails, Nightlife | Goa, Mumbai | 4.70 | 168 | 18 Volvo Multi-Axle Coaches | 5 | 🎒 Best Value Partner | Specialist in seamless budget transit, youth hostel connections, and authentic Konkani seafood shack trails. |
| 10 | pooja.hegde@travora.demo | Pooja Hegde | operator | +91 98100 88990 | 2026-09-03 20:10:42.610789 | Lakes & Royalty Private Curators | Luxury, Romantic, Honeymoon, Lake Pichola, 5-Star Resorts | Udaipur, Jaipur | 4.90 | 112 | 6 Mercedes & BMW Chauffeur Fleet | 3 | ✨ Ultra Luxury Concierge | Bespoke romantic itineraries with private Lake Pichola boat charters, candlelit rooftop dining, and palace suites. |
| 11 | sanjay.kulkarni@travora.demo | Sanjay Kulkarni | operator | +91 98400 99001 | 2026-09-03 20:10:42.610791 | Western Ghats & Wildlife Safaris | Nature, Eco-tourism, Wildlife Safari, Spice Plantations, Birding | Goa, Kerala | 4.80 | 145 | 8 4x4 Safari Jeeps | 6 | 🐾 Certified Naturalist | Expert wildlife tracker guiding jeep safaris through Dudhsagar cascades and Periyar elephant reserves. |
| 12 | meera.singhania@travora.demo | Meera Singhania | operator | +91 98660 11223 | 2026-09-03 20:10:42.610793 | Pink City Cultural Walks & Bazaars | Culture, Photography, Textile Block Printing, Foodie Walks | Jaipur | 4.80 | 98 | 4 Luxury AC Urban Vans | 5 | 📸 Heritage & Craft Lead | Professional travel photographer and historian conducting guided bazaar walks through Johari and Bapu markets. |
| 13 | tenzing.norbu@travora.demo | Tenzing Norbu | operator | +91 98990 33445 | 2026-09-03 20:10:42.610795 | Rohtang Snow & Mountain Pass Expeditions | Adventure, Snow, High Passes, Mountain Biking, Glacier Trekking | Manali | 4.90 | 178 | 14 4WD Snow Cabs | 4 | ❄️ High-Altitude Specialist | Veteran Himalayan guide specializing in Rohtang Pass, Solang Valley paragliding, and winter snow trails. |
| 14 | zubair.ahmed@travora.demo | Zubair Ahmed | operator | +91 98770 55667 | 2026-09-03 20:10:42.610797 | Mughal Valley Luxury Concierge | Luxury, Winter Sports, Private Shikaras, VIP Villas | Kashmir | 4.90 | 88 | 5 Luxury SUVs | 3 | 💎 VIP Concierge Partner | Exclusive VIP travel concierge for luxury Dal Lake houseboats, private Gulmarg heliskiing, and Pahalgam retreats. |
| 15 | tarun.bannerjee@travora.demo | Tarun Bannerjee | operator | +91 98110 77889 | 2026-09-03 20:10:42.610800 | All-India Adventure & Youth Expeditions | Group Adventures, Student Tours, Water Sports, Bus Fleets | Goa, Rishikesh, Manali | 4.70 | 225 | 20 Multi-Axle Volvo Buses | 8 | 🚌 Fleet & Group Master | Handling large-scale corporate offsites, student adventure groups, and multi-state holiday tours. |
| 16 | priya.sharma@travora.demo | Priya Sharma | operator | +91 98765 43210 | 2026-09-03 20:10:42.610802 | Travora Elite Dynamic Operations | AI-Synchronized Dynamic Tours, 24/7 Fast Rerouting, All-Inclusive | Goa, Jaipur, Kerala, Manali, Kashmir, Rishikesh, Udaipur | 4.90 | 310 | 25 Multi-Tier Vehicles | 2 | ⚡ Instant 2-Min Dispatch | Primary Travora operations lead with 24/7 AI-monitored fleet dispatch and real-time vendor disruption resolution. |
| 17 | karan.singhal.4@travora.partner | Karan Singhal | operator | +91 98888 77766 | 2026-09-03 20:13:09.745078 | Singhal Desert & Camel Caravans | Desert Camping, Cultural Shows, Royal Palaces | Jaipur, Udaipur, Jaisalmer | 4.90 | 25 | 15 AC Coaches & 6 Desert Jeeps | 3 | New Verified Operator | Certified Tour Operator based in Jaipur, Udaipur, Jaisalmer. |
| 18 | karan.singhal.2@travora.partner | Karan Singhal | operator | +91 98888 77766 | 2026-09-03 20:22:36.470598 | Singhal Desert & Camel Caravans | Desert Camping, Cultural Shows, Royal Palaces | Jaipur, Udaipur, Jaisalmer | 4.90 | 25 | 15 AC Coaches & 6 Desert Jeeps | 3 | New Verified Operator | Certified Tour Operator based in Jaipur, Udaipur, Jaisalmer. |
| 19 | som25cs@student.mes.ac.in | SOM SINGH | traveler | +91 98765 43210 | 2026-09-05 11:30:24.775497 | - | - | - | 4.80 | 0 | 12 Vehicles | 5 | Verified Traveler | - |

---


## <a id='table-vendors'></a> 📋 Table: `vendors`

**Total Records:** `4` | **Columns:** `10`

<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>

| Column # | Name | Data Type | Not Null | Primary Key | Default |
|:---:|:---|:---|:---:|:---:|:---|
| 0 | **`id`** | `INTEGER` | YES | 🔑 YES | - |
| 1 | **`name`** | `VARCHAR` | YES | - | - |
| 2 | **`category`** | `VARCHAR` | YES | - | - |
| 3 | **`rating`** | `FLOAT` | NO | - | - |
| 4 | **`availability`** | `VARCHAR` | NO | - | - |
| 5 | **`price_range`** | `VARCHAR` | NO | - | - |
| 6 | **`status`** | `VARCHAR` | NO | - | - |
| 7 | **`contact`** | `VARCHAR` | NO | - | - |
| 8 | **`location`** | `VARCHAR` | NO | - | - |
| 9 | **`fleet_or_inventory`** | `VARCHAR` | NO | - | - |

</details>

| **ID** | **NAME** | **CATEGORY** | **RATING** | **AVAILABILITY** | **PRICE_RANGE** | **STATUS** | **CONTACT** | **LOCATION** | **FLEET_OR_INVENTORY** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Paradise Hospitality Group | Hotels | 4.80 | High (42 Rooms) | ₹₹₹ | Active | +91 98201 54321 | North Goa (Baga) | 42 Deluxe Rooms |
| 2 | Goa Aqua Adventures & Water Sports | Activities | 4.90 | High | ₹₹ | Active | +91 98333 77889 | Calangute Watersports Jetty | 14 Jet Skis, 6 Speedboats |
| 3 | Royal Konkan Express Coach Fleet | Transport | 4.70 | Operational | ₹₹ | Active | +91 98111 44556 | Mumbai - Goa Highway | 12 Volvo Multi-Axle Coaches |
| 4 | Spice Coast Heritage Tours | Guides | 4.90 | High | ₹ | Active | +91 98444 66778 | Panjim Latin Quarter | 8 Certified Multilingual Guides |

---
