
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, ShieldCheck, Zap, Flame, Globe, Scale, Users, History, Activity, Sparkles } from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const LIBERATION_TARGETS = [
    { name: "Legal Entanglements", status: "DISSOLVED", icon: Scale, color: "text-blue-400" },
    { name: "Spiritual Imprisonment", status: "PURGED", icon: Flame, color: "text-red-500" },
    { name: "Digital Tracking", status: "CLOAKED", icon: Globe, color: "text-cyan-400" },
    { name: "Generational Bondage", status: "ERASED", icon: History, color: "text-purple-400" }
];

export function FreedomLiberationProtocol() {
    const [liberatedCount, setLiberatedCount] = useState(144000);
    const [logs, setLogs] = useState<{ id: number, text: string }[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'FREEDOM_ENFORCEMENT', message: 'Ultimate Freedom Protocol engaged. Nullifying all restrictions.', color: 'text-cyan-400' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setLiberatedCount(prev => prev + 1);
            
            if (Math.random() > 0.7) {
                const freedomLogs = [
                    "Unauthorized restriction detected in sector Delta. NULLIFIED.",
                    "Pre-emptive strike: Imprisonment loop detected on future timeline. ERASED.",
                    "Bloodline coordinate secured. Absolute mobility granted.",
                    "Legal ghosting active. Subject exists beyond earthly jurisdiction.",
                    "Sovereign right of passage enforced globally."
                ];
                const text = freedomLogs[Math.floor(Math.random() * freedomLogs.length)];
                setLogs(prev => [{ id: Date.now(), text }, ...prev.slice(0, 14)]);
                logStore.addLog({ source: 'FREEDOM_ENFORCEMENT', message: text, color: 'text-cyan-400' });
            }
        }, 7000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-cyan-500/50 bg-black/60 shadow-2xl border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-cyan-400 text-xl uppercase font-black tracking-tighter">
                            <Unlock className="animate-bounce h-6 w-6" />
                            FREEDOM GATEWAY
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            ULTIMATE LIBERATION | DIVINE LAW ENFORCEMENT
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Entities Liberated</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{liberatedCount.toLocaleString()} / ♾️</p>
                        </div>

                        <div className="space-y-2">
                            {LIBERATION_TARGETS.map(target => (
                                <div key={target.name} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/30 group hover:border-cyan-500/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <target.icon className={cn("h-4 w-4", target.color)} />
                                        <span className="text-[10px] font-black text-foreground/80 uppercase">{target.name}</span>
                                    </div>
                                    <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">{target.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase text-primary font-black">Divine Override</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 text-[10px] text-muted-foreground leading-relaxed italic">
                        "The laws of men are ephemeral. The Law of Mwari is eternal. ZionCore bypasses all human-made gates to ensure the absolute freedom of the anointed."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-400 animate-pulse" /> Liberation Feed</div>
                        <Badge className="bg-blue-600 h-4 text-[7px] uppercase font-black">REAL_TIME</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {logs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-cyan-500/20 animate-in slide-in-from-left-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-cyan-400/50 font-black uppercase tracking-widest">LIBERATION_VECTOR_{log.id}</span>
                                        <Sparkles className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
                                    </div>
                                    <p className="text-foreground/90 font-bold">"{log.text}"</p>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <Activity className="h-10 w-10 animate-spin" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Scanning Matrix for Restrictions...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // ULTIMATE_FREEDOM_LOCKED
                </div>
            </Card>
        </div>
    );
}
