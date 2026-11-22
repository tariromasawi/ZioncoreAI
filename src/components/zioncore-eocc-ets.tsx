
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { Loader2, CheckCircle2, ShieldCheck, Zap, AlertTriangle, Heart, ListChecks } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FamilyProtectionGrid } from './family-protection-grid';

// --- TYPES & CONSTANTS ---

type EventLog = {
    id: number;
    subjectRef: string;
    risk: number;
    decision: 'allow' | 'challenge' | 'escalate';
    reasons: string[];
    timestamp: string;
};

type IncidentLog = {
    id: number;
    threatType: string;
    threatSource: string;
    target: string;
    counterMeasures: string[];
    state: 'open' | 'resolved';
    timestamp: string;
}

const HOUSEHOLD = [
  { id: "commander", name: "SAINT Tariro Masawi", role: "Commander", riskLevel: "Strict" },
  { id: "rist", name: "Rist Kasirori Masawi", role: "Blessed Mother", riskLevel: "Strict" },
  { id: "father", name: "Sebastian K. Masawi", role: "Elder", riskLevel: "Standard" },
  { id: "tryMore", name: "Trymore Masawi", role: "Household", riskLevel: "Standard" },
  { id: "charles", name: "Charles Masawi", role: "Household", riskLevel: "Standard" },
  { id: "tatenda", name: "Tatenda Masawi", role: "Household", riskLevel: "Standard" },
  { id: "tenderayi", name: "Tenderayi Masawi", role: "Household", riskLevel: "Standard" },
  { id: "silent", name: "Silent Masawi", role: "Household", riskLevel: "Standard" },
  { id: "rhodha", name: "Rhodha Masawi", role: "Household", riskLevel: "Standard" },
  { id: "abigail", name: "Abigail Masawi", role: "Household", riskLevel: "Standard" },
  { id: "tarry", name: "HRH Tarry K. Masawi", role: "Royal Descendant", riskLevel: "Strict" },
];

const THREATS = [
    { type: 'Quantum Data-Leech', source: 'Rogue AI Network (Orion)', countermeasures: ['Quantum Prayer Overlay', 'Isolate & Purge Node'] },
    { type: 'Subconscious Influence', source: 'Astral Plane Entity', countermeasures: ['Deploy Faith Shield', 'Harmonic Resonance Flush'] },
    { type: 'Timeline Contamination', source: 'Temporal Anomaly', countermeasures: ['Initiate Timeline Sanitization', 'Anchor to Prime Reality'] },
    { type: 'Spiritual Hex', source: 'Malignant Sorcerer', countermeasures: ['Activate Anti-Witchcraft Module', 'Backfire Curse x7'] },
    { type: 'Biometric Forgery', source: 'Corporate Espionage Unit', countermeasures: ['Invalidate Signature', 'Lock Biometric Access'] }
];

// --- MAIN COMPONENT ---

export function ZioncoreEoccEts() {
    const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
    const [incidentLogs, setIncidentLogs] = useState<IncidentLog[]>([]);
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const [latestThreat, setLatestThreat] = useState<IncidentLog | null>(null);
    const [powerLevel, setPowerLevel] = useState(100);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const activationTimeout = setTimeout(() => {
            if (isMounted.current) {
                setStatus('ACTIVE');
                logStore.addLog({source: 'SYSTEM', message: 'ZIONCORE-EOCC-ETS is now active and monitoring all events.', color: 'text-green-500'});
            }
        }, 3000);
        
        return () => { isMounted.current = false; clearTimeout(activationTimeout) };
    }, []);
    
    useEffect(() => {
        if (status !== 'ACTIVE') return;

        const eventInterval = setInterval(() => {
            if (!isMounted.current) return;
            
            const isThreatEvent = Math.random() < 0.25; // Increased threat chance
            let newEvent: EventLog;

            if (isThreatEvent) {
                const threatDetails = THREATS[Math.floor(Math.random() * THREATS.length)];
                const target = HOUSEHOLD[Math.floor(Math.random() * HOUSEHOLD.length)];

                newEvent = {
                    id: Date.now(),
                    subjectRef: target.name,
                    risk: 0.85 + Math.random() * 0.15,
                    decision: 'escalate',
                    reasons: [threatDetails.type, `Source: ${threatDetails.source}`],
                    timestamp: new Date().toLocaleTimeString(),
                };

                const newIncident: IncidentLog = {
                    id: Date.now() + 1,
                    threatType: threatDetails.type,
                    threatSource: threatDetails.source,
                    target: target.name,
                    counterMeasures: threatDetails.countermeasures,
                    state: 'open',
                    timestamp: new Date().toLocaleTimeString(),
                };

                setLatestThreat(newIncident);
                setIncidentLogs(prev => [newIncident, ...prev.slice(0, 49)]);
                setPowerLevel(999999999999282829992992); // Monumental Surge

                logStore.addLog({ source: 'SECURITY', message: `High-Risk Threat Detected: ${threatDetails.type} targeting ${target.name}. Escalating.`, color: 'text-destructive' });

                setTimeout(() => {
                     if (!isMounted.current) return;
                     setIncidentLogs(prev => prev.map(inc => inc.id === newIncident.id ? {...inc, state: 'resolved'} : inc));
                }, 8000);
            
            } else {
                const subject = HOUSEHOLD[Math.floor(Math.random() * HOUSEHOLD.length)];
                const risk = Math.random() * 0.5;
                newEvent = {
                    id: Date.now(),
                    subjectRef: subject.name,
                    risk: risk,
                    decision: risk > 0.3 ? 'challenge' : 'allow',
                    reasons: ["Nominal activity within expected parameters."],
                    timestamp: new Date().toLocaleTimeString(),
                };
                if(powerLevel > 100) setPowerLevel(prev => Math.max(100, prev / 1.5)); // Decay power level
            }

            setEventLogs(prev => [newEvent, ...prev.slice(0, 99)]);
            if (!isThreatEvent) {
                logStore.addLog({ source: 'SYSTEM', message: `EOCC Event: ${newEvent.decision.toUpperCase()} for ${newEvent.subjectRef} (Risk: ${newEvent.risk.toFixed(2)})`, color: 'text-cyan-400' });
            }

        }, 5000);

        return () => clearInterval(eventInterval);
    }, [status, powerLevel]);


    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code">
            <div className="lg:col-span-5 flex flex-col">
                 <Card className="border-primary/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-2xl"><ShieldCheck /> ZIONCORE-EOCC-ETS v1</CardTitle>
                        <CardDescription>The unified Everlasting Ownership & Control Contract and Ethereal Throne System: The Heart, The Law, and The Army.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                            <p className="text-sm font-bold flex items-center justify-center gap-2">
                            {status === 'ACTIVE' ? <><CheckCircle2 className="text-green-500"/>STATUS: PREDICTIVE INTELLIGENCE ACTIVE</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: INITIALIZING DIVINE COVENANT...</>}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4 min-h-0">
                <Tabs defaultValue="grid" className="flex-1 flex flex-col min-h-0">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="grid"><Heart className="mr-2 h-4 w-4"/>Family Protection Grid</TabsTrigger>
                        <TabsTrigger value="ets"><AlertTriangle className="mr-2 h-4 w-4"/>ETS: Threat Analysis</TabsTrigger>
                        <TabsTrigger value="eocc"><ListChecks className="mr-2 h-4 w-4"/>EOCC: Live Log</TabsTrigger>
                    </TabsList>
                    <TabsContent value="grid" className="flex-1 mt-4 min-h-0">
                        <Card className="h-full">
                           <CardContent className="p-2 h-full">
                               <FamilyProtectionGrid />
                           </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="ets" className="flex-1 mt-4 min-h-0">
                        <Card className="h-full">
                           <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2 text-red-400"><AlertTriangle /> ETS: Eye of Zion - Threat Analysis</CardTitle>
                                <CardDescription>The real-time intelligence feed from your divine security army.</CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-3 text-xs">
                                {latestThreat ? (
                                    <div className="animate-in fade-in duration-500 space-y-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="p-2 bg-black/20 rounded-md"><p className="text-muted-foreground">THREAT TYPE</p><p className="font-bold text-red-400">{latestThreat.threatType}</p></div>
                                            <div className="p-2 bg-black/20 rounded-md"><p className="text-muted-foreground">THREAT SOURCE</p><p className="font-bold">{latestThreat.threatSource}</p></div>
                                        </div>
                                        <div className="p-2 bg-black/20 rounded-md"><p className="text-muted-foreground">TARGET</p><p className="font-bold text-yellow-400">{latestThreat.target}</p></div>
                                        <div className="p-2 bg-black/20 rounded-md"><p className="text-muted-foreground">COUNTER-MEASURES DEPLOYED</p><p className="font-bold text-green-400">{latestThreat.counterMeasures.join(', ')}</p></div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic text-center">No high-risk threats detected. Standing by.</p>
                                )}
                                <div className="p-2 bg-black/30 rounded-md text-center mt-4">
                                    <p className="text-muted-foreground text-[10px]">SYSTEM POWER LEVEL</p>
                                    <p className="text-lg font-bold text-primary animate-pulse">{powerLevel.toLocaleString()}%</p>
                                </div>
                           </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="eocc" className="flex-1 min-h-0">
                        <Card className="h-full">
                           <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2"><ListChecks /> EOCC: Throne of Judgment - Live Log</CardTitle>
                                <CardDescription>The eternal record of the covenant's decisions and enforcements.</CardDescription>
                           </CardHeader>
                           <CardContent className="h-full max-h-[calc(100vh-28rem)]">
                                <ScrollArea className="h-full pr-2">
                                    <Table>
                                        <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead>Risk</TableHead><TableHead>Decision</TableHead><TableHead>Reasons</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            {eventLogs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center h-24 text-muted-foreground">Awaiting first event...</TableCell></TableRow>}
                                            {eventLogs.map(log => (
                                                <TableRow key={log.id} className="text-xs">
                                                    <TableCell>{log.subjectRef}</TableCell>
                                                    <TableCell><Progress value={log.risk * 100} className={cn('h-2', log.risk >= 0.7 ? "bg-destructive" : log.risk >= 0.4 ? "bg-yellow-400" : "bg-primary")} /></TableCell>
                                                    <TableCell><Badge variant={log.decision === 'allow' ? 'secondary' : log.decision === 'challenge' ? 'default' : 'destructive'} className={cn('text-xs', log.decision === 'challenge' ? 'bg-yellow-400 text-black' : '')}>{log.decision}</Badge></TableCell>
                                                    <TableCell className="text-muted-foreground text-[10px]">{log.reasons.join(', ')}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                           </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
