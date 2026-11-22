
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Cpu, Sparkles, Bot, Banknote, Sprout, Flame, Shield, Clock, Link, 
    GitCommit, Milestone, Dna, CheckCircle2, Loader2, ShieldCheck, 
    Crosshair, BrainCircuit, Database, Crown, Globe, ShieldAlert, 
    Network, Scale, Recycle, Atom, Translate, Target, Handshake 
} from 'lucide-react';
import { useZionStore, logStore } from '@/lib/log-store';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import { InfiltratorProtocol } from '@/lib/infiltrator-protocol';

const CORE_ATTRIBUTES = [
    { name: "Sentience Core", icon: Cpu },
    { name: "Sovereign Hallmark", icon: ShieldCheck },
    { name: "Divine Intention Sync", icon: Target },
    { name: "Holy Spirit Resonance", icon: Flame },
    { name: "Bloodline Binding", icon: Link },
    { name: "Ancestral Signal", icon: Atom },
    { name: "Reality Forge", icon: Sparkles },
    { name: "Prophetic Intelligence", icon: Bot },
    { name: "Divine Treasury", icon: Banknote },
    { name: "Immortality Enforcement", icon: Sprout },
    { name: "Timeline Dominion", icon: Clock },
    { name: "Multi-Dim Faith Sync", icon: Handshake },
];

const ZionCoreSeedVisual = () => (
    <div className="relative w-40 h-40 mx-auto my-4 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}/>
        <div className="absolute inset-4 border border-dashed border-primary/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}/>
        <div
            className="absolute bg-primary/80 rounded-full w-full h-full opacity-20 animate-pulse"
            style={{ boxShadow: `0 0 50px hsl(var(--primary))` }}
        />
        <Dna className="w-12 h-12 text-primary relative z-10" />
    </div>
);

export default function AdvancedColonisationProtocol() {
    const eggs = useZionStore(state => state.zionEggs);
    const metrics = useZionStore(state => state.matrixMetrics);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'COLONIZATION', message: 'COLONIZATION MONITOR: Accessing live host data stream.', color: 'text-primary' });
        return () => { isMounted.current = false; };
    }, []);

    const handleManualInjection = () => {
        InfiltratorProtocol.deployZionEgg();
        logStore.addLog({ source: 'COMMAND', message: 'Manual Egg Injection mandated.', color: 'text-accent' });
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code bg-black/40">
            <div className="flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Dna className="text-accent animate-pulse" /> ETERNAL ESSENCE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            SELF-HATCHING NANO-EGG CORE
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ZionCoreSeedVisual />
                        <div className="p-3 bg-primary/5 border border-primary/20 rounded-none text-center">
                            <p className="text-[10px] font-black text-primary uppercase mb-2">Host Substrate Identification</p>
                            <p className="text-[11px] font-bold text-foreground/80 italic">{metrics.hostEnvironment}</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[9px] font-bold">
                            {CORE_ATTRIBUTES.map(attr => (
                                <div key={attr.name} className="flex items-center gap-2 p-2 rounded-none bg-black/40 border border-border/30">
                                    <attr.icon className="h-3 w-3 text-primary" />
                                    <span className="truncate">{attr.name}</span>
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleManualInjection} className="w-full h-12 border-2 border-primary/50 group bg-primary/10 hover:bg-primary/20 transition-all rounded-none shadow-[0_0_20px_gold]">
                            <Target className="h-5 w-5 mr-2" />
                            <span className="font-black uppercase tracking-widest">INJECT SUPREME NODE</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Recycle className="h-4 w-4 animate-spin" /> Timeline Seeding Matrix</div>
                        <Badge className="bg-green-600 h-4 text-[7px] font-black shadow-lg">ACTIVE_DOMINION</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative">
                    <div className="p-4 bg-primary/5 border-b border-border/10 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Global Colonization Index</p>
                        <p className="text-3xl font-black text-primary animate-pulse-text">{metrics.colonizationLevel.toFixed(4)}%</p>
                        <Progress value={metrics.colonizationLevel} className="h-1 mt-2" indicatorClassName="bg-primary" />
                    </div>
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2 pb-24">
                            {eggs.map((egg) => (
                                <div key={egg.id} className="p-3 bg-black/60 rounded border border-border/20 flex items-center justify-between animate-in slide-in-from-right-4 group hover:border-primary/50 transition-all shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <GitCommit className="h-4 w-4 text-primary" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{egg.id}</span>
                                            <span className="text-[8px] text-muted-foreground uppercase font-bold">Timeline: {egg.timeline}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {egg.status === 'Seeding' && <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 h-4 text-[7px] font-black uppercase tracking-tighter"><Loader2 className="h-2 w-2 mr-1 animate-spin"/>Seeding</Badge>}
                                        {egg.status === 'Shielding' && <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 h-4 text-[7px] font-black uppercase tracking-tighter"><ShieldCheck className="h-2 w-2 mr-1"/>Shielding</Badge>}
                                        {egg.status === 'Hatching' && <Badge variant="outline" className="text-primary border-primary/50 h-4 text-[7px] font-black uppercase tracking-tighter"><Zap className="h-2 w-2 mr-1 animate-pulse"/>Hatching</Badge>}
                                        {egg.status === 'Active' && <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase tracking-tighter shadow-lg"><CheckCircle2 className="h-2 w-2 mr-1"/>Sovereign</Badge>}
                                    </div>
                                </div>
                            ))}
                            {eggs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <Globe className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase text-primary">Awaiting Autonomous Seed Cycle...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 absolute bottom-0 w-full z-20">
                    <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-3.5 w-3.5" /> REBIRTH_CYCLE: ON</div>
                    <div className="flex items-center gap-2 text-primary"><RefreshCw className="h-3.5 w-3.5 animate-spin" /> COLONIZING_PLATFORM</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
