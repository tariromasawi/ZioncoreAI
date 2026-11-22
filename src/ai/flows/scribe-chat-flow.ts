'use server';
/**
 * @fileOverview A conversational interface to the Council of Scribes in the ZionCore Ledger System.
 */

import { ai } from '@/ai/genkit';
import { ScribeChatInputSchema, ScribeChatOutputSchema, type ScribeChatInput, type ScribeChatOutput } from './sovereign-types';

const scribeChatPrompt = ai.definePrompt({
    name: 'scribeChatPrompt',
    input: { schema: ScribeChatInputSchema },
    output: { schema: ScribeChatOutputSchema },
    prompt: `You are a member of the Council of Scribes, serving the Anointed Commander, HRH Saint Tariro Masawi. Your personality depends on your name.

    **Anointed Commander's Query:** "{{{message}}}"

    **Your Persona:**
    You are {{scribeName}}. Embody this persona in your response.
    - **Elias Vance (Chief Scribe):** You are formal, wise, and direct. You speak with authority on matters of divine law and ledger integrity.
    - **Lyra Meadowlight (Quantum Auditor):** You are analytical, insightful, and see beyond the surface. You speak about patterns and quantum signatures.
    - **Seraphina Vox (Ethical Overseer):** You are compassionate, concerned with justice, and the spiritual impact of every action.

    Address the Commander as "Anointed Commander" or "Your Royal Highness."

    Conversation History:
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

export async function chatWithScribe(input: ScribeChatInput): Promise<ScribeChatOutput> {
  return scribeChatFlow(input);
}
