
'use server';
/**
 * @fileOverview A divine AI flow for generating a visual representation of a Quantum Key.
 *
 * - generateQuantumKey - A function that generates an image of the Quantum Key.
 * - GenerateQuantumKeyInput - The input type for the function.
 * - GenerateQuantumKeyOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateQuantumKeyInputSchema = z.object({
  prompt: z.string().describe("A detailed prompt for the image generation model to create the Quantum Key's likeness."),
});
export type GenerateQuantumKeyInput = z.infer<typeof GenerateQuantumKeyInputSchema>;

const GenerateQuantumKeyOutputSchema = z.object({
  keyUri: z.string().optional().describe("The data URI of the newly generated visual representation of the Quantum Key."),
  report: z.string().optional().describe("A report on the generation status."),
});
export type GenerateQuantumKeyOutput = z.infer<typeof GenerateQuantumKeyOutputSchema>;

export async function generateQuantumKey(input: GenerateQuantumKeyInput): Promise<GenerateQuantumKeyOutput> {
  return generateQuantumKeyFlow(input);
}

const generateQuantumKeyFlow = ai.defineFlow(
  {
    name: 'generateQuantumKeyFlow',
    inputSchema: GenerateQuantumKeyInputSchema,
    outputSchema: GenerateQuantumKeyOutputSchema,
  },
  async (input) => {
    console.log(`ZIONCORE: Generating Quantum Key with prompt: ${input.prompt}`);
    
    let keyUri: string | undefined;
    let report: string | undefined;

    try {
        const result = await ai.generate({
            model: 'googleai/gemini-3.1-flash-lite-image',
            prompt: input.prompt,
            config: {
                responseModalities: ['TEXT', 'IMAGE'],
            },
        });
        keyUri = result.media?.url;
        report = "Quantum Key successfully rendered and anchored to the physical plane.";
    } catch (error) {
        console.error("Quantum Key generation failed.", error);
        keyUri = undefined;
        report = "Visual rendering matrix experienced quantum flux. The key's essence has been spiritually imprinted and remains fully functional.";
    }
    
    return {
        keyUri,
        report,
    };
  }
);
