import { store } from '../store.js';

export function renderLanding() {
  return `
    <div class="space-y-24 py-8">
      
      <!-- HERO SECTION -->
      <section class="relative overflow-hidden pt-8 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <!-- Badge -->
          <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-semibold animate-pulse">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            <span>The AI-Powered Dynamic Tour Operating Platform</span>
          </div>

          <!-- Headline -->
          <div class="space-y-4 max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Your Journey. <span class="bg-gradient-to-r from-teal-500 via-teal-400 to-amber-500 bg-clip-text text-transparent">Your Way.</span>
            </h1>
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
              TRAVORA creates personalized tours and intelligently adapts them when plans change in the real world.
            </p>
          </div>

          <!-- CTAs -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onclick="window.navigateView('planner')" 
              class="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold text-base shadow-xl shadow-teal-500/25 transition transform hover:-translate-y-0.5 flex items-center space-x-2">
              <i data-lucide="sparkles" class="w-5 h-5"></i>
              <span>Start Planning My Journey</span>
            </button>
            <button 
              onclick="window.navigateView('itinerary', { tour_id: 1 })" 
              class="px-8 py-4 rounded-xl surface-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-base border border-slate-300 dark:border-slate-700 shadow-md transition flex items-center space-x-2 text-teal-600 dark:text-teal-400">
              <i data-lucide="map" class="w-5 h-5"></i>
              <span>View Sample Live Itinerary</span>
            </button>
          </div>

          <!-- Hero Graphic: Live Interactive Journey & Adaptation Card -->
          <div class="pt-8 max-w-5xl mx-auto">
            <div class="p-4 sm:p-6 rounded-3xl surface-card shadow-2xl border border-slate-200 dark:border-slate-800 relative">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span class="text-xs font-mono text-slate-400 pl-2">TRAVORA Dynamic Engine • Tour #TR1024 (Goa 4-Day Escape)</span>
                </div>
                <span class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  94% Match Score
                </span>
              </div>

              <!-- 3-Column Lifecycle Grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                
                <!-- Col 1: Discovery & Planning -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div class="flex items-center space-x-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
                    <i data-lucide="sliders" class="w-4 h-4"></i>
                    <span>1. Personalized Preferences</span>
                  </div>
                  <div class="space-y-1 text-xs">
                    <p class="font-semibold text-slate-800 dark:text-slate-200">Goa • 4 Days • 2 Travelers</p>
                    <p class="text-slate-500">Budget: ₹25,000 • 3-Star • Bus Transit</p>
                    <div class="flex flex-wrap gap-1 pt-1">
                      <span class="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-[10px] text-teal-700 dark:text-teal-300 font-medium">🏖️ Beaches</span>
                      <span class="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-[10px] text-amber-700 dark:text-amber-300 font-medium">🏄 Adventure</span>
                      <span class="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-[10px] text-blue-700 dark:text-blue-300 font-medium">🍴 Goan Food</span>
                    </div>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] flex justify-between items-center">
                    <span class="text-slate-500">Estimated Cost</span>
                    <span class="font-bold text-slate-900 dark:text-white">₹20,500 <span class="text-emerald-500 font-normal">(₹4.5k savings)</span></span>
                  </div>
                </div>

                <!-- Col 2: Dynamic Timeline & Schedule -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div class="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <i data-lucide="calendar" class="w-4 h-4"></i>
                    <span>2. Dynamic Schedule</span>
                  </div>
                  <div class="space-y-1 text-xs">
                    <p class="font-semibold text-slate-800 dark:text-slate-200">Day-by-Day Precision Itinerary</p>
                    <p class="text-slate-500">Smart routing, hotel check-in sync & transit links automatically matched.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                    <div class="flex justify-between text-teal-500">
                      <span>Schedule Status</span>
                      <span class="font-bold">100% Synchronized</span>
                    </div>
                    <div class="flex justify-between text-slate-500 text-[10px]">
                      <span>Activities & Hotels</span>
                      <span>Verified Live Availability</span>
                    </div>
                  </div>
                </div>

                <!-- Col 3: Intelligent Adaptability -->
                <div class="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
                  <div class="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                    <span>3. Instant Adaptability</span>
                  </div>
                  <div class="space-y-1 text-xs">
                    <p class="font-semibold text-emerald-800 dark:text-emerald-200">Interactive Customization</p>
                    <p class="text-slate-600 dark:text-slate-400">Swap hotels, add activities, and recalculate budgets in real-time.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-semibold flex items-center justify-between shadow-md">
                    <span>Dynamic Rebalancing</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- HOW TRAVORA WORKS — 6-STEP LIFECYCLE -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center space-y-3">
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white">
            The Complete Tour Lifecycle
          </h2>
          <p class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            From initial dream to seamless live execution and instant real-world adaptation.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          ${[
            { step: "01", name: "Discover", icon: "compass", desc: "AI matches top Indian destinations to style & budget" },
            { step: "02", name: "Personalize", icon: "sliders", desc: "Select activities, hotel class & transit modes" },
            { step: "03", name: "Plan", icon: "calendar", desc: "Multi-day dynamic timeline generated in seconds" },
            { step: "04", name: "Book", icon: "credit-card", desc: "Transparent live pricing with GST & instant confirmation" },
            { step: "05", name: "Adapt", icon: "zap", desc: "5-factor optimization ranks alternatives if plans change" },
            { step: "06", name: "Travel", icon: "map-pin", desc: "Live GPS timeline, emergency coordinator & SOS" }
          ].map(s => `
            <div class="surface-card p-4 rounded-2xl space-y-2.5 text-center group hover:border-teal-500 transition">
              <div class="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">${s.step}</div>
              <div class="w-10 h-10 mx-auto rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition">
                <i data-lucide="${s.icon}" class="w-5 h-5"></i>
              </div>
              <h3 class="font-bold text-sm text-slate-800 dark:text-slate-200">${s.name}</h3>
              <p class="text-[11px] text-slate-500 leading-snug">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SIGNATURE INNOVATION — DYNAMIC ADAPTATION SHOWCASE -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="p-8 sm:p-12 rounded-3xl surface-card border-2 border-amber-500/30 dark:border-amber-500/20 shadow-2xl space-y-8 relative overflow-hidden">
          
          <!-- Ambient Glow -->
          <div class="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
                <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-500 animate-pulse"></i>
                <span>THE CORE INNOVATION OF TRAVORA</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Continuous Dynamic Tour Adaptation Loop
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                When unexpected cancellations or delays strike, TRAVORA does not fail. It automatically calculates multi-component dependencies, evaluates explainable alternatives, and rebalances schedules instantly.
              </p>
            </div>

            <button 
              onclick="window.navigateView('itinerary', { tour_id: 1 })" 
              class="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition flex items-center space-x-2 shrink-0">
              <i data-lucide="play-circle" class="w-4 h-4"></i>
              <span>Launch Live Itinerary Demo</span>
            </button>
          </div>

          <!-- 4-Step Adaptation Architecture Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div class="p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 space-y-2">
              <div class="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center font-black text-xs">01</div>
              <h4 class="font-bold text-sm text-red-900 dark:text-red-300">1. Problem Detection</h4>
              <p class="text-xs text-red-700/80 dark:text-red-400/80">
                Hotel XYZ Day 2 booking locks unavailable due to vendor supply constraint.
              </p>
              <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-700 dark:text-red-300">CRITICAL COLLISION</span>
            </div>

            <div class="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2">
              <div class="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">02</div>
              <h4 class="font-bold text-sm text-amber-900 dark:text-amber-300">2. Impact Analysis</h4>
              <p class="text-xs text-amber-700/80 dark:text-amber-400/80">
                Analyzes Day 2 check-in slots, cab rerouting (+2.1 km), and net cost delta (+₹900).
              </p>
              <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">MULTI-COMPONENT</span>
            </div>

            <div class="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-2">
              <div class="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-xs">03</div>
              <h4 class="font-bold text-sm text-blue-900 dark:text-blue-300">3. 5-Factor Ranking</h4>
              <p class="text-xs text-blue-700/80 dark:text-blue-400/80">
                Evaluates 3 scored options: 30% Style, 25% Budget, 20% Loc, 15% Avail, 10% Time.
              </p>
              <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-700 dark:text-blue-300">94% BEST MATCH</span>
            </div>

            <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <div class="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-xs">04</div>
              <h4 class="font-bold text-sm text-emerald-900 dark:text-emerald-300">4. Auto Re-Sync</h4>
              <p class="text-xs text-emerald-700/80 dark:text-emerald-400/80">
                1-Click approval replaces item, recalculates live budget, and updates traveler vouchers.
              </p>
              <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">100% OPERATIONAL</span>
            </div>

          </div>

        </div>
      </section>

      <!-- WHY TRAVORA? — VALUE PROPOSITIONS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="p-8 sm:p-12 rounded-3xl surface-card border border-slate-200 dark:border-slate-800 space-y-8">
          <div class="text-center space-y-2 max-w-2xl mx-auto">
            <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white">
              Why TRAVORA Outperforms Traditional Travel Portals
            </h2>
            <p class="text-slate-500 text-sm">
              Traditional apps book static tickets and leave you stranded when disruptions strike. TRAVORA actively manages your journey.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${[
              { title: "Dynamic Real-Time Adaptation", icon: "refresh-cw", desc: "Hotel unavailable or bus delayed? TRAVORA analyzes dependency impacts and ranks best-fit replacements instantly." },
              { title: "Explainable 5-Factor AI Scoring", icon: "bar-chart-3", desc: "Every recommendation shows transparent weights: 30% Style, 25% Budget, 20% Location, 15% Availability, 10% Time." },
              { title: "Live Budget & Variance Tracking", icon: "pie-chart", desc: "Real-time cost updates whenever you swap activities, change hotel tiers, or apply disruption alternatives." },
              { title: "Dual Traveler & Operator Hub", icon: "users", desc: "Travelers get effortless flexibility; Tour operators get a control center for fleet, vendors, and alerts." },
              { title: "Interactive Itinerary Map", icon: "map", desc: "OpenStreetMap + Leaflet integration to visualize all day-by-day stops, beaches, restaurants, and routes." },
              { title: "Context-Aware Travora AI Copilot", icon: "bot", desc: "A floating assistant that mutates your tour state on command: make it cheaper, add adventures, or explain recommendations." }
            ].map(f => `
              <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
                <div class="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <i data-lucide="${f.icon}" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-base text-slate-800 dark:text-slate-200">${f.title}</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- OPERATOR PARTNER ONBOARDING SECTION -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
          <div class="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div class="space-y-3 max-w-2xl">
              <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <i data-lucide="shield" class="w-3.5 h-3.5"></i>
                <span>JOIN OUR VERIFIED OPERATOR NETWORK</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
                Are you a Tour Operator, Guide, or Fleet Partner?
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect your business to TRAVORA's AI Matchmaking Engine. Receive matched traveler tours tailored to your destinations, manage 24/7 on-ground dispatch, handle disruptions in real-time, and grow your bookings.
              </p>
              <div class="flex flex-wrap gap-3 pt-1 text-xs text-slate-400">
                <span class="flex items-center space-x-1"><span>✓</span><span>Instant AI Traveler Matching</span></span>
                <span class="flex items-center space-x-1"><span>✓</span><span>Live Dispatch & Group Hub</span></span>
                <span class="flex items-center space-x-1"><span>✓</span><span>Disruption Resolution Tools</span></span>
              </div>
            </div>

            <div class="shrink-0 flex flex-col sm:flex-row gap-3">
              <button 
                onclick="window.setAuthRole('operator'); window.setAuthMode('signup'); store.setState({ isAuthenticated: false });" 
                class="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>Register as Tour Operator</span>
              </button>
              <button 
                onclick="window.setAuthRole('operator'); window.setAuthMode('login'); store.setState({ isAuthenticated: false });" 
                class="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center justify-center space-x-2">
                <i data-lucide="log-in" class="w-4 h-4"></i>
                <span>Operator Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- BOTTOM CALL TO ACTION -->
      <section class="max-w-4xl mx-auto px-4 text-center space-y-6 pb-8">
        <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-600 text-white shadow-2xl space-y-6">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to experience travel that adapts to you?
          </h2>
          <p class="text-teal-100 max-w-xl mx-auto text-sm sm:text-base">
            Create your personalized itinerary in under 60 seconds with live dynamic pricing and real-world resilience.
          </p>
          <div class="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onclick="window.navigateView('planner')" 
              class="px-8 py-3.5 rounded-xl bg-white text-teal-700 font-bold text-sm sm:text-base shadow-lg hover:bg-teal-50 transition transform hover:-translate-y-0.5">
              Build My Tour Now
            </button>
            <button 
              onclick="window.navigateView('operator_dash')" 
              class="px-8 py-3.5 rounded-xl bg-teal-800/80 border border-teal-400/40 text-white font-bold text-sm sm:text-base hover:bg-teal-900 transition">
              Tour Operator Portal
            </button>
          </div>
        </div>
      </section>

    </div>
  `;
}
