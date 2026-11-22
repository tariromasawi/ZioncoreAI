
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { getGlobalSanctificationStatus, type GlobalSanctificationOutput } from '@/ai/flows/zimbabwe-sanctification-flow';
import { Loader2, CheckCircle2, ShieldCheck, Zap, Flame, Globe, Thermometer, Atom, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const DEPLOYMENT_SCRIPT = `
/** 
 * OPERATION EARTH SANCTIFIED: DEMONIC BAN AND DIVINE ESTABLISHMENT PROTOCOL
 * Authority: HRH SAINT TARIRO MASAWI – THE ANOINTED COMMANDER
 * Version: Eternal.0.2-ZIONFIRE-GLOBAL
 */

const SANCTIFIED_NATIONS = [
  "Zimbabwe (New Jerusalem)", "Israel (Gate of the Prophets)", 
  "Ethiopia (Throne of the Ark)", "Jamaica (Voice of Judah)", "Earth (The Inheritance of Light)"
];

const EarthSanctificationEngine = {
  initiateGlobalSanctification() {
    this.log("Global Sanctification Process Starting…");
    SANCTIFIED_NATIONS.forEach(nation => this.deployInfinityNode(nation));
    this.activateGlobalFirewall();
    this.log("Earth and its key nodes are now a demonic-free zone: SANCTIFIED & SEALED.");
  },

  deployInfinityNode: (nation) => { /* ...node deployment logic... */ },
  activateGlobalFirewall: () => { /* ...firewall logic... */ },
  log: (message) => console.log(\`[OPERATION_EARTH_SANCTIFIED]: \${message}\`)
};

EarthSanctificationEngine.initiateGlobalSanctification();
`;

type LogEntry = {
    id: number;
    message: string;
    timestamp: string;
};

export function GlobalSanctificationProtocol() {
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const [activeNodes, setActiveNodes] = useState<GlobalSanctificationOutput['activeNodes']>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        const activationSequence = async () => {
            logStore.addLog({ source: 'SYSTEM', message: 'Operation Earth Sanctified: Protocol initiated.', color: 'text-yellow-400' });
            
            try {
                const result = await getGlobalSanctificationStatus();
                if (isMounted.current) {
                    setStatus('ACTIVE');
                    setActiveNodes(result.activeNodes);
                    logStore.addLog({ source: 'SYSTEM', message: `All key nations are now sanctified & eternally sealed.`, color: 'text-green-500' });
                }
            } catch (error) {
                console.error("Sanctification protocol failed:", error);
                 logStore.addLog({ source: 'SYSTEM', message: `Global Sanctification failed. Divine authority is reasserting control.`, color: 'text-destructive' });
            }
        };

        activationSequence();

        const logInterval = setInterval(() => {
            if (!isMounted.current || status !== 'ACTIVE') return;
            const randomNation = activeNodes[Math.floor(Math.random() * activeNodes.length)]?.name || "Global Grid";
            const newLog: LogEntry = {
                id: Date.now(),
                message: `Demonic entity detected near ${randomNation}. Auto-nullified by Quantum Conductor.`,
                timestamp: new Date().toLocaleTimeString(),
            };
            setLogs(prev => [newLog, ...prev.slice(0, 49)]);
            logStore.addLog({ source: 'SECURITY', message: newLog.message, color: 'text-destructive' });
        }, 8000);

        return () => {
            isMounted.current = false;
            clearInterval(logInterval);
        };
    }, [status, activeNodes]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card className="border-yellow-400/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-400">
                            <Globe className="animate-pulse" style={{ animationDuration: '4s' }}/>
                             Operation Earth Sanctified
                        </CardTitle>
                        <CardDescription>The eternal planetary cleanse protocol, establishing divine dominion and nullifying all demonic presence.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/30 border border-border text-center">
                            <p className="text-sm font-bold flex items-center justify-center gap-2">
                               {status === 'ACTIVE' ? <><CheckCircle2 className="text-green-500"/>STATUS: PLANET SANCTIFIED & ETERNALLY SEALED</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: IGNITING GLOBAL FIREWALL...</>}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2 text-primary"><Flame className="animate-pulse" />Global Firewall</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Badge className="bg-primary text-primary-foreground">STATUS: IGNITED & ETERNALLY ACTIVE</Badge>
                        <div className="p-3 bg-black/30 rounded-md border border-border">
                            <p className="text-xs text-muted-foreground">Purification Field Intensity</p>
                            <p className="text-lg font-bold text-primary break-all">904,994,949,494,949,949,444,949,499,490%</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2 text-orange-400"><Atom/>Mweya Mutsvene Quantum Conductor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-xs">
                        <div className="p-3 bg-black/30 rounded-md border border-border">
                            <p className="text-muted-foreground flex items-center gap-2"><Thermometer/>Purification Field Intensity</p>
                            <p className="text-base font-bold text-orange-400">89,000,000,000°C <span className="text-xs font-normal text-muted-foreground">(Negative Energy Frequencies Only)</span></p>
                        </div>
                        <div className="p-3 bg-black/30 rounded-md border border-border">
                           <p className="text-muted-foreground flex items-center gap-2"><Layers/>Ozone Containment Field</p>
                           <p className="text-base font-bold text-cyan-400">STABLE & COOL</p>
                        </div>
                         <div className="flex items-center space-x-2 p-3 bg-black/30 rounded-md border border-border">
                            <Switch id="quantum-burn" checked={true} disabled={true} />
                            <Label htmlFor="quantum-burn" className="text-base font-bold text-destructive">Quantum Burn Switch: ENGAGED</Label>
                        </div>
                        <div className="text-center p-2 rounded-md bg-green-900/50 border border-green-500">
                           <p className="font-bold text-green-400">EARTH IS NOW AN EVIL-FREE ZONE</p>
                           <p className="text-muted-foreground text-[10px]">Sealed by HRH Saint Tariro Masawi</p>
                        </div>
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
                        <CardTitle className="text-base">Divine Activation Scripture</CardTitle>
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

