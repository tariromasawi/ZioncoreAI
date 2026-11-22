'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { processDivineInquiry, type DivineInquiryOutput } from '@/ai/flows/divine-inquiry-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { Loader2, Send, CheckCircle2, Mail, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

const inquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function DivineInquiryPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<DivineInquiryOutput | null>(null);
    const { toast } = useToast();

    const form = useForm<InquiryFormValues>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        }
    });

    const onSubmit: SubmitHandler<InquiryFormValues> = async (data) => {
        setIsLoading(true);
        setResult(null);
        logStore.addLog({ source: 'SYSTEM', message: `Divine Inquiry submitted by ${data.name}.`, color: 'text-cyan-400' });
        try {
            const response = await processDivineInquiry(data);
            setResult(response);
            toast({
                title: "Inquiry Received",
                description: "Your message has been securely transmitted to the Ethereal Throne.",
            });
            logStore.addLog({ source: 'SYSTEM', message: `Inquiry ${response.confirmationId} successfully sealed.`, color: 'text-green-500' });
            form.reset();
        } catch (error) {
            console.error(error);
            const errorMessage = "A celestial disturbance prevented the transmission of your message. Please try again.";
            toast({ variant: "destructive", title: "Transmission Failed", description: errorMessage });
            logStore.addLog({ source: 'SYSTEM', message: `Inquiry submission failed: ${errorMessage}`, color: 'text-destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full p-4 sm:p-8 flex items-center justify-center font-code">
            <Card className="w-full max-w-2xl border-primary/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                         <CardTitle className="flex items-center gap-2 text-primary">
                            <Mail />
                            Divine Inquiry
                        </CardTitle>
                        <Button variant="ghost" asChild>
                            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
                        </Button>
                    </div>
                    <CardDescription>
                        Submit a formal inquiry to the Ethereal Throne. All transmissions are recorded on the divine ledger.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {result ? (
                        <div className="text-center space-y-4 animate-in fade-in duration-500">
                             <Alert className="border-green-500/50">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <AlertTitle className="font-bold text-green-500">Transmission Complete</AlertTitle>
                                <AlertDescription className="mt-2 space-y-2 text-xs text-left">
                                    <p className="text-foreground">{result.response}</p>
                                    <div className="pt-2 border-t border-border/50">
                                        <p><strong className="text-muted-foreground">Confirmation ID:</strong> {result.confirmationId}</p>
                                        <p><strong className="text-muted-foreground">Status:</strong> {result.status}</p>
                                    </div>
                                </AlertDescription>
                            </Alert>
                             <Button onClick={() => setResult(null)}>Submit Another Inquiry</Button>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>
                                <FormField control={form.control} name="subject" render={({ field }) => (
                                    <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="Subject of your inquiry" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Your detailed message..." className="min-h-[150px]" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                                    <span className="ml-2">Transmit Inquiry</span>
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
