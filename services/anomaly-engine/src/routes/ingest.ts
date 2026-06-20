import { Router, Request, Response } from 'express';
import { ScanEvent, AnomalyFlag } from '../types';
import { checkVelocity } from '../engine/velocityCheck';
import { checkVolume } from '../engine/volumeCheck';
import { checkDispatch } from '../engine/dispatchCheck';
import redis from '../redis/client';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const event: ScanEvent = req.body;
    
    try {
        const [velocityFlag, volumeFlag, dispatchFlag] = await Promise.all([
            checkVelocity(event),
            checkVolume(event),
            checkDispatch(event)
        ]);
        
        const flags = [velocityFlag, volumeFlag, dispatchFlag].filter(f => f !== null) as AnomalyFlag[];
        
        for (const flag of flags) {
            await redis.zadd('flags:all', flag.timestamp, JSON.stringify(flag));
            const latGrid = Math.floor(flag.region.lat);
            const lngGrid = Math.floor(flag.region.lng);
            const cell = `${latGrid}:${lngGrid}`;
            await redis.lpush(`flags:region:${cell}`, JSON.stringify(flag));
        }
        
        res.json({
            received: true,
            flags_generated: flags.length,
            flags
        });
    } catch (err) {
        console.error("Ingest error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
