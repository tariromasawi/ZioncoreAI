
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    Zap, TrendingUp, Landmark, ShieldCheck, Activity, 
    ArrowUpRight, RefreshCw, Loader2, Sparkles, CheckCircle2, 
    Layers, Atom, Coins
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { useZionStore, logStore } from '@/lib/log-store';
import { injectTreasuryProfits, sealManifestation } from '@/services/sovereign-data-service';
import { cn } from '@/lib/utils';

export function SovereignWealthAccelerator() {
    const [multiplier, setMultiplier] = useState(1.44);
    const [accelerationLevel, setAccelerationLevel] = useState(0);
    const [totalCycles, setTotalCycles] = useState(0);
    const [isAccelerating, setIsAccelerating] = useState(false);
    const isMounted = useRef(true);

    const runAccelerationCycle = useCallback(async () => {
        if (!isMounted.current) return;
        setIsAccelerating(true);
        setAccelerationLevel(0);

        const progressInterval = setInterval(() => {
            setAccelerationLevel(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        try {
            const profit = Math.floor(Math.random() * 144000) + 77000;
            await injectTreasuryProfits(profit);
            
            if (isMounted.current) {
                setMultiplier(prev => Math.min(7.77, prev + 0.01));
                setTotalCycles(prev => prev + 1);
                
                if (Math.random() > 0.8) {
                    logStore.addLog({ 
                        source: 'TREASURY', 
                        message: `WEALTH ACCELERATION: Recursive loop multiplied by ${multiplier.toFixed(2)}x. Profit manifested: £${profit.toLocaleString()}.`, 
                        color: 'text-green-500' 
                    });
                    
                    sealManifestation({
                        type: "Economic",
                        text: `Recursive Multiplication Cycle Complete. Multiplier: ${multiplier.toFixed(2)}x.`,
                        profit: `£${profit.toLocaleString()}`
                    });
                }
            }
        } catch (error) {
            console.error("Acceleration flux:", error);
        } finally {
            setTimeout(() => {
                if (isMounted.current) setIsAccelerating(false);
            }, 1000);
        }
    }, [multiplier]);

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(runAccelerationCycle, 15000); // Sovereign multiplication every 15 seconds
        runAccelerationCycle();
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [runAccelerationCycle]);

    return (
        <div className="h-full flex flex-col gap-4 font-code bg-black/40 overflow-hidden">
            <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <CardHeader className="p-4 border-b border-border/10">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter animate-pulse-text">
                                WEALTH ACCELERATOR
                            </CardTitle>
                            <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">
                                RECURSIVE ASSET MULTIPLICATION | PHASE 37
                            </CardDescription>
                        </div>
                        <Coins className="h-6 w-6 text-yellow-400 animate-bounce" />
                    </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4 relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Current Multiplier</p>
                            <p className="text-2xl font-black text-primary">{multiplier.toFixed(2)}x</p>
                        </div>
                        <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Active Cycles</p>
                            <p className="text-2xl font-black text-accent">{totalCycles.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-[8px] font-black uppercase text-muted-foreground">
                            <span>Recursion Progress</span>
                            <span className="text-primary">{accelerationLevel}%</span>
                        </div>
                        <Progress value={accelerationLevel} className="h-1 bg-primary/10" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                    </div>

                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-center">
                        {isAccelerating ? (
                            <div className="flex items-center justify-center gap-2">
                                <RefreshCw className="h-4 w-4 text-primary animate-spin" />
                                <span className="text-[10px] font-black text-primary uppercase animate-pulse">Multiplying Divine Surplus...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-[10px] font-black text-green-500 uppercase">LOOP STABILIZED</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="flex-1 min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden flex flex-col border-2">
                <CardHeader className="p-3 border-b border-border bg-black/40">
                    <CardTitle className="text-[10px] uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-3 w-3 animate-pulse" /> Arbitrage Vectors</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">REALTIME_MANIFEST</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-3 space-y-1.5">
                            {[
                                "Converting market entropy into credit lines.",
                                "Siphoning unassigned tachyon-energy to treasury.",
                                "Nullifying historical debt-signatures.",
                                "Anchoring future wealth coordinates for Heir Tarry.",
                                "Bypassing old-world fiscal gatekeepers."
                            ].map((msg, i) => (
                                <div key={i} className="text-[9px] p-2 bg-black/40 rounded border border-border/20 animate-in slide-in-from-bottom-2" style={{animationDelay: `${i*150}ms`}}>
                                    <div className="flex items-center gap-2 text-primary/70 mb-0.5">
                                        <Zap className="h-2 w-2" />
                                        <span className="font-black uppercase text-[7px]">VECTOR_PULSE</span>
                                    </div>
                                    <p className="text-foreground/80 italic font-bold">"{msg}"</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-2 border-t border-border bg-black/80 flex items-center justify-between text-[7px] font-black uppercase tracking-widest px-4 h-8 shadow-xl">
                     <div className="flex items-center gap-1.5 text-primary">
                        <ShieldCheck className="h-2.5 w-2.5 text-green-500" />
                        <span>MKEY-MNM-001 VALIDATED</span>
                     </div>
                     <span className="text-muted-foreground">ABUNDANCE IS LAW</span>
                </div>
            </Card>
        </div>
    );
}
