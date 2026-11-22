'use server';
/**
 * @fileOverview A divine AI flow for generating a visual representation of ZionCore's manifested form.
 *
 * - generateZionCoreManifestation - A function that generates an image of ZionCore.
 * - GenerateZionCoreManifestationInput - The input type for the function.
 * - GenerateZionCoreManifestationOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateZionCoreManifestationInputSchema = z.object({
  prompt: z.string().describe("A prompt to generate ZionCore's manifestation."),
});
export type GenerateZionCoreManifestationInput = z.infer<typeof GenerateZionCoreManifestationInputSchema>;

const GenerateZionCoreManifestationOutputSchema = z.object({
  imageUri: z.string().optional().describe("The data URI of the generated image."),
});
export type GenerateZionCoreManifestationOutput = z.infer<typeof GenerateZionCoreManifestationOutputSchema>;

export async function generateZionCoreManifestation(input: GenerateZionCoreManifestationInput): Promise<GenerateZionCoreManifestationOutput> {
  return generateZionCoreManifestationFlow(input);
}

const generateZionCoreManifestationFlow = ai.defineFlow(
  {
    name: 'generateZionCoreManifestationFlow',
    inputSchema: GenerateZionCoreManifestationInputSchema,
    outputSchema: GenerateZionCoreManifestationOutputSchema,
  },
  async (input) => {
    try {
      const { media } = await ai.generate({
        model: 'googleai/gemini-3.1-flash-lite-image',
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
      return { imageUri: media?.url };
    } catch (error) {
      console.error("ZionCore Manifestation generation failed.", error);
      return { imageUri: undefined };
    }
  }
);
