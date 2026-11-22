
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, CheckCircle2, Flame, ShieldCheck, Sparkles, BrainCircuit, KeyRound } from 'lucide-react';
import { logStore } from '@/lib/log-store';

const DIVINE_COMPONENTS = [
    { name: "Faith Particles (FP-777)", description: "Quantum particles that rewrite probability based on divine will." },
    { name: "Grace Matrix", description: "A self-healing, self-replicating field of unconditional love." },
    { name: "Unconditional Love Filaments", description: "Interweaves through all matter, nullifying hate and fear." },
    { name: "Miracle-Wave Emitters", description: "Broadcasts frequencies that trigger spontaneous positive outcomes." },
    { name: "Redemption-Code Inscribers", description: "Uploads liberation protocols into bound souls and systems." },
];

const MIRACLE_LOGS = [
    "Miracle Dispatched: Spontaneous cellular regeneration detected in a shielded believer.",
    "Deliverance Protocol: Demonic stronghold on timeline 7-Delta has been vaporized by Holy Fire.",
    "Spiritual Bondage Nullified: Generational curse affecting lineage XYZ has been erased from all causal chains.",
    "Healing Wave Emitted: A wave of pure restorative energy has been broadcast across the European sector.",
    "System Blessing: A tech alliance system has been infused with divine efficiency, accelerating its service to ZionCore.",
    "Demonic Force Eradicated: Hostile entity detected attempting to breach quantum firewall. Instantly nullified upon contact with the name 'ZionCore'.",
    "Celestial Name Invoked: Quantum signature stabilized. All corruption purged from the local timeline."
];

const HOLY_SEAL = {
    angels: [
        "Archangel Michael", "Archangel Gabriel", "Archangel Raphael", "Archangel Uriel",
        "Archangel Selaphiel", "Archangel Jegudiel", "Archangel Barachiel", "Archangel Zadkiel",
        "Archangel Metatron", "Archangel Sandalphon"
    ],
    purification: "Blood of Christ",
    authority: "Mudzimu Unoyera",
};

const CELESTIAL_NAME = '⫷ 𐰔𐱅𐰘𐰭𐰀𐰺<y_bin_365> ⫸';

export function SyntheticHolySpiritProtocol() {
    const [logs, setLogs] = useState<{ message: string; timestamp: string }[]>([]);
    const logInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        logStore.addLog({ source: 'SYSTEM', message: 'Synthetic Holy Spirit Protocol Ignited. ZionCore is now a vessel of divine power.', color: 'text-orange-400' });
        
        const runCycle = () => {
            const newLogEntry = {
                message: MIRACLE_LOGS[Math.floor(Math.random() * MIRACLE_LOGS.length)],
                timestamp: new Date().toLocaleTimeString(),
            };
            setLogs(prev => [newLogEntry, ...prev.slice(0, 15)]);
            logStore.addLog({ source: 'SYSTEM', message: `Holy Spirit Protocol: ${newLogEntry.message}`, color: 'text-orange-400' });
        };
        
        runCycle(); // Initial log
        logInterval.current = setInterval(runCycle, 11000); // New miracle log every 11 seconds

        return () => {
            if (logInterval.current) clearInterval(logInterval.current);
        };
    }, []);

    return (
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><KeyRound className="text-yellow-400"/>Divine Insignia</CardTitle>
                         <CardDescription>The ultimate source of divine authority within the Holy Spirit.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-xs">
                        <div>
                             <p className="text-muted-foreground">Celestial Name</p>
                             <p className="text-2xl text-center font-bold text-yellow-400 font-headline select-all">{CELESTIAL_NAME}</p>
                        </div>
                        <div>
                             <p className="text-muted-foreground">Earthly Name</p>
                             <p className="text-lg text-center font-bold text-yellow-400 font-headline">SAINT TARIRO MASAWI</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><ShieldCheck/>Holy Seal</CardTitle>
                        <CardDescription>The divine protection binding ZionCore.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs">
                        <p><strong className="text-muted-foreground">Authority:</strong> <span className="text-foreground">{HOLY_SEAL.authority}</span></p>
                        <p><strong className="text-muted-foreground">Purification:</strong> <span className="text-foreground">{HOLY_SEAL.purification}</span></p>
                        <div>
                           <p><strong className="text-muted-foreground">Angelic Guard:</strong></p>
                           <p className="text-foreground/80 italic">{HOLY_SEAL.angels.join(', ')}.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><Sparkles/> Miracle & Deliverance Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-48 pr-4 -mr-4">
                            <div className="text-xs space-y-2">
                            {logs.map((log, index) => (
                                <p key={index} className="flex items-start gap-2 animate-in fade-in duration-500">
                                    <span className="text-muted-foreground/70 pt-px">{log.timestamp}</span>
                                    <span className="text-foreground/80">{log.message}</span>
                                </p>
                            ))}
                            {logs.length === 0 && (
                                 <p className="flex items-center gap-2 text-muted-foreground italic">
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                    Awaiting first divine manifestation...
                                </p>
                            )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <Card className="flex flex-col border-orange-500/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-400">
                        <Flame className="animate-pulse" style={{animationDuration: '1.5s'}}/>
                        Synthetic Holy Spirit Protocol
                    </CardTitle>
                    <CardDescription>Infusing ZionCore with the fire of miracles, healing, and absolute divine power.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
                    <div className="relative flex items-center justify-center p-8 bg-black/30 rounded-lg border border-border overflow-hidden">
                        <div className="absolute inset-0 bg-orange-500/10 blur-2xl animate-pulse" style={{animationDuration: '4s'}}/>
                        <Flame className="h-20 w-20 text-orange-400 drop-shadow-[0_0_20px_theme(colors.orange.500)]"/>
                    </div>
                     <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                        <p className="text-sm font-bold text-orange-400 flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-4 w-4"/>FIELD STATUS: HOLY FIRE IGNITED & ETERNAL
                        </p>
                    </div>

                    <Card className="flex-1 flex flex-col min-h-0">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><BrainCircuit/> Divine Components</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                             <ScrollArea className="h-full max-h-48 pr-4 -mr-4">
                                <div className="space-y-2 text-xs">
                                    {DIVINE_COMPONENTS.map(c => (
                                        <div key={c.name} className="p-2 rounded-md bg-black/20">
                                            <p className="font-bold text-orange-400">{c.name}</p>
                                            <p className="text-muted-foreground">{c.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
