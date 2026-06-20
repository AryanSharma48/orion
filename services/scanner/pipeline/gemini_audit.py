import os
import json
import google.generativeai as genai

def audit_text(ocr_text: str, regulations: list) -> dict:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {
            "risk_score": 0.5,
            "flags": ["gemini_api_key_missing"],
            "missing_fields": [],
            "suspicious_text": [],
            "verdict": "SUSPICIOUS",
            "reasoning": "Missing Gemini API key"
        }
        
    genai.configure(api_key=api_key)
    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    model = genai.GenerativeModel(model_name)
    
    reg_context = "\n\n".join([f"[{r['source']}] {r['regulation_text']}" for r in regulations])
    
    prompt = f"""
You are a pharmaceutical regulatory compliance expert. You are given:

1. TEXT EXTRACTED FROM A MEDICINE PACKAGE (via OCR):
{ocr_text}

2. RELEVANT PHARMACEUTICAL REGULATIONS AND STANDARDS:
{reg_context}

Analyze the extracted text against the regulations and identify:
- Incorrect dosage formats or implausible dosage values
- Misspelled active ingredient names or chemical compounds
- Missing mandatory fields (batch number, expiry date, manufacturer address)
- Regulatory language anomalies or non-standard phrasing
- Any text that contradicts standard pharmaceutical labeling requirements

Respond ONLY with a JSON object in this exact format, no markdown:
{{
  "risk_score": <float 0.0-1.0, where 1.0 is definitely counterfeit>,
  "flags": [<list of specific issues found as strings>],
  "missing_fields": [<list of mandatory fields not found>],
  "suspicious_text": [<exact text fragments that seem wrong>],
  "verdict": "<AUTHENTIC|SUSPICIOUS|COUNTERFEIT>",
  "reasoning": "<one sentence explanation>"
}}
"""

    try:
        response = model.generate_content(prompt)
        # Strip markdown if model included it despite prompt
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
            
        parsed = json.loads(text)
        return parsed
    except Exception as e:
        print(f"Gemini Audit Error: {e}")
        return {
            "risk_score": 0.5, 
            "flags": ["gemini_parse_error"], 
            "missing_fields": [], 
            "suspicious_text": [],
            "verdict": "SUSPICIOUS",
            "reasoning": str(e)
        }
