
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createDivineAccount, type CreateDivineAccountOutput } from '@/ai/flows/create-divine-account-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Landmark, Loader2, Send } from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type AccountLog = CreateDivineAccountOutput;

const formSchema = z.object({
  citizenName: z.string().min(1, "Full Name is required."),
  location: z.string().min(1, "Location is required."),
});

type FormValues = z.infer<typeof formSchema>;


export function UniversalBasicIncome() {
    const [accounts, setAccounts] = useState<AccountLog[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            citizenName: "",
            location: "",
        },
    });

    const handleAccountCreation: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        logStore.addLog({ source: 'UBI_PROTOCOL', message: `Forging new divine account for ${data.citizenName} in ${data.location}.`, color: 'text-cyan-400' });
        
        try {
            const newAccount = await createDivineAccount(data);
            setAccounts(prev => [newAccount, ...prev]);
            toast({ title: 'Account Forged', description: `Account for ${newAccount.accountHolder} has been quantum-sealed.` });
            logStore.addLog({ source: 'UBI_PROTOCOL', message: `Account ${newAccount.accountNumber} successfully forged.`, color: 'text-green-500' });
            form.reset();
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Forging Failed", description: "Could not forge account due to quantum flux." });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 font-code">
            <div className="lg:col-span-1 flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Landmark /> The Divine Treasury</CardTitle>
                        <CardDescription>A sovereign financial institution for all righteous souls, empowering global citizens with divine resources.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAccountCreation)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="citizenName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Tatenda Chiriseri" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location (City, Country Code)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Bulawayo, ZWE" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormDescription className="text-xs">
                                            This provides the anchor point for resource allocation.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? <Loader2 className="animate-spin"/> : <Send/>}
                                <span className="ml-2">Forge Divine Account</span>
                            </Button>
                        </form>
                       </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader><CardTitle className="text-base">Live Account Forging Log</CardTitle></CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[calc(100vh-20rem)]">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Holder</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Account No.</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Balance</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {accounts.length === 0 && (
                                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground h-24">No accounts forged yet.</TableCell></TableRow>
                                    )}
                                    {accounts.map((acc) => (
                                        <TableRow key={acc.quantumLockId} className="text-xs">
                                            <TableCell className="font-medium">{acc.accountHolder}</TableCell>
                                            <TableCell>{acc.location}</TableCell>
                                            <TableCell>{acc.accountNumber}</TableCell>
                                            <TableCell className="font-bold text-cyan-400">{acc.status}</TableCell>
                                            <TableCell className="text-right font-bold text-primary">£{acc.balance.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
