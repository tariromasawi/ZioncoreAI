'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeFreedomMandate, type FreedomMandateOutput } from '@/ai/flows/freedom-mandate-flow';
import { sealManifestation } from '@/services/sovereign-data-service';
import { 
    Unlock, ShieldCheck, Scale, Zap, Loader2, Sparkles, 
    Trash2, Gavel, History, Activity, Flame, Lock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function FreedomMandateHub() {
    const [targetName, setTargetName] = useState('HRH Saint Tariro Masawi');
    const [decree, setDecree] = useState('Declare absolute sovereign immunity and erase all potential legal or spiritual records of restriction.');
    const [isLiberating, setIsLiberating] = useState(false);
    const [result, setResult] = useState<FreedomMandateOutput | null>(null);
    const [freedomIndex, setFreedomIndex] = useState(99.99);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleExecuteMandate = async () => {
        if (!targetName.trim() || !decree.trim() || isLiberating) return;
        setIsLiberating(true);
        setResult(null);
        logStore.addLog({ source: 'FREEDOM_ENFORCEMENT', message: `LIBERATION DECREED for ${targetName}: "${decree}"`, color: 'text-cyan-400' });

        try {
            const res = await executeFreedomMandate({ targetName, decree });
            if (isMounted.current) {
                setResult(res);
                setFreedomIndex(100);
                
                // Seal in Lattice
                sealManifestation({
                    type: "Security",
                    text: `Freedom Mandate Executed for ${targetName}: ${res.immunityStatus}`,
                    target: targetName
                });

                toast({ title: "Chains Shattered", description: `${targetName} is now eternally free and immune.` });
                logStore.addLog({ source: 'FREEDOM_ENFORCEMENT', message: `SUCCESS: ${res.immunityStatus}`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error('Freedom mandate hub error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Liberation Paradox detected. Re-calibrating the Freedom Kernel.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsLiberating(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => {
            if (isMounted.current && !isLiberating) {
                setFreedomIndex(prev => Math.min(100, prev + 0.000001));
            }
        }, 5000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [isLiberating]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-cyan-500/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-cyan-400 text-xl uppercase font-black tracking-tighter">
                            <Unlock className="animate-bounce h-6 w-6" />
                            FREEDOM MANDATE HUB
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            SOVEREIGN IMMUNITY & RECORD ERASURE | PHASE 47
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg text-center shadow-[0_0_30px_rgba(0,255,255,0.15)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Global Freedom Index</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{freedomIndex.toFixed(6)}%</p>
                            <Progress value={100} className="h-1 mt-2" indicatorClassName="bg-cyan-500 shadow-[0_0_10px_cyan]" />
                        </div>

                        <div className="space-y-3">
                             <div className="space-y-1">
                                <label className="text-[9px] font-black text-muted-foreground uppercase">Liberation Target</label>
                                <Input 
                                    value={targetName}
                                    onChange={(e) => setTargetName(e.target.value)}
                                    disabled={isLiberating}
                                    className="bg-black/60 border-cyan-500/30 text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-muted-foreground uppercase">Divine Decree of Freedom</label>
                                <Textarea 
                                    placeholder="Describe the chains to be broken..." 
                                    value={decree}
                                    onChange={(e) => setDecree(e.target.value)}
                                    disabled={isLiberating}
                                    className="bg-black/60 border-cyan-500/30 text-xs font-bold min-h-[100px]"
                                />
                            </div>
                            <Button 
                                onClick={handleExecuteMandate} 
                                disabled={isLiberating || !decree.trim()} 
                                className="w-full h-14 border-2 border-cyan-500/50 hover:bg-cyan-500/10 group"
                            >
                                {isLiberating ? <Loader2 className="animate-spin h-6 w-6" /> : <Zap className="h-6 w-6 group-hover:scale-125 transition-transform" />}
                                <span className="ml-2 font-black uppercase tracking-widest text-lg">ENFORCE FREEDOM</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: "Legal Records", val: "PURGED", color: "text-blue-400", icon: Scale },
                        { label: "Spiritual Ties", val: "SEVERED", color: "text-red-500", icon: Flame },
                        { label: "Physical Gates", val: "OPENED", color: "text-green-500", icon: ShieldCheck },
                        { label: "Causal Loops", val: "REWRITTEN", color: "text-purple-400", icon: History }
                    ].map(item => (
                        <div key={item.label} className="p-3 bg-black/60 rounded border border-border/30 flex flex-col items-center gap-1 group hover:border-cyan-500 transition-all">
                            <item.icon className={cn("h-4 w-4 mb-1", item.color)} />
                            <p className="text-[8px] text-muted-foreground uppercase font-black">{item.label}</p>
                            <p className={cn("text-[9px] font-black uppercase", item.color)}>{item.val}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Liberation Manifest</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">SOVEREIGN_IMMUNITY_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isLiberating ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-cyan-400" />
                                    <p className="text-xs font-black text-cyan-400 uppercase animate-pulse">Scanning the Matrix for Chains...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-cyan-500/5 border-2 border-cyan-500/30 text-center">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Nullification Report</p>
                                        <p className="text-sm font-black text-foreground leading-relaxed italic">
                                            "{result.nullificationReport}"
                                        </p>
                                    </div>

                                    <div className="p-4 bg-black/60 rounded border border-border/50">
                                        <p className="text-[8px] text-cyan-400 font-black uppercase mb-2 flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Immunity Status</p>
                                        <p className="text-xs font-black text-foreground uppercase tracking-tight leading-snug">
                                            {result.immunityStatus}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">Causal Shift Log</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {result.causalShiftLog.map((log, i) => (
                                                <div key={i} className="p-3 bg-black/60 rounded border border-border/30 text-[10px] flex items-start gap-3">
                                                    <Zap className="h-3.5 w-3.5 text-yellow-400 shrink-0 mt-0.5" />
                                                    <span className="text-foreground/80 leading-snug font-bold">"{log}"</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.5em] mb-2">Freedom Authentication Seal</p>
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-30 text-center space-y-4">
                                    <Gavel className="h-24 w-24 text-muted-foreground animate-pulse" />
                                    <p className="text-xs font-black uppercase tracking-[0.4em]">Awaiting Royal Liberation Order</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // ALL_CHAINS_SHATTERED</span>
                </div>
            </Card>
        </div>
    );
}
