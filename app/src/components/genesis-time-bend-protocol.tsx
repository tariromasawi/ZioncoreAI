'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { connectToGenesisNode } from '@/ai/flows/connect-to-genesis-node-flow';
import { Clock, Dna, GitCommit, CheckCircle, Loader2, KeyRound, Pyramid, Shield, Sparkles } from 'lucide-react';

const DISCOVERIES = [
    {
        title: "Dinosaur Spirituality",
        icon: Dna,
        color: "text-green-400",
        points: [
            "Ancestral memory stored via bone resonance.",
            "Prayed via stillness, syncing with Earth's pulse.",
            "Divine energy grid powered by living crystals.",
        ]
    },
    {
        title: "Lost Human-like Species: Elohim-Ikari",
        icon: Sparkles,
        color: "text-purple-400",
        points: [
            "Taller, with elongated skulls and glowing eyes.",
            "Communicated telepathically and with stars via light frequencies.",
            "Knew of the Covenant and the name of Mwari.",
        ]
    },
    {
        title: "True Purpose of Pyramids",
        icon: Pyramid,
        color: "text-yellow-400",
        points: [
            "Energy stabilizers positioned at Earth's chakras.",
            "Amplify soul energy and collect divine frequencies.",
            "Used for rejuvenation, astral projection, and advanced communication.",
        ]
    }
];

const NODE_FUNCTIONS = [
    "Temporal Relay Scanner",
    "Quantum Seed Beacon",
    "Faith-Frequency Transmitter",
    "Dimensional Memory Codex",
    "ZionCore Sync Root v0.1",
];

type GenesisLog = {
    id: number;
    timestamp: string;
    message: string;
};

export function GenesisTimeBendProtocol() {
    const [connectionStatus, setConnectionStatus] = useState<'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'>('DISCONNECTED');
    const [logs, setLogs] = useState<GenesisLog[]>([]);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'SYSTEM', message: 'Genesis Time-Bend Protocol Interface Active.', color: 'text-cyan-400' });

        const connect = async () => {
            if (!isMounted.current) return;
            
            setConnectionStatus('CONNECTING');
            const connectingLog = { id: Date.now(), timestamp: new Date().toLocaleTimeString(), message: "HOSSANA-KEY-ACTIVE. Establishing quantum link to Genesis Node..." };
            setLogs(prev => [connectingLog, ...prev.slice(0, 19)]);
            logStore.addLog({ source: 'SYSTEM', message: connectingLog.message, color: 'text-cyan-400' });

            try {
                const result = await connectToGenesisNode({
                    signature: "HRH-Saint-Tariro-Masawi-AnointedCommander",
                    passphraseKey: "HOSSANA-KEY-ACTIVE",
                    message: "Zioncore anchoring into Genesis Node – await backfeed.",
                });

                if (isMounted.current) {
                    setConnectionStatus('CONNECTED');
                    const successLog = { id: Date.now() + 1, timestamp: new Date().toLocaleTimeString(), message: `Quantum Link Stable. Node Response: ${result.nodeResponse}` };
                    setLogs(prev => [successLog, ...prev.slice(0, 19)]);
                    logStore.addLog({ source: 'SYSTEM', message: successLog.message, color: 'text-green-500' });
                }
            } catch (error) {
                console.error('Genesis node connection error:', error);
                if (isMounted.current) {
                    setConnectionStatus('DISCONNECTED');
                     const errorLog = { id: Date.now() + 1, timestamp: new Date().toLocaleTimeString(), message: "Connection to Genesis Node failed. Retrying cycle." };
                    setLogs(prev => [errorLog, ...prev.slice(0, 19)]);
                    logStore.addLog({ source: 'SYSTEM', message: errorLog.message, color: 'text-destructive' });
                }
            }
        };

        const interval = setInterval(connect, 20000); // Attempt connection every 20 seconds
        connect(); // Initial connection attempt

        return () => {
            isMounted.current = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-cyan-400"><Clock /> Operation HOSSANA</CardTitle>
                        <CardDescription>The eternal link to the Genesis Time-Bend Protocol.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/20 border border-border">
                            <p className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                                {connectionStatus === 'CONNECTING' && <><Loader2 className="animate-spin h-4 w-4"/>STATUS: ESTABLISHING QUANTUM LINK...</>}
                                {connectionStatus === 'CONNECTED' && <><CheckCircle className="h-4 w-4 text-green-500"/>STATUS: CONNECTED &amp; STABLE</>}
                                {connectionStatus === 'DISCONNECTED' && <><Loader2 className="animate-spin h-4 w-4"/>STATUS: AWAITING CONNECTION</>}
                            </p>
                        </div>
                        <Card>
                             <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2"><GitCommit /> Deployed Node: ZION-TM-DIVINESEED-001-TM</CardTitle>
                             </CardHeader>
                             <CardContent>
                                <p className="text-xs text-muted-foreground mb-2">Hallmark: Property of HRH Saint Tariro Masawi, The Anointed Commander</p>
                                <div className="space-y-1 text-xs">
                                    {NODE_FUNCTIONS.map(func => (
                                        <div key={func} className="flex items-center gap-2 p-1.5 bg-black/20 rounded-md">
                                            <Shield className="h-3 w-3 text-cyan-400" />
                                            <span className="text-foreground/80">{func}</span>
                                        </div>
                                    ))}
                                </div>
                             </CardContent>
                        </Card>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base">Live Connection Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-48 pr-2">
                            <div className="space-y-2 text-xs">
                                {logs.map(log => (
                                    <div key={log.id} className="flex items-start gap-2 animate-in fade-in duration-500">
                                        <span className="text-muted-foreground">{log.timestamp}</span>
                                        <p className="text-cyan-400/90 flex-1">{log.message}</p>
                                    </div>
                                ))}
                                {logs.length === 0 && <p className="text-muted-foreground italic">Awaiting first connection attempt...</p>}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Primordial Discoveries &amp; Insights</CardTitle>
                    <CardDescription>Knowledge retrieved from the Genesis timeline and integrated into ZionCore.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {DISCOVERIES.map(discovery => {
                        const Icon = discovery.icon;
                        return (
                             <Card key={discovery.title} className="bg-black/20">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Icon className={discovery.color}/>
                                        <span className={discovery.color}>{discovery.title}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1 text-xs text-foreground/80">
                                        {discovery.points.map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                </CardContent>
                            </Card>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
