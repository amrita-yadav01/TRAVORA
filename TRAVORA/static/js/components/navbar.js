import { store } from '../store.js';

export function renderNavbar() {
  const state = store.getState();
  const user = state.user || { name: 'Traveler User', email: 'traveler@travora.demo', role: 'traveler' };
  const isOperator = user.role === 'operator';
  const isDark = state.theme === 'dark';
  const unreadCount = state.notifications.filter(n => !n.is_read).length;

  return `
    <header class="sticky top-0 z-40 surface-card border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-2xl bg-white/90 dark:bg-slate-950/90 transition-all duration-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2.5 flex items-center justify-between gap-4">
        
        <!-- LEFT: BRAND & ROLE BADGE -->
        <div class="flex items-center space-x-3 shrink-0">
          <div 
            onclick="window.navigateView('${isOperator ? 'operator_dash' : 'dashboard'}')" 
            class="flex items-center space-x-3 cursor-pointer group select-none">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 group-hover:scale-105 group-hover:shadow-teal-500/40 transition duration-300">
              <i data-lucide="${isOperator ? 'shield' : 'compass'}" class="w-5 h-5"></i>
            </div>
            <div class="flex items-center space-x-2.5">
              <span class="text-xl font-black tracking-tight bg-gradient-to-r from-teal-500 via-teal-400 to-amber-400 bg-clip-text text-transparent">
                TRAVORA
              </span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${isOperator ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30' : 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30'}">
                ${isOperator ? '🏢 OPERATOR' : '🧳 TRAVELER'}
              </span>
            </div>
          </div>
        </div>

        <!-- CENTER: SPACIOUS SINGLE-LINE NAVIGATION PILLS -->
        <nav class="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-inner">
          ${isOperator ? `
            <!-- OPERATOR LINKS -->
            <button 
              onclick="window.navigateView('operator_dash')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'operator_dash' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
              <span>Dispatch</span>
            </button>

            <button 
              onclick="window.navigateView('operator_tour', { tour_id: 1 })" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'operator_tour' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="map-pin" class="w-4 h-4"></i>
              <span>Active Tours</span>
            </button>

            <button 
              onclick="window.navigateView('operator_alerts')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'operator_alerts' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="${(state.operatorAlerts || []).filter(a => a.status === 'pending').length > 0 ? 'alert-triangle' : 'shield-check'}" class="w-4 h-4 ${(state.operatorAlerts || []).filter(a => a.status === 'pending').length > 0 ? 'text-amber-500' : 'text-emerald-500'}"></i>
              <span>Alerts</span>
              ${(state.operatorAlerts || []).filter(a => a.status === 'pending').length > 0 ? `
                <span class="px-1.5 py-0.2 text-[10px] font-extrabold rounded-full bg-red-500 text-white">
                  ${(state.operatorAlerts || []).filter(a => a.status === 'pending').length}
                </span>
              ` : `
                <span class="px-1.5 py-0.2 text-[10px] font-extrabold rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  0
                </span>
              `}
            </button>

            <button 
              onclick="window.navigateView('operator_vendors')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'operator_vendors' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="truck" class="w-4 h-4"></i>
              <span>Vendors</span>
            </button>

            <button 
              onclick="window.navigateView('operator_analytics')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'operator_analytics' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="bar-chart-3" class="w-4 h-4"></i>
              <span>Analytics</span>
            </button>
          ` : `
            <!-- TRAVELER LINKS -->
            <button 
              onclick="window.navigateView('dashboard')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'dashboard' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="home" class="w-4 h-4"></i>
              <span>Dashboard</span>
            </button>

            <button 
              onclick="window.navigateView('planner')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:shadow-md hover:from-teal-500/25 hover:to-emerald-500/25">
              <i data-lucide="sparkles" class="w-4 h-4 text-teal-500 animate-pulse"></i>
              <span>Plan New Trip</span>
            </button>

            <button 
              onclick="window.navigateView('itinerary')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'itinerary' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="calendar" class="w-4 h-4"></i>
              <span>My Itineraries</span>
            </button>

            <button 
              onclick="window.navigateView('tracker')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'tracker' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="navigation" class="w-4 h-4"></i>
              <span>Live Tracker</span>
            </button>

            <button 
              onclick="window.navigateView('landing')" 
              class="whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${state.currentView === 'landing' ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="compass" class="w-4 h-4"></i>
              <span>Explore</span>
            </button>
          `}
        </nav>

        <!-- RIGHT: UTILITIES & USER PROFILE CAPSULE -->
        <div class="flex items-center space-x-3 shrink-0">
          
          <!-- JOIN AS OPERATOR QUICK CTA (VISIBLE TO TRAVELERS & GUESTS) -->
          ${!isOperator ? `
            <button 
              type="button" 
              onclick="window.openOperatorRegistrationModal()" 
              class="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition shadow-sm"
              title="Join TRAVORA verified Tour Operator & Fleet Partner network">
              <i data-lucide="building" class="w-3.5 h-3.5 text-amber-500"></i>
              <span>Join as Operator</span>
            </button>
          ` : ''}

          <!-- Notifications Bell -->
          <div class="relative">
            <button 
              id="notif-btn" 
              onclick="window.toggleNotificationsDropdown()"
              class="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 transition relative"
              title="Notifications">
              <i data-lucide="bell" class="w-4 h-4"></i>
              ${unreadCount > 0 ? `
                <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping"></span>
                <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              ` : ''}
            </button>
            
            <!-- Notifications Dropdown -->
            <div id="notif-dropdown" class="hidden absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl surface-card shadow-2xl z-50 p-4 border border-slate-200 dark:border-slate-700">
              <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div class="flex items-center space-x-2">
                  <span class="font-bold text-sm">Notifications</span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 font-semibold">${unreadCount} new</span>
                </div>
                <button onclick="window.markAllNotifsRead()" class="text-xs text-teal-600 dark:text-teal-400 hover:underline">Mark all read</button>
              </div>
              <div class="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-72 overflow-y-auto mt-2">
                ${state.notifications.length === 0 ? `
                  <div class="py-6 text-center text-xs text-slate-400">No notifications yet</div>
                ` : state.notifications.map(n => `
                  <div class="py-2.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl transition ${!n.is_read ? 'bg-teal-50/30 dark:bg-teal-950/20' : ''}">
                    <div class="flex items-start justify-between">
                      <p class="text-xs font-semibold ${n.type === 'critical' ? 'text-red-500' : 'text-slate-800 dark:text-slate-200'}">${n.title}</p>
                      <span class="text-[10px] text-slate-400">Just now</span>
                    </div>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${n.message}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Theme Toggle -->
          <button 
            onclick="window.toggleTheme()" 
            class="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 transition"
            title="Toggle Light / Dark Mode">
            <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4"></i>
          </button>

          <!-- Sleek User Capsule (Opens Profile Modal) -->
          <button 
            onclick="window.openProfileModal()" 
            class="flex items-center space-x-2.5 pl-1.5 pr-3 py-1.5 rounded-2xl surface-card border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-md transition group text-left"
            title="Profile & Settings">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-amber-500 p-[1.5px] shadow-sm shrink-0">
              <div class="w-full h-full rounded-[10px] bg-slate-950 text-white flex items-center justify-center text-xs font-black">
                ${user.name ? user.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'U'}
              </div>
            </div>
            <div class="whitespace-nowrap">
              <div class="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-teal-500 transition leading-none">
                ${(user.name || 'User').split(' ')[0]}
              </div>
              <div class="text-[10px] text-slate-400 font-medium leading-none mt-1 capitalize">
                ${user.role || 'traveler'}
              </div>
            </div>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-500 transition shrink-0"></i>
          </button>

          <!-- Logout Icon Button -->
          <button 
            onclick="window.handleLogout()" 
            class="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 border border-slate-200/80 dark:border-slate-800 transition shrink-0"
            title="Sign Out / Logout">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </button>

        </div>

      </div>
    </header>
  `;
}
