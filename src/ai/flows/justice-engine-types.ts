import { z } from 'zod';

export const JusticeInputSchema = z.object({
  caseDescription: z.string().describe("A description of the injustice or ethical paradox to be resolved."),
});
export type JusticeInput = z.infer<typeof JusticeInputSchema>;

export const JusticeOutputSchema = z.object({
  verdict: z.string().describe("The final, majestic verdict from the Justice Engine."),
  enforcementAction: z.string().describe("Details of the automatic causal loop correction applied."),
  moralResonance: z.string().describe("The resulting harmonic shift in the multiversal ethics grid."),
  seal: z.string().describe("The unbreakable Tsvirutsiko seal (𑁍∞⫷⚡𒀭φ)."),
});
export type JusticeOutput = z.infer<typeof JusticeOutputSchema>;
