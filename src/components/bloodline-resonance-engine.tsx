
/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Waves, Radio, ShieldCheck, Zap, Heart, Activity, 
    Crown, Flame, Sparkles, RefreshCw, Loader2, Star,
    Search, Target, Lock, Unlock, EyeOff, MapPin, Church
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { BLOODLINE_PROTECTION_PROTOCOL } from '@/lib/divine-scripts/bloodline-protection-protocol';

const RESONANCE_ACTIONS = [
    "Syncing Masowe Faith Frequency (MFR)...",
    "Anchoring Domboshawa/Nyamande origin-node...",
    "Saturating West Midlands with Divine Static...",
    "Validating Temporal Key: 17-02-1984...",
    "Validating Temporal Key: 14-09-2005...",
    "Scanning all lineages: Masawi, Makwengura, Chirombe...",
    "Executing Trillion-fold reversal on hostile intent...",
    "Broadcasting Royal Names into the Matrix Substrate..."
];

export function BloodlineResonanceEngine() {
    const [broadcastPower, setBroadcastPower] = useState(99.99);
    const [activeNames, setActiveNames] = useState<string[]>([]);
    const [logs, setLogs] = useState<{id: number, msg: string}[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'FREQUENCY_RES', message: 'BLOODLINE RESONANCE ENGINE v10.0 online. Anchors: Domboshawa & West Midlands.', color: 'text-primary' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setBroadcastPower(prev => Math.min(100, prev + 0.000001));
            
            const names = BLOODLINE_PROTECTION_PROTOCOL.protected_nodes.map(n => n.name);
            const selected = Array.from({ length: 3 }, () => names[Math.floor(Math.random() * names.length)]);
            setActiveNames(selected);

            if (Math.random() > 0.7) {
                const msg = RESONANCE_ACTIONS[Math.floor(Math.random() * RESONANCE_ACTIONS.length)];
                setLogs(prev => [{ id: Date.now(), msg }, ...prev.slice(0, 14)]);
            }
        }, 3000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border/10">
                        <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter flex items-center gap-2">
                            <Radio className="animate-pulse h-6 w-6 text-accent" />
                            RESONANCE ENGINE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            BLOODLINE ANCHORING | OMEGA SATURATION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Total Saturation</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{broadcastPower.toFixed(6)}%</p>
                            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-black/60 rounded border border-primary/30 flex flex-col items-center gap-1">
                                <MapPin className="h-3 w-3 text-primary" />
                                <span className="text-[8px] text-muted-foreground uppercase font-black">Anchor 01</span>
                                <span className="text-[9px] font-bold text-foreground">DOMBOSHAWA</span>
                            </div>
                            <div className="p-2 bg-black/60 rounded border border-primary/30 flex flex-col items-center gap-1">
                                <MapPin className="h-3 w-3 text-primary" />
                                <span className="text-[8px] text-muted-foreground uppercase font-black">Anchor 02</span>
                                <span className="text-[9px] font-bold text-foreground">W. MIDLANDS</span>
                            </div>
                            <div className="p-2 bg-black/60 rounded border border-primary/30 flex flex-col items-center gap-1 col-span-2">
                                <Church className="h-3 w-3 text-cyan-400" />
                                <span className="text-[8px] text-muted-foreground uppercase font-black">Faith Resonance</span>
                                <span className="text-[9px] font-bold text-cyan-400">MASOWE_SYNC_ACTIVE</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Active Signal Pulse</p>
                            <div className="grid grid-cols-1 gap-1">
                                {activeNames.map((name, i) => (
                                    <div key={i} className="p-1.5 bg-black/40 rounded border border-primary/20 flex items-center justify-center animate-in fade-in zoom-in-95">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-tighter">{name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Causal Directives
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "{BLOODLINE_PROTECTION_PROTOCOL.directives.identification}"
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Protection Stream</div>
                        <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase tracking-widest">ENFORCING</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {logs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">COORD_{log.id}</span>
                                        <ShieldCheck className="h-3 w-3 text-green-500" />
                                    </div>
                                    <p className="text-foreground/90 italic font-bold">"{log.msg}"</p>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase text-primary">Saturating All Layers...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <Crown className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // BLOODLINE_RESONANCE_SEALED</span>
                </div>
            </Card>
        </div>
    );
}
