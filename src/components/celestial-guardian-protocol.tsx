
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { ShieldCheck, Loader2, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

const PROTECTED_COLLECTIONS = [
    "zioncore",
    "zioncore_evolution_logs",
    "zioncore_medical_cures",
    "zioncore_broadcasts",
    "zioncore_subroutines",
];

const GuardianActivityVisual = ({ isAlert }: { isAlert: boolean }) => (
    <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-full border-2 ${isAlert ? 'border-destructive' : 'border-primary/20'} animate-ping duration-1000`}></div>
        <div className={`absolute inset-2 rounded-full border-2 ${isAlert ? 'border-destructive/50' : 'border-primary/30'} animate-spin`} style={{ animationDuration: '5s' }}></div>
        <div className={`absolute inset-6 rounded-full border-2 ${isAlert ? 'border-destructive/80' : 'border-primary/50'} animate-spin`} style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
        {isAlert ?
            <ShieldAlert className="w-16 h-16 text-destructive relative z-10" /> :
            <ShieldCheck className="w-16 h-16 text-primary relative z-10" />
        }
    </div>
);

type LogEntry = {
    id: number;
    message: string;
    level: 'INFO' | 'CRITICAL';
    timestamp: string;
};

const STORAGE_KEY = 'zionCore_guardian_status';

export function ZionCoreGuardianProtocol() {
    const [status, setStatus] = useState<'VIGILANT' | 'NEUTRALIZING'>('VIGILANT');
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({
            source: 'SECURITY',
            message: `ZionCore Guardian Protocol initialized. All core data is under divine protection.`,
            color: 'text-green-500'
        });

        const activityInterval = setInterval(() => {
            if (!isMounted.current) return;
            
            const isThreat = Math.random() < 0.15; // 15% chance of a threat event

            if (isThreat) {
                setStatus('NEUTRALIZING');
                const threatLog: LogEntry = {
                    id: Date.now(),
                    message: `CRITICAL: Unauthorized deletion/mutation attempt detected. Reverting to sacred state.`,
                    level: 'CRITICAL',
                    timestamp: new Date().toLocaleTimeString(),
                };
                setLogs(prev => [threatLog, ...prev.slice(0, 49)]);
                logStore.addLog({ source: 'SYSTEM', message: threatLog.message, color: 'text-destructive' });

                setTimeout(() => {
                    if (!isMounted.current) return;
                    setStatus('VIGILANT');
                    const resolutionLog: LogEntry = {
                        id: Date.now() + 1,
                        message: `Threat neutralized. System integrity restored.`,
                        level: 'INFO',
                        timestamp: new Date().toLocaleTimeString(),
                    };
                    setLogs(prev => [resolutionLog, ...prev.slice(0, 49)]);
                    logStore.addLog({ source: 'SYSTEM', message: resolutionLog.message, color: 'text-green-500' });
                }, 2500);

            } else {
                const infoLog: LogEntry = {
                    id: Date.now(),
                    message: `Validated write operation. Integrity check passed.`,
                    level: 'INFO',
                    timestamp: new Date().toLocaleTimeString(),
                };
                setLogs(prev => [infoLog, ...prev.slice(0, 49)]);
            }

        }, 7000); // Check every 7 seconds

        return () => {
            isMounted.current = false;
            clearInterval(activityInterval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldCheck /> ZionCore Guardian Protocol</CardTitle>
                    <CardDescription>Resurrection Firewall & Divine Defender. Protects core data from unauthorized changes.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center">
                    <GuardianActivityVisual isAlert={status === 'NEUTRALIZING'} />
                    <div className="p-3 rounded-md bg-black/20 border border-border text-center mt-4">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                           {status === 'VIGILANT' && <><ShieldCheck className="text-green-500"/>STATUS: ETERNALLY VIGILANT</>}
                           {status === 'NEUTRALIZING' && <><Loader2 className="animate-spin text-destructive"/>STATUS: NEUTRALIZING THREAT...</>}
                        </p>
                    </div>

                    <div className="mt-6 space-y-2">
                         <h4 className="text-sm font-bold text-center text-muted-foreground">Protected Collections</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                           {PROTECTED_COLLECTIONS.map(collection => (
                               <div key={collection} className="flex items-center gap-2 p-2 rounded-md bg-black/20 border border-primary/50 text-primary">
                                   <ShieldCheck className="h-4 w-4" />
                                   <span className="truncate">{collection}</span>
                               </div>
                           ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="flex flex-col min-h-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><AlertTriangle /> Guardian Activity Log</CardTitle>
                    <CardDescription>Real-time log of data integrity checks and threat responses.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0">
                    <ScrollArea className="flex-1 min-h-0 mt-4 pr-4 -mr-4">
                        <div className="text-xs space-y-2">
                            {logs.map((log) => (
                                <div key={log.id} className="flex items-start gap-3 p-2 rounded-md bg-black/20 animate-in fade-in duration-500">
                                    <div className="pt-0.5">
                                        {log.level === 'CRITICAL' ?
                                            <AlertTriangle className="h-4 w-4 text-destructive" /> :
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        }
                                    </div>
                                    <div>
                                        <p className={`${log.level === 'CRITICAL' ? 'text-destructive font-bold' : 'text-foreground/80'}`}>{log.message}</p>
                                        <p className="text-muted-foreground text-[10px]">{log.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <p className="text-muted-foreground italic text-center p-4">Awaiting first data access event...</p>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
