import { store } from '../store.js';

export function renderTripTracker() {
  const state = store.getState();
  const tour = state.currentTour;

  if (!tour) {
    return `
      <div class="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <p class="text-sm text-slate-500">No active journey found. Plan a trip to start tracking!</p>
      </div>
    `;
  }

  const items = tour.itinerary_items || [];
  const currentItem = items.find(it => it.day_number === 2 && it.item_type === 'activity') || items[0] || {
    title: "Calangute Water Sports Package",
    time_start: "09:00 AM",
    time_end: "12:30 PM",
    location_name: "Calangute Watersports Hub"
  };

  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HEADER -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center space-x-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold badge-active flex items-center space-x-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>LIVE ON TOUR</span>
            </span>
            <span class="text-xs font-mono text-slate-400">Day 2 of ${tour.duration_days}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            ${tour.title}
          </h1>
        </div>
      </div>

      <!-- CURRENT LIVE ACTIVITY CARD -->
      <div class="p-6 sm:p-8 rounded-3xl surface-card border border-teal-500/40 shadow-2xl space-y-4 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
            <i data-lucide="navigation" class="w-4 h-4 animate-pulse"></i>
            <span>Current Scheduled Stop</span>
          </div>
          <span class="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
            ${currentItem.time_start} — ${currentItem.time_end}
          </span>
        </div>

        <div>
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white">
            ${currentItem.title}
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            ${currentItem.subtitle || currentItem.location_name}
          </p>
        </div>

        <div class="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100 dark:border-slate-800">
          <div class="flex items-center space-x-2 text-slate-500">
            <i data-lucide="map-pin" class="w-4 h-4 text-teal-500"></i>
            <span>${currentItem.location_name}</span>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="window.navigateView('itinerary')" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 transition">
              View Full Day Schedule
            </button>
          </div>
        </div>
      </div>

      <!-- COORDINATOR EMERGENCY & HOTEL VOUCHER CARD -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <!-- Coordinator SOS -->
        <div class="p-5 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase">
            <i data-lucide="shield" class="w-4 h-4 text-teal-500"></i>
            <span>Tour Coordinator Hotline</span>
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white text-base">${tour.coordinator_name}</div>
            <div class="text-xs text-slate-500">Assigned 24x7 On-Ground Support Specialist</div>
          </div>
          <div class="flex items-center space-x-2 pt-1">
            <a href="tel:+919820011223" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i>
              <span>Call Coordinator</span>
            </a>
            <button onclick="window.askAiToHelpEmergency()" class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs">
              Chat Assistance
            </button>
          </div>
        </div>

        <!-- Hotel Voucher -->
        <div class="p-5 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase">
            <i data-lucide="hotel" class="w-4 h-4 text-indigo-500"></i>
            <span>Confirmed Stay Voucher</span>
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white text-base">Hotel Paradise Goa (3-Star Deluxe)</div>
            <div class="text-xs text-slate-500">Booking Ref: #BK-TR1024-99 • Check-in: 04:30 PM</div>
          </div>
          <div class="pt-1">
            <span class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              ✓ Digital Key Ready at Reception
            </span>
          </div>
        </div>

      </div>

      <!-- COMPLETE & REVIEW CTA -->
      <div class="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center space-y-3">
        <h3 class="font-bold text-base text-slate-900 dark:text-white">
          Completed your adventure?
        </h3>
        <p class="text-xs text-slate-500 max-w-md mx-auto">
          Share your feedback on hotels, activities, transport, and coordinator adaptiveness.
        </p>
        <button 
          onclick="window.openReviewModal(1)" 
          class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-amber-500 text-white font-bold text-xs shadow-md transition">
          Submit Trip Review & Rating
        </button>
      </div>

    </div>
  `;
}
