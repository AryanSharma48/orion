"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] z-50 mt-4 h-16 md:h-20 flex justify-between items-center px-4 md:px-edge-margin-desktop bg-surface/80 backdrop-blur-xl rounded-full border border-white/20 max-w-[1440px] transition-all duration-300 ${
          scrolled ? "py-2 md:py-3 shadow-lg" : "py-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-2xl md:text-headline-md"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shield_with_heart
          </span>
          <span className="font-headline-md text-xl md:text-headline-md font-bold text-on-surface">
            ORION
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/scanner"
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            Platform
          </Link>
          <Link
            href="/scanner"
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            Live Scan
          </Link>
          <Link
            href="/map"
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            Intelligence
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:block font-label-caps text-label-caps text-on-surface-variant px-4 py-2 hover:bg-surface-variant rounded-full transition-all">
            Sign in
          </button>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-4 md:px-6 py-2 md:py-3 rounded-full font-label-caps text-[10px] md:text-label-caps hover:scale-105 transition-transform active:scale-95">
            <span className="hidden sm:inline">Scan Medicine</span>
            <span className="sm:hidden">Scan</span>
            <span className="material-symbols-outlined text-[16px] md:text-[18px]">
              arrow_forward
            </span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute top-24 left-0 w-full bg-surface/95 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl flex-col gap-6 md:hidden z-40 transition-all duration-300 ${
          mobileMenuOpen
            ? "flex opacity-100 translate-y-0"
            : "hidden opacity-0 -translate-y-5"
        }`}
      >

        <Link href="/scanner" className="font-headline-md text-2xl text-on-surface">
          Platform
        </Link>
        <Link href="/scanner" className="font-headline-md text-2xl text-on-surface">
          Live Scan
        </Link>
        <Link href="/map" className="font-headline-md text-2xl text-on-surface">
          Intelligence
        </Link>
        <hr className="border-outline-variant" />
        <div className="flex items-center justify-between">
          <button className="font-label-caps text-label-caps text-on-surface-variant">
            Sign in
          </button>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary">public</span>
            <span className="material-symbols-outlined text-primary">verified</span>
          </div>
        </div>
      </div>
    </>
  );
}
