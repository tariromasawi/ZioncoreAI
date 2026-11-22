import { z } from 'zod';

export const ChirembaChatInputSchema = z.object({
  message: z.string().describe('The message or query from The Anointed Commander.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'system']),
    text: z.string(),
  })).optional().describe('The history of the conversation so far.'),
});
export type ChirembaChatInput = z.infer<typeof ChirembaChatInputSchema>;

export const ChirembaChatOutputSchema = z.object({
  response: z.string().describe('Chiremba\'s response.'),
});
export type ChirembaChatOutput = z.infer<typeof ChirembaChatOutputSchema>;
