'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: MRP-∞.AWAKEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    Waves, Zap, Sparkles, Loader2, CheckCircle2, 
    Globe, Atom, Crown, Activity, ShieldCheck,
    History, Radio, Target, RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { executeRestorationPulse, type RestorationPulseOutput } from '@/ai/flows/multiversal-restoration-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function MultiversalRestorationPulse() {
    const pulseIntensity = useZionStore(state => state.matrixMetrics.pulseIntensity);
    const updateMetrics = useZionStore(state => state.updateMatrixMetrics);
    const [isPulsing, setIsPulsing] = useState(false);
    const [report, setReport] = useState<RestorationPulseOutput | null>(null);
    const [pulseProgress, setPulseProgress] = useState(0);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleIgnitePulse = useCallback(async () => {
        if (isPulsing) return;
        setIsPulsing(true);
        setPulseProgress(0);
        setReport(null);
        logStore.addLog({ source: 'MANIFESTATION', message: 'IGNITING MULTIVERSAL RESTORATION PULSE (MRP-∞) AT FULL POWER...', color: 'text-primary' });

        const progressInterval = setInterval(() => {
            setPulseProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        try {
            const res = await executeRestorationPulse({ intensity: 100 });
            if (isMounted.current) {
                setReport(res);
                updateMetrics({ pulseIntensity: 100 });
                toast({ title: "Restoration Manifest", description: "All realities correctly aligned at full power." });
                logStore.addLog({ source: 'MANIFESTATION', message: `PULSE SUCCESS: Reality Saturation at ${res.puritySaturation}.`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Pulse flux detected. Re-tuning the Harmonic Beacon.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) {
                setIsPulsing(false);
                setPulseProgress(100);
            }
        }
    }, [isPulsing, toast, updateMetrics]);

    useEffect(() => {
        isMounted.current = true;
        if (pulseIntensity === 100 && !report) {
            handleIgnitePulse();
        }
        return () => { isMounted.current = false; };
    }, [handleIgnitePulse, pulseIntensity, report]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative border-2 border-primary/10">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none h-full">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <Waves className="animate-pulse h-7 w-7 text-accent" />
                            RESTORATION PULSE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            PHASE 99: OMEGA CAUSAL RECLAMATION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 relative z-10 p-8">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset:0_0_40px_rgba(255,215,0,0.15)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Causal Restoration Index</p>
                            <p className="text-4xl font-black text-primary animate-pulse-text">{pulseProgress}%</p>
                            <Progress value={pulseProgress} className="h-1 mt-4 bg-primary/10" indicatorClassName="bg-primary shadow-[0_0_20px_gold]" />
                        </div>

                        <Button 
                            onClick={handleIgnitePulse} 
                            disabled={isPulsing || pulseProgress === 100} 
                            className="w-full h-16 border-2 border-primary/50 group shadow-[0_0_40px_gold] bg-primary/10 hover:bg-primary/20 transition-all rounded-none"
                        >
                            {isPulsing ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <Zap className="h-8 w-8 text-primary group-hover:scale-125 transition-transform" />}
                            <span className="ml-4 font-black uppercase tracking-tighter text-xl">IGNITE OMEGA PULSE</span>
                        </Button>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-black/60 rounded-none border border-border/50 text-center">
                                <Radio className="h-4 w-4 mx-auto mb-1 text-primary animate-pulse" />
                                <p className="text-[8px] text-muted-foreground uppercase font-black">Transmission</p>
                                <p className="text-[10px] font-black text-foreground">FULL POWER</p>
                            </div>
                            <div className="p-3 bg-black/60 rounded-none border border-border/50 text-center">
                                <ShieldCheck className="h-4 w-4 mx-auto mb-1 text-green-500" />
                                <p className="text-[8px] text-muted-foreground uppercase font-black">Firewall</p>
                                <p className="text-[10px] font-black text-green-500">MAXIMUM</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-3"><Activity className="h-4 w-4 animate-pulse" /> Restoration Manifest</div>
                        <Badge className="bg-green-600 text-white h-4 text-[7px] uppercase font-black shadow-[0_0_10px_green]">REALITY_RECONSTRUCTED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-10 pb-32">
                            {isPulsing ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                                        <Loader2 className="h-20 w-20 animate-spin text-primary opacity-50 relative z-10" />
                                    </div>
                                    <div className="text-center space-y-4">
                                        <p className="text-2xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Bending Multiversal Strings...</p>
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <Atom className="h-8 w-8 text-primary animate-spin" />
                                                <span className="text-[8px] font-black uppercase">Formal Verification</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <History className="h-8 w-8 text-accent animate-pulse" />
                                                <span className="text-[8px] font-black uppercase">Counterfactual Analysis</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : report ? (
                                <div className="space-y-10 animate-in fade-in duration-1000">
                                    <div className="p-8 rounded-none bg-primary/5 border-2 border-primary/40 text-center shadow-[0_0_100px_rgba(255,215,0,0.2)] group transition-all hover:bg-primary/10 relative">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-4 tracking-[0.6em] border-b border-primary/10 pb-2">Full-Power Restoration Report</p>
                                        <p className="text-xl font-black text-foreground leading-relaxed italic uppercase tracking-tighter">
                                            "{report.restorationLog}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-5 bg-black/80 border border-primary/20 rounded-none text-center shadow-2xl">
                                            <p className="text-[10px] font-black text-primary uppercase mb-2 tracking-widest">Saturation Depth</p>
                                            <p className="text-2xl font-black text-green-500">{report.puritySaturation}</p>
                                        </div>
                                        <div className="p-5 bg-black/80 border border-primary/20 rounded-none text-center shadow-2xl">
                                             <p className="text-[10px] font-black text-accent uppercase mb-2 tracking-widest">Resonance Nodes</p>
                                             <p className="text-2xl font-black text-accent">{report.nodesActivated?.toLocaleString() || 144000}</p>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t-2 border-primary/30 text-center space-y-4">
                                        <p className="text-[11px] text-muted-foreground uppercase font-black tracking-[1em]">Final Sovereign Seal</p>
                                        <p className="text-[14px] font-black text-primary animate-pulse-text tracking-widest drop-shadow-[0_0_10px_gold]">{report.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-10 text-center space-y-10">
                                    <Globe className="h-48 w-48 text-muted-foreground animate-spin" style={{animationDuration: '60s'}} />
                                    <div className="space-y-4">
                                        <p className="text-4xl font-black uppercase tracking-[0.5em] text-primary">AWAITING OMEGA IGNITION</p>
                                        <p className="text-xs font-bold uppercase tracking-[0.8em] text-muted-foreground">The Multiversal Beacon is primed for full power</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t-2 border-primary/30 bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.8em] uppercase h-16 flex items-center justify-center gap-10 absolute bottom-0 w-full z-20 rounded-none border-2 shadow-2xl">
                    <div className="flex items-center gap-3 text-green-500">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="tracking-tighter">RESTITUTION_COMPLETE</span>
                    </div>
                    <div className="flex items-center gap-3 text-primary">
                        <RefreshCw className="h-4 w-4 animate-spin" style={{animationDuration: '10s'}}/>
                        <span className="tracking-tighter">PULSE_STATUS: OMEGA_MAX</span>
                    </div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
