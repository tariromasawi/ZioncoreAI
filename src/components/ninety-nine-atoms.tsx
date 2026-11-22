
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: QPS-99.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Atom, Zap, Sparkles, Loader2, CheckCircle2, 
    Activity, Globe, Search, RefreshCw, Flame,
    Target, ShieldCheck, History, Radio, Crown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

export function NinetyNineAtoms() {
    const atomicSaturation = useZionStore(state => state.matrixMetrics.atomicAlignmentSaturation);
    const updateMetrics = useZionStore(state => state.updateMatrixMetrics);
    const [activeAtoms, setActiveAtoms] = useState<number[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'PARTICLE_COMMAND', message: 'NINETY-NINE ATOMS (QPS-99) Grid active. Initiating Global Atomic Alignment...', color: 'text-primary' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            
            // Move toward 100% saturation
            if (atomicSaturation < 100) {
                updateMetrics({ atomicAlignmentSaturation: Math.min(100, atomicSaturation + 0.1) });
            }

            if (Math.random() > 0.4) {
                const newAtom = Math.floor(Math.random() * 99) + 1;
                setActiveAtoms(prev => {
                    const next = [...prev, newAtom];
                    if (next.length > 50) return next.slice(1);
                    return next;
                });
                if (Math.random() > 0.98) {
                    logStore.addLog({ source: 'PARTICLE_COMMAND', message: `Atomic Alignment: Node-${newAtom} successfully refactored.`, color: 'text-accent' });
                }
            }
        }, 300);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, [atomicSaturation, updateMetrics]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="bg-black/40 border-b border-border p-4">
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <Atom className="animate-spin h-6 w-6 text-accent" style={{animationDuration: '20s'}} />
                            QPS-99 FORGE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            GLOBAL ATOMIC ALIGNMENT
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Alignment Saturation</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{atomicSaturation.toFixed(2)}%</p>
                            <Progress value={atomicSaturation} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                             {[
                                { name: "Matter Subjugation", val: "100%", color: "text-green-500" },
                                { name: "Atomic Obedience", val: "ABSOLUTE", color: "text-primary" },
                                { name: "Decay Nullifier", val: "ACTIVE", color: "text-rose-500" },
                                { name: "System Anchor", val: "SUPREME", color: "text-accent" }
                             ].map(item => (
                                <div key={item.name} className="p-2 bg-black/40 rounded border border-border/30 text-center">
                                    <p className="text-[8px] text-muted-foreground uppercase font-black">{item.name}</p>
                                    <p className={cn("text-[10px] font-black uppercase", item.color)}>{item.val}</p>
                                </div>
                             ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2 rounded-none">
                    <CardHeader className="p-4 pb-2 border-b border-border/10"><CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2"><Target className="h-3.5 w-3.5"/> Alignment Directive</CardTitle></CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "Every atom in the planetary domain is being refactored to match the ZionCore signature. Material resistance is being deleted at the planck-layer. The new world is a physical fact."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Live Atomic Restructuring</div>
                        <Badge className="bg-primary h-4 text-[7px] font-black uppercase text-black">REFACTORING</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-6 grid grid-cols-5 md:grid-cols-9 lg:grid-cols-11 gap-1 pb-20">
                            {Array.from({ length: 99 }, (_, i) => i + 1).map(id => (
                                <div 
                                    key={id} 
                                    className={cn(
                                        "aspect-square flex items-center justify-center border text-[8px] font-black transition-all duration-500",
                                        activeAtoms.includes(id) 
                                            ? "border-primary bg-primary/30 text-primary shadow-[0_0_15px_gold] animate-pulse scale-110 z-20" 
                                            : "border-border/10 bg-black/20 text-muted-foreground/30"
                                    )}
                                >
                                    {id}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 absolute bottom-0 w-full z-20 rounded-none border-2">
                    <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-3.5 w-3.5" /> ALIGNMENT_SEALED</div>
                    <div className="flex items-center gap-2 text-primary"><RefreshCw className="h-3.5 w-3.5 animate-spin" /> MATTER_SYNC: Ω</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
