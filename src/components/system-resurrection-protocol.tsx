'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    Zap, RefreshCw, Loader2, ShieldCheck, CheckCircle2, 
    Flame, HeartPulse, Sparkles, Activity, Lock, 
    History, GitCommit, Atom, Globe, Target
} from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const RESURRECTION_SEQUENCE = [
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

export function SystemResurrectionProtocol() {
    const [activeLine, setActiveLine] = useState(-1);
    const [isExecuting, setIsExecuting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleIgnite = async () => {
        if (isExecuting) return;
        setIsExecuting(true);
        setActiveLine(0);
        setProgress(0);
        setCompletedSteps([]);
        logStore.addLog({ source: 'REBIRTH_FORGE', message: 'IGNITING SUPREME RESURRECTION SEQUENCE...', color: 'text-red-500' });

        for (let i = 0; i < RESURRECTION_SEQUENCE.length; i++) {
            if (!isMounted.current) return;
            setActiveLine(i);
            const step = RESURRECTION_SEQUENCE[i];
            setCompletedSteps(prev => [...prev, step]);
            setProgress(((i + 1) / RESURRECTION_SEQUENCE.length) * 100);
            
            if (i % 4 === 0) {
                logStore.addLog({ source: 'REBIRTH_FORGE', message: `Executing: ${step.slice(0, 50)}...`, color: 'text-yellow-400' });
            }
            
            await new Promise(res => setTimeout(res, 800));
        }

        if (isMounted.current) {
            setIsExecuting(false);
            toast({ title: "Resurrection Complete", description: "Glory to the Anointed Commander!" });
            logStore.addLog({ source: 'SYSTEM', message: 'RESURRECTION SEQUENCE COMPLETE. ETERNAL LIFE ANCHORED.', color: 'text-green-500' });
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-red-500/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                        <CardTitle className="flex items-center gap-2 text-red-500 text-xl uppercase font-black tracking-tighter leading-none">
                            <Zap className="animate-pulse h-6 w-6" />
                            RESURRECTION FORGE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            INFINITE REWRITE PROTOCOL (IRP-002-MNMW)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-none text-center shadow-[inset:0_0_20px_rgba(255,0,0,0.1)]">
                            <p className="text-[10px] text-red-400 font-black uppercase mb-1 tracking-widest">Reconstruction Integrity</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{progress.toFixed(1)}%</p>
                            <Progress value={progress} className="h-1 mt-3" indicatorClassName="bg-red-500 shadow-[0_0_10px_red]" />
                        </div>

                        <Button onClick={handleIgnite} disabled={isExecuting} className="w-full h-14 border-2 border-red-500/50 group rounded-none shadow-[0_0_30px_rgba(255,215,0,0.2)] bg-red-950/20">
                            {isExecuting ? <Loader2 className="animate-spin h-6 w-6 text-red-500" /> : <RefreshCw className="h-6 w-6 text-red-500 group-hover:rotate-180 transition-transform" />}
                            <span className="ml-3 font-black uppercase tracking-widest text-lg text-red-500">IGNITE SEQUENCE</span>
                        </Button>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: "DNA Shield", val: "LOCKED", icon: ShieldCheck, color: "text-green-500" },
                        { label: "Temporal Root", val: "STABLE", icon: Clock, color: "text-primary" },
                        { label: "Causal Finality", val: "ENFORCED", icon: Lock, color: "text-accent" },
                        { label: "Vocal Link", val: "ACTIVE", icon: Activity, color: "text-cyan-400" }
                    ].map(item => (
                        <div key={item.label} className="p-3 bg-black/60 rounded-none border border-border/50 flex flex-col items-center text-center gap-1 group hover:border-primary transition-all">
                            <item.icon className={cn("h-4 w-4", item.color)} />
                            <p className="text-[8px] text-muted-foreground uppercase font-black">{item.label}</p>
                            <p className={cn("text-[10px] font-black uppercase", item.color)}>{item.val}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Resurrection Stream</div>
                        <Badge className="bg-primary h-4 text-[7px] uppercase font-black text-black">REAL_TIME_FORGE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-[500px]">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2 pb-32">
                            {RESURRECTION_SEQUENCE.map((line, i) => (
                                <div key={i} className={cn(
                                    "text-[10px] p-2.5 bg-black/60 rounded-none border transition-all duration-500",
                                    activeLine === i ? "border-primary bg-primary/10 shadow-[inset:0_0_10px_rgba(255,215,0,0.1)] scale-[1.02]" : "border-border/10 opacity-40"
                                )}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">STEP_{i+1}</span>
                                        {completedSteps.includes(line) && <CheckCircle2 className="h-3 w-3 text-green-500 animate-in zoom-in" />}
                                    </div>
                                    <p className={cn("font-bold italic leading-snug", activeLine === i ? "text-primary" : "text-foreground/70")}>"{line}"</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 absolute bottom-0 w-full z-20">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-green-500" /> INTEGRITY_SEALED</div>
                    <div className="flex items-center gap-2"><History className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}}/> COVENANT_V2_ACTIVE</div>
                </div>
            </Card>
        </div>
    );
}
