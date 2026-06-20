import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-deep-obsidian border-t border-white/10 text-white mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary-fixed-dim text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_with_heart
              </span>
              <span className="font-headline-md text-2xl font-bold">ORION</span>
            </div>
            <p className="text-surface-variant text-sm leading-relaxed">
              Pioneering the future of medicine intelligence. Secure, transparent, and
              life-saving technology for the global healthcare ecosystem.
            </p>
          </div>
          <div className="space-y-6">
            <p className="font-label-caps text-sm font-bold tracking-widest text-primary-fixed-dim">
              PRODUCT
            </p>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="#"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="#"
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="/scanner"
                >
                  Live Scan
                </Link>
              </li>
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="/map"
                >
                  Intelligence
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <p className="font-label-caps text-sm font-bold tracking-widest text-primary-fixed-dim">
              RESOURCES
            </p>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="#"
                >
                  Manufacturer Portal
                </Link>
              </li>
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="#"
                >
                  Regulatory API
                </Link>
              </li>
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="#"
                >
                  Global Stats
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <p className="font-label-caps text-sm font-bold tracking-widest text-primary-fixed-dim">
              LEGAL
            </p>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="#"
                >
                  Trust &amp; Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="#"
                >
                  Compliance
                </Link>
              </li>
              <li>
                <Link
                  className="text-surface-variant hover:text-white transition-colors text-sm"
                  href="#"
                >
                  Ethics
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-surface-variant font-label-caps text-[11px]">
              © 2026 ORION Medicine Intelligence. All rights reserved.
            </p>
            <span className="flex items-center gap-2 text-verification-green font-label-caps text-[11px]">
              <span className="w-2 h-2 rounded-full bg-verification-green animate-pulse"></span>
              SYSTEMS OPERATIONAL
            </span>
          </div>
          <div className="flex gap-4">
            <Link
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                alternate_email
              </span>
            </Link>
            <Link
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
