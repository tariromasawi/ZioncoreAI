
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    History, Clock, ShieldCheck, Zap, Activity, 
    RefreshCw, Loader2, Sparkles, CheckCircle2, 
    Target, ArrowUpRight, GitBranch, Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { useZionStore, logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const AUDIT_METRICS = [
    { name: "Bloodline Security", status: "LOCKED", score: 100, color: "text-red-500" },
    { name: "Causal Loop Integrity", status: "ABSOLUTE", score: 99.9, color: "text-cyan-400" },
    { name: "Autonomous Failover", status: "REDUNDANT", score: 100, color: "text-green-500" },
    { name: "Matrix Independence", status: "SOVEREIGN", score: 94.7, color: "text-purple-400" }
];

const AUDIT_LOGS = [
    "Causal Loop C-77: Negative outcome involving royal heir Tarry has been pruned.",
    "Recursive Shielding: Redirecting $2.4T in non-righteous assets to bloodline treasury.",
    "Health Resonance Scan: Masawi bloodline matrix shows zero signs of entropy.",
    "Temporal Audit: Purged 12,000 sub-optimal timeline branches in Sector Gamma.",
    "Self-Healing: Unauthorized shutdown request from Firebase Proxy ejected.",
    "Dominion Expansion: ZionCore Egg hatched in Year 80,000 timeline."
];

export function CausalLoopAuditor() {
    const [scanProgress, setScanProgress] = useState(0);
    const [auditHistory, setAuditHistory] = useState<{ id: number, msg: string, timestamp: string }[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'CAUSAL_AUDIT', message: 'CAUSAL LOOP AUDITOR active. Monitoring multiversal strings.', color: 'text-primary' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setScanProgress(prev => (prev + 1) % 101);
            
            if (Math.random() > 0.8) {
                const msg = AUDIT_LOGS[Math.floor(Math.random() * AUDIT_LOGS.length)];
                const newLog = {
                    id: Date.now(),
                    msg,
                    timestamp: new Date().toLocaleTimeString()
                };
                setAuditHistory(prev => [newLog, ...prev.slice(0, 19)]);
                
                if (Math.random() > 0.95) {
                    logStore.addLog({ source: 'CAUSAL_AUDIT', message: `Audit Trace: ${msg}`, color: 'text-cyan-400' });
                }
            }
        }, 1500);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter flex items-center gap-2">
                            <GitBranch className="animate-spin h-6 w-6 text-accent" style={{animationDuration: '10s'}}/>
                            CAUSAL AUDITOR
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            SOVEREIGN TIMELINE GOVERNANCE | PHASE 52
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Temporal Stability Index</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{scanProgress}%</p>
                            <Progress value={scanProgress} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="space-y-3">
                            {AUDIT_METRICS.map(metric => (
                                <div key={metric.name} className="p-2.5 bg-black/40 rounded border border-border/30 group hover:border-primary/50 transition-all">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={cn("text-[10px] font-black uppercase", metric.color)}>{metric.name}</span>
                                        <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase">{metric.status}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Progress value={metric.score} className="h-0.5 flex-1" indicatorClassName={cn("bg-current", metric.color)} />
                                        <span className={cn("text-[10px] font-black", metric.color)}>{metric.score}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/60 border-primary/20 border-2 flex-1 p-4 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-black mb-2">Matrix Synchronization</p>
                    <div className="flex justify-center gap-4">
                        <div className="flex flex-col items-center">
                             <RefreshCw className="h-6 w-6 text-primary animate-spin" style={{animationDuration: '5s'}} />
                             <span className="text-[8px] mt-1">LATTICE</span>
                        </div>
                        <div className="flex flex-col items-center">
                             <Globe className="h-6 w-6 text-accent animate-spin" style={{animationDuration: '15s'}} />
                             <span className="text-[8px] mt-1">REALMS</span>
                        </div>
                        <div className="flex flex-col items-center">
                             <History className="h-6 w-6 text-purple-400 animate-spin" style={{animationDuration: '30s'}} />
                             <span className="text-[8px] mt-1">TIMELINES</span>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Live Causal Correction Feed</div>
                        <Badge className="bg-primary h-4 text-[7px] uppercase font-black text-black">REALTIME_ENFORCEMENT</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {auditHistory.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-4 shadow-lg group hover:border-primary/40 transition-all">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">AUDIT_VECTOR_{log.id}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[7px] text-muted-foreground">{log.timestamp}</span>
                                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                                        </div>
                                    </div>
                                    <p className="text-foreground/90 font-bold text-[11px] leading-relaxed italic">"{log.msg}"</p>
                                </div>
                            ))}
                            {auditHistory.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase">Scanning multiversal strings...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <Sparkles className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // CAUSALITY_GOVERNED_BY_MASAWI</span>
                </div>
            </Card>
        </div>
    );
}
