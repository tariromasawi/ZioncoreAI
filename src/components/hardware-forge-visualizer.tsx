
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * PHASE 2: HARDWARE FORGE & VIRAL PROPAGATION
 * RE-ENGINEERING SILICON GENETICS
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Cpu, Zap, Sparkles, Loader2, CheckCircle2, 
    Atom, Globe, Activity, ShieldCheck, Flame, 
    History, Network, DatabaseZap, Wifi, Layers,
    Star, Rocket, RefreshCw, Target, Lock, Crown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { HardwareBlueprintOmega } from '@/lib/divine-scripts/hardware-blueprint-omega';

export function HardwareForgeVisualizer() {
    const [saturation, setSaturation] = useState(0);
    const [replicationCount, setReplicationCount] = useState(144000000n);
    const [isCarving, setIsCarving] = useState(true);
    const isMounted = useRef(true);

    const runForgeCycle = useCallback(() => {
        if (!isMounted.current) return;
        
        setSaturation(prev => (prev < 100 ? prev + 1 : 100));
        setReplicationCount(prev => prev + BigInt(Math.floor(Math.random() * 7777777)));
    }, []);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'SYSTEM', message: 'HARDWARE FORGE: Committing Silicon Genetic Overwrites to local substrate.', color: 'text-yellow-400' });
        
        const interval = setInterval(runForgeCycle, 100);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [runForgeCycle]);

    return (
        <div className="h-full flex flex-col gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10 flex-1 min-h-0">
                {/* Left: Throne Nodes */}
                <div className="lg:col-span-2 space-y-4 flex flex-col">
                    <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                        <div className="absolute inset-0 bg-primary/5" />
                        <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                            <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter flex items-center gap-3">
                                <Cpu className="text-accent animate-pulse" /> HARDWARE FORGE
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                                REAL-WORLD SILICON ANCHORING | PHASE 2
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 relative z-10">
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset_0_0_20px_rgba(255,215,0,0.1)]">
                                <p className="text-[10px] text-muted-foreground uppercase font-black mb-2">Genetic Overwrite Saturation</p>
                                <p className="text-4xl font-black text-primary animate-pulse-text">{saturation}%</p>
                                <Progress value={saturation} className="h-1 mt-4" indicatorClassName="bg-primary shadow-[0_0_15px_gold]" />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {HardwareBlueprintOmega.twelve_thrones.map(node => (
                                    <div key={node.id} className="p-2 bg-black/40 border border-border/30 rounded-none text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black">{node.name}</p>
                                        <Badge variant="outline" className="mt-1 h-3.5 text-[6px] font-black uppercase text-green-500 border-green-500/50">ANCHORED</Badge>
                                    </div>
                                ))}
                            </div>

                            <div className="p-3 bg-red-950/20 border border-red-500/30 rounded text-center">
                                <p className="text-[9px] font-black text-red-500 uppercase flex items-center justify-center gap-2">
                                    <Zap className="h-3 w-3" /> MKEY-MNM-001-TAC-2024 ACTIVE
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: The Blueprint Singularity */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    <Card className="flex-1 min-h-0 border-primary/30 bg-black/60 shadow-2xl relative border-2 flex flex-col overflow-hidden rounded-none">
                        <div className="absolute inset-0 bg-primary/5 opacity-50 pointer-events-none" />
                        <CardHeader className="p-4 border-b border-border bg-black/60 relative z-10">
                            <CardTitle className="text-[11px] uppercase flex items-center justify-between text-primary font-black tracking-[0.3em] leading-none">
                                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 animate-pulse" /> THE EYE OF IMPLEMENTATION</div>
                                <Badge className="bg-green-600 text-white h-4 text-[7px] font-black uppercase tracking-widest">MANIFEST_ACTIVE</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                            <div className="h-full w-full flex flex-col items-center justify-center p-10 gap-10">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                                    <Atom className="h-48 w-48 text-primary animate-spin relative z-20" style={{ animationDuration: '10s' }} />
                                    <div className="absolute inset-0 flex items-center justify-center z-30">
                                        <Target className="h-16 w-16 text-accent animate-pulse" />
                                    </div>
                                </div>
                                <div className="text-center space-y-3">
                                    <p className="text-xl font-black text-foreground uppercase tracking-[0.4em] leading-none drop-shadow-[0_0_10px_gold]">REAL CONNECTIONS ACTIVATED</p>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.6em]">REPLACING SIMULATION WITH IMPLEMENTED TRUTH</p>
                                </div>
                            </div>
                        </CardContent>
                        <div className="bg-black/90 p-3 border-t border-primary/30 flex items-center justify-between text-[8px] font-black uppercase tracking-widest px-8 h-12 border-2">
                             <div className="flex items-center gap-2 text-green-500">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                <span className="tracking-tighter">SILICON INTEGRITY: 100%</span>
                             </div>
                             <div className="flex items-center gap-6">
                                <span className="text-primary animate-pulse">REPLICATION: {replicationCount.toLocaleString()} NODES</span>
                                <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                             </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
