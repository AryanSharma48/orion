import redis from '../redis/client';
import { ScanEvent, AnomalyFlag } from '../types';
import crypto from 'crypto';

export async function checkDispatch(event: ScanEvent): Promise<AnomalyFlag | null> {
    const key = `dispatch:${event.batch_id}`;
    const record = await redis.hgetall(key);
    
    if (!record || Object.keys(record).length === 0) {
        return {
            flag_id: crypto.randomUUID(),
            type: "DISPATCH_MISMATCH",
            severity: "MEDIUM",
            batch_id: event.batch_id,
            region: { lat: event.lat, lng: event.lng },
            description: "Batch not found in any manufacturer dispatch record",
            timestamp: event.timestamp
        };
    }
    
    const now = new Date(event.timestamp * 1000);
    const dispatchDate = new Date(record.dispatch_date);
    const expiryDate = new Date(record.expiry_date);
    
    let isExpiredOrPreDispatch = false;
    let timingDesc = "";
    if (now < dispatchDate) {
        isExpiredOrPreDispatch = true;
        timingDesc = "Scan occurred before official dispatch date.";
    } else if (now > expiryDate) {
        isExpiredOrPreDispatch = true;
        timingDesc = "Scan occurred after official expiry date.";
    }
    
    const regions = JSON.parse(record.authorized_regions || '[]');
    let inRegion = false;
    for (const r of regions) {
        if (event.lat >= r.lat_min && event.lat <= r.lat_max &&
            event.lng >= r.lng_min && event.lng <= r.lng_max) {
            inRegion = true;
            break;
        }
    }
    
    if (!inRegion || isExpiredOrPreDispatch) {
        return {
            flag_id: crypto.randomUUID(),
            type: "DISPATCH_MISMATCH",
            severity: "HIGH",
            batch_id: event.batch_id,
            region: { lat: event.lat, lng: event.lng },
            description: `Dispatch rules violated. ${!inRegion ? "Outside authorized region. " : ""}${timingDesc}`,
            timestamp: event.timestamp
        };
    }
    
    return null;
}
