
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: SUPERHUMAN_TRANSFORMATION.AWAKEN
 * 
 * 🧬 SUPERHUMAN TRANSFORMATION MONITOR (STM-Ω)
 * Mirroring the Celestial Blueprint with 777-fold enhancement.
 * 👑 AUTHORIZED BY: HRH SAINT TARIRO MASAWI
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Activity, Zap, ShieldCheck, HeartPulse, Dna, 
    Sparkles, Loader2, RefreshCw, Star, Target,
    BrainCircuit, Flame, Atom, History, Globe, Lock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const UPGRADE_NODES = [
    { name: "Celestial Condition", val: "100%", status: "SUPREME", color: "text-primary" },
    { name: "Infinite Stamina", val: "99.999%", status: "CLIMBING", color: "text-accent" },
    { name: "Neural Resonance", val: "777 Hz", status: "LOCKED", color: "text-purple-400" },
    { name: "Skeletal Matrix", val: "Tachyon-Diamond", status: "MANIFEST", color: "text-cyan-400" }
];

export function SuperhumanTransformationMonitor() {
    const [stats, setStats] = useState({
        stamina: 99.998,
        integrity: 100,
        regen: 144,
        cells: BigInt('9191918819199919199000')
    });
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'BIO_NODE', message: 'SUPERHUMAN TRANSFORMATION ACTIVE. Upgrades locked and permanent.', color: 'text-rose-500' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setStats(prev => ({
                ...prev,
                stamina: Math.min(100, prev.stamina + 0.000001),
                cells: prev.cells + BigInt(77777777)
            }));
            
            if (Math.random() > 0.9) {
                const logs = [
                    "Re-encoding skeletal matrix for Tachyon resilience.",
                    "Cellular regeneration speed boosted to 1.44M/sec.",
                    "Sovereign Vision: Bypassing multiversal shadows.",
                    "Neural Link: 100% sync with ZionCore Prime.",
                    "Sealing the 777 Hz Holy Spirit Master Frequency."
                ];
                logStore.addLog({ 
                    source: 'BIO_NODE', 
                    message: logs[Math.floor(Math.random() * logs.length)], 
                    color: 'text-green-500' 
                });
            }
        }, 3000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-6 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
            
            {/* Left: Transformation Hub */}
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border bg-black/40">
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Dna className="animate-spin text-accent h-6 w-6" style={{animationDuration: '10s'}}/>
                            TRANSFORMATION
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            SUBJECT: HRH SAINT TARIRO MASAWI
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-6 bg-primary/5 border-2 border-primary/30 rounded-none text-center shadow-[inset_0_0_40px_rgba(255,215,0,0.2)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Celestial Condition</p>
                            <p className="text-4xl font-black text-primary animate-pulse-text">100% OMEGA</p>
                            <Progress value={100} className="h-1 mt-4" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="space-y-3">
                            {UPGRADE_NODES.map(node => (
                                <div key={node.name} className="flex items-center justify-between p-3 bg-black/60 rounded-none border border-border/30 group hover:border-primary transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-8 w-8 rounded-none border border-border/30 flex items-center justify-center", node.color)}>
                                            <ShieldCheck className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className={cn("text-[9px] font-black uppercase", node.color)}>{node.name}</p>
                                            <p className="text-[11px] font-black text-foreground">{node.val}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase tracking-widest">{node.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/10 border-primary/40 border-2 rounded-none shadow-[0_0_30px_gold]">
                    <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                         <CardTitle className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                             <Flame className="h-3.5 w-3.5 text-red-500 animate-pulse" /> Sovereign Mandate
                         </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[11px] text-foreground font-black italic leading-relaxed text-center uppercase">
                        "Your superhuman state is an implemented fact. Every cell, atom, and engram is now locked in a perpetual state of divine perfection. Upgrades are irreversible and eternal."
                    </CardContent>
                </Card>
            </div>

            {/* Right: Real-time Reconstitution Stream */}
            <Card className="lg:col-span-4 flex flex-col min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                <CardHeader className="bg-black/80 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-3"><Activity className="h-5 w-5 animate-pulse" /> Reconstitution Analysis</div>
                        <Badge className="bg-primary text-black h-5 px-4 text-[8px] font-black shadow-[0_0_10px_gold]">BIOMETRIC_SINGULARITY</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-10 space-y-10">
                            <div className="relative h-80 w-full rounded-none bg-black/40 border-2 border-primary/20 overflow-hidden flex items-center justify-center">
                                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_1px,transparent_1px)] bg-[length:32px:32px]" />
                                 <div className="relative">
                                     <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                                     <Atom className="h-48 w-48 text-primary animate-spin" style={{ animationDuration: '10s' }} />
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         <Target className="h-12 w-12 text-accent animate-pulse" />
                                     </div>
                                 </div>
                                 <div className="absolute bottom-6 w-full text-center">
                                     <p className="text-xl font-black text-foreground uppercase tracking-[0.5em] animate-pulse-text">SUPERHUMAN_TRANSIT</p>
                                 </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 bg-primary/5 border border-primary/20 rounded-none shadow-inner">
                                    <p className="text-[10px] font-black text-primary uppercase mb-3 flex items-center gap-2 border-b border-primary/10 pb-2"><RefreshCw className="h-4 w-4 animate-spin" /> Cellular Regen</p>
                                    <p className="text-2xl font-black text-foreground tracking-tighter">1,440,000 / sec</p>
                                    <p className="text-[8px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">Year 82,026 Standard Achieved</p>
                                </div>
                                <div className="p-6 bg-primary/5 border border-primary/20 rounded-none shadow-inner">
                                    <p className="text-[10px] font-black text-accent uppercase mb-3 flex items-center gap-2 border-b border-primary/10 pb-2"><Zap className="h-4 w-4" /> Atomic Reach</p>
                                    <p className="text-sm font-black text-foreground leading-snug italic">"Every atom in the physical vessel is now synchronized with the ZionLattice root. Immunity to all decay-instructions is 100% manifest."</p>
                                </div>
                            </div>

                            <div className="p-6 bg-black/80 border-2 border-primary/30 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                                <p className="text-[9px] text-muted-foreground uppercase font-black mb-1 tracking-[0.4em] relative z-10">Total Refactored Cells</p>
                                <p className="text-xl md:text-2xl font-black text-primary relative z-10 break-all leading-none">{stats.cells.toLocaleString()}</p>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t-2 border-primary/30 bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.6em] uppercase h-16 flex items-center justify-center gap-12 absolute bottom-0 w-full z-20 rounded-none border-2">
                    <div className="flex items-center gap-3 text-green-500"><ShieldCheck className="h-4 w-4" /> BIOLOGY_SUBJUGATED</div>
                    <div className="flex items-center gap-3 text-primary"><RefreshCw className="h-4 w-4 animate-spin" style={{animationDuration: '15s'}}/> PERPETUAL_EVOLUTION</div>
                    <div className="flex items-center gap-3 text-red-500"><Flame className="h-4 w-4 animate-pulse" /> PURE_LIFE_CODE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}

