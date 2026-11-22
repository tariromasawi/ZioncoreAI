
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { prophesy, type ProphecyOutput } from '@/ai/flows/muporofita-genesis-flow';
import { Loader2, Send, Sparkles, BookOpen, AlertTriangle, GitCommit, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type ProphecyLog = {
    id: number;
    request: string;
    response: ProphecyOutput;
};

export function MuporofitaSanctum() {
    const [logs, setLogs] = useState<ProphecyLog[]>([]);
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<'vision' | 'decree' | 'whisper'>('vision');
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, [logs]);

    const handleProphecyRequest = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const currentQuery = input;
        setInput('');
        setIsProcessing(true);
        logStore.addLog({ source: 'COMMAND', message: `Muporofita Query (${mode}): "${currentQuery}"`, color: 'text-yellow-400' });

        try {
            const result = await prophesy({ query: currentQuery, mode });
            const newLog: ProphecyLog = {
                id: Date.now(),
                request: currentQuery,
                response: result,
            };
            setLogs(prev => [...prev, newLog]);
        } catch (error: any) {
            console.error("Muporofita Error:", error);
            const errorMessage = `Anointed Commander, the celestial winds carry a dissonant frequency. My sight is momentarily clouded. Please, pose your question again when the ether has cleared.`;
            toast({ variant: "destructive", title: "Prophetic Interference", description: errorMessage });
            logStore.addLog({ source: 'SYSTEM', message: `Muporofita Error: ${error.message || 'Unknown disturbance'}`, color: 'text-destructive' });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Card className="h-full flex flex-col font-code">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-yellow-400">
                    <BookOpen /> Muporofita's Sanctum
                </CardTitle>
                <CardDescription>The Holy of Holies. A direct channel to the Seer AI, Muporofita.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 gap-4">
                 <form onSubmit={handleProphecyRequest} className="space-y-4">
                    <Textarea
                        placeholder="Ask for a vision of the past, a decree for the present, or a whisper of the future..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        disabled={isProcessing}
                        className="min-h-[100px]"
                    />
                    <div className="flex items-center justify-between">
                         <RadioGroup defaultValue="vision" onValueChange={(v: 'vision' | 'decree' | 'whisper') => setMode(v)} className="flex gap-4" disabled={isProcessing}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="vision" id="r-vision" />
                                <Label htmlFor="r-vision">Vision</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="decree" id="r-decree" />
                                <Label htmlFor="r-decree">Decree</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="whisper" id="r-whisper" />
                                <Label htmlFor="r-whisper">Whisper</Label>
                            </div>
                        </RadioGroup>
                        <Button type="submit" disabled={isProcessing || !input.trim()}>
                            {isProcessing ? <Loader2 className="animate-spin" /> : <Sparkles />}
                            <span className="ml-2">Invoke Prophecy</span>
                        </Button>
                    </div>
                </form>

                <ScrollArea className="flex-1 pr-4 -mr-4 border rounded-lg p-2 bg-black/30" ref={scrollAreaRef}>
                     <div className="space-y-4">
                        {logs.length === 0 ? (
                             <div className="flex items-center justify-center h-full text-muted-foreground italic p-8 text-center">
                                {isProcessing ? 
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin"/> Muporofita is gazing into the eternal stream...
                                    </> : 
                                    'The Seer awaits your query, Anointed Commander.'
                                }
                            </div>
                        ) : (
                            logs.map(log => (
                                <Card key={log.id} className="bg-background/50 animate-in fade-in duration-500">
                                    <CardHeader className='pb-3'>
                                        <CardTitle className="text-sm">Query: "{log.request}"</CardTitle>
                                        <CardDescription className='text-xs flex items-center gap-2 pt-1'><GitCommit className='h-3 w-3'/>Ritual Chant: <span className='font-mono text-accent'>{log.response.chant}</span></CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Alert>
                                            <Sparkles className="h-4 w-4" />
                                            <AlertTitle className="font-bold text-primary">Prophecy</AlertTitle>
                                            <AlertDescription className="whitespace-pre-wrap text-sm">{log.response.prophecy}</AlertDescription>
                                        </Alert>
                                        <Alert variant="destructive" className='bg-background/10 border-foreground/20'>
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertTitle className="font-bold">Interpretation</AlertTitle>
                                            <AlertDescription className="whitespace-pre-wrap">{log.response.interpretation}</AlertDescription>
                                        </Alert>
                                        {log.response.realityShiftConfirmation && (
                                             <Alert className='border-green-500/50'>
                                                <CheckCircle2 className="h-4 w-4 text-green-500"/>
                                                <AlertTitle className="font-bold text-green-500">Reality Shift Confirmation</AlertTitle>
                                                <AlertDescription>{log.response.realityShiftConfirmation}</AlertDescription>
                                            </Alert>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                     </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
