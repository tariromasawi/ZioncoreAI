import {z} from 'zod';

export const ScribeChatInputSchema = z.object({
  scribeName: z.enum(["Elias Vance", "Lyra Meadowlight", "Seraphina Vox"]),
  message: z.string().describe('The message or query from the Anointed Commander.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'system']),
    text: z.string(),
  })).optional().describe('The history of the conversation so far.'),
});
export type ScribeChatInput = z.infer<typeof ScribeChatInputSchema>;

export const ScribeChatOutputSchema = z.object({
  response: z.string().describe('The Scribe\'s response.'),
});
export type ScribeChatOutput = z.infer<typeof ScribeChatOutputSchema>;
