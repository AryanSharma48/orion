# ORION - Counterfeit Medicine Detection Platform

ORION is a state-of-the-art counterfeit medicine detection and risk intelligence platform designed for pharmaceutical security. It combines computer vision, zero-shot AI, large language models, spatial-temporal anomaly detection, and offline cryptography to create a multi-layered defense against counterfeit drugs.

## Architecture

```text
                      +------------------+
    [Image Scan]      |  SCANNER SERVICE |
    [Geo Data]   +--->|  (Python/FastAPI)|<--+ [Reference Images]
    [Batch ID]   |    |  - EasyOCR       |   | [ChromaDB: Regs]
                 |    |  - CLIP (RN50)   |   | [Gemini LLM]
                 |    |  - ORB/SSIM CV   |   +------------------+
                 |    +--------+---------+
                 |             |
                 |             v (Fire & Forget Scan Event)
[Mobile Client]--+    +--------+---------+
                 |    | ANOMALY ENGINE   |
                 |    | (Node.js/Express)|<--+ [Redis]
                 |    |  - Velocity      |   | (Velocity Windows)
                 |    |  - Volume        |   | (Volume Grids)
                 |    |  - Dispatch Check|   | (Dispatch Records)
                 |    +------------------+
                 |
                 |    +------------------+
[Offline Scan]---+--->| OFFLINE VERIFIER |
                      | (Node.js/Express)|
                      |  - Ed25519       |
                      |  - Offline Sync  |
                      +------------------+
```

## The Three Pillars (Technical Pitch)

### 1. Multi-Modal Scanning (Not Just Color Checking)
Basic verification apps just check a barcode or the color of a box. ORION uses a multi-modal approach:
- **Zero-Shot CLIP Anomaly Detection**: We don't just rely on reference images. We use RN50 to zero-shot classify if a package "looks counterfeit" based on blurring, alignment, and holograms.
- **LLM Regulatory Audit**: EasyOCR extracts the text, RAG pulls relevant FDA/WHO regulations from ChromaDB, and Gemini analyzes the extracted text to find subtle errors (e.g., misspelled ingredients, missing expiry formats) that a human or basic string match would miss.
- **Structural Similarity**: If a manufacturer provides a reference, we use ORB feature matching and SSIM to mathematically prove the packaging is identical to the source of truth.

### 2. Spatial-Temporal Anomaly Engine (Not Just Phantom APIs)
A barcode can be copied perfectly. To defeat a perfect copy, we track physics.
- **Velocity Check**: If the exact same batch/serial number is scanned in New York and then 5 minutes later in London, it's physically impossible. ORION detects this instantly using Haversine distance and flags it.
- **Volume Spikes**: Counterfeiters often dump thousands of fake boxes into a single region. ORION maps the world into 1-degree grids and detects sudden 5x or 10x volume spikes against a 7-day rolling average.
- **Dispatch Authorization**: Even if the medicine is real, if a batch authorized only for "South India" appears in "North India", it's flagged as diverted inventory.

### 3. Ed25519 Offline Verification (Not Just a Static DB)
Rural areas and moving logistics chains often lack internet.
- **Offline Integrity**: We sign the entire batch payload using an Ed25519 private key. The public key is embedded in the QR or the app.
- **Zero Network**: The verifier can cryptographically prove the payload is authentic without making a single API call.
- **Sync Queue**: Suspicious scans made offline are queued locally and automatically sync to the anomaly engine once network is restored.

## Quick Start

1. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY to .env
   ```

2. **Generate Ed25519 Keys**
   ```bash
   node shared/crypto/generate_keys.js
   # Paste the MANUFACTURER_PRIVATE_KEY and MANUFACTURER_PUBLIC_KEY into your .env
   ```

3. **Start the Platform**
   ```bash
   docker compose up --build -d
   ```

4. **Seed Databases**
   ```bash
   # Wait a few seconds for ChromaDB and Redis to initialize
   pip install chromadb python-dotenv
   python scripts/seed_chroma.py
   
   npm install --prefix scripts
   node scripts/seed_batches.js
   ```

## API Reference

### Scanner Service (`:8000`)
- `POST /scan`
  - Accepts `multipart/form-data`: `image` (file), `manufacturer_id` (optional string), `batch_id` (string), `lat` (float), `lng` (float).
  - Returns `ScanResponse` containing verdict, CV analysis, CLIP analysis, and Gemini audit.

### Anomaly Engine (`:8001`)
- `POST /ingest`
  - Internal endpoint for scanner events.
- `GET /riskmap`
  - Returns GeoJSON of global anomalies and scan volume.
- `GET /flags/recent?limit=20`
  - Returns recent anomaly flags.

### Offline Verifier (`:8002`)
- `POST /generate` (Demo use only)
  - Accepts `BatchPayload`. Returns `qr_data` (base64 signed payload).
- `POST /verify`
  - Accepts `{"qr_data": "...", "reporter_lat": 0.0, "reporter_lng": 0.0}`.
  - Returns `VerificationResult`.
- `POST /report`
  - Accepts suspicious inventory reports for offline queuing.
- `POST /reports/sync`
  - Syncs pending reports to the anomaly engine.
