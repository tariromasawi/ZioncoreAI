'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: KRYSTONIUM_VISUALIZER.REFORGED
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Zap, Activity, Loader2, Sparkles, Radio, 
    RefreshCw, ShieldCheck, Flame, Atom, Crown, Target, Heart, Lock,
    History, ShieldAlert, Infinity as InfinityIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logStore } from '@/lib/log-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { executeKrystoniumResonance } from '@/ai/flows/krystonium-resonance-flow';
import { ScrollArea } from '@/components/ui/scroll-area';

export function KrystoniumRingVisualizer() {
    const [pulse, setPulse] = useState(false);
    const [isActivating, setIsActivating] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [shieldFidelity, setShieldFidelity] = useState(99.98);
    
    const isMounted = useRef(true);

    const runResonanceCycle = useCallback(async () => {
        if (!isMounted.current || isActivating) return;
        setIsActivating(true);
        setReport(null);
        
        logStore.addLog({ source: 'SECURITY', message: 'TALISMAN ACTIVATION: Projecting Krystonium-777 resonance...', color: 'text-primary' });

        try {
            const res = await executeKrystoniumResonance({ bloodlineNode: "Masawi Lineage Prime" });
            if (isMounted.current && res) {
                setReport(res);
                setShieldFidelity(res.shieldFidelity || 100);
                logStore.addLog({ source: 'MANIFESTATION', message: `SHIELD STABLE: Resonance locked at ${res.shieldFidelity}%.`, color: 'text-green-500' });
            }
        } catch (e) {
            console.error("Resonance Flux:", e);
            if (isMounted.current) {
                setReport({
                    shieldFidelity: 100,
                    fieldReports: { spiritual: "LOCKED", temporal: "LOCKED", quantum: "LOCKED" },
                    neutralizationLog: ["Pre-emptive scan complete.", "No dissent manifest."],
                    omegaTalismanSeal: "𑁍∞⫷⚡𒀭φ-RING-FAILSAFE"
                });
            }
        } finally {
            if (isMounted.current) setIsActivating(false);
        }
    }, [isActivating]);

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => setPulse(p => !p), 1500);
        runResonanceCycle();
        return () => { 
            isMounted.current = false; 
            clearInterval(interval); 
        };
    }, [runResonanceCycle]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-6 gap-6 font-code bg-black/95 relative overflow-hidden border-4 border-primary/50 shadow-2xl rounded-none">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
            
            <div className="lg:col-span-3 space-y-4 flex flex-col h-full">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1 flex flex-col">
                    <CardHeader className="bg-black/80 border-b border-border p-6 text-center">
                        <CardTitle className="text-primary text-2xl font-black uppercase tracking-tighter leading-none">
                            KRYSTONIUM RING-777
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-[0.4em] text-muted-foreground mt-2">
                            DIVINE TALISMAN & SOVEREIGN SHIELD
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col items-center justify-center p-10 gap-10">
                        <div className="relative">
                            <div className={cn(
                                "absolute inset-0 bg-primary/20 blur-[100px] rounded-full transition-all duration-2000",
                                pulse ? "scale-125 opacity-80" : "scale-90 opacity-20"
                            )} />
                            <div className={cn(
                                "relative w-64 h-64 border-4 border-primary/40 rounded-full flex items-center justify-center transition-all duration-1000",
                                pulse ? "rotate-12 scale-110 shadow-[0_0_80px_rgba(255,215,0,0.3)]" : "rotate-0 scale-100"
                            )}>
                                 <Atom className="h-16 w-16 text-primary animate-spin" style={{animationDuration: '5s'}} />
                            </div>
                        </div>
                        <div className="w-full max-w-sm text-center space-y-4">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Shield Fidelity</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{shieldFidelity.toFixed(4)}%</p>
                            <Progress value={shieldFidelity} className="h-1" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-3 space-y-6 flex flex-col min-h-0">
                <Card className="bg-black/80 border-primary/40 shadow-2xl border-2 rounded-none">
                    <CardHeader className="p-4 border-b border-border bg-black/60">
                        <CardTitle className="text-[11px] uppercase flex items-center justify-between text-primary font-black tracking-widest leading-none">
                            <div className="flex items-center gap-3"><Activity className="h-4 w-4 text-primary animate-pulse" /> Field Sync</div>
                            <Badge className="bg-green-600 text-white h-5 px-4 text-[8px] font-black">ACTIVE</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {report?.fieldReports ? (
                             <div className="space-y-3">
                                {Object.entries(report.fieldReports || {}).map(([key, val]: [string, any]) => (
                                    <div key={key} className="p-3 bg-black/40 rounded border border-border/30 flex items-center justify-between text-[10px]">
                                        <span className="uppercase font-black">{key} FIELD</span>
                                        <span className="text-green-500 font-bold uppercase">{val}</span>
                                    </div>
                                ))}
                             </div>
                         ) : <div className="text-center p-4 opacity-50"><Loader2 className="animate-spin h-6 w-6 mx-auto mb-2"/>Tuning Resonance...</div>}
                    </CardContent>
                </Card>
                <div className="p-4 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.8em] uppercase h-14 flex items-center justify-center gap-10 border-2">
                    <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-4 w-4" /> TALISMAN_ACTIVE</div>
                    <span className="animate-pulse-text">{report?.omegaTalismanSeal || "⫷∞𑁍⨀⚡𒀭φ-FSP1"}</span>
                </div>
            </div>
        </div>
    );
}