import { store } from '../store.js';
import { api } from '../api.js';

// Global state for planner interaction & real-time sensing
if (!window.plannerState) {
  window.plannerState = {
    selectedPlaces: ["Baga Beach Watersports", "Fort Aguada & 17th-Century Lighthouse", "Grande Island Scuba Diving & Dolphin Spotting"],
    customPlaces: [],
    selectedOperatorId: null,
    userHasManuallySelectedOperator: false,
    matchedOperators: [],
    sensedData: null,
    isOperatorsDrawerOpen: false,
    operatorSearchQuery: "",
    operatorDestFilter: "all",
    isSensingLoading: false
  };
}

// Preset Landmarks Catalog for Instant Offline / Fast Display
const DEFAULT_LANDMARKS = {
  "goa": [
    { name: "Baga Beach Watersports", category: "Adventure", icon: "waves", desc: "Parasailing, Jet Ski & Bumper rides" },
    { name: "Fort Aguada & 17th-Century Lighthouse", category: "Heritage", icon: "shield", desc: "Portuguese coastal bastion" },
    { name: "Dudhsagar Waterfalls & Spice Safari", category: "Nature", icon: "droplets", desc: "4x4 jungle jeep safari" },
    { name: "Grande Island Scuba Diving & Dolphin Spotting", category: "Adventure", icon: "compass", desc: "Certified PADI coral reef diving" },
    { name: "Fontainhas Latin Quarter Walking Tour", category: "Culture", icon: "camera", desc: "Colonial Portuguese alleys & bakeries" },
    { name: "Curlies & Shiva Valley Sunset Beach Shack", category: "Nightlife", icon: "sparkles", desc: "Cliffside seafood & sunset music" },
    { name: "Chapora Fort (Sunset Panorama)", category: "Heritage", icon: "map-pin", desc: "Vagator & Morjim coast view" },
    { name: "Mandovi River Luxury Sunset Cruise", category: "Relaxed", icon: "navigation", desc: "Goan folk dance & DJ sailing" }
  ],
  "jaipur": [
    { name: "Amer Fort & Sheesh Mahal (Mirror Palace)", category: "Heritage", icon: "shield", desc: "Grand Rajputana hilltop palace" },
    { name: "Hawa Mahal (Palace of Winds)", category: "Heritage", icon: "camera", desc: "953 honeycombed royal jharokhas" },
    { name: "City Palace & Royal Armory Museum", category: "Culture", icon: "award", desc: "Peacock Gate & Maharaja galleries" },
    { name: "Nahargarh Fort Sunset Over Pink City", category: "Scenic", icon: "sun", desc: "Aravali sunset bastion views" },
    { name: "Chokhi Dhani Rajasthani Cultural Village", category: "Food", icon: "utensils", desc: "Folk dances, camel rides & thali" },
    { name: "Johari Bazaar & Bapu Bazaar Shopping Trail", category: "Shopping", icon: "shopping-bag", desc: "Jewelry, pottery & handicrafts" }
  ],
  "kerala": [
    { name: "Alleppey Luxury Private Houseboat Cruise", category: "Relaxed", icon: "anchor", desc: "Emerald lagoon cruise & Karimeen feast" },
    { name: "Munnar Kolukkumalai Tea Estate & Cloud Walk", category: "Nature", icon: "mountain", desc: "High-altitude organic tea plantations" },
    { name: "Fort Kochi Heritage & Chinese Fishing Nets", category: "Culture", icon: "camera", desc: "Colonial spice warehouses & nets" },
    { name: "Periyar Wildlife Sanctuary Jungle Boat Safari", category: "Adventure", icon: "compass", desc: "Wild elephant herds & lake safari" }
  ],
  "manali": [
    { name: "Solang Valley Paragliding & Zorbing Rush", category: "Adventure", icon: "wind", desc: "Tandem paragliding & mountain peaks" },
    { name: "Rohtang Pass Snow Point & Glacier Walk", category: "Snow", icon: "mountain-snow", desc: "13,050 ft mountain snow sports" },
    { name: "Old Manali Wooden Cafes & Hadimba Temple", category: "Culture", icon: "coffee", desc: "Cedar forests & riverside cafes" },
    { name: "Beas River White Water Rafting Challenge", category: "Adventure", icon: "zap", desc: "14 km Grade III rapid challenge" }
  ],
  "udaipur": [
    { name: "City Palace & Lake Pichola Royal Boat Ride", category: "Heritage", icon: "anchor", desc: "Marble courtyards & private boat ride" },
    { name: "Sajjangarh Monsoon Palace Sunset Panorama", category: "Scenic", icon: "sun", desc: "Hilltop palace overlooking Aravali" },
    { name: "Saheliyon-ki-Bari Marble Fountains & Gardens", category: "Culture", icon: "flower", desc: "Lotus pools & royal courtyards" }
  ],
  "kashmir": [
    { name: "Dal Lake Morning Shikara Cruise & Floating Market", category: "Scenic", icon: "sun", desc: "Traditional cedar boat & water lilies" },
    { name: "Gulmarg Gondola Cable Car (Phase 1 & 2)", category: "Snow", icon: "mountain-snow", desc: "13,780 ft ropeway & alpine skiing" },
    { name: "Pahalgam Betaab Valley & Aru Valley Safari", category: "Nature", icon: "trees", desc: "Pristine Lidder river & pine trails" }
  ],
  "rishikesh": [
    { name: "Shivpuri Grade IV River Rafting & Cliff Jump", category: "Adventure", icon: "waves", desc: "Roller Coaster rapids & 25ft jump" },
    { name: "Triveni Ghat Evening Maha Ganga Aarti", category: "Culture", icon: "flame", desc: "Vedic chants & floating oil lamps" },
    { name: "Beatles Ashram & Sound Meditation Sanctuary", category: "Wellness", icon: "sparkles", desc: "Chaurasi Kutia dome murals" }
  ]
};

export function renderTripPlanner() {
  const state = store.getState();
  const currentDest = window.plannerSelectedDest || 'Goa';
  const destKey = currentDest.toLowerCase().split(' ')[0].split('(')[0].trim();
  const landmarks = DEFAULT_LANDMARKS[destKey] || DEFAULT_LANDMARKS["goa"];

  // Fallback operators if API not loaded yet
  const matchedOps = window.plannerState.matchedOperators.length > 0 
    ? window.plannerState.matchedOperators 
    : [
        {
          id: 1,
          name: "Aarav Mehta",
          company_name: "Goa Coastal Expeditions & Watersports",
          rating: 4.9,
          tours_completed: 184,
          fleet_size: "14 Speedboats & Jet Skis, 8 AC Vans",
          response_time_minutes: 4,
          badge: "🏆 Top Rated Goa Partner",
          match_score: 99,
          is_recommended: true,
          specialties: ["Beach", "Adventure", "Scuba Diving", "Watersports"],
          operating_destinations: ["Goa", "Mumbai"],
          ai_recommendation_reason: "🏆 #1 Top AI Pick (99% Match): Goa Coastal Expeditions & Watersports is the highest-compatibility operator for your requested places in Goa with 4.9★ traveler satisfaction and 14 Speedboats & Jet Skis."
        },
        {
          id: 7,
          name: "Rohan Deshmukh",
          company_name: "Konkan Express Tour Liners",
          rating: 4.7,
          tours_completed: 168,
          fleet_size: "18 Volvo Multi-Axle Coaches",
          response_time_minutes: 5,
          badge: "🎒 Best Value Partner",
          match_score: 91,
          is_recommended: false,
          specialties: ["Budget", "Backpackers", "Beach Shacks", "Foodie Trails"],
          operating_destinations: ["Goa", "Mumbai"],
          ai_recommendation_reason: "⭐ 91% Match: Specialist in seamless budget transit, youth hostel connections, and authentic seafood shack trails."
        },
        {
          id: 14,
          name: "Priya Sharma",
          company_name: "Travora Elite Dynamic Operations",
          rating: 4.9,
          tours_completed: 310,
          fleet_size: "25 Multi-Tier Vehicles",
          response_time_minutes: 2,
          badge: "⚡ Instant 2-Min Dispatch",
          match_score: 96,
          is_recommended: false,
          specialties: ["AI-Synchronized Dynamic Tours", "24/7 Fast Rerouting"],
          operating_destinations: ["Goa", "Jaipur", "Kerala", "Manali"],
          ai_recommendation_reason: "⭐ 96% Match: Multi-tier vehicle operations with rapid rerouting and 2-min instant dispatch response."
        }
      ];

  const topOperator = matchedOps.find(op => op.is_recommended) || matchedOps[0];
  
  // Decide which operator is active
  let selectedOpId = window.plannerState.selectedOperatorId;
  if (!selectedOpId) {
    selectedOpId = topOperator ? topOperator.id : null;
    window.plannerState.selectedOperatorId = selectedOpId;
  }
  const activeOperator = matchedOps.find(op => op.id === selectedOpId) || topOperator;
  const isCustomUserChoice = window.plannerState.userHasManuallySelectedOperator && activeOperator && topOperator && (activeOperator.id !== topOperator.id);

  // Sensed Places breakdown
  const sensedData = window.plannerState.sensedData || {
    total_sensed: window.plannerState.selectedPlaces.length + window.plannerState.customPlaces.length,
    style_breakdown: { "Beach & Adventure": "60%", "Heritage": "40%" },
    transit_estimate_minutes: 22,
    pace_rating: "Optimal Pace (2-3 highlights/day)",
    personalized_tips: [
      {
        icon: "waves",
        title: "Marine & Water Sports Scheduling",
        tip: "Grande Island & Baga watersports are scheduled for morning (07:30 - 11:30 AM) when the Arabian Sea is calm and dolphin visibility peaks."
      },
      {
        icon: "shield",
        title: "Golden-Hour Forts & Sunset Vistas",
        tip: "Coastal fort ramparts are sequenced for late afternoon (04:00 - 06:30 PM) to avoid midday heat and capture panoramic sunset photos."
      },
      {
        icon: "zap",
        title: "Real-Time Route Optimization",
        tip: "All requested spots are grouped into an efficient North Goa coastal loop (~20 min transit between highlights)."
      }
    ]
  };

  // Filter operators for drawer
  const drawerFilter = window.plannerState.operatorDestFilter || "all";
  const drawerSearch = (window.plannerState.operatorSearchQuery || "").toLowerCase();
  const filteredOperators = matchedOps.filter(op => {
    const matchesDest = drawerFilter === "all" || (op.operating_destinations || []).some(d => d.toLowerCase().includes(drawerFilter.toLowerCase()));
    const matchesSearch = !drawerSearch || 
      op.name.toLowerCase().includes(drawerSearch) || 
      op.company_name.toLowerCase().includes(drawerSearch) ||
      (op.fleet_size || "").toLowerCase().includes(drawerSearch) ||
      (op.specialties || []).some(s => s.toLowerCase().includes(drawerSearch));
    return matchesDest && matchesSearch;
  });

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HEADER -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold border border-teal-500/20">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-teal-500"></i>
          <span>AI TRIP ARCHITECT & OPERATOR MATCHMAKER</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Design Your Dynamic Itinerary
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Specify your destination, budget, desired landmarks, and travel style. TRAVORA pairs you with the highest-matched certified Tour Operator and synthesizes a live-adaptable schedule.
        </p>
      </div>

      <!-- FORM CONTAINER -->
      <div class="surface-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8 relative overflow-hidden backdrop-blur-xl">
        
        <form id="trip-planner-form" onsubmit="window.handleCreateTripSubmit(event)" class="space-y-8">

          <!-- STEP 1: DESTINATION -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Step 1 • Choose Destination
              </label>
              <span class="text-[11px] font-semibold text-teal-600 dark:text-teal-400">7 Indian Holiday Hubs Available</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              ${[
                { name: "Goa", state: "Goa Coast", icon: "palmtree" },
                { name: "Jaipur", state: "Rajasthan", icon: "crown" },
                { name: "Kerala", state: "Alleppey & Munnar", icon: "ship" },
                { name: "Manali", state: "Himachal", icon: "mountain" },
                { name: "Udaipur", state: "Rajasthan", icon: "castle" },
                { name: "Kashmir", state: "Srinagar & Gulmarg", icon: "snowflake" },
                { name: "Rishikesh", state: "Uttarakhand", icon: "waves" },
                { name: "Mumbai", state: "Maharashtra", icon: "building-2" }
              ].map((d) => {
                const isChecked = d.name === currentDest;
                return `
                  <label class="cursor-pointer" onclick="window.onPlannerDestChange('${d.name}')">
                    <input type="radio" name="destination_name" value="${d.name}" class="peer sr-only" ${isChecked ? 'checked' : ''} />
                    <div class="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 peer-checked:border-teal-500 peer-checked:bg-teal-500/10 dark:peer-checked:bg-teal-950/40 peer-checked:text-teal-600 dark:peer-checked:text-teal-400 transition text-center space-y-1 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
                      <div class="font-bold text-sm text-slate-800 dark:text-slate-200">${d.name}</div>
                      <div class="text-[10px] text-slate-400">${d.state}</div>
                    </div>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- STEP 2: REAL-TIME LANDMARK & PLACES SENSING (CORE REQUIREMENT) -->
          <div class="space-y-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-teal-500/5 via-slate-50 to-slate-50 dark:from-teal-950/20 dark:via-slate-950/40 dark:to-slate-950/40 border border-teal-500/20">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span class="text-teal-600 dark:text-teal-400 font-extrabold">Step 2 • Real-Time Places Sensing Engine</span>
                </label>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">
                  Select places or type any landmark. TRAVORA analyzes geo-clusters, senses activity tags, and customizes operator matching in real time.
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-[10px] font-bold px-3 py-1 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30 flex items-center space-x-1">
                  <i data-lucide="map-pin" class="w-3 h-3"></i>
                  <span>${window.plannerState.selectedPlaces.length + window.plannerState.customPlaces.length} Sensed Spots</span>
                </span>
              </div>
            </div>

            <!-- SENSED STYLE BREAKDOWN RADAR BAR -->
            ${sensedData && sensedData.style_breakdown ? `
              <div class="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                    <i data-lucide="pie-chart" class="w-3.5 h-3.5 text-teal-500"></i>
                    <span>Sensed Travel Profile & Distribution:</span>
                  </span>
                  <span class="text-[10px] font-semibold text-slate-400">
                    Est. Inter-Spot Transit: ~${sensedData.transit_estimate_minutes || 20} mins
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  ${Object.entries(sensedData.style_breakdown).map(([cat, pct]) => `
                    <span class="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold text-[10px] border border-teal-500/20 flex items-center space-x-1">
                      <span>${cat}:</span>
                      <span class="text-amber-500 font-extrabold">${pct}</span>
                    </span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- POPULAR LANDMARK PILLS -->
            <div class="space-y-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Click Highlights to Add / Remove in Real-Time:
              </span>
              <div class="flex flex-wrap gap-2 pt-0.5">
                ${landmarks.map(lm => {
                  const isSelected = window.plannerState.selectedPlaces.includes(lm.name);
                  return `
                    <button 
                      type="button" 
                      onclick="window.togglePlannerPlace('${lm.name.replace(/'/g, "\\'")}')"
                      class="px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center space-x-1.5 ${
                        isSelected 
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/20' 
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500'
                      }">
                      <span>${isSelected ? '✓' : '+'}</span>
                      <span>${lm.name}</span>
                      <span class="text-[9px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-teal-700 text-teal-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}">${lm.category}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- CUSTOM PLACES INPUT -->
            <div class="space-y-2 pt-1">
              <div class="flex items-center space-x-2">
                <div class="relative flex-1">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3"></i>
                  <input 
                    type="text" 
                    id="custom-place-input" 
                    placeholder="Want to visit somewhere else? (e.g. Anjuna Flea Market, Thalassa, Tito's Lane) - Press Enter" 
                    onkeydown="if(event.key==='Enter'){event.preventDefault(); window.addCustomPlace();}"
                    class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <button 
                  type="button" 
                  onclick="window.addCustomPlace()" 
                  class="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm transition shrink-0 flex items-center space-x-1">
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                  <span>Add Place</span>
                </button>
              </div>

              ${window.plannerState.customPlaces.length > 0 ? `
                <div class="flex flex-wrap gap-1.5 mt-1">
                  ${window.plannerState.customPlaces.map((cp, idx) => `
                    <span class="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-200 text-xs border border-amber-500/30">
                      <span>📍 ${cp}</span>
                      <button type="button" onclick="window.removeCustomPlace(${idx})" class="hover:text-red-500 font-bold ml-1.5">×</button>
                    </span>
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <!-- PERSONALIZED AI SENSED HIGHLIGHTS & TIPS -->
            ${sensedData && sensedData.personalized_tips && sensedData.personalized_tips.length > 0 ? `
              <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-500/30 shadow-sm space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <i data-lucide="sparkles" class="w-4 h-4 text-amber-500"></i>
                    <h4 class="font-extrabold text-xs text-slate-900 dark:text-white">
                      Personalized AI Insights for Sensed Spots
                    </h4>
                  </div>
                  <span class="text-[10px] text-teal-600 dark:text-teal-400 font-bold">Auto-Optimized Schedule</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  ${sensedData.personalized_tips.map(tip => `
                    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-[11px] space-y-1 border border-slate-200 dark:border-slate-800">
                      <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                        <i data-lucide="${tip.icon || 'compass'}" class="w-3.5 h-3.5 text-teal-500"></i>
                        <span>${tip.title}</span>
                      </div>
                      <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
                        ${tip.tip}
                      </p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          </div>

          <!-- STEP 3: CERTIFIED TOUR OPERATOR & AI MATCHMAKER (DECIDE OPERATOR) -->
          <div class="space-y-4 p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2">
                  <span class="text-amber-500">🏢</span>
                  <span>Step 3 • Tour Operator Assignment (AI Match & Traveler Choice)</span>
                </label>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">
                  TRAVORA evaluated 15+ certified tour operators and recommended the best match for your requested landmarks. You can go with the AI pick or choose any operator manually.
                </p>
              </div>

              <div class="flex items-center space-x-2">
                <button 
                  type="button" 
                  onclick="window.toggleOperatorsDrawer()" 
                  class="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition flex items-center space-x-1.5">
                  <i data-lucide="users" class="w-3.5 h-3.5"></i>
                  <span>${window.plannerState.isOperatorsDrawerOpen ? 'Close Operator Catalog' : 'Browse All 15+ Operators'}</span>
                </button>
              </div>
            </div>

            <!-- ACTIVE / RECOMMENDED OPERATOR HERO CARD -->
            ${activeOperator ? `
              <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 ${isCustomUserChoice ? 'border-amber-500 shadow-md' : 'border-teal-500/80 shadow-lg shadow-teal-500/10'} space-y-3.5 transition">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-center space-x-3.5">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 via-amber-500 to-emerald-500 p-[1.5px] shadow-md shrink-0">
                      <div class="w-full h-full rounded-[14px] bg-slate-950 text-white flex items-center justify-center font-black text-sm">
                        ${activeOperator.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center space-x-2">
                        <h4 class="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                          ${activeOperator.name}
                        </h4>
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${isCustomUserChoice ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30' : 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30'}">
                          ${isCustomUserChoice ? '✓ Traveler Selected' : (activeOperator.badge || '🏆 AI Top Pick')}
                        </span>
                      </div>
                      <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        ${activeOperator.company_name}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-2.5 self-start sm:self-center">
                    <div class="text-right">
                      <div class="text-sm font-black text-amber-500 flex items-center space-x-1 justify-end">
                        <span>⭐ ${activeOperator.rating || 4.9}</span>
                        <span class="text-[10px] text-slate-400 font-normal">(${activeOperator.tours_completed || 150}+ tours)</span>
                      </div>
                      <div class="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                        ⚡ ${activeOperator.response_time_minutes || 4}-min dispatch response
                      </div>
                    </div>
                    <div class="px-3 py-1.5 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300 font-extrabold text-xs border border-teal-500/30">
                      ${activeOperator.match_score || 98}% Match
                    </div>
                  </div>
                </div>

                <!-- AI REASONING / ASSIGNMENT BANNER -->
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-start space-x-2">
                  <i data-lucide="sparkles" class="w-4 h-4 text-amber-500 shrink-0 mt-0.5"></i>
                  <div>
                    <strong>${isCustomUserChoice ? 'Traveler Chosen Assignment:' : 'AI Match Rationale:'}</strong>
                    <span class="ml-1">${activeOperator.ai_recommendation_reason}</span>
                  </div>
                </div>

                <!-- OPERATOR CREDENTIALS & ACTION BUTTONS -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px]">
                  <div class="flex flex-wrap items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <span class="font-semibold text-slate-700 dark:text-slate-300">Fleet:</span>
                    <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">${activeOperator.fleet_size || '12 Vehicles'}</span>
                    <span>•</span>
                    <span class="font-semibold text-slate-700 dark:text-slate-300">Specialties:</span>
                    ${(activeOperator.specialties || ['Beach', 'Adventure']).map(s => `
                      <span class="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-medium text-[10px]">${s}</span>
                    `).join('')}
                  </div>

                  <div class="flex items-center space-x-2">
                    ${isCustomUserChoice && topOperator ? `
                      <button 
                        type="button" 
                        onclick="window.resetToAIRecommendedOperator()" 
                        class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold transition flex items-center space-x-1"
                        title="Reset operator selection to AI Top Pick (${topOperator.name})">
                        <i data-lucide="rotate-ccw" class="w-3 h-3 text-teal-500"></i>
                        <span>Reset to AI Pick</span>
                      </button>
                    ` : ''}
                    <button 
                      type="button" 
                      onclick="window.openOperatorDetailModal(${activeOperator.id})" 
                      class="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-[11px] font-bold transition flex items-center space-x-1">
                      <i data-lucide="info" class="w-3 h-3"></i>
                      <span>View Bio & Fleet</span>
                    </button>
                    <button 
                      type="button" 
                      onclick="window.toggleOperatorsDrawer()" 
                      class="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 text-teal-700 dark:text-teal-300 text-[11px] font-bold transition">
                      Choose Another
                    </button>
                  </div>
                </div>

                <input type="hidden" name="operator_id" id="selected-operator-id" value="${activeOperator.id}" />
              </div>
            ` : ''}

            <!-- EXPANDABLE OPERATOR DRAWER / COMPARISON GALLERY -->
            ${window.plannerState.isOperatorsDrawerOpen ? `
              <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3.5">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 class="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Compare & Choose an Operator (${filteredOperators.length} Available)
                    </h5>
                    <p class="text-[11px] text-slate-400">
                      Filter by destination or search by vehicle type, specialty, or company name.
                    </p>
                  </div>

                  <!-- SEARCH INPUT -->
                  <div class="relative w-full sm:w-64">
                    <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5"></i>
                    <input 
                      type="text" 
                      placeholder="Search name, fleet, scuba..." 
                      value="${window.plannerState.operatorSearchQuery || ''}"
                      oninput="window.filterOperatorsSearch(this.value)"
                      class="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <!-- DESTINATION FILTER PILLS -->
                <div class="flex flex-wrap gap-1.5 pt-0.5">
                  ${['all', 'Goa', 'Jaipur', 'Kerala', 'Manali', 'Udaipur', 'Kashmir', 'Rishikesh'].map(d => `
                    <button 
                      type="button" 
                      onclick="window.setOperatorDestFilter('${d}')" 
                      class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                        drawerFilter === d 
                          ? 'bg-teal-600 text-white shadow-sm' 
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-400'
                      }">
                      ${d === 'all' ? 'All Regions' : d}
                    </button>
                  `).join('')}
                </div>

                <!-- OPERATOR CARDS GRID -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                  ${filteredOperators.map(op => {
                    const isSelected = op.id === selectedOpId;
                    return `
                      <div 
                        class="p-3.5 rounded-2xl border transition flex flex-col justify-between space-y-2 ${
                          isSelected 
                            ? 'bg-teal-500/10 border-teal-500 text-slate-900 dark:text-white shadow-md' 
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }">
                        
                        <div class="space-y-1">
                          <div class="flex items-center justify-between">
                            <div class="font-bold text-xs text-slate-900 dark:text-white flex items-center space-x-1.5">
                              <span>${op.name}</span>
                              ${op.is_recommended ? '<span class="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold">🏆 AI TOP PICK</span>' : ''}
                            </div>
                            <span class="text-[10px] font-extrabold ${isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}">${op.match_score}% Match</span>
                          </div>

                          <div class="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                            ${op.company_name}
                          </div>

                          <div class="text-[10px] text-slate-400 flex items-center space-x-2 pt-0.5">
                            <span>⭐ ${op.rating}</span>
                            <span>•</span>
                            <span>⚡ ${op.response_time_minutes}m response</span>
                            <span>•</span>
                            <span>${op.fleet_size}</span>
                          </div>
                        </div>

                        <div class="flex flex-wrap gap-1 text-[9px] pt-1">
                          ${(op.specialties || []).slice(0, 3).map(s => `
                            <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">${s}</span>
                          `).join('')}
                        </div>

                        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                          <button 
                            type="button" 
                            onclick="window.openOperatorDetailModal(${op.id})" 
                            class="text-teal-600 dark:text-teal-400 hover:underline font-bold text-[10px] flex items-center space-x-1">
                            <i data-lucide="eye" class="w-3 h-3"></i>
                            <span>View Profile</span>
                          </button>

                          <button 
                            type="button" 
                            onclick="window.selectPlannerOperator(${op.id})" 
                            class="px-3 py-1 rounded-xl font-extrabold text-[10px] transition ${
                              isSelected 
                                ? 'bg-teal-600 text-white shadow-sm' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-500 hover:text-white'
                            }">
                            ${isSelected ? '✓ Selected' : 'Choose Operator'}
                          </button>
                        </div>

                      </div>
                    `;
                  }).join('')}
                </div>

              </div>
            ` : ''}

            <!-- JOIN AS OPERATOR BANNER (PARTNER ONBOARDING CALLOUT) -->
            <div class="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-teal-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shrink-0">
                  🏢
                </div>
                <div>
                  <div class="font-bold text-xs text-slate-900 dark:text-white">
                    Are you a Tour Operator or Fleet Owner?
                  </div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400">
                    Join TRAVORA's verified network and get matched with traveler itineraries in real-time.
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                onclick="window.openOperatorRegistrationModal()" 
                class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow-sm transition shrink-0 flex items-center space-x-1.5">
                <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
                <span>Register as Tour Operator</span>
              </button>
            </div>

          </div>

          <!-- STEP 4 & 5: DATES & TRAVELERS -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Start Date
              </label>
              <input 
                type="date" 
                id="plan_start_date" 
                name="start_date" 
                value="2026-09-12"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                End Date
              </label>
              <input 
                type="date" 
                id="plan_end_date" 
                name="end_date" 
                value="2026-09-15"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Travelers
              </label>
              <select 
                name="travelers_count" 
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none">
                <option value="1">1 Traveler (Solo)</option>
                <option value="2" selected>2 Travelers (Couple/Duo)</option>
                <option value="3">3 Travelers</option>
                <option value="4">4 Travelers (Family/Group)</option>
                <option value="6">6+ Travelers (Large Group)</option>
              </select>
            </div>
          </div>

          <!-- STEP 6: BUDGET SLIDER -->
          <div class="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Step 6 • Total Target Budget
              </label>
              <span id="budget-display" class="text-lg font-extrabold text-teal-600 dark:text-teal-400">
                ₹25,000
              </span>
            </div>
            <input 
              type="range" 
              name="budget_total" 
              id="budget-slider" 
              min="15000" 
              max="100000" 
              step="2500" 
              value="25000"
              oninput="document.getElementById('budget-display').innerText = '₹' + parseInt(this.value).toLocaleString('en-IN')"
              class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div class="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>₹15,000 (Budget Friendly)</span>
              <span>₹50,000 (Premium)</span>
              <span>₹100,000+ (Ultra Luxury)</span>
            </div>
          </div>

          <!-- STEP 7: TRAVEL STYLE -->
          <div class="space-y-3">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Step 7 • Travel Style
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              ${[
                { id: "Beach + Adventure + Food", label: "Beach & Adventure", icon: "waves" },
                { id: "Relaxed & Leisure", label: "Relaxed & Leisure", icon: "coffee" },
                { id: "Culture & Heritage", label: "Culture & Heritage", icon: "landmark" },
                { id: "Luxury & Wellness", label: "Luxury & Wellness", icon: "sparkles" }
              ].map((s, idx) => `
                <label class="cursor-pointer">
                  <input type="radio" name="travel_style" value="${s.id}" class="peer sr-only" ${idx === 0 ? 'checked' : ''} />
                  <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-teal-500 peer-checked:bg-teal-500/10 dark:peer-checked:bg-teal-950/40 peer-checked:text-teal-600 dark:peer-checked:text-teal-400 transition text-center space-y-1">
                    <div class="text-xs font-bold text-slate-800 dark:text-slate-200">${s.label}</div>
                  </div>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- STEP 8: SPECIFIC INTERESTS -->
          <div class="space-y-3">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Step 8 • Specific Interests
            </label>
            <div class="flex flex-wrap gap-2">
              ${[
                { id: "Beach", label: "🏖️ Beach & Sunsets", checked: true },
                { id: "Adventure", label: "🏄 Water Sports & Scuba", checked: true },
                { id: "Food", label: "🍴 Local Culinary Tours", checked: true },
                { id: "Heritage", label: "🏰 Heritage Forts", checked: true },
                { id: "Nightlife", label: "🍸 Beach Shacks & Clubs", checked: false },
                { id: "Nature", label: "🌿 Waterfalls & Safaris", checked: false },
                { id: "Photography", label: "📸 Photography Walks", checked: false },
                { id: "Shopping", label: "🛍️ Flea Markets", checked: false }
              ].map(i => `
                <label class="cursor-pointer">
                  <input type="checkbox" name="interests" value="${i.id}" class="peer sr-only" ${i.checked ? 'checked' : ''} />
                  <span class="inline-block px-3.5 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 peer-checked:border-teal-500 peer-checked:bg-teal-500/10 peer-checked:text-teal-600 dark:peer-checked:text-teal-400 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                    ${i.label}
                  </span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- STEP 9 & 10: ACCOMMODATION & TRANSPORT -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Step 9 • Accommodation Tier
              </label>
              <select 
                name="accommodation_type" 
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none">
                <option value="Budget Stay">Budget Stay (Hostel / Guesthouse)</option>
                <option value="3-Star" selected>3-Star Deluxe (Recommended Match)</option>
                <option value="4-Star Resort">4-Star Beach Resort</option>
                <option value="5-Star Luxury Resort">5-Star Luxury Resort</option>
                <option value="Boutique Villa">Boutique Heritage Villa</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Step 10 • Transportation Mode
              </label>
              <select 
                name="transport_type" 
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none">
                <option value="Volvo Bus" selected>Volvo AC Sleeper Bus (Budget Fit)</option>
                <option value="Express Train">Vande Bharat / Express Train</option>
                <option value="Flight">Direct Flight (Fastest)</option>
                <option value="Private Cab">Private Innova Crysta Cab</option>
              </select>
            </div>
          </div>

          <!-- SUBMIT ACTION -->
          <div class="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button 
              type="submit" 
              id="generate-tour-btn"
              class="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-extrabold text-base shadow-xl shadow-teal-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
              <i data-lucide="sparkles" class="w-5 h-5"></i>
              <span>SYNTHESIZE PERSONALIZED ITINERARY WITH AI</span>
            </button>
          </div>

        </form>

        <!-- AI GENERATING OVERLAY / SKELETON -->
        <div id="ai-planner-loader" class="hidden p-8 text-center space-y-6">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-teal-500 to-amber-500 flex items-center justify-center text-white animate-spin">
            <i data-lucide="compass" class="w-8 h-8"></i>
          </div>
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white" id="loader-status-text">
              Sensing your requested landmarks & calculating coordinates...
            </h3>
            <p class="text-xs text-slate-400">
              TRAVORA multi-factor engine is matching certified operators and optimizing your schedule.
            </p>
          </div>
          <div class="w-full max-w-md mx-auto bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div id="loader-progress-bar" class="bg-gradient-to-r from-teal-500 to-emerald-400 h-full w-0 transition-all duration-300"></div>
          </div>
        </div>

      </div>

    </div>
  `;
}

// Global UI helper functions for planner
let sensingDebounceTimer = null;

window.triggerRealtimePlacesSensing = function() {
  clearTimeout(sensingDebounceTimer);
  sensingDebounceTimer = setTimeout(async () => {
    const destName = window.plannerSelectedDest || 'Goa';
    const allPlaces = [...window.plannerState.selectedPlaces, ...window.plannerState.customPlaces];

    try {
      const res = await api.sensePlaces({
        destination_name: destName,
        travel_style: "Beach + Adventure + Food",
        interests: ["Beach", "Adventure"],
        budget_total: 25000,
        desired_places: allPlaces
      });

      if (res) {
        window.plannerState.sensedData = res;
        if (res.matched_operators && res.matched_operators.length > 0) {
          window.plannerState.matchedOperators = res.matched_operators;
          if (!window.plannerState.userHasManuallySelectedOperator) {
            window.plannerState.selectedOperatorId = res.matched_operators[0].id;
          }
        }
      }
    } catch (e) {
      console.warn("Real-time sensing request error:", e);
    }

    // Reactive store update triggers re-render
    store.setState({});
  }, 250);
};

window.onPlannerDestChange = async function(destName) {
  window.plannerSelectedDest = destName;
  const destKey = destName.toLowerCase().split(' ')[0].split('(')[0].trim();
  const landmarks = DEFAULT_LANDMARKS[destKey] || DEFAULT_LANDMARKS["goa"];
  
  // Reset selected places to the first 2-3 landmarks of the destination
  window.plannerState.selectedPlaces = landmarks.slice(0, 3).map(l => l.name);
  window.plannerState.customPlaces = [];
  window.plannerState.userHasManuallySelectedOperator = false;
  
  window.triggerRealtimePlacesSensing();
};

window.togglePlannerPlace = function(placeName) {
  const list = window.plannerState.selectedPlaces;
  const idx = list.indexOf(placeName);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(placeName);
  }
  window.triggerRealtimePlacesSensing();
};

window.addCustomPlace = function() {
  const input = document.getElementById('custom-place-input');
  if (!input) return;
  const val = input.value.trim();
  if (val && !window.plannerState.customPlaces.includes(val)) {
    window.plannerState.customPlaces.push(val);
    input.value = '';
    window.triggerRealtimePlacesSensing();
  }
};

window.removeCustomPlace = function(index) {
  window.plannerState.customPlaces.splice(index, 1);
  window.triggerRealtimePlacesSensing();
};

window.toggleOperatorsDrawer = function() {
  window.plannerState.isOperatorsDrawerOpen = !window.plannerState.isOperatorsDrawerOpen;
  store.setState({});
};

window.selectPlannerOperator = function(operatorId) {
  window.plannerState.selectedOperatorId = operatorId;
  window.plannerState.userHasManuallySelectedOperator = true;
  window.plannerState.isOperatorsDrawerOpen = false; // close drawer after selection
  
  const chosenOp = (window.plannerState.matchedOperators || []).find(op => op.id === operatorId);
  store.addToast(`✓ Assigned ${chosenOp ? chosenOp.name : 'Operator'} to your trip!`, 'success');
  store.setState({});
};

window.resetToAIRecommendedOperator = function() {
  window.plannerState.userHasManuallySelectedOperator = false;
  const topOp = (window.plannerState.matchedOperators || []).find(op => op.is_recommended) || (window.plannerState.matchedOperators || [])[0];
  if (topOp) {
    window.plannerState.selectedOperatorId = topOp.id;
    store.addToast(`✓ Reset to AI Top Recommended Operator: ${topOp.name}`, 'info');
  }
  store.setState({});
};

window.filterOperatorsSearch = function(query) {
  window.plannerState.operatorSearchQuery = query;
  store.setState({});
};

window.setOperatorDestFilter = function(dest) {
  window.plannerState.operatorDestFilter = dest;
  store.setState({});
};

window.openOperatorDetailModal = function(operatorId) {
  const op = (window.plannerState.matchedOperators || []).find(o => o.id === operatorId);
  if (op) {
    store.setState({ selectedOperatorForModal: op });
  }
};

window.closeOperatorDetailModal = function() {
  store.setState({ selectedOperatorForModal: null });
};
