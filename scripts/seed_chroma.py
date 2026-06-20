import os
import chromadb
from dotenv import load_dotenv

load_dotenv()

host = os.getenv("CHROMA_HOST", "localhost")
port = os.getenv("CHROMA_PORT", "8000")

print(f"Connecting to ChromaDB at {host}:{port}...")
client = chromadb.HttpClient(host=host, port=port)

# Delete existing to ensure idempotency
try:
    client.delete_collection("pharma_regulations")
    print("Deleted existing collection 'pharma_regulations'")
except Exception:
    pass

collection = client.create_collection("pharma_regulations")

regs_path = os.path.join(os.path.dirname(__file__), "../data/pharma-regs/regulations.txt")
with open(regs_path, "r", encoding="utf-8") as f:
    content = f.read()

chunks = [c.strip() for c in content.split("---CHUNK---") if c.strip()]

ids = [f"chunk_{i}" for i in range(len(chunks))]
metadatas = [{"source": "pharma_regs", "chunk_index": i} for i in range(len(chunks))]

collection.add(
    documents=chunks,
    metadatas=metadatas,
    ids=ids
)

print(f"Seeded {len(chunks)} chunks into ChromaDB.")
