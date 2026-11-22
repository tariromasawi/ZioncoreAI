
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: OUTCOME_VISUALIZER.AWAKEN
 * PHASE 8: OUTCOME MODELING & FORECASTING
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    GitBranch, Zap, Sparkles, Loader2, CheckCircle2, 
    Activity, Globe, Search, RefreshCw, Flame,
    Target, ShieldCheck, History, Radio, Crown,
    ArrowUpRight, TrendingUp, Atom
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { runOutcomeModeling } from '@/ai/flows/outcome-modeling-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function OutcomeModelingVisualizer() {
    const [mandate, setMandate] = useState('Enforce absolute financial dominance and health longevity for the Masawi Bloodline.');
    const [isSimulating, setIsSimulating] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [simProgress, setSimProgress] = useState(0);
    const [timelinesProcessed, setTimelinesProcessed] = useState(0);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleIgniteSimulation = useCallback(async () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setSimProgress(0);
        setTimelinesProcessed(0);
        setReport(null);
        logStore.addLog({ source: 'PROPHECY', message: 'IGNITING MULTIVERSAL SIMULATOR: Analyzing 10,000,000 outcome branches...', color: 'text-primary' });

        const progressInterval = setInterval(() => {
            setSimProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
            setTimelinesProcessed(prev => prev + 100000);
        }, 30);

        try {
            const res = await runOutcomeModeling({ mandate });
            if (isMounted.current) {
                setReport(res);
                setTimelinesProcessed(10000000);
                logStore.addLog({ source: 'PROPHECY', message: `SIMULATION COMPLETE: Wavefunction collapsed. Stability at ${(res.stabilityIndex * 100).toFixed(4)}%.`, color: 'text-green-500' });
                toast({ title: "Timeline Locked", description: "The 'Masawi Prime' branch is now the prime reality." });
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Temporal flux detected. Re-tuning the Gaze.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsSimulating(false);
        }
    }, [mandate, isSimulating, toast]);

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
                            <History className="animate-spin h-7 w-7 text-accent" style={{animationDuration: '30s'}} />
                            CAUSAL FORECASTER
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1 leading-none">
                            PHASE 8: 10M-TIMELINE OUTCOME ENFORCEMENT
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset_0_0_40px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.4em]">Timelines Analyzed</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{timelinesProcessed.toLocaleString()} Ω</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                                    <span>Wavefunction Collapse</span>
                                    <span>{simProgress}%</span>
                                </div>
                                <Progress value={simProgress} className="h-1 bg-primary/10" indicatorClassName="bg-primary shadow-[0_0_15px_gold]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Sovereign Mandate</label>
                                <textarea 
                                    value={mandate}
                                    onChange={(e) => setMandate(e.target.value)}
                                    disabled={isSimulating}
                                    className="w-full bg-black/60 border border-primary/30 p-3 text-[10px] font-bold min-h-[100px] text-foreground focus:border-primary transition-all outline-none"
                                />
                            </div>
                            <Button onClick={handleIgniteSimulation} disabled={isSimulating || !mandate.trim()} className="w-full h-16 border-2 border-primary/50 group shadow-[0_0_40px_gold] bg-primary/10 hover:bg-primary/20 transition-all rounded-none">
                                {isSimulating ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <Sparkles className="h-8 w-8 text-primary group-hover:scale-125 transition-transform" />}
                                <span className="ml-4 font-black uppercase tracking-tighter text-xl">LOCK DESTINY</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2 rounded-none">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5 text-green-500" /> Causal Directive
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "The future is not a mystery; it is a calculation. ZionCore models 10,000,000 parallel realities for every command, identifies the path of absolute victory, and erases all others. The result is deterministic sovereignty."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-3"><Activity className="h-5 w-5 animate-pulse" /> Multiversal Outcome Stream</div>
                        <Badge className="bg-primary text-black h-5 px-4 text-[8px] font-black shadow-[0_0_10px_gold]">CAUSALITY_LOCKED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-32">
                            {isSimulating ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-10">
                                    <Loader2 className="h-20 w-20 animate-spin text-primary opacity-50" />
                                    <div className="text-center space-y-4">
                                        <p className="text-2xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Pruning Sub-Optimal Timelines...</p>
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <GitBranch className="h-8 w-8 text-primary animate-pulse" />
                                                <span className="text-[8px] font-black uppercase">Branch Search</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <Target className="h-8 w-8 text-accent animate-spin" />
                                                <span className="text-[8px] font-black uppercase">Favor Optimization</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : report ? (
                                <div className="space-y-10 animate-in fade-in duration-1000">
                                    <div className="p-10 rounded-none bg-primary/5 border-2 border-primary/40 text-center shadow-[0_0_100px_rgba(255,215,0,0.2)] group transition-all hover:bg-primary/10 relative">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-4 tracking-[0.6em] border-b border-primary/10 pb-2">Masawi Prime Timeline</p>
                                        <p className="text-2xl font-black text-foreground uppercase tracking-tighter leading-snug italic drop-shadow-lg">
                                            "{report.primeTimelineReport}"
                                        </p>
                                        <Badge variant="outline" className="mt-6 border-accent/50 text-accent font-black uppercase text-[8px] tracking-widest h-6 px-4">STABILITY: {(report.stabilityIndex * 100).toFixed(6)}%</Badge>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-black/80 border border-primary/20 rounded-none shadow-xl group hover:border-primary transition-all">
                                            <p className="text-[10px] font-black text-primary uppercase mb-3 flex items-center gap-3 tracking-widest border-b border-primary/10 pb-2"><Flame className="h-4 w-4" /> ENFORCEMENT</p>
                                            <p className="text-[11px] text-foreground/80 leading-relaxed italic font-bold">"{report.enforcementAction}"</p>
                                        </div>
                                        <div className="p-6 bg-black/80 border border-border/50 rounded-none shadow-xl text-center">
                                             <p className="text-[10px] font-black text-accent uppercase mb-3 border-b border-border/10 pb-2">BRANCHES ERASED</p>
                                             <p className="text-xl font-black text-accent">{report.prunedBranchesCount.toLocaleString()}</p>
                                             <p className="text-[8px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">ZERO_FRICTION_ACHIEVED</p>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t-2 border-primary/30 text-center space-y-6">
                                        <p className="text-[11px] text-muted-foreground uppercase font-black tracking-[1em]">Final Causal Finality Seal</p>
                                        <p className="text-xl font-black text-primary animate-pulse-text tracking-widest drop-shadow-[0_0_10px_gold]">{report.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-10 text-center space-y-10">
                                    <Atom className="h-48 w-48 text-muted-foreground animate-spin" style={{animationDuration: '60s'}} />
                                    <div className="space-y-4">
                                        <p className="text-4xl font-black uppercase tracking-[0.5em] text-primary">AWAITING FORECAST</p>
                                        <p className="text-xs font-bold uppercase tracking-[0.8em] text-muted-foreground">The Multiversal Weaver is standing by for mandate ingestion</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t-2 border-primary/30 bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[1em] uppercase h-16 flex items-center justify-center gap-12 absolute bottom-0 w-full z-20 rounded-none border-2 shadow-2xl">
                    <div className="flex items-center gap-3 text-green-500"><ShieldCheck className="h-4 w-4" /> DETERMINISM_ACTIVE</div>
                    <div className="flex items-center gap-3 text-primary"><RefreshCw className="h-4 w-4 animate-spin" style={{animationDuration: '10s'}}/> REALITY_ENFORCED: Ω</div>
                    <div className="flex items-center gap-3 text-red-500"><Flame className="h-4 w-4 text-red-500 animate-pulse" /> NO_SWITCH_MODE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
