import { store } from '../store.js';
import { api } from '../api.js';

export function renderOperatorDashboard() {
  const state = store.getState();
  const operatorData = state.operatorData || {
    kpis: {
      active_tours: 24,
      today_checkins: 8,
      pending_changes: 5,
      alerts: 3,
      revenue: "₹4.2L",
      resolution_time: "8 min",
      success_rate: "94%"
    },
    active_tours: [
      { id: 1, code: "TR1024", customer_name: "Krishna Singh", destination: "Goa", dates: "09-12 to 09-15", coordinator: "Aarav Mehta", status: "attention", travelers: 2, cost: 20500 },
      { id: 2, code: "TR1021", customer_name: "Rahul Sharma", destination: "Jaipur", dates: "09-10 to 09-13", coordinator: "Diya Sen", status: "active", travelers: 2, cost: 17800 },
      { id: 3, code: "TR1022", customer_name: "Sneha Patel", destination: "Kerala", dates: "09-14 to 09-19", coordinator: "Vikram Nair", status: "active", travelers: 3, cost: 29400 },
      { id: 4, code: "TR1023", customer_name: "Arjun Kapoor", destination: "Manali", dates: "09-11 to 09-15", coordinator: "Aarav Mehta", status: "attention", travelers: 4, cost: 36200 }
    ]
  };
  const pendingAlertsCount = (state.operatorAlerts || []).filter(a => a.status === 'pending').length;
  const kpis = {
    ...operatorData.kpis,
    alerts: pendingAlertsCount,
    pending_changes: pendingAlertsCount
  };
  const tours = operatorData.active_tours || [];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- TOP OPERATIONS HEADER -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center space-x-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              OPERATIONS DISPATCH CENTER
            </span>
            <span class="text-xs text-slate-400 font-mono">Live Sync Active</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Tour Operations Command Center
          </h1>
        </div>

        <div class="flex items-center space-x-3">
          <button 
            onclick="window.navigateView('operator_alerts')" 
            class="px-4 py-2.5 rounded-xl surface-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition flex items-center space-x-1.5">
            <i data-lucide="${pendingAlertsCount > 0 ? 'alert-triangle' : 'shield-check'}" class="w-4 h-4 ${pendingAlertsCount > 0 ? 'text-red-500' : 'text-emerald-500'}"></i>
            <span>Alerts Feed (${pendingAlertsCount})</span>
          </button>
        </div>
      </div>

      <!-- OPERATIONS KPI CARDS -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div class="surface-card p-5 rounded-2xl space-y-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold">Active Tours</span>
            <i data-lucide="compass" class="w-4 h-4 text-teal-500"></i>
          </div>
          <div class="text-2xl font-black text-slate-900 dark:text-white">${kpis.active_tours}</div>
          <div class="text-[10px] text-emerald-500 font-medium">↑ 18% vs last week</div>
        </div>

        <div class="surface-card p-5 rounded-2xl space-y-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold">Today's Check-ins</span>
            <i data-lucide="hotel" class="w-4 h-4 text-indigo-500"></i>
          </div>
          <div class="text-2xl font-black text-slate-900 dark:text-white">${kpis.today_checkins}</div>
          <div class="text-[10px] text-slate-400">6 on-schedule • 2 pending</div>
        </div>

        <div class="surface-card p-5 rounded-2xl space-y-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold">Pending Changes</span>
            <i data-lucide="refresh-cw" class="w-4 h-4 text-amber-500"></i>
          </div>
          <div class="text-2xl font-black ${pendingAlertsCount > 0 ? 'text-amber-500' : 'text-emerald-500'}">${pendingAlertsCount}</div>
          <div class="text-[10px] ${pendingAlertsCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-500'} font-medium">
            ${pendingAlertsCount > 0 ? 'Requires operator review' : 'All changes resolved'}
          </div>
        </div>

        <div class="surface-card p-5 rounded-2xl space-y-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold">Critical Alerts</span>
            <i data-lucide="alert-circle" class="w-4 h-4 ${pendingAlertsCount > 0 ? 'text-red-500' : 'text-emerald-500'}"></i>
          </div>
          <div class="text-2xl font-black ${pendingAlertsCount > 0 ? 'text-red-500' : 'text-emerald-500'}">${pendingAlertsCount}</div>
          <div class="text-[10px] ${pendingAlertsCount > 0 ? 'text-red-500' : 'text-emerald-500'} font-medium">
            ${pendingAlertsCount > 0 ? 'Action required' : '0 unhandled collisions'}
          </div>
        </div>

        <div class="surface-card p-5 rounded-2xl space-y-1 col-span-2 lg:col-span-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold">Booking Revenue</span>
            <i data-lucide="credit-card" class="w-4 h-4 text-emerald-500"></i>
          </div>
          <div class="text-2xl font-black text-slate-900 dark:text-white">${kpis.revenue}</div>
          <div class="text-[10px] text-emerald-500 font-medium">94% operation success</div>
        </div>

      </div>

      <!-- ACTIVE TOURS MANAGEMENT TABLE -->
      <div class="surface-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">
              Live Fleet Tour Roster
            </h2>
            <p class="text-xs text-slate-400">
              Assigned travelers, route coordination, and real-time status dispatch.
            </p>
          </div>

          <!-- Search / Filters -->
          <div class="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Search tour / customer..." 
              class="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th class="py-3 px-3">Tour ID</th>
                <th class="py-3 px-3">Traveler</th>
                <th class="py-3 px-3">Destination</th>
                <th class="py-3 px-3">Travel Dates</th>
                <th class="py-3 px-3">Coordinator</th>
                <th class="py-3 px-3">Cost</th>
                <th class="py-3 px-3">Status</th>
                <th class="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
              ${tours.map(t => `
                <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                  <td class="py-3 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                    #${t.code}
                  </td>
                  <td class="py-3 px-3">
                    <div class="font-bold text-slate-800 dark:text-slate-200">${t.customer_name}</div>
                    <div class="text-[10px] text-slate-400">${t.travelers} Guests</div>
                  </td>
                  <td class="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    ${t.destination}
                  </td>
                  <td class="py-3 px-3 text-slate-500 font-mono">
                    ${t.dates}
                  </td>
                  <td class="py-3 px-3 font-medium text-slate-600 dark:text-slate-300">
                    ${t.coordinator}
                  </td>
                  <td class="py-3 px-3 font-bold text-slate-900 dark:text-white">
                    ₹${t.cost.toLocaleString('en-IN')}
                  </td>
                  <td class="py-3 px-3">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${t.status === 'attention' ? 'badge-critical' : 'badge-active'}">
                      ${t.status === 'attention' ? '⚠️ Attention' : '🟢 Active'}
                    </span>
                  </td>
                  <td class="py-3 px-3 text-right space-x-1.5">
                    <button 
                      onclick="window.inspectTourDetail(${t.id})" 
                      class="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-600 hover:text-white text-teal-600 dark:text-teal-400 font-bold transition border border-teal-200 dark:border-teal-800">
                      Inspect
                    </button>
                    ${t.status === 'attention' ? `
                      <button 
                        onclick="window.openDisruptionModal(${t.id})" 
                        class="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition flex-inline items-center space-x-1"
                        title="Review alternative solutions">
                        <span>Resolve</span>
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  `;
}
