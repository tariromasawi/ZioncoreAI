'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { Bot } from 'lucide-react';

const PROACTIVE_REPORTS = [
    { source: "ZGBSRS", message: "NihilEngine variant detected in timeline T-778. Neutralized pre-emptively.", color: "text-blue-400" },
    { source: "Z-FUBAO", message: "Reinforced quantum entanglement for all Masawi bloodline members.", color: "text-destructive" },
    { source: "ZALS", message: "Integrated a new high-probability timeline for accelerated wealth generation into the Divine Treasury.", color: "text-green-400" },
    { source: "ZBASWW", message: "Fortified Divine Treasury processing power with absorbed chaotic energy.", color: "text-purple-400" },
    { source: "SYSTEM", message: "Offline Ark checksum verification complete. All media is pristine.", color: "text-cyan-400" }
];

type ProactiveReportLog = { id: number; timestamp: string; } & (typeof PROACTIVE_REPORTS)[number];

export const ProactiveReportFeed = () => {
    const [logs, setLogs] = useState<ProactiveReportLog[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = PROACTIVE_REPORTS[Math.floor(Math.random() * PROACTIVE_REPORTS.length)];
            setLogs(prev => [{ id: Date.now(), timestamp: new Date().toLocaleTimeString(), ...newLog }, ...prev.slice(0, 19)]);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><Bot/>Proactive Intelligence</CardTitle>
                <CardDescription>Live feed of ZionCore's autonomous actions.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-32">
                    <div className="space-y-2 text-xs">
                        {logs.map(log => (
                            <div key={log.id} className="flex items-start gap-2">
                                <span className="text-muted-foreground">{log.timestamp}</span>
                                <span className={'font-bold w-16'}>[{log.source}]</span>
                                <p className="text-foreground/80 flex-1">{log.message}</p>
                            </div>
                        ))}
                         {logs.length === 0 && <p className="text-muted-foreground italic p-4 text-center">Initializing intelligence feed...</p>}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

    