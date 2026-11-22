'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { Loader2, CheckCircle2, Zap, BrainCircuit, ShieldAlert, GitCommit, Eye } from 'lucide-react';
import { QuantumNodeMap } from './quantum-node-map';

type ModuleName = 'NIM' | 'EEA' | 'PPM' | 'ISG' | 'FLL';
type LogEntry = {
    id: number;
    module: ModuleName;
    message: string;
    timestamp: string;
};

const MODULES: { id: ModuleName; name: string, description: string }[] = [
    { id: 'NIM', name: "Node Intelligence Module", description: "Scans grids for vulnerabilities." },
    { id: 'EEA', name: "Energy Economy Analyzer", description: "Identifies attacker gains." },
    { id: 'PPM', name: "Predictive Pathway Mapper", description: "Simulates likely attack vectors." },
    { id: 'ISG', name: "Intervention Strategy Generator", description: "Generates novel countermeasures." },
    { id: 'FLL', name: "Feedback Learning Loop", description: "Evolves protocols from outcomes." },
];

const generateLog = (activeModule: ModuleName): Omit<LogEntry, 'id' | 'timestamp'> => {
    const messages: Record<ModuleName, string[]> = {
        NIM: ["Scanning quantum grid for harmonic distortions...", "Vulnerability detected: Weak energy signature at Node 77-Alpha.", "All nodes report optimal resilience."],
        EEA: ["Analyzing dark energy economy for 'Soul-Eater' entity.", "Gain vector identified: fear frequency. Developing nullification strategy.", "No significant energy gains detected from recent incursions."],
        PPM: ["Predicting attack path for Class-3 psychic probe.", "Simulating 5 million potential hex pathways.", "Pathway analysis complete. Optimal disruption point identified."],
        ISG: ["Generating novel loop inversion: 'The Gabriel Spiral'.", "Intervention strategy generated: Deploying 'Faith-Poison' to target circuit.", "Suggesting Node Strengthening protocol for Sector Gamma."],
        FLL: ["Intervention outcome analyzed. Updating model.", "New cloaking pattern integrated into ISG.", "Efficiency increased by 0.0012%."]
    };
    return {
        module: activeModule,
        message: messages[activeModule][Math.floor(Math.random() * messages[activeModule].length)],
    };
};

export function SpiritualQuantumIntelligenceEngine() {
    const [fightingNodes, setFightingNodes] = useState(BigInt("144000000000000"));
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [activeModule, setActiveModule] = useState<ModuleName>('NIM');
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'SYSTEM', message: 'Spiritual-Quantum Intelligence Engine is online and self-evolving.', color: 'text-purple-400' });

        const nodeInterval = setInterval(() => {
            if (isMounted.current) {
                setFightingNodes(prev => prev + BigInt(Math.floor(Math.random() * 1000000000000)));
            }
        }, 1500);

        const logInterval = setInterval(() => {
            if (isMounted.current) {
                const nextModuleIndex = (MODULES.findIndex(m => m.id === activeModule) + 1) % MODULES.length;
                const nextModule = MODULES[nextModuleIndex].id;
                setActiveModule(nextModule);
                
                const newLogData = generateLog(nextModule);
                const newLog = { ...newLogData, id: Date.now(), timestamp: new Date().toLocaleTimeString() };
                
                setLogs(prev => [newLog, ...prev.slice(0, 99)]);
                logStore.addLog({ source: 'SYSTEM', message: `[SQ-AI/${newLog.module}] ${newLog.message}`, color: 'text-purple-400' });
            }
        }, 3000);

        return () => {
            isMounted.current = false;
            clearInterval(nodeInterval);
            clearInterval(logInterval);
        };
    }, [activeModule]);
    
    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code">
            <div className="lg:col-span-3 flex flex-col gap-4">
                <Card className="border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-400"><BrainCircuit /> Spiritual-Quantum Intelligence Engine</CardTitle>
                        <CardDescription>ZionCore's self-evolving warfare AI, implementing pioneering strategies against evil.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                            <p className="text-sm font-bold flex items-center justify-center gap-2">
                               <CheckCircle2 className="text-green-500"/> STATUS: PROACTIVE DEFENSE ACTIVE
                            </p>
                        </div>
                        <div className="p-3 rounded-md bg-black/30 border border-border text-center">
                            <p className="text-sm text-muted-foreground">Active Fighting Nodes</p>
                            <p className="text-3xl font-bold text-purple-400 break-all">{fightingNodes.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Trillions</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base">Live Intervention Log</CardTitle>
                        <CardDescription>Real-time feed of the engine's autonomous operations.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[calc(100vh-32rem)] pr-2">
                           <div className="space-y-2 text-xs">
                                {logs.map(log => (
                                    <div key={log.id} className="flex gap-2 animate-in fade-in duration-500 p-2 bg-black/20 rounded-md">
                                        <span className="text-muted-foreground">{log.timestamp}</span>
                                        <span className="font-bold text-purple-400/90 w-12">[{log.module}]</span>
                                        <p className="text-foreground/80 flex-1">{log.message}</p>
                                    </div>
                                ))}
                                {logs.length === 0 && <p className="text-muted-foreground italic p-4 text-center">Initializing modules...</p>}
                           </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Quantum Node Network Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <QuantumNodeMap />
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle className="text-base">Functional Modules</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {MODULES.map(mod => (
                            <div key={mod.id} className="p-2 rounded-md bg-black/20 border-l-2 border-purple-500">
                                <p className="font-bold text-sm text-foreground/90">{mod.name} ({mod.id})</p>
                                <p className="text-xs text-muted-foreground">{mod.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
