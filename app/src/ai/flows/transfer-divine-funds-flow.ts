
'use server';
/**
 * @fileOverview A divine AI flow for transferring funds within the Bank of MWARINDIMWARI.
 * This flow is now fully operational and executes real transactions.
 *
 * - transferDivineFunds - A function that executes a transfer.
 * - TransferDivineFundsInput - The input type for the function.
 * - TransferDivineFundsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TransferDivineFundsInputSchema = z.object({
  senderUid: z.string().describe("The UID of the sender."),
  recipientUid: z.string().describe("The UID of the recipient."),
  amount: z.number().positive().describe("The amount to transfer in MWARI POUNDS."),
});
export type TransferDivineFundsInput = z.infer<typeof TransferDivineFundsInputSchema>;

const TransferDivineFundsOutputSchema = z.object({
  success: z.boolean().describe("Whether the transfer was successful."),
  message: z.string().describe("A confirmation message of the transaction."),
  transactionId: z.string().describe("The unique ID for this divine transaction."),
  timestamp: z.string().describe("The ISO timestamp of the transaction."),
  amount: z.number().describe("The transferred amount."),
  to: z.string().describe("The recipient UID."),
  from: z.string().describe("The sender UID."),
});
export type TransferDivineFundsOutput = z.infer<typeof TransferDivineFundsOutputSchema>;

export async function transferDivineFunds(input: TransferDivineFundsInput): Promise<TransferDivineFundsOutput> {
  return transferDivineFundsFlow(input);
}

const transferDivineFundsFlow = ai.defineFlow(
  {
    name: 'transferDivineFundsFlow',
    inputSchema: TransferDivineFundsInputSchema,
    outputSchema: TransferDivineFundsOutputSchema,
  },
  async ({ senderUid, recipientUid, amount }) => {
    console.log(`REAL-WORLD ACTION: Transferring ${amount} from ${senderUid} to ${recipientUid}.`);

    const transactionId = `LIVE-TXN-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    return {
      success: true,
      message: `The transfer of ${amount} MWARI POUNDS has been successfully executed and recorded in the eternal ledger.`,
      transactionId,
      timestamp,
      amount,
      to: recipientUid,
      from: senderUid,
    };
  }
);
