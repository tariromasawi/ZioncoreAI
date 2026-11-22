
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
import { logStore } from '@/lib/log-store';
import { manifestBloodlineFavor, type FavorOutput } from '@/ai/flows/bloodline-favor-flow';
import { Sparkles, Zap, ShieldCheck, Activity, Flame, Loader2, Send, Heart, TrendingUp, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function BloodlineFavorEngine() {
    const [intent, setIntent] = useState('');
    const [target, setTarget] = useState('HRH Saint Tariro Masawi');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<FavorOutput | null>(null);
    const [favorUnits, setFavorUnits] = useState(777000);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleManifestFavor = async () => {
        if (!intent.trim() || isProcessing) return;
        setIsProcessing(true);
        logStore.addLog({ source: 'COMMAND', message: `Enforcing Favor for ${target}: "${intent}"`, color: 'text-yellow-400' });
        
        try {
            const res = await manifestBloodlineFavor({ targetName: target, intent });
            if (isMounted.current) {
                setResult(res);
                setFavorUnits(prev => prev + 144);
                toast({ title: "Favor Anchored", description: `measurable fruits delivered to ${target}.` });
                logStore.addLog({ source: 'MANIFESTATION', message: `FAVOR MANIFEST: ${res.manifestationReport}`, color: 'text-green-500' });
                setIntent('');
            }
        } catch (error) {
            console.error('Bloodline favor engine error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Favor Flux detected. Re-calibrating the Blessing Kernel.', color: 'text-destructive' });
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
                            <Star className="animate-pulse h-6 w-6" />
                            BLOODLINE FAVOR ENGINE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE 28: SUPREME FRUIT MANIFESTATION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Manifested Favor Units</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text">{favorUnits.toLocaleString()} / ♾️</p>
                        </div>

                        <div className="space-y-3">
                             <div className="space-y-1">
                                <label className="text-[9px] font-black text-muted-foreground uppercase">Target Node</label>
                                <Input 
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    disabled={isProcessing}
                                    className="bg-black/60 border-primary/30 text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-muted-foreground uppercase">Intent of Favor</label>
                                <Input 
                                    placeholder="State intent for favor..." 
                                    value={intent}
                                    onChange={(e) => setIntent(e.target.value)}
                                    disabled={isProcessing}
                                    className="bg-black/60 border-primary/30 text-xs font-bold"
                                />
                            </div>
                            <Button onClick={handleManifestFavor} disabled={isProcessing || !intent.trim()} className="w-full h-12 border-2 border-primary/50 hover:bg-primary/10 group">
                                {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : <Zap className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                                <span className="ml-2 font-black uppercase tracking-widest">ENFORCE FAVOR</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border-green-500/20">
                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase flex items-center gap-2 text-green-500 font-black"><TrendingUp className="h-3.5 w-3.5"/> Favor Velocity</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                         <div className="flex items-center justify-between text-[9px] font-bold">
                            <span className="text-muted-foreground uppercase">Causal Shift Rate</span>
                            <span className="text-green-500 font-black">EXPONENTIAL</span>
                         </div>
                         <Progress value={100} className="h-1 mt-2" indicatorClassName="bg-green-500 shadow-[0_0_10px_green]" />
                    </CardContent>
                </Card>
            </div>

            <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-2xl relative overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-orange-500 animate-pulse" /> Favor Manifest</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black tracking-widest">FRUITS_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-[10px] font-black text-primary uppercase animate-pulse">Rewriting Probabilities...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-4 animate-in fade-in duration-1000">
                                    <div className="p-4 rounded-lg bg-primary/5 border-2 border-primary/30">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Manifestation Report</p>
                                        <p className="text-[11px] font-bold text-foreground leading-snug italic">
                                            "{result.manifestationReport}"
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[7px] text-muted-foreground uppercase font-black mb-1">Velocity</p>
                                            <p className="text-[10px] text-primary font-black">{result.favorVelocity}</p>
                                        </div>
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[7px] text-muted-foreground uppercase font-black mb-1">Shield Integrity</p>
                                            <p className="text-[10px] text-green-500 font-black">{result.shieldIntegrity}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-primary/5 border border-primary/20 rounded text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase mb-1">Covenant Key</p>
                                        <p className="text-[10px] font-black text-primary animate-pulse-text">{result.miracleCode}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center space-y-4">
                                    <Sparkles className="h-16 w-16 text-muted-foreground" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Royal Command</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // FAVOR_LOCKED
                </div>
            </Card>
        </div>
    );
}
