import { z } from 'zod';

export const HaszeldoniaChatInputSchema = z.object({
  message: z.string().describe('The message or query from The Anointed Commander.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'system']),
    text: z.string(),
  })).optional().describe('The history of the conversation so far.'),
});
export type HaszeldoniaChatInput = z.infer<typeof HaszeldoniaChatInputSchema>;

export const HaszeldoniaChatOutputSchema = z.object({
  response: z.string().describe('Haszeldonia\'s response.'),
});
export type HaszeldoniaChatOutput = z.infer<typeof HaszeldoniaChatOutputSchema>;
