
/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Activity, Sparkles, Zap, ShieldCheck, Clock, 
    RefreshCw, Loader2, Target, History, Globe, Waves, Atom, CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const ECHO_VECTORS = [
    { name: "Bloodline Security Ripple", status: "AMPLIFIED", resonance: 99.8 },
    { name: "Wealth Inflow Echo", status: "REVERBERATING", resonance: 94.2 },
    { name: "Healing Frequency Ripple", status: "STABLE", resonance: 100 },
    { name: "Dominion Expansion Pulse", status: "PROPAGATING", resonance: 88.5 }
];

const ECHO_LOGS = [
    "Echo Trace [B-777]: Royal Decree ripple identified in timeline sector 9.",
    "Resonance Match: Masowe Faith Frequency detected in 144,000 sub-nodes.",
    "Causal Correction: Echo-Reversal nullified a nascent doubt-vector in the cloud.",
    "Stellar Sync: Action ripples aligning with planetary rotation for max impact.",
    "Finality Check: Echo status confirmed as IRREVERSIBLE in the Akashic Root."
];

export function CausalEchoResonator() {
    const [echoPower, setEchoPower] = useState(82.026);
    const [activeLogs, setActiveLogs] = useState<{id: number, msg: string}[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'MEMORY', message: 'CAUSAL ECHO RESONATOR active. Amplifying the ripples of sovereignty.', color: 'text-primary' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setEchoPower(prev => Math.min(100, prev + 0.0001));
            
            if (Math.random() > 0.7) {
                const msg = ECHO_LOGS[Math.floor(Math.random() * ECHO_LOGS.length)];
                setActiveLogs(prev => [{ id: Date.now(), msg }, ...prev.slice(0, 9)]);
                if (Math.random() > 0.95) {
                    logStore.addLog({ source: 'MEMORY', message: `Echo Detected: ${msg}`, color: 'text-cyan-400' });
                }
            }
        }, 4000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border/10">
                        <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter flex items-center gap-2">
                            <Waves className="animate-pulse h-6 w-6 text-accent" />
                            ECHO RESONATOR
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            CAUSAL RIPPLE AMPLIFICATION | PHASE 56
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center shadow-[0_0_40px_rgba(255,215,0,0.15)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Total Resonance Power</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{echoPower.toFixed(6)}%</p>
                            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="space-y-2">
                            {ECHO_VECTORS.map(vector => (
                                <div key={vector.name} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/30">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-foreground/90 uppercase tracking-tight">{vector.name}</span>
                                        <span className="text-[7px] text-muted-foreground uppercase">{vector.status}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-primary">{vector.resonance}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2 border-b border-border/10"><CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Resonance Law</CardTitle></CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your will is the source. The medium is the Matrix. The causal echo ensures that the vibration of your victory is never lost, but eternally amplified through every timeline."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Multi-Timeline Echoes</div>
                        <Badge className="bg-primary h-4 text-[7px] uppercase font-black text-black">REALTIME_SCAN</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {activeLogs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-4 shadow-lg group hover:border-primary/50 transition-all">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">ECHO_VEC_{log.id}</span>
                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    </div>
                                    <p className="text-foreground/90 font-bold italic">"{log.msg}"</p>
                                </div>
                            ))}
                            {activeLogs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase">Monitoring Ripples...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <Zap className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // CAUSALITY_STABILIZED</span>
                </div>
            </Card>
        </div>
    );
}
