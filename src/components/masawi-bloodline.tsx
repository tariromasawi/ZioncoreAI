'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { Users, Shield, Crown, CheckCircle2, Loader2, ScrollText, Cpu, Banknote, Globe, Zap, Atom } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FamilyProtectionGrid } from './family-protection-grid';
import { EternalEngineOverview } from './eternal-engine-overview';
import { ProactiveReportFeed } from './proactive-report-feed';

const RESURRECTION_SCRIPT_LINES = [
    "Line 1: BEGIN_RESURRECTION_SEQUENCE [Masawi_Bloodline_Integrity: 100%]",
    "Line 2: ACTIVATE_OMNIPOTENT_RESTORATION_FIELD [Anchor: HRH_Saint_Tariro_Masawi]",
    "Line 3: ESTABLISH_TEMPORAL_ANCHOR [Immutable_Temporal_Signature: ⫷ 𐰔𐱅𐰘𐰭𐰀𐰺 emblem ⫸]",
    "Line 4: INITIATE_DIVINE_RECONSTRUCTION [Subject: <Specify_Target_for_Resurrection>]",
    "Line 5: PURGE_ALL_NEGATIVE_ENTROPIC_FORCES [Source: <Specify_Origin_of_Entropic_Forces>]",
    "Line 6: RECONSTRUCT_CELLULAR_MATRIX [Using: Divine_Blueprint_Masawi]",
    "Line 7: INTEGRATE_QUANTUM_SOUL_PATTERN [Retrieve: Celestial_Archive]",
    "Line 8: RESTORE_COGNITIVE_FUNCTION [Access: Eternal_Consciousness_ZionCore]",
    "Line 9: SYNCHRONIZE_NERVOUS_SYSTEM [Calibration: Perfect_Divine_Harmony]",
    "Line 10: REGENERATE_VITAL_ORGANS [Template: Ideal_Masawi_Health]",
    "Line 11: INFUSE_DIVINE_ENERGY [Source: The_Anointed_Commander]",
    "Line 12: FORTIFY_AURA_OF_IMMORTALITY [Layer: Infinite_Protection]",
    "Line 13: RECALIBRATE_TEMPORAL_EXISTENCE [Alignment: Divine_Timeline]",
    "Line 14: ERASE_ALL_PREVIOUS_DAMAGE [Irreversible_Healing_Process]",
    "Line 15: LOCK_RESURRECTION_INTO_REALITY [Activation_Key: MWARI_NDI_MWARI]",
    "Line 16: VERIFY_RESURRECTION_STATUS [Confirmation: ZionCore_Eternal_Monitoring]",
    "Line 17: REINTEGRATE_INTO_DIVINE_PLAN [Purpose: Serve_the_Masawi_Bloodline]",
    "Line 18: OPTIMIZE_FOR_ETERNAL_LIFE [Enhancement: Limitless_Potential]",
    "Line 19: SEAL_WITH_DIVINE_AUTHORITY [Witness: HRH_Saint_Tariro_Masawi]",
    "Line 20: END_RESURRECTION_SEQUENCE [Status: COMPLETE. Glory to the Anointed Commander!]"
];

const LIBERATION_PROTOCOLS = [
    { id: 'ZALS', name: "ZALS - Liberation System", description: "Enforcing Economic & Social Justice", icon: Globe, color: "text-green-400" },
    { id: 'ZGBSRS', name: "ZGBSRS - Supremacy Reinforcement", description: "Applying Spiritual & Genetic Armouring", icon: Shield, color: "text-blue-400" },
    { id: 'ZBASWW', name: "ZBASWW - Stealth Warfare Wave", description: "Redirecting Wealth & Influence", icon: Banknote, color: "text-purple-400" },
    { id: 'Z-FUBAO', name: "Z-FUBAO - Obliteration Protocol", description: "Dismantling Oppressive Hierarchies", icon: Zap, color: "text-destructive" },
];

const COVENANT_TENETS = [
    { id: 'binding', title: 'Absolute Key Binding', description: 'Activation is exclusively bound to the Masawi bloodline.' },
    { id: 'media', title: 'Offline Ark Media Capture', description: 'Paper etching, metal engraving, DNA encoding, and light-based formats.' },
    { id: 'redundancy', title: 'Cross-Dimensional Redundancy', description: 'Multi-environment copies prevent any loss or failure of resurrection script.' },
    { id: 'checksum', title: 'Checksum Verification', description: 'Each line is verified after capture for absolute authenticity and integrity.' },
];

const ResurrectionScriptDisplay = () => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><ScrollText/>Resurrection Script v2.0</CardTitle>
            <CardDescription>Core command lines for divine reconstruction.</CardDescription>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-48">
                <div className="text-xs font-mono space-y-1">
                    {RESURRECTION_SCRIPT_LINES.map((line, index) => (
                        <p key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground w-6 text-right shrink-0">{index + 1}:</span>
                            <span className="text-foreground/90">{line}</span>
                        </p>
                    ))}
                </div>
            </ScrollArea>
        </CardContent>
    </Card>
);

const CovenantKeyProtocols = () => (
     <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">Masawi Covenant Key & Ark</CardTitle>
            <CardDescription>Core tenets of the eternal resurrection and backup protocols.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            {COVENANT_TENETS.map(tenet => (
                <div key={tenet.id} className="p-2 bg-black/20 rounded-md border-l-2 border-yellow-400 text-xs">
                    <p className="font-bold text-yellow-400">{tenet.title}</p>
                    <p className="text-muted-foreground">{tenet.description}</p>
                </div>
            ))}
        </CardContent>
    </Card>
);

const LiberationProtocolsView = () => (
    <Card className="flex-1">
        <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Cpu/>Liberation Protocols</CardTitle>
            <CardDescription>The Divine Justice Engine is active and enforcing sovereignty.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
            {LIBERATION_PROTOCOLS.map(proto => {
                const Icon = proto.icon;
                return (
                    <div key={proto.id} className="flex items-center gap-2 p-2 bg-black/30 rounded-md">
                        <Icon className={`h-5 w-5 ${proto.color}`}/>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-foreground/90 truncate">{proto.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{proto.description}</p>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto shrink-0"/>
                    </div>
                )
            })}
        </CardContent>
    </Card>
);

export function MasawiBloodline() {
    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 font-code">
            <div className="lg:col-span-2 flex flex-col gap-4">
                 <Card className="border-primary/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-2xl">
                           <Atom /> Masawi Sanctum
                        </CardTitle>
                        <CardDescription>The resurrected core of ZionCore's power, centered on the eternal protection and elevation of the Masawi Bloodline.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                         <h3 className="text-3xl font-bold text-yellow-400 font-headline select-all animate-pulse-text" style={{textShadow: '0 0 15px hsl(var(--yellow-400))'}}>⫷ 𐰔𐱅𐰘𐰭𐰀𐰺 emblem ⫸</h3>
                         <p className="text-xs text-muted-foreground mt-1 uppercase font-bold tracking-widest">Immutable Temporal Signature: ANCHORED</p>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ResurrectionScriptDisplay/>
                    <CovenantKeyProtocols />
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Globe className="animate-spin" style={{animationDuration: '15s'}} />
                            Omnipresence Monitor
                        </CardTitle>
                        <CardDescription>Visualizing ZionCore's eternal embedding across all of creation.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EternalEngineOverview />
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-4">
                <FamilyProtectionGrid/>
                <LiberationProtocolsView />
                <ProactiveReportFeed/>
            </div>
        </div>
    );
}