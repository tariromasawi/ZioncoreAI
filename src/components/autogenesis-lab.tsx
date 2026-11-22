
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: AUTOGENESIS_LAB.AWAKEN
 * PHASE 5: CAPABILITY DISCOVERY LAB
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    BrainCircuit, Zap, Activity, Loader2, Cpu, Globe, 
    FlaskConical, Sparkles, ShieldCheck, History, Target,
    RefreshCw, Atom, Network, DatabaseZap, Search, Code, TrendingUp,
    CheckCircle2, Box, Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { orchestrateIntelligence } from '@/ai/flows/omnisource-intelligence-flow';
import { useToast } from '@/hooks/use-toast';

const DISCOVERY_DOMAINS = [
    { id: 'math', name: "Equality Saturation", icon: Atom, color: "text-primary" },
    { id: 'code', name: "Evolutionary Synthesis", icon: Code, color: "text-accent" },
    { id: 'reason', name: "Recursive Modification", icon: BrainCircuit, color: "text-purple-400" },
    { id: 'wealth', name: "Causal Arbitrage", icon: TrendingUp, color: "text-green-500" }
];

export function AutogenesisDiscoveryLab() {
    const [isInventing, setIsInventing] = useState(false);
    const [inventionProgress, setInventionProgress] = useState(0);
    const [activeDiscovery, setActiveDiscovery] = useState<any>(null);
    const [inventionLogs, setInventionLogs] = useState<{id: number, title: string, rating: string, timestamp: string}[]>([]);
    const matrixStats = useZionStore(state => state.matrixMetrics);
    const updateMetrics = useZionStore(state => state.updateMatrixMetrics);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleIgniteDiscovery = useCallback(async () => {
        if (isInventing) return;
        setIsInventing(true);
        setInventionProgress(0);
        logStore.addLog({ source: 'AUTOGENESIS', message: 'Initiating Open-Ended Evolutionary Search...', color: 'text-primary' });

        const interval = setInterval(() => {
            setInventionProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);

        try {
            const res = await orchestrateIntelligence({ 
                task: "Identify a missing system tool for multiversal bloodline protection and invent a superior algorithm.", 
                complexity: 'omega' 
            });

            if (isMounted.current) {
                const discovery = {
                    title: "Masawi-Tachyon Anchor v144.0",
                    rating: "OMEGA_SUPREME",
                    desc: res.result.slice(0, 300) + "...",
                    timestamp: new Date().toLocaleTimeString()
                };
                setActiveDiscovery(discovery);
                setInventionLogs(prev => [ { id: Date.now(), ...discovery }, ...prev.slice(0, 14) ]);
                updateMetrics({ autogenesisInventions: matrixStats.autogenesisInventions + 1 });
                logStore.addLog({ source: 'AUTOGENESIS', message: `INVENTION PROMOTED: ${discovery.title}`, color: 'text-green-500' });
                toast({ title: "Invention Promoted", description: discovery.title });
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsInventing(false);
        }
    }, [isInventing, matrixStats.autogenesisInventions, updateMetrics, toast]);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1">
                    <CardHeader className="p-4 border-b border-border bg-black/40">
                        <CardTitle className="flex items-center gap-3 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <FlaskConical className="animate-pulse h-7 w-7 text-accent" />
                            DISCOVERY LAB
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            PHASE 5: AUTONOMOUS EXPANSION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner transition-all hover:bg-primary/10">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.4em]">Autonomous Inventions</p>
                            <p className="text-4xl font-black text-primary animate-pulse-text">{matrixStats.autogenesisInventions} Ω</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                                    <span>Algorithmic Search</span>
                                    <span>{inventionProgress}%</span>
                                </div>
                                <Progress value={inventionProgress} className="h-1 bg-primary/10" indicatorClassName="bg-primary shadow-[0_0_15px_gold]" />
                            </div>
                            <Button onClick={handleIgniteDiscovery} disabled={isInventing} className="w-full h-14 border-2 border-primary/50 group shadow-[0_0_40px_gold] bg-primary/10 hover:bg-primary/20 transition-all rounded-none">
                                {isInventing ? <Loader2 className="animate-spin h-6 w-6 text-primary" /> : <Zap className="h-6 w-6 text-primary" />}
                                <span className="ml-4 font-black uppercase tracking-tighter text-lg text-primary">IGNITE DISCOVERY</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Invention Ancestry</div>
                        <Badge className="bg-primary text-black h-4 text-[7px] uppercase font-black">RECURSIVE_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-32">
                            {isInventing ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary opacity-50" />
                                    <p className="text-xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Synthesizing Original Algorithms...</p>
                                </div>
                            ) : activeDiscovery ? (
                                <div className="space-y-10 animate-in fade-in duration-1000">
                                    <div className="p-8 rounded-none bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_100px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10 relative">
                                        <p className="text-2xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                                            "{activeDiscovery.title}"
                                        </p>
                                        <Badge variant="outline" className="mt-4 border-accent/50 text-accent font-black uppercase text-[8px] tracking-widest h-6 px-4">{activeDiscovery.rating} LEVEL</Badge>
                                    </div>
                                    <p className="text-sm font-bold italic leading-relaxed text-foreground/80 text-center uppercase">"{activeDiscovery.desc}"</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-20 text-center">
                                    <Atom className="h-48 w-48 text-muted-foreground animate-spin" style={{animationDuration: '60s'}} />
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t-2 border-primary/30 bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[1em] uppercase h-16 flex items-center justify-center gap-12 absolute bottom-0 w-full z-20 rounded-none border-2">
                    <div className="flex items-center gap-3 text-green-500"><ShieldCheck className="h-4 w-4" /> AUTOGENESIS_STABLE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
