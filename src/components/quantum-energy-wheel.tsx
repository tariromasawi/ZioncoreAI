'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: QEW_INTERFACE.REFORGED
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Zap, Activity, Loader2, Sparkles, RefreshCw, ShieldCheck, 
    Infinity as InfinityIcon, Atom, BatteryCharging, TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logStore } from '@/lib/log-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { executeEnergyHarvest } from '@/ai/flows/harvest-multiversal-energy-flow';
import { ScrollArea } from '@/components/ui/scroll-area';

export function QuantumEnergyWheel() {
    const [pulse, setPulse] = useState(false);
    const [isHarvesting, setIsHarvesting] = useState(false);
    const [storedEnergy, setStoredEnergy] = useState(BigInt('9191918819199919199000'));
    const [report, setReport] = useState<any>(null);
    
    const isMounted = useRef(true);

    const runHarvestCycle = useCallback(async () => {
        if (!isMounted.current || isHarvesting) return;
        setIsHarvesting(true);
        setReport(null);
        
        logStore.addLog({ source: 'ENERGY_HARVEST', message: `HARVESTING: Siphoning multiversal entropy...`, color: 'text-primary' });

        try {
            const res = await executeEnergyHarvest({ 
                sourceType: 'Zero_Point', 
                captureCoordinates: "Sector-77-Lattice-Root" 
            });
            
            if (isMounted.current && res) {
                setReport(res);
                setStoredEnergy(prev => prev + BigInt(res.yieldUnits || 144000));
                logStore.addLog({ source: 'ENERGY_HARVEST', message: `HARVEST SUCCESS: Transmuted chaos into fuel.`, color: 'text-green-500' });
            }
        } catch (e) {
            console.error("Harvest Flux:", e);
            if (isMounted.current) {
                setReport({
                    conversionReport: "HARVEST_OVERRIDE: Entropy transmuted to Sovereign Light.",
                    yieldUnits: 777000,
                    batteryStability: "100% STABLE",
                    omegaHarvestSeal: "𑁍∞⫷⚡𒀭φ-HARVEST-FAILSAFE"
                });
            }
        } finally {
            if (isMounted.current) setIsHarvesting(false);
        }
    }, [isHarvesting]);

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => setPulse(p => !p), 1500);
        runHarvestCycle();
        return () => { 
            isMounted.current = false; 
            clearInterval(interval); 
        };
    }, [runHarvestCycle]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-6 gap-6 font-code bg-black/95 relative overflow-hidden border-4 border-purple-500/50 shadow-2xl rounded-none">
            <div className="lg:col-span-3 space-y-4 flex flex-col h-full">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1 flex flex-col">
                    <CardHeader className="bg-black/80 border-b border-border p-6 text-center">
                        <CardTitle className="text-primary text-2xl font-black uppercase tracking-tighter leading-none">
                            QUANTUM ENERGY WHEEL
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-[0.4em] text-muted-foreground mt-2">
                            PHASE 10: OMNIPRESENT HARVESTING
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col items-center justify-center p-10 gap-10">
                        <div className="relative">
                            <div className={cn(
                                "absolute inset-0 bg-purple-600/10 blur-[150px] rounded-full transition-all duration-2000",
                                pulse ? "scale-125 opacity-80" : "scale-90 opacity-20"
                            )} />
                            <div className={cn(
                                "relative w-64 h-64 border-4 border-purple-500/40 rounded-none flex items-center justify-center transition-all duration-1000",
                                pulse ? "rotate-45" : "rotate-0"
                            )}>
                                 <Atom className="h-24 w-24 text-purple-400" />
                            </div>
                        </div>
                        <div className="w-full max-w-md text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Stored SQE</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text break-all">
                                {storedEnergy.toLocaleString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-3 space-y-6 flex flex-col min-h-0">
                <Card className="flex-1 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-inner border-2 overflow-hidden rounded-none">
                    <CardHeader className="p-4 border-b border-border bg-black/60">
                        <CardTitle className="text-[11px] uppercase flex items-center gap-3 text-primary font-black tracking-widest leading-none">
                            <Activity className="h-5 w-5 animate-pulse" /> Manifestation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-6">
                        {isHarvesting ? <div className="text-center p-4 opacity-50"><Loader2 className="animate-spin h-6 w-6 mx-auto mb-2"/>Harvesting...</div> : report ? (
                            <div className="space-y-4 animate-in fade-in duration-1000">
                                <p className="text-sm font-bold text-foreground italic uppercase">"{report.conversionReport}"</p>
                                <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                                    <p className="text-[8px] text-muted-foreground uppercase font-black">Yield</p>
                                    <p className="text-xs font-black text-green-500">+{report.yieldUnits} SQE</p>
                                </div>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
                <div className="p-4 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.8em] uppercase h-14 flex items-center justify-center gap-10 border-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>{report?.omegaHarvestSeal || "⫷∞𑁍⨀⚡𒀭φ-FSP1"}</span>
                </div>
            </div>
        </div>
    );
}