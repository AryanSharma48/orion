import { Router, Request, Response } from 'express';
import { SignedQRPayload, VerificationResult, ScanEvent } from '../types';
import { verifySignature } from '../crypto/ed25519';
import crypto from 'crypto';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { qr_data, reporter_lat, reporter_lng } = req.body;
        
        if (!qr_data) {
            return res.status(400).json({ error: "Missing qr_data" });
        }
        
        const jsonStr = Buffer.from(qr_data, 'base64').toString('utf-8');
        const signedPayload: SignedQRPayload = JSON.parse(jsonStr);
        
        const isValid = await verifySignature(signedPayload.data, signedPayload.signature, signedPayload.public_key);
        
        let result: VerificationResult = {
            valid: false,
            batch_data: null,
            failure_reason: "SIGNATURE_INVALID — payload may have been tampered",
            verified_at: new Date().toISOString(),
            verification_method: "ED25519_OFFLINE"
        };
        
        if (isValid) {
            result.valid = true;
            result.batch_data = signedPayload.data;
            result.failure_reason = null;
            
            const expiryDate = new Date(signedPayload.data.expiry_date);
            const now = new Date();
            
            if (now > expiryDate) {
                result.expired = true;
                result.expired_since = signedPayload.data.expiry_date;
            }
        }
        
        // Fire and forget to anomaly engine
        if (reporter_lat && reporter_lng) {
            const scanEvent: ScanEvent = {
                scan_id: crypto.randomUUID(),
                batch_id: signedPayload.data?.batch_id || "UNKNOWN",
                manufacturer_id: signedPayload.data?.manufacturer_id || "UNKNOWN",
                lat: reporter_lat,
                lng: reporter_lng,
                timestamp: Math.floor(Date.now() / 1000),
                verdict: isValid ? "AUTHENTIC" : "COUNTERFEIT",
                final_risk_score: isValid ? 0.0 : 1.0
            };
            
            const anomalyPort = process.env.ANOMALY_PORT || 8001;
            fetch(`http://anomaly-engine:${anomalyPort}/ingest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scanEvent)
            }).catch(e => {
                // Ignore network errors to preserve offline capability
                console.log("Offline mode: Anomaly engine unreachable");
            });
        }
        
        res.json(result);
    } catch (err) {
        console.error("Verify error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
