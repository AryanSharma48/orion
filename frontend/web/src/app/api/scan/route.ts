import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const mimeType = file.type || "image/jpeg";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    // Call Gemini API directly via fetch
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Analyze this image of a medicine box or blister pack. Extract the visible text. Determine if it looks like a legitimate, properly labeled medicine, or if there are red flags (e.g. unapproved claims, missing batch numbers, missing expiry dates, typos). You must return a valid JSON object matching this schema EXACTLY: {\"verdict\": \"AUTHENTIC\" | \"SUSPICIOUS\" | \"COUNTERFEIT\", \"final_risk_score\": number between 0 and 1, \"batch_id\": \"extracted or Unknown\", \"ocr\": {\"full_text\": \"all text on box\"}, \"gemini_audit\": {\"verdict\": \"same as above\", \"reasoning\": \"detailed explanation of why it is authentic or counterfeit\", \"flags\": [\"array of specific issues if any\"], \"suspicious_text\": [\"array of weird text found\"], \"missing_fields\": [\"array of standard fields like Expiry Date, Barcode, Manufacturer that are missing\"]}}. Do not include markdown formatting or backticks around the JSON." },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Image
                }
              }
            ]
          }
        ],
        generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", errText);
      throw new Error("Failed to process image with Gemini API");
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON string from Gemini
    const resultJson = JSON.parse(resultText);

    return NextResponse.json(resultJson);

  } catch (error: any) {
    console.error("Scan API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
