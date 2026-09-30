import { store } from '../store.js';
import { api } from '../api.js';

export function renderAIAssistant() {
  return `
    <!-- FLOATING TOGGLE BUTTON -->
    <div class="fixed bottom-6 right-6 z-40">
      <button 
        id="ai-assistant-toggle"
        onclick="window.toggleAIAssistantDrawer()"
        class="w-14 h-14 rounded-full bg-gradient-to-tr from-teal-600 via-teal-500 to-amber-500 text-white shadow-2xl flex items-center justify-center hover:scale-105 transition transform duration-200 border-2 border-white/20">
        <i data-lucide="sparkles" class="w-6 h-6"></i>
        <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-900 animate-pulse"></span>
      </button>
    </div>

    <!-- FLOATING CHAT DRAWER -->
    <div id="ai-chat-drawer" class="hidden fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] surface-card rounded-3xl shadow-2xl border border-teal-500/30 flex flex-col h-[520px] overflow-hidden modal-content">
      
      <!-- CHAT HEADER -->
      <div class="p-4 bg-gradient-to-r from-teal-700 to-teal-600 text-white flex items-center justify-between">
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <i data-lucide="bot" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="font-extrabold text-sm leading-tight flex items-center space-x-1.5">
              <span>Travora AI Copilot</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div class="text-[10px] text-teal-100">Dynamic Tour State Orchestrator</div>
          </div>
        </div>
        <button onclick="window.toggleAIAssistantDrawer()" class="p-1 text-white/80 hover:text-white">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- CHAT MESSAGES STREAM -->
      <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
        
        <div class="flex items-start space-x-2">
          <div class="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 text-[10px] font-bold">
            AI
          </div>
          <div class="p-3 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 space-y-1 max-w-[85%]">
            <p>Hello Krishna! I am your <strong>Travora Dynamic Copilot</strong>. I can modify your itinerary in real time, negotiate rates, or resolve scheduling constraints.</p>
          </div>
        </div>

      </div>

      <!-- QUICK ACTION CHIPS -->
      <div class="px-3 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto whitespace-nowrap space-x-1.5">
        <button onclick="window.sendAIPrompt('Make my trip cheaper')" class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/10 hover:bg-teal-500 hover:text-white text-teal-600 dark:text-teal-400 border border-teal-500/20 transition">
          💰 Make it cheaper
        </button>
        <button onclick="window.sendAIPrompt('Add more adventure activities')" class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500 hover:text-slate-900 text-amber-600 dark:text-amber-400 border border-amber-500/20 transition">
          🏄 Add Adventure
        </button>
        <button onclick="window.sendAIPrompt('Why did you recommend this hotel?')" class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 transition">
          ⭐ Explain Score
        </button>
        <button onclick="window.sendAIPrompt('Upgrade to 5 star luxury')" class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 hover:bg-indigo-500 hover:text-white text-indigo-600 dark:text-indigo-400 transition">
          ✨ Luxury Upgrade
        </button>
      </div>

      <!-- INPUT BAR -->
      <form onsubmit="window.handleAIChatSubmit(event)" class="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
        <input 
          type="text" 
          id="ai-chat-input"
          placeholder="Ask AI or tweak itinerary..." 
          class="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button 
          type="submit" 
          class="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow transition">
          <i data-lucide="send" class="w-4 h-4"></i>
        </button>
      </form>

    </div>
  `;
}
