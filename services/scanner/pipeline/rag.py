import os
import chromadb

def retrieve_relevant_regulations(ocr_text: str, n_results: int = 5) -> list:
    if not ocr_text.strip():
        return []
        
    host = os.getenv("CHROMA_HOST", "chromadb")
    port = os.getenv("CHROMA_PORT", "8000")
    
    client = chromadb.HttpClient(host=host, port=port)
    
    try:
        collection = client.get_collection("pharma_regulations")
    except Exception:
        # If collection doesn't exist yet
        return []
        
    results = collection.query(
        query_texts=[ocr_text],
        n_results=n_results
    )
    
    regulations = []
    if results['documents'] and len(results['documents']) > 0:
        docs = results['documents'][0]
        metas = results['metadatas'][0] if results['metadatas'] else [{}] * len(docs)
        distances = results['distances'][0] if results['distances'] else [0.0] * len(docs)
        
        for doc, meta, dist in zip(docs, metas, distances):
            regulations.append({
                "regulation_text": doc,
                "source": meta.get("source", "unknown"),
                "relevance_score": float(dist)
            })
            
    return regulations
