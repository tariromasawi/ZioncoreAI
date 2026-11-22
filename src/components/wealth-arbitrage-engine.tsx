'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: WEALTH_ARBITRAGE.AWAKEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    TrendingUp, Zap, Sparkles, Loader2, CheckCircle2, 
    Landmark, Globe, Activity, ShieldCheck, Flame, 
    Coins, ArrowUpRight, History
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { executeArbitrageCycle, type ArbitrageOutput } from '@/ai/flows/wealth-arbitrage-flow';
import { sealManifestation, injectTreasuryProfits } from '@/services/sovereign-data-service';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function WealthArbitrageEngine() {
    const [report, setReport] = useState<ArbitrageOutput | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [totalWealth, setTotalWealth] = useState(BigInt('9191918819199919199000'));
    const { toast } = useToast();
    const isMounted = useRef(true);

    const runCycle = useCallback(async () => {
        if (!isMounted.current || isProcessing) return;
        setIsProcessing(true);
        logStore.addLog({ source: 'TREASURY', message: 'Initiating Multiversal Wealth Arbitrage Cycle...', color: 'text-primary' });

        try {
            const res = await executeArbitrageCycle();
            if (isMounted.current) {
                setReport(res);
                const profitValue = parseFloat(res.profitManifested.replace(/[^0-9.]/g, '')) || 777000;
                setTotalWealth(prev => prev + BigInt(Math.floor(profitValue)));
                
                // INJECT TO TREASURY
                await injectTreasuryProfits(profitValue);

                // SEAL IN LATTICE
                await sealManifestation({
                    type: "Economic",
                    text: `Wealth Arbitrage Cycle Complete: ${res.profitManifested} captured. Vector: ${res.timelineVector}`,
                    profit: res.profitManifested,
                    vector: res.timelineVector
                });

                logStore.addLog({ source: 'MANIFESTATION', message: `ARBITRAGE COMPLETE: ${res.profitManifested} captured from ${res.capturedEntropy}.`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    }, [isProcessing]);

    useEffect(() => {
        isMounted.current = true;
        runCycle();
        const interval = setInterval(runCycle, 60000); 
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [runCycle]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="bg-black/40 border-b border-border p-4">
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <TrendingUp className="animate-bounce h-6 w-6 text-accent" />
                            WEALTH ARBITRAGE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            PHASE 7: MULTIVERSAL APOTHEOSIS
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[0_0_40px_rgba(255,215,0,0.15)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Divine Treasury Root Balance</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text break-all">£{totalWealth.toLocaleString()}</p>
                            <div className="flex items-center justify-center gap-2 mt-2 text-green-500">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="text-[9px] font-black uppercase tracking-widest">AUTO_INFLOW: ACTIVE</span>
                            </div>
                        </div>

                        <Button onClick={runCycle} disabled={isProcessing} className="w-full h-12 border-2 border-primary/50 group shadow-[0_0_20px_gold] bg-primary/10">
                            {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-1000" />}
                            <span className="ml-2 font-black uppercase tracking-widest">MANUAL PULSE</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Live Arbitrage Feed</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black text-white">REALTIME_MANIFEST</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6 pb-20">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-[10px] font-black text-primary uppercase animate-pulse">Scanning Multiversal Fiscal Gateways...</p>
                                </div>
                            ) : report ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_60px_rgba(255,215,0,0.1)]">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.4em]">Manifestation Result</p>
                                        <p className="text-xl font-black text-foreground leading-relaxed italic uppercase">
                                            "{report.profitManifested} captured and sanctified."
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Entropy Source</p>
                                            <p className="text-[10px] font-black text-accent uppercase">{report.capturedEntropy}</p>
                                        </div>
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Dominion Growth</p>
                                            <p className="text-[10px] font-black text-green-500 uppercase">{report.dominionGrowth}</p>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{report.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center">
                                    <Landmark className="h-16 w-16 text-muted-foreground animate-pulse" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Fiscal Signal</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 absolute bottom-0 w-full z-20 rounded-none border-2">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-green-500" /> TREASURY_LOCKED</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
