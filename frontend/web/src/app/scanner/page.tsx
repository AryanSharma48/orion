"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ScannerWorkspace() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full h-full relative">
      {/* MOBILE NAV TOGGLE */}
      <button
        className="lg:hidden fixed top-5 left-5 z-[60] bg-primary text-white p-2 rounded-lg shadow-lg cursor-pointer"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="material-symbols-outlined block">
          {mobileNavOpen ? "close" : "menu"}
        </span>
      </button>

      {/* SIDE NAV BAR */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-surface-container-low shadow-xl py-8 px-4 z-50 transform transition-transform lg:relative lg:translate-x-0 flex flex-col h-full overflow-y-auto ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 px-2 flex justify-between items-center lg:block mt-12 lg:mt-0">
          <div>
            <h1 className="font-headline-md text-[24px] font-black text-primary leading-tight">
              ORION Intel
            </h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant opacity-70 mt-1">
              Verified Status: Active
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-all rounded-xl group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              dashboard
            </span>
            <span className="font-label-caps text-label-caps">Dashboard</span>
          </Link>
          <Link
            href="/map"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-all rounded-xl group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              public
            </span>
            <span className="font-label-caps text-label-caps">Risk Intelligence</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-all rounded-xl group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              inventory_2
            </span>
            <span className="font-label-caps text-label-caps">Batch Track</span>
          </Link>
          <Link
            href="/assistant"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-all rounded-xl group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              chat_bubble
            </span>
            <span className="font-label-caps text-label-caps">Safety Assistant</span>
          </Link>
          <Link
            href="/scanner"
            className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold lg:translate-x-1 transition-transform"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              history
            </span>
            <span className="font-label-caps text-label-caps">Scan History</span>
          </Link>
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-outline-variant/30">
          <button className="w-full py-3 px-4 bg-counterfeit-red/10 text-counterfeit-red rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-counterfeit-red/20 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              emergency
            </span>
            <span className="font-label-caps text-label-caps">Emergency Alert</span>
          </button>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-all rounded-xl"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-caps text-label-caps">Settings</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-all rounded-xl"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-caps text-label-caps">Support</span>
          </Link>

          <div className="flex items-center gap-3 mt-6 px-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 relative">
              <img
                className="w-full h-full object-cover"
                src="/assets/pharmacist_profile.png"
              />
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-bold truncate">Pharmacist Profile</p>
              <p className="text-[10px] text-on-surface-variant truncate">
                Global Pharmacist ID: 9920
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative w-full lg:w-[calc(100%-16rem)]">
        {/* HEADER TOP BAR */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-edge-margin-desktop bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant/20 sticky top-0">
          <div className="flex flex-col ml-12 lg:ml-0">
            <h2 className="font-headline-md text-[20px] lg:text-headline-md font-bold text-primary truncate max-w-[150px] sm:max-w-none">
              Live Scan Workspace
            </h2>
            <p className="text-[10px] lg:text-label-caps font-label-caps text-on-surface-variant uppercase tracking-[0.1em] lg:tracking-[0.15em]">
              Neural Engine v4.28 • Scanning Active
            </p>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="hidden sm:flex items-center gap-2 px-3 lg:px-5 py-2.5 border border-outline-variant rounded-xl text-on-surface-variant hover:bg-surface-variant transition-all">
              <span className="material-symbols-outlined text-[20px]">
                qr_code_scanner
              </span>
              <span className="font-label-caps text-label-caps hidden md:inline">
                Enter Batch
              </span>
            </button>
            <button className="flex items-center gap-2 px-4 lg:px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[20px]">
                photo_camera
              </span>
              <span className="font-label-caps text-label-caps hidden sm:inline">
                Open Camera
              </span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col xl:flex-row p-4 lg:p-10 gap-6 lg:gap-10 overflow-x-hidden">
          {/* CENTER: SCAN ZONE */}
          <div className="flex-1 flex flex-col gap-6 min-w-0 h-[400px] lg:h-auto">
            <div
              className="flex-1 glass-card rounded-[24px] lg:rounded-[32px] relative overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/[0.08] transition-colors cursor-pointer group min-h-[300px]"
              onClick={() => setIsScanning(!isScanning)}
            >
              {/* Scanning Lines Container */}
              <div
                className={`absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[24px] lg:rounded-[32px] ${
                  isScanning ? "block" : "hidden"
                }`}
              >
                <div className="scanning-line absolute w-full left-0 opacity-0"></div>
                <div
                  className="scanning-line absolute w-full left-0 opacity-0"
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>

              {/* Placeholder Image for Drag-and-Drop */}
              <div
                className={`z-20 flex flex-col items-center text-center space-y-4 lg:space-y-6 px-6 transition-opacity duration-300 ${
                  isScanning ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[32px] lg:text-[48px]">
                    upload_file
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-[20px] lg:text-headline-md text-on-surface font-bold">
                    Drop Package Image
                  </h3>
                  <p className="text-body-md lg:text-body-lg text-on-surface-variant mt-1 lg:mt-2">
                    AI-driven analysis will begin instantly
                  </p>
                </div>
                <div className="flex gap-2 lg:gap-3">
                  <span className="px-2 py-1 bg-surface-container rounded-lg font-mono-data text-[10px] lg:text-label-caps">
                    JPG
                  </span>
                  <span className="px-2 py-1 bg-surface-container rounded-lg font-mono-data text-[10px] lg:text-label-caps">
                    PNG
                  </span>
                  <span className="px-2 py-1 bg-surface-container rounded-lg font-mono-data text-[10px] lg:text-label-caps">
                    HEIC
                  </span>
                </div>
              </div>

              {/* Active Image Placeholder */}
              <div
                className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
                  isScanning ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  className="w-full h-full object-cover"
                  src="/assets/medicine_box.png"
                  alt="Scanned Box"
                />
              </div>
            </div>

            {/* Footer Status Bar */}
            <div className="h-auto py-3 lg:h-12 glass-card rounded-2xl flex flex-wrap items-center px-4 lg:px-6 gap-3 lg:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-verification-green animate-pulse"></div>
                <span className="font-mono-data text-[10px] lg:text-label-caps text-on-surface">
                  Neural Engine: Link Ready
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-outline-variant"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] lg:text-[18px] text-on-surface-variant">
                  memory
                </span>
                <span className="font-mono-data text-[10px] lg:text-label-caps text-on-surface">
                  Latency: 14ms
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: OCR & HISTORY */}
          <div className="w-full xl:w-96 flex flex-col gap-6 min-h-0">
            {/* OCR DATA CARD */}
            <div className="glass-card rounded-[24px] p-5 lg:p-6 flex flex-col gap-4 border-l-4 border-l-primary relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 p-4">
                <span
                  className="material-symbols-outlined text-primary/30 animate-spin"
                  style={{ animationDuration: "4s" }}
                >
                  sync
                </span>
              </div>
              <h4 className="font-label-caps text-label-caps text-primary tracking-widest">
                REAL-TIME EXTRACTION
              </h4>
              <div className="space-y-4">
                <div className="group">
                  <label className="font-label-caps text-[10px] text-on-surface-variant mb-1 block">
                    PRODUCT_NAME
                  </label>
                  <div className="font-mono-data text-body-md text-on-surface p-3 bg-primary/5 rounded-lg flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                    <span
                      className="truncate mr-2 animate-pulse"
                      style={{ animationDuration: "2s" }}
                    >
                      Amoxicillin 500mg
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px] text-verification-green shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                </div>
                <div className="group">
                  <label className="font-label-caps text-[10px] text-on-surface-variant mb-1 block">
                    BATCH_NUMBER
                  </label>
                  <div className="font-mono-data text-body-md text-on-surface p-3 bg-primary/5 rounded-lg flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                    <span
                      className="truncate mr-2 animate-pulse"
                      style={{ animationDuration: "1.5s" }}
                    >
                      B-X9920-LPR
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px] text-verification-green shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                </div>
                <div className="group">
                  <label className="font-label-caps text-[10px] text-on-surface-variant mb-1 block">
                    EXPIRY_DATE
                  </label>
                  <div className="font-mono-data text-body-md text-on-surface p-3 bg-primary/5 rounded-lg flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                    <span
                      className="truncate mr-2 animate-pulse"
                      style={{ animationDuration: "1.8s" }}
                    >
                      OCT 2028
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px] text-verification-green shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/report"
                className="w-full mt-2 py-4 bg-primary-container text-on-primary-container font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform active:scale-95 touch-manipulation"
              >
                <span className="material-symbols-outlined text-[18px]">
                  verified_user
                </span>
                <span className="font-label-caps text-label-caps">
                  AUTHENTICATE BATCH
                </span>
              </Link>
            </div>

            {/* SCAN HISTORY */}
            <div className="glass-card rounded-[24px] p-5 lg:p-6 flex-1 flex flex-col gap-4 min-h-[300px] lg:min-h-0">
              <div className="flex items-center justify-between">
                <h4 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
                  RECENT SCAN LOG
                </h4>
                <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">
                  VIEW ALL
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                <div className="p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white/60 transition-all cursor-pointer group touch-manipulation">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-verification-green/10 text-verification-green rounded-lg flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[14px] text-on-surface truncate">
                        Lipitor 20mg
                      </p>
                      <p className="font-mono-data text-[11px] text-on-surface-variant">
                        Batch: #88210 - Verified
                      </p>
                      <p className="text-[10px] text-outline mt-1 italic">
                        2 mins ago
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white/60 transition-all cursor-pointer group touch-manipulation">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-suspicious-amber/10 text-suspicious-amber rounded-lg flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        report_problem
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[14px] text-on-surface truncate">
                        Ventolin Inhaler
                      </p>
                      <p className="font-mono-data text-[11px] text-on-surface-variant">
                        Batch: #UNKWN - Flagged
                      </p>
                      <p className="text-[10px] text-outline mt-1 italic">
                        14 mins ago
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white/60 transition-all cursor-pointer group touch-manipulation">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-verification-green/10 text-verification-green rounded-lg flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[14px] text-on-surface truncate">
                        Metformin 850mg
                      </p>
                      <p className="font-mono-data text-[11px] text-on-surface-variant">
                        Batch: #YT-992 - Verified
                      </p>
                      <p className="text-[10px] text-outline mt-1 italic">
                        1 hour ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
