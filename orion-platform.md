# ORION Platform Architecture & Implementation Plan

## Overview
ORION is a counterfeit medicine detection and risk intelligence platform. This plan details the task breakdown for implementing the fully dockerized microservices architecture as specified.

## Project Type
BACKEND (API/Microservices Architecture)

## Success Criteria
- All three services (Scanner, Anomaly Engine, Offline Verifier) start via `docker compose up`.
- Zero-shot anomaly detection, OCR, CV matching, and Gemini LLM validation function correctly in the Scanner.
- Haversine velocity checks and volume spike detection work in the Anomaly Engine.
- Ed25519 offline QR verification functions completely disconnected from the network.

## Tech Stack
- **Scanner**: Python 3.11, FastAPI, EasyOCR, OpenCV, open-clip-torch, ChromaDB, Google Generative AI
- **Anomaly Engine**: Node.js 20, TypeScript, Express, Redis (ioredis)
- **Offline Verifier**: Node.js 20, TypeScript, Express, @noble/ed25519
- **Infrastructure**: Docker, Docker Compose

## File Structure
```
orion/
├── frontend/
├── services/
│   ├── scanner/
│   ├── anomaly-engine/
│   └── offline-verifier/
├── shared/
│   ├── crypto/
│   └── types/
├── data/
│   ├── pharma-regs/
│   ├── reference-packaging/
│   └── sample-batches/
├── scripts/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Task Breakdown

### 1. Project Initialization & Shared Code
- [x] Create folder structure.
- [x] Create `shared/types/index.ts`.
- [x] Create `shared/crypto/generate_keys.js`.
- [x] Create `.env.example`.
- [x] Create `docker-compose.yml`.
- **Agent**: `backend-specialist`
- **Verification**: Files exist and structure matches specification.

### 2. Data & Seed Scripts
- [x] Create mock data: `dispatch_records.json` and `regulations.txt`.
- [x] Create Python script `scripts/seed_chroma.py`.
- [x] Create Node script `scripts/seed_batches.js`.
- **Agent**: `backend-specialist`
- **Verification**: Scripts run successfully when DBs are up.

### 3. Scanner Service (Python)
- [ ] Setup FastAPI `main.py` and `routes/scan.py`.
- [ ] Implement pipelines: `preprocessing.py`, `ocr.py`, `cv_analysis.py`, `clip_analysis.py`, `rag.py`, `gemini_audit.py`.
- [ ] Setup `Dockerfile` and `requirements.txt`.
- **Agent**: `backend-specialist`
- **Verification**: Builds and starts, `/health` returns ok.

### 4. Anomaly Engine (Node.js)
- [ ] Setup Express server `index.ts`.
- [ ] Implement `velocityCheck.ts`, `volumeCheck.ts`, `dispatchCheck.ts`.
- [ ] Setup `Dockerfile` and `package.json`.
- **Agent**: `backend-specialist`
- **Verification**: Builds and starts, connects to Redis.

### 5. Offline Verifier (Node.js)
- [ ] Setup Express server and `crypto/ed25519.ts`.
- [ ] Implement verification and reporting routes.
- [ ] Setup `Dockerfile` and `package.json`.
- **Agent**: `backend-specialist`
- **Verification**: Builds and starts, offline signatures validate correctly.

### 6. Documentation
- [ ] Create comprehensive `README.md` with ASCII architecture and tech pitch.
- **Agent**: `backend-specialist`

## Phase X: Verification
- [ ] Lint & Format check
- [ ] Docker Compose build check
- [ ] `docker compose up` starts without crashing
- [ ] Verify Socratic Gate was respected
