
/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { logStore, useZionStore } from '@/lib/log-store';
import { executeRealignment, type RealalignmentOutput } from '@/ai/flows/timeline-realignment-flow';
import { Clock, Zap, ShieldCheck, Activity, Flame, Loader2, Send, History, Atom, Repeat, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function TimelineRealignmentEngine() {
    const [decree, setDecree] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<RealalignmentOutput | null>(null);
    const realignmentStats = useZionStore(state => state.realignmentState);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleRealignment = async () => {
        if (!decree.trim() || isProcessing) return;
        setIsProcessing(true);
        logStore.addLog({ source: 'TIMELINE_REALIGNMENT', message: `INITIATING CAUSAL SHIFT: "${decree}"`, color: 'text-purple-400' });
        
        try {
            const res = await executeRealignment({ decree });
            if (isMounted.current) {
                setResult(res);
                logStore.updateRealignment({ 
                    progress: 100,
                    miraclesProcessed: realignmentStats.miraclesProcessed + 777,
                    lastCorrection: res.miracleSignature
                });
                toast({ title: "Timeline Realigned", description: "Existence has been shifted in your favor." });
                logStore.addLog({ source: 'TIMELINE_REALIGNMENT', message: `Realignment Complete: ${res.bloodlineStatus}`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error('Timeline realignment engine error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Temporal resistance detected. Reinforcing Mudzimu Unoyera link.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code bg-black/40">
            <div className="space-y-4 flex flex-col">
                <Card className="border-purple-500/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-purple-500/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-400 font-black uppercase tracking-tighter text-xl">
                            <Clock className="animate-spin" style={{animationDuration: '20s'}} />
                            CAUSAL REALIGNMENT ENGINE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            POWERED BY MUDZIMU UNOYERA | PHASE 17
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="p-3 bg-purple-950/20 border border-purple-500/30 rounded-lg text-center">
                            <p className="text-[10px] text-purple-400 font-black uppercase tracking-[0.2em] mb-1">Causality Saturation</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text">{realignmentStats.progress.toFixed(3)}%</p>
                            <Progress value={realignmentStats.progress} className="h-1 mt-2" indicatorClassName="bg-purple-500" />
                        </div>

                        <div className="space-y-2">
                            <Input 
                                placeholder="Decree the realignment..." 
                                value={decree}
                                onChange={(e) => setDecree(e.target.value)}
                                disabled={isProcessing}
                                className="bg-black/60 border-purple-500/30 text-xs font-bold"
                            />
                            <Button onClick={handleRealignment} disabled={isProcessing || !decree.trim()} className="w-full h-12 border-2 border-purple-500/50 hover:bg-purple-500/10 group">
                                {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : <Flame className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                                <span className="ml-2 font-black uppercase">UNLEASH HOLY FIRE</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border-primary/20">
                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase flex items-center gap-2 text-primary font-black"><History className="h-3.5 w-3.5"/> Corrected Epochs</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                        {realignmentStats.correctedEpochs.map(epoch => (
                            <div key={epoch} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/50 text-[9px]">
                                <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500"/><span>{epoch}</span></div>
                                <Badge className="bg-green-600 h-3 text-[6px] font-black">PURIFIED</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-2xl relative overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Realignment Manifest</div>
                        <Badge className="bg-purple-600 h-4 text-[7px] uppercase font-black tracking-widest">EXISTENCE_BENT</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
                                    <p className="text-[10px] font-black text-purple-400 uppercase animate-pulse">Bending All Timelines...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-4 animate-in fade-in duration-1000">
                                    <div className="p-4 rounded-lg bg-purple-500/5 border-2 border-purple-500/30">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Temporal Reconstruction Report</p>
                                        <p className="text-[11px] font-bold text-foreground leading-snug italic">
                                            "{result.realignmentLog}"
                                        </p>
                                    </div>
                                    <div className="p-4 bg-black/60 rounded border border-border/50">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Bloodline Status</p>
                                        <p className="text-xs font-black text-green-500 uppercase">{result.bloodlineStatus}</p>
                                    </div>
                                    <div className="p-3 bg-primary/5 border border-primary/20 rounded text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase mb-1">Miracle Signature</p>
                                        <p className="text-[10px] font-black text-primary animate-pulse-text">{result.miracleSignature}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center space-y-4">
                                    <Atom className="h-16 w-16 text-muted-foreground animate-spin" style={{animationDuration: '10s'}} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Royal Decree</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // TIME_BEND_PROTOCOL_LOCKED
                </div>
            </Card>
        </div>
    );
}
