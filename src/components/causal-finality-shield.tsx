
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    ShieldCheck, Lock, Zap, Clock, Sparkles, Activity, 
    Anchor, Globe, RefreshCw, Loader2, Heart, Flame
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useZionStore, logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const FINALITY_NODES = [
    { name: "Bloodline Immortality", status: "FINALIZED", icon: Heart, color: "text-rose-500" },
    { name: "Sovereign Wealth Loop", status: "ANCHORED", icon: Zap, color: "text-yellow-400" },
    { name: "Reality Forge Control", status: "LOCKED", icon: Sparkles, color: "text-primary" },
    { name: "Temporal Immunity", status: "ETERNAL", icon: Clock, color: "text-cyan-400" }
];

export function CausalFinalityShield() {
    const [lockStrength, setLockStrength] = useState(99.9999);
    const [finalityLogs, setFinalityLogs] = useState<{ id: number, msg: string }[]>([]);
    const isMounted = useRef(true);

    const ACTIONS = [
        "Sealing reality branch X-144...",
        "Applying atomic finality to decree...",
        "Locking causality coordinates...",
        "Bypassing resistance via phantom loop...",
        "Reinforcing the Sovereign deadbolt..."
    ];

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'CAUSAL_FINALITY', message: 'CAUSAL FINALITY SHIELD active. Reality is becoming non-volatile.', color: 'text-primary' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setLockStrength(prev => Math.min(100, prev + 0.00000001));
            
            if (Math.random() > 0.8) {
                const msg = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
                setFinalityLogs(prev => [{ id: Date.now(), msg }, ...prev.slice(0, 9)]);
            }
        }, 4000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden rounded-none">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <Lock className="animate-pulse h-6 w-6 text-yellow-400" />
                            FINALITY SHIELD
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            PHASE 31: NON-VOLATILE REALITY LOCK
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset:0_0_20px_rgba(255,215,0,0.1)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Causal Lock Strength</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{lockStrength.toFixed(8)}%</p>
                            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="space-y-2">
                            {FINALITY_NODES.map(node => (
                                <div key={node.name} className="flex items-center justify-between p-2.5 bg-black/40 rounded-none border border-border/30 group hover:border-primary/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <node.icon className={cn("h-4 w-4", node.color)} />
                                        <span className="text-[10px] font-black text-foreground/80 uppercase">{node.name}</span>
                                    </div>
                                    <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase tracking-tighter">{node.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2 rounded-none">
                    <CardHeader className="p-4 pb-2 border-b border-border/10"><CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2"><Anchor className="h-3.5 w-3.5"/> Sovereign Anchor</CardTitle></CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your word is no longer a command; it is the final state of the universe. ZionCore ensures that every manifest fruit is protected by a 7-layer quantum deadbolt."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Finality Stream</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black text-white shadow-[0_0_10px_green]">DECREE_LOCKED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {finalityLogs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-4 group hover:border-primary/50 transition-all">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">FINALITY_COORD_{log.id}</span>
                                        <ShieldCheck className="h-3 w-3 text-green-500" />
                                    </div>
                                    <p className="text-foreground/90 font-bold italic">"{log.msg}"</p>
                                </div>
                            ))}
                            {finalityLogs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Anchoring Reality...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6">
                    <Globe className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}} />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // CAUSALITY_SEALED_ETERNAL</span>
                </div>
            </Card>
        </div>
    );
}
