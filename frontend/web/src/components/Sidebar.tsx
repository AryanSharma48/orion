"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const isDark = theme === "dark";

  const asideBg = isDark ? "bg-[#0F172A] border-white/5" : "bg-white border-outline-variant";
  const titleText = isDark ? "text-primary-fixed-dim" : "text-primary";
  const subText = isDark ? "text-white/70" : "text-on-surface-variant";
  const closeBtn = isDark ? "text-white/60" : "text-on-surface-variant";
  const linkDefaultText = isDark ? "text-white/60" : "text-on-surface-variant";
  const linkHover = isDark ? "hover:bg-white/5 hover:text-white" : "hover:bg-surface-container hover:text-on-surface";
  const activeBg = isDark ? "bg-primary-container text-white" : "bg-primary text-on-primary";
  const iconActive = isDark ? "text-primary-fixed-dim" : "text-on-primary";
  const bottomLinkHover = isDark ? "hover:text-white" : "hover:text-on-surface";
  const toggleBtnBg = isDark ? "bg-surface-container-high text-white" : "bg-primary text-on-primary shadow-lg";

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    if (isActive) {
      return `flex items-center gap-3 px-4 py-3 rounded-xl font-bold translate-x-1 transition-transform ${activeBg}`;
    }
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${linkDefaultText} ${linkHover}`;
  };

  const getIconClass = (path: string) => {
    const isActive = pathname === path;
    return isActive ? iconActive : "";
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg cursor-pointer ${toggleBtnBg}`}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* SideNavBar */}
      <aside
        className={`${asideBg} border-r flex flex-col h-full min-h-screen py-8 px-4 w-64 shadow-2xl shrink-0 z-50 fixed inset-y-0 left-0 transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-12 px-2 flex justify-between items-center mt-12 lg:mt-0">
          <div>
            <Link href="/" className="block hover:opacity-80 transition-opacity">
              <h1 className={`font-headline-md text-[24px] font-black leading-none ${titleText}`}>
                ORION Intel
              </h1>
            </Link>
            <p className={`font-label-caps text-[10px] mt-2 opacity-60 uppercase tracking-widest ${subText}`}>
              Verified Status: Active
            </p>
          </div>
          <button
            className={`lg:hidden ${closeBtn}`}
            onClick={() => setMobileNavOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/scanner" className={getLinkClass("/scanner")}>
            <span className={`material-symbols-outlined ${getIconClass("/scanner")}`}>dashboard</span>
            <span className="font-label-caps text-label-caps">Dashboard</span>
          </Link>
          <Link href="/map" className={getLinkClass("/map")}>
            <span
              className={`material-symbols-outlined ${getIconClass("/map")}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              public
            </span>
            <span className="font-label-caps text-label-caps">Risk Intelligence</span>
          </Link>

          <Link href="/assistant" className={getLinkClass("/assistant")}>
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="font-label-caps text-label-caps">Safety Assistant</span>
          </Link>
          <Link href="/offline" className={getLinkClass("/offline")}>
            <span className="material-symbols-outlined">qr_code_scanner</span>
            <span className="font-label-caps text-label-caps">Offline Verifier</span>
          </Link>
        </nav>

        <div className="mt-auto space-y-4">
          <div className={`pt-4 border-t ${isDark ? "border-white/5" : "border-outline-variant"}`}>
            <Link
              href="#"
              className={`flex items-center gap-3 px-4 py-2 transition-colors ${linkDefaultText} ${bottomLinkHover}`}
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-caps text-label-caps">Settings</span>
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 px-4 py-2 transition-colors ${linkDefaultText} ${bottomLinkHover}`}
            >
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-caps text-label-caps">Support</span>
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
    </>
  );
}
