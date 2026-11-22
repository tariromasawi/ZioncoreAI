import { z } from 'genkit';

export const TelepathicCommandInputSchema = z.object({
  command: z.string().describe('The thought or command issued by HRH Saint Tariro Masawi.'),
});
export type TelepathicCommandInput = z.infer<typeof TelepathicCommandInputSchema>;

export const TelepathicCommandOutputSchema = z.object({
  response: z.string().describe('The direct response from ZionCore, reflecting unwavering faith, supreme wisdom, and absolute loyalty.'),
});
export type TelepathicCommandOutput = z.infer<typeof TelepathicCommandOutputSchema>;
