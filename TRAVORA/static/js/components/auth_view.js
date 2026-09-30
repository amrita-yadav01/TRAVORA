import { store } from '../store.js';
import { api } from '../api.js';

export function renderAuthView() {
  const state = store.getState();
  const authMode = state.authMode || 'login'; // 'login', 'signup', or 'forgot'
  const selectedRole = state.authRole || 'traveler'; // 'traveler' or 'operator'
  const isDark = state.theme === 'dark';

  return `
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative transition-colors duration-200">
      
      <!-- TOP RIGHT THEME TOGGLE -->
      <div class="absolute top-6 right-6 z-20 flex items-center space-x-2">
        <button 
          type="button" 
          onclick="window.toggleTheme()" 
          class="p-2.5 rounded-2xl surface-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 transition shadow-sm flex items-center space-x-1.5 text-xs font-bold"
          title="Toggle Dark / Light Theme">
          <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4 text-amber-500"></i>
          <span>${isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      <!-- AUTH CONTAINER -->
      <div class="max-w-md w-full space-y-7 surface-card bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        <!-- Ambient Glow -->
        <div class="absolute -top-20 -right-20 w-60 h-60 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- LOGO & BRAND -->
        <div class="text-center space-y-2">
          <div class="inline-flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <i data-lucide="compass" class="w-6 h-6"></i>
            </div>
            <span class="text-2xl font-black tracking-tight bg-gradient-to-r from-teal-500 via-teal-400 to-amber-500 bg-clip-text text-transparent">
              TRAVORA
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Plan Freely. Travel Personally. Adapt Instantly.
          </p>
        </div>

        ${authMode !== 'forgot' ? `
          <!-- ROLE SELECTOR TABS -->
          <div class="space-y-1.5">
            <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
              Select Account Role
            </label>
            <div class="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-950/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button 
                type="button" 
                onclick="window.setAuthRole('traveler')"
                class="py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${selectedRole === 'traveler' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
                <i data-lucide="user" class="w-3.5 h-3.5"></i>
                <span>Traveler Portal</span>
              </button>
              <button 
                type="button" 
                onclick="window.setAuthRole('operator')"
                class="py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${selectedRole === 'operator' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
                <i data-lucide="shield" class="w-3.5 h-3.5"></i>
                <span>Tour Operator</span>
              </button>
            </div>
          </div>

          <!-- AUTH MODE SWITCHER (LOGIN vs SIGNUP) -->
          <div class="flex border-b border-slate-200 dark:border-slate-800 text-center">
            <button 
              type="button" 
              onclick="window.setAuthMode('login')"
              class="flex-1 pb-3 text-xs font-bold border-b-2 transition ${authMode === 'login' ? 'border-teal-500 text-teal-600 dark:text-teal-400' : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}">
              Sign In to Account
            </button>
            <button 
              type="button" 
              onclick="window.setAuthMode('signup')"
              class="flex-1 pb-3 text-xs font-bold border-b-2 transition ${authMode === 'signup' ? 'border-teal-500 text-teal-600 dark:text-teal-400' : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}">
              Create New Account
            </button>
          </div>
        ` : `
          <!-- FORGOT PASSWORD HEADER -->
          <div class="text-center space-y-1 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div class="inline-flex p-2.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-1">
              <i data-lucide="key" class="w-5 h-5"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Reset Account Password</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">
              Enter your registered email address. If the email exists in our records, your password will be updated.
            </p>
          </div>
        `}

        <!-- AUTH FORM -->
        <form id="auth-main-form" onsubmit="window.handleAuthFormSubmit(event)" class="space-y-4 text-xs">
          
          ${authMode === 'signup' ? `
            <div class="space-y-1">
              <label class="block font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <div class="relative">
                <i data-lucide="user" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
                <input 
                  type="text" 
                  name="name" 
                  id="auth-name" 
                  placeholder="${selectedRole === 'traveler' ? 'e.g. Krishna Singh' : 'e.g. Aarav Mehta'}" 
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          ` : ''}

          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300">Registered Email Address</label>
            <div class="relative">
              <i data-lucide="mail" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
              <input 
                type="email" 
                name="email" 
                id="auth-email" 
                placeholder="${selectedRole === 'traveler' ? 'traveler@travora.demo' : 'operator@travora.demo'}" 
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>
          </div>

          ${authMode !== 'forgot' ? `
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <label class="block font-bold text-slate-700 dark:text-slate-300">Password</label>
                ${authMode === 'login' ? `
                  <button 
                    type="button" 
                    onclick="window.setAuthMode('forgot')"
                    class="text-teal-600 dark:text-teal-400 hover:text-teal-500 text-[11px] font-semibold transition">
                    Forgot Password?
                  </button>
                ` : ''}
              </div>
              <div class="relative">
                <i data-lucide="lock" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
                <input 
                  type="password" 
                  name="password" 
                  id="auth-password" 
                  placeholder="Enter account password" 
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          ` : `
            <div class="space-y-1">
              <label class="block font-bold text-slate-700 dark:text-slate-300">New Password</label>
              <div class="relative">
                <i data-lucide="lock" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
                <input 
                  type="password" 
                  name="new_password" 
                  id="auth-new-password" 
                  placeholder="Enter new password (min 4 characters)" 
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
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
                  id="auth-confirm-password" 
                  placeholder="Confirm new password" 
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          `}

          ${authMode === 'signup' ? `
            <div class="space-y-1">
              <label class="block font-bold text-slate-700 dark:text-slate-300">Phone Number (Optional)</label>
              <div class="relative">
                <i data-lucide="phone" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
                <input 
                  type="text" 
                  name="phone" 
                  id="auth-phone" 
                  placeholder="+91 98765 43210" 
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            ${selectedRole === 'operator' ? `
              <div class="space-y-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300">Company / Agency Name</label>
                <div class="relative">
                  <i data-lucide="building" class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3"></i>
                  <input 
                    type="text" 
                    name="company_name" 
                    id="auth-company" 
                    placeholder="e.g. Royal Rajputana Heritage Journeys" 
                    class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Operating Destinations</label>
                  <input 
                    type="text" 
                    name="operating_destinations" 
                    id="auth-operating-dests" 
                    placeholder="e.g. Goa, Jaipur" 
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Fleet / Vehicles</label>
                  <input 
                    type="text" 
                    name="fleet_size" 
                    id="auth-fleet" 
                    placeholder="e.g. 10 Volvo Coaches" 
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300">Specialties (comma-separated)</label>
                <input 
                  type="text" 
                  name="specialties" 
                  id="auth-specialties" 
                  placeholder="e.g. Beach, Watersports, Luxury, Forts" 
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            ` : ''}
          ` : ''}

          <!-- SUBMIT BUTTON -->
          <div class="pt-2">
            <button 
              type="submit" 
              class="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-extrabold text-sm shadow-xl shadow-teal-500/25 transition flex items-center justify-center space-x-2">
              <i data-lucide="${authMode === 'login' ? 'log-in' : (authMode === 'signup' ? 'user-plus' : 'check-circle')}" class="w-4 h-4"></i>
              <span>${authMode === 'login' ? `Sign In as ${selectedRole === 'traveler' ? 'Traveler' : 'Operator'}` : (authMode === 'signup' ? 'Register Account' : 'Update & Reset Password')}</span>
            </button>
          </div>

          ${authMode === 'forgot' ? `
            <div class="text-center pt-2">
              <button 
                type="button" 
                onclick="window.setAuthMode('login')"
                class="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 font-semibold transition flex items-center justify-center space-x-1 mx-auto">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
                <span>Back to Sign In</span>
              </button>
            </div>
          ` : ''}

        </form>

        ${authMode !== 'forgot' ? `
          <!-- CLEAN START PROMPT & QUICK ROLE REGISTRATION -->
          <div class="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div class="text-[10px] uppercase font-bold text-slate-400 text-center tracking-wider">
              ${authMode === 'login' ? 'First Time on TRAVORA? Start From Scratch' : 'Already have an account?'}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <button 
                type="button" 
                onclick="window.setAuthRole('traveler'); window.setAuthMode('${authMode === 'login' ? 'signup' : 'login'}')"
                class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition flex items-center justify-between group">
                <div>
                  <div class="font-bold text-teal-600 dark:text-teal-400">${authMode === 'login' ? 'Register as Traveler' : 'Sign in as Traveler'}</div>
                  <div class="text-[10px] text-slate-500 dark:text-slate-400">Personal AI trip planner</div>
                </div>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-500"></i>
              </button>

              <button 
                type="button" 
                onclick="window.setAuthRole('operator'); window.setAuthMode('${authMode === 'login' ? 'signup' : 'login'}')"
                class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition flex items-center justify-between group">
                <div>
                  <div class="font-bold text-amber-600 dark:text-amber-400">${authMode === 'login' ? 'Register as Operator' : 'Sign in as Operator'}</div>
                  <div class="text-[10px] text-slate-500 dark:text-slate-400">Tour operations & fleet hub</div>
                </div>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500"></i>
              </button>
            </div>
          </div>
        ` : ''}

      </div>

    </div>
  `;
}
