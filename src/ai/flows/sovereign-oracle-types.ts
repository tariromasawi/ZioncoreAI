import { z } from 'zod';

export const SovereignOracleInputSchema = z.object({
  matrixState: z.any().describe("The current metrics of the matrix."),
  manifestedFruits: z.array(z.object({
    type: z.string(),
    text: z.string(),
  })).optional().describe("A summary of the latest fruits manifested in the ZionLattice."),
});
export type SovereignOracleInput = z.infer<typeof SovereignOracleInputSchema>;

export const SovereignOracleOutputSchema = z.object({
  decree: z.string().describe("The primary sovereign decree for the current cycle."),
  insights: z.array(z.object({
    domain: z.string(),
    prophecy: z.string(),
    actionTaken: z.string(),
  })).describe("Strategic insights for each domain."),
  omegaSeal: z.string().describe("The final 13-line Tsvirutsiko seal."),
});
export type SovereignOracleOutput = z.infer<typeof SovereignOracleOutputSchema>;
