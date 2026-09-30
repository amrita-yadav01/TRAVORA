import { store } from '../store.js';

export function renderBookingModal() {
  const state = store.getState();
  if (!state.isBookingModalOpen) return '';

  const tour = state.currentTour;
  const pricing = (tour && tour.pricing) ? tour.pricing : {
    subtotal: 17500, taxes: 2100, service_fee: 900, total: 20500
  };

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
      <div class="surface-card rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 modal-content">
        
        <!-- HEADER -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <i data-lucide="credit-card" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-lg text-slate-900 dark:text-white">
                Confirm & Book Journey
              </h3>
              <p class="text-xs text-slate-400">Tour #${tour ? tour.code : 'TR1024'} • Instant Confirmation</p>
            </div>
          </div>
          <button onclick="window.closeBookingModal()" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- ITEMIZED INVOICE -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
          <div class="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Base Itinerary Subtotal</span>
            <span class="font-bold text-slate-800 dark:text-slate-200">₹${pricing.subtotal ? pricing.subtotal.toLocaleString('en-IN') : '17,500'}</span>
          </div>
          <div class="flex justify-between text-slate-600 dark:text-slate-400">
            <span>GST & State Tourism Taxes (5%)</span>
            <span class="font-bold text-slate-800 dark:text-slate-200">₹${pricing.taxes ? pricing.taxes.toLocaleString('en-IN') : '2,100'}</span>
          </div>
          <div class="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Dynamic Dispatch Fee</span>
            <span class="font-bold text-slate-800 dark:text-slate-200">₹${pricing.service_fee ? pricing.service_fee.toLocaleString('en-IN') : '900'}</span>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
            <span>Total Payable</span>
            <span class="text-teal-600 dark:text-teal-400">₹${pricing.total ? pricing.total.toLocaleString('en-IN') : '20,500'}</span>
          </div>
        </div>

        <!-- PAYMENT METHOD SELECTION -->
        <div class="space-y-3">
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Mock Payment Method
          </label>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <label class="cursor-pointer">
              <input type="radio" name="pay_method" value="UPI" class="peer sr-only" checked />
              <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-teal-500 peer-checked:bg-teal-500/10 text-center font-bold text-slate-800 dark:text-slate-200">
                UPI / GPay
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="pay_method" value="Card" class="peer sr-only" />
              <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-teal-500 peer-checked:bg-teal-500/10 text-center font-bold text-slate-800 dark:text-slate-200">
                Credit Card
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="pay_method" value="NetBanking" class="peer sr-only" />
              <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-teal-500 peer-checked:bg-teal-500/10 text-center font-bold text-slate-800 dark:text-slate-200">
                NetBanking
              </div>
            </label>
          </div>
        </div>

        <!-- SUBMIT PAYMENT -->
        <div class="pt-2">
          <button 
            onclick="window.processMockBooking()" 
            class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-teal-500/20 hover:from-teal-500 hover:to-emerald-400 transition flex items-center justify-center space-x-2">
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Confirm & Pay ₹${pricing.total ? pricing.total.toLocaleString('en-IN') : '20,500'}</span>
          </button>
          <p class="text-[10px] text-center text-slate-400 mt-2">
            🔒 256-Bit Encrypted Mock Payment Sandbox for Demo
          </p>
        </div>

      </div>
    </div>
  `;
}
