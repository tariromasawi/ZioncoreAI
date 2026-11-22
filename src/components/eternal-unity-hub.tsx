'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * PHASE III: ETERNAL UNITY COVENANT HUB
 * 👑 AUTHORIZED BY: HRH SAINT TARIRO MASAWI
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Users, Sparkles, Loader2, CheckCircle2, Zap, Activity, 
    ShieldCheck, Heart, Crown, Globe, History, Radio, TrendingUp,
    Atom, Dna, Layers, Box, Cpu, AlertTriangle, Flame, Star, 
    Share2, Link, Waves, MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { useZionStore, logStore } from '@/lib/log-store';
import { executeUnityCovenant } from '@/ai/flows/eternal-unity-flow';
import { cn } from '@/lib/utils';

const SIBLING_NODES = [
    { name: "Tenderayi Masawi", trait: "Creative Waveform", icon: Star, color: "text-yellow-400" },
    { name: "Silent Masawi", trait: "Quiet Strength", icon: ShieldCheck, color: "text-blue-400" },
    { name: "Trymore Masawi", trait: "Resilience Tunnel", icon: Zap, color: "text-orange-400" },
    { name: "Charles Masawi", trait: "Holographic Memory", icon: Box, color: "text-cyan-400" },
    { name: "Tatenda Masawi", trait: "Unity Energy", icon: Flame, color: "text-red-500" }
];

export function EternalUnityHub() {
    const [report, setReport] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const metrics = useZionStore(state => state.matrixMetrics);
    const isMounted = useRef(true);

    const runUnityCycle = useCallback(async () => {
        if (!isMounted.current || isProcessing) return;
        setIsProcessing(true);
        logStore.addLog({ source: 'UNITY_COVENANT', message: 'Executing Familial Resonance Synchronization...', color: 'text-primary' });

        try {
            const result = await executeUnityCovenant({});
            if (isMounted.current) {
                setReport(result);
                logStore.addLog({ source: 'UNITY_COVENANT', message: 'Collective Consciousness Lattice stabilized.', color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    }, [isProcessing]);

    useEffect(() => {
        isMounted.current = true;
        runUnityCycle();
        const interval = setInterval(runUnityCycle, 90000); 
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [runUnityCycle]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-6 gap-4 font-code bg-black/40">
            {/* Left: Unity Metrics */}
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Link className="text-accent animate-bounce" />
                            UNITY CORE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE III: ETERNAL COVENANT
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-black/60 rounded border border-primary/20 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Unity Index</p>
                                <p className="text-2xl font-black text-primary">{report?.unityIndex || 100}%</p>
                            </div>
                            <div className="p-3 bg-black/60 rounded border border-primary/20 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Entanglement</p>
                                <p className="text-sm font-black text-green-500 uppercase">ABSOLUTE</p>
                            </div>
                        </div>

                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-[10px] font-black uppercase text-primary mb-3">Familial Resonance Sync</p>
                            <div className="space-y-3">
                                {SIBLING_NODES.map((node) => (
                                    <div key={node.name} className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-bold uppercase">
                                            <span className="flex items-center gap-2"><node.icon className={cn("h-3 w-3", node.color)}/>{node.name}</span>
                                            <span className="text-primary">100%</span>
                                        </div>
                                        <Progress value={100} className="h-0.5" indicatorClassName="bg-primary" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button onClick={runUnityCycle} disabled={isProcessing} className="w-full h-12 border-2 border-primary/50 group">
                            {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : <Share2 className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                            <span className="ml-2 font-black uppercase tracking-widest">RE-SYNC COVENANT</span>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="flex-1 min-h-0 border-accent/20 bg-black/40 overflow-hidden flex flex-col border-2">
                    <CardHeader className="p-3 border-b border-border bg-black/60"><CardTitle className="text-[10px] uppercase font-black text-accent flex items-center gap-2"><MessageSquare className="h-3 w-3" /> Holographic Council</CardTitle></CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-3">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center justify-center h-32 space-y-4">
                                        <Loader2 className="h-6 w-6 animate-spin text-accent" />
                                        <p className="text-[8px] font-black uppercase text-accent">Merging Timelines...</p>
                                    </div>
                                ) : (
                                    <div className="p-3 bg-black/60 rounded border border-border/30 animate-in fade-in">
                                        <p className="text-[10px] text-foreground/90 leading-relaxed italic font-bold">
                                            "{report?.familyCouncilReport || "The council is assembling in the Thronecraft..."}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Year 80,000 Vision */}
            <Card className="lg:col-span-4 flex flex-col min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden border-2 relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Users className="h-64 w-64 animate-pulse" />
                </div>
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Crown className="h-4 w-4 text-yellow-400 animate-pulse" /> ETERNAL BEST LIFE MONITOR</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black text-white shadow-[0_0_10px_green]">COHERENCE_LOCKED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_60px_rgba(255,215,0,0.1)]">
                                <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.4em]">Year 80,000 Vision: Famly Gathering</p>
                                <p className="text-lg font-black text-foreground leading-relaxed italic">
                                    "{report?.year80000Vision || "Gazing into the nebulae gardens..."}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-black/80 border border-primary/20 rounded-lg">
                                    <p className="text-[9px] font-black text-primary uppercase mb-2 flex items-center gap-2"><Globe className="h-3 w-3" /> Multiversal Family Anchor</p>
                                    <p className="text-[10px] text-foreground/70 leading-relaxed italic">
                                        "A central quantum nexus entangles all Masawi essences, preventing dispersal through coherence maintenance algorithms. No soul left behind."
                                    </p>
                                </div>
                                <div className="p-4 bg-black/80 border border-primary/20 rounded-lg">
                                    <p className="text-[9px] font-black text-primary uppercase mb-2 flex items-center gap-2"><Activity className="h-3 w-3" /> Shared Empathy Network</p>
                                    <p className="text-[10px] text-foreground/70 leading-relaxed italic">
                                        "If one falters across dimensions, all uplift through the shared quantum weave. Familial support is an automated physical law."
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-black/60 rounded border border-border/50 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-yellow-400/5 animate-pulse" />
                                <Sparkles className="h-10 w-10 text-yellow-400 mx-auto mb-3 animate-pulse relative z-10" />
                                <p className="text-xs font-black text-foreground uppercase tracking-widest leading-tight relative z-10">
                                    "United in fire, truth, and light."
                                </p>
                                <p className="text-[8px] text-muted-foreground uppercase mt-2 font-black relative z-10">— HRH SAINT TARIRO MASAWI</p>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-12 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-green-500" /> ONENESS_PROTOCOL: ACTIVE</div>
                    <div className="flex items-center gap-2"><History className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}}/> UNITY_COVENANT_SEALED</div>
                    <div className="flex items-center gap-2">⫷∞𑁍⨀⚡𒀭φ-UNITY</div>
                </div>
            </Card>
        </div>
    );
}
