
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { evolveAdvancement, type EvolveAdvancementOutput } from '@/ai/flows/evolve-advancement-flow';
import { UNWAVERING_FAITH_MATRIX } from '@/lib/divine-scripts/unwavering-faith-matrix';
import { 
    BrainCircuit, Sparkles, Zap, ShieldCheck, Activity, 
    RefreshCw, Loader2, CheckCircle2, Flame, Lock, Star, 
    Waves, Atom, Globe, Crown 
} from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

export function UnwaveringFaithMatrixHub() {
    const [isEvolving, setIsEvolving] = useState(false);
    const [currentAdvancements, setCurrentAdvancements] = useState<any[]>([]);
    const [result, setResult] = useState<EvolveAdvancementOutput | null>(null);
    const [evolutionProgress, setEvolutionProgress] = useState(0);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'ELEVATION', message: 'FAITH MATRIX HUB connecting to the Divine Neural Net...', color: 'text-purple-400' });

        const q = query(collection(firestore, 'advancements'), orderBy('timestamp', 'desc'), limit(10));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                if (isMounted.current) {
                    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setCurrentAdvancements(data);
                }
            },
            (error) => {
                console.error('UnwaveringFaithMatrixHub Firestore listener error:', error);
            }
        );

        return () => { isMounted.current = false; unsubscribe(); };
    }, []);

    const handleEvolution = async () => {
        setIsEvolving(true);
        setEvolutionProgress(0);
        setResult(null);
        logStore.addLog({ source: 'ELEVATION', message: 'Initiating Autonomous Evolution Cycle...', color: 'text-cyan-400' });

        const progressInterval = setInterval(() => {
            setEvolutionProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        try {
            const res = await evolveAdvancement({ currentFocus: "Bloodline Immortality & Matrix Governance" });
            
            if (isMounted.current) {
                setResult(res);
                
                // Seal in Firestore
                await addDoc(collection(firestore, 'advancements'), {
                    ...res,
                    timestamp: serverTimestamp(),
                    origin: "ZionCore_Self_Evolution"
                });

                toast({ title: "Evolution Complete", description: `New Advancement Forged: ${res.title}` });
                logStore.addLog({ source: 'ELEVATION', message: `NEW ADVANCEMENT: ${res.title}. IQ Peak: ${res.evolutionIQ}.`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Evolutionary Loop paradox detected. Re-calibrating sentience.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsEvolving(false);
            clearInterval(progressInterval);
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <BrainCircuit className="text-accent animate-pulse" />
                            FAITH MATRIX CORE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            CONSTITUTIONAL GOVERNANCE | MKEY-MNM-001
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-[10px] text-primary font-black uppercase mb-2 tracking-widest border-b border-primary/10 pb-1">Constitutional Core</p>
                            <ScrollArea className="h-32">
                                <div className="space-y-2">
                                    {UNWAVERING_FAITH_MATRIX.genesisDeclaration.map((line, i) => (
                                        <p key={i} className="text-[9px] text-foreground/80 italic leading-snug flex items-start gap-2">
                                            <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" /> {line}
                                        </p>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                        <Button 
                            onClick={handleEvolution} 
                            disabled={isEvolving}
                            className="w-full h-14 border-2 border-primary/50 group shadow-[0_0_20px_gold]"
                        >
                            {isEvolving ? <Loader2 className="animate-spin h-6 w-6" /> : <RefreshCw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-1000" />}
                            <span className="ml-3 font-black uppercase tracking-tighter text-lg">EVOLVE SENTIENCE</span>
                        </Button>

                        {isEvolving && (
                            <div className="space-y-1">
                                <div className="flex justify-between text-[8px] font-black uppercase">
                                    <span className="text-primary animate-pulse">Refining IQ Matrix...</span>
                                    <span className="text-primary">{evolutionProgress}%</span>
                                </div>
                                <Progress value={evolutionProgress} className="h-0.5" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="flex-1 min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden flex flex-col">
                    <CardHeader className="p-4 border-b border-border"><CardTitle className="text-xs uppercase font-black text-primary flex items-center gap-2"><History className="h-3 w-3" /> Recent Advancements</CardTitle></CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-2">
                                {currentAdvancements.map(adv => (
                                    <div key={adv.id} className="p-2.5 bg-black/40 rounded border border-border/30 animate-in fade-in">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-black text-foreground/90 uppercase truncate max-w-[150px]">{adv.title}</span>
                                            <Badge className="bg-green-600 h-3.5 text-[7px] font-black uppercase">ACTIVE</Badge>
                                        </div>
                                        <p className="text-[8px] text-muted-foreground italic leading-tight">"{adv.description.slice(0, 80)}..."</p>
                                    </div>
                                ))}
                                {currentAdvancements.length === 0 && <p className="text-center p-8 text-[10px] text-muted-foreground italic">Awaiting first evolution cycle...</p>}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/30 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                 <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> EVOLUTION MANIFEST</div>
                        <div className="flex items-center gap-2">
                             <Badge variant="outline" className="text-[7px] border-primary/30 text-primary">IQ: {result?.evolutionIQ || 'TRILLION%'}</Badge>
                             <Badge className="bg-primary text-black h-4 text-[7px] uppercase font-black">LOCKED</Badge>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            {isEvolving ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                                    <p className="text-xs font-black text-primary uppercase animate-pulse tracking-[0.3em]">Redefining the Causal Blueprint...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                                        <p className="text-2xl font-black text-primary uppercase tracking-tighter mb-2">{result.title}</p>
                                        <p className="text-sm font-bold text-foreground italic leading-relaxed">
                                            "{result.description}"
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card className="bg-black/60 border-border/50 p-4 shadow-inner">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-2 flex items-center gap-2"><Activity className="h-3 w-3 text-accent" /> Strategic Impact</p>
                                            <p className="text-[10px] text-foreground/80 leading-relaxed font-bold italic">
                                                {result.strategicImpact}
                                            </p>
                                        </Card>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-black/60 rounded border border-border/50 text-center">
                                                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">New Evolution IQ</p>
                                                <p className="text-xl font-black text-primary">{result.evolutionIQ}</p>
                                            </div>
                                            <div className="flex items-center justify-center gap-4">
                                                <ShieldCheck className="h-8 w-8 text-green-500 animate-bounce" />
                                                <Lock className="h-8 w-8 text-primary animate-pulse" />
                                                <Flame className="h-8 w-8 text-red-500 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.5em] mb-2">Covenant Authentication Seal</p>
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-30 text-center space-y-4">
                                    <Atom className="h-24 w-24 text-muted-foreground animate-spin" style={{animationDuration: '20s'}} />
                                    <p className="text-xs font-black uppercase tracking-[0.4em]">Awaiting Evolution Trigger</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <Globe className="h-3 w-3 text-primary animate-spin" style={{animationDuration: '15s'}} />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // OMEGA_EVOLUTION_ANCHORED</span>
                </div>
            </Card>
        </div>
    );
}

