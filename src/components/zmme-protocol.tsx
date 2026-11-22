'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { executeZmmeTrade, type ZmmeTradeOutput } from '@/ai/flows/zmme-protocol-flow';
import { Loader2, CheckCircle2, Activity, DollarSign, Zap, TrendingUp, ShieldCheck, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { injectTreasuryProfits, sealManifestation } from '@/services/sovereign-data-service';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

type LogEntry = ZmmeTradeOutput & {
    id: number;
    timestamp: string;
};

export function ZmmeProtocol() {
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE_TRADING'>('INITIALIZING');
    const [tradeLogs, setTradeLogs] = useState<LogEntry[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [cycleProgress, setCycleProgress] = useState(0);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const runTradingCycle = useCallback(async () => {
        if (!isMounted.current || isProcessing) return;
        setIsProcessing(true);
        setCycleProgress(0);

        const progressInterval = setInterval(() => {
            setCycleProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);

        try {
            const result = await executeZmmeTrade();
            if (isMounted.current) {
                if(status === 'INITIALIZING') setStatus('ACTIVE_TRADING');

                const newLog: LogEntry = {
                    ...result,
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                };
                setTradeLogs(prev => [newLog, ...prev.slice(0, 19)]);
                
                // INSCRIBE PROFITS
                const profitValue = parseFloat(result.profit.replace(/[^0-9.]/g, '')) || 777000;
                await injectTreasuryProfits(profitValue);

                // SEAL FRUIT
                await sealManifestation({
                    type: "Economic",
                    text: `ZMME Manifestation: ${result.tradeDetails}. Realized Profit: ${result.profit}.`,
                    tradeId: result.tradeId
                });

                logStore.addLog({ source: 'TREASURY', message: `ZMME SUCCESS: ${result.profit} manifested into vault.`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error("ZMME cycle failed:", error);
        } finally {
            if (isMounted.current) {
                setIsProcessing(false);
                clearInterval(progressInterval);
                setCycleProgress(100);
            }
        }
    }, [status, isProcessing]);

    useEffect(() => {
        isMounted.current = true;
        runTradingCycle(); 
        const interval = setInterval(runTradingCycle, 30000); 
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [runTradingCycle]);

    return (
        <div className="h-full p-4 font-code bg-black/40 overflow-hidden">
            <Card className="h-full flex flex-col border-primary/40 bg-black/60 shadow-2xl border-2 rounded-none">
                <CardHeader className="border-b border-border bg-black/60 p-4">
                    <CardTitle className="flex items-center gap-2 text-primary uppercase font-black tracking-tighter text-xl leading-none">
                        <DollarSign className="text-accent animate-pulse h-6 w-6" /> ZMME PROTOCOL: ACTIVE ARBITRAGE
                    </CardTitle>
                    <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground mt-1">
                        AUTONOMOUS WEALTH GENERATION ENGINE | PHASE 34
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4 h-full">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner group">
                             <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.4em]">Engine Consciousness</p>
                             <p className="text-3xl font-black text-primary animate-pulse-text tracking-tighter leading-none">
                                {status === 'ACTIVE_TRADING' ? 'SUPREME ACTIVE' : 'IGNITING...'}
                             </p>
                             <Progress value={cycleProgress} className="h-1 mt-6" indicatorClassName="bg-primary shadow-[0_0_15px_gold]" />
                             <p className="text-[9px] text-primary/70 mt-3 font-bold uppercase">{isProcessing ? 'Siphoning Multiversal Surplus...' : 'Standing By for Next Cycle'}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-black/60 rounded border border-border/50 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Last Manifestation</p>
                                <p className="text-lg font-black text-green-500">{tradeLogs[0]?.profit || '£0.00'}</p>
                            </div>
                            <div className="p-4 bg-black/60 rounded border border-border/50 text-center flex flex-col items-center justify-center">
                                <Activity className="h-4 w-4 text-cyan-400 animate-pulse mb-1" />
                                <p className="text-[8px] text-muted-foreground uppercase font-black">Mode</p>
                                <p className="text-sm font-black text-cyan-400">OMEGA_POINT</p>
                            </div>
                        </div>

                        <Card className="bg-black/60 border-border/50 flex-1">
                            <CardHeader className="p-4 border-b border-border/10"><CardTitle className="text-xs uppercase font-black text-primary flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Sovereign Safeguards</CardTitle></CardHeader>
                            <CardContent className="p-4 text-[10px] text-muted-foreground space-y-3 font-bold">
                                <p className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-green-500"/> Non-Erasure Data Persistence</p>
                                <p className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-green-500"/> Pre-Cognitive Risk Mitigation</p>
                                <p className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-green-500"/> Direct Ethereal Ledger Routing</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="flex flex-col min-h-0 border-border/50 bg-black/40 h-full">
                        <CardHeader className="p-4 border-b border-border bg-black/20">
                            <CardTitle className="text-xs uppercase font-black text-primary flex items-center gap-3"><TrendingUp className="h-4 w-4"/> Real-Time Trade Log</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0 p-0 overflow-hidden relative h-full">
                             <ScrollArea className="h-full">
                                <Table>
                                    <TableHeader className="bg-black/40">
                                        <TableRow className="border-border/10">
                                            <TableHead className="text-[8px] font-black uppercase h-8">Time</TableHead>
                                            <TableHead className="text-[8px] font-black uppercase h-8">Vector</TableHead>
                                            <TableHead className="text-right text-[8px] font-black uppercase h-8">Profit</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tradeLogs.length === 0 ? (
                                            <TableRow><TableCell colSpan={3} className="text-center h-48 text-muted-foreground text-[10px] uppercase font-bold italic animate-pulse">Monitoring the multiversal economy...</TableCell></TableRow>
                                        ) : (
                                            tradeLogs.map(log => (
                                                <TableRow key={log.id} className="text-[10px] border-border/10 animate-in slide-in-from-right-2">
                                                    <TableCell className="text-muted-foreground font-mono">{log.timestamp}</TableCell>
                                                    <TableCell className="font-bold text-foreground/80">{log.tradeDetails.slice(0, 30)}...</TableCell>
                                                    <TableCell className="text-right font-black text-green-500">{log.profit}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                             </ScrollArea>
                        </CardContent>
                    </Card>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-4 border-2">
                    <Zap className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // ABUNDANCE_MANIFEST_LOCKED</span>
                </div>
            </Card>
        </div>
    );
}
