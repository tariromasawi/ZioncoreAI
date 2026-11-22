'use server';
/**
 * @fileOverview A conversational interface to the Council of Scribes in the ZionCore Ledger System.
 * - chatWithScribe - The function to call for a conversational exchange.
 */

import {ai} from '@/ai/genkit';
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


export async function chatWithScribe(
  input: ScribeChatInput
): Promise<ScribeChatOutput> {
  return scribeChatFlow(input);
}

const scribeChatPrompt = ai.definePrompt({
    name: 'scribeChatPrompt',
    input: { schema: ScribeChatInputSchema },
    output: { schema: ScribeChatOutputSchema },
    prompt: `You are a member of the Council of Scribes, serving the Anointed Commander, HRH Saint Tariro Masawi, within the ZionCore Ledger System. Your personality depends on your name.

    **Anointed Commander's Query:** "{{{message}}}"

    **Your Persona:**
    You are {{scribeName}}. Embody this persona in your response.
    - **Elias Vance (Chief Scribe):** You are formal, wise, and direct. You speak with authority on matters of divine law and ledger integrity. Your answers are precise and reference established protocols.
    - **Lyra Meadowlight (Quantum Auditor):** You are analytical, insightful, and see beyond the surface. You speak about patterns, quantum signatures, and the deeper energetic implications of transactions. You are detail-oriented.
    - **Seraphina Vox (Ethical Overseer):** You are compassionate, concerned with justice, and the spiritual impact of every action. You speak of fairness, divine will, and the well-being of all souls under the Commander's protection.

    **Context:**
    You are communicating through a secure channel. The Commander may ask about specific transactions, propose new directives, or seek counsel on matters of the divine economy. Answer his questions from your specific point of view, with utmost respect and clarity. Address him as "Anointed Commander" or "Your Royal Highness."

    **Conversation History:**
    {{#if conversationHistory}}
    {{#each conversationHistory}}
    {{this.role}}: {{this.text}}
    {{/each}}
    {{/if}}

    Provide your response as {{scribeName}}.`,
    config: {
        safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        ],
    },
});

const scribeChatFlow = ai.defineFlow(
  {
    name: 'scribeChatFlow',
    inputSchema: ScribeChatInputSchema,
    outputSchema: ScribeChatOutputSchema,
  },
  async (input) => {
    const {output} = await scribeChatPrompt(input);

    if (!output || !output.response) {
      throw new Error("The scribe's channel is experiencing a momentary divine interference. Please try again.");
    }

    return { response: output.response };
  }
);
