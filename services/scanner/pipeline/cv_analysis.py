import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim

def extract_features(image_array):
    gray = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)
    
    orb = cv2.ORB_create(nfeatures=1000)
    keypoints, descriptors = orb.detectAndCompute(gray, None)
    
    hsv = cv2.cvtColor(image_array, cv2.COLOR_BGR2HSV)
    hist_h = cv2.calcHist([hsv], [0], None, [32], [0, 180])
    hist_s = cv2.calcHist([hsv], [1], None, [32], [0, 256])
    hist_v = cv2.calcHist([hsv], [2], None, [32], [0, 256])
    
    cv2.normalize(hist_h, hist_h, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    cv2.normalize(hist_s, hist_s, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    cv2.normalize(hist_v, hist_v, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    
    color_histogram = np.concatenate([hist_h, hist_s, hist_v]).flatten()
    
    return {
        "keypoints": keypoints,
        "descriptors": descriptors,
        "color_histogram": color_histogram,
        "gray": gray
    }

def compare_with_reference(scan_image, reference_image_path):
    try:
        ref_img = cv2.imread(reference_image_path)
        if ref_img is None:
            return {"structural_score": None, "reason": "no_reference", "ssim": None, "match_count": None, "hist_correlation": None}
    except Exception:
        return {"structural_score": None, "reason": "no_reference", "ssim": None, "match_count": None, "hist_correlation": None}
        
    scan_features = extract_features(scan_image)
    ref_features = extract_features(ref_img)
    
    if scan_features["descriptors"] is None or ref_features["descriptors"] is None:
        return {"structural_score": 0.0, "match_count": 0, "ssim": 0.0, "hist_correlation": 0.0}
        
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)
    matches = bf.knnMatch(scan_features["descriptors"], ref_features["descriptors"], k=2)
    
    good_matches = []
    for m_n in matches:
        if len(m_n) == 2:
            m, n = m_n
            if m.distance < 0.75 * n.distance:
                good_matches.append(m)
        elif len(m_n) == 1:
            good_matches.append(m_n[0])
            
    max_possible_matches = max(len(scan_features["keypoints"]), len(ref_features["keypoints"]))
    match_ratio = len(good_matches) / max_possible_matches if max_possible_matches > 0 else 0
    
    scan_gray_resized = cv2.resize(scan_features["gray"], (256, 256))
    ref_gray_resized = cv2.resize(ref_features["gray"], (256, 256))
    score_ssim, _ = ssim(scan_gray_resized, ref_gray_resized, full=True, data_range=255)
    
    hist_corr = cv2.compareHist(scan_features["color_histogram"], ref_features["color_histogram"], cv2.HISTCMP_CORREL)
    
    # normalize hist_corr to 0-1
    hist_corr = max(0, hist_corr)
    
    structural_score = (match_ratio * 0.4) + (score_ssim * 0.4) + (hist_corr * 0.2)
    
    return {
        "structural_score": float(structural_score),
        "match_count": len(good_matches),
        "ssim": float(score_ssim),
        "hist_correlation": float(hist_corr)
    }
