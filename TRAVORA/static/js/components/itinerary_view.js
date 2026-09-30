import { store } from '../store.js';
import { api } from '../api.js';

export function renderItineraryView() {
  const state = store.getState();
  const tour = state.currentTour;

  if (!tour) {
    const destinations = state.destinations || [];
    return `
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        <!-- EMPTY STATE HERO -->
        <div class="p-8 sm:p-12 rounded-3xl surface-card border-2 border-dashed border-slate-300 dark:border-slate-800 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div class="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-teal-500/20 to-amber-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-inner">
            <i data-lucide="map-pin" class="w-8 h-8"></i>
          </div>
          
          <div class="space-y-2 max-w-xl mx-auto">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              No Active Itinerary Planned Yet
            </h1>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              You haven't planned a trip yet. Tell TRAVORA your preferred destination, duration, budget, and travel style to generate a personalized dynamic itinerary with live pricing!
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button 
              onclick="window.navigateView('planner')" 
              class="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-extrabold text-sm shadow-xl shadow-teal-500/25 transition transform hover:-translate-y-0.5 flex items-center space-x-2">
              <i data-lucide="sparkles" class="w-4 h-4"></i>
              <span>Plan Your First Trip</span>
            </button>
            <button 
              onclick="window.navigateView('dashboard')" 
              class="px-6 py-3.5 rounded-2xl surface-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm border border-slate-300 dark:border-slate-700 transition">
              Explore Destinations
            </button>
          </div>
        </div>

        <!-- RECOMMENDED PLACES TO VISIT -->
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">
                Recommended Destinations to Visit
              </h2>
              <p class="text-xs text-slate-500">
                Choose a destination below to launch the personalized AI Trip Architect.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${destinations.map(d => `
              <div class="surface-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group hover:border-teal-500 transition flex flex-col justify-between">
                <div>
                  <div class="h-36 w-full relative overflow-hidden bg-slate-900">
                    <img src="${d.image_url}" alt="${d.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-teal-400 border border-teal-500/30">
                      ${d.match_score}% Match
                    </div>
                    <div class="absolute bottom-2.5 left-2.5 text-white">
                      <div class="font-extrabold text-base leading-tight">${d.name}</div>
                      <div class="text-[10px] text-slate-300">${d.state}</div>
                    </div>
                  </div>

                  <div class="p-4 space-y-2 text-xs">
                    <p class="text-slate-600 dark:text-slate-400 line-clamp-2 text-[11px] leading-relaxed">
                      ${d.description}
                    </p>
                    <div class="flex justify-between items-center text-[11px] pt-1">
                      <span class="text-slate-400">Starting from</span>
                      <span class="font-bold text-teal-600 dark:text-teal-400">₹${(d.starting_price || 18500).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div class="p-3 pt-0">
                  <button 
                    onclick="window.startPlanningFor('${d.name}')" 
                    class="w-full py-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-600 hover:text-white text-teal-600 dark:text-teal-400 font-bold text-xs transition border border-teal-200 dark:border-teal-800/80 flex items-center justify-center space-x-1">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                    <span>Plan Trip to ${d.name}</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  const selectedDay = state.selectedDay || 1;
  const items = tour.itinerary_items || [];
  const filteredItems = selectedDay === 'all' ? items : items.filter(it => it.day_number === parseInt(selectedDay));
  const pricing = tour.pricing || {
    hotel: 8000, transport: 4000, activities: 5500, food: 3000,
    subtotal: 20500, taxes: 1025, service_fee: 450, total: 21975,
    budget_total: 25000, remaining: 3025, utilization_pct: 87.9, is_overbudget: false
  };

  const hasDisruption = items.some(it => it.is_disrupted) || (tour.status === 'attention' || tour.status === 'disrupted');

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- TOP HEADER BANNER -->
      <div class="p-6 sm:p-8 rounded-3xl surface-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Tour #${tour.code}
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-bold ${tour.status === 'attention' ? 'badge-critical' : 'badge-active'}">
                ${tour.status === 'attention' ? '⚠️ Disruption Detected' : '🟢 ' + tour.status.toUpperCase()}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                ⭐ ${tour.match_percentage}% AI Preference Match
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center space-x-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Assigned Operator: <strong>${tour.operator_name || tour.coordinator_name || 'Aarav Mehta'}</strong></span>
              </span>
            </div>

            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              ${tour.title}
            </h1>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              ${tour.destination_name} • ${tour.duration_days} Days, ${tour.duration_days - 1} Nights • ${tour.travelers_count} Travelers • ${tour.accommodation_type} • ${tour.transport_type}
            </p>

            <!-- ASSIGNED OPERATOR & SENSED PLACES HIGHLIGHT -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                    <span>🏢</span>
                    <span>Operator: <strong>${tour.operator_company || tour.operator_name || tour.coordinator_name}</strong></span>
                  </span>
                  <span class="text-amber-500 font-black text-[11px]">⭐ ${tour.operator_rating || 4.9}</span>
                </div>
                <div class="text-[11px] text-slate-500 dark:text-slate-400">
                  ${tour.ai_recommendation_reason || 'Verified local partner with on-ground fleet and instant dispatch.'}
                </div>
              </div>

              ${tour.desired_places ? `
                <div class="p-3 rounded-2xl bg-teal-500/5 dark:bg-teal-950/30 border border-teal-500/20 text-xs space-y-1">
                  <div class="font-bold text-teal-700 dark:text-teal-300 flex items-center space-x-1.5">
                    <span>⚡</span>
                    <span>Real-Time Sensed Landmarks Visited:</span>
                  </div>
                  <div class="flex flex-wrap gap-1 text-[10px]">
                    ${tour.desired_places.split(',').map(p => `
                      <span class="px-2 py-0.5 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 font-medium">
                        📍 ${p.trim()}
                      </span>
                    `).join('')}
                  </div>
                </div>
              ` : `
                <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div class="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                    <span>⚡</span>
                    <span>Curated Landmark Sequencing:</span>
                  </div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400">
                    Day-by-day coordinates & schedule dynamically organized for optimal transit times.
                  </div>
                </div>
              `}
            </div>

          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center gap-3">
            <button 
              onclick="window.triggerKillerDemo()" 
              class="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 font-extrabold text-xs sm:text-sm border border-amber-500/30 transition flex items-center space-x-1.5 shadow-sm"
              title="Trigger Hotel XYZ Day 2 cancellation to see AI adaptation live">
              <i data-lucide="zap" class="w-4 h-4 text-amber-500 animate-bounce"></i>
              <span>Simulate Disruption</span>
            </button>
            <button 
              onclick="window.handleDeleteTour(${tour.id}, '${tour.title.replace(/'/g, "\\'")}')" 
              class="px-4 py-2.5 rounded-xl border border-red-500/30 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 font-bold text-xs sm:text-sm transition flex items-center space-x-1.5"
              title="Delete this planned itinerary">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
              <span>Delete Itinerary</span>
            </button>
            <button 
              onclick="window.openBookingModal()" 
              class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 transition flex items-center space-x-2">
              <i data-lucide="credit-card" class="w-4 h-4"></i>
              <span>${tour.is_booked ? 'View Booking Voucher' : 'Book This Journey'}</span>
            </button>
          </div>

        </div>

        <!-- DISRUPTION ALERT BANNER IF ACTIVE -->
        ${hasDisruption ? `
          <div class="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                <i data-lucide="alert-triangle" class="w-5 h-5"></i>
              </div>
              <div>
                <div class="text-xs font-bold text-red-700 dark:text-red-300">
                  CRITICAL: Day 2 Hotel Inventory Collision Detected
                </div>
                <div class="text-[11px] text-red-600/90 dark:text-red-400">
                  TRAVORA has calculated dependency impact and prepared 3 scored replacement alternatives.
                </div>
              </div>
            </div>
            <button 
              onclick="window.openDisruptionModal()" 
              class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow transition shrink-0">
              Review Alternatives & Resolve
            </button>
          </div>
        ` : ''}

        <!-- RESOLVED DISRUPTION SYNCHRONIZATION BANNER -->
        ${!hasDisruption && (items.some(it => it.replacement_status === 'replaced') || (tour.change_events && tour.change_events.some(ce => ce.status === 'resolved'))) ? `
          <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <i data-lucide="check-circle" class="w-5 h-5"></i>
              </div>
              <div>
                <div class="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
                  <span>Itinerary 100% Synchronized & Operational</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">OPERATOR CONFIRMED</span>
                </div>
                <div class="text-[11px] text-emerald-700/90 dark:text-emerald-400 mt-0.5">
                  Assigned Coordinator <strong class="font-bold">${tour.coordinator_name || 'Aarav Mehta'}</strong> resolved previous schedule collisions. All accommodations, transit, and experiences are confirmed and synced in real time.
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 shrink-0">
              <i data-lucide="shield-check" class="w-4 h-4"></i>
              <span>Live Protected</span>
            </div>
          </div>
        ` : ''}

        <!-- DAY TABS -->
        <div class="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          ${Array.from({ length: tour.duration_days }, (_, i) => i + 1).map(day => `
            <button 
              onclick="window.selectItineraryDay(${day})"
              class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${selectedDay === day ? 'bg-teal-600 text-white shadow-md' : 'surface-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
              Day ${day}
            </button>
          `).join('')}
          <button 
            onclick="window.selectItineraryDay('all')"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${selectedDay === 'all' ? 'bg-teal-600 text-white shadow-md' : 'surface-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            View All Days
          </button>
        </div>

      </div>

      <!-- MAIN CONTENT: 2 COLUMNS (TIMELINE & BUDGET/MAP SIDEBAR) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- LEFT: VERTICAL TIMELINE -->
        <div class="lg:col-span-2 space-y-6">
          
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <i data-lucide="clock" class="w-5 h-5 text-teal-600 dark:text-teal-400"></i>
              <span>${selectedDay === 'all' ? 'Complete Journey Timeline' : `Day ${selectedDay} Schedule`}</span>
            </h2>
            <button 
              onclick="window.openAddActivityModal()" 
              class="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center space-x-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>Add Experience</span>
            </button>
          </div>

          <!-- Timeline Container -->
          <div class="relative pl-6 sm:pl-8 space-y-6">
            <div class="timeline-line"></div>

            ${filteredItems.length === 0 ? `
              <div class="surface-card p-8 rounded-2xl text-center text-slate-400 text-xs">
                No items scheduled for this day yet.
              </div>
            ` : filteredItems.map((it, idx) => `
              <div class="relative flex items-start space-x-4 group">
                
                <!-- Node Icon -->
                <div class="timeline-node shrink-0 ${it.is_disrupted ? 'disrupted' : (it.replacement_status === 'replaced' ? 'replaced' : '')}">
                  <i data-lucide="${it.is_disrupted ? 'alert-circle' : (it.item_type === 'hotel' ? 'hotel' : (it.item_type === 'transport' ? 'bus' : (it.item_type === 'food' ? 'utensils' : 'map-pin')))}" class="w-5 h-5"></i>
                </div>

                <!-- Item Card -->
                <div class="flex-1 surface-card rounded-2xl p-4 sm:p-5 transition hover:border-teal-500 space-y-3">
                  
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <div class="flex flex-wrap items-center gap-1.5">
                        <span class="text-[11px] font-bold font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                          ${it.time_start} — ${it.time_end}
                        </span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${it.item_type === 'hotel' ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' : (it.item_type === 'transport' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400' : 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400')}">
                          ${it.item_type}
                        </span>
                        ${(tour.desired_places || '').toLowerCase().split(',').some(p => p.trim() && (it.title.toLowerCase().includes(p.trim()) || p.trim().includes(it.title.toLowerCase()))) ? `
                          <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30 flex items-center space-x-1">
                            <span>🎯 Sensed Landmark</span>
                          </span>
                        ` : ''}
                        ${it.is_disrupted ? `
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 animate-pulse">
                            Disrupted
                          </span>
                        ` : ''}
                        ${it.replacement_status === 'replaced' ? `
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-700">
                            ✓ Adaptively Replaced
                          </span>
                        ` : ''}
                      </div>

                      <h3 class="text-base font-bold text-slate-900 dark:text-white mt-1">
                        ${it.title}
                      </h3>
                      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        ${it.subtitle || it.location_name}
                      </p>
                    </div>

                    <div class="text-right">
                      <div class="text-sm font-extrabold text-slate-900 dark:text-white">
                        ₹${it.cost.toLocaleString('en-IN')}
                      </div>
                      <div class="text-[10px] text-slate-400">for 2 guests</div>
                    </div>
                  </div>

                  <!-- Location & Controls -->
                  <div class="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <div class="flex items-center space-x-1.5 text-slate-400">
                      <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
                      <span class="text-[11px]">${it.location_name}</span>
                    </div>

                    <div class="flex items-center space-x-2">
                      <button 
                        onclick="window.deleteItem(${it.id})" 
                        class="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition flex items-center space-x-1"
                        title="Remove this item from itinerary">
                        <i data-lucide="trash-2" class="w-3 h-3"></i>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            `).join('')}

          </div>

        </div>

        <!-- RIGHT SIDEBAR: STICKY BUDGET SUMMARY & MAP -->
        <div class="space-y-6">
          
          <!-- LIVE BUDGET TRACKER CARD -->
          <div class="surface-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 sticky top-20">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div class="flex items-center space-x-2">
                <i data-lucide="wallet" class="w-5 h-5 text-teal-600 dark:text-teal-400"></i>
                <h3 class="font-extrabold text-base text-slate-900 dark:text-white">Live Budget Engine</h3>
              </div>
              <span class="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                ${pricing.utilization_pct}% Utilized
              </span>
            </div>

            <!-- Itemized Breakdown -->
            <div class="space-y-2.5 text-xs">
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>🏨 Accommodation (${tour.accommodation_type})</span>
                <span class="font-bold text-slate-800 dark:text-slate-200">₹${pricing.hotel.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>🚌 Transit (${tour.transport_type})</span>
                <span class="font-bold text-slate-800 dark:text-slate-200">₹${pricing.transport.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>🏄 Experiences & Activities</span>
                <span class="font-bold text-slate-800 dark:text-slate-200">₹${pricing.activities.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>🍴 Food & Culinary Estimate</span>
                <span class="font-bold text-slate-800 dark:text-slate-200">₹${pricing.food.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-slate-400 text-[11px] pt-1">
                <span>GST (5%) & Service Charge</span>
                <span>₹${(pricing.taxes + pricing.service_fee).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-1 pt-2">
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-300 ${pricing.is_overbudget ? 'bg-red-500' : 'bg-gradient-to-r from-teal-500 to-emerald-400'}" 
                  style="width: ${pricing.utilization_pct}%">
                </div>
              </div>
              <div class="flex justify-between text-[11px] font-semibold">
                <span class="text-slate-500">Total: ₹${pricing.total.toLocaleString('en-IN')}</span>
                <span class="${pricing.is_overbudget ? 'text-red-500 font-bold' : 'text-emerald-500'}">
                  ${pricing.is_overbudget ? '⚠️ Exceeded by ₹' + pricing.variance.toLocaleString('en-IN') : '₹' + pricing.remaining.toLocaleString('en-IN') + ' Remaining'}
                </span>
              </div>
            </div>

            <!-- Target Budget Header -->
            <div class="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 flex items-center justify-between">
              <div>
                <div class="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">Target Budget</div>
                <div class="text-base font-extrabold text-slate-900 dark:text-white">₹${pricing.budget_total.toLocaleString('en-IN')}</div>
              </div>
              <button onclick="window.askAiToOptimizeBudget()" class="px-3 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm transition">
                AI Optimize
              </button>
            </div>

            <!-- LEAFLET INTERACTIVE MAP -->
            <div class="space-y-2 pt-2">
              <div class="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span class="flex items-center space-x-1">
                  <i data-lucide="map" class="w-4 h-4 text-teal-500"></i>
                  <span>Itinerary Route Map</span>
                </span>
                <span class="text-[10px] text-slate-400">OpenStreetMap</span>
              </div>
              <div id="itinerary-map" class="w-full h-56 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-inner"></div>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
