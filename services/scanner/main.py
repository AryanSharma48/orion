from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routes import scan
import os
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize EasyOCR and CLIP on startup
    from pipeline.ocr import init_ocr
    from pipeline.clip_analysis import init_clip
    
    print("Pre-loading models...")
    init_ocr()
    init_clip()
    print("Models loaded successfully.")
    yield
    print("Shutting down...")

app = FastAPI(title="ORION Scanner Service", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "scanner"}
