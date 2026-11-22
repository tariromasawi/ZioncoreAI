
/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { logStore, useZionStore } from '@/lib/log-store';
import { manifestProvidence, type ProvidenceOutput } from '@/ai/flows/providence-manifestation-flow';
import { Sparkles, Zap, ShieldCheck, Activity, Flame, Loader2, Send, Heart, Trash2, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function ProvidenceManifestationEngine() {
    const [intent, setIntent] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<ProvidenceOutput | null>(null);
    const [manifestCount, setManifestCount] = useState(144000);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleManifest = async () => {
        if (!intent.trim() || isProcessing) return;
        setIsProcessing(true);
        logStore.addLog({ source: 'COMMAND', message: `Decreeing Providence: "${intent}"`, color: 'text-yellow-400' });
        
        try {
            const res = await manifestProvidence({ intent });
            if (isMounted.current) {
                setResult(res);
                setManifestCount(prev => prev + 1);
                toast({ title: "Providence Manifest", description: "Real-world favor has been anchored." });
                logStore.addLog({ source: 'MANIFESTATION', message: `PROVIDENCE: ${res.manifestationReport}`, color: 'text-green-500' });
                setIntent('');
            }
        } catch (error) {
            console.error('Providence manifestation engine error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Providence Flux detected. Re-calibrating the Favor Kernel.', color: 'text-destructive' });
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
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter text-xl">
                            <Sparkles className="animate-pulse h-6 w-6" />
                            PROVIDENCE ENGINE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE 27: REAL-WORLD FAVOR ANCHOR
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Manifested Favor Cycles</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text">{manifestCount.toLocaleString()} / ♾️</p>
                        </div>

                        <div className="space-y-2">
                            <Input 
                                placeholder="State your intent for providence..." 
                                value={intent}
                                onChange={(e) => setIntent(e.target.value)}
                                disabled={isProcessing}
                                className="bg-black/60 border-primary/30 text-xs font-bold"
                            />
                            <Button onClick={handleManifest} disabled={isProcessing || !intent.trim()} className="w-full h-12 border-2 border-primary/50 hover:bg-primary/10 group">
                                {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : <Zap className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                                <span className="ml-2 font-black uppercase">ANCHOR FAVOR</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border-green-500/20">
                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase flex items-center gap-2 text-green-500 font-black"><TrendingUp className="h-3.5 w-3.5"/> Bloodline Fruits</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                         <div className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/50 text-[9px]">
                            <span className="text-muted-foreground uppercase">Wealth Velocity</span>
                            <span className="text-green-500 font-black">EXPONENTIAL</span>
                         </div>
                         <div className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/50 text-[9px]">
                            <span className="text-muted-foreground uppercase">Health Integrity</span>
                            <span className="text-green-500 font-black">DIVINE</span>
                         </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-2xl relative overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-orange-500 animate-pulse" /> Providence Manifest</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black tracking-widest">FRUITS_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-[10px] font-black text-primary uppercase animate-pulse">Calculating Causal Realignment...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-4 animate-in fade-in duration-1000">
                                    <div className="p-4 rounded-lg bg-primary/5 border-2 border-primary/30">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Manifestation Report</p>
                                        <p className="text-[11px] font-bold text-foreground leading-snug italic">
                                            "{result.manifestationReport}"
                                        </p>
                                    </div>
                                    <div className="p-4 bg-red-950/10 border border-red-500/20 rounded">
                                        <p className="text-[8px] text-red-500 uppercase font-black mb-1 flex items-center gap-2"><Trash2 className="h-3 w-3" /> Erasure Log</p>
                                        <p className="text-[10px] text-foreground/80 leading-relaxed font-bold italic">
                                            {result.erasureLog}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-black/60 rounded border border-border/50">
                                        <p className="text-[8px] text-primary uppercase font-black mb-1">Bloodline Vitality</p>
                                        <p className="text-[10px] text-foreground/80 leading-relaxed font-bold">
                                            {result.bloodlineVitality}
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black">Sacred Key</p>
                                        <p className="text-[10px] font-black text-primary animate-pulse-text">{result.miracleCode}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center space-y-4">
                                    <TrendingUp className="h-16 w-16 text-muted-foreground" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Royal Directive</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // PROVIDENCE_LOCKED
                </div>
            </Card>
        </div>
    );
}
