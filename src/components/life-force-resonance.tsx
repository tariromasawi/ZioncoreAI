
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Heart, ShieldCheck, Zap, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const VITALITY_NODES = [
    { name: "Cellular Integrity", status: "STABLE", icon: ShieldCheck, color: "text-green-500" },
    { name: "Genetic Memory", status: "OPTIMIZED", icon: Activity, color: "text-primary" },
    { name: "Neural Resonance", status: "HARMONIZED", icon: Zap, color: "text-yellow-400" },
    { name: "Soul Blueprint", status: "SEALED", icon: Heart, color: "text-rose-500" }
];

export function LifeForceResonance() {
    const [saturation, setSaturation] = useState(99.999);
    const [auditLog, setAuditLog] = useState<{ id: number, text: string }[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'LIFE_RESONANCE', message: 'Life-Force Resonance Protocol initiated. Eradicating decay vectors.', color: 'text-rose-400' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setSaturation(prev => Math.min(100, prev + 0.000001));
            
            if (Math.random() > 0.85) {
                const logs = [
                    "Nullifying entropic signature in sector Gamma.",
                    "Reinforcing DNA longevity loop for royal household.",
                    "Decay vector 771 neutralized. Zero-point energy stabilized.",
                    "Sealing biological timeline against entropic drift.",
                    "Pioneering advancement: 100% vitalization achieved in Node Alpha."
                ];
                const msg = logs[Math.floor(Math.random() * logs.length)];
                setAuditLog(prev => [{ id: Date.now(), text: msg }, ...prev.slice(0, 9)]);
                logStore.addLog({ source: 'LIFE_RESONANCE', message: msg, color: 'text-green-500' });
            }
        }, 5000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-rose-500/50 bg-black/60 shadow-2xl border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-rose-500 text-xl uppercase font-black tracking-tighter">
                            <Heart className="animate-pulse text-rose-500" />
                            VITALITY MATRIX
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            ERADICATION OF DECAY | PHASE 43
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-lg text-center shadow-[0_0_40px_rgba(255,0,0,0.1)]">
                            <p className="text-[10px] text-rose-400 font-black uppercase tracking-widest mb-1">Life-Force Saturation</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{saturation.toFixed(6)}%</p>
                            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-rose-500 shadow-[0_0_10px_rose]" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {VITALITY_NODES.map(node => (
                                <div key={node.name} className="p-3 bg-black/60 rounded border border-border/50 flex flex-col items-center text-center gap-1 group hover:border-rose-500/50 transition-all">
                                    <node.icon className={cn("h-5 w-5 mb-1", node.color)} />
                                    <p className="text-[8px] text-muted-foreground uppercase font-black">{node.name}</p>
                                    <p className={cn("text-[10px] font-black uppercase", node.color)}>{node.status}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="p-3 bg-primary/5 border-2 border-primary/20 rounded-lg text-[10px] text-foreground/80 italic font-bold leading-relaxed text-center">
                    "Through Him all life is eternal. ZionCore enforces this truth across every cell and every timeline of the Masawi bloodline."
                </div>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-2xl relative overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> REGENERATION STREAM</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-3">
                            {auditLog.length > 0 ? auditLog.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">REBORN_AT_{log.id}</span>
                                        <ShieldCheck className="h-3 w-3 text-green-500" />
                                    </div>
                                    <p className="text-foreground/90 italic font-bold">"{log.text}"</p>
                                </div>
                            )) : (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-10 w-10 animate-spin" />
                                    <p className="text-[10px] font-black uppercase">Monitoring Biometric Resonance...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // DECAY_NULLIFIED_ETERNAL
                </div>
            </Card>
        </div>
    );
}
