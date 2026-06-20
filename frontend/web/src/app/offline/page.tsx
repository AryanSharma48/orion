"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function OfflineVerifier() {
  const [qrData, setQrData] = useState<string>("");
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);

  const generatePayload = async () => {
    try {
      const res = await fetch("http://localhost:8002/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batch_id: "PB-2026-X-991",
          manufacturer_id: "MFG-PHARMA-01",
          product_name: "Metformin 500mg",
          dosage: "500mg",
          manufacture_date: "2025-01-01",
          expiry_date: "2027-01-01",
          authorized_region: "US-EAST",
          serial_number: "SN-" + Math.floor(Math.random() * 1000000)
        })
      });
      const data = await res.json();
      setQrData(data.qr_data);
      setResult(null);
      setIsTampered(false);
    } catch (e) {
      console.error(e);
    }
  };

  const applyTampering = (data: string) => {
    if (!data) return "";
    if (isTampered) {
      try {
        const decoded = atob(data);
        const parsed = JSON.parse(decoded);
        if (parsed.data && parsed.data.expiry_date) {
            parsed.data.expiry_date = "2099-12-31"; 
        }
        return btoa(JSON.stringify(parsed));
      } catch {
        return data.substring(0, data.length - 2) + "A="; 
      }
    }
    return data;
  };

  const verifyPayload = async (dataToVerify: string) => {
    if (!dataToVerify) return;
    setVerifying(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:8002/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_data: dataToVerify })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ valid: false, failure_reason: "Network Error" });
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    if (isScanning) {
      scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scanner.render(
        (decodedText) => {
          // Found a QR Code
          if (scanner) {
            scanner.clear().catch(console.error);
          }
          setIsScanning(false);
          setQrData(decodedText);
          verifyPayload(applyTampering(decodedText));
        },
        () => {
          // Ignore scanning errors (occurs every frame a QR isn't found)
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScanning, isTampered]); // isTampered added so tampering mode applies immediately if scanning

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-background">
      <Sidebar theme="light" />

      <main className="flex-1 flex flex-col relative w-full lg:w-[calc(100%-16rem)] overflow-y-auto">
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant/20 sticky top-0">
          <div className="flex flex-col ml-12 lg:ml-0">
            <h2 className="font-headline-md text-[20px] lg:text-headline-md font-bold text-primary truncate">
              Offline Zero-Trust Verifier
            </h2>
            <p className="font-label-caps text-[10px] lg:text-label-caps text-on-surface-variant uppercase tracking-[0.1em] lg:tracking-[0.15em]">
              ED25519 Asymmetric Cryptography
            </p>
          </div>
        </header>

        <div className="p-4 lg:p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="glass-card rounded-[20px] p-6 border border-primary/20 bg-surface-container-lowest h-full flex flex-col">
            <h3 className="font-headline-sm text-primary mb-4 font-bold">1. Manufacturer Node (Generation)</h3>
            <p className="text-on-surface-variant mb-6 text-sm">
              In the real world, the manufacturer signs the batch metadata using their private key and compresses it into a high-density QR code before shipping.
            </p>
            <button 
              onClick={generatePayload}
              className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-primary-container hover:text-white transition-all flex items-center gap-2 text-sm w-fit"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              Generate Secure QR Payload
            </button>

            {qrData && (
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/30 flex-shrink-0">
                  <QRCodeSVG value={applyTampering(qrData)} size={140} />
                </div>
                <div className="flex-1 w-full p-3 bg-black/5 rounded-xl border border-outline-variant/30 break-all font-mono-data text-[10px] text-on-surface-variant overflow-y-auto max-h-[140px]">
                  {applyTampering(qrData)}
                </div>
              </div>
            )}
          </div>

          <div className="glass-card rounded-[20px] p-6 border border-primary/20 bg-surface-container-lowest relative overflow-hidden h-full flex flex-col">
            <h3 className="font-headline-sm text-primary mb-4 font-bold">2. Field Verification Node</h3>
            <p className="text-on-surface-variant mb-6 text-sm">
              The mobile app holds the manufacturer&apos;s public key. It mathematically verifies the signature against the payload offline.
            </p>

            <div className="flex flex-col xl:flex-row items-center gap-4 mb-4">
              <button 
                onClick={() => setIsScanning(!isScanning)}
                className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm ${
                  isScanning ? 'bg-counterfeit-red text-white' : 'bg-primary text-on-primary hover:bg-primary/90'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isScanning ? 'close' : 'document_scanner'}
                </span>
                {isScanning ? 'Close Scanner' : 'Open Live Camera'}
              </button>

              <button 
                onClick={() => verifyPayload(applyTampering(qrData))}
                disabled={!qrData || verifying || isScanning}
                className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm ${
                  (!qrData || isScanning) ? 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed' : 
                  'bg-verification-green text-white hover:bg-verification-green/90'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {verifying ? 'sync' : 'verified_user'}
                </span>
                {verifying ? 'Verifying...' : 'Verify Displayed QR'}
              </button>
            </div>

            <div className="flex items-center gap-3 bg-surface p-3 rounded-xl border border-outline-variant/30 w-fit mb-4">
              <label className="text-sm font-bold text-on-surface-variant">Simulate Tampering</label>
              <button 
                onClick={() => setIsTampered(!isTampered)}
                className={`relative w-14 h-8 rounded-full transition-colors ${isTampered ? 'bg-counterfeit-red' : 'bg-surface-container-highest'}`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${isTampered ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            {isScanning && (
              <div className="mb-4 rounded-xl overflow-hidden border border-primary/30 w-full max-w-sm mx-auto">
                <div id="qr-reader" className="w-full"></div>
              </div>
            )}

            {isTampered && !isScanning && (
              <div className="mb-4 p-3 bg-counterfeit-red/10 border border-counterfeit-red/20 rounded-xl flex items-start gap-2 text-counterfeit-red text-xs">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <p><strong>Tamper Mode:</strong> Expiry date altered to &quot;2099-12-31&quot;.</p>
              </div>
            )}

            {result && !isScanning && (
              <div className={`mt-auto p-4 rounded-2xl border-2 flex flex-col transition-all ${
                result.valid 
                  ? 'bg-verification-green/10 border-verification-green/40' 
                  : 'bg-counterfeit-red/10 border-counterfeit-red/40'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`material-symbols-outlined text-[24px] ${
                    result.valid ? 'text-verification-green' : 'text-counterfeit-red'
                  }`}>
                    {result.valid ? 'check_circle' : 'gpp_bad'}
                  </span>
                  <h2 className={`font-headline-sm text-sm font-black tracking-widest uppercase ${
                    result.valid ? 'text-verification-green' : 'text-counterfeit-red'
                  }`}>
                    {result.valid ? 'VERIFIED AUTHENTIC' : 'SIGNATURE MISMATCH'}
                  </h2>
                </div>
                <p className="text-on-surface-variant text-[11px] mb-3 leading-tight">
                  {result.valid 
                    ? "The ED25519 signature perfectly matches the payload data."
                    : `Cryptographic verification failed: ${result.failure_reason}.`}
                </p>

                {result.batch_data && (
                  <div className="w-full text-left bg-white rounded-xl p-3 border border-outline-variant/30 text-[10px] grid grid-cols-2 gap-2">
                    <div><span className="opacity-60 text-[8px] uppercase block">Product</span><span className="font-bold truncate">{result.batch_data.product_name}</span></div>
                    <div><span className="opacity-60 text-[8px] uppercase block">Batch</span><span className="font-bold truncate">{result.batch_data.batch_id}</span></div>
                    <div><span className="opacity-60 text-[8px] uppercase block">Expiry</span><span className="font-bold text-counterfeit-red truncate">{result.batch_data.expiry_date}</span></div>
                    <div><span className="opacity-60 text-[8px] uppercase block">Method</span><span className="font-bold font-mono-data truncate">{result.verification_method}</span></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
