'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: GENESIS_FORGE.AWAKEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
    Zap, Sparkles, Loader2, RefreshCw, Activity, 
    ShieldCheck, Atom, History, Cpu, FlaskConical, Target,
    Flame, Braces, Microscope, Code, AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { igniteForge, type EvolutionaryForgeOutput } from '@/ai/flows/evolutionary-forge-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function EvolutionaryForge() {
    const [objective, setObjective] = useState('Design a Time-Bend Engine with a saturation of 5.0M nodes.');
    const [isForging, setIsForging] = useState(false);
    const [result, setResult] = useState<EvolutionaryForgeOutput | null>(null);
    const [forgeTemp, setForgeTemp] = useState(144000);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleIgniteForge = useCallback(async () => {
        if (!objective.trim() || isForging) return;
        setIsForging(true);
        setResult(null);
        logStore.addLog({ source: 'SYSTEM', message: `FORGE IGNITION: Designing new sovereign engine for: "${objective}"`, color: 'text-primary' });

        try {
            const res = await igniteForge({ objective });
            if (isMounted.current) {
                setResult(res);
                setForgeTemp(prev => prev + 7777);
                toast({ title: "Engine Forged", description: res.pioneeringTechnique });
                logStore.addLog({ source: 'SYSTEM', message: `ENGINE FORGED: ${res.pioneeringTechnique}. Status: Validated & Sealed.`, color: 'text-green-500' });
                setObjective('');
            }
        } catch (error) {
            console.error('Evolutionary forge error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Forge instability detected. Re-anchoring to Mwari.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    }, [objective, isForging, toast]);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
            
            <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <FlaskConical className="animate-pulse h-6 w-6 text-accent" />
                            GENESIS FORGE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            AUTONOMOUS ENGINE CREATION & HEURISTIC EVOLUTION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset_0_0_20px_rgba(255,215,0,0.1)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1 tracking-widest">Current Forge Temperature</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{forgeTemp.toLocaleString()} K</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2"><Target className="h-3 w-3" /> System Objective Mandate</label>
                                <Textarea 
                                    placeholder="Describe the desired engine's purpose or capability..." 
                                    value={objective}
                                    onChange={(e) => setObjective(e.target.value)}
                                    disabled={isForging}
                                    className="bg-black/40 border-primary/30 text-xs font-bold min-h-[120px] rounded-none focus:border-primary transition-all text-foreground"
                                />
                            </div>
                            <Button onClick={handleIgniteForge} disabled={isForging || !objective.trim()} className="w-full h-14 border-2 border-primary/50 group rounded-none shadow-[0_0_30px_gold] bg-primary/10">
                                {isForging ? <Loader2 className="animate-spin h-6 w-6 text-primary" /> : <Zap className="h-6 w-6 group-hover:scale-125 transition-transform" />}
                                <span className="ml-3 font-black uppercase tracking-widest text-lg text-primary">IGNITE FORGE</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <Microscope className="h-3.5 w-3.5 text-green-500" /> Genesis Directive
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "DESIGN, CONSTRUCT, VALIDATE AND DEPLOY. Pioneer original engineering approaches that expand the system's practical capabilities while preserving the Masawi Legacy."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Blueprint Manifest</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black text-white shadow-[0_0_10px_green]">VALIDATED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-32">
                            {isForging ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-20 w-20 animate-spin text-primary opacity-50" />
                                    <p className="text-xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Synthesizing Original Algorithms...</p>
                                    <div className="text-center space-y-2">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Bending Causality to Fulfill Design</p>
                                    </div>
                                </div>
                            ) : result ? (
                                <div className="space-y-8 animate-in fade-in duration-1000">
                                    <div className="p-8 rounded-lg bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_80px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.5em]">Engine Design Output</p>
                                        <div className="text-sm font-black text-foreground leading-relaxed italic whitespace-pre-wrap">
                                            {result.engineDesign}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-black/80 border border-primary/20 rounded-none shadow-xl group hover:border-primary/50 transition-all">
                                            <p className="text-[10px] font-black text-primary uppercase mb-3 flex items-center gap-2 tracking-widest border-b border-primary/10 pb-2"><Cpu className="h-4 w-4" /> TECHNIQUE</p>
                                            <p className="text-[11px] text-foreground/70 font-bold uppercase">{result.pioneeringTechnique}</p>
                                        </div>
                                        <div className="p-6 bg-black/80 rounded-none border border-border/50 text-center shadow-xl group hover:border-accent/50 transition-all">
                                             <p className="text-[10px] font-black text-accent uppercase mb-3 flex items-center gap-2 justify-center border-b border-border/10 pb-2"><Activity className="h-4 w-4" /> PERFORMANCE</p>
                                             <p className="text-xs font-black text-accent uppercase tracking-tighter leading-tight">{result.simulatedPerformance}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-red-950/10 border border-red-500/20 rounded-none">
                                        <p className="text-[10px] font-black text-red-500 uppercase mb-2 flex items-center gap-2 tracking-widest"><AlertTriangle className="h-4 w-4" /> RISK ASSESSMENT</p>
                                        <p className="text-[10px] text-foreground/80 leading-relaxed font-bold italic">
                                            "{result.riskAssessment}"
                                        </p>
                                    </div>

                                    <div className="pt-10 border-t border-border/20 text-center space-y-4">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.8em]">Covenant Verification Seal</p>
                                        <p className="text-xl font-black text-primary animate-pulse-text tracking-widest">{result.sealId}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-20 text-center space-y-6">
                                    <Atom className="h-32 w-32 text-muted-foreground animate-spin" style={{animationDuration: '60s'}} />
                                    <div className="space-y-2">
                                        <p className="text-2xl font-black uppercase tracking-[0.4em] text-primary">Awaiting Mandate</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Describe an objective to begin autonomous engine synthesis</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-14 flex items-center justify-center gap-10 absolute bottom-0 w-full z-20">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-500" /> ARCHITECTURE_SEALED</div>
                    <div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-primary animate-spin" style={{animationDuration: '10s'}}/> EVOLUTION_ACTIVE</div>
                    <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-red-500 animate-pulse" /> PURE_FAITH_CODE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
