import { Router, Request, Response } from 'express';
import redis from '../redis/client';
import { AnomalyFlag } from '../types';

const router = Router();

const SEVERITY_WEIGHTS = {
    "LOW": 0.25,
    "MEDIUM": 0.5,
    "HIGH": 0.75,
    "CRITICAL": 1.0
};

router.get('/', async (req: Request, res: Response) => {
    try {
        const keys = await redis.keys('flags:region:*');
        const features = [];
        let total_flags = 0;
        
        for (const key of keys) {
            const parts = key.split(':');
            const latGrid = parseInt(parts[2]);
            const lngGrid = parseInt(parts[3]);
            
            const rawFlags = await redis.lrange(key, 0, -1);
            const flags: AnomalyFlag[] = rawFlags.map(f => JSON.parse(f));
            
            let severitySum = 0;
            for (const flag of flags) {
                // @ts-ignore
                severitySum += SEVERITY_WEIGHTS[flag.severity] || 0.5;
            }
            
            const intensity = Math.min(1.0, severitySum / 10.0); // normalize somewhat
            
            // Get scan count for this cell for today
            const today = new Date().toISOString().split('T')[0];
            const countStr = await redis.get(`volume:${latGrid}:${lngGrid}:${today}`);
            const scanCount = parseInt(countStr || '0');
            
            features.push({
                type: "Feature",
                geometry: { type: "Point", coordinates: [lngGrid + 0.5, latGrid + 0.5] },
                properties: {
                    intensity: intensity,
                    scan_count: scanCount,
                    flags: flags
                }
            });
            total_flags += flags.length;
        }
        
        res.json({
            type: "FeatureCollection",
            features,
            generated_at: new Date().toISOString(),
            total_flags
        });
    } catch (err) {
        console.error("Riskmap error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/recent', async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string || '20');
    try {
        const rawFlags = await redis.zrevrange('flags:all', 0, limit - 1);
        const flags = rawFlags.map(f => JSON.parse(f));
        res.json(flags);
    } catch (err) {
        console.error("Recent flags error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
