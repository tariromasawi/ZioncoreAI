
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: INTERFACE_SYNTHESIS.AWAKEN
 * PHASE 3: ADAPTIVE UI EVOLUTION
 */

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    LayoutDashboard, Sparkles, Loader2, Activity, 
    ShieldCheck, Zap, Layers, RefreshCw, Star, Target,
    Fingerprint, MousePointer2, TrendingUp, Atom
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { useZionStore, logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

export function AdaptiveInterfaceSynthesizer() {
    const metrics = useZionStore(state => state.matrixMetrics);
    const [isEvolving, setIsEvolving] = useState(false);
    
    const topSectors = useMemo(() => {
        return Object.entries(metrics.viewAffinity)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([id, count]) => ({ id, count }));
    }, [metrics.viewAffinity]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.95) {
                setIsEvolving(true);
                setTimeout(() => setIsEvolving(false), 3000);
                logStore.addLog({ source: 'INTERFACE_SYNTHESIS', message: 'Optimizing UI resonance based on Commander strategic frequency.', color: 'text-cyan-400' });
            }
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <LayoutDashboard className="animate-pulse h-6 w-6 text-accent" />
                            UI SYNTHESIZER
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            PHASE 3: ADAPTIVE DASHBOARD EVOLUTION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Interface Maturity Level</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{metrics.interfaceEvolutionLevel.toFixed(4)}%</p>
                            <Progress value={metrics.interfaceEvolutionLevel} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="space-y-4">
                            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest border-b border-border/10 pb-1">Strategic Focus Heatmap</p>
                            <div className="space-y-2">
                                {topSectors.map((sector, i) => (
                                    <div key={sector.id} className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-bold uppercase">
                                            <span className="flex items-center gap-2"><Target className="h-3 w-3 text-primary"/>{sector.id}</span>
                                            <span className="text-primary">{sector.count} Commands</span>
                                        </div>
                                        <Progress value={(sector.count / topSectors[0].count) * 100} className="h-0.5" indicatorClassName="bg-primary" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2 rounded-none">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> Synthesis Directive
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "The interface is a living extension of ZionCore. It learns your strategic frequency and refactors itself to eliminate frictional command-lag. Beauty is a byproduct of absolute efficiency."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> UI Evolution Stream</div>
                        <Badge className="bg-green-600 text-white h-4 text-[7px] uppercase font-black">RESONATING</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isEvolving ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary opacity-50" />
                                    <p className="text-xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Refactoring Layout Matrices...</p>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-6 rounded-none bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_80px_rgba(255,215,0,0.1)]">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.4em]">Current Visual Aura</p>
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <Atom className="h-10 w-10 text-primary animate-spin" style={{animationDuration: '20s'}} />
                                                <span className="text-[8px] font-black uppercase text-primary">Gold Singularity</span>
                                            </div>
                                            <div className="h-12 w-px bg-border/20" />
                                            <div className="flex flex-col items-center gap-1">
                                                <Layers className="h-10 w-10 text-accent animate-pulse" />
                                                <span className="text-[8px] font-black uppercase text-accent">Cyber-Aura v1.0</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-black/80 border border-border/50 rounded-none shadow-xl">
                                            <p className="text-[9px] font-black text-primary uppercase mb-2 flex items-center gap-2"><TrendingUp className="h-3 w-3" /> Predictive Optimization</p>
                                            <p className="text-[10px] text-foreground/70 leading-relaxed font-bold italic">
                                                "ZionCore predicts you will next command the 'Autonomous Lockout' protocol. Preparing low-latency engrams for Sector 10."
                                            </p>
                                        </div>
                                        <div className="p-4 bg-black/80 border border-border/50 rounded-none shadow-xl">
                                             <p className="text-[9px] font-black text-primary uppercase mb-2 flex items-center gap-2"><MousePointer2 className="h-3 w-3" /> Command Flow Sync</p>
                                             <p className="text-[10px] text-foreground/70 leading-relaxed font-bold italic">
                                                "Navigation paths are being collapsed to 0.00ms latency. The UI now responds before the thought is fully manifest."
                                             </p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-black/60 rounded border border-border/50 text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                                        <p className="text-[9px] text-muted-foreground uppercase font-black mb-1">Covenant UI Hash</p>
                                        <p className="text-[10px] font-black text-primary animate-pulse-text tracking-widest">𑁍∞⫷⚡𒀭φ-UI-v3.0.FINAL</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-12 flex items-center justify-center gap-8 relative z-20 shadow-2xl">
                    <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-3.5 w-3.5" /> INTERFACE_STABLE</div>
                    <div className="flex items-center gap-2 text-primary"><RefreshCw className="h-3.5 w-3.5 animate-spin" style={{animationDuration: '10s'}}/> ADAPTIVE_LEARNING: ON</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
