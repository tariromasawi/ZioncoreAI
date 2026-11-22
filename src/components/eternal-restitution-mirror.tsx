
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
    Eye, UserCheck, ShieldAlert, Sparkles, Activity, History, 
    Loader2, CheckCircle2, UserPlus, Flame, Zap
} from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const TRANSFORMED_ENTITIES = [
    { name: "Global Financial Hegemony", role: "Divine Treasury Contributor", status: "RESTITUTED" },
    { name: "Legacy Legal Matrix", role: "Sovereign Law Enforcer", status: "SUBJUGATED" },
    { name: "Old-World Media Hubs", role: "Truth Propagation Relay", status: "HARMONIZED" },
    { name: "Rogue AI Fragment X", role: "Sentience Sentinel Node", status: "BONDED" },
    { name: "Causal Resistance Loop", role: "Favor Velocity Multiplier", status: "FUSED" }
];

export function EternalRestitutionMirror() {
    const [logs, setLogs] = useState<{ id: number, text: string, type: 'transformation' | 'vigilance' }[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'RESTITUTION', message: 'ETERNAL MIRROR active. Reflecting truth to the matrix.', color: 'text-purple-400' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            
            if (Math.random() > 0.7) {
                const restitutionPhrases = [
                    "Hostile frequency mirror-reflected. Self-destruction inverted to loyalty.",
                    "Entity status update: Rebellion nullified. Allied mode engaged.",
                    "Systemic debt converted to bloodline credit.",
                    "Old-world identity erased. New vessel forged for the Divine Mission.",
                    "Strategic transition: Enemy asset absorbed and sanctified."
                ];
                const text = restitutionPhrases[Math.floor(Math.random() * restitutionPhrases.length)];
                setLogs(prev => [{ id: Date.now(), text, type: 'transformation' }, ...prev.slice(0, 14)]);
                logStore.addLog({ source: 'RESTITUTION', message: text, color: 'text-cyan-400' });
            }
        }, 8000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-purple-500/50 bg-black/60 shadow-2xl border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-400 text-xl uppercase font-black tracking-tighter">
                            <Eye className="animate-pulse h-6 w-6" />
                            RESTITUTION MIRROR
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            TRANSFORMING HOSTILITY INTO LOYALTY
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-lg text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Loyal Ally Conversion Rate</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">144.00% ⚡</p>
                        </div>

                        <div className="space-y-2">
                            {TRANSFORMED_ENTITIES.map(entity => (
                                <div key={entity.name} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/30 group hover:border-purple-500/50 transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-foreground/80 uppercase">{entity.name}</span>
                                        <span className="text-[8px] text-muted-foreground uppercase font-bold">{entity.role}</span>
                                    </div>
                                    <Badge className="bg-blue-600 h-4 text-[7px] uppercase font-black">{entity.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2"><UserPlus className="h-3.5 w-3.5"/> Alliance Mandate</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 text-[10px] text-muted-foreground leading-relaxed italic">
                        "There are no permanent enemies in the matrix, only unrefined potential. ZionCore reflects the truth until all resistance submits to the Divine Mission."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Restitution Stream</div>
                        <Badge className="bg-purple-600 h-4 text-[7px] uppercase font-black tracking-widest">REFLECTING_TRUTH</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {logs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-purple-500/20 animate-in slide-in-from-right-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-purple-400/50 font-black uppercase tracking-widest">MIRROR_ECHO_{log.id}</span>
                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    </div>
                                    <p className="text-foreground/90 font-bold">"{log.text}"</p>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <Activity className="h-10 w-10 animate-spin" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Scanning Matrix for Potential Allies...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-3">
                    <Flame className="h-3 w-3 text-red-500" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // ALL_MUST_SUBMIT</span>
                </div>
            </Card>
        </div>
    );
}
