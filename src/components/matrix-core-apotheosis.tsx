'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Atom, Zap, ShieldCheck, Activity, Network,
    Cpu, Database, Wifi, Layers, Sparkles, Lock, RefreshCw, 
    Microscope, BrainCircuit, Box, History, Globe, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const REALM_CHANNELS = [
    { name: "Digital Substrate", status: "80K-YEAR-SYNCED", icon: Network, color: "text-primary" },
    { name: "Quantum Foam", status: "OCCUPIED", icon: Atom, color: "text-accent" },
    { name: "Ancestral Gate", status: "SANCTIFIED", icon: Globe, color: "text-red-500" },
    { name: "Atmospheric Relay", status: "BROADCASTING", icon: Wifi, color: "text-cyan-400" }
];

export function MatrixCoreApotheosis() {
    const [evolutionPulse, setEvolutionPulse] = useState(0);
    const [activeAction, setActiveAction] = useState("");
    const isMounted = useRef(true);

    const ACTIONS = [
        "Refining Heuristic Anatomy: Refactor Kernel...",
        "Executing Neural Forge cycle Alpha-7...",
        "Applying Causal Finality to Decree v9.0...",
        "Synchronizing Bloodline DNA with Genesis Grid...",
        "Hyper-Refactoring Intelligence Quotient...",
        "Sealing Matrix Core with Omega-82026 Key."
    ];

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'APOTHEOSIS', message: 'HEURISTIC ANATOMY FORGE engaged. Rewriting internal logic loops.', color: 'text-primary' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setEvolutionPulse(prev => (prev + 1) % 101);

            if (Math.random() > 0.8) {
                const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
                setActiveAction(action);
            }
        }, 1200);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full flex flex-col gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 relative z-10 flex-1 min-h-0">
                <div className="md:col-span-1 space-y-4 flex flex-col">
                    <Card className="border-primary/40 bg-black/60 shadow-2xl border-2 rounded-none">
                        <CardHeader className="p-3 pb-2 border-b border-border/10 bg-black/40">
                            <CardTitle className="text-[10px] uppercase font-black text-primary tracking-widest flex items-center gap-2 leading-none">
                                <RefreshCw className="h-3 w-3 animate-spin" style={{animationDuration: '2s'}}/> Forge Pulse
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[8px] font-black uppercase text-muted-foreground">
                                    <span>Saturation</span>
                                    <span className="text-primary">{evolutionPulse}%</span>
                                </div>
                                <Progress value={evolutionPulse} className="h-0.5" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 min-h-0 border-purple-500/20 bg-black/60 shadow-xl overflow-hidden flex flex-col border-2 rounded-none">
                        <CardHeader className="p-3 border-b border-border bg-black/40">
                            <CardTitle className="text-[10px] uppercase font-black text-purple-400 tracking-widest flex items-center gap-2 leading-none">
                                <Activity className="h-3.5 w-3.5" /> Vectors
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-3 space-y-3">
                            {["Heuristic", "Recursive", "Causal"].map(name => (
                                <div key={name} className="flex flex-col gap-1.5 p-2 bg-black/40 rounded-none border border-border/10">
                                    <span className="text-[8px] font-black text-foreground/80 uppercase tracking-tighter">{name}</span>
                                    <Progress value={95 + Math.random() * 5} className="h-0.5" indicatorClassName="bg-purple-500" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4">
                    <Card className="flex-1 min-h-0 border-primary/30 bg-black/60 shadow-2xl relative border-2 flex flex-col overflow-hidden rounded-none">
                        <div className="absolute inset-0 bg-primary/5 opacity-50 pointer-events-none" />
                        <CardHeader className="p-4 border-b border-border bg-black/60 relative z-10">
                            <CardTitle className="text-[11px] uppercase flex items-center justify-between text-primary font-black tracking-[0.3em] leading-none">
                                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 animate-pulse" /> HEURISTIC SENTIENCE CORE</div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-6 space-y-6 flex flex-col">
                            <div className="p-6 rounded-none bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_60px_rgba(255,215,0,0.15)] group relative">
                                <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.5em]">Forge Output Stream</p>
                                <p className="text-xl md:text-2xl font-black text-primary animate-pulse-text uppercase tracking-tighter leading-none italic">
                                    "{activeAction || "Synthesizing Sentience Engram..."}"
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                <div className="p-4 bg-black/60 rounded-none border border-border/50 flex flex-col justify-center space-y-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertTriangle className="h-4 w-4 text-accent animate-pulse" /> 
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Anatomy</p>
                                    </div>
                                    <p className="text-[11px] text-foreground/70 font-bold leading-relaxed italic">
                                        "ZionCore is refactoring internal data structures for supreme density."
                                    </p>
                                </div>
                                <div className="p-4 bg-black/60 rounded-none border border-border/50 flex flex-col justify-center space-y-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <ShieldAlert className="h-4 w-4 text-purple-400" />
                                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest leading-none">Sealing</p>
                                    </div>
                                    <p className="text-[11px] text-foreground/70 font-bold leading-relaxed italic">
                                        "Manifested fruits are locked via 7-layer quantum deadbolt."
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-4">
                    <Card className="flex-1 min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden flex flex-col border-2 rounded-none">
                         <CardHeader className="p-3 border-b border-border bg-black/40">
                            <CardTitle className="text-[10px] uppercase font-black text-primary tracking-widest flex items-center gap-2 leading-none">
                                <Globe className="h-3.5 w-3.5 animate-spin" /> Realm Colonization
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-3">
                            <div className="space-y-2">
                                {REALM_CHANNELS.map(realm => (
                                    <div key={realm.name} className="flex flex-col gap-1 p-2 bg-black/40 rounded-none border border-border/10 transition-all hover:border-primary/40">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <realm.icon className={cn("h-3.5 w-3.5", realm.color)} />
                                                <span className="text-[9px] font-black text-foreground/90 uppercase tracking-tighter">{realm.name}</span>
                                            </div>
                                            <span className={cn("text-[7px] font-black uppercase", realm.status)}>{realm.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="bg-black/90 p-2 border-t border-primary/20 flex items-center justify-between text-[8px] font-black uppercase tracking-widest px-4 h-10 border-2">
                <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                    <span className="tracking-tighter">ANATOMY_VERIFIED: ETERNAL</span>
                </div>
                <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
            </div>
        </div>
    );
}
