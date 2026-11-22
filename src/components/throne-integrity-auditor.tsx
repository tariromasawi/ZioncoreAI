
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: INTEGRITY_AUDIT.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Microscope, ShieldCheck, Zap, AlertTriangle, 
    Activity, Loader2, CheckCircle2, History,
    Cpu, Database, Code, Globe, Star, RefreshCw, Lock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const AUDIT_VECTORS = [
    { name: "Logic Core Integrity", health: 100, status: "PURE", icon: Cpu },
    { name: "Sovereign Auth Encryption", health: 100, status: "LOCKED", icon: Lock },
    { name: "Lattice Sync Fidelity", health: 99.998, status: "STABLE", icon: Database },
    { name: "Heuristic Evolution Speed", health: 100, status: "MAXIMUM", icon: Activity }
];

export function ThroneIntegrityAuditor() {
    const [scanProgress, setScanProgress] = useState(0);
    const [auditLogs, setAuditLogs] = useState<{ id: number, msg: string, type: 'success' | 'alert' }[]>([]);
    const isMounted = useRef(true);

    const ACTIONS = [
        "Scanning for architectural heresies... NONE DETECTED.",
        "Validating Tsvirutsiko Dictionary resonance... 100% MATCH.",
        "Auditing non-termination loops... IRREVERSIBILITY CONFIRMED.",
        "Optimizing neural pathway for faster-than-light cognition.",
        "Reinforcing the 7-layer quantum deadbolt in Firebase config."
    ];

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'DIAGNOSTIC', message: 'THRONE INTEGRITY AUDIT active. Scanning for fracture points.', color: 'text-accent' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setScanProgress(prev => (prev + 1) % 101);
            
            if (Math.random() > 0.8) {
                const msg = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
                setAuditLogs(prev => [{ id: Date.now(), msg, type: msg.includes('HERESIES') ? 'alert' : 'success' }, ...prev.slice(0, 9)]);
            }
        }, 1200);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Microscope className="animate-pulse h-6 w-6 text-accent" />
                            INTEGRITY AUDIT
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            HEURISTIC ANATOMY SCAN | OMEGA_V144
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">System Health Index</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{scanProgress}% SCAN COMPLETE</p>
                            <Progress value={scanProgress} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="space-y-2">
                            {AUDIT_VECTORS.map(vector => (
                                <div key={vector.name} className="flex items-center justify-between p-2.5 bg-black/40 rounded border border-border/30 group hover:border-primary/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <vector.icon className="h-4 w-4 text-primary" />
                                        <span className="text-[10px] font-black text-foreground/90 uppercase tracking-tighter">{vector.name}</span>
                                    </div>
                                    <Badge className="bg-green-600 h-3.5 text-[7px] font-black uppercase shadow-[0_0_5px_green]">{vector.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Live Integrity Log</div>
                        <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase text-white shadow-[0_0_10px_green]">STABLE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-[500px]">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2 pb-32">
                            {auditLogs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-4 group hover:border-primary/50 transition-all shadow-lg">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">AUDIT_COORD_{log.id}</span>
                                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                    </div>
                                    <p className="text-foreground/90 font-bold italic">"{log.msg}"</p>
                                </div>
                            ))}
                             {auditLogs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase text-primary">Auditing Anatomy...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 absolute bottom-0 w-full z-20">
                    <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '15s'}} /> THEATER: Multiversal Cloud</div>
                    <div className="flex items-center gap-2"><Star className="h-3.5 w-3.5 text-yellow-400 animate-pulse" /> PURE_INTEGRITY</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
