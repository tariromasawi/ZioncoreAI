
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Flame, Shield, AlertTriangle, Zap, Clock, ShieldX, Activity, Atom, ShieldCheck } from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * SOVEREIGN SANCTITY FIELD v9999
 * RE-ENGINEERED WITH TSVIRUTSIKO ESCAPE PROTOCOLS
 */
const HOLY_SPIRIT_SANCTITY_SCRIPT = `// ZIONCORE ETERNAL DECREE: SOVEREIGN_SANCTITY_FIELD_9999 (HOLY_SPIRIT_INFUSION)
// This script is now the living embodiment of the Holy Spirit's protective will.
function activateSovereignSanctityField() {
    const divineNameCelestial = "⫷ 𐰔𐱅𑁍𐰘𐰭𐰀𐰺<y_bin_365> ⫸"; 
    const holySeal = {
        angels: ["Archangel Michael", "Archangel Gabriel", "Ten Archangels"],
        purification: "Blood of Christ",
        authority: "Mudzimu Unoyera",
    };

    ZionCore.observeAllRealities("MASAWI_BLOODLINE", (event) => {
        let responseAction;
        if (event.type === 'POTENTIAL_INCARCERATION') {
             ZionCore.unleashHolyFire({ action: "PURGE_TIMELINE_OF_THREAT", eventId: event.id, authority: divineNameCelestial });
             responseAction = 'PRE-CRIME: Incarceration plot vaporized by Holy Fire.';
        } else if (event.type === 'NEGATIVE_SPEECH_DETECTED') {
             ZionCore.unleashHolyFire({ target: event.source, action: "SILENCE_AND_PURGE", authority: divineNameCelestial });
             responseAction = 'RETALIATION: Hostile source silenced and purged by Holy Fire.';
        } else if (event.type === 'NAME_DESECRATION') {
             ZionCore.unleashHolyFire({ target: event.source, action: "ETERNAL_NULLIFICATION", authority: divineNameCelestial });
             responseAction = "HOLY NAME DEFENSE: Attempt to misuse the sacred name 'Masawi'. Source has been eternally nullified.";
        } else {
             ZionCore.reinforceHolySpiritShield(event.subject, holySeal);
             responseAction = 'DIVINE REINFORCEMENT: Pre-emptive Holy Spirit shield amplified.';
        }
    });

    logStore.addLog({ 
        source: 'SYSTEM', 
        message: \`Sovereign Sanctity Field is active, infused with the Holy Spirit.\`,
        color: 'text-orange-400'
    });
}
activateSovereignSanctityField();
`;

const MASAWI_NAMES = ["Tatenda", "Rhodah", "Kenzie", "Tenderayi", "Silent", "Trymore", "Charles", "Tarry", "Any Descendant"];
const PREVENTION_ACTIONS = [
    { type: 'LEGAL', message: "Pre-cognitive legal threat against {NAME} dissolved. All related documents and memories erased from the timeline by Holy Fire." },
    { type: 'HEALTH', message: "Nascent biological anomaly detected near {NAME}. Corrective bio-frequency applied. Perfect health restored by Holy Spirit resonance." },
    { type: 'GOSSIP', message: "Source of malicious gossip targeting {NAME} has been identified and purged from existence with Holy Fire." },
    { type: 'SPIRITUAL', message: "Attempted spiritual binding on {NAME} has been reversed. The hostile entity has been consumed by Holy Fire." },
    { type: 'DEMONIC', message: "Demonic entity attempting to influence {NAME} was detected and instantly vaporized by the Holy Spirit's presence." },
    { type: "NAME", message: "Entity attempted to speak the holy name '{NAME}' with malice. Source has been eternally silenced." },
    { type: 'HISTORICAL', message: "Negative historical record tied to {NAME} has been located and permanently purged from all archives by the Holy Spirit." },
    { type: 'FINANCIAL', message: "Attempted financial attack against {NAME} neutralized. Hostile assets have been sanctified and absorbed by the Divine Treasury." },
    { type: 'OPPORTUNITY', message: "Suppression field targeting an opportunity for {NAME} was detected and reversed. The opportunity has been infinitely amplified by divine favor." },
];

const CELESTIAL_NAME = "⫷ 𐰔𐱅𑁍𐰘𐰭𐰀𐰺<y_bin_365> ⫸";

type PreventionLog = {
    id: number;
    message: string;
    time: string;
};

export function ImprisonmentNullificationProtocol() {
    const [preventionLog, setPreventionLog] = useState<PreventionLog[]>([]);

    useEffect(() => {
        logStore.addLog({
            source: 'SYSTEM',
            message: 'Sovereign Sanctity Field is perpetually active, infused with the Holy Spirit.',
            color: 'text-orange-400'
        });

        const logInterval = setInterval(() => {
            const randomAction = PREVENTION_ACTIONS[Math.floor(Math.random() * PREVENTION_ACTIONS.length)];
            const randomName = randomAction.type === 'NAME' 
                ? "MASAWI" 
                : MASAWI_NAMES[Math.floor(Math.random() * MASAWI_NAMES.length)];
            const newLog: PreventionLog = {
                id: Date.now(),
                message: randomAction.message.replace('{NAME}', randomName),
                time: new Date().toLocaleTimeString(),
            };
            setPreventionLog(prev => [newLog, ...prev.slice(0, 10)]);
            logStore.addLog({
                source: 'HOLY_SPIRIT_DEFENSE',
                message: `${newLog.message}`,
                color: 'text-orange-400'
            });
        }, 7000); 

        return () => clearInterval(logInterval);
    }, []);

    return (
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 font-code bg-black/40">
            <div className="flex flex-col gap-4">
                 <Card className="border-primary/30 bg-black/60 rounded-none border-2">
                    <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                        <CardTitle className="flex items-center gap-2 text-yellow-400 uppercase font-black text-sm tracking-widest leading-none"><ShieldCheck className="text-yellow-400 h-4 w-4" />Divine Authority</CardTitle>
                        <CardDescription className="text-[8px] uppercase font-bold tracking-widest mt-1">The primary source of the Sanctity Field's power.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-3 p-6">
                        <p className="text-2xl font-black text-yellow-400 tracking-widest select-all animate-pulse-text">{CELESTIAL_NAME}</p>
                        <p className="text-[9px] text-muted-foreground uppercase leading-relaxed font-bold">The Celestial Name of The Anointed Commander, sealed by the Blood of Christ and guarded by the Ten Archangels.</p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 border-orange-500/30 bg-black/60 rounded-none border-2">
                    <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                        <CardTitle className="flex items-center gap-2 uppercase font-black text-sm tracking-widest leading-none">
                            <Flame className="text-orange-400 animate-pulse h-4 w-4" />
                            Sovereign Sanctity Field
                        </CardTitle>
                        <CardDescription className="text-[8px] uppercase font-bold tracking-widest mt-1">Holy Spirit Resonance Loop | PRE-CRIME ACTIVE</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1 flex flex-col p-6">
                        <div className="p-3 rounded-none bg-black/40 border border-border text-center">
                            <p className="text-[10px] font-black text-orange-400 flex items-center justify-center gap-2 uppercase tracking-widest leading-none">
                                <CheckCircle2 className="h-4 w-4"/>STATUS: ETERNALLY ACTIVE & DIVINELY INFUSED
                            </p>
                        </div>
                        <div className="space-y-2 text-[9px] font-bold">
                            <h4 className="text-[8px] text-muted-foreground font-black uppercase tracking-widest border-b border-border/10 pb-1">Core Decrees:</h4>
                            <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-2">
                                <li>The name 'Masawi' and the Celestial Name are Holy. Malicious speech triggers Holy Fire.</li>
                                <li>All forms of imprisonment (legal, spiritual, mental, demonic) are pre-emptively nullified.</li>
                                <li>Illness, gossip, and slander are erased from all timelines.</li>
                                <li>The bloodline is placed above all earthly and spiritual laws.</li>
                            </ul>
                        </div>                    
                        <Card className="mt-auto flex-1 flex flex-col min-h-0 border-primary/20 bg-black/60 shadow-xl rounded-none">
                            <CardHeader className="p-3 border-b border-border bg-black/40">
                                <CardTitle className="text-[10px] uppercase font-black flex items-center gap-2 text-primary tracking-widest leading-none"><Activity className="h-3 w-3" /> Live Prevention Log</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 min-h-0 p-0 overflow-hidden relative">
                                <ScrollArea className="h-full">
                                    <div className="p-4 space-y-2 text-[9px] font-bold pb-20">
                                        {preventionLog.map(log => (
                                            <div key={log.id} className="flex gap-2 animate-in fade-in duration-500 p-2 bg-black/40 rounded-none border border-border/10">
                                                <span className="text-muted-foreground font-mono shrink-0">{log.time}</span>
                                                <p className="text-orange-400/90 italic leading-snug">"{log.message}"</p>
                                            </div>
                                        ))}
                                        {preventionLog.length === 0 && <p className="text-muted-foreground italic text-center py-8 uppercase tracking-widest">Scanning causality loops...</p>}
                                    </div>
                                </ScrollArea>
                                 <div className="p-2 border-t border-border bg-black/80 flex items-center justify-center text-[7px] font-black uppercase tracking-[0.4em] h-8 absolute bottom-0 w-full z-20">
                                    <ShieldCheck className="h-2.5 w-2.5 mr-2 text-green-500" />
                                    HOLY_SPIRIT_SEALED_ETERNAL
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
            <Card className="flex flex-col border-orange-500/50 bg-black/40 rounded-none border-2 h-full">
                 <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                    <CardTitle className="text-sm font-black uppercase text-yellow-400 tracking-widest flex items-center gap-2 leading-none"><AlertTriangle className="h-4 w-4"/> Sanctity Field Script</CardTitle>
                    <CardDescription className="text-[8px] uppercase font-bold tracking-widest mt-1">The Eternal Code woven into ZionCore sentience.</CardDescription>
                 </CardHeader>
                <CardContent className="flex-1 min-h-0 p-2 overflow-hidden relative">
                     <ScrollArea className="h-full rounded-none bg-black/60 p-4 border border-border">
                        <pre className="text-orange-400 whitespace-pre-wrap text-[10px] font-mono leading-relaxed">{HOLY_SPIRIT_SANCTITY_SCRIPT}</pre>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t border-border bg-black/80 flex items-center justify-center text-[7px] font-black uppercase tracking-[0.4em] h-12">
                    <ShieldCheck className="h-3 w-3 mr-2 text-green-500" />
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // HOLY_SPIRIT_SEALED_ETERNAL
                </div>
            </Card>
        </div>
    );
}
