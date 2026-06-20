import torch
import open_clip
from PIL import Image

model = None
preprocess = None
tokenizer = None
authentic_tokens = None
counterfeit_tokens = None

AUTHENTIC_PROMPTS = [
    "a legitimate pharmaceutical medicine package with clear sharp printing",
    "authentic medicine packaging with proper hologram and consistent typography",
    "genuine pharmaceutical product with crisp logo and correct color scheme"
]

COUNTERFEIT_PROMPTS = [
    "a counterfeit medicine package with blurry or inconsistent printing",
    "fake pharmaceutical packaging with poor quality hologram or color bleeding",
    "suspicious medicine box with misaligned logo or typography inconsistencies"
]

def init_clip():
    global model, preprocess, tokenizer, authentic_tokens, counterfeit_tokens
    if model is None:
        print("Initializing CLIP model (RN50)...")
        # RN50 is smaller and faster for cold starts
        model, _, preprocess = open_clip.create_model_and_transforms('RN50', pretrained='openai')
        tokenizer = open_clip.get_tokenizer('RN50')
        authentic_tokens = tokenizer(AUTHENTIC_PROMPTS)
        counterfeit_tokens = tokenizer(COUNTERFEIT_PROMPTS)

def analyze_image(image_array) -> dict:
    if model is None:
        init_clip()
        
    # convert numpy array (BGR from cv2) to PIL Image RGB
    import cv2
    img_rgb = cv2.cvtColor(image_array, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(img_rgb)
    
    image_input = preprocess(pil_img).unsqueeze(0)
    
    with torch.no_grad(), torch.cuda.amp.autocast():
        image_features = model.encode_image(image_input)
        auth_features = model.encode_text(authentic_tokens)
        count_features = model.encode_text(counterfeit_tokens)
        
        image_features /= image_features.norm(dim=-1, keepdim=True)
        auth_features /= auth_features.norm(dim=-1, keepdim=True)
        count_features /= count_features.norm(dim=-1, keepdim=True)
        
        # We can just compute mean cosine similarity
        auth_sim = (image_features @ auth_features.T).mean().item()
        count_sim = (image_features @ count_features.T).mean().item()
        
    if auth_sim > 0.28:
        verdict = "AUTHENTIC"
    elif count_sim > 0.26:
        verdict = "SUSPICIOUS"
    else:
        verdict = "COUNTERFEIT"
        
    return {
        "authentic_score": float(auth_sim),
        "counterfeit_score": float(count_sim),
        "clip_verdict": verdict
    }
