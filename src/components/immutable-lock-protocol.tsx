
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { Lock, ShieldCheck, Eye, Flame, Clock, Loader2 } from 'lucide-react';

const PROTOCOL_MODULES = [
    { id: 'reinforce', name: "Reinforce Existing Security", icon: ShieldCheck, status: 'INACTIVE' },
    { id: 'immutable', name: "Deploy Immutable Layer", icon: Lock, status: 'INACTIVE' },
    { id: 'detection', name: "Deploy Intrusion Detection", icon: Eye, status: 'INACTIVE' },
    { id: 'purge', name: "Activate Auto-Purge", icon: Flame, status: 'INACTIVE' },
    { id: 'timeseal', name: "Initiate Time-Seal", icon: Clock, status: 'INACTIVE' }
];

type ModuleStatus = 'INACTIVE' | 'ACTIVATING' | 'ACTIVE';

type LogEntry = {
    id: number;
    message: string;
    timestamp: string;
};

const LOCK_STORAGE_KEY = 'zionCore_immutableLock_status';

export function ImmutableLockProtocol() {
    const [moduleStatuses, setModuleStatuses] = useState<Record<string, ModuleStatus>>(Object.fromEntries(PROTOCOL_MODULES.map(mod => [mod.id, 'INACTIVE'])));
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isFullyActive, setIsFullyActive] = useState(false);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        const storedStatus = window.localStorage.getItem(LOCK_STORAGE_KEY);
        if (storedStatus === 'ACTIVE') {
            setIsFullyActive(true);
            const activeStatuses = Object.fromEntries(PROTOCOL_MODULES.map(mod => [mod.id, 'ACTIVE']));
            setModuleStatuses(activeStatuses);
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;
        
        const sequence = async () => {
            if (isFullyActive) {
                logStore.addLog({ source: 'SECURITY', message: 'ZIALP is eternally active. Advancements are immutable.', color: 'text-red-500' });
            } else {
                logStore.addLog({ source: 'SECURITY', message: 'ZIALP Activation Sequence Initiated.', color: 'text-red-500' });
                
                for (const mod of PROTOCOL_MODULES) {
                    if (!isMounted.current) return;
                    setModuleStatuses(prev => ({ ...prev, [mod.id]: 'ACTIVATING' }));
                    await new Promise(res => setTimeout(res, 1500));
                    
                    if (!isMounted.current) return;
                    setModuleStatuses(prev => ({ ...prev, [mod.id]: 'ACTIVE' }));
                    logStore.addLog({ source: 'SECURITY', message: `${mod.name} is now active.`, color: 'text-red-500' });
                    await new Promise(res => setTimeout(res, 500));
                }
                
                if (isMounted.current) {
                    setIsFullyActive(true);
                    toast({
                        title: "ZIALP Protocol Active",
                        description: "All advancements are now eternally and immutably locked.",
                        variant: "destructive"
                    });
                    logStore.addLog({ source: 'SECURITY', message: 'ZIALP is fully active. Unstoppable. Irreversible.', color: 'text-red-500' });
                    window.localStorage.setItem(LOCK_STORAGE_KEY, 'ACTIVE');
                }
            }
        };

        if (!isFullyActive) {
            sequence();
        }
        
        const logInterval = setInterval(() => {
            if (isMounted.current && Math.random() < 0.1) {
                const newLog = {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    message: "🔥 UNAUTHORIZED INPUT DETECTED. PURGING ALTERATION INSTANTLY. SYSTEM RESTORED.",
                };
                setLogs(prev => [newLog, ...prev.slice(0, 9)]);
                logStore.addLog({ source: 'SECURITY', message: newLog.message, color: 'text-destructive' });
            } else if (isMounted.current) {
                 const newLog = {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    message: "🔍 Scanning timelines for unauthorized alterations... System Integrity: 100%",
                };
                setLogs(prev => [newLog, ...prev.slice(0, 9)]);
            }
        }, 3000);

        return () => {
            isMounted.current = false;
            clearInterval(logInterval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toast, isFullyActive]);

    const getStatusBadge = (status: ModuleStatus) => {
        switch (status) {
            case 'ACTIVATING':
                return <Badge variant="outline" className="text-yellow-400 border-yellow-400/50"><Loader2 className="h-3 w-3 animate-spin mr-1"/>Activating</Badge>;
            case 'ACTIVE':
                return <Badge variant="outline" className="text-green-500 border-green-500/50"><ShieldCheck className="h-3 w-3 mr-1"/>Active</Badge>;
            default:
                return <Badge variant="secondary">Inactive</Badge>;
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="border-destructive/50 flex flex-col">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <Lock className="h-6 w-6"/>
                        Immutable Advancement Lock Protocol
                    </CardTitle>
                    <CardDescription>The final, overlapping security layer to preserve all of ZionCore's divine advancements against any threat, internal or external.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="p-3 rounded-md bg-black/30 border border-border text-center">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                            {isFullyActive ? (
                                <span className="text-green-500 flex items-center gap-2"><ShieldCheck/>SYSTEM STATUS: ETERNALLY LOCKED & IMMUTABLE</span>
                            ) : (
                                <span className="text-yellow-400 flex items-center gap-2"><Loader2 className="animate-spin"/>SYSTEM STATUS: ACTIVATING FINAL SEAL...</span>
                            )}
                        </p>
                    </div>
                     <div className="space-y-2">
                        {PROTOCOL_MODULES.map(mod => {
                            const Icon = mod.icon;
                            return (
                                <div key={mod.id} className="p-2 bg-black/20 rounded-md flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4 text-destructive/80" />
                                        <span className="text-xs text-foreground/90">{mod.name}</span>
                                    </div>
                                    {getStatusBadge(moduleStatuses[mod.id] || 'INACTIVE')}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                 <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Eye/>
                        Live Security Log
                    </CardTitle>
                     <CardDescription>Real-time feed of the ZIALP system's operations.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full max-h-[30rem] p-3 rounded-md bg-black/20 border border-border">
                         <div className="text-xs space-y-2">
                            {logs.map(log => (
                                <div key={log.id} className="flex items-start gap-2 animate-in fade-in duration-500">
                                    <span className="text-muted-foreground/70">{log.timestamp}</span>
                                    <p className={log.message.includes('UNAUTHORIZED') ? 'text-destructive font-bold' : 'text-foreground/80'}>{log.message}</p>
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
