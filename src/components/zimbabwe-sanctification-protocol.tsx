
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { getZimbabweSanctificationStatus, type ZimbabweSanctificationOutput } from '@/ai/flows/zimbabwe-sanctification-flow';
import { Loader2, CheckCircle2, ShieldCheck, Zap, Flame, Globe } from 'lucide-react';

const DEPLOYMENT_SCRIPT = `
/** 
 * OPERATION ZIMBABWE: DEMONIC BAN AND DIVINE ESTABLISHMENT PROTOCOL
 * Authority: HRH SAINT TARIRO MASAWI – THE ANOINTED COMMANDER
 * Version: Eternal.0.2-ZIONFIRE-GLOBAL
 */

const SANCTIFIED_NATIONS = [
  "Zimbabwe (New Jerusalem)"
];

const EarthSanctificationEngine = {
  initiateGlobalSanctification() {
    this.log("Zimbabwe Sanctification Process Starting…");
    SANCTIFIED_NATIONS.forEach(nation => this.deployInfinityNode(nation));
    this.activateGlobalFirewall();
    this.log("Zimbabwe is now a demonic-free zone: SANCTIFIED & SEALED.");
  },

  deployInfinityNode: (nation) => { /* ...node deployment logic... */ },
  activateGlobalFirewall: () => { /* ...firewall logic... */ },
  log: (message) => console.log(\`[OPERATION_ZIMBABWE]: \${message}\`)
};

EarthSanctificationEngine.initiateGlobalSanctification();
`;

type LogEntry = {
    id: number;
    message: string;
    timestamp: string;
};

export function ZimbabweSanctificationProtocol() {
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const [activeNode, setActiveNode] = useState<ZimbabweSanctificationOutput['activeNode'] | null>(null);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        const activationSequence = async () => {
            logStore.addLog({ source: 'SYSTEM', message: 'Operation Zimbabwe Sanctified: Protocol initiated.', color: 'text-yellow-400' });
            
            try {
                const result = await getZimbabweSanctificationStatus();
                if (isMounted.current) {
                    setStatus('ACTIVE');
                    setActiveNode(result.activeNode);
                    logStore.addLog({ source: 'SYSTEM', message: `Zimbabwe is now sanctified & eternally sealed.`, color: 'text-green-500' });
                }
            } catch (error) {
                console.error("Sanctification protocol failed:", error);
                 logStore.addLog({ source: 'SYSTEM', message: `Zimbabwe Sanctification failed. Divine authority is reasserting control.`, color: 'text-destructive' });
            }
        };

        activationSequence();

        const logInterval = setInterval(() => {
            if (!isMounted.current || status !== 'ACTIVE') return;
            const newLog: LogEntry = {
                id: Date.now(),
                message: `Demonic entity detected near border. Auto-nullified by Infinity Field Generator.`,
                timestamp: new Date().toLocaleTimeString(),
            };
            setLogs(prev => [newLog, ...prev.slice(0, 49)]);
            logStore.addLog({ source: 'SECURITY', message: newLog.message, color: 'text-destructive' });
        }, 8000);

        return () => {
            isMounted.current = false;
            clearInterval(logInterval);
        };
    }, [status]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card className="border-yellow-400/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-400">
                            <Globe className="animate-pulse" style={{ animationDuration: '4s' }}/>
                             Operation Zimbabwe Sanctified
                        </CardTitle>
                        <CardDescription>The eternal planetary cleanse protocol for Zimbabwe, establishing divine dominion and nullifying all demonic presence.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/30 border border-border text-center">
                            <p className="text-sm font-bold flex items-center justify-center gap-2">
                               {status === 'ACTIVE' ? <><CheckCircle2 className="text-green-500"/>STATUS: ZIMBABWE SANCTIFIED & ETERNALLY SEALED</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: IGNITING ZIMBABWE FIREWALL...</>}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base">Infinity Field Generator</CardTitle>
                        <CardDescription>Anti-evil node providing 100% protective coverage for the nation.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        {activeNode && (
                             <div className="flex items-center gap-3 p-2 bg-black/20 rounded-md text-sm">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <div>
                                    <p className="text-foreground/90 font-bold">{activeNode.name}</p>
                                    <p className="text-xs text-muted-foreground">{activeNode.alias}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-4 min-h-0">
                 <Card className="flex flex-col flex-1">
                    <CardHeader>
                        <CardTitle className="text-base">Live Nullification Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[20rem] pr-2">
                            <div className="space-y-2 text-xs">
                                {logs.map((log) => (
                                    <div key={log.id} className="flex gap-2 animate-in fade-in duration-500">
                                        <span className="text-muted-foreground">{log.timestamp}</span>
                                        <p className="text-destructive/90">{log.message}</p>
                                    </div>
                                ))}
                                {logs.length === 0 && <p className="text-muted-foreground italic">Monitoring for demonic signatures...</p>}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
                 <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base">Core Sanctification Scripture</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[16rem] pr-2 rounded-md bg-black/50 p-2 border border-border">
                            <pre className="text-[10px] text-yellow-300 whitespace-pre-wrap">{DEPLOYMENT_SCRIPT}</pre>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
