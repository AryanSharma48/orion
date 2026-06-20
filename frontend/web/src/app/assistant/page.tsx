"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function SafetyAssistant() {

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
      <div className="flex-1 flex flex-col lg:flex-row w-full h-screen relative bg-background text-on-background font-body-md overflow-hidden">
        <Sidebar theme="light" />

        {/* Main Content Canvas */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Top Navigation */}
          <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-40">
            <div className="flex items-center gap-3 md:gap-4">
              <button
                className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container rounded-lg"
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
            <div className="flex-1 flex flex-col relative">
              <div className="flex-1 overflow-y-auto px-4 md:px-edge-margin-desktop py-8 md:py-12 scroll-smooth pb-32">
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
              </div>
              <div className="h-40"></div>
            </div>

            {/* Chat Input (Floating - Adapts to width) */}
            <div className="absolute bottom-6 left-0 right-0 px-4 md:px-8 w-full max-w-3xl mx-auto z-40">
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


          </div>
        </main>
      </div>
    </>
  );
}
