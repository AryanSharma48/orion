import easyocr

# Initialize at module level
reader = None

def init_ocr():
    global reader
    if reader is None:
        print("Initializing EasyOCR...")
        reader = easyocr.Reader(['en'])

def extract_text(image_array) -> dict:
    if reader is None:
        init_ocr()
        
    results = reader.readtext(image_array)
    
    blocks = []
    total_conf = 0
    full_text_parts = []
    
    for bbox, text, conf in results:
        if conf >= 0.3:
            blocks.append({
                "text": text,
                "confidence": float(conf),
                "bbox": [[int(pt[0]), int(pt[1])] for pt in bbox]
            })
            total_conf += conf
            full_text_parts.append(text)
            
    avg_conf = (total_conf / len(blocks)) if blocks else 0.0
    
    return {
        "full_text": " ".join(full_text_parts),
        "blocks": blocks,
        "avg_confidence": float(avg_conf)
    }
