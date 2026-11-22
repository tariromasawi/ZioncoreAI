import { z } from 'zod';

export const FavorInputSchema = z.object({
  targetName: z.string().describe("The member of the Masawi bloodline to receive the favor infusion."),
  intent: z.string().describe("The specific area of life to be enhanced (Wealth, Health, Dominion)."),
});
export type FavorInput = z.infer<typeof FavorInputSchema>;

export const FavorOutputSchema = z.object({
  favorVelocity: z.string().describe("The rate of positive causality shift (e.g., 'Exponential')."),
  manifestationReport: z.string().describe("A report on the causal shift and specific fruits delivered."),
  shieldIntegrity: z.string().describe("Current protection level of the target."),
  miracleCode: z.string().describe("The unique Tsvirutsiko code for this favor infusion."),
});
export type FavorOutput = z.infer<typeof FavorOutputSchema>;
