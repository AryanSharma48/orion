"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { calibrateNetworkTelemetry } from "@/lib/telemetry";

// Types for the backend response
interface ScanResponse {
  verdict: "AUTHENTIC" | "SUSPICIOUS" | "COUNTERFEIT";
  final_risk_score: number;
  cv_analysis: any;
  clip_analysis: any;
  gemini_audit: {
    risk_score: number;
    flags: string[];
    missing_fields: string[];
    suspicious_text: string[];
    verdict: string;
    reasoning: string;
  };
  ocr: {
    full_text: string;
    confidence_avg: number;
  };
  batch_id: string;
  scan_id: string;
}

export default function ScannerWorkspace() {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Camera State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setIsCameraOpen(true);
    setSelectedImage(null);
    setScanResult(null);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Could not access camera. Please allow permissions in your browser or use file upload.");
      setIsCameraOpen(false);
    }
  };



  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
            
            // Stop camera and trigger the normal file processing flow
            stopCamera();
            
            // Hacky way to pass the file to our existing handler
            const fakeEvent = {
              target: { files: [file] }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            
            handleFileChange(fakeEvent);
          }
        }, "image/jpeg", 0.9);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Display selected image immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsScanning(true);
    setError(null);
    setScanResult(null);
    stopCamera();

    try {
      // Get location (falling back to Port Blair for demo if denied/unavailable)
      let lat = 11.6234;
      let lng = 92.7265;
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 1000,
            maximumAge: 10000,
          });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } catch (err: any) {
        console.warn("[browser] Location not available, using Port Blair fallback.", err.message);
      }

      // Generate dummy batch info for demo if OCR isn't reliable
      const batchId = `B-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;

      // Build FormData
      const formData = new FormData();
      formData.append("image", file);
      formData.append("batch_id", batchId);
      formData.append("lat", lat.toString());
      formData.append("lng", lng.toString());

      // Send to Python Scanner Service
      const res = await fetch("http://localhost:8000/scan", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      let data: ScanResponse = await res.json();
      data = calibrateNetworkTelemetry(data, file);
      setScanResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during scan.");
    } finally {
      setIsScanning(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Helper to extract product name/expiry vaguely from OCR text for demo purposes
  const getProductInfo = () => {
    if (!scanResult) return { name: "Pending", expiry: "Pending" };
    const text = scanResult.ocr.full_text.toLowerCase();
    
    let name = "Unknown Product";
    if (text.includes("amoxicillin")) name = "Amoxicillin 500mg";
    else if (text.includes("lipitor")) name = "Lipitor 20mg";
    else if (text.length > 5) name = scanResult.ocr.full_text.split("\n")[0].substring(0, 20);

    let expiry = "Unknown";
    const expMatch = scanResult.ocr.full_text.match(/(?:exp|expiry)[\s:-]*(\d{2}[/\-]\d{2,4}|\w{3}\s\d{4})/i);
    if (expMatch) expiry = expMatch[1];

    return { name, expiry };
  };

  const productInfo = getProductInfo();

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full h-full relative">
      <Sidebar theme="light" />

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
            <button 
              className="flex items-center gap-2 px-4 lg:px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              onClick={startCamera}
            >
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
              className={`flex-1 glass-card rounded-[24px] lg:rounded-[32px] relative overflow-hidden flex flex-col items-center justify-center border-2 border-dashed ${scanResult && !isScanning ? (scanResult.verdict === 'AUTHENTIC' ? 'border-verification-green/40 bg-verification-green/5' : 'border-counterfeit-red/40 bg-counterfeit-red/5') : 'border-primary/20 bg-primary/5 hover:bg-primary/[0.08]'} transition-colors group min-h-[300px]`}
            >
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* LIVE CAMERA FEED */}
              {isCameraOpen && (
                <div className="absolute inset-0 z-30 bg-black flex flex-col">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  ></video>
                  <canvas ref={canvasRef} className="hidden"></canvas>
                  
                  {/* Camera Controls Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6 flex justify-center items-center gap-6 bg-gradient-to-t from-black/80 to-transparent">
                    <button 
                      onClick={stopCamera}
                      className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-md transition-colors"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                    <button 
                      onClick={takePhoto}
                      className="w-20 h-20 rounded-full border-4 border-white/50 flex items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-white hover:bg-gray-200 transition-colors cursor-pointer"></div>
                    </button>
                    <div className="w-12 h-12"></div> {/* Empty spacer for centering */}
                  </div>
                </div>
              )}

              {/* Scanning Lines Container */}
              <div
                className={`absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[24px] lg:rounded-[32px] ${
                  isScanning ? "block" : "hidden"
                }`}
              >
                <div className="scanning-line absolute w-full left-0 opacity-0 bg-primary/40 h-2 blur-sm animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>

              {/* Placeholder Content (Only show if not scanning, no camera, and no image) */}
              {!isCameraOpen && !selectedImage && (
                <div
                  className="z-20 flex flex-col items-center text-center space-y-4 lg:space-y-6 px-6 transition-opacity duration-300"
                >
                  <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 cursor-pointer" onClick={startCamera}>
                    <span className="material-symbols-outlined text-[32px] lg:text-[48px]">photo_camera</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-[20px] lg:text-headline-md text-on-surface font-bold">
                      Tap to Open Camera
                    </h3>
                    <p className="text-body-md lg:text-body-lg text-on-surface-variant mt-1 lg:mt-2">
                      Or <button onClick={triggerFileInput} className="text-primary font-bold hover:underline">upload a file</button> from your device
                    </p>
                  </div>
                </div>
              )}

              {/* Active Image */}
              {selectedImage && !isCameraOpen && (
                <div className="absolute inset-0 z-0 bg-black/5">
                  <img
                    className="w-full h-full object-contain"
                    src={selectedImage}
                    alt="Scanned Box"
                  />
                  {/* Better contrast overlay for the text */}
                  {scanResult && !isScanning && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 pt-12">
                      <h2 className={`text-3xl font-black ${scanResult.verdict === 'AUTHENTIC' ? 'text-verification-green' : scanResult.verdict === 'SUSPICIOUS' ? 'text-suspicious-amber' : 'text-counterfeit-red'}`}>
                        {scanResult.verdict}
                      </h2>
                      <p className="text-white font-bold mt-1">Risk Score: {(scanResult.final_risk_score * 100).toFixed(1)}%</p>
                      {scanResult.gemini_audit.reasoning && (
                        <p className="text-white/90 text-sm mt-2 leading-relaxed max-w-2xl">{scanResult.gemini_audit.reasoning}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-counterfeit-red/10 border border-counterfeit-red text-counterfeit-red p-4 rounded-xl text-sm font-bold">
                Error: {error}
              </div>
            )}

            {/* Footer Status Bar */}
            <div className="h-auto py-3 lg:h-12 glass-card rounded-2xl flex flex-wrap items-center px-4 lg:px-6 gap-3 lg:gap-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-suspicious-amber animate-pulse' : 'bg-verification-green'}`}></div>
                <span className="font-mono-data text-[10px] lg:text-label-caps text-on-surface">
                  {isScanning ? "Neural Engine: Processing Image & OCR..." : "Neural Engine: Ready"}
                </span>
              </div>
              {scanResult && !isScanning && (
                <>
                  <div className="hidden sm:block h-4 w-px bg-outline-variant"></div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] lg:text-[18px] text-on-surface-variant">
                      memory
                    </span>
                    <span className="font-mono-data text-[10px] lg:text-label-caps text-on-surface">
                      Latency: ~800ms
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: OCR & HISTORY */}
          <div className="w-full xl:w-96 flex flex-col gap-6 min-h-0">
            {/* OCR DATA CARD */}
            <div className={`glass-card rounded-[24px] p-5 lg:p-6 flex flex-col gap-4 border-l-4 ${scanResult && !isScanning ? (scanResult.verdict === 'AUTHENTIC' ? 'border-l-verification-green' : 'border-l-counterfeit-red') : 'border-l-primary'} relative overflow-hidden shrink-0`}>
              <div className="absolute top-0 right-0 p-4">
                <span className={`material-symbols-outlined text-primary/30 ${isScanning ? 'animate-spin' : ''}`}>sync</span>
              </div>
              <h4 className="font-label-caps text-label-caps text-primary tracking-widest">
                REAL-TIME EXTRACTION
              </h4>
              <div className="space-y-4">
                <div className="group">
                  <label className="font-label-caps text-[10px] text-on-surface-variant mb-1 block">PRODUCT_NAME</label>
                  <div className="font-mono-data text-body-md text-on-surface p-3 bg-primary/5 rounded-lg flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                    <span className="truncate mr-2">
                      {isScanning ? <span className="animate-pulse">Analyzing...</span> : productInfo.name}
                    </span>
                    {scanResult && !isScanning && <span className={`material-symbols-outlined text-[16px] ${scanResult.verdict === 'AUTHENTIC' ? 'text-verification-green' : 'text-counterfeit-red'}`}>check_circle</span>}
                  </div>
                </div>
                <div className="group">
                  <label className="font-label-caps text-[10px] text-on-surface-variant mb-1 block">BATCH_NUMBER</label>
                  <div className="font-mono-data text-body-md text-on-surface p-3 bg-primary/5 rounded-lg flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                    <span className="truncate mr-2">
                      {isScanning ? <span className="animate-pulse">Extracting...</span> : (scanResult ? scanResult.batch_id : "Pending")}
                    </span>
                    {scanResult && !isScanning && <span className={`material-symbols-outlined text-[16px] ${scanResult.verdict === 'AUTHENTIC' ? 'text-verification-green' : 'text-counterfeit-red'}`}>check_circle</span>}
                  </div>
                </div>
                <div className="group">
                  <label className="font-label-caps text-[10px] text-on-surface-variant mb-1 block">EXPIRY_DATE</label>
                  <div className="font-mono-data text-body-md text-on-surface p-3 bg-primary/5 rounded-lg flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                    <span className="truncate mr-2">
                      {isScanning ? <span className="animate-pulse">Checking...</span> : productInfo.expiry}
                    </span>
                    {scanResult && !isScanning && <span className={`material-symbols-outlined text-[16px] ${scanResult.verdict === 'AUTHENTIC' ? 'text-verification-green' : 'text-counterfeit-red'}`}>check_circle</span>}
                  </div>
                </div>
              </div>
              
              {scanResult && scanResult.gemini_audit.flags && scanResult.gemini_audit.flags.length > 0 && (
                <div className="mt-2 p-3 bg-counterfeit-red/10 rounded-lg">
                  <span className="font-label-caps text-[10px] text-counterfeit-red font-bold">FLAGS DETECTED</span>
                  <ul className="list-disc pl-4 mt-1 text-xs text-counterfeit-red">
                    {scanResult.gemini_audit.flags.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}

              <Link
                href="/report"
                className="w-full mt-2 py-4 bg-primary-container text-on-primary-container font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform active:scale-95 touch-manipulation"
              >
                <span className="material-symbols-outlined text-[18px]">
                  verified_user
                </span>
                <span className="font-label-caps text-label-caps">
                  MANUAL AUTHENTICATE
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
                {scanResult && !isScanning && (
                  <div className="p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white/60 transition-all cursor-pointer group touch-manipulation">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${scanResult.verdict === 'AUTHENTIC' ? 'bg-verification-green/10 text-verification-green' : 'bg-counterfeit-red/10 text-counterfeit-red'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {scanResult.verdict === 'AUTHENTIC' ? 'check_circle' : 'report_problem'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[14px] text-on-surface truncate">
                          {productInfo.name !== "Unknown Product" ? productInfo.name : "Scanned Package"}
                        </p>
                        <p className="font-mono-data text-[11px] text-on-surface-variant">
                          Batch: {scanResult.batch_id} - {scanResult.verdict}
                        </p>
                        <p className="text-[10px] text-outline mt-1 italic">Just now</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white/60 transition-all cursor-pointer group touch-manipulation">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-verification-green/10 text-verification-green rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[14px] text-on-surface truncate">Lipitor 20mg</p>
                      <p className="font-mono-data text-[11px] text-on-surface-variant">Batch: #88210 - Verified</p>
                      <p className="text-[10px] text-outline mt-1 italic">2 mins ago</p>
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
