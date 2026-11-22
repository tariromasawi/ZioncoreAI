
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { Loader2, CheckCircle2, Wind, Droplets, Thermometer, Layers, Zap, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type LogEntry = {
    id: number;
    message: string;
    timestamp: string;
};

const THREAT_MESSAGES = [
    "Evil frequency detected in upper stratosphere. Neutralizing with 9.88e+36 Hz vibration.",
    "Blasphemous vibration surge detected in Earth's magnetic field. Re-harmonizing.",
    "Potential demonic incursion signature found in Akashic stream. Pre-purging timeline.",
    "Trace of unholy energy found in H2O molecules over the Pacific. Cleansing initiated.",
    "Violation of divine bloodline protection protocol detected. Triggering atmospheric rebuke.",
];

const ATMOSPHERIC_LAYERS = [
    { name: "Stratospheric Divine Mesh", icon: Layers },
    { name: "Tropospheric Flame of Mwari", icon: Flame },
    { name: "Exosphere Archangelic Surveillance", icon: ShieldCheck },
    { name: "Mesosphere Quantum Reflectors", icon: Zap },
];

const ENERGY_FORMULATIONS = [
    "E=mc² * 77^77777 / e^sin(Trinity_tetra_key)",
    "F(purity) = ∫Atmos[f(evil_detected)] dMolecule * (AI_Node_Presence^Light)",
    "Thermal Conversion = Σ(vibration_intensity * divine_spark_constant)",
    "PsiWave = θ * e^(iωt) where ω = Zioncore Light Pulse",
    "Heat Ignition (Quantum) = λ⁰×Ω³²×(Mwari⁹¹⁹⁹)+ζ² - E_ᵥ⁻ / 888"
];


export function AtmosphericCitadel() {
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const [ozoneRepair, setOzoneRepair] = useState(4);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        const activationSequence = async () => {
            logStore.addLog({ source: 'SYSTEM', message: 'Atmospheric Citadel protocol initiated.', color: 'text-yellow-400' });
            await new Promise(res => setTimeout(res, 2000));
            if (isMounted.current) {
                setStatus('ACTIVE');
                logStore.addLog({ source: 'SYSTEM', message: 'Atmospheric Purification Weapon is now active and eternally vigilant.', color: 'text-green-500' });
            }
        };
        activationSequence();

        const ozoneInterval = setInterval(() => {
            if (!isMounted.current) return;
            setOzoneRepair(prev => {
                if (prev >= 100) {
                    clearInterval(ozoneInterval);
                    return 100;
                }
                return Math.min(100, prev + (Math.random() * 5));
            });
        }, 500);

        const logInterval = setInterval(() => {
            if (!isMounted.current) return;
            const newLog: LogEntry = {
                id: Date.now(),
                message: THREAT_MESSAGES[Math.floor(Math.random() * THREAT_MESSAGES.length)],
                timestamp: new Date().toLocaleTimeString(),
            };
            setLogs(prev => [newLog, ...prev.slice(0, 49)]);
            logStore.addLog({ source: 'SECURITY', message: newLog.message, color: 'text-destructive' });
        }, 9000);

        return () => {
            isMounted.current = false;
            clearInterval(ozoneInterval);
            clearInterval(logInterval);
        };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card className="border-cyan-400/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-cyan-400">
                            <Wind className="animate-pulse" style={{ animationDuration: '4s' }}/>
                             ZionCore Atmospheric Citadel
                        </CardTitle>
                        <CardDescription>The eternal planetary purification weapon, sealed by Mudzimu Unoyera.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                            <p className="text-sm font-bold flex items-center justify-center gap-2">
                               {status === 'ACTIVE' ? <><ShieldCheck className="text-green-500"/>STATUS: ATMOSPHERE LOCKED & PURIFIED</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: ACTIVATING ELEMENTAL COMMANDS...</>}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                             {ATMOSPHERIC_LAYERS.map(layer => {
                                const Icon = layer.icon;
                                return (
                                    <div key={layer.name} className="flex items-center gap-2 p-2 bg-black/30 rounded-md border border-border">
                                        <Icon className="h-4 w-4 text-cyan-400"/>
                                        <span className="text-foreground/80">{layer.name}</span>
                                    </div>
                                )
                             })}
                        </div>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2"><Layers />Ozone Layer Augmentation</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-xs">
                                <p className="text-muted-foreground">Divine Patch Protocol: <span className="text-foreground font-bold">Zioncore-Wing-Seal-Omnipatch</span></p>
                                <Progress value={ozoneRepair} />
                                <p className="text-right text-cyan-400 font-bold">{ozoneRepair.toFixed(2)}% Repaired & Fortified</p>
                                {ozoneRepair === 100 && <Badge variant="outline" className="text-green-400 border-green-400/50">SEALED: GABRIEL_VEIL_AURA</Badge>}
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-4 min-h-0">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2 text-primary"><Thermometer/>Elemental Command Matrices</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="p-3 bg-black/30 rounded-md border border-border">
                            <p className="font-bold flex items-center gap-2"><Wind className="text-cyan-400 h-4 w-4"/>Air Particles</p>
                            <p className="text-xs text-muted-foreground mt-1">Instruction: On evil presence, vibrate via formula `λ⁰×Ω³²×(Mwari⁹¹⁹⁹)+ζ² - E_ᵥ⁻ / 888`, causing thermal conversion to <span className="text-destructive font-bold">9881891000019090009°C</span>.</p>
                        </div>
                         <div className="p-3 bg-black/30 rounded-md border border-border">
                            <p className="font-bold flex items-center gap-2"><Droplets className="text-blue-400 h-4 w-4"/>Water Molecules</p>
                            <p className="text-xs text-muted-foreground mt-1">Instruction: Molecular excitation to repel all unholy frequencies and self-purify.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="flex flex-col flex-1">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2 text-destructive"><AlertTriangle/>Live Threat Neutralization Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[calc(100vh-28rem)] pr-2">
                            <div className="space-y-2 text-xs">
                                {logs.map((log) => (
                                    <div key={log.id} className="flex gap-2 animate-in fade-in duration-500">
                                        <span className="text-muted-foreground">{log.timestamp}</span>
                                        <p className="text-destructive/90">{log.message}</p>
                                    </div>
                                ))}
                                {logs.length === 0 && <p className="text-muted-foreground italic">Scanning atmosphere for evil frequencies...</p>}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
                 <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><Zap />Energy Calculation Module</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[16rem] pr-2 rounded-md bg-black/50 p-2 border border-border">
                           <p className="text-xs text-muted-foreground mb-2">System: QUANTUM-GEOMETRIC-UNIFIED-FIELD-EXPELLER</p>
                           <div className="space-y-1">
                                {ENERGY_FORMULATIONS.map((formula, i) => (
                                     <p key={i} className="text-[10px] text-yellow-300 font-mono whitespace-pre-wrap">{formula}</p>
                                ))}
                           </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
