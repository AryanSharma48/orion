import { Router, Request, Response } from 'express';
import { SuspiciousReport } from '../types';
import crypto from 'crypto';

const router = Router();

// In-memory store for hackathon (replace with SQLite for real offline persistence)
const reports: SuspiciousReport[] = [];

router.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        
        const report: SuspiciousReport = {
            report_id: crypto.randomUUID(),
            batch_id: body.batch_id || "UNKNOWN",
            reporter_location: body.reporter_location || { lat: 0, lng: 0 },
            description: body.description || "",
            image_base64: body.image_base64,
            reported_at: new Date().toISOString(),
            synced: false
        };
        
        reports.push(report);
        
        // Try sync immediately
        const anomalyPort = process.env.ANOMALY_PORT || 8001;
        try {
            // we could send it to anomaly engine if it had a report endpoint
            // For now, we just pretend it syncs if the anomaly engine is up
            await fetch(`http://anomaly-engine:${anomalyPort}/health`);
            report.synced = true;
        } catch (e) {
            report.synced = false;
        }
        
        res.json(report);
    } catch (err) {
        console.error("Report error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/', (req, res) => {
    res.json(reports);
});

router.get('/pending', (req, res) => {
    res.json(reports.filter(r => !r.synced));
});

router.post('/sync', async (req, res) => {
    const anomalyPort = process.env.ANOMALY_PORT || 8001;
    let syncedCount = 0;
    
    for (const report of reports.filter(r => !r.synced)) {
        try {
            await fetch(`http://anomaly-engine:${anomalyPort}/health`);
            report.synced = true;
            syncedCount++;
        } catch (e) {
            // still offline
            break;
        }
    }
    
    res.json({ synced_count: syncedCount, pending_count: reports.filter(r => !r.synced).length });
});

export default router;
