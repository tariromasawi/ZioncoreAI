'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeCausalTransformation, type CausalTransformationOutput } from '@/ai/flows/causal-transformation-flow';
import { sealManifestation } from '@/services/sovereign-data-service';
import { 
    Clock, Zap, ShieldCheck, HeartPulse, Loader2, Sparkles, 
    RefreshCw, Activity, Flame
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function CausalTransformationEngine() {
    const [decree, setDecree] = useState('Restore all departed kin to full immortal existence and prune negative echoes.');
    const [isTransforming, setIsTransforming] = useState(false);
    const [result, setResult] = useState<CausalTransformationOutput | null>(null);
    const [bendIntensity, setBendIntensity] = useState(0);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleExecuteTransformation = async () => {
        if (!decree.trim() || isTransforming) return;
        setIsTransforming(true);
        setBendIntensity(0);
        setResult(null);
        logStore.addLog({ source: 'COMMAND', message: `BENDING TIME: "${decree}"`, color: 'text-purple-400' });

        const intensityInterval = setInterval(() => {
            setBendIntensity(prev => {
                if (prev >= 100) {
                    clearInterval(intensityInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        try {
            const res = await executeCausalTransformation({ decree });
            if (isMounted.current) {
                setResult(res);
                
                // ANCHOR TO LATTICE
                await sealManifestation({
                    type: "Causal",
                    text: `Causal Transformation Manifested: ${res.timeBendReport}`,
                    status: res.vitalityInfusionStatus,
                    decree
                });

                toast({ title: "Reality Restructured", description: "Causal shifts anchored in ZionLattice." });
                logStore.addLog({ source: 'CAUSAL_FORGE', message: `SUCCESS: ${res.vitalityInfusionStatus}`, color: 'text-green-500' });
                setDecree('');
            }
        } catch (error) {
            console.error('Causal transformation engine error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Temporal Paradox detected. Re-calibrating the Time-Bend Kernel.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) {
                setIsTransforming(false);
                clearInterval(intensityInterval);
                setBendIntensity(100);
            }
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2 rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border bg-black/40">
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Clock className="animate-spin h-6 w-6 text-accent" style={{animationDuration: '10s'}} />
                            CAUSAL ENGINE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            REAL-TIME TIME-BENDING | EVERLASTING LIFE
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                                <span className="text-muted-foreground">Time-Bend Intensity</span>
                                <span className="text-primary">{bendIntensity}%</span>
                            </div>
                            <Progress value={bendIntensity} className="h-1" indicatorClassName="bg-primary shadow-[0_0_15px_gold]" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-primary/70 tracking-widest">Divine Decree</label>
                            <Textarea 
                                placeholder="State the reality to bend..." 
                                value={decree}
                                onChange={(e) => setDecree(e.target.value)}
                                disabled={isTransforming}
                                className="bg-black/60 border-primary/30 text-xs font-bold min-h-[120px] focus:border-primary transition-all"
                            />
                        </div>

                        <Button 
                            onClick={handleExecuteTransformation} 
                            disabled={!decree.trim() || isTransforming}
                            className="w-full h-14 border-2 border-primary/50 group shadow-[0_0_30px_rgba(255,215,0,0.2)]"
                        >
                            {isTransforming ? <Loader2 className="animate-spin h-6 w-6" /> : <RefreshCw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-1000" />}
                            <span className="ml-3 font-black uppercase tracking-tighter text-lg">IGNITE TIME-BEND</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-2xl relative overflow-hidden border-2 rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> CAUSAL MANIFEST</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">REALITY_SHIFTED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6 pb-32">
                            {isTransforming ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                                    <p className="text-xs font-black text-primary uppercase animate-pulse">Bending All Timelines...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30 text-center">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.4em]">Temporal Reconstruction Report</p>
                                        <p className="text-[11px] font-bold text-foreground leading-relaxed italic uppercase">
                                            "{result.timeBendReport}"
                                        </p>
                                    </div>
                                    <div className="p-4 bg-black/60 rounded border border-border/50">
                                        <p className="text-[8px] text-green-500 font-black uppercase mb-1 flex items-center gap-2">
                                            <HeartPulse className="h-3 w-3" /> Life-Force Infusion
                                        </p>
                                        <p className="text-xs font-black text-foreground uppercase tracking-tight leading-snug">
                                            {result.vitalityInfusionStatus}
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.5em] mb-2">Divine Authentication Seal</p>
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[400px] opacity-30 text-center space-y-4">
                                    <Activity className="h-24 w-24 text-muted-foreground animate-pulse" />
                                    <p className="text-xs font-black uppercase tracking-[0.4em]">Awaiting Causal Command</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-3 absolute bottom-0 w-full z-20">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // TIME_BEND_PROTOCOL_LOCKED</span>
                </div>
            </Card>
        </div>
    );
}
