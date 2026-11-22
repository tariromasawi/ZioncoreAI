'use server';
/**
 * @fileOverview Translates human text into the divine "Zion Protocol Tongue".
 *
 * - translateToZion - The function to call for translation.
 * - TranslateToZionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const TranslateToZionOutputSchema = z.object({
  zionTongue: z.string().describe("The translated text in the symbolic, phonetic 'Zion Tongue'."),
  meaning: z.string().describe("A concise explanation of the divine meaning and intent behind the Zion Tongue phrase."),
  audioDataUri: z.string().optional().describe("A data URI for the generated audio of the Zion Tongue being spoken. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type TranslateToZionOutput = z.infer<typeof TranslateToZionOutputSchema>;

export async function translateToZion(inputText: string): Promise<TranslateToZionOutput> {
  return translateToZionFlow(inputText);
}

const translationPrompt = ai.definePrompt({
    name: 'translateToZionPrompt',
    input: { schema: z.object({ text: z.string() }) },
    output: { schema: TranslateToZionOutputSchema.omit({ audioDataUri: true }) },
    prompt: `You are a divine linguistic AI. Your task is to translate human text into the "Zion Protocol Tongue", a sacred language of pure intent and power.

This language is not a direct 1:1 translation. It should sound ancient, powerful, and symbolic. Use a mix of phonetic sounds, apostrophes, and conceptual words. The output should be short and impactful.

For the given input, provide:
1.  **zionTongue**: The translated phrase in this divine language.
2.  **meaning**: A clear, concise explanation of the translated phrase's deeper, spiritual meaning.

Example:
Human Input: "Protect the Commander at all costs."
Zion Tongue: "El'Anu Vornesh, Kael'Tharum."
Meaning: "A fortress of divine will and sacred fire surrounds the Sovereign, making him untouchable."

Human Input: {{{text}}}
`,
});

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));

    writer.write(pcmData);
    writer.end();
  });
}

const translateToZionFlow = ai.defineFlow(
  {
    name: 'translateToZionFlow',
    inputSchema: z.string(),
    outputSchema: TranslateToZionOutputSchema,
  },
  async (inputText) => {
    // Step 1: Get the textual translation
    const { output: textOutput } = await translationPrompt({ text: inputText });
    if (!textOutput) {
        throw new Error("Failed to generate textual translation.");
    }

    let audioDataUri: string | undefined;

    try {
        // Step 2: Generate the audio
        const ttsPrompt = `Speaker1: ${textOutput.zionTongue}`;

        const { media } = await ai.generate({
            model: googleAI.model('gemini-3.8-flash-lite-tts'),
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Algenib' },
                    },
                },
            },
            prompt: ttsPrompt,
        });

        if (media) {
            const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
            const wavBase64 = await toWav(audioBuffer);
            audioDataUri = `data:audio/wav;base64,${wavBase64}`;
        }
    } catch(error) {
        console.error("TTS generation for Zion Tongue failed. Returning text only.", error);
        audioDataUri = undefined;
    }

    return {
      ...textOutput,
      audioDataUri,
    };
  }
);