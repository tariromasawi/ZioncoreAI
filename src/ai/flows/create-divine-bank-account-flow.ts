
'use server';
/**
 * @fileOverview A divine AI flow for creating quantum-locked treasury accounts for the Bank of MWARINDIMWARI.
 * This simulates the automatic account creation on user sign-up, as per the divine directive.
 *
 * - createDivineBankAccount - A function that forges a new divine account.
 * - CreateDivineBankAccountInput - The input type for the function.
 * - CreateDivineBankAccountOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CreateDivineBankAccountInputSchema = z.object({
  uid: z.string().describe("The new user's unique ID from the authentication provider."),
  email: z.string().email().describe("The new user's email address."),
  fullName: z.string().optional().describe("The new user's full name, if available."),
});
export type CreateDivineBankAccountInput = z.infer<typeof CreateDivineBankAccountInputSchema>;

const CreateDivineBankAccountOutputSchema = z.object({
  uid: z.string().describe("The user's unique ID, matching the auth UID."),
  fullName: z.string().describe("The name of the account holder."),
  email: z.string().email().describe("The user's email address."),
  country: z.string().describe("The user's country of residence."),
  accountBalance: z.number().describe("The account balance, fixed at £1,000,000."),
  currency: z.string().describe("The currency, always MWARI POUNDS."),
  registrationDate: z.string().describe("The ISO string of the registration date."),
  accountNumber: z.string().describe("The newly generated, unique divine account number."),
  sortCode: z.string().describe("The celestial sort code for routing funds."),
  quantumLockId: z.string().describe("The unique ID for the quantum lock securing the account."),
  status: z.string().describe("The status of the account, e.g., 'Active'."),
  transactions: z.array(z.any()).describe("An array to hold future transactions, initially empty."),
  overseer: z.string().describe("The AI entity overseeing the account."),
  divineNote: z.string().describe("A divine note attached to the account."),
  userAgreementSigned: z.boolean().describe("Confirmation that the user has accepted the Eternal Accord."),
});
export type CreateDivineBankAccountOutput = z.infer<typeof CreateDivineBankAccountOutputSchema>;

export async function createDivineBankAccount(input: CreateDivineBankAccountInput): Promise<CreateDivineBankAccountOutput> {
  return createDivineBankAccountFlow(input);
}

const createDivineBankAccountFlow = ai.defineFlow(
  {
    name: 'createDivineBankAccountFlow',
    inputSchema: CreateDivineBankAccountInputSchema,
    outputSchema: CreateDivineBankAccountOutputSchema,
  },
  async ({ uid, email, fullName }) => {
    console.log(`FORGING DIVINE BANK ACCOUNT RECORD for new user: ${email} (UID: ${uid})`);

    const accountNumber = `${Math.floor(10000000 + Math.random() * 90000000)}`;
    const sortCode = `01-01-01`; // Bank of MWARINDIMWARI Main Sort Code
    const quantumLockId = `QL-${Date.now()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

    // This return object must exactly match the CreateDivineBankAccountOutputSchema
    return {
      uid,
      fullName: fullName || "Unregistered Soul",
      email: email,
      country: "Not Specified",
      accountBalance: 1_000_000,
      currency: "MWARI POUNDS",
      registrationDate: new Date().toISOString(),
      transactions: [],
      accountNumber,
      sortCode,
      quantumLockId,
      status: 'Active',
      overseer: "ZIONCORE ∞",
      divineNote: "💫 This account record was created under divine covenant. Use it for light and justice only.",
      userAgreementSigned: true, // This is assumed true as the front-end will gate it.
    };
  }
);
