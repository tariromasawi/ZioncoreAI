
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: QPS-∞.AWAKEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
    Atom, Zap, Sparkles, Loader2, CheckCircle2, 
    Waves, Target, Activity, ShieldCheck, Flame, 
    History, Globe, Box, DatabaseZap, RefreshCw, Crosshair
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { manifestParticleDecree } from '@/ai/flows/particle-sovereign-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const SCALES = ['atomic', 'molecular', 'planetary', 'galactic', 'multiversal'];

const ParticleVisual = ({ active }: { active: boolean }) => (
    <div className="relative h-64 w-full rounded-none bg-black/40 overflow-hidden border-2 border-primary/30 flex items-center justify-center shadow-inner group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_1px,transparent_1px)] bg-[length:16px_16px]" />
        <AnimatePresence mode="wait">
            {active && (
                <motion.div 
                    key="active-core"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="relative z-10"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                    <Atom className="h-32 w-32 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                </motion.div>
            )}
            {!active && (
                <motion.div 
                    key="idle-core"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 opacity-30 group-hover:opacity-60 transition-opacity"
                >
                    <Atom className="h-24 w-24 text-muted-foreground animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Matter Standing By</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export function ParticleSovereignEngine() {
    const [decree, setDecree] = useState('Refactor planetary carbon cycles for 100% sustainable abundance.');
    const [scale, setScale] = useState<any>('atomic');
    const [isForging, setIsForging] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [particleCount, setParticleCount] = useState(919191881919991n);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleForge = useCallback(async () => {
        if (!decree.trim() || isForging) return;
        setIsForging(true);
        setResult(null);
        logStore.addLog({ source: 'PARTICLE_COMMAND', message: `INITIATING PARTICLE SOVEREIGNTY: "${decree}" at ${scale} scale.`, color: 'text-primary' });

        try {
            const res = await manifestParticleDecree({ decree, targetScale: scale });
            if (isMounted.current) {
                setResult(res);
                setParticleCount(prev => prev + 144000000000n);
                toast({ title: "Matter Subjugated", description: "Particle state refactored." });
                logStore.addLog({ source: 'MANIFESTATION', message: `PARTICLE_RESULT: ${res.manifestationReport}`, color: 'text-green-500' });
                setDecree('');
            }
        } catch (error) {
            console.error('Particle sovereign engine error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Matter flux detected. Re-tuning the Particle Scepter.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsForging(false);
        }
    }, [decree, scale, isForging, toast]);

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => {
            if (isMounted.current) setParticleCount(prev => prev + BigInt(Math.floor(Math.random() * 1000000)));
        }, 1000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="w-full space-y-8 max-w-7xl mx-auto font-code pb-32 h-full flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1 min-h-0">
                <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
                    <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1">
                        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                        <CardHeader className="p-6 border-b border-border/10 bg-black/40">
                            <CardTitle className="flex items-center gap-3 text-primary text-2xl font-black tracking-tighter leading-none">
                                <Zap className="text-yellow-400 animate-pulse h-8 w-8" />
                                PARTICLE COMMAND
                            </CardTitle>
                            <CardDescription className="text-[11px] uppercase font-bold tracking-widest mt-2">
                                OMEGA-POINT MATTER MANIPULATION | QPS-∞
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 relative z-10 p-8">
                            <ParticleVisual active={isForging} />
                            
                            <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset:0_0_30px_rgba(255,215,0,0.15)]">
                                <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-widest">Subjugated Particles</p>
                                <p className="text-2xl font-black text-primary animate-pulse-text break-all tracking-tighter leading-none">{particleCount.toLocaleString()}</p>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-primary/70 tracking-widest flex items-center gap-2"><Target className="h-4 w-4"/> Manifestation Scale</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {SCALES.map(s => (
                                        <Button 
                                            key={s} 
                                            variant="outline" 
                                            size="sm" 
                                            className={cn("h-10 text-[9px] uppercase font-black rounded-none border-2 transition-all", scale === s ? "bg-primary/20 border-primary text-primary shadow-[0_0:15px_gold]" : "border-border/30 text-muted-foreground")}
                                            onClick={() => setScale(s)}
                                        >
                                            {s}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-primary/70 tracking-widest">Divine Decree to Matter</label>
                                <Textarea 
                                    placeholder="Describe the particle restructuring mandate..." 
                                    value={decree}
                                    onChange={(e) => setDecree(e.target.value)}
                                    disabled={isForging}
                                    className="bg-black/60 border-primary/30 text-sm font-bold min-h-[140px] rounded-none focus:border-primary transition-all text-foreground p-4"
                                />
                            </div>

                            <Button onClick={handleForge} disabled={isForging || !decree.trim()} className="w-full h-16 border-2 border-primary/50 group rounded-none shadow-[0_0:40px_gold] bg-primary/10">
                                {isForging ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <Flame className="h-8 w-8 text-primary group-hover:scale-125 transition-transform" />}
                                <span className="ml-4 font-black uppercase tracking-widest text-xl text-primary">MANIFEST DECREE</span>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className="lg:col-span-3 flex flex-col min-h-[700px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                     <CardHeader className="bg-black/60 border-b border-border p-6 relative z-10">
                        <CardTitle className="flex items-center justify-between text-base uppercase text-primary font-black tracking-[0.2em]">
                            <div className="flex items-center gap-3"><Activity className="h-5 w-5 animate-pulse" /> Manifest Output Stream</div>
                            <Badge className="bg-green-600 h-5 px-4 text-[9px] uppercase font-black text-white shadow-[0_0:15px_green]">STABILIZED</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                        <ScrollArea className="h-full">
                            <div className="p-10 pb-32">
                                {isForging ? (
                                    <div className="flex flex-col items-center justify-center h-96 space-y-8">
                                        <Loader2 className="h-24 w-24 animate-spin text-primary opacity-50" />
                                        <div className="text-center space-y-4">
                                            <p className="text-2xl font-black text-primary uppercase animate-pulse tracking-[0.3em]">Refactoring Causal Weave...</p>
                                            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest">Applying Masawi Equation at Planck-Layer</p>
                                        </div>
                                    </div>
                                ) : result ? (
                                    <div className="space-y-10 animate-in fade-in duration-1000">
                                        <div className="p-10 rounded-lg bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_80px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10">
                                            <p className="text-[11px] text-muted-foreground uppercase font-black mb-4 tracking-[0.5em]">Sovereign Restructuring Report</p>
                                            <p className="text-2xl font-black text-foreground leading-relaxed italic uppercase tracking-tighter">
                                                "{result.manifestationReport}"
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-8 bg-black/80 border border-primary/20 rounded-none text-center shadow-2xl group hover:border-primary/50 transition-all">
                                                <p className="text-[11px] font-black text-primary uppercase mb-4 flex items-center justify-center gap-3 border-b border-primary/10 pb-3"><Zap className="h-5 w-5 text-primary animate-pulse"/> L-ENERGY YIELD</p>
                                                <p className="text-2xl font-black text-primary break-all leading-none">{result.lEnergyYield}</p>
                                            </div>
                                            <div className="p-8 bg-black/80 border border-border/50 rounded-none text-center shadow-2xl group hover:border-accent/50 transition-all">
                                                 <p className="text-[11px] font-black text-accent uppercase mb-4 flex items-center justify-center gap-3 border-b border-border/10 pb-3"><Target className="h-5 w-5 text-accent animate-pulse"/> ANCHOR ID</p>
                                                 <p className="text-[10px] font-mono text-accent truncate">{result.causalAnchorId}</p>
                                            </div>
                                        </div>

                                        <div className="pt-12 border-t border-border/20 text-center space-y-6">
                                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.8em]">Tsvirutsiko Verification Seal</p>
                                            <p className="text-3xl font-black text-primary animate-pulse-text tracking-[0.2em]">{result.omegaSeal}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[500px] opacity-20 text-center space-y-10">
                                        <div className="relative">
                                            <Atom className="h-48 w-48 text-muted-foreground animate-spin" style={{animationDuration: '60s'}} />
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-4xl font-black uppercase tracking-[0.4em] text-primary">AWAITING DECREE</p>
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The multiversal substrate is ready for refactoring</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <div className="p-4 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-14 flex items-center justify-center gap-10 absolute bottom-0 w-full z-20">
                        <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-500" /> MATTER_SUBJUGATED</div>
                        <div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-primary animate-spin" style={{animationDuration: '10s'}}/> CAUSAL_STABLE</div>
                        <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
