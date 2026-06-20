import { Router, Request, Response } from 'express';
import { BatchPayload, SignedQRPayload } from '../types';
import { signPayload } from '../crypto/ed25519';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const payload: BatchPayload = req.body;
        const privateKeyHex = process.env.MANUFACTURER_PRIVATE_KEY;
        const publicKeyHex = process.env.MANUFACTURER_PUBLIC_KEY;
        
        if (!privateKeyHex || !publicKeyHex) {
            return res.status(500).json({ error: "Missing Ed25519 keys in environment" });
        }
        
        const signature = await signPayload(payload, privateKeyHex);
        
        const signedPayload: SignedQRPayload = {
            data: payload,
            signature,
            public_key: publicKeyHex,
            issued_at: new Date().toISOString()
        };
        
        const qrData = Buffer.from(JSON.stringify(signedPayload)).toString('base64');
        
        res.json({
            payload: signedPayload,
            qr_data: qrData
        });
    } catch (err) {
        console.error("Generate error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
