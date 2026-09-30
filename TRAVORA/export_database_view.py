#!/usr/bin/env python
"""
==============================================================================
TRAVORA AUTOMATIC DATABASE SCHEMA & SQL TABLE EXPORTER
==============================================================================
Connects to SQLite database (`travora.db`), inspects all 13+ relational tables,
retrieves schema definitions, dynamic row records, and generates:
1. DATABASE_VIEW.md   -> Human-readable Markdown tables with quick navigation links
2. DATABASE_VIEW.html -> Interactive SQL Table Studio with real-time record deletion
==============================================================================
"""

import os
import sys
import sqlite3
from datetime import datetime

# Ensure UTF-8 stdout on Windows
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "travora.db")
MD_OUTPUT_PATH = os.path.join(BASE_DIR, "DATABASE_VIEW.md")
HTML_OUTPUT_PATH = os.path.join(BASE_DIR, "DATABASE_VIEW.html")

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def generate_database_views():
    if not os.path.exists(DB_PATH):
        print(f"❌ Error: Database file '{DB_PATH}' not found. Please start server or run seed_data.py first.")
        return

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = dict_factory
    cursor = conn.cursor()

    # Get all table names in sqlite database (exclude system sqlite tables)
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name ASC")
    tables = [row["name"] for row in cursor.fetchall()]

    if not tables:
        print("ℹ️ Database contains no tables.")
        conn.close()
        return

    # -------------------------------------------------------------
    # 1. GENERATE DATABASE_VIEW.md (Markdown)
    # -------------------------------------------------------------
    md_lines = []
    md_lines.append("# 🗺️ TRAVORA Database Architecture & SQL Table Studio")
    md_lines.append(f"> **Database File:** `travora.db` (SQLite 3) | **Generated:** `{datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}`")
    md_lines.append("> **Live Interactive Studio:** [http://127.0.0.1:8000/db-view](http://127.0.0.1:8000/db-view)")
    md_lines.append("\n---\n")

    # Table of Contents
    md_lines.append("## 📌 Database Table Index")
    md_lines.append("| Table Name | Record Count | Description / Role |")
    md_lines.append("| :--- | :---: | :--- |")
    
    table_descriptions = {
        "users": "Registered travelers, tour operators, and profile accounts",
        "destinations": "Indian holiday hubs (Goa, Jaipur, Kerala, Manali, Udaipur, Kashmir, Rishikesh)",
        "hotels": "Accommodations, star ratings, nightly tariffs, and beach proximity",
        "activities": "Adventure sports, cultural walks, scuba packages, and sightseeing",
        "transports": "Volvo buses, express trains, flights, and cab routes",
        "tours": "Personalized custom dynamic itineraries created for travelers",
        "itinerary_items": "Day-by-day scheduled timeline slots, lat/lng coordinates, and icons",
        "change_events": "Disruptions, weather delays, and multi-component impact events",
        "alternative_options": "Explainable 5-factor AI replacement packages",
        "bookings": "Confirmed reservations and payment status tracking",
        "payments": "Financial transactions, GST breakdown, and payment methods",
        "vendors": "Supply chain partners, fleet inventory, and live status",
        "tour_groups": "Batch departures, group coordinators, and assigned transport",
        "reviews": "Multi-dimensional traveler ratings & testimonials",
        "notifications": "Real-time traveler and operator alerts",
        "operator_proposals": "Operator bidding and negotiation proposals"
    }

    for tbl in tables:
        cursor.execute(f"SELECT COUNT(*) as cnt FROM {tbl}")
        cnt = cursor.fetchone()["cnt"]
        desc = table_descriptions.get(tbl, "Relational database table")
        md_lines.append(f"| [**`{tbl}`**](#table-{tbl}) | `{cnt}` | {desc} |")

    md_lines.append("\n---\n")

    # Full Table Definitions & Records
    for tbl in tables:
        cursor.execute(f"PRAGMA table_info({tbl})")
        columns_info = cursor.fetchall()
        
        cursor.execute(f"SELECT * FROM {tbl}")
        rows = cursor.fetchall()

        md_lines.append(f"\n## <a id='table-{tbl}'></a> 📋 Table: `{tbl}`\n")
        md_lines.append(f"**Total Records:** `{len(rows)}` | **Columns:** `{len(columns_info)}`\n")

        # Column Schema definitions
        md_lines.append("<details><summary><strong>🔍 Click to view Column Schema Definition</strong></summary>\n")
        md_lines.append("| Column # | Name | Data Type | Not Null | Primary Key | Default |")
        md_lines.append("|:---:|:---|:---|:---:|:---:|:---|")
        for col in columns_info:
            cid = col["cid"]
            name = col["name"]
            ctype = col["type"]
            notnull = "YES" if col["notnull"] else "NO"
            pk = "🔑 YES" if col["pk"] else "-"
            dflt = col["dflt_value"] if col["dflt_value"] is not None else "-"
            md_lines.append(f"| {cid} | **`{name}`** | `{ctype}` | {notnull} | {pk} | {dflt} |")
        md_lines.append("\n</details>\n")

        # Table rows in Markdown
        if rows:
            # Exclude password_hash from markdown display for security
            col_names = [col["name"] for col in columns_info if col["name"] != "password_hash"]
            header_row = "| " + " | ".join(f"**{c.upper()}**" for c in col_names) + " |"
            align_row = "| " + " | ".join(":---" for _ in col_names) + " |"
            md_lines.append(header_row)
            md_lines.append(align_row)

            for r in rows:
                row_vals = []
                for c in col_names:
                    val = r[c]
                    if val is None:
                        val_str = "-"
                    elif isinstance(val, float):
                        val_str = f"{val:.2f}"
                    else:
                        val_str = str(val).replace("\n", " ").replace("|", "\\|")
                    row_vals.append(val_str)
                md_lines.append("| " + " | ".join(row_vals) + " |")
        else:
            md_lines.append("*(No records in this table currently — start fresh or create new records)*\n")

        md_lines.append("\n---\n")

    with open(MD_OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines))
    print(f"✓ Created Markdown SQL Table View: {MD_OUTPUT_PATH}")

    # -------------------------------------------------------------
    # 2. GENERATE DATABASE_VIEW.html (With Full Theme Support & Realtime Deletion)
    # -------------------------------------------------------------
    html_lines = []
    html_lines.append("""<!DOCTYPE html>
<html lang="en" class="scroll-smooth" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRAVORA — Database SQL Table Studio & Management</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              500: '#14b8a6',
              600: '#0d9488'
            }
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    code, pre { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen p-6 sm:p-10 transition-colors duration-200">
  
  <!-- TOAST NOTIFICATIONS CONTAINER -->
  <div id="toast-box" class="fixed top-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none"></div>

  <div class="max-w-7xl mx-auto space-y-8">
    
    <!-- HEADER -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div>
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold border border-teal-500/20">
          <span>SQL RELATIONAL DATABASE STUDIO & MANAGEMENT</span>
        </div>
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">TRAVORA Database Studio (travora.db)</h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Full interactive table management with real-time record deletion and SQLite synchronization.</p>
      </div>
      <div class="flex items-center space-x-3">
        <!-- THEME TOGGLE BUTTON -->
        <button onclick="toggleTheme()" id="theme-toggle-btn" class="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm transition flex items-center space-x-1.5">
          <span id="theme-icon">🌙</span>
          <span id="theme-text">Dark Mode</span>
        </button>

        <button onclick="window.location.reload()" class="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm transition">
          🔄 Refresh
        </button>
        <div class="text-right text-xs text-slate-500 dark:text-slate-400 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div>Engine: <span class="text-teal-600 dark:text-teal-400 font-bold">SQLite 3</span></div>
          <div>Total Tables: <span class="text-slate-900 dark:text-white font-bold">""" + str(len(tables)) + """</span></div>
        </div>
      </div>
    </div>

    <!-- TABLE SELECTOR TABS -->
    <div class="flex flex-wrap gap-2 pb-2">
""")

    for i, tbl in enumerate(tables):
        cursor.execute(f"SELECT COUNT(*) as cnt FROM {tbl}")
        cnt = cursor.fetchone()["cnt"]
        active_class = "bg-teal-600 text-white shadow-lg" if i == 0 else "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm"
        html_lines.append(f"""
      <button onclick="showTable('{tbl}')" id="btn-{tbl}" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 {active_class}">
        <span>{tbl}</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-950/60 text-slate-800 dark:text-slate-300 text-[10px]" id="count-{tbl}">{cnt}</span>
      </button>""")

    html_lines.append("""
    </div>

    <!-- TABLE CONTAINERS -->
""")

    for i, tbl in enumerate(tables):
        cursor.execute(f"PRAGMA table_info({tbl})")
        columns_info = cursor.fetchall()
        
        cursor.execute(f"SELECT * FROM {tbl}")
        rows = cursor.fetchall()
        col_names = [col["name"] for col in columns_info if col["name"] != "password_hash"]

        hidden_class = "" if i == 0 else "hidden"

        html_lines.append(f"""
    <div id="table-sec-{tbl}" class="table-container {hidden_class} bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span class="text-teal-600 dark:text-teal-400">TABLE:</span>
            <span>{tbl}</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 font-mono font-bold" id="badge-count-{tbl}">{len(rows)} records</span>
          </h2>
        </div>
        <div class="flex items-center space-x-2">
          <input 
            type="text" 
            oninput="filterTable('{tbl}', this.value)" 
            placeholder="Filter {tbl}..." 
            class="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs" id="grid-{tbl}">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              {"".join(f'<th class="py-3 px-3.5">{c.replace("_", " ")}</th>' for c in col_names)}
              <th class="py-3 px-3.5 text-right text-red-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
""")

        if rows:
            for r in rows:
                rec_id = r["id"] if "id" in r.keys() else 0
                label_val = r["name"] if "name" in r.keys() else (r["email"] if "email" in r.keys() else (r["title"] if "title" in r.keys() else f"#{rec_id}"))
                label_escaped = str(label_val).replace("'", "\\'")

                html_lines.append(f"""            <tr id="row-{tbl}-{rec_id}" class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">""")
                for c in col_names:
                    val = r[c]
                    if val is None:
                        cell_str = '<span class="text-slate-400 dark:text-slate-600">-</span>'
                    elif isinstance(val, float) and ("cost" in c or "price" in c or "budget" in c or "amount" in c or "total" in c):
                        cell_str = f'<span class="font-extrabold text-teal-600 dark:text-teal-400">₹{val:,.2f}</span>'
                    elif isinstance(val, int) and ("cost" in c or "price" in c or "budget" in c or "amount" in c):
                        cell_str = f'<span class="font-extrabold text-teal-600 dark:text-teal-400">₹{val:,}</span>'
                    elif c == "role":
                        badge_bg = "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30" if val == "operator" else "bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/30"
                        cell_str = f'<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase {badge_bg}">{val}</span>'
                    elif c == "status" or c == "booking_status":
                        is_ok = "active" in str(val).lower() or "confirmed" in str(val).lower()
                        badge_bg = "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30" if is_ok else "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30"
                        cell_str = f'<span class="px-2 py-0.5 rounded-full text-[10px] font-bold {badge_bg}">{val}</span>'
                    else:
                        cell_str = f'<span class="text-slate-700 dark:text-slate-300">{str(val)}</span>'
                    html_lines.append(f'              <td class="py-3 px-3.5">{cell_str}</td>')
                
                # ACTION: DELETE BUTTON
                html_lines.append(f"""              <td class="py-3 px-3.5 text-right whitespace-nowrap">
                <button 
                  onclick="deleteRecord('{tbl}', {rec_id}, '{label_escaped}')"
                  class="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white border border-red-500/20 font-bold transition text-[11px] inline-flex items-center space-x-1"
                  title="Delete Record #{rec_id}">
                  <span>🗑️ Delete</span>
                </button>
              </td>""")
                html_lines.append("            </tr>")
        else:
            html_lines.append(f'            <tr><td colspan="{len(col_names) + 1}" class="py-8 text-center text-slate-400 dark:text-slate-500">No records in table {tbl}</td></tr>')

        html_lines.append("""
          </tbody>
        </table>
      </div>
    </div>
""")

    html_lines.append("""
  </div>

  <script>
    const API_BASE = window.location.origin.includes('http') ? window.location.origin : 'http://127.0.0.1:8000';

    // Theme Management
    function applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        const icon = document.getElementById('theme-icon');
        const text = document.getElementById('theme-text');
        if (icon) icon.innerText = '🌙';
        if (text) text.innerText = 'Dark Mode';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        const icon = document.getElementById('theme-icon');
        const text = document.getElementById('theme-text');
        if (icon) icon.innerText = '☀️';
        if (text) text.innerText = 'Light Mode';
      }
      localStorage.setItem('travora_theme', theme);
    }

    function toggleTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    }

    // Initialize Theme
    const savedTheme = localStorage.getItem('travora_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    function showTable(tableName) {
      document.querySelectorAll('.table-container').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-teal-600', 'text-white', 'shadow-lg');
        btn.classList.add('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-800');
      });
      
      const sec = document.getElementById('table-sec-' + tableName);
      if (sec) sec.classList.remove('hidden');
      
      const btn = document.getElementById('btn-' + tableName);
      if (btn) {
        btn.classList.add('bg-teal-600', 'text-white', 'shadow-lg');
        btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-800');
      }
    }

    function filterTable(tableName, query) {
      const q = query.toLowerCase().trim();
      const rows = document.querySelectorAll('#grid-' + tableName + ' tbody tr');
      rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(q) ? '' : 'none';
      });
    }

    async function deleteRecord(tableName, recordId, recordName) {
      const confirmed = confirm(`⚠️ Are you sure you want to permanently delete:\\n\\nTable: '${tableName}'\\nRecord ID: #${recordId}\\nIdentifier: ${recordName}\\n\\nThis will remove the record from SQLite database travora.db.`);
      if (!confirmed) return;

      const endpoint = tableName === 'users' ? `${API_BASE}/api/users/${recordId}` : `${API_BASE}/api/crud/${tableName}/${recordId}`;

      try {
        showToast(`Deleting ${recordName}...`, 'info');
        const res = await fetch(endpoint, { method: 'DELETE' });
        
        if (!res.ok) {
          const err = await res.json().catch(() => ({ detail: 'Failed to delete' }));
          throw new Error(err.detail || 'Delete failed');
        }

        // Remove row visually
        const row = document.getElementById(`row-${tableName}-${recordId}`);
        if (row) {
          row.style.transition = 'all 0.3s ease';
          row.style.opacity = '0';
          row.style.transform = 'scale(0.95)';
          setTimeout(() => row.remove(), 300);
        }

        // Update counts
        const countBadge = document.getElementById(`badge-count-${tableName}`);
        const tabCount = document.getElementById(`count-${tableName}`);
        if (countBadge) {
          const curr = parseInt(countBadge.innerText) || 1;
          countBadge.innerText = `${Math.max(0, curr - 1)} records`;
        }
        if (tabCount) {
          const curr = parseInt(tabCount.innerText) || 1;
          tabCount.innerText = `${Math.max(0, curr - 1)}`;
        }

        showToast(`✓ Record #${recordId} (${recordName}) deleted permanently from '${tableName}'!`, 'success');
      } catch (err) {
        console.error(err);
        showToast(`Error: ${err.message}`, 'error');
      }
    }

    function showToast(message, type = 'info') {
      const box = document.getElementById('toast-box');
      if (!box) return;
      const el = document.createElement('div');
      el.className = `pointer-events-auto px-4 py-3 rounded-2xl shadow-xl text-xs font-bold border flex items-center space-x-2 text-white ${
        type === 'error' ? 'bg-red-600 border-red-700' :
        type === 'success' ? 'bg-emerald-600 border-emerald-700' :
        'bg-slate-900 border-slate-700'
      }`;
      el.innerText = message;
      box.appendChild(el);
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 500);
      }, 4000);
    }
  </script>
</body>
</html>
""")

    with open(HTML_OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("".join(html_lines))
    print(f"✓ Created HTML SQL Table Studio: {HTML_OUTPUT_PATH}")

    conn.close()

if __name__ == "__main__":
    generate_database_views()
