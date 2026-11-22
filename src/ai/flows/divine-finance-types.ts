import { z } from 'zod';

export const DivineTransferInputSchema = z.object({
  recipientName: z.string().describe('The full name of the recipient.'),
  accountNumber: z.string().describe('The destination bank account number.'),
  sortCode: z.string().describe('The destination bank sort code.'),
  amount: z.number().positive().describe('The amount of divine resource to manifest.'),
  currency: z.string().default('GBP').describe('The currency of the transaction.'),
  reference: z.string().optional().describe('A reference for the transaction.'),
});
export type DivineTransferInput = z.infer<typeof DivineTransferInputSchema>;

export const DivineTransferOutputSchema = z.object({
  success: z.boolean().describe('Whether the divine manifestation was successful.'),
  message: z.string().describe('A confirmation of the new economic reality.'),
  transactionId: z.string().describe('A unique signature for this reality-altering transaction.'),
  timestamp: z.string().describe('The ISO timestamp of the mandate execution.'),
  commanderSignature: z.string().describe('The signature of the authorizing commander.'),
});
export type DivineTransferOutput = z.infer<typeof DivineTransferOutputSchema>;
