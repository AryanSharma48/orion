import os
import uuid
import time
import httpx
import asyncio
from fastapi import APIRouter, File, UploadFile, Form
from models.schemas import ScanResponse
from pipeline.preprocessing import preprocess_image
from pipeline.ocr import extract_text
from pipeline.cv_analysis import compare_with_reference
from pipeline.clip_analysis import analyze_image
from pipeline.rag import retrieve_relevant_regulations
from pipeline.gemini_audit import audit_text

router = APIRouter()

def compute_final_verdict(cv_score, clip_scores, gemini_result):
    scores = []
    
    if cv_score.get("structural_score") is not None:
        scores.append(1 - cv_score["structural_score"])  # invert: low similarity = high risk
    
    clip_total = clip_scores["authentic_score"] + clip_scores["counterfeit_score"]
    if clip_total > 0:
        clip_risk = clip_scores["counterfeit_score"] / clip_total
        scores.append(clip_risk)
    
    scores.append(gemini_result["risk_score"])
    
    final_risk = sum(scores) / len(scores) if scores else 0.5
    
    if final_risk < 0.35:
        verdict = "AUTHENTIC"
    elif final_risk < 0.65:
        verdict = "SUSPICIOUS"
    else:
        verdict = "COUNTERFEIT"
    
    return { "final_risk_score": final_risk, "verdict": verdict }

async def fire_anomaly_event(event_data: dict):
    port = os.getenv("ANOMALY_PORT", "8001")
    url = f"http://anomaly-engine:{port}/ingest"
    async with httpx.AsyncClient() as client:
        try:
            await client.post(url, json=event_data, timeout=2.0)
        except Exception as e:
            print(f"Failed to push anomaly event: {e}")

@router.post("/scan", response_model=ScanResponse)
async def scan_package(
    image: UploadFile = File(...),
    manufacturer_id: str = Form(default=""),
    batch_id: str = Form(...),
    lat: float = Form(...),
    lng: float = Form(...)
):
    scan_id = str(uuid.uuid4())
    img_bytes = await image.read()
    
    # Preprocess
    img_arr, img_b64 = preprocess_image(img_bytes)
    
    # Run OCR and CLIP concurrently in threadpool (since they are sync functions)
    ocr_future = asyncio.to_thread(extract_text, img_arr)
    clip_future = asyncio.to_thread(analyze_image, img_arr)
    
    ocr_result, clip_result = await asyncio.gather(ocr_future, clip_future)
    
    # CV matching
    cv_result = {"structural_score": None, "ssim": None, "match_count": None, "hist_correlation": None}
    if manufacturer_id:
        ref_path = f"/app/reference-packaging/{manufacturer_id}.jpg"
        cv_result = await asyncio.to_thread(compare_with_reference, img_arr, ref_path)
        
    # RAG
    regulations = await asyncio.to_thread(retrieve_relevant_regulations, ocr_result["full_text"])
    
    # Gemini
    gemini_result = await asyncio.to_thread(audit_text, ocr_result["full_text"], regulations)
    
    # Final verdict
    verdict_data = compute_final_verdict(cv_result, clip_result, gemini_result)
    
    # Dispatch event
    timestamp = int(time.time())
    event_data = {
        "scan_id": scan_id,
        "batch_id": batch_id,
        "manufacturer_id": manufacturer_id,
        "lat": lat,
        "lng": lng,
        "timestamp": timestamp,
        "verdict": verdict_data["verdict"],
        "final_risk_score": verdict_data["final_risk_score"]
    }
    
    asyncio.create_task(fire_anomaly_event(event_data))
    
    return ScanResponse(
        verdict=verdict_data["verdict"],
        final_risk_score=verdict_data["final_risk_score"],
        cv_analysis=cv_result,
        clip_analysis=clip_result,
        gemini_audit=gemini_result,
        ocr=ocr_result,
        batch_id=batch_id,
        scan_id=scan_id
    )
