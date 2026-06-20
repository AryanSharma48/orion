"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function VerificationReport() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay setting content visibility for a smooth intro effect
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .teal-bloom {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.15);
        }
        .gauge-ring {
            transition: stroke-dashoffset 1s ease-out;
        }
      `}</style>
      <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden min-h-screen flex flex-col md:flex-row">
        {/* Mobile Top Nav */}
        <header className="md:hidden flex items-center justify-between p-4 bg-surface-container-low border-b border-outline-variant/30 sticky top-0 z-[60]">
          <span className="font-headline-sm text-lg font-black text-primary">
            ORION Intel
          </span>
          <button className="p-2" onClick={() => setMobileNavOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-[100] bg-surface-container-low p-6 flex flex-col md:hidden">
            <div className="flex justify-between items-center mb-10">
              <span className="font-headline-sm text-xl font-black text-primary">
                ORION Intel
              </span>
              <button className="p-2" onClick={() => setMobileNavOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="space-y-4">
              <Link
                href="/"
                className="flex items-center gap-4 text-on-surface-variant font-bold text-lg"
              >
                Dashboard
              </Link>
              <Link
                href="/map"
                className="flex items-center gap-4 text-on-surface-variant font-bold text-lg"
              >
                Risk Intelligence
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 text-on-surface-variant font-bold text-lg"
              >
                Batch Track
              </Link>
              <Link
                href="/assistant"
                className="flex items-center gap-4 text-on-surface-variant font-bold text-lg"
              >
                Safety Assistant
              </Link>
            </nav>
            <div className="mt-auto border-t border-outline-variant/30 pt-6">
              <button className="w-full bg-counterfeit-red text-white py-4 rounded-xl font-bold mb-4">
                Emergency Alert
              </button>
            </div>
          </div>
        )}

        {/* SideNavBar (Desktop Only) */}
        <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-xl z-50 py-8 px-4">
          <div className="mb-10 px-2">
            <span className="font-headline-sm text-headline-sm font-black text-primary">
              ORION Intel
            </span>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant opacity-70 mt-1">
              Verified Status: Active
            </p>
          </div>
          <nav className="flex-1 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow transition-all rounded-xl"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps text-label-caps">Dashboard</span>
            </Link>
            <Link
              href="/map"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow transition-all rounded-xl"
            >
              <span className="material-symbols-outlined">public</span>
              <span className="font-label-caps text-label-caps">
                Risk Intelligence
              </span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow transition-all rounded-xl"
            >
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-label-caps text-label-caps">Batch Track</span>
            </Link>
            <Link
              href="/assistant"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow transition-all rounded-xl"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="font-label-caps text-label-caps">
                Safety Assistant
              </span>
            </Link>
            <Link
              href="/scanner"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-teal-glow transition-all rounded-xl"
            >
              <span className="material-symbols-outlined">history</span>
              <span className="font-label-caps text-label-caps">Scan History</span>
            </Link>
          </nav>
          <div className="mt-auto space-y-2 pt-6 border-t border-outline-variant/30">
            <button className="w-full bg-counterfeit-red text-white py-3 rounded-xl font-bold text-sm mb-4 active:scale-95 transition-transform">
              Emergency Alert
            </button>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant transition-all rounded-lg"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-caps text-label-caps">Settings</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant transition-all rounded-lg"
            >
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-caps text-label-caps">Support</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          className={`flex-1 md:ml-64 p-4 sm:p-6 md:p-10 lg:p-12 max-w-[1440px] mx-auto w-full transition-all duration-700 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="material-symbols-outlined text-verification-green"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant tracking-[0.2em] uppercase">
                  Verification Report
                </span>
              </div>
              <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-headline-lg text-deep-obsidian">
                Verified Medicine
              </h1>
              <p className="font-body-lg text-base sm:text-body-lg text-on-surface-variant mt-2 max-w-2xl">
                High-precision analysis of batch authenticity based on multi-spectral
                imaging and global supply chain ledger data.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-verification-green/10 text-verification-green px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-verification-green/20 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-verification-green animate-pulse"></div>
                <span className="font-bold tracking-widest text-[10px] sm:text-xs">
                  VERIFIED
                </span>
              </div>
              <button className="p-2 sm:p-3 rounded-full bg-surface-container-highest hover:bg-outline-variant transition-colors">
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
            </div>
          </header>

          {/* Top Tier Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-gutter mb-4 sm:mb-gutter">
            {/* Authenticity Score Gauge */}
            <div className="lg:col-span-4 glass-card p-6 sm:p-card-padding rounded-3xl flex flex-col items-center justify-center teal-bloom order-2 lg:order-1">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-surface-container"
                    cx="50"
                    cy="50"
                    fill="none"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                  ></circle>
                  <circle
                    className="text-verification-green gauge-ring"
                    cx="50"
                    cy="50"
                    fill="none"
                    r="45"
                    stroke="currentColor"
                    strokeDasharray="282.7"
                    strokeDashoffset={showContent ? "5.6" : "282.7"}
                    strokeLinecap="round"
                    strokeWidth="8"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display-hero text-3xl sm:text-[48px] text-deep-obsidian font-extrabold leading-none">
                    98%
                  </span>
                  <span className="font-label-caps text-[8px] sm:text-[10px] text-on-surface-variant tracking-widest uppercase mt-1">
                    Authenticity
                  </span>
                </div>
              </div>
              <p className="mt-6 sm:mt-8 text-center text-on-surface-variant text-sm sm:text-body-md">
                This medicine shows no signs of tampering and matches manufacturer
                specifications across 42 diagnostic parameters.
              </p>
            </div>

            {/* Product Information */}
            <div className="lg:col-span-8 glass-card p-6 sm:p-card-padding rounded-3xl order-1 lg:order-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <h2 className="font-headline-md text-2xl sm:text-headline-md text-deep-obsidian">
                  Product Details
                </h2>
                <span className="font-mono-data text-xs sm:text-mono-data text-on-surface-variant bg-surface-container px-3 py-1 rounded self-start">
                  ID: PHN-992-018
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] sm:text-label-caps text-on-surface-variant opacity-60 uppercase">
                    Manufacturer
                  </label>
                  <p className="font-headline-md text-lg sm:text-[20px] font-bold text-primary">
                    Manufacturer Ltd.
                  </p>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Hyderabad Hub, India
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] sm:text-label-caps text-on-surface-variant opacity-60 uppercase">
                    Batch Number
                  </label>
                  <p className="font-headline-md text-lg sm:text-[20px] font-bold text-primary">
                    PB-2026-X-991
                  </p>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Validated in Ethereum Ledger
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] sm:text-label-caps text-on-surface-variant opacity-60 uppercase">
                    Expiry Date
                  </label>
                  <p className="font-headline-md text-lg sm:text-[20px] font-bold text-primary">
                    12 / 2027
                  </p>
                  <div className="flex items-center gap-2 text-verification-green text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-base sm:text-[16px]">
                      check_circle
                    </span>
                    <span>1.5 Years Remaining</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] sm:text-label-caps text-on-surface-variant opacity-60 uppercase">
                    Scan Origin
                  </label>
                  <p className="font-headline-md text-lg sm:text-[20px] font-bold text-primary">
                    Mumbai Pharmacy
                  </p>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Lat: 19.07° N, Lon: 72.87° E
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Audit Scorecard & Secondary Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-gutter mb-4 sm:mb-gutter">
            {/* AI Audit Scorecard */}
            <div className="lg:col-span-7 glass-card p-6 sm:p-card-padding rounded-3xl">
              <h3 className="font-headline-md text-xl sm:text-[24px] mb-6 sm:mb-8 text-deep-obsidian">
                AI Audit Scorecard
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-body-md text-sm sm:text-base font-semibold">
                      Logo Match Score
                    </span>
                    <span className="font-mono-data text-verification-green font-bold text-base sm:text-lg">
                      99.2%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-verification-green transition-all duration-1000"
                      style={{ width: showContent ? "99.2%" : "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-body-md text-sm sm:text-base font-semibold">
                      Typography Match
                    </span>
                    <span className="font-mono-data text-verification-green font-bold text-base sm:text-lg">
                      97.8%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-verification-green transition-all duration-1000 delay-100"
                      style={{ width: showContent ? "97.8%" : "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-body-md text-sm sm:text-base font-semibold">
                      Color Consistency
                    </span>
                    <span className="font-mono-data text-verification-green font-bold text-base sm:text-lg">
                      96.5%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-verification-green transition-all duration-1000 delay-200"
                      style={{ width: showContent ? "96.5%" : "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-body-md text-sm sm:text-base font-semibold">
                      Hologram Confidence
                    </span>
                    <span className="font-mono-data text-suspicious-amber font-bold text-base sm:text-lg">
                      92.1%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-suspicious-amber transition-all duration-1000 delay-300"
                      style={{ width: showContent ? "92.1%" : "0%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulatory & Trust Stats */}
            <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
              {/* Regulatory Auditor Module */}
              <div className="bg-primary text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden flex-1">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-inverse-primary">
                      account_balance
                    </span>
                    <h3 className="font-label-caps text-[10px] sm:text-label-caps tracking-widest uppercase">
                      CDSCO Compliance
                    </h3>
                  </div>
                  <p className="text-xl sm:text-headline-md font-bold mb-2">
                    Verification Active
                  </p>
                  <p className="text-inverse-primary/80 text-xs sm:text-sm mb-6 leading-relaxed">
                    Cross-referenced with Central Drugs Standard Control
                    Organization database. License No: MD-9821-C is current and
                    valid.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-lg backdrop-blur-md border border-white/20">
                    <span className="material-symbols-outlined text-xs sm:text-sm">
                      security
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold font-mono-data uppercase">
                      Reg-Audit: Passed
                    </span>
                  </div>
                </div>
              </div>

              {/* Global Trust Insight */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border-l-4 border-verification-green">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-verification-green/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-verification-green text-xl sm:text-2xl">
                      groups
                    </span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] sm:text-label-caps text-on-surface-variant uppercase mb-1">
                      Global Trust Ledger
                    </p>
                    <p className="text-sm sm:text-body-lg">
                      <span className="font-bold text-primary">12,400+</span> times
                      verified globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Analysis CTA */}
          <footer className="mt-12 sm:mt-section-gap border-t border-outline-variant pt-8 sm:pt-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <span className="font-headline-md text-lg sm:text-[20px] font-bold text-on-surface">
                ORION
              </span>
              <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <Link
                  className="text-xs sm:text-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  Trust &amp; Privacy
                </Link>
                <Link
                  className="text-xs sm:text-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  Manufacturer Portal
                </Link>
                <Link
                  className="text-xs sm:text-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  Regulatory API
                </Link>
              </nav>
            </div>
            <div className="text-[10px] sm:text-sm text-on-surface-variant opacity-60 text-center sm:text-right">
              © 2026 ORION Medicine Intelligence. All rights reserved.
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
