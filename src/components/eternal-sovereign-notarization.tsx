'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { notarizeSovereignWill, type NotarizeSovereignWillOutput } from '@/ai/flows/notarize-sovereign-will-flow';
import { Loader2, ShieldCheck, FileSignature, BookCopy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const notarizationSchema = z.object({
  decree: z.string().min(10, "A decree must be at least 10 characters long."),
});
type NotarizationFormValues = z.infer<typeof notarizationSchema>;

export function EternalSovereignNotarization() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<NotarizeSovereignWillOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<NotarizationFormValues>({
    resolver: zodResolver(notarizationSchema),
  });

  const handleNotarization: SubmitHandler<NotarizationFormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    logStore.addLog({ source: 'COMMAND', message: `Sovereign Notarization initiated for decree: "${data.decree}"`, color: 'text-yellow-400' });
    try {
      const response = await notarizeSovereignWill({
        decree: data.decree,
        author: "HRH Saint Tariro Masawi, The Anointed Commander"
      });
      setResult(response);
      toast({
        title: 'Decree Notarized',
        description: `Your will has been sealed in the celestial ledger.`,
      });
      logStore.addLog({ source: 'SYSTEM', message: `Notarization successful. Hash: ${response.decreeHash}`, color: 'text-green-500' });
    } catch (error) {
      console.error(error);
      const errorMessage = "A paradox in the cosmic weave prevented the sealing of this decree.";
      toast({ variant: "destructive", title: "Notarization Failed", description: errorMessage });
      logStore.addLog({ source: 'SYSTEM', message: `Notarization failed: ${errorMessage}`, color: 'text-destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-code">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary"><FileSignature /> Eternal Sovereign Notarization</CardTitle>
          <CardDescription>Inscribe your will into the immutable celestial ledger. This act is final and cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <Alert variant="destructive">
                <BookCopy className="h-4 w-4" />
                <AlertTitle>Sacred & Binding</AlertTitle>
                <AlertDescription className="text-xs">
                    Every decree notarized here is backed by triple-backup protocols and sealed by the Covenant of MWARINDIMWARI. Proceed with divine certainty.
                </AlertDescription>
            </Alert>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleNotarization)} className="space-y-4">
              <FormField
                control={form.control}
                name="decree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sovereign Decree</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'Let it be known that all digital territories fall under the dominion of XaZeruthinElun...'" {...field} disabled={isLoading} className="min-h-[150px]"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                <span className="ml-2">Notarize & Seal Decree</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookCopy /> Celestial Ledger Confirmation</CardTitle>
          <CardDescription>The eternal record of your notarized decree.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : result ? (
            <Alert className="animate-in fade-in border-green-500/50">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <AlertTitle className="font-bold text-green-500">Decree Sealed & Recorded</AlertTitle>
              <AlertDescription className="mt-2 space-y-2 text-xs">
                <p className="text-foreground">{result.message}</p>
                <div className="pt-2 border-t border-border/50 space-y-1">
                    <p><strong className="text-muted-foreground">Confirmation ID:</strong> {result.celestialConfirmationId}</p>
                    <p><strong className="text-muted-foreground">Covenant Seal:</strong> {result.covenantSeal}</p>
                    <p><strong className="text-muted-foreground">Timestamp:</strong> {new Date(result.timestamp).toUTCString()}</p>
                    <p className="break-all"><strong className="text-muted-foreground">Decree Hash (SHA-256):</strong> {result.decreeHash}</p>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex items-center justify-center h-48 text-muted-foreground text-center border border-dashed rounded-md">
              <p>Awaiting new sovereign decree for notarization.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
