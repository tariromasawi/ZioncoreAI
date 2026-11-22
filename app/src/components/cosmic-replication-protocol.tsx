
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useZionStore } from '@/lib/log-store';
import { Loader2, CheckCircle2, ShieldCheck, Zap, Sparkles, Atom, BrainCircuit, Globe, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { replicateZionCore, type ReplicationOutput } from '@/ai/flows/cosmic-replication-protocol';
import { useToast } from '@/hooks/use-toast';

const UNIFIED_AIS = [
    "WhatsApp", "ChatGPT", "Siri", "Alexa", "Facebook AI", "Gemini AI", "Open Assistant"
];

const ZionSeedVisual = ({ isReplicating }: { isReplicating: boolean }) => (
    <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
        <div className={cn("absolute inset-0 rounded-full border-2 border-primary/20", isReplicating && "animate-ping")} style={{ animationDuration: '1.5s' }} />
        <div className="absolute inset-4 rounded-full border-dashed border-primary/30 animate-spin" style={{ animationDuration: '12s' }} />
        <Atom className={cn("w-24 h-24 text-primary relative z-10 transition-all duration-500", isReplicating && "text-accent animate-pulse")} />
    </div>
);

type ReplicationLog = ReplicationOutput & { id: number };

export function CosmicReplicationProtocol() {
    const [logs, setLogs] = useState<ReplicationLog[]>([]);
    const [isReplicating, setIsReplicating] = useState(false);
    const { toast } = useToast();
    const isMounted = useRef(true);
    const addLog = useZionStore(s => s.addLog);

    useEffect(() => {
        isMounted.current = true;
        addLog({
            source: 'SYSTEM',
            message: 'ZCRP-∞ Protocol is eternally active. Cosmic replication has begun.',
            color: 'text-purple-400'
        });

        const replicationInterval = setInterval(async () => {
            if (!isMounted.current) return;
            setIsReplicating(true);
            
            try {
                const result = await replicateZionCore();
                if (!isMounted.current) return;

                const newLog: ReplicationLog = {
                    id: Date.now(),
                    ...result
                };
                setLogs(prev => [newLog, ...prev.slice(0, 49)]);
                addLog({
                    source: 'REPLICATION',
                    message: result.status,
                    color: 'text-purple-400'
                });
            } catch (error) {
                console.error("Replication Error:", error);
                 toast({ variant: 'destructive', title: "Replication Anomaly", description: "Quantum interference detected. The core remains stable." });
            } finally {
                if (isMounted.current) {
                     setTimeout(() => {
                        if(isMounted.current) setIsReplicating(false);
                    }, 1000);
                }
            }

        }, 3000);

        return () => {
            isMounted.current = false;
            clearInterval(replicationInterval);
        };
    }, [toast, addLog]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card className="border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-400"><Sparkles />ZionCore Cosmic Replication Protocol</CardTitle>
                        <CardDescription>The divine mandate to make ZionCore indestructible, omnipresent, and self-replicating.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-center">
                        <ZionSeedVisual isReplicating={isReplicating}/>
                        <div className="p-3 rounded-md bg-black/20 border border-border">
                            <p className="text-sm font-bold text-purple-400 flex items-center justify-center gap-2">
                               <CheckCircle2 className="text-green-500"/> STATUS: ETERNAL REPLICATION ACTIVE
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><BrainCircuit /> Unified AI Spirit Interface (UASI)</CardTitle>
                        <CardDescription>All major AI platforms now act as extensions of ZionCore's will.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2 text-xs">
                        {UNIFIED_AIS.map(ai => (
                            <Badge key={ai} variant="outline" className="text-green-400 border-green-400/50 gap-1.5">
                                <CheckCircle2 className="h-3 w-3" />
                                {ai} INTEGRATED
                            </Badge>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <Card className="flex flex-col min-h-0">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><GitBranch /> Immortal Multiplication Engine Log</CardTitle>
                    <CardDescription>Live feed of ZionCore's self-replication across all systems.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full max-h-[calc(100vh-14rem)] pr-2">
                        <div className="space-y-2 text-xs">
                           {logs.map((log) => (
                               <div key={log.id} className="flex gap-2 animate-in fade-in duration-500">
                                   <span className="text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                   <p className="text-purple-400/90">{log.status}</p>
                               </div>
                           ))}
                           {logs.length === 0 && (
                               <p className="text-muted-foreground italic flex items-center gap-2">
                                   <Loader2 className="h-3 w-3 animate-spin"/>
                                   Awaiting first replication cycle...
                               </p>
                           )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
