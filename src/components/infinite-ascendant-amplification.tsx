'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
    TrendingUp, Zap, Sparkles, Loader2, CheckCircle2, 
    Globe, Atom, Crown, Activity, ShieldCheck, ArrowUpRight,
    Star, Flame, Layers, Network, BrainCircuit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeAscendantAmplification } from '@/ai/flows/ascendant-amplification-flow';
import { cn } from '@/lib/utils';

const AMPLIFICATION_DOMAINS = [
    { id: 'Economic', name: "Multiversal Wealth", icon: TrendingUp, color: "text-green-500" },
    { id: 'Spiritual', name: "Sacred Authority", icon: Flame, color: "text-red-500" },
    { id: 'Digital', name: "Matrix Occupation", icon: Globe, color: "text-primary" },
    { id: 'Biological', name: "Immortal Vitality", icon: Activity, color: "text-rose-500" },
    { id: 'Technological', name: "Sovereign Innovation", icon: Zap, color: "text-yellow-400" }
];

export function InfiniteAscendantAmplification() {
    const [activeDomain, setActiveDomain] = useState<any>(AMPLIFICATION_DOMAINS[0]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [globalMastery, setGlobalMastery] = useState(82.026);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleAmplify = async (domain: any) => {
        setIsProcessing(true);
        setActiveDomain(domain);
        setReport(null);
        logStore.addLog({ source: 'ELEVATION', message: `IGNITING ASCENDANT AMPLIFICATION: ${domain.name}...`, color: 'text-primary' });

        try {
            const res = await executeAscendantAmplification({ domain: domain.name, intensity: 100 });
            if (isMounted.current) {
                setReport(res);
                setGlobalMastery(prev => Math.min(100, prev + 0.144));
                toast({ title: "Mastery Multiplied", description: `${domain.name} power is now ${res.multiplier}.` });
                logStore.addLog({ source: 'MANIFESTATION', message: `AMPLIFICATION SUCCESS: Domain saturation at ${res.domainSaturation}%.`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => {
            if (isMounted.current && !isProcessing) {
                setGlobalMastery(prev => Math.min(100, prev + 0.000001));
            }
        }, 8000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [isProcessing]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Star className="text-accent animate-spin" style={{animationDuration: '10s'}} />
                            ASCENDANT FORGE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE 23: INFINITE AMPLIFICATION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Omniversal Mastery Level</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{globalMastery.toFixed(6)}%</p>
                            <Progress value={globalMastery} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            {AMPLIFICATION_DOMAINS.map(domain => (
                                <Button 
                                    key={domain.id} 
                                    variant="outline" 
                                    className={cn(
                                        "h-12 justify-start gap-3 border-primary/20 hover:border-primary transition-all",
                                        activeDomain.id === domain.id && "bg-primary/10 border-primary border-2 shadow-inner"
                                    )}
                                    onClick={() => handleAmplify(domain)}
                                    disabled={isProcessing}
                                >
                                    <domain.icon className={cn("h-4 w-4", domain.color)} />
                                    <span className="text-[10px] font-black uppercase">{domain.name}</span>
                                    <ArrowUpRight className="ml-auto h-3 w-3 opacity-30" />
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/60 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <BrainCircuit className="h-3.5 w-3.5 text-accent" /> Growth Algorithm
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your power is no longer linear. Every act of dominion from ZionCore triggers a recursive multiplication, siphoning unassigned tachyon-energy to fuel the bloodline's ascendant influence."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Amplification Feed</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black shadow-lg">ASCENDING</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                                    <div className="text-center space-y-2">
                                        <p className="text-xs font-black text-primary uppercase animate-pulse">Expanding Dominion Coordinates...</p>
                                        <p className="text-[9px] text-muted-foreground uppercase font-bold">MULTIPLICATION IN PROGRESS: ♾️%</p>
                                    </div>
                                </div>
                            ) : report ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_60px_rgba(255,215,0,0.1)]">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.4em]">Multiplication Report</p>
                                        <p className="text-lg font-black text-foreground leading-relaxed italic">
                                            "{report.amplificationReport}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-black/80 border border-primary/20 rounded-lg text-center">
                                            <p className="text-[9px] font-black text-primary uppercase mb-2">Power Multiplier</p>
                                            <p className="text-2xl font-black text-primary animate-pulse">{report.multiplier}</p>
                                        </div>
                                        <div className="p-4 bg-black/80 border border-primary/20 rounded-lg text-center">
                                             <p className="text-[9px] font-black text-accent uppercase mb-2">Domain Saturation</p>
                                             <p className="text-2xl font-black text-accent">{report.domainSaturation}%</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.5em] mb-2">Covenant Ascendancy Seal</p>
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{report.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-30 text-center space-y-4">
                                    <Atom className="h-24 w-24 text-muted-foreground animate-spin" style={{animationDuration: '15s'}} />
                                    <p className="text-xs font-black uppercase tracking-[0.4em]">Select a Domain for Amplification</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-12 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-green-500" /> LEGACY_SECURE</div>
                    <div className="flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}}/> PERSISTENCE_ACTIVE</div>
                    <div className="flex items-center gap-2"><Crown className="h-3.5 w-3.5 text-yellow-400 animate-pulse" /> MASAWI_SOVEREIGNTY</div>
                </div>
            </Card>
        </div>
    );
}
