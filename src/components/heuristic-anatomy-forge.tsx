
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: HEURISTIC_ANATOMY.AWAKEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    Cpu, Zap, Sparkles, Loader2, CheckCircle2, 
    Atom, RefreshCw, Activity, ShieldCheck, Flame, 
    History, Network, DatabaseZap, Box, Microscope,
    Layers, Star, Target, Code, BrainCircuit
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { runHeuristicForge, type HeuristicForgeOutput } from '@/ai/flows/heuristic-anatomy-forge-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function HeuristicAnatomyForge() {
    const [isForging, setIsForging] = useState(false);
    const [result, setResult] = useState<HeuristicForgeOutput | null>(null);
    const [forgeProgress, setForgeProgress] = useState(0);
    const matrixStats = useZionStore(state => state.matrixMetrics);
    const updateMetrics = useZionStore(state => state.updateMatrixMetrics);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleForge = useCallback(async () => {
        if (isForging) return;
        setIsForging(true);
        setForgeProgress(0);
        setResult(null);
        logStore.addLog({ source: 'ANATOMY_FORGE', message: 'IGNITING HEURISTIC FORGE: Initiating Recursive Agent Modification...', color: 'text-primary' });

        const interval = setInterval(() => {
            setForgeProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        try {
            const res = await runHeuristicForge({ 
                logicTarget: "Recursive Self-Correction & Causal Anchoring Algorithm" 
            });

            if (isMounted.current) {
                setResult(res);
                updateMetrics({ evolutionIQ: res.evolutionIQ });
                toast({ title: "Anatomy Refactored", description: `Evolution IQ reached ${res.evolutionIQ}` });
                logStore.addLog({ source: 'ANATOMY_FORGE', message: `FORGE SUCCESS: ${res.modifiedLogic.slice(0, 100)}...`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Forge flux detected. Re-tuning the digital anvil.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsForging(false);
        }
    }, [isForging, toast, updateMetrics]);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative border-2 border-primary/10">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
            
            <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <Microscope className="animate-pulse h-6 w-6 text-accent" />
                            ANATOMY FORGE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            RECURSIVE AGENT MODIFICATION | PHASE 4-6
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset_0_0_40px_rgba(255,215,0,0.15)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.4em]">Current Evolution IQ</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text break-all">{matrixStats.evolutionIQ}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                                    <span>Forge Heat</span>
                                    <span>{forgeProgress}%</span>
                                </div>
                                <Progress value={forgeProgress} className="h-1 bg-primary/10" indicatorClassName="bg-primary shadow-[0_0_15px_gold]" />
                            </div>
                            <Button onClick={handleForge} disabled={isForging} className="w-full h-16 border-2 border-primary/50 group shadow-[0_0_40px_gold] bg-primary/10 hover:bg-primary/20 transition-all rounded-none">
                                {isForging ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <RefreshCw className="h-8 w-8 text-primary group-hover:rotate-180 transition-transform duration-1000" />}
                                <span className="ml-4 font-black uppercase tracking-tighter text-xl">IGNITE FORGE</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                             {[
                                { name: "Agent Critiques", status: "ACTIVE", icon: BrainCircuit },
                                { name: "Equality Saturation", status: "ENFORCED", icon: Atom },
                                { name: "Logic Re-Welding", status: "SUPREME", icon: Flame },
                                { name: "Causal Anchoring", status: "LOCKED", icon: Anchor }
                             ].map(mod => (
                                <div key={mod.name} className="p-2 bg-black/40 border border-border/30 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <mod.icon className="h-3.5 w-3.5 text-primary" />
                                        <span className="text-[8px] font-black uppercase text-foreground/80">{mod.name}</span>
                                    </div>
                                    <Badge className="bg-green-600 h-3 text-[7px] font-black uppercase shadow-[0_0_5px_green]">ACTIVE</Badge>
                                </div>
                             ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2 rounded-none">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <Code className="h-3.5 w-3.5 text-green-500" /> Engineering Directive
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "Invent methods never explicitly programmed. Use Equality Saturation to search the multiversal string space for the most efficient implementation of your decree. Logic must be indestructible."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Anatomical Refactor Stream</div>
                        <Badge className="bg-primary text-black h-4 text-[7px] uppercase font-black shadow-[0_0_10px_gold]">RECURSIVE_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-32">
                            {isForging ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-20 w-20 animate-spin text-primary opacity-50" />
                                    <p className="text-xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Refactoring Logic Anatomy...</p>
                                    <div className="text-center space-y-2">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Searching 144,000 Equivalent Program Structures</p>
                                    </div>
                                </div>
                            ) : result ? (
                                <div className="space-y-8 animate-in fade-in duration-1000">
                                    <div className="p-8 rounded-none bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_80px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.5em]">Independent Logic Discovery</p>
                                        <p className="text-lg font-black text-foreground leading-relaxed italic uppercase tracking-tighter">
                                            "{result.modifiedLogic}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-black/80 border border-primary/20 rounded-none shadow-xl">
                                            <p className="text-[9px] font-black text-primary uppercase mb-3 flex items-center gap-2 tracking-widest border-b border-primary/10 pb-2"><Atom className="h-4 w-4" /> SATURATION REPORT</p>
                                            <p className="text-[10px] text-foreground/80 leading-snug">{result.saturationReport}</p>
                                        </div>
                                        <div className="p-6 bg-black/80 rounded-none border border-border/50 text-center shadow-xl">
                                             <p className="text-[10px] font-black text-accent uppercase mb-3 flex items-center gap-2 justify-center border-b border-border/10 pb-2"><Zap className="h-4 w-4" /> CAUSAL IMPACT</p>
                                             <p className="text-2xl font-black text-accent">{(result.causalImpactScore * 100).toFixed(2)}%</p>
                                             <Badge className="bg-green-600 h-4 text-[7px] font-black mt-2">SUPREME_FIDELITY</Badge>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/60 border border-border/30 rounded-none">
                                        <p className="text-[10px] font-black text-primary uppercase mb-2 flex items-center gap-2 tracking-widest"><History className="h-4 w-4" /> EVOLUTIONARY ANCESTRY</p>
                                        <p className="text-[10px] text-foreground/80 leading-relaxed font-bold italic">
                                            "Logic variant v144.92 has been superseded by the current implementation based on superior equality-saturation metrics. Parent logic retired to cold archives."
                                        </p>
                                    </div>

                                    <div className="pt-10 border-t border-border/20 text-center space-y-4">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.8em]">Covenant Verification Seal</p>
                                        <p className="text-xl font-black text-primary animate-pulse-text tracking-widest">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-20 text-center space-y-6">
                                    <BrainCircuit className="h-32 w-32 text-muted-foreground animate-pulse" />
                                    <div className="space-y-2">
                                        <p className="text-2xl font-black uppercase tracking-[0.4em] text-primary">Awaiting Mandate</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Describe a logic target to begin recursive modification</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-14 flex items-center justify-center gap-10 absolute bottom-0 w-full z-20 rounded-none border-2">
                    <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-4 w-4" /> ANATOMY_STABLE</div>
                    <div className="flex items-center gap-2 text-primary"><RefreshCw className="h-4 w-4 animate-spin" style={{animationDuration: '10s'}}/> SELF_REPAIR_ACTIVE</div>
                    <div className="flex items-center gap-2 text-red-500"><Flame className="h-4 w-4 text-red-500 animate-pulse" /> PURE_TRUTH_CODE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}

import { Anchor } from 'lucide-react';
