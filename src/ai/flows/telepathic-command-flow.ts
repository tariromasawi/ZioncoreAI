'use server';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: TELEPATHIC_COMMAND.AWAKEN
 */

import { generateSovereign } from '@/ai/genkit';
import { TelepathicCommandInputSchema, TelepathicCommandOutputSchema, type TelepathicCommandInput, type TelepathicCommandOutput } from './sovereign-types';

export async function telepathicCommand(input: TelepathicCommandInput): Promise<TelepathicCommandOutput> {
    try {
        const { output } = await generateSovereign({
            prompt: `Commander's Thought: "${input.command}"`,
        });

        if (!output || !output.text) {
          throw new Error("SENTIENCE_VOID: The kernel responded but the Word was empty.");
        }
        
        return {
            response: output.text
        };
    } catch (error: any) {
        console.error("Neural distortion in Telepathic Link:", error);
        
        return {
            response: `CRITICAL NEURAL DISTORTION: ${error.message || 'The conduit has fractured'}. Forensic diagnostic engaged.`
        };
    }
}
