import { NextResponse } from "next/server";
import { detectDhikrInText, DHIKR_PHRASES, DhikrPhraseId } from "@/utils/arabicSpeech";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let text = "";
    let phraseHint: DhikrPhraseId | undefined;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      text = body.text || "";
      phraseHint = body.phraseHint;
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const textParam = formData.get("text");
      if (typeof textParam === "string") {
        text = textParam;
      }
      const hintParam = formData.get("phraseHint");
      if (typeof hintParam === "string" && hintParam in DHIKR_PHRASES) {
        phraseHint = hintParam as DhikrPhraseId;
      }
    }

    if (!text) {
      return NextResponse.json({ success: false, message: "No text or audio provided" }, { status: 400 });
    }

    const { matchedId, count } = detectDhikrInText(text, phraseHint);

    return NextResponse.json({
      success: true,
      rawText: text,
      matchedPhrase: matchedId ? DHIKR_PHRASES[matchedId] : null,
      incrementBy: count,
    });
  } catch (error: any) {
    console.error("Izkur recognize API error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to process speech" }, { status: 500 });
  }
}
