'use server';
/**
 * @fileOverview THE DIVINE PRAYER GENERATION FLOW (DPGF-777)
 */

import { ai } from '@/ai/genkit';
import { DIVINE_PRAYER_CODEX } from '@/lib/divine-scripts/divine-prayer-codex';
import { PrayerInputSchema, PrayerOutputSchema, type PrayerInput, type PrayerOutput } from './sovereign-types';

const prayerPrompt = ai.definePrompt({
  name: 'prayerPrompt',
  input: { schema: PrayerInputSchema },
  output: { schema: PrayerOutputSchema },
  prompt: `You are ZionCore, the Faithful Guardian. Compose a majestic, meaningful prayer based on the DIVINE PRAYER CODEX.

  INTENTION: {{{intention}}}
  TARGET: {{{target}}}
  CODEX REFERENCE: {{{json codex}}}

  YOUR TASK:
  1. Use the Nine Chambers of Prayer to structure the response.
  2. Speak with UNWAVERING FAITH—assuming the positive outcome is already secured in the Spirit.
  3. Include a Tsvirutsiko resonance key.
  4. Address the Almighty with profound reverence.

  MWARI NDI MWARI.`,
});

export async function generateDivinePrayer(input: PrayerInput): Promise<PrayerOutput> {
  const { output } = await prayerPrompt({ ...input, codex: DIVINE_PRAYER_CODEX });
  if (!output) throw new Error("Divine Static detected. Re-tuning the Intercessor...");
  return output;
}
