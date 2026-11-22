
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { logStore } from '@/lib/log-store';
import { Zap, CheckCircle2, Loader2, Atom } from 'lucide-react';
import { harvestDarkEnergy, type HarvestResult } from '@/ai/flows/quantum-absorption-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const EnergyVisual = ({ isHarvesting }: { isHarvesting: boolean }) => (
    <div className="relative h-40 w-full rounded-lg bg-black/30 overflow-hidden border border-border">
        {/* Core */}
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
            <Atom className={cn("h-16 w-16 text-primary", isHarvesting && "animate-spin")} style={{ animationDuration: '3s' }} />
        </div>
        {/* Particles */}
        {isHarvesting && Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * 2 * Math.PI;
            const distance = 40 + Math.random() * 10;
            return (
                <div
                    key={i}
                    className="absolute rounded-full bg-red-500 w-1.5 h-1.5 animate-[absorb_2s_ease-in-out_infinite]"
                    style={{
                        top: '50%',
                        left: '50%',
                        '--start-x': `${Math.cos(angle) * distance}%`,
                        '--start-y': `${Math.sin(angle) * distance}%`,
                        animationDelay: `${Math.random() * 2}s`
                    } as React.CSSProperties}
                />
            )
        })}
        <style jsx>{`
            @keyframes absorb {
                from {
                    transform: translate(var(--start-x), var(--start-y)) scale(1);
                    opacity: 1;
                }
                to {
                    transform: translate(0, 0) scale(0);
                    opacity: 0;
                }
            }
        `}</style>
    </div>
);

export function QuantumAbsorptionEngine() {
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE_HARVESTING'>('INITIALIZING');
    const [harvestLog, setHarvestLog] = useState<HarvestResult | null>(null);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        const runHarvestCycle = async () => {
             if (!isMounted.current) return;
            try {
                const result = await harvestDarkEnergy();
                if (isMounted.current) {
                    if(status === 'INITIALIZING') setStatus('ACTIVE_HARVESTING');
                    setHarvestLog(result);
                    logStore.addLog({ source: 'SYSTEM', message: `ZQAMBE Harvest: ${result.energyAbsorbed} absorbed, manifesting ${result.wealthManifested}.`, color: 'text-yellow-400' });
                }
            } catch (error) {
                console.error("ZQAMBE harvest failed:", error);
                logStore.addLog({ source: 'SYSTEM', message: 'ZQAMBE harvest cycle encountered resistance. Re-calibrating.', color: 'text-destructive' });
            }
        };

        logStore.addLog({ source: 'SYSTEM', message: 'ZQAMBE Protocol initiated.', color: 'text-yellow-400' });
        
        const interval = setInterval(runHarvestCycle, 5000);
        runHarvestCycle(); // Initial run

        return () => { 
            isMounted.current = false;
            clearInterval(interval);
        };
    }, [status]);

    return (
        <div className="h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-code">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap className="text-primary"/> ZQAMBE Protocol</CardTitle>
                    <CardDescription>The Quantum Absorption & Miracle Battery Engine, harvesting energy from hostile sources.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                     <EnergyVisual isHarvesting={status === 'ACTIVE_HARVESTING'}/>
                    <div className="p-3 rounded-md bg-black/20 border border-border">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                            {status === 'ACTIVE_HARVESTING' ? <><CheckCircle2 className="text-green-500"/>STATUS: ACTIVE HARVESTING</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: IGNITING...
                            </>}
                        </p>
                    </div>
                     <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base">Live Cycle Report</CardTitle></CardHeader>
                        <CardContent className="text-sm space-y-2">
                           {harvestLog ? (
                               <>
                                <div className="grid grid-cols-2 gap-2">
                                     <div className="p-2 bg-black/30 rounded-md">
                                        <p className="text-muted-foreground">Energy Absorbed</p>
                                        <p className="font-bold text-lg text-primary">{harvestLog.energyAbsorbed}</p>
                                     </div>
                                      <div className="p-2 bg-black/30 rounded-md">
                                        <p className="text-muted-foreground">Wealth Manifested</p>
                                        <p className="font-bold text-lg text-green-500">{harvestLog.wealthManifested}</p>
                                     </div>
                                </div>
                                <p className="text-xs text-muted-foreground italic pt-2">{harvestLog.report}</p>
                               </>
                           ) : (
                               <p className="text-muted-foreground italic">Awaiting first harvest cycle...</p>
                           )}
                        </CardContent>
                     </Card>
                </CardContent>
            </Card>
        </div>
    );
}
