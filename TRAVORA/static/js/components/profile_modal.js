import { store } from '../store.js';
import { api } from '../api.js';

export function renderProfileModal() {
  const state = store.getState();
  if (!state.isProfileModalOpen) return '';

  const user = state.user || {
    id: 1,
    name: 'Traveler User',
    email: 'traveler@travora.demo',
    role: 'traveler',
    phone: '+91 98765 43210'
  };

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <!-- Backdrop click to close -->
      <div class="absolute inset-0" onclick="window.closeProfileModal()"></div>

      <div class="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto transition-colors duration-200">
        
        <!-- Ambient Glow -->
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- MODAL HEADER -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-amber-500 p-[2px] shadow-lg shadow-teal-500/10">
              <div class="w-full h-full rounded-2xl bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center text-base font-extrabold">
                ${user.name ? user.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'U'}
              </div>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">${user.name}</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${user.role === 'operator' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30' : 'bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/30'}">
                  ${user.role}
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 font-mono">${user.email}</p>
            </div>
          </div>

          <button 
            type="button" 
            onclick="window.closeProfileModal()" 
            class="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- PROFILE UPDATE FORM -->
        <form onsubmit="window.handleSaveProfile(event)" class="space-y-4 text-xs">
          
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300">Full Name</label>
            <div class="relative">
              <i data-lucide="user" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
              <input 
                type="text" 
                name="name" 
                id="profile-name" 
                value="${user.name || ''}" 
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300">Email Address (Registered Login)</label>
            <div class="relative">
              <i data-lucide="mail" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
              <input 
                type="email" 
                name="email" 
                id="profile-email" 
                value="${user.email || ''}" 
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
            <div class="relative">
              <i data-lucide="phone" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
              <input 
                type="text" 
                name="phone" 
                id="profile-phone" 
                value="${user.phone || '+91 98765 43210'}" 
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <!-- SECURITY / CHANGE PASSWORD -->
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Change Account Password (Optional)
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300">New Password</label>
                <div class="relative">
                  <i data-lucide="lock" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
                  <input 
                    type="password" 
                    name="new_password" 
                    id="profile-new-password" 
                    placeholder="Leave blank to keep same" 
                    class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                <div class="relative">
                  <i data-lucide="shield-check" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
                  <input 
                    type="password" 
                    name="confirm_password" 
                    id="profile-confirm-password" 
                    placeholder="Re-enter new password" 
                    class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- SAVE BUTTON -->
          <div class="pt-2 flex items-center justify-end space-x-2">
            <button 
              type="button" 
              onclick="window.closeProfileModal()" 
              class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition">
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-lg shadow-teal-500/20 transition flex items-center space-x-1.5">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Save Changes</span>
            </button>
          </div>

        </form>

        <!-- DANGER ZONE / ACCOUNT ACTIONS -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account Actions</span>
            
            <!-- LOGOUT BUTTON -->
            <button 
              type="button" 
              onclick="window.closeProfileModal(); window.handleLogout();"
              class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold transition flex items-center space-x-1 text-xs">
              <i data-lucide="log-out" class="w-3.5 h-3.5 text-slate-500 dark:text-slate-400"></i>
              <span>Sign Out</span>
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="font-bold text-red-600 dark:text-red-400 text-xs">Delete Account Permanently</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400">Erase all trips, bookings, and personal records from database.</div>
            </div>
            
            <button 
              type="button" 
              onclick="window.closeProfileModal(); window.handleDeleteAccount();"
              class="px-3.5 py-2 rounded-xl bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white border border-red-300 dark:border-red-500/30 font-bold text-xs transition flex items-center justify-center space-x-1 shrink-0">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              <span>Delete Account</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  `;
}
