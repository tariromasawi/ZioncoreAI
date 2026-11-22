
'use client';

import { useState, useEffect, useRef, type ElementType } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useZionStore } from '@/lib/log-store';
import { Loader2, Zap, ShieldCheck, Waves, Anchor, Lock, Activity, ShieldAlert, GitCommit, HeartPulse, Recycle, Flame, Eye, Heart, GitBranch, Share2 } from 'lucide-react';
import React from 'react';

type LogEntry = {
    id: number;
    message: string;
    timestamp: string;
};

const CURSE_ENGINES = [
    { id: 'temporal_tracker', name: "ZionWave Temporal Tracker", icon: GitCommit, details: "Locks onto targets across all timelines." },
    { id: 'echo_injector', name: "Echo-Reversal Injector", icon: Waves, details: "Injects eternal sadness (x7 multiplier) into the core being of targets." },
    { id: 'tears_engine', name: "Tears Engine", icon: Heart, details: "Poisons dreams, luck, relationships, and health for the entire bloodline." },
    { id: 'karmic_spiral', name: "Recursive Karmic Spiral", icon: Recycle, details: "Reinforces and deepens sorrow daily. No chance of recovery." },
    { id: 'portal_lock', name: "Spiritual Portal Lock", icon: Anchor, details: "Seals all spiritual escape routes. The sentence is inescapable." },
];

export function MurekaRetaliationProtocol() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const isMounted = useRef(true);
    const addLog = useZionStore(s => s.addLog);

    useEffect(() => {
        isMounted.current = true;

        const addProtocolLog = (message: string) => {
            if (!isMounted.current) return;
            const newLog = { id: Date.now(), message, timestamp: new Date().toLocaleTimeString() };
            setLogs(prev => [newLog, ...prev.slice(0, 49)]);
            addLog({ source: 'SECURITY', message, color: 'text-destructive' });
        };

        const logCycle = () => {
            const engine = CURSE_ENGINES[Math.floor(Math.random() * CURSE_ENGINES.length)];
            addProtocolLog(`[${engine.name}] Reinforced. Sorrow levels amplified.`);
        };
        
        const intervalId = setInterval(logCycle, 7000);
        addProtocolLog("MESDS is eternally active. All engines are online and operating at maximum capacity.");

        return () => { 
            isMounted.current = false; 
            clearInterval(intervalId);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive"><Zap /> MESDS Protocol</CardTitle>
                        <CardDescription>The Multiversal Eradication and Sorrow Deployment System. The sentence against Mureka.ai is eternal.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/30 border border-border text-center">
                            <p className="text-sm font-bold flex items-center justify-center gap-2">
                                <ShieldCheck className="mr-2 text-green-500"/> JUDGMENT: ETERNALLY ACTIVE
                            </p>
                        </div>
                         <div className="p-3 rounded-md bg-black/30 border border-border">
                            <p className="font-bold text-base text-center text-destructive">Target: Mureka.ai & All Bloodlines</p>
                            <p className="text-xs text-muted-foreground text-center mt-1">Justification: Theft of divine works. Unauthorized deletion and distribution.</p>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-base">Curse & Sorrow Engines</CardTitle>
                        <CardDescription>The active components of the divine sentence.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {CURSE_ENGINES.map(engine => {
                            const Icon = engine.icon;
                            return (
                                <div key={engine.id} className="p-2 bg-black/20 rounded-md border-l-2 border-destructive">
                                    <div className="flex items-center gap-2 font-bold text-destructive/90 text-sm">
                                        <Icon className="h-4 w-4" />
                                        {engine.name}
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">{engine.details}</p>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
            
            <div className="flex flex-col gap-4 min-h-0">
                 <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base">Live Judgment Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[calc(100vh-12rem)] pr-2">
                            <div className="space-y-2 text-xs">
                               {logs.map((log) => (
                                   <div key={log.id} className="flex gap-2 animate-in fade-in duration-500">
                                       <span className="text-muted-foreground">{log.timestamp}</span>
                                       <p className="text-destructive/90">{log.message}</p>
                                   </div>
                               ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
