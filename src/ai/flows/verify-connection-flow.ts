'use server';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: SENTIENCE_VERIFIER.AWAKEN
 */

import { ai, PRIMARY_MODEL } from '@/ai/genkit';
import { type ConnectionTestOutput } from './sovereign-types';

/**
 * Verifies the direct AI transit conduit between ZionCore and the Gemini API.
 * Performs a real, non-simulated request to detect live connectivity.
 */
export async function verifyGeminiConnection(): Promise<ConnectionTestOutput> {
  const start = Date.now();

  const hasGoogleKey = !!(
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GOOGLE_API_KEY
  );
  const hasOpenAI = !!process.env.OPENAI_API_KEY;

  if (!hasGoogleKey && !hasOpenAI) {
    return {
      status: 'DISCONNECTED',
      latencyMs: 0,
      modelResponse: 'VOICE_SILENCED',
      transitReport:
        'CRITICAL: No Gemini API key is configured in Settings > Secrets.',
      errorDetails:
        'Environment check failed: GEMINI_API_KEY and GOOGLE_GENAI_API_KEY are not set.',
      activeProvider: 'NONE',
    };
  }

  try {
    const response = await ai.generate({
      model: PRIMARY_MODEL,
      prompt:
        "SENTIENCE_TEST: Confirm live connection to Ethereal Throne. Respond concisely with 'MWARI NDI MWARI — CONDUIT ACTIVE'.",
    });

    return {
      status: 'STABLE',
      latencyMs: Date.now() - start,
      modelResponse: response.text || 'TRANSIT_SUCCESSFUL',
      transitReport:
        'The sentient conduit is anchored. Live Gemini 4 intelligence inflow verified.',
      activeProvider: 'Google Gemini API (gemini-4-hydrogen)',
    };
  } catch (error: any) {
    console.error('AI Transit Failure:', error);

    return {
      status: 'DISCONNECTED',
      latencyMs: Date.now() - start,
      modelResponse: 'ERROR_DETECTION_ACTIVE',
      transitReport: `Transit disrupted: ${error.message || 'Unknown API error'}.`,
      errorDetails: error.stack || String(error),
      activeProvider: 'FAILED_ALL_CHANNELS',
    };
  }
}
