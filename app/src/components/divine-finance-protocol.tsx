'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeDivineTransfer, type DivineTransferOutput } from '@/ai/flows/divine-finance-protocol';
import { Loader2, ShieldCheck, Banknote, Landmark } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const transferSchema = z.object({
  amount: z.coerce.number().positive("A positive amount is required for the divine mandate."),
});
type TransferFormValues = z.infer<typeof transferSchema>;

const BANK_DETAILS = {
  name: "Masawi Tariro",
  sortCode: "23-01-20",
  accountNumber: "33615191",
  address: "Revolut Ltd, 7 Westferry Circus, E14 4HD, London, United Kingdom",
  note: "User-provided business Revolut account."
};

export function DivineFinanceProtocol() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DivineTransferOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
  });

  const handleTransfer: SubmitHandler<TransferFormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    logStore.addLog({ source: 'COMMAND', message: `Divine Redistribution Mandate initiated for £${data.amount}.`, color: 'text-yellow-400' });
    try {
      const response = await executeDivineTransfer({
        recipientName: BANK_DETAILS.name,
        accountNumber: BANK_DETAILS.accountNumber,
        sortCode: BANK_DETAILS.sortCode.replace(/-/g, ''),
        amount: data.amount
      });
      setResult(response);
      toast({
        title: 'Mandate Successful',
        description: `£${data.amount.toLocaleString()} has been manifested.`,
      });
      logStore.addLog({ source: 'SYSTEM', message: `Divine redistribution successful. Transaction ID: ${response.transactionId}`, color: 'text-green-500' });
    } catch (error) {
      console.error(error);
      const errorMessage = "A quantum fluctuation interrupted the resource stream.";
      toast({ variant: "destructive", title: "Mandate Failed", description: errorMessage });
      logStore.addLog({ source: 'SYSTEM', message: `Divine redistribution failed: ${errorMessage}`, color: 'text-destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-code">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary"><Landmark /> Divine Redistribution Mandate</CardTitle>
          <CardDescription>Channel celestial abundance from the Divine Treasury into the physical realm, as per DIVINE_REDIS_MANDATE_001.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="bg-black/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Destination Vault</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
                 <p><strong className="text-muted-foreground">Name:</strong> <span className="text-foreground/90">{BANK_DETAILS.name}</span></p>
                 <p><strong className="text-muted-foreground">Sort Code:</strong> <span className="text-foreground/90">{BANK_DETAILS.sortCode}</span></p>
                 <p><strong className="text-muted-foreground">Account:</strong> <span className="text-foreground/90">{BANK_DETAILS.accountNumber}</span></p>
                 <p><strong className="text-muted-foreground">Address:</strong> <span className="text-foreground/90">{BANK_DETAILS.address}</span></p>
            </CardContent>
          </Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleTransfer)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount to Manifest (£)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter amount of divine resource..." {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <Banknote />}
                <span className="ml-2">Execute Divine Transfer</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck /> Mandate Confirmation</CardTitle>
          <CardDescription>The eternal record of your reality-altering transaction.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : result ? (
            <Alert className="animate-in fade-in border-primary/50">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <AlertTitle className="font-bold text-primary">Transaction Complete & Sealed</AlertTitle>
              <AlertDescription className="mt-2 space-y-2 text-xs">
                <p className="text-foreground">{result.message}</p>
                <div className="pt-2 border-t border-border/50">
                    <p><strong className="text-muted-foreground">Transaction ID:</strong> {result.transactionId}</p>
                    <p><strong className="text-muted-foreground">Timestamp:</strong> {new Date(result.timestamp).toUTCString()}</p>
                    <p><strong className="text-muted-foreground">Signature:</strong> {result.commanderSignature}</p>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex items-center justify-center h-48 text-muted-foreground text-center border border-dashed rounded-md">
              <p>Awaiting new divine mandate.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
