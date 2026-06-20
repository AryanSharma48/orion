"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RiskIntelligenceMap() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [scanCount, setScanCount] = useState(142892);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .map-theme {
          --color-background: #0F172A;
          --color-on-background: #eff1f3;
          --color-surface: #0F172A;
          --color-inverse-on-surface: #191c1e;
          --color-surface-dim: #191c1e;
          --color-surface-container: #1e293b;
          --color-inverse-surface: #eff1f3;
          --color-on-surface-variant: #c0c7d0;
          --color-surface-bright: #1e293b;
          --color-surface-container-high: #334155;
          --color-surface-container-low: #1e293b;
          --color-surface-container-lowest: #020617;
        }

        .teal-bloom {
          box-shadow: 0 0 40px -10px rgba(0, 178, 178, 0.3);
        }
        
        .map-pulse {
          animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(.33); opacity: 0.8; }
          80%, 100% { opacity: 0; }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="map-theme bg-background text-on-background font-body-md overflow-hidden flex h-screen w-full relative">
        {/* Mobile Navigation Toggle */}
        <button
          className="lg:hidden absolute top-4 left-4 z-[60] bg-surface-container-high p-2 rounded-lg text-white"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* SideNavBar */}
        <aside
          className={`bg-surface-container-low flex flex-col h-full py-8 px-4 w-64 shadow-xl shrink-0 z-50 fixed inset-y-0 left-0 transition-transform duration-300 lg:relative lg:translate-x-0 ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-12 px-2 flex justify-between items-center mt-12 lg:mt-0">
            <div>
              <h1 className="font-headline-md text-[24px] font-black text-primary-fixed-dim leading-none">
                ORION Intel
              </h1>
              <p className="font-label-caps text-[10px] mt-2 opacity-60 uppercase tracking-widest text-on-surface">
                Verified Status: Active
              </p>
            </div>
            <button
              className="lg:hidden text-white/60"
              onClick={() => setMobileNavOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/10 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps text-label-caps text-on-surface">Dashboard</span>
            </Link>
            <Link
              href="/map"
              className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold translate-x-1 transition-transform"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                public
              </span>
              <span className="font-label-caps text-label-caps text-on-primary">Risk Intelligence</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all"
            >
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-label-caps text-label-caps text-on-surface">Batch Track</span>
            </Link>
            <Link
              href="/assistant"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="font-label-caps text-label-caps text-on-surface">Safety Assistant</span>
            </Link>
            <Link
              href="/scanner"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow rounded-xl transition-all"
            >
              <span className="material-symbols-outlined">history</span>
              <span className="font-label-caps text-label-caps text-on-surface">Scan History</span>
            </Link>
          </nav>

          <div className="mt-auto space-y-4">
            <button className="w-full bg-counterfeit-red/20 text-counterfeit-red border border-counterfeit-red/30 py-3 rounded-xl font-bold font-label-caps text-label-caps flex items-center justify-center gap-2 hover:bg-counterfeit-red/30 transition-all">
              <span className="material-symbols-outlined text-sm">warning</span>
              Emergency Alert
            </button>
            <div className="pt-4 border-t border-white/5">
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="font-label-caps text-label-caps text-on-surface">Settings</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">help</span>
                <span className="font-label-caps text-label-caps text-on-surface">Support</span>
              </Link>
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

        {/* Main Map Interface */}
        <main className="relative flex-1 bg-deep-obsidian overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center grayscale contrast-125 brightness-[0.3] opacity-40"
              style={{
                backgroundImage:
                  "url('/assets/threat_map.png')",
              }}
            ></div>
            {/* Mock Hotspots */}
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl teal-bloom"></div>
            <div className="absolute top-1/2 left-2/3 w-48 h-48 bg-counterfeit-red/10 rounded-full blur-3xl"></div>
          </div>

          {/* Top Floating Header */}
          <header className="absolute top-0 left-0 right-0 z-20 flex flex-col md:flex-row justify-between items-start p-4 md:p-8 pointer-events-none gap-4">
            <div className="pointer-events-auto pl-12 lg:pl-0">
              <h2 className="font-headline-md text-xl md:text-headline-md font-bold text-white tracking-tight">
                Risk Intelligence Map
              </h2>
              <div className="flex items-center gap-4 mt-1 md:mt-2">
                <span className="flex items-center gap-2 font-mono-data text-[10px] md:text-mono-data text-verification-green">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-verification-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-verification-green"></span>
                  </span>
                  LIVE ENGINE
                </span>
                <span className="text-white/40 font-mono-data text-[10px] md:text-mono-data">
                  UTC: 14:22:09
                </span>
              </div>
            </div>
            <div className="flex gap-2 md:gap-4 pointer-events-auto">
              <div className="glass-card px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl">
                <p className="font-label-caps text-[8px] md:text-[10px] text-white/50 mb-0.5 md:mb-1 uppercase">
                  Live Scans
                </p>
                <p className="font-mono-data text-lg md:text-2xl font-bold text-primary-fixed-dim">
                  {scanCount.toLocaleString()}
                </p>
              </div>
              <div className="glass-card px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl border-l-2 md:border-l-4 border-l-verification-green">
                <p className="font-label-caps text-[8px] md:text-[10px] text-white/50 mb-0.5 md:mb-1 uppercase">
                  Neutralized
                </p>
                <p className="font-mono-data text-lg md:text-2xl font-bold text-verification-green">
                  8,210
                </p>
              </div>
            </div>
          </header>

          {/* Map Interactive Markers (Floating Intelligence) */}
          <div className="absolute top-[40%] left-[30%] z-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/30 rounded-full blur-xl map-pulse"></div>
              <div className="relative glass-card p-3 rounded-lg border-secondary/40">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                <div className="hidden md:block absolute top-0 left-full ml-4 w-48 glass-card p-4 rounded-xl teal-bloom scale-90 origin-left hover:-translate-y-1 transition-transform">
                  <h4 className="font-bold text-sm text-white">
                    New Delhi Cluster
                  </h4>
                  <p className="text-[11px] text-white/60 mt-1">
                    Authenticity Delta:{" "}
                    <span className="text-counterfeit-red">-42%</span>
                  </p>
                  <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-counterfeit-red w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Threat Alerts */}
          <aside
            className={`absolute right-0 top-0 bottom-0 w-full lg:w-80 z-40 flex flex-col p-0 lg:p-6 pointer-events-none transition-transform duration-300 ${
              alertsOpen
                ? "translate-y-0"
                : "translate-y-[calc(100%-60px)] lg:translate-y-0"
            }`}
            onClick={() => {
              if (window.innerWidth < 1024) setAlertsOpen(!alertsOpen);
            }}
          >
            <div className="pointer-events-auto flex flex-col h-full bg-surface-container-highest/95 lg:bg-transparent lg:glass-card rounded-t-3xl lg:rounded-3xl overflow-hidden mt-0 lg:mt-20 lg:mb-32 shadow-2xl lg:shadow-none transition-transform">
              <div className="lg:hidden flex justify-center py-3">
                <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
              </div>
              <div className="p-4 lg:p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-label-caps text-white font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-suspicious-amber text-sm">
                    campaign
                  </span>
                  Threat Alerts
                </h3>
                <span className="lg:hidden text-[10px] text-white/40 uppercase font-bold">
                  {alertsOpen ? "Swipe Down" : "Swipe Up"}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-suspicious-amber/30 transition-all cursor-pointer group hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-suspicious-amber/20 text-suspicious-amber px-2 py-0.5 rounded text-[10px] font-bold">
                      SUSPICIOUS
                    </span>
                    <span className="text-[10px] text-white/40">2m ago</span>
                  </div>
                  <p className="text-sm font-semibold text-white group-hover:text-primary-fixed-dim transition-colors">
                    Suspicious Batch B-4022
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    Detected: New Delhi Regional Terminal. OCR mismatch in
                    manufacturer seal.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-counterfeit-red/30 transition-all cursor-pointer group hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-counterfeit-red/20 text-counterfeit-red px-2 py-0.5 rounded text-[10px] font-bold">
                      COUNTERFEIT
                    </span>
                    <span className="text-[10px] text-white/40">14m ago</span>
                  </div>
                  <p className="text-sm font-semibold text-white group-hover:text-counterfeit-red transition-colors">
                    Batch Neutralized: AMZ-90
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    Location: Lagos, NG. 400 units intercepted at distribution
                    level.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-verification-green/30 transition-all cursor-pointer group hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-verification-green/20 text-verification-green px-2 py-0.5 rounded text-[10px] font-bold">
                      CLEARED
                    </span>
                    <span className="text-[10px] text-white/40">45m ago</span>
                  </div>
                  <p className="text-sm font-semibold text-white group-hover:text-verification-green transition-colors">
                    Shanghai Port Sweep
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    99.8% verification score on Batch PX-1. High-trust route
                    established.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Bottom: Community Intelligence Feed */}
          <footer className="absolute bottom-16 lg:bottom-0 left-0 right-0 z-30 p-4 md:p-6 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-4xl mx-auto glass-card rounded-2xl flex items-center p-3 md:p-4 gap-4 md:gap-8 overflow-hidden">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-sm md:text-base">
                    groups
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="font-label-caps text-[8px] md:text-[10px] text-white/40 uppercase">
                    Community Intel
                  </p>
                  <p className="font-bold text-xs md:text-sm text-white">
                    Live Feed
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <div className="flex items-center gap-12 animate-scroll whitespace-nowrap">
                  <span className="flex items-center gap-2 text-[10px] md:text-xs text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Dr. Aris: "Packaging shift noted in Ibuprofen batches in
                    Athens."
                  </span>
                  <span className="flex items-center gap-2 text-[10px] md:text-xs text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-verification-green"></span>
                    PharmaTrack: "Successfully verified 1.2M vials in Singapore
                    hub."
                  </span>
                  <span className="flex items-center gap-2 text-[10px] md:text-xs text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-suspicious-amber"></span>
                    Inspector J: "Scanning anomalies rising in suburban London
                    clinics."
                  </span>
                </div>
              </div>
              <button className="shrink-0 flex items-center gap-1 text-primary-fixed-dim hover:text-white transition-colors text-[10px] md:text-xs font-bold">
                <span className="hidden sm:inline">View Network</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>
          </footer>

          {/* Data Tooltip */}
          <div className="hidden md:block absolute bottom-32 left-8 z-30 w-64 glass-card p-5 rounded-2xl">
            <p className="font-label-caps text-[10px] text-white/50 mb-3 uppercase">
              Regional Risk Breakdown
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/80">APAC</span>
                <span className="text-xs font-mono-data text-counterfeit-red">
                  HIGH
                </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full">
                <div className="h-full bg-counterfeit-red w-[78%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/80">EMEA</span>
                <span className="text-xs font-mono-data text-suspicious-amber">
                  MODERATE
                </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full">
                <div className="h-full bg-suspicious-amber w-[42%]"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
