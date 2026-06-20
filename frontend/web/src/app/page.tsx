import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-48 pb-16 md:pb-section-gap grid-bg hero-gradient min-h-screen flex items-center">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter items-center">
            <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-white/40 px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-verification-green"></span>
                <span className="font-label-caps text-[10px] md:text-[11px] tracking-widest text-on-surface-variant uppercase">
                  Trusted by pharmacists in 14 countries
                </span>
              </div>
              <h1 className="font-display-hero text-4xl md:text-display-hero text-deep-obsidian leading-[1.1] tracking-tight">
                Every medicine has a story. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  We verify it.
                </span>
              </h1>
              <p className="font-body-lg text-lg md:text-body-lg text-on-surface-variant max-w-lg mx-auto lg:mx-0">
                AI-powered counterfeit detection using packaging intelligence,
                cryptographic verification, and patient safety insights — all in
                seconds.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <button className="group flex items-center justify-center gap-3 bg-primary text-on-primary px-8 py-4 md:py-5 rounded-xl font-label-caps text-label-caps shadow-xl hover:shadow-teal-glow transition-all hover:-translate-y-1">
                  <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
                    qr_code_scanner
                  </span>
                  Scan Medicine
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-6 relative flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[500px] lg:max-w-none aspect-square lg:aspect-[4/3] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl group">
                <img
                  alt="Medicine verification visualization"
                  className="w-full h-full object-cover"
                  src="/assets/medicine_box.png"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full scanning-line"></div>
              </div>
              <div className="absolute -top-6 -left-4 md:-top-12 md:-left-8 glass-card p-4 md:p-6 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 animate-bounce-slow border border-white/40 backdrop-blur-2xl">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-verification-green/20 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-verification-green scale-75 md:scale-100"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <div>
                  <p className="font-label-caps text-[8px] md:text-[10px] text-on-surface-variant">
                    AUTHENTICITY
                  </p>
                  <p className="font-headline-md text-base md:text-[20px] font-bold text-on-surface">
                    Verified
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-4 glass-card p-4 md:p-6 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 border-l-4 border-primary backdrop-blur-2xl border-t border-r border-b border-white/40">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary scale-75 md:scale-100">
                    analytics
                  </span>
                </div>
                <div>
                  <p className="font-label-caps text-[8px] md:text-[10px] text-on-surface-variant">
                    OCR DATA
                  </p>
                  <p className="font-mono-data text-[12px] md:text-mono-data text-on-surface">
                    Batch Valid
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Layers Overview */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop text-center">
            <p className="font-label-caps text-primary tracking-widest mb-4 uppercase">
              THE PLATFORM
            </p>
            <h2 className="font-headline-lg text-4xl md:text-[64px] text-deep-obsidian mb-16 leading-tight">
              Four intelligence layers. <br className="hidden md:block" /> One verdict you can
              trust.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8 rounded-[32px] bg-surface-container-low border border-outline-variant hover:border-primary transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">package_2</span>
                </div>
                <h4 className="font-headline-md text-xl mb-3">Packaging</h4>
                <p className="text-on-surface-variant text-sm">
                  Computer vision analysis of holograms and ink.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-surface-container-low border border-outline-variant hover:border-primary transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h4 className="font-headline-md text-xl mb-3">Batch</h4>
                <p className="text-on-surface-variant text-sm">
                  Real-time supply chain anomaly detection.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-surface-container-low border border-outline-variant hover:border-primary transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">qr_code_2</span>
                </div>
                <h4 className="font-headline-md text-xl mb-3">Zero-Trust</h4>
                <p className="text-on-surface-variant text-sm">
                  Offline-first cryptographic verification.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-surface-container-low border border-outline-variant hover:border-primary transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">medical_services</span>
                </div>
                <h4 className="font-headline-md text-xl mb-3">Patient Safety</h4>
                <p className="text-on-surface-variant text-sm">
                  Conversational guidance &amp; interactions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 01 — Packaging Intelligence */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="font-label-caps text-primary tracking-widest mb-4 uppercase">
                  01 — PACKAGING INTELLIGENCE
                </p>
                <h2 className="font-headline-lg text-4xl text-deep-obsidian mb-6">
                  AI Packaging Authenticity Scanner
                </h2>
                <p className="text-on-surface-variant text-body-lg">
                  Computer vision trained on millions of authentic packages detects
                  holograms, font deviations, batch number anomalies, and regulatory
                  text inconsistencies the human eye can't catch.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Holograms
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Typography
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Batch numbers
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Color deviation
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Regulatory text
                </span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-[40px] overflow-hidden shadow-2xl border border-outline-variant aspect-[16/6] lg:aspect-auto relative group bg-deep-obsidian">
                <img
                  alt="AI Packaging Authenticity Scanner"
                  className="w-full h-full object-cover"
                  src="/assets/scanner_preview.png"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Batch Intelligence */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl border border-outline-variant aspect-[16/9] relative group">
                <img
                  alt="Global threat map"
                  className="w-full h-full object-cover grayscale opacity-20 bg-deep-obsidian"
                  src="/assets/threat_map.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-obsidian/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-counterfeit-red/20 rounded-full animate-ping"></div>
                    <div className="w-4 h-4 bg-counterfeit-red rounded-full"></div>
                  </div>
                  <div className="relative ml-24 mt-12">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-counterfeit-red/20 rounded-full animate-ping"></div>
                    <div className="w-4 h-4 bg-counterfeit-red rounded-full"></div>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 glass-card bg-deep-obsidian/60 border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-data text-xs text-secondary-fixed">
                      ANOMALY · BATCH #B7421-A
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-counterfeit-red font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-counterfeit-red"></span>{" "}
                      LIVE
                    </span>
                  </div>
                  <p className="font-headline-md text-xl text-white">
                    Detected in 3 cities within 8 minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="font-label-caps text-primary tracking-widest mb-4 uppercase">
                  02 — BATCH INTELLIGENCE
                </p>
                <h2 className="font-headline-lg text-4xl text-deep-obsidian mb-6">
                  Batch-Level Threat Intelligence
                </h2>
                <p className="text-on-surface-variant text-body-lg">
                  Real-time anomaly detection across the supply chain. When the
                  same batch surfaces simultaneously in Delhi, Mumbai, and Jaipur,
                  MedGuard flags the impossible — before it reaches patients.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Scan velocity
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Geo clustering
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Counterfeit hotspots
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Realtime alerts
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Zero-Trust Verification */}
        <section className="py-24 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="font-label-caps text-primary tracking-widest mb-4 uppercase">
                03 — ZERO-TRUST VERIFICATION
              </p>
              <h2 className="font-headline-lg text-4xl text-deep-obsidian mb-6">
                Offline Cryptographic Verification
              </h2>
              <p className="text-on-surface-variant text-body-lg mb-8">
                Every authentic package carries a signed cryptographic identity.
                Verify in remote villages with no internet — digital signatures
                and public-key cryptography work offline, instantly.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-surface-container text-xs font-semibold">
                  Public-key crypto
                </span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-xs font-semibold">
                  Offline-first
                </span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-xs font-semibold">
                  Zero-trust
                </span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-xs font-semibold">
                  Tamper-proof
                </span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-teal-glow blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-deep-obsidian rounded-[40px] p-12 flex flex-col items-center justify-center min-h-[450px] shadow-2xl">
                  <div className="absolute top-6 right-8 flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-white text-xs">
                      lock
                    </span>
                    <span className="text-[10px] text-white/60 font-mono-data">
                      ECDSA · 256-bit
                    </span>
                  </div>
                  <div className="relative w-48 h-48 border-2 border-primary/40 rounded-2xl p-4 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-9xl animate-pulse">
                      qr_code_2
                    </span>
                    <span
                      className="material-symbols-outlined absolute -top-8 -right-8 text-secondary-fixed animate-bounce-slow"
                      style={{ fontVariationSettings: "'wght' 200" }}
                    >
                      key
                    </span>
                    <span
                      className="material-symbols-outlined absolute bottom-0 -left-12 text-secondary-fixed/40 rotate-45"
                      style={{ fontVariationSettings: "'wght' 200" }}
                    >
                      key
                    </span>
                  </div>
                  <div className="mt-12 text-center">
                    <p className="text-white/40 font-mono-data text-xs uppercase tracking-[0.2em]">
                      Validated Offline
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — AI Patient Safety Companion */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[32px] p-8 shadow-xl border border-outline-variant max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-container">
                  <div>
                    <h4 className="font-headline-md text-base font-bold text-on-surface">
                      MedGuard Assistant
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-verification-green"></span>
                      <span className="text-[10px] text-on-surface-variant font-medium">
                        Verified · Azithromycin 500mg
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant">
                    translate
                  </span>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <div className="bg-primary text-on-primary px-5 py-3 rounded-2xl rounded-tr-none text-sm shadow-md">
                      What does this medicine do?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-surface-container-high text-on-surface px-5 py-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">
                      Azithromycin 500mg is an antibiotic. It treats bacterial
                      infections of the chest, throat, and skin. Take once daily
                      with water.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-on-primary px-5 py-3 rounded-2xl rounded-tr-none text-sm shadow-md">
                      Can I take this with paracetamol?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-surface-container-high text-on-surface px-5 py-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">
                      Yes — no known harmful interaction. Keep at least a 2-hour
                      gap if your stomach is sensitive.
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                  <button className="px-4 py-2 border border-outline-variant rounded-full text-xs hover:bg-surface-container transition-colors">
                    Side effects?
                  </button>
                  <button className="px-4 py-2 border border-outline-variant rounded-full text-xs hover:bg-surface-container transition-colors">
                    Missed dose?
                  </button>
                  <button className="px-4 py-2 border border-outline-variant rounded-full text-xs hover:bg-surface-container transition-colors">
                    Storage?
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="font-label-caps text-primary tracking-widest mb-4 uppercase">
                04 — PATIENT SAFETY
              </p>
              <h2 className="font-headline-lg text-4xl text-deep-obsidian mb-6">
                AI Patient Safety Companion
              </h2>
              <p className="text-on-surface-variant text-body-lg mb-8">
                After verification, MedGuard becomes a medical assistant.
                Plain-language explanations, dosage guidance, drug interactions,
                and missed-dose advice — in your regional language.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  12+ languages
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Drug interactions
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Dosage guidance
                </span>
                <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface-variant">
                  Storage advice
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Flow */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop">
            <div className="text-center mb-16">
              <p className="font-label-caps text-primary tracking-widest mb-4 uppercase">
                MOBILE
              </p>
              <h2 className="font-headline-lg text-4xl md:text-5xl text-deep-obsidian">
                Verification in every pocket.
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-4 overflow-x-auto pb-8 scrollbar-hide">
              {[
                { icon: "home", title: "Home", text: "Tap to home", color: "text-primary", bg: "bg-primary/5" },
                { icon: "qr_code_scanner", title: "Scan", text: "Tap to scan", color: "text-primary", bg: "bg-primary/5" },
                { icon: "check_circle", title: "Result", text: "Tap to result", color: "text-verification-green", bg: "bg-verification-green/5" },
                { icon: "smart_toy", title: "Assistant", text: "Tap to assistant", color: "text-primary", bg: "bg-primary/5" },
                { icon: "notifications_active", title: "Alerts", text: "Tap to alerts", color: "text-counterfeit-red", bg: "bg-counterfeit-red/5" },
              ].map((step, idx) => (
                <div key={idx} className="flex-1 min-w-[240px] bg-white border border-outline-variant rounded-[40px] p-10 flex flex-col items-center text-center group hover:border-primary transition-colors">
                  <div className={`w-16 h-16 rounded-3xl ${step.bg} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined ${step.color} text-3xl`}>
                      {step.icon}
                    </span>
                  </div>
                  <h5 className="font-headline-md text-xl mb-2">{step.title}</h5>
                  <p className="text-on-surface-variant text-sm">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Origin Journey Section */}
        <section className="py-20 md:py-section-gap bg-surface-container-lowest relative overflow-hidden md:pb-[200px]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <h2 className="font-headline-lg text-3xl md:text-headline-lg text-on-background mb-6">
                The Origin Journey
              </h2>
              <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant px-4">
                A seamless verification pipeline that connects physical medicine
                to global safety intelligence in real-time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              <div className="md:col-span-12 lg:col-span-4 bg-white p-8 md:p-card-padding rounded-[32px] border border-outline-variant shadow-sm flex flex-col justify-between group hover:border-primary transition-colors min-h-[300px] hover:shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-primary-fixed flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-[32px]">
                    photo_camera
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-2xl md:text-headline-md mb-4">
                    01. Scan
                  </h3>
                  <p className="text-on-surface-variant text-body-md">
                    Capture any medicine packaging with sub-millimeter precision
                    using our AI-enhanced camera interface.
                  </p>
                </div>
              </div>
              <div className="md:col-span-12 lg:col-span-8 relative bg-deep-obsidian rounded-[32px] overflow-hidden p-8 md:p-card-padding text-white flex flex-col justify-end min-h-[400px] hover:scale-[1.01] transition-transform duration-500">
                <div className="relative z-10 max-w-lg">
                  <h3 className="font-headline-md text-2xl md:text-headline-md mb-4 text-secondary-fixed">
                    02. Audit
                  </h3>
                  <p className="text-surface-variant text-base md:text-body-lg">
                    Our neural networks analyze holographic markers, ink
                    consistency, and structural geometry to detect micro-anomalies
                    invisible to the human eye.
                  </p>
                </div>
              </div>
              <div className="md:col-span-12 lg:col-span-7 bg-surface-container rounded-[32px] p-8 md:p-card-padding flex flex-col justify-between group hover:bg-teal-glow transition-all duration-500 min-h-[350px]">
                <div>
                  <span
                    className="material-symbols-outlined text-primary mb-8 text-[48px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  <h3 className="font-headline-md text-2xl md:text-headline-md mb-4">
                    03. Verify
                  </h3>
                  <p className="text-on-surface-variant text-base md:text-body-lg">
                    Cross-referencing batch numbers and cryptographic signatures
                    against the global pharmaceutical ledger for absolute certainty.
                  </p>
                </div>
                <div className="mt-8 flex gap-3 md:gap-4">
                  <div className="h-1 flex-1 bg-primary/40 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full"></div>
                  </div>
                  <div className="h-1 flex-1 bg-primary/40 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full"></div>
                  </div>
                  <div className="h-1 flex-1 bg-primary/40 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-12 lg:col-span-5 bg-white border border-outline-variant rounded-[32px] overflow-hidden relative min-h-[350px] hover:shadow-xl transition-shadow">
                <img
                  alt="Global supply chain tracking map"
                  className="w-full h-full object-cover"
                  src="/assets/threat_map.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 md:p-card-padding flex items-end">
                  <div>
                    <p className="text-white font-label-caps text-[12px] md:text-[14px] tracking-widest mb-1">
                      GLOBAL REACH
                    </p>
                    <p className="text-primary-fixed-dim font-bold text-lg">
                      1.2M VERIFICATIONS / MONTH
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Experience Section */}
        <section className="py-20 md:py-section-gap bg-surface-container-low relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="font-label-caps text-primary tracking-widest mb-4 uppercase">
                Live Experience
              </p>
              <h2 className="font-headline-lg text-3xl md:text-headline-lg text-on-background mb-6">
                See it in action.
              </h2>
              <p className="font-body-lg text-on-surface-variant">
                A real scan, decoded layer by layer.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[40px] overflow-hidden shadow-xl border border-outline-variant">
              <div className="lg:col-span-7 relative bg-deep-obsidian aspect-video flex items-center justify-center overflow-hidden">
                <img
                  alt="Live Scan Preview"
                  className="w-full h-full object-cover opacity-80"
                  src="/assets/medicine_box.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-obsidian/60 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full scanning-line"></div>
                <div className="absolute bottom-8 left-8 right-8 glass-card p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      qr_code_scanner
                    </span>
                    <span className="font-mono-data text-sm text-on-surface">
                      AZX-2026-B747
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      fullscreen
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      edit
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 space-y-8">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-on-surface-variant tracking-widest">
                    AI ANALYSIS
                  </span>
                  <span className="bg-verification-green/10 text-verification-green px-3 py-1 rounded-full text-[10px] font-bold">
                    COMPLETE
                  </span>
                </div>
                <div className="flex items-end gap-4">
                  <span className="text-6xl md:text-7xl font-bold text-verification-green">
                    96%
                  </span>
                  <div className="pb-2">
                    <p className="font-bold text-on-surface">Authenticity Score</p>
                    <p className="text-sm text-on-surface-variant">
                      Risk: Low • Confidence: High
                    </p>
                  </div>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-verification-green w-[96%]"></div>
                </div>
                <div className="space-y-4 pt-4">
                  <p className="font-label-caps text-on-surface-variant tracking-widest">
                    FINDINGS
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Packaging matches verified standard template",
                      "CDSCO regulatory text consistent",
                      "No typography or color anomalies",
                      "Holographic seal valid",
                    ].map((finding, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-on-surface">
                        <span className="material-symbols-outlined text-verification-green text-xl">
                          check_circle
                        </span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-deep-obsidian py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
          <div className="max-w-[1440px] mx-auto px-4 md:px-edge-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="text-center md:text-left">
              <p className="text-primary-fixed-dim font-headline-lg text-xl md:text-2xl mb-4 tracking-tight">
                Verify before you trust
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Ready to secure your supply chain?
              </h2>
              <p className="text-surface-variant">
                Join thousands of pharmacists worldwide using ORION.
              </p>
            </div>
            <button className="bg-primary text-on-primary px-10 py-4 rounded-xl font-label-caps text-label-caps hover:scale-105 transition-transform shadow-2xl">
              Start Your First Scan Today
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
