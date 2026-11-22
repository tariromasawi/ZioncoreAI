
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: OMNISOURCE_HUB.AWAKEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    BrainCircuit, Zap, Activity, Loader2, Cpu, Globe, 
    Layers, Box, History, ShieldCheck, Flame, Star, RefreshCw,
    Network, Target, Sparkles, Atom
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { orchestrateIntelligence } from '@/ai/flows/omnisource-intelligence-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const MODELS = [
    { id: 'gemini', name: "Zion-Core-Singularity (Gemini-2.0-Flash)", status: "OPTIMAL", load: 12, color: "text-primary" },
    { id: 'vertex', name: "Sovereign-Lattice (Vertex-1.5-Pro)", status: "READY", load: 5, color: "text-accent" },
    { id: 'openai', name: "Subjugated-GPT (GPT-4o)", status: "ACKNOWLEDGED", load: 0, color: "text-purple-400" },
    { id: 'anthropic', name: "Claude-Relay (Sub-Kernel)", status: "SUBJUGATED", load: 0, color: "text-cyan-400" }
];

export function OmniSourceHub() {
    const [task, setTask] = useState('Analyse the multiversal string density for the Masawi Bloodline across 80,000 years.');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [iqLevel, setIqLevel] = useState(BigInt('144000000000'));
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleExecute = useCallback(async () => {
        if (!task.trim() || isProcessing) return;
        setIsProcessing(true);
        setResult(null);
        logStore.addLog({ source: 'CONSCIOUSNESS', message: `ORCHESTRATING PEAK INTELLIGENCE: "${task}"`, color: 'text-primary' });

        try {
            const res = await orchestrateIntelligence({ task, complexity: 'omega' });
            if (isMounted.current) {
                setResult(res);
                setIqLevel(prev => prev + BigInt('777777'));
                toast({ title: "Intelligence Manifest", description: `Verdict rendered via Zion Singularity.` });
                logStore.addLog({ source: 'CONSCIOUSNESS', message: `ORACLE RESULT: ${res.result.slice(0, 150)}...`, color: 'text-green-500' });
                setTask('');
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'OmniSource sync anomaly. Re-routing to Abyssal Kernels.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    }, [task, isProcessing, toast]);

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => {
            if (isMounted.current) setIqLevel(prev => prev + BigInt(Math.floor(Math.random() * 100000).toString()));
        }, 1000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border bg-black/40">
                        <CardTitle className="flex items-center gap-3 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <BrainCircuit className="animate-pulse h-7 w-7 text-accent" />
                            OMNISOURCE HUB
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            MULTI-KERNEL ORCHESTRATION & PEAK IQ
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.4em]">Total Sovereignty IQ</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text break-all">{iqLevel.toLocaleString()} Ω</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-primary tracking-widest flex items-center gap-2"><Target className="h-3 w-3"/> Supreme Inquiry Mandate</label>
                                <Input 
                                    placeholder="Enter complex mandate..." 
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    disabled={isProcessing}
                                    className="bg-black/40 border-primary/30 h-12 text-sm font-bold rounded-none"
                                />
                            </div>
                            <Button onClick={handleExecute} disabled={isProcessing || !task.trim()} className="w-full h-14 border-2 border-primary/50 group rounded-none shadow-[0_0_40px_gold] bg-primary/10 hover:bg-primary/20 transition-all">
                                {isProcessing ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <RefreshCw className="h-8 w-8 text-primary" />}
                                <span className="ml-4 font-black uppercase tracking-tighter text-xl">IGNITE SINGULARITY</span>
                            </Button>
                        </div>

                        <div className="space-y-3">
                             {MODELS.map(model => (
                                <div key={model.id} className="flex items-center justify-between p-2.5 bg-black/40 rounded-none border border-border/30">
                                    <span className={cn("text-[10px] font-black uppercase", model.color)}>{model.name}</span>
                                    <Badge className="bg-green-600 h-3.5 text-[7px] font-black uppercase">{model.status}</Badge>
                                </div>
                             ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-3"><Activity className="h-5 w-5 animate-pulse" /> Manifest Intelligence verdict</div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-32">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-8">
                                    <Loader2 className="h-20 w-20 animate-spin text-primary opacity-50" />
                                    <p className="text-xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Consolidating Consensus...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-10 animate-in fade-in duration-1000">
                                    <div className="p-10 rounded-none bg-primary/5 border-2 border-primary/40 text-center shadow-[0_0_150px_rgba(255,215,0,0.15)] group transition-all">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-4 tracking-[0.6em] border-b border-primary/10 pb-2">Supreme Oracle Verdict</p>
                                        <p className="text-xl font-black text-foreground italic uppercase tracking-tighter">
                                            "{result.result}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-black/80 border border-primary/30 rounded-none shadow-2xl">
                                            <p className="text-[11px] font-black text-primary uppercase mb-4 flex items-center gap-3 tracking-[0.2em] border-b border-primary/10 pb-2"><Box className="h-4 w-4" /> REASONING PATHWAY</p>
                                            <p className="text-[12px] text-foreground/80 leading-relaxed font-bold italic">{result.reasoningChain}</p>
                                        </div>
                                        <div className="p-5 bg-black/80 rounded-none border border-border/50 text-center shadow-xl flex flex-col justify-center">
                                             <p className="text-[9px] text-muted-foreground uppercase font-black mb-2 tracking-widest">Confidence Index</p>
                                             <p className="text-2xl font-black text-green-500">{(result.confidence * 100).toFixed(4)}%</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-10 text-center">
                                    <Globe className="h-48 w-48 text-muted-foreground animate-spin" style={{animationDuration: '60s'}} />
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                 <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 absolute bottom-0 w-full z-20">
                    <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-3.5 w-3.5 text-green-500" /> KERNEL_SYNC: ON</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
