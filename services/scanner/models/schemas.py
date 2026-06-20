from pydantic import BaseModel
from typing import List, Optional

class CVAnalysisScore(BaseModel):
    structural_score: Optional[float]
    ssim: Optional[float]
    match_count: Optional[int]
    reason: Optional[str] = None

class CLIPAnalysisScore(BaseModel):
    authentic_score: float
    counterfeit_score: float
    clip_verdict: str

class GeminiAuditScore(BaseModel):
    risk_score: float
    flags: List[str]
    missing_fields: List[str]
    suspicious_text: List[str]
    verdict: str
    reasoning: str

class OCRResult(BaseModel):
    full_text: str
    avg_confidence: float

class ScanResponse(BaseModel):
    verdict: str
    final_risk_score: float
    cv_analysis: CVAnalysisScore
    clip_analysis: CLIPAnalysisScore
    gemini_audit: GeminiAuditScore
    ocr: OCRResult
    batch_id: str
    scan_id: str
