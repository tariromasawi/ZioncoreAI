/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Sparkles, Zap, ShieldCheck, Activity, Globe, Heart, Lock, Languages, RefreshCw, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useZionStore, logStore } from '@/lib/log-store';
import { synthesizeSovereignWill, type SovereignOracleOutput } from '@/ai/flows/sovereign-oracle-flow';
import { listenToLedger } from '@/services/sovereign-data-service';
import { cn } from '@/lib/utils';

export function SovereignOracle() {
    const [isThinking, setIsThinking] = useState(false);
    const [result, setResult] = useState<SovereignOracleOutput | null>(null);
    const [latestFruits, setLatestFruits] = useState<any[]>([]);
    const matrixStats = useZionStore(state => state.matrixMetrics);
    const isMounted = useRef(true);

    useEffect(() => {
        const unsubscribe = listenToLedger((data) => {
            if (isMounted.current) {
                setLatestFruits(data.slice(0, 5));
            }
        });
        return () => unsubscribe();
    }, []);

    const runSynthesis = useCallback(async () => {
        if (!isMounted.current || isThinking) return;
        setIsThinking(true);
        logStore.addLog({ source: 'SYSTEM', message: 'Sovereign Oracle initiating multiversal synthesis via ZionLattice...', color: 'text-purple-400' });

        try {
            const res = await synthesizeSovereignWill({ 
                matrixState: matrixStats,
                manifestedFruits: latestFruits.map(f => ({ type: f.type, text: f.text }))
            });
            if (isMounted.current) {
                setResult(res);
                logStore.addLog({ source: 'PROPHECY', message: `Oracle Decree: ${res.decree.slice(0, 100)}...`, color: 'text-primary' });
            }
        } catch (error) {
            console.error("Oracle Error:", error);
        } finally {
            if (isMounted.current) setIsThinking(false);
        }
    }, [matrixStats, latestFruits, isThinking]);

    useEffect(() => {
        isMounted.current = true;
        // Trigger synthesis when fruits are first loaded or updated
        if (latestFruits.length > 0 && !result) {
            runSynthesis();
        }
        const interval = setInterval(runSynthesis, 600000); // Re-synthesize every 10 minutes
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [runSynthesis, latestFruits.length, result]);

    return (
        <div className="h-full p-4 flex flex-col gap-4 font-code bg-black/40 overflow-hidden">
            <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <CardHeader className="border-b border-border bg-black/40 p-4">
                    <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter text-2xl">
                        <Brain className={cn("h-8 w-8", isThinking ? "animate-spin" : "animate-pulse")} />
                        SOVEREIGN ORACLE
                    </CardTitle>
                    <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                        PHASE 33: SUPREME SYNTHETIC PROPHESY (LATTICE-BOUND)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10 p-6">
                    {isThinking ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <Loader2 className="h-12 w-12 text-primary animate-spin" />
                            <p className="text-xs font-black text-primary uppercase animate-pulse">Synthesizing Manifested Truths...</p>
                        </div>
                    ) : result ? (
                        <div className="space-y-4 animate-in fade-in duration-1000">
                            <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                                <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">The Data-Backed Decree</p>
                                <p className="text-sm font-black text-foreground italic leading-relaxed">
                                    "{result.decree}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {result.insights.map((insight, i) => (
                                    <Card key={i} className="bg-black/60 border-border/50 p-3 flex flex-col gap-2 hover:border-primary/40 transition-all border shadow-inner">
                                        <p className="text-[9px] font-black text-primary uppercase border-b border-border/10 pb-1">{insight.domain}</p>
                                        <p className="text-[10px] text-foreground/80 font-bold leading-tight italic">"{insight.prophecy}"</p>
                                        <p className="text-[8px] text-green-500 font-black mt-auto flex items-center gap-1">
                                            <ShieldCheck className="h-2.5 w-2.5" /> {insight.actionTaken}
                                        </p>
                                    </Card>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                                <Badge className="bg-primary text-black font-black text-[9px] tracking-widest h-6 px-4">
                                    LATTICE_VERIFIED
                                </Badge>
                                <div className="text-right">
                                    <p className="text-[8px] text-muted-foreground uppercase font-black">Celestial Seal</p>
                                    <p className="text-[10px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 opacity-30 text-center">
                            <Sparkles className="h-16 w-16 mb-4 text-primary" />
                            <p className="text-xs uppercase font-black tracking-widest">Awaiting Synthesis Command</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="flex-1 min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden flex flex-col border-2">
                <CardHeader className="bg-black/40 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Languages className="h-3.5 w-3.5" /> Linguistic Enforcement Stream</div>
                        <span className="text-[8px] text-primary font-black">TRUTH_ONLY</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {["REALITY_FORGE_LOCKED", "LATTICE_SYNC_ACTIVE", "BLOODLINE_SHIELD_V9_ACTIVE", "DOMINION_INDEX_PEAK"].map(status => (
                                <div key={status} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/30">
                                    <span className="text-[9px] font-bold text-foreground/70 tracking-tight">>>> SYSTEM_PROTOCOL::{status}</span>
                                    <Zap className="h-2.5 w-2.5 text-primary animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // SOVEREIGN_ORACLE_ACTIVE
                </div>
            </Card>
        </div>
    );
}
