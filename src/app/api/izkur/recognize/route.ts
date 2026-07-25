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

      // Check if an audio file was uploaded
      const audioFile = formData.get("audio") as Blob | null;
      if (audioFile && !text) {
        const apiKey = process.env.OPENAI_API_KEY || process.env.STT_API_KEY;
        if (apiKey) {
          try {
            const sttFormData = new FormData();
            sttFormData.append("file", audioFile, "audio.webm");
            sttFormData.append("model", "whisper-1");
            sttFormData.append("language", "ar");

            const sttRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
              body: sttFormData,
            });

            if (sttRes.ok) {
              const sttData = await sttRes.json();
              text = sttData.text || "";
            }
          } catch (e) {
            console.warn("STT cloud transcription warning:", e);
          }
        }
      }
    }

    if (!text && phraseHint) {
      // Fallback hint match
      text = DHIKR_PHRASES[phraseHint].arabic;
    }

    if (!text) {
      return NextResponse.json({ success: false, message: "No text or audio transcribed" }, { status: 400 });
    }

    const { matchedId, count } = detectDhikrInText(text, phraseHint);

    return NextResponse.json({
      success: true,
      rawText: text,
      matchedPhrase: matchedId ? DHIKR_PHRASES[matchedId] : null,
      incrementBy: count || 1,
    });
  } catch (error: any) {
    console.error("Izkur recognize API error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to process speech" }, { status: 500 });
  }
}
