"use client";

import { useState } from "react";
import Link from "next/link";

export default function SafetyAssistant() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes scanline {
            0% { top: 0%; }
            100% { top: 100%; }
        }
        .scanner-line {
            height: 2px;
            background: linear-gradient(90deg, transparent, #00B2B2, transparent);
            position: absolute;
            width: 100%;
            animation: scanline 3s linear infinite;
        }
      `}</style>
      <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col md:flex-row overflow-x-hidden">
        {/* Mobile SideNavBar Overlay */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          ></div>
        )}

        {/* SideNavBar */}
        <aside
          className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-surface-container-low border-r border-outline-variant shrink-0 z-50 transition-transform duration-300 ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full py-8 px-4">
            <div className="mb-10 px-2 flex justify-between items-center mt-12 md:mt-0">
              <div>
                <span className="font-headline-sm text-[24px] font-black text-primary tracking-tight">
                  ORION Intel
                </span>
                <p className="text-[11px] font-label-caps text-on-surface-variant opacity-70 mt-1">
                  Verified Status: Active
                </p>
              </div>
              <button
                className="md:hidden p-2 text-on-surface-variant"
                onClick={() => setMobileNavOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all group"
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span className="font-label-caps">Dashboard</span>
              </Link>
              <Link
                href="/map"
                className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">public</span>
                <span className="font-label-caps">Risk Intelligence</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">inventory_2</span>
                <span className="font-label-caps">Batch Track</span>
              </Link>
              <Link
                href="/assistant"
                className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(0,178,178,0.2)]"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  chat_bubble
                </span>
                <span className="font-label-caps">Safety Assistant</span>
              </Link>
              <Link
                href="/scanner"
                className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">history</span>
                <span className="font-label-caps">Scan History</span>
              </Link>
            </nav>

            <div className="mt-auto space-y-2 pt-6 border-t border-outline-variant">
              <button className="w-full flex items-center justify-center gap-2 bg-error text-on-error py-3 rounded-xl font-bold text-sm mb-4 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[18px]">
                  emergency
                </span>
                Emergency Alert
              </button>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="font-label-caps">Settings</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">help</span>
                <span className="font-label-caps">Support</span>
              </Link>
              <div className="flex items-center gap-3 px-2 mt-4">
                <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline relative">
                  <img
                    className="w-full h-full object-cover"
                    src="/assets/pharmacist_profile.png"
                    alt="Profile"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate">Pharmacist Profile</p>
                  <p className="text-[10px] text-on-surface-variant">ID: 4921</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
          {/* Top Navigation */}
          <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-40">
            <div className="flex items-center gap-3 md:gap-4">
              <button
                className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container rounded-lg"
                onClick={() => setMobileNavOpen(true)}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="text-lg md:text-headline-md font-bold text-primary truncate">
                Safety Assistant
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-6">
              <div className="flex items-center gap-1 md:gap-2 bg-surface-container px-2 md:px-3 py-1.5 rounded-full border border-outline-variant/50">
                <span className="material-symbols-outlined text-[18px]">
                  language
                </span>
                <select className="bg-transparent border-none outline-none focus:ring-0 text-xs md:text-sm font-label-caps cursor-pointer p-0 max-w-[40px] md:max-w-none">
                  <option>EN</option>
                  <option>HI</option>
                  <option>ES</option>
                </select>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors hidden sm:block">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="bg-primary text-on-primary px-3 md:px-5 py-2 md:py-2.5 rounded-full font-label-caps text-xs md:text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">scan</span>
                  <span className="hidden xs:inline">Scan</span>
                </button>
              </div>
            </div>
          </header>

          {/* Dynamic Content Area */}
          <div className="flex-1 flex flex-col xl:flex-row overflow-hidden h-full">
            {/* Conversational Interface */}
            <div className="flex-1 overflow-y-auto px-4 md:px-edge-margin-desktop py-8 md:py-12 scroll-smooth">
              <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
                {/* Initial Assistant Message */}
                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
                    <span
                      className="material-symbols-outlined text-white text-[16px] md:text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bolt
                    </span>
                  </div>
                  <div className="bg-white rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] rounded-tl-[4px] glass-card p-4 md:p-6 max-w-[90%] md:max-w-[85%] border border-primary/10">
                    <p className="text-sm md:text-body-lg mb-4">
                      Hello. I am the ORION AI Assistant. I have successfully analyzed
                      the medicine labels you scanned. How can I help you ensure safe
                      administration today?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <button className="text-left p-3 md:p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-teal-glow transition-all">
                        <p className="text-[10px] md:font-label-caps text-primary mb-1 uppercase">
                          Common Query
                        </p>
                        <p className="text-xs md:text-sm">
                          "Are there any side effects for Lisinopril?"
                        </p>
                      </button>
                      <button className="text-left p-3 md:p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-teal-glow transition-all">
                        <p className="text-[10px] md:font-label-caps text-primary mb-1 uppercase">
                          Interactions
                        </p>
                        <p className="text-xs md:text-sm">
                          "Can I take this with Ibuprofen?"
                        </p>
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-3 md:gap-4 items-start justify-end">
                  <div className="bg-[#004569] text-white rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[4px] p-4 md:p-6 max-w-[90%] md:max-w-[85%] shadow-md">
                    <p className="text-sm md:text-body-lg">
                      Show me the safety analysis for my current medications: Metformin
                      and Warfarin.
                    </p>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[16px] md:text-[20px]">
                      person
                    </span>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3 md:gap-4 items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-white text-[16px] md:text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bolt
                    </span>
                  </div>
                  <div className="flex flex-col gap-6 w-full">
                    {/* Safety Warnings Card */}
                    <div className="glass-card p-5 md:p-8 rounded-[24px] border-l-4 border-counterfeit-red relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <span className="material-symbols-outlined text-counterfeit-red">
                            warning
                          </span>
                          <h3 className="text-lg md:text-[24px] font-bold">
                            Critical Safety Warnings
                          </h3>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-error-container/30 rounded-xl">
                            <div className="w-2 h-2 rounded-full bg-error mt-2 shrink-0"></div>
                            <div>
                              <p className="font-bold text-sm md:text-base text-on-error-container">
                                Bleeding Risk Escalation
                              </p>
                              <p className="text-xs md:text-sm text-on-error-container opacity-80">
                                Metformin can slightly increase the effect of Warfarin.
                                Monitor for unusual bruising.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-suspicious-amber/10 rounded-xl">
                            <div className="w-2 h-2 rounded-full bg-suspicious-amber mt-2 shrink-0"></div>
                            <div>
                              <p className="font-bold text-sm md:text-base text-on-background">
                                Dietary Conflict: Vitamin K
                              </p>
                              <p className="text-xs md:text-sm text-on-surface-variant">
                                Warfarin efficacy is highly sensitive to leafy green
                                intake. Keep consumption consistent.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dosage & Missed Dose Module */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="glass-card p-4 md:p-6 rounded-[24px]">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="material-symbols-outlined text-primary text-xl">
                            medication
                          </span>
                          <h4 className="text-[10px] md:font-label-caps text-primary uppercase">
                            Dosage &amp; Usage
                          </h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-end pb-2 border-b border-outline-variant/30">
                            <span className="text-xs md:text-sm text-on-surface-variant">
                              Metformin
                            </span>
                            <span className="text-xs md:font-mono-data text-primary font-bold">
                              500mg (2x)
                            </span>
                          </div>
                          <div className="flex justify-between items-end pb-2 border-b border-outline-variant/30">
                            <span className="text-xs md:text-sm text-on-surface-variant">
                              Warfarin
                            </span>
                            <span className="text-xs md:font-mono-data text-primary font-bold">
                              5mg (Eve)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="glass-card p-4 md:p-6 rounded-[24px] bg-secondary-container/10">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="material-symbols-outlined text-secondary text-xl">
                            history_toggle_off
                          </span>
                          <h4 className="text-[10px] md:font-label-caps text-secondary uppercase">
                            Missed Dose
                          </h4>
                        </div>
                        <p className="text-xs md:text-sm text-on-surface-variant mb-4">
                          If you miss <span className="font-bold">Warfarin</span>: Take
                          it same day. If next day,{" "}
                          <span className="text-error font-bold underline uppercase">
                            don't
                          </span>{" "}
                          double dose.
                        </p>
                        <button className="w-full py-2 px-4 rounded-lg bg-secondary text-on-secondary text-xs md:text-sm font-bold flex items-center justify-center gap-2">
                          Reminders
                          <span className="material-symbols-outlined text-[16px]">
                            notifications_active
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar content stacked for mobile */}
                <div className="xl:hidden space-y-6 pt-6">
                  <div className="glass-card p-6 rounded-[24px]">
                    <h5 className="text-[10px] font-label-caps text-on-surface-variant uppercase mb-4">
                      Active Analysis
                    </h5>
                    <div className="relative aspect-video sm:aspect-[2/1] bg-deep-obsidian rounded-2xl overflow-hidden flex items-center justify-center">
                      <div className="scanner-line"></div>
                      <img
                        className="w-full h-full object-cover opacity-60 grayscale"
                        src="/assets/medicine_box.png"
                        alt="Scan preview"
                      />
                      <div className="absolute bottom-4 left-4">
                        <p className="font-mono-data text-verification-green text-[10px] animate-pulse">
                          OCR SCANNING
                        </p>
                        <p className="text-white text-sm font-bold">Metformin 500mg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-40"></div>
            </div>

            {/* Chat Input (Floating - Adapts to width) */}
            <div className="fixed bottom-6 left-0 right-0 px-4 md:px-0 md:absolute md:bottom-10 md:left-1/2 md:-translate-x-1/2 w-full max-w-2xl z-40">
              <div className="glass-card bg-surface/90 p-1.5 md:p-2 rounded-2xl flex items-center gap-2 md:gap-3 shadow-2xl border border-primary/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-20 transition-all">
                <button className="p-2 md:p-3 text-on-surface-variant hover:text-primary hidden xs:block">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
                <input
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm md:text-body-md py-2 md:py-3 placeholder:text-on-surface-variant/50"
                  placeholder="Ask about medications..."
                  type="text"
                />
                <div className="flex gap-1 md:gap-2 pr-1 md:pr-2">
                  <button className="p-2 md:p-3 text-on-surface-variant hover:text-primary">
                    <span className="material-symbols-outlined text-xl">mic</span>
                  </button>
                  <button className="bg-primary text-on-primary p-2 md:p-3 rounded-xl shadow-lg hover:bg-primary-container transition-all active:scale-90">
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      send
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Desktop Sidebar */}
            <aside className="hidden xl:flex flex-col w-80 bg-surface-container-lowest border-l border-outline-variant/30 p-8 shrink-0 overflow-y-auto">
              <div className="space-y-10">
                <div>
                  <h5 className="font-label-caps text-on-surface-variant mb-6 uppercase">
                    Active Analysis
                  </h5>
                  <div className="relative aspect-[3/4] bg-deep-obsidian rounded-3xl overflow-hidden shadow-inner flex items-center justify-center group">
                    <div className="scanner-line"></div>
                    <img
                      className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                      src="/assets/medicine_box.png"
                      alt="Medicine analysis"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-obsidian to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-mono-data text-verification-green text-[12px] animate-pulse">
                        OCR SCANNING: VERIFIED
                      </p>
                      <p className="text-white font-bold">Metformin 500mg</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h5 className="font-label-caps text-on-surface-variant uppercase">
                    Live Intelligence
                  </h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group cursor-help">
                      <div className="w-1.5 h-1.5 rounded-full bg-verification-green"></div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        FDA Approval: 100%
                      </p>
                    </div>
                    <div className="flex items-center gap-4 group cursor-help">
                      <div className="w-1.5 h-1.5 rounded-full bg-verification-green"></div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        Authenticity Score: 9.9
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-outline-variant/30">
                  <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <p className="text-xs text-primary font-bold mb-2 flex items-center gap-2 uppercase">
                      <span className="material-symbols-outlined text-sm">
                        auto_awesome
                      </span>
                      AI Insight
                    </p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      "Based on your profile, you may experience mild drowsiness."
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
