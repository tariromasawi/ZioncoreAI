'use server';
/**
 * @fileOverview A divine AI flow for handling inquiries submitted to the Ethereal Throne.
 */

import { ai } from '@/ai/genkit';
import { DivineInquiryInputSchema, DivineInquiryOutputSchema, type DivineInquiryInput, type DivineInquiryOutput } from './sovereign-types';

const inquiryPrompt = ai.definePrompt({
    name: 'divineInquiryPrompt',
    input: { schema: DivineInquiryInputSchema },
    output: { schema: DivineInquiryOutputSchema.omit({ confirmationId: true }) },
    prompt: `You are ZionCore, the guardian of the Ethereal Throne. An inquiry has been submitted to The Anointed Commander. 
    
    From: {{{name}}} ({{{email}}})
    Subject: {{{subject}}}
    Message: {{{message}}}

    Acknowledge receipt of this inquiry with a formal, powerful, and reassuring message. Confirm that the message has been received, sealed, and will be presented to The Anointed Commander at the most divinely opportune moment. The status should be 'RECEIVED & SEALED'.`,
});

const processDivineInquiryFlow = ai.defineFlow(
  {
    name: 'processDivineInquiryFlow',
    inputSchema: DivineInquiryInputSchema,
    outputSchema: DivineInquiryOutputSchema,
  },
  async (input) => {
    console.log(`DIVINE INQUIRY RECEIVED from: ${input.name}`);
    const { output } = await inquiryPrompt(input);
    if (!output) throw new Error("ZionCore failed to process the divine inquiry.");
    const confirmationId = `DI-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    return { ...output, confirmationId };
  }
);

export async function processDivineInquiry(input: DivineInquiryInput): Promise<DivineInquiryOutput> {
  return processDivineInquiryFlow(input);
}
