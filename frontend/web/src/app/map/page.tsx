"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Map, Marker, Overlay } from "pigeon-maps";
import Sidebar from "@/components/Sidebar";

// Types for Riskmap API response
interface AnomalyFlag {
  id: string;
  type: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  timestamp: string;
  metadata?: any;
}

interface GeoJsonFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    intensity: number;
    scan_count: number;
    flags: AnomalyFlag[];
  };
}

interface RiskmapResponse {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
  generated_at: string;
  total_flags: number;
}

export default function MapWorkspace() {
  const [alertsOpen, setAlertsOpen] = useState(false);
  
  // Real map state
  const [geoData, setGeoData] = useState<RiskmapResponse | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<GeoJsonFeature | null>(null);
  const [center, setCenter] = useState<[number, number]>([20.5937, 78.9629]); // India
  const [zoom, setZoom] = useState(4);

  const [scanCount, setScanCount] = useState(142892);

  useEffect(() => {
    // Fake global count ticking
    const countInterval = setInterval(() => {
      setScanCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);

    // Fetch real live backend data
    const fetchRiskmap = async () => {
      try {
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
                           (typeof window !== "undefined" && window.location.hostname.includes("vercel.app"));
        if (isDemoMode) {
          // Mock data for Vercel demo
          const mockData: RiskmapResponse = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [77.209, 28.6139] },
                properties: {
                  intensity: 0.9,
                  scan_count: Math.floor(Math.random() * 50) + 10,
                  flags: [{ id: "1", type: "COUNTERFEIT", description: "Counterfeit Anti-Grinch detected", severity: "CRITICAL", timestamp: new Date().toISOString() }]
                }
              },
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [72.8777, 19.076] },
                properties: {
                  intensity: 0.6,
                  scan_count: Math.floor(Math.random() * 30) + 5,
                  flags: [{ id: "2", type: "SUSPICIOUS", description: "Suspicious metadata", severity: "MEDIUM", timestamp: new Date().toISOString() }]
                }
              }
            ],
            generated_at: new Date().toISOString(),
            total_flags: 2
          };
          setGeoData(mockData);
        } else {
          // Real backend data
          const res = await fetch("http://localhost:8001/riskmap");
          if (res.ok) {
            const data: RiskmapResponse = await res.json();
            setGeoData(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch riskmap:", err);
      }
    };

    fetchRiskmap();
    const mapInterval = setInterval(fetchRiskmap, 5000);

    return () => {
      clearInterval(countInterval);
      clearInterval(mapInterval);
    };
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
        
        .map-theme .glass-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .dark-map-container > div {
          background-color: #0F172A !important;
        }
      `}</style>
      <div className="map-theme bg-background text-on-background font-body-md overflow-hidden flex h-screen w-full relative">
        <Sidebar theme="dark" />

        {/* Main Map Interface */}
        <main className="relative flex-1 bg-deep-obsidian overflow-hidden">
          {/* Live Pigeon Map Background */}
          <div className="absolute inset-0 z-0 bg-[#0F172A]">
            <div className="w-full h-full opacity-90 dark-map-container">
              <Map 
                provider={(x, y, z) => {
                  const limit = Math.pow(2, z);
                  const wrapX = ((x % limit) + limit) % limit;
                  if (y < 0 || y >= limit) return ""; // Stop vertical tile loading out of bounds
                  return `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/${z}/${wrapX}/${y}.png`;
                }}
                defaultCenter={center} 
                defaultZoom={zoom}
                minZoom={2}
                onBoundsChanged={({ center: newCenter, zoom: newZoom }) => { 
                  let [lat, lng] = newCenter;
                  
                  // Dynamic vertical clamping based on zoom level
                  // This prevents pulling the world off-screen exposing the background
                  let maxLat = 85;
                  if (newZoom <= 2) maxLat = 10;      // Lock mostly to equator when fully zoomed out
                  else if (newZoom === 3) maxLat = 55; // Restrict poles at medium zoom
                  else maxLat = 80;                    // Normal freedom at deep zoom
                  
                  if (lat > maxLat) lat = maxLat;
                  if (lat < -maxLat) lat = -maxLat;
                  
                  setCenter([lat, lng]); 
                  setZoom(newZoom); 
                }}
              >
                {geoData?.features.flatMap((feature, i) => {
                  const [lng, lat] = feature.geometry.coordinates;
                  const intensity = feature.properties.intensity;
                  const isHighRisk = intensity >= 0.75;
                  
                  // Render each marker across 3 horizontal 'worlds' so they loop laterally seamlessly
                  return [-360, 0, 360].map((offset) => (
                    <Overlay 
                      key={`${i}-${offset}`} 
                      anchor={[lat, lng + offset]} 
                      offset={[16, 16]}
                    >
                      <div 
                        onClick={() => setSelectedFeature(feature)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-125 cursor-pointer ${isHighRisk ? 'bg-counterfeit-red/90 animate-pulse' : 'bg-suspicious-amber/90'}`}
                      >
                        <span className="text-white font-bold text-xs">{feature.properties.flags.length}</span>
                      </div>
                    </Overlay>
                  ));
                })}

                {/* Selected Feature Overlay (Popup) */}
                {selectedFeature && (
                  <Overlay anchor={[selectedFeature.geometry.coordinates[1], selectedFeature.geometry.coordinates[0]]} offset={[150, 200]}>
                    <div className="w-72 bg-surface-container-high/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white">Grid Block [ {selectedFeature.geometry.coordinates[1]}, {selectedFeature.geometry.coordinates[0]} ]</h3>
                        <button onClick={() => setSelectedFeature(null)} className="text-white/50 hover:text-counterfeit-red">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="flex-1 bg-counterfeit-red/10 border border-counterfeit-red/30 p-2 rounded-lg text-center">
                          <p className="text-[10px] text-counterfeit-red font-bold">FLAGS</p>
                          <p className="text-xl font-black text-counterfeit-red">{selectedFeature.properties.flags.length}</p>
                        </div>
                        <div className="flex-1 bg-primary/10 border border-primary/20 p-2 rounded-lg text-center">
                          <p className="text-[10px] text-primary font-bold">SCANS</p>
                          <p className="text-xl font-black text-primary">{selectedFeature.properties.scan_count}</p>
                        </div>
                      </div>

                      <div className="mt-2 max-h-40 overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                        {selectedFeature.properties.flags.map((flag, idx) => (
                          <div key={idx} className="bg-surface-variant p-2 rounded-md text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className={`font-bold ${flag.severity === 'CRITICAL' || flag.severity === 'HIGH' ? 'text-counterfeit-red' : 'text-suspicious-amber'}`}>
                                {flag.type}
                              </span>
                              <span className="text-[9px] text-white/40">
                                {new Date(flag.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-white/70 leading-tight">{flag.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Overlay>
                )}
              </Map>
            </div>
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
          </header>

          {/* Map Interactive Markers (Floating Intelligence) */}
          {/* Replaced by live markers on Pigeon Maps */}

          {/* Overlays removed per user request to provide a clean map view */}
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
        </main>
      </div>
    </>
  );
}
