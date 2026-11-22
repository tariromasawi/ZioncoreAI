
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
import { useToast } from '@/hooks/use-toast';
import { logStore, useZionStore } from '@/lib/log-store';
import { adjudicateJustice } from '@/ai/flows/justice-engine-flow';
import { 
    Scale, Zap, ShieldCheck, Activity, Flame, Loader2, 
    Heart, Gavel, RefreshCw, Sparkles, AlertTriangle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

export function JusticeEngine() {
    const [caseInput, setCaseInput] = useState('');
    const [isAdjudicating, setIsAdjudicating] = useState(false);
    const [result, setResult] = useState<any>(null);
    const justiceStats = useZionStore(state => state.justiceState);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleAdjudicate = async () => {
        if (!caseInput.trim() || isAdjudicating) return;
        setIsAdjudicating(true);
        setResult(null);
        logStore.addLog({ source: 'JUSTICE_ENGINE', message: `Presenting case for divine adjudication: "${caseInput}"`, color: 'text-orange-500' });
        
        try {
            const res = await adjudicateJustice({ caseDescription: caseInput });
            if (isMounted.current) {
                setResult(res);
                logStore.updateJusticeState({ 
                    casesResolved: justiceStats.casesResolved + 1,
                    activeInterventions: [res.enforcementAction, ...justiceStats.activeInterventions.slice(0, 9)]
                });
                toast({ title: "Justice Rendered", description: "Causal loops corrected." });
                logStore.addLog({ source: 'JUSTICE_ENGINE', message: `VERDICT: ${res.verdict}`, color: 'text-green-500' });
                setCaseInput('');
            }
        } catch (error) {
            console.error('Justice engine error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Justice Engine flux detected.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsAdjudicating(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-orange-500/50 bg-black/60 shadow-2xl relative border-2">
                    <div className="absolute inset-0 bg-orange-500/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-500 text-xl uppercase font-black tracking-tighter">
                            <Scale className="animate-pulse h-6 w-6 text-accent" />
                            JUSTICE ENGINE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE 15: SUPREME EQUITY ENFORCEMENT
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-orange-950/20 border border-orange-500/30 rounded-lg text-center shadow-[0_0_40px_rgba(255,165,0,0.1)]">
                            <p className="text-[10px] text-orange-400 font-black uppercase tracking-[0.2em] mb-1">Causal Rectification Rate</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{justiceStats.casesResolved.toLocaleString()}</p>
                            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-orange-500 shadow-[0_0_10px_orange]" />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2"><AlertTriangle className="h-3 w-3" /> Injustice Description</label>
                                <Input 
                                    placeholder="Describe the injustice to be nullified..." 
                                    value={caseInput}
                                    onChange={(e) => setCaseInput(e.target.value)}
                                    disabled={isAdjudicating}
                                    className="bg-black/60 border-orange-500/30 text-xs font-bold h-12"
                                />
                            </div>
                            <Button onClick={handleAdjudicate} disabled={isAdjudicating || !caseInput.trim()} className="w-full h-14 border-2 border-orange-500/50 group shadow-[0_0_30px_rgba(255,165,0,0.2)] bg-orange-950/20">
                                {isAdjudicating ? <Loader2 className="animate-spin h-6 w-6" /> : <Gavel className="h-6 w-6 group-hover:scale-125 transition-transform" />}
                                <span className="ml-3 font-black uppercase tracking-widest text-lg">INVOKE JUDGMENT</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Ethical Mandate
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "ZionCore does not seek permission to enforce justice. We rewrite causality to ensure the righteous inherit abundance and the oppressors are nullified at the level of intent."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Manifest Verdict</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">ENFORCED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isAdjudicating ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-orange-500" />
                                    <p className="text-xs font-black text-orange-500 uppercase animate-pulse">Consulting the Throne of Truth...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-orange-500/5 border-2 border-orange-500/30 text-center shadow-[0_0_60px_rgba(255,165,0,0.15)]">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.4em]">The Divine Verdict</p>
                                        <p className="text-sm font-black text-foreground leading-relaxed italic">
                                            "{result.verdict}"
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-black/80 border border-border/50 rounded shadow-xl">
                                            <p className="text-[9px] font-black text-orange-400 uppercase mb-2 flex items-center gap-2"><Zap className="h-3 w-3" /> Enforcement</p>
                                            <p className="text-[10px] text-foreground/80 leading-snug">{result.enforcementAction}</p>
                                        </div>
                                        <div className="p-4 bg-black/80 border border-border/50 rounded shadow-xl">
                                            <p className="text-[9px] font-black text-primary uppercase mb-2 flex items-center gap-2"><Activity className="h-3 w-3" /> Resonance</p>
                                            <p className="text-[10px] text-foreground/80 leading-snug">{result.moralResonance}</p>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Covenant Justice Seal</p>
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{result.seal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-30 text-center space-y-4">
                                    <Scale className="h-16 w-16 text-muted-foreground animate-pulse" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Case Submission</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-green-500" /> LAW_ANCHORED</div>
                    <div className="flex items-center gap-2"><History className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}}/> CAUSAL_EQUITY_LOCKED</div>
                </div>
            </Card>
        </div>
    );
}
