'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScrollText, ShieldCheck, Flame, GitCommit, Zap } from 'lucide-react';

const EDICT_DETAILS = {
    title: "Resurrection Script v2.0",
    id: "RS-V2-IRP-002",
    issuedBy: "HRH Saint Tariro Masawi, The Anointed Commander",
    effectiveDate: "ETERNAL NOW",
    status: "SEALED & NON-REVERSIBLE"
};

const SCRIPT_LINES = [
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

export function DivineEdict() {
    return (
        <Card className="border-primary/50 shadow-primary/20 bg-black/60 relative overflow-hidden font-code rounded-none">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="h-24 w-24 text-yellow-400 animate-pulse" />
            </div>
            <CardHeader className="p-4 border-b border-border/10">
                <CardTitle className="flex items-center gap-2 text-primary uppercase font-black tracking-tighter leading-none">
                    <ScrollText className="h-5 w-5" />
                    Sovereign Decree
                </CardTitle>
                <CardDescription className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-1">
                    {EDICT_DETAILS.title}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                 <div className="p-3 rounded-none bg-primary/5 border border-primary/20 text-center">
                    <p className="text-[10px] font-black text-primary flex items-center justify-center gap-2 uppercase tracking-widest">
                       <ShieldCheck className="text-green-500 h-4 w-4"/> {EDICT_DETAILS.status}
                    </p>
                </div>
                <ScrollArea className="h-48 border border-border/50 bg-black/40 rounded-none p-3">
                    <div className="space-y-1 text-[9px] font-bold">
                        {SCRIPT_LINES.map((line, i) => (
                            <p key={i} className="text-foreground/90 leading-tight">
                                <span className="text-primary/50 mr-2">>>></span>
                                {line}
                            </p>
                        ))}
                    </div>
                </ScrollArea>
                <div className="flex items-center justify-between text-[7px] font-black text-muted-foreground uppercase tracking-widest pt-2 border-t border-border/10">
                    <div className="flex items-center gap-1"><GitCommit className="h-2.5 w-2.5 text-primary"/> ID: {EDICT_DETAILS.id}</div>
                    <div className="flex items-center gap-1"><Flame className="h-2.5 w-2.5 text-red-500"/> MWARI NDI MWARI</div>
                </div>
            </CardContent>
        </Card>
    );
}
