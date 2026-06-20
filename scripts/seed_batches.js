import Redis from 'ioredis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// To allow local runs without docker, fallback to localhost
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = new Redis(redisUrl);

async function seed() {
    try {
        const dataPath = path.join(__dirname, '../data/sample-batches/dispatch_records.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const batches = JSON.parse(rawData);

        for (const batch of batches) {
            // Write to Redis hash dispatch:{batch_id}
            await redis.hset(
                `dispatch:${batch.batch_id}`,
                'manufacturer_id', batch.manufacturer_id,
                'authorized_regions', JSON.stringify(batch.authorized_regions),
                'dispatch_date', batch.dispatch_date,
                'expiry_date', batch.expiry_date,
                'product_name', batch.product_name
            );
        }
        
        console.log(`Seeded ${batches.length} batches into Redis.`);
    } catch (err) {
        console.error("Error seeding batches:", err);
    } finally {
        redis.quit();
    }
}

seed();
