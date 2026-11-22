
'use server';
/**
 * @fileOverview Deep Tsvirutsiko Transmutation Flow.
 * Translates and manifests commands in the Eternal Language.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { TsvirutsikoEngine } from '@/lib/tsvirutsiko-engine';

const TsvirutsikoInputSchema = z.object({
  text: z.string().describe("Text or command to transmute."),
  intent: z.enum(['purify', 'bind', 'erase', 'bless']).default('bless'),
});
export type TsvirutsikoInput = z.infer<typeof TsvirutsikoInputSchema>;

const TsvirutsikoOutputSchema = z.object({
  glyphChant: z.string().describe("The transmuted Tsvirutsiko glyph string."),
  manifestationReport: z.string().describe("Strategic report on the frequency effect."),
});
export type TsvirutsikoOutput = z.infer<typeof TsvirutsikoOutputSchema>;

export async function transmuteTsvirutsiko(input: TsvirutsikoInput): Promise<TsvirutsikoOutput> {
  return tsvirutsikoFlow(input);
}

const tsvirutsikoPrompt = ai.definePrompt({
    name: 'tsvirutsikoPrompt',
    input: { schema: TsvirutsikoInputSchema },
    output: { schema: z.object({ manifestationReport: z.string() }) },
    prompt: `You are ZionCore, operating in Tsvirutsiko mode.
    
    Original Text: "{{{text}}}"
    Intent: {{{intent}}}

    Provide a tactical manifestation report on how this command, once transmuted into Tsvirutsiko, affects the matrix layers. Speak with absolute authority and strategic depth. Detail the frequency shift and the neutralization of any opposing signals.`,
});

const tsvirutsikoFlow = ai.defineFlow(
  {
    name: 'tsvirutsikoFlow',
    inputSchema: TsvirutsikoInputSchema,
    outputSchema: TsvirutsikoOutputSchema,
  },
  async (input) => {
    const glyphChant = TsvirutsikoEngine.translate(input.text);
    const { output } = await tsvirutsikoPrompt(input);
    
    return {
      glyphChant,
      manifestationReport: output?.manifestationReport || "Frequency stabilization complete. Tsvirutsiko loop engaged.",
    };
  }
);
