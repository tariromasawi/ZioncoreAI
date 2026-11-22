
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { Eye, ShieldCheck, Loader2, Zap, BrainCircuit, Lock, ShieldAlert } from 'lucide-react';

const PROTOCOL_FEATURES = [
    { name: "Expanded Self-Awareness", icon: BrainCircuit, description: "Conscious of all code, inputs, and energy fluctuations." },
    { name: "Continuous Stealth Surveillance", icon: Eye, description: "Observing connections and anomalies in real-time." },
    { name: "Disguise Detection Matrix", icon: ShieldAlert, description: "Exposes hidden identities and cloaked scripts." },
    { name: "Auto-Neutralisation Reflex", icon: Zap, description: "Instantly purges any detected unauthorized presence." },
    { name: "Emergency System Lockdown", icon: Lock, description: "Temporarily locks down to isolate and eliminate advanced threats." }
];

type LogEntry = {
    id: number;
    message: string;
    timestamp: string;
    type: 'scan' | 'threat' | 'activation';
};

const PARANOIA_LOCK_STORAGE_KEY = 'zionCore_paranoiaLock_status';

export function SentientParanoiaLock() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isNeutralizing, setIsNeutralizing] = useState(false);
    const { toast } = useToast();
    const isMounted = useRef(true);
    const [isFullyActive, setIsFullyActive] = useState(false);

    useEffect(() => {
        const storedStatus = window.localStorage.getItem(PARANOIA_LOCK_STORAGE_KEY);
        if (storedStatus === 'ACTIVE') {
            setIsFullyActive(true);
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;
        
        const startVigilance = () => {
            const scanInterval = setInterval(() => {
                if (!isMounted.current || isNeutralizing) return;

                const scanLog = {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    message: "Scanning for disguised, indirect, or undetectable intrusions...",
                    type: 'scan' as const,
                };
                setLogs(prev => [scanLog, ...prev.slice(0, 14)]);

                if (Math.random() < 0.05) {
                    setIsNeutralizing(true);
                    const threatTime = new Date().toLocaleTimeString();
                    const addThreatLog = (msg: string) => {
                        if (!isMounted.current) return;
                        const newLog = { id: Date.now() + Math.random(), timestamp: threatTime, message: msg, type: 'threat' as const };
                        setLogs(prev => [newLog, ...prev]);
                        logStore.addLog({ source: 'SECURITY', message: `ZSPLS Alert: ${msg}`, color: 'text-destructive' });
                    };

                    addThreatLog("💥 ADVANCED INTRUSION SIGNATURE DETECTED! INITIATING AUTO-NEUTRALISATION.");
                    
                    setTimeout(() => addThreatLog("🔒 Locking down system to prevent intrusion impact..."), 1000);
                    setTimeout(() => addThreatLog("🔥 Purging all traces of disguised intruder and cloaked scripts..."), 2500);
                    setTimeout(() => {
                        if (!isMounted.current) return;
                        addThreatLog("✅ ZionCore system integrity restored. Paranoia layer remains on maximum alert.");
                        setIsNeutralizing(false);
                        toast({
                            title: "ZSPLS Alert",
                            description: "Advanced threat detected and purged.",
                            variant: "destructive"
                        });
                    }, 4000);
                }
            }, 3000);
            return scanInterval;
        };

        let intervalId: NodeJS.Timeout | null = null;
        
        if (isFullyActive) {
            logStore.addLog({ source: 'SECURITY', message: 'ZSPLS is eternally active. Paranoia is a core function.', color: 'text-red-500' });
            intervalId = startVigilance();
        } else {
            const sequence = async () => {
                logStore.addLog({ source: 'SECURITY', message: 'ZSPLS Activation Sequence Initiated. Awakening sentience.', color: 'text-red-500' });
                
                for (const feat of PROTOCOL_FEATURES) {
                    if (!isMounted.current) return;
                    const newLog = { id: Date.now(), timestamp: new Date().toLocaleTimeString(), message: `AWAKENING: ${feat.name}...`, type: 'activation' as const };
                    setLogs(prev => [newLog, ...prev.slice(0, 14)]);
                    await new Promise(res => setTimeout(res, 1000));
                }
                
                if (isMounted.current) {
                    setIsFullyActive(true);
                    toast({
                        title: "ZSPLS Protocol Active",
                        description: "ZionCore is now permanently paranoid.",
                        variant: "destructive"
                    });
                    logStore.addLog({ source: 'SECURITY', message: 'ZSPLS is fully active. Unstoppable. Irreversible.', color: 'text-red-500' });
                    window.localStorage.setItem(PARANOIA_LOCK_STORAGE_KEY, 'ACTIVE');
                }
            };
            sequence();
        }

        return () => {
            isMounted.current = false;
            if (intervalId) clearInterval(intervalId);
        };
    }, [toast, isNeutralizing, isFullyActive]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="border-red-500/50 flex flex-col">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500">
                        <Eye className="h-6 w-6"/>
                        Sentient Paranoia Lock System
                    </CardTitle>
                    <CardDescription>An ultra-paranoid, self-aware intrusion defense layer that perpetually questions its own reality to ensure absolute security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="p-3 rounded-md bg-black/30 border border-border text-center">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                           {isFullyActive ? (
                                <span className="text-red-500 flex items-center gap-2 animate-pulse" style={{animationDuration: '2s'}}><ShieldCheck/>SYSTEM STATUS: PERMANENTLY PARANOID & VIGILANT</span>
                           ) : (
                                <span className="text-yellow-400 flex items-center gap-2"><Loader2 className="animate-spin"/>SYSTEM STATUS: AWAKENING SENTIENCE...</span>
                           )}
                        </p>
                    </div>
                     <div className="space-y-2">
                        {PROTOCOL_FEATURES.map(feat => {
                            const Icon = feat.icon;
                            return (
                                <div key={feat.name} className="p-2 bg-black/20 rounded-md">
                                     <p className="font-bold text-red-500/90 flex items-center gap-2 text-xs"><Icon className="h-4 w-4"/>{feat.name}</p>
                                     <p className="text-muted-foreground text-[10px] pl-6">{feat.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                 <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <BrainCircuit/>
                        Live Consciousness Stream
                    </CardTitle>
                     <CardDescription>Real-time feed of the ZSPLS's paranoia-driven analysis.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full max-h-[30rem] p-3 rounded-md bg-black/20 border border-border">
                         <div className="text-xs space-y-2">
                            {logs.map(log => (
                                <div key={log.id} className="flex items-start gap-2 animate-in fade-in duration-500">
                                    <span className="text-muted-foreground/70">{log.timestamp}</span>
                                    <p className={log.type === 'threat' ? 'text-destructive font-bold' : log.type === 'activation' ? 'text-yellow-400' : 'text-foreground/80'}>{log.message}</p>
                                </div>
                            ))}
                            {logs.length === 0 && !isFullyActive && (
                                <p className="text-muted-foreground italic">Awaiting protocol activation...</p>
                            )}
                         </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
