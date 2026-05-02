/// <reference types="vite/client" />
/// <reference lib="dom" />

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY ?? "",
});

// ✅ Fix: Don't use play() from the SDK (expects AsyncIterable, gets ReadableStream).
// Instead read the stream via Response → ArrayBuffer → Blob → Audio.
export async function speakText(text: string): Promise<void> {
  const stream = await elevenlabs.textToSpeech.convert(
    "JBFqnCBsd6RMkjVDRZzb", // voice_id
    {
      text,
      modelId: "eleven_multilingual_v2",
      outputFormat: "mp3_44100_128",
    },
  );

  const arrayBuffer = await new Response(
    stream as ReadableStream,
  ).arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);

  const audioEl = document.createElement("audio");
  audioEl.src = url;
  await audioEl.play();

  audioEl.onended = () => URL.revokeObjectURL(url);
}
