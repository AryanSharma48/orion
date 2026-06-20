import redis from '../redis/client';
import { ScanEvent, AnomalyFlag } from '../types';
import crypto from 'crypto';

const VELOCITY_WINDOW_SECONDS = parseInt(process.env.VELOCITY_WINDOW_SECONDS || '600');
const VELOCITY_DISTANCE_KM = parseFloat(process.env.VELOCITY_DISTANCE_KM || '500');

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export async function checkVelocity(event: ScanEvent): Promise<AnomalyFlag | null> {
    const key = `velocity:${event.batch_id}`;
    const member = `${event.lat}:${event.lng}:${event.scan_id}`;
    
    // Add current
    await redis.zadd(key, event.timestamp, member);
    await redis.expire(key, VELOCITY_WINDOW_SECONDS);
    
    // Check window
    const minTime = event.timestamp - VELOCITY_WINDOW_SECONDS;
    const scans = await redis.zrangebyscore(key, minTime, event.timestamp);
    
    for (const scan of scans) {
        if (scan === member) continue;
        const [latStr, lngStr, scanId] = scan.split(':');
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);
        
        const dist = haversineKm(event.lat, event.lng, lat, lng);
        if (dist > VELOCITY_DISTANCE_KM) {
            return {
                flag_id: crypto.randomUUID(),
                type: "VELOCITY",
                severity: "CRITICAL",
                batch_id: event.batch_id,
                region: { lat: event.lat, lng: event.lng },
                description: `Batch ${event.batch_id} scanned ${Math.round(dist)}km apart within ${VELOCITY_WINDOW_SECONDS / 60} minutes — physical impossibility. Conflict with scan ${scanId}.`,
                timestamp: event.timestamp
            };
        }
    }
    
    return null;
}
