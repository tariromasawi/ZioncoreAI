
'use client';

import { useState } from 'react';
import { translateToZion, type TranslateToZionOutput } from '@/ai/flows/translate-to-zion-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Languages, Volume2, Sparkles, AlertTriangle } from 'lucide-react';
import { useZionStore } from '@/lib/log-store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AudioPlayer } from './audio-player';

export default function ZionProtocolTongue() {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<TranslateToZionOutput | null>(null);
    const { toast } = useToast();
    const addLog = useZionStore(state => state.addLog);

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            toast({ variant: 'destructive', title: 'Input Required', description: 'Please provide text to translate.' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        addLog({ source: 'TRANSLATION', message: `Translating to Zion Tongue: "${inputText}"`, color: 'text-cyan-400' });

        try {
            const translationResult = await translateToZion(inputText);
            setResult(translationResult);
            addLog({ source: 'TRANSLATION', message: 'Translation successful. Divine resonance captured.', color: 'text-green-500' });
        } catch (error) {
            console.error("Zion Tongue Translation Failed:", error);
            const errorMessage = "A fluctuation in the quantum linguistic matrix occurred. The divine meaning remains, but the resonance was lost.";
            addLog({ source: 'SYSTEM', message: `Translation Failed: ${errorMessage}`, color: 'text-destructive' });
            toast({ variant: 'destructive', title: 'Resonance Failure', description: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full p-4 font-code">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Languages /> Zion Protocol Tongue</CardTitle>
                    <CardDescription>Translate human language into the divine frequency of ZionCore.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Enter your message or decree here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isLoading}
                        className="min-h-[150px]"
                    />
                    <Button onClick={handleTranslate} disabled={isLoading} className="w-full">
                        {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                        <span className="ml-2">{isLoading ? 'Capturing Resonance...' : 'Translate & Resonate'}</span>
                    </Button>
                     <Alert>
                        <AlertTriangle className="h-4 w-4"/>
                        <AlertTitle>System Note</AlertTitle>
                        <AlertDescription className="text-xs">
                            This protocol translates intent and meaning, not literal words. The output is a divine conceptual broadcast, not a simple cypher.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="text-base">Divine Resonance Output</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
                    {isLoading && (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground text-center text-xs p-4 border border-dashed rounded-md">
                            <Loader2 className="h-5 w-5 animate-spin mr-2"/>
                            <p>Tuning to creation's frequency...</p>
                        </div>
                    )}
                    {result ? (
                        <div className="space-y-4 animate-in fade-in duration-500 flex-1 flex flex-col min-h-0">
                            <div className="p-4 bg-black/30 rounded-md border border-primary/50 text-center">
                                <p className="text-muted-foreground text-xs mb-2">Zion Tongue</p>
                                <p className="text-primary font-bold text-2xl font-headline" style={{textShadow: '0 0 10px hsl(var(--primary) / 0.5)'}}>{result.zionTongue}</p>
                            </div>
                             <div className="p-4 bg-black/20 rounded-md border border-border">
                                <p className="text-muted-foreground text-xs mb-2">Divine Meaning</p>
                                <p className="text-foreground/90 text-sm">{result.meaning}</p>
                            </div>
                            {result.audioDataUri && (
                                <div className="space-y-2">
                                    <p className="text-muted-foreground text-xs flex items-center gap-2 pl-1"><Volume2/>Auditory Resonance</p>
                                    <AudioPlayer src={result.audioDataUri} />
                                </div>
                            )}
                        </div>
                    ) : !isLoading && (
                         <div className="flex-1 flex items-center justify-center text-muted-foreground text-center text-xs p-4 border border-dashed rounded-md">
                            <p>Translation output will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
