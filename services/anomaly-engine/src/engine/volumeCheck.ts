import redis from '../redis/client';
import { ScanEvent, AnomalyFlag } from '../types';
import crypto from 'crypto';

const VOLUME_SPIKE_MULTIPLIER = parseFloat(process.env.VOLUME_SPIKE_MULTIPLIER || '5');

export async function checkVolume(event: ScanEvent): Promise<AnomalyFlag | null> {
    const latGrid = Math.floor(event.lat);
    const lngGrid = Math.floor(event.lng);
    const cell = `${latGrid}:${lngGrid}`;
    
    const today = new Date(event.timestamp * 1000).toISOString().split('T')[0];
    const todayKey = `volume:${cell}:${today}`;
    
    await redis.incr(todayKey);
    await redis.expire(todayKey, 86400 * 14); // keep 14 days
    
    const todayCountStr = await redis.get(todayKey);
    const todayCount = parseInt(todayCountStr || '1');
    
    let sum = 0;
    for (let i = 1; i <= 7; i++) {
        const d = new Date((event.timestamp - i * 86400) * 1000).toISOString().split('T')[0];
        const val = await redis.get(`volume:${cell}:${d}`);
        sum += parseInt(val || '0');
    }
    
    const avg = sum / 7.0;
    
    // Only flag if baseline is somewhat established (> 5)
    if (avg > 5 && todayCount > VOLUME_SPIKE_MULTIPLIER * avg) {
        const ratio = todayCount / avg;
        let severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "HIGH";
        if (ratio >= 10) severity = "CRITICAL";
        
        return {
            flag_id: crypto.randomUUID(),
            type: "VOLUME",
            severity: severity,
            batch_id: event.batch_id,
            region: { lat: event.lat, lng: event.lng },
            description: `Scan volume spike detected in region. Today: ${todayCount}, 7-day Avg: ${avg.toFixed(1)}.`,
            timestamp: event.timestamp
        };
    }
    
    return null;
}
