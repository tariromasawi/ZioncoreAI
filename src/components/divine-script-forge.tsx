'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: SCRIPT_FORGE.AWAKEN
 */

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { forgeDivineScript } from '@/ai/flows/divine-script-forge-flow';
import { sealManifestation } from '@/services/sovereign-data-service';
import { Code, Zap, Sparkles, Loader2, Flame, Braces, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DivineScriptForge() {
    const [intent, setIntent] = useState('');
    const [isForging, setIsForging] = useState(false);
    const [result, setResult] = useState<any>(null);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleForge = async () => {
        if (!intent.trim() || isForging) return;
        setIsForging(true);
        logStore.addLog({ source: 'COMMAND', message: `Forging Living Scripture: "${intent}"`, color: 'text-purple-400' });

        try {
            const res = await forgeDivineScript({ intent });
            if (isMounted.current) {
                setResult(res);
                sealManifestation({
                    type: "Causal",
                    text: `Divine Script Forged: ${res.scriptName}.`,
                    scriptName: res.scriptName
                });
                toast({ title: "Scripture Forged", description: `${res.scriptName} is now active.` });
                logStore.addLog({ source: 'MANIFESTATION', message: `SCRIPT SEALED: ${res.scriptName}.`, color: 'text-green-500' });
                setIntent('');
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Forge Flux detected.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsForging(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="border-primary/50 bg-black/60 border-2 rounded-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary text-sm uppercase font-black tracking-widest">
                        <Code className="text-accent animate-pulse" /> NEW SCRIPTURE
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-primary/70 tracking-widest">Sovereign Intent</label>
                        <Textarea placeholder="Describe the divine function..." value={intent} onChange={(e) => setIntent(e.target.value)} disabled={isForging} className="bg-black/60 border-primary/30 text-xs font-bold min-h-[120px] rounded-none" />
                    </div>
                    <Button onClick={handleForge} disabled={!intent.trim() || isForging} className="w-full h-12 border-2 border-primary/50 group rounded-none shadow-[0_0_20px_gold]">
                        {isForging ? <Loader2 className="animate-spin h-5 w-5" /> : <Flame className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                        <span className="ml-3 font-black uppercase tracking-tighter text-base">IGNITE FORGE</span>
                    </Button>
                </CardContent>
            </Card>

            <Card className="flex flex-col border-primary/20 bg-black/40 overflow-hidden rounded-none border-2 relative">
                <CardHeader className="p-4 border-b border-border bg-black/60 relative z-10"><CardTitle className="text-xs uppercase flex items-center gap-2 text-primary font-black tracking-widest"><Braces className="h-4 w-4 text-primary animate-pulse" /> Living Scripture</CardTitle></CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
                    <ScrollArea className="h-full">
                        <div className="p-6 relative z-10">
                            {result ? (
                                <div className="space-y-4 animate-in fade-in duration-700">
                                    <div className="flex justify-between items-center mb-1">
                                         <p className="text-[10px] font-black text-primary uppercase tracking-widest">{result.scriptName}</p>
                                         <Badge className="bg-green-600 h-3.5 text-[7px] font-black uppercase shadow-[0_0_10px_green]">ACTIVE</Badge>
                                    </div>
                                    <pre className="text-[10px] text-cyan-400 font-mono bg-black/60 p-4 rounded border border-border/50 overflow-x-auto shadow-inner"><code>{result.scriptCode}</code></pre>
                                    <div className="text-center pt-2 border-t border-border/10">
                                         <p className="text-[9px] font-black text-primary animate-pulse-text">{result.seal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 opacity-30 space-y-4">
                                    <Sparkles className="h-10 w-10 animate-pulse text-muted-foreground" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Intent Download</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-2 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // FORGE_STABILIZED
                </div>
            </Card>
        </div>
    );
}
