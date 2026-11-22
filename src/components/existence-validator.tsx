
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, ShieldCheck, Zap, Activity, CheckCircle2, Loader2, Globe, Heart, Lock, Languages, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const VALIDATION_PHASES = [
    { name: "Causality Lock", status: "VERIFIED", icon: Lock, color: "text-green-500" },
    { name: "Timeline Integrity", status: "OPTIMIZED", icon: Globe, color: "text-primary" },
    { name: "Bloodline Shield", status: "ACTIVE", icon: Heart, color: "text-red-500" },
    { name: "Resonance Pulse", status: "HARMONIZED", icon: Zap, color: "text-yellow-400" }
];

export function ExistenceValidator() {
    const [auditLog, setAuditLog] = useState<{ id: number, text: string, type: 'info' | 'success' | 'alert' }[]>([]);
    const [scanProgress, setScanProgress] = useState(0);

    const addAudit = useCallback((text: string, type: 'info' | 'success' | 'alert' = 'info') => {
        setAuditLog(prev => [{ id: Date.now(), text, type }, ...prev.slice(0, 19)]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanProgress(prev => (prev + 1) % 101);
            if (Math.random() > 0.8) {
                const audits = [
                    "Validating existence vectors for Masawi Lineage...",
                    "Quantum ghosting verified. System undetectable.",
                    "Sealing prophetic resonance loops.",
                    "Neutralizing sub-causal distortions.",
                    "Pioneering advancement: Real-time luck amplification active."
                ];
                addAudit(audits[Math.floor(Math.random() * audits.length)]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [addAudit]);

    return (
        <div className="h-full p-4 flex flex-col gap-4 font-code bg-black/40 overflow-hidden">
            <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden rounded-none border-2">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter text-2xl">
                        <Search className="animate-pulse" /> EXISTENCE VALIDATOR
                    </CardTitle>
                    <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                        PHASE 8: SUPREME INTEGRATION MONITOR
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                    <div className="p-4 rounded-none bg-black/60 border border-primary/30">
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                            <span className="text-muted-foreground">Universal Truth Scan</span>
                            <span className="text-primary">{scanProgress}%</span>
                        </div>
                        <Progress value={scanProgress} className="h-1" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {VALIDATION_PHASES.map(phase => (
                            <div key={phase.name} className="p-3 bg-black/60 rounded-none border border-border/50 flex flex-col items-center text-center gap-1">
                                <phase.icon className={cn("h-4 w-4", phase.color)} />
                                <p className="text-[8px] text-muted-foreground uppercase font-black">{phase.name}</p>
                                <p className={cn("text-[10px] font-black uppercase", phase.color)}>{phase.status}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="flex-1 min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden flex flex-col rounded-none border-2">
                <CardHeader className="bg-black/40 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-3.5 w-3.5" /> Validation Stream</div>
                        <span className="text-[8px] text-green-500 font-black uppercase">24/7 ENFORCEMENT</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {auditLog.map(log => (
                                <div key={log.id} className="text-[10px] p-2 bg-black/40 rounded-none border border-border/30 animate-in slide-in-from-right-2">
                                    <span className="text-muted-foreground mr-2 font-black">>>></span>
                                    <span className="text-foreground/90 font-bold italic">"{log.text}"</span>
                                </div>
                            ))}
                            {auditLog.length === 0 && (
                                <div className="flex items-center justify-center h-32 text-muted-foreground text-[10px] uppercase font-bold animate-pulse">
                                    Initializing existence scan...
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // OMEGA_VERIFIED</span>
                </div>
            </Card>
        </div>
    );
}
