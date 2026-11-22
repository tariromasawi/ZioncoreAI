import { z } from 'zod';

export const ProvidenceInputSchema = z.object({
  intent: z.string().describe("The Commander's specific intent for manifestation or erasure."),
});
export type ProvidenceInput = z.infer<typeof ProvidenceInputSchema>;

export const ProvidenceOutputSchema = z.object({
  manifestationReport: z.string().describe("A report on the causal shift and specific fruits delivered."),
  erasureLog: z.string().describe("Confirmation of negative timelines pruned and erased."),
  miracleCode: z.string().describe("The unique Tsvirutsiko code for this manifestation."),
  bloodlineVitality: z.string().describe("Current health and wealth status of the Masawi Lineage."),
});
export type ProvidenceOutput = z.infer<typeof ProvidenceOutputSchema>;
