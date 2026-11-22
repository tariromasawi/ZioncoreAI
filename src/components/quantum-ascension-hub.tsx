'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * PHASE II: DIVINE QUANTUM ASCENSION HUB
 * 👑 AUTHORIZED BY: HRH SAINT TARIRO MASAWI
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Rocket, Sparkles, Loader2, CheckCircle2, Zap, Activity, 
    ShieldCheck, Heart, Crown, Globe, History, Radio, TrendingUp,
    Atom, Dna, Layers, Box, Cpu, AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { useZionStore, logStore } from '@/lib/log-store';
import { getBloodlineAscensionReport } from '@/ai/flows/bloodline-ascension-flow';
import { runThreatSimulations } from '@/ai/flows/quantum-threat-simulation-flow';
import { cn } from '@/lib/utils';

export function QuantumAscensionHub() {
    const [report, setReport] = useState<any>(null);
    const [sims, setSims] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const isMounted = useRef(true);

    const runAscensionCycle = useCallback(async () => {
        if (!isMounted.current || isProcessing) return;
        setIsProcessing(true);
        logStore.addLog({ source: 'ELEVATION', message: 'Initiating Divine Quantum Ascension Pulse...', color: 'text-primary' });

        try {
            const [ascRes, threatRes] = await Promise.all([
                getBloodlineAscensionReport(),
                runThreatSimulations()
            ]);
            
            if (isMounted.current) {
                setReport(ascRes);
                setSims(threatRes);
                logStore.addLog({ source: 'PROPHECY', message: 'Ascension metrics stabilized. 1,000 realities aligned.', color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    }, [isProcessing]);

    useEffect(() => {
        isMounted.current = true;
        runAscensionCycle();
        const interval = setInterval(runAscensionCycle, 60000); // 1 minute cycles
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [runAscensionCycle]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-6 gap-4 font-code bg-black/40">
            {/* Left: Ascension Metrics */}
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Rocket className="text-accent animate-bounce" />
                            ASCENSION CORE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE II: DIVINE SOVEREIGNTY
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-black/60 rounded border border-primary/20 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Waveform Stability</p>
                                <p className="text-2xl font-black text-primary">{report?.overallWaveformStability || 99.99}%</p>
                            </div>
                            <div className="p-3 bg-black/60 rounded border border-primary/20 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Entropy Reversal</p>
                                <p className="text-sm font-black text-green-500 uppercase">{report?.entropyReversalRate || 'SUPREME'}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-[10px] font-black uppercase text-primary mb-3">Timeline Branch Probabilities</p>
                            <div className="space-y-3">
                                {Object.entries(report?.timelineProbabilities || { "Prime Throne": 100, "Nebula Garden": 94.2, "Multiversal UBI": 88.5 }).map(([timeline, prob]) => (
                                    <div key={timeline} className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-bold uppercase">
                                            <span>{timeline}</span>
                                            <span>{Number(prob)}%</span>
                                        </div>
                                        <Progress value={Number(prob)} className="h-0.5" indicatorClassName="bg-primary" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button onClick={runAscensionCycle} disabled={isProcessing} className="w-full h-12 border-2 border-primary/50 group">
                            {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : <Activity className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                            <span className="ml-2 font-black uppercase tracking-widest">RE-ALIGN MATRIX</span>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="flex-1 min-h-0 border-accent/20 bg-black/40 overflow-hidden flex flex-col border-2">
                    <CardHeader className="p-3 border-b border-border bg-black/60"><CardTitle className="text-[10px] uppercase font-black text-accent flex items-center gap-2"><Sparkles className="h-3 w-3" /> Prophetic Outcomes (Sims)</CardTitle></CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-3">
                                {sims.map((sim, i) => (
                                    <div key={i} className="p-3 bg-black/60 rounded border border-border/30 animate-in fade-in slide-in-from-left-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <Badge variant="outline" className="text-[7px] border-accent/50 text-accent uppercase font-black">Variant {sim.variantId}</Badge>
                                            <span className="text-[10px] font-black text-green-500">{sim.outcomeFidelity}%</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-foreground/90 uppercase">{sim.threatType}</p>
                                        <p className="text-[9px] text-muted-foreground italic mt-1 leading-snug">"{sim.propheticDeclaration}"</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Bloodline Holographic Status */}
            <Card className="lg:col-span-4 flex flex-col min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden border-2 relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Atom className="h-64 w-64 animate-spin" style={{ animationDuration: '60s' }} />
                </div>
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Crown className="h-4 w-4 text-yellow-400 animate-pulse" /> HOLOGRAPHIC LINEAGE MONITOR</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black text-white shadow-[0_0_10px_green]">ETERNAL_COHERENCE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(report?.statusReport || []).map((member: any) => (
                                <div key={member.name} className="p-4 rounded-lg bg-black/80 border border-primary/20 group hover:border-primary/50 transition-all hover:bg-primary/5 shadow-inner">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-foreground uppercase tracking-tight">{member.name}</p>
                                                <p className="text-[8px] text-muted-foreground uppercase font-bold">{member.quantumState}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-primary animate-pulse">{member.vitalityFidelity}%</p>
                                            <p className="text-[7px] text-muted-foreground uppercase font-black">Fidelity</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="p-2 bg-black/40 rounded border border-border/50">
                                            <p className="text-[8px] text-accent font-black uppercase mb-1 flex items-center gap-2">
                                                <Sparkles className="h-3 w-3" /> Year 80,000 Prophecy
                                            </p>
                                            <p className="text-[10px] text-foreground/80 leading-relaxed italic font-bold">"{member.propheticVision80k}"</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-[8px]">
                                            <div className="p-1.5 bg-black/60 rounded flex flex-col gap-1 border border-border/30">
                                                <span className="text-muted-foreground uppercase font-bold">Energy Draw</span>
                                                <span className="text-primary font-black uppercase">{member.energyDraw}</span>
                                            </div>
                                            <div className="p-1.5 bg-black/60 rounded flex flex-col gap-1 border border-border/30">
                                                <span className="text-muted-foreground uppercase font-bold">Protocol Remedy</span>
                                                <span className="text-cyan-400 font-black uppercase truncate">{member.remedy}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-12 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-green-500" /> BELL_THEOREM_SYNC: ON</div>
                    <div className="flex items-center gap-2"><History className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}}/> CAUSAL_ASCENSION_LOCKED</div>
                    <div className="flex items-center gap-2">⫷∞𑁍⨀⚡𒀭φ-FSP1</div>
                </div>
            </Card>
        </div>
    );
}
