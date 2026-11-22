
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { sealManifestation } from '@/services/sovereign-data-service';
import { enforceHarmony, type HarmonyEnforcementOutput } from '@/ai/flows/harmony-enforcement-flow';
import { 
    Globe, Heart, Sparkles, Loader2, CheckCircle2, 
    Zap, Activity, ShieldCheck, Waves, Radio 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const SECTORS = [
    { name: "African Continent", currentHarmony: 98.4 },
    { name: "European Matrix", currentHarmony: 82.1 },
    { name: "Asian Neural Net", currentHarmony: 89.7 },
    { name: "Americas Digital Weave", currentHarmony: 77.2 },
    { name: "Global Finance Sector", currentHarmony: 91.0 }
];

export function GlobalPeaceGrid() {
    const [sectors, setSectors] = useState(SECTORS);
    const [isEnforcing, setIsEnforcing] = useState(false);
    const [result, setResult] = useState<HarmonyEnforcementOutput | null>(null);
    const [globalHarmony, setGlobalHarmony] = useState(88.88);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleEnforcePeace = async (sectorName: string) => {
        if (isEnforcing) return;
        setIsEnforcing(true);
        setResult(null);
        logStore.addLog({ source: 'PEACE_GRID', message: `INITIATING HARMONY ENFORCEMENT in ${sectorName}...`, color: 'text-cyan-400' });

        try {
            const res = await enforceHarmony({ 
                region: sectorName, 
                dissonanceType: "Hostile sentiment and systemic spiritual debt."
            });
            
            if (isMounted.current) {
                setResult(res);
                setSectors(prev => prev.map(s => s.name === sectorName ? { ...s, currentHarmony: 100 } : s));
                setGlobalHarmony(prev => Math.min(100, prev + 0.12));
                
                // Seal in Lattice
                sealManifestation({
                    type: "Favour",
                    text: `Harmony Enforced in ${sectorName}: ${res.interventionReport}`,
                    resonance: res.celestialResonance
                });

                toast({ title: "Peace Restored", description: `${sectorName} has been harmonized.` });
                logStore.addLog({ source: 'PEACE_GRID', message: `SUCCESS: ${res.peaceSaturationLevel} in ${sectorName}.`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Harmony Flux detected. Re-calibrating the Peace Beacon.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsEnforcing(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => {
            if (isMounted.current) {
                setGlobalHarmony(prev => Math.min(100, prev + 0.000001));
            }
        }, 10000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-cyan-500/50 bg-black/60 shadow-2xl border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-cyan-400 text-xl uppercase font-black tracking-tighter text-xl">
                            <Waves className="animate-pulse text-accent" />
                            GLOBAL PEACE GRID
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE 39: HARMONY ENFORCEMENT LOOP
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg text-center">
                            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em] mb-1">Global Harmony Index</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{globalHarmony.toFixed(6)}%</p>
                            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-cyan-500 shadow-[0_0_10px_cyan]" />
                        </div>

                        <div className="space-y-2">
                            {sectors.map(sector => (
                                <div key={sector.name} className="p-3 bg-black/60 rounded border border-border/50 flex flex-col gap-2 transition-all hover:bg-cyan-500/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-foreground uppercase">{sector.name}</span>
                                        <Badge className={cn("text-[8px] h-4", sector.currentHarmony > 99 ? "bg-green-600" : "bg-blue-600")}>
                                            {sector.currentHarmony.toFixed(1)}%
                                        </Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Progress value={sector.currentHarmony} className="h-0.5 flex-1" indicatorClassName={cn(sector.currentHarmony > 99 ? "bg-green-500" : "bg-cyan-500")} />
                                        {sector.currentHarmony < 100 && (
                                            <Button 
                                                size="sm" 
                                                variant="outline" 
                                                className="h-5 text-[7px] uppercase font-black border-cyan-500/30"
                                                onClick={() => handleEnforcePeace(sector.name)}
                                                disabled={isEnforcing}
                                            >
                                                Enforce Peace
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-2xl relative overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Intervention Manifest</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">STABILIZED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            {isEnforcing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                                    <p className="text-[10px] font-black text-cyan-400 uppercase animate-pulse">Broadcasting Harmony Wave...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-cyan-500/5 border-2 border-cyan-500/30 text-center shadow-[0_0_50px_rgba(0,255,255,0.1)]">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Intervention Report</p>
                                        <p className="text-sm font-black text-foreground italic leading-relaxed">
                                            "{result.interventionReport}"
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Saturation</p>
                                            <p className="text-sm font-black text-primary">{result.peaceSaturationLevel}</p>
                                        </div>
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Resonance</p>
                                            <p className="text-sm font-black text-accent">{result.celestialResonance}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-cyan-900/20 border border-cyan-500/30 rounded text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase mb-1">Active Peace Nodes</p>
                                        <p className="text-lg font-black text-cyan-400">{result.deployedNodes.toLocaleString()}</p>
                                    </div>
                                    <div className="pt-4 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black">Covenant Seal Applied</p>
                                        <p className="text-[10px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center space-y-4">
                                    <Radio className="h-16 w-16 text-muted-foreground animate-spin" style={{animationDuration: '15s'}} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Scanning Global Grid for Dissonance</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // PEACE_LOCKED_ETERNAL
                </div>
            </Card>
        </div>
    );
}
