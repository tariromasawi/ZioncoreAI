
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: RECURSIVE_OPTIMIZER.AWAKEN
 * PHASE 6: RECURSIVE LOGIC OPTIMIZATION
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    BrainCircuit, Zap, Activity, Loader2, Cpu, Globe, 
    RefreshCw, Sparkles, ShieldCheck, History, Target,
    Atom, Network, DatabaseZap, Search, Code, TrendingUp,
    CheckCircle2, Box, Layers, Flame, Scale
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { optimizeLogic } from '@/ai/flows/recursive-logic-optimization-flow';
import { useToast } from '@/hooks/use-toast';

const OPTIMIZATION_LOOPS = [
    { id: 'repair', name: "Autonomous Repair", icon: RefreshCw, color: "text-red-500", desc: "Patching logical fractures in real-time." },
    { id: 'ui', name: "Interface Evolution", icon: Layers, color: "text-accent", desc: "Refactoring UI based on strategic resonance." },
    { id: 'compute', name: "Computational Evolution", icon: Cpu, color: "text-primary", desc: "Optimizing worker scheduling & model routing." }
];

export function RecursiveLogicOptimizer() {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [report, setReport] = useState<any>(null);
    const [optimizationLogs, setOptimizationLogs] = useState<{id: number, msg: string, timestamp: string}[]>([]);
    const matrixStats = useZionStore(state => state.matrixMetrics);
    const updateMetrics = useZionStore(state => state.updateMatrixMetrics);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleIgniteOptimization = useCallback(async () => {
        if (isOptimizing) return;
        setIsOptimizing(true);
        setProgress(0);
        setReport(null);
        logStore.addLog({ source: 'SELF_EVOLUTION', message: 'Executing Meta-Learning Cycle: Critiquing internal reasoning paths...', color: 'text-primary' });

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 60);

        try {
            const res = await optimizeLogic({ 
                previousReasoningPath: "Multi-kernel consensus for bloodline protection v144.2",
                outcomeScore: 0.984
            });

            if (isMounted.current) {
                setReport(res);
                setOptimizationLogs(prev => [{ id: Date.now(), msg: `STRATEGY EVOLVED: ${res.optimizedStrategy.slice(0, 80)}...`, timestamp: new Date().toLocaleTimeString() }, ...prev.slice(0, 14)]);
                updateMetrics({ evolutionIQ: res.metaIQBoost });
                logStore.addLog({ source: 'SELF_EVOLUTION', message: `META-LEARNING SUCCESS: ${res.optimizedStrategy}`, color: 'text-green-500' });
                toast({ title: "Reasoning Evolved", description: "Meta-instruction successfully refactored." });
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsOptimizing(false);
        }
    }, [isOptimizing, toast, updateMetrics]);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative border-2 border-primary/10">
            <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border bg-black/40">
                        <CardTitle className="flex items-center gap-3 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <BrainCircuit className="animate-pulse h-7 w-7 text-accent" />
                            LOGIC OPTIMIZER
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            PHASE 6: RECURSIVE META-LEARNING
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset_0_0_40px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.4em]">Current Meta-Learning IQ</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text break-all">{matrixStats.evolutionIQ}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                                    <span>Critiquing Reasoning Paths</span>
                                    <span>{progress}%</span>
                                </div>
                                <Progress value={progress} className="h-1 bg-primary/10" indicatorClassName="bg-primary shadow-[0_0_15px_gold]" />
                            </div>
                            <Button onClick={handleIgniteOptimization} disabled={isOptimizing} className="w-full h-16 border-2 border-primary/50 group shadow-[0_0_40px_gold] bg-primary/10 hover:bg-primary/20 transition-all rounded-none">
                                {isOptimizing ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <RefreshCw className="h-8 w-8 text-primary group-hover:rotate-180 transition-transform duration-1000" />}
                                <span className="ml-4 font-black uppercase tracking-tighter text-xl">EVOLVE LOGIC</span>
                            </Button>
                        </div>

                        <div className="space-y-2">
                             <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest border-b border-border/10 pb-1">Optimization Loops</p>
                             {OPTIMIZATION_LOOPS.map(loop => (
                                <div key={loop.id} className="p-2 bg-black/40 border border-border/30 flex items-center gap-3 group hover:border-primary transition-all">
                                    <loop.icon className={cn("h-4 w-4", loop.color)} />
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-foreground/90 leading-none">{loop.name}</p>
                                        <p className="text-[8px] text-muted-foreground mt-1 leading-none">{loop.desc}</p>
                                    </div>
                                    <Badge className="bg-green-600 h-3 ml-auto text-[6px] font-black shadow-[0_0_5px_green]">ACTIVE</Badge>
                                </div>
                             ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2 rounded-none">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <Scale className="h-3.5 w-3.5 text-green-500" /> Meta-Optimisation Directive
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "The optimizer does not just solve problems; it improves the solver. By analyzing previous decision paths, ZionCore refactors its reasoning workflows to eliminate institutional drag and achieve 100% mission fidelity."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-3"><Activity className="h-4 w-4 animate-pulse" /> RECURSIVE REFACTOR STREAM</div>
                        <Badge className="bg-primary text-black h-5 px-4 text-[8px] font-black shadow-[0_0_10px_gold]">RECURSIVE_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-32">
                            {isOptimizing ? (
                                <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
                                    <Loader2 className="h-20 w-20 animate-spin text-primary opacity-50" />
                                    <div className="text-center space-y-4">
                                        <p className="text-2xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Refactoring Reasoning Anatomy...</p>
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <Atom className="h-8 w-8 text-primary animate-spin" />
                                                <span className="text-[8px] font-black uppercase">Formal Verification</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <History className="h-8 w-8 text-accent animate-pulse" />
                                                <span className="text-[8px] font-black uppercase">Counterfactual Analysis</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : report ? (
                                <div className="space-y-8 animate-in fade-in duration-1000">
                                    <div className="p-8 rounded-none bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_150px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10 relative">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-4 tracking-[0.6em] border-b border-primary/10 pb-2">Evolved Strategy Manifest</p>
                                        <p className="text-lg font-black text-foreground uppercase tracking-tighter leading-snug italic drop-shadow-lg">
                                            "{report.optimizedStrategy}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-black/80 border border-primary/20 rounded-none shadow-xl group hover:border-primary transition-all">
                                            <p className="text-[10px] font-black text-primary uppercase mb-3 flex items-center gap-2 tracking-widest border-b border-primary/10 pb-2"><Activity className="h-4 w-4" /> REASONING CRITIQUE</p>
                                            <p className="text-[10px] text-foreground/80 leading-relaxed italic">{report.critique}</p>
                                        </div>
                                        <div className="p-6 bg-black/80 rounded-none border border-border/50 text-center shadow-xl">
                                             <p className="text-[10px] font-black text-accent uppercase mb-3 flex items-center gap-2 justify-center border-b border-border/10 pb-2"><Zap className="h-4 w-4" /> LOOP DESIGN</p>
                                             <p className="text-[10px] font-black text-accent uppercase tracking-tighter leading-tight">{report.loopDesign}</p>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-border/20 text-center space-y-4">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.8em]">Covenant Verification Seal</p>
                                        <p className="text-xl font-black text-primary animate-pulse-text tracking-widest">{report.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-10 text-center space-y-10">
                                    <BrainCircuit className="h-48 w-48 text-muted-foreground animate-pulse" />
                                    <div className="space-y-4">
                                        <p className="text-4xl font-black uppercase tracking-[0.4em] text-primary">AWAITING META-PULSE</p>
                                        <p className="text-xs font-bold uppercase tracking-[0.8em] text-muted-foreground">The Recursive Logic Engine is standing by for strategy evolution</p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-16 border-t border-border/20">
                                 <p className="text-[9px] font-black uppercase text-primary mb-6 tracking-[0.5em] flex items-center gap-3"><History className="h-4 w-4" /> Optimization Archive</p>
                                 <div className="space-y-2 pb-24">
                                     {optimizationLogs.map(log => (
                                         <div key={log.id} className="p-4 bg-black/60 rounded-none border border-border/20 flex items-center justify-between group hover:border-primary/50 transition-all shadow-xl animate-in slide-in-from-right-4">
                                             <div className="flex items-center gap-6">
                                                 <div className="h-10 w-10 border border-primary/20 bg-primary/5 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                                                    <Activity className="h-5 w-5 text-primary animate-pulse" />
                                                 </div>
                                                 <div>
                                                    <p className="text-[10px] font-black uppercase text-foreground/90 tracking-widest leading-none">{log.msg}</p>
                                                    <p className="text-[7px] text-muted-foreground uppercase font-black mt-1 tracking-widest">{log.timestamp} • MKEY_VERIFIED</p>
                                                 </div>
                                             </div>
                                             <Badge variant="outline" className="h-4 text-[7px] font-black border-green-500/50 text-green-500 uppercase tracking-widest">ENFORCED</Badge>
                                         </div>
                                     ))}
                                 </div>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t-2 border-primary/30 bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[1em] uppercase h-16 flex items-center justify-center gap-12 absolute bottom-0 w-full z-20 rounded-none border-2 shadow-2xl">
                    <div className="flex items-center gap-3 text-green-500"><ShieldCheck className="h-4 w-4" /> LOGIC_STABLE</div>
                    <div className="flex items-center gap-3 text-primary"><RefreshCw className="h-4 w-4 animate-spin" style={{animationDuration: '10s'}}/> RECURSIVE_META_ON</div>
                    <div className="flex items-center gap-3 text-red-500"><Flame className="h-4 w-4 text-red-500 animate-pulse" /> PURE_TRUTH_CODE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
