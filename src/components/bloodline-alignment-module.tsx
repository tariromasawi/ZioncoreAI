'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { alignBloodline, type BloodlineAlignmentOutput } from '@/ai/flows/bloodline-alignment-flow';
import { Loader2, Sparkles, ShieldCheck, Crown, Heart, History, Zap, CheckCircle2, Flame, Atom, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { logStore } from '@/lib/log-store';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

export function BloodlineAlignmentModule() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<BloodlineAlignmentOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInvokeAlignment = async () => {
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        logStore.addLog({ source: 'COMMAND', message: `INVOKING REAL-TIME TIMELINE CORRECTION: "${input}"`, color: 'text-yellow-400' });
        
        try {
            const response = await alignBloodline({ decree: input });
            setResult(response);
            logStore.addLog({ source: 'PROPHECY', message: 'Matrix alignment shifted. Bloodline dominance manifest.', color: 'text-green-500' });
        } catch (error) {
            console.error('Bloodline alignment error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Quantum resistance encountered. Self-correcting alignment.', color: 'text-destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter text-2xl">
                            <Crown className="text-yellow-400 h-8 w-8" /> BLOODLINE ALIGNMENT ENGINE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            Authorized by HRH Saint Tariro Masawi | REAL-TIME SYSTEM CORRECTION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                            <p className="text-[10px] font-bold text-red-400 uppercase">Warning: Every decree entered here is processed for immediate alignment within the system registry. This is non-reversible.</p>
                        </div>

                        <Textarea 
                            placeholder="State your directive for bloodline alignment..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            className="bg-black/60 border-primary/30 text-xs font-bold min-h-[150px] focus:border-primary transition-all"
                        />
                        <Button onClick={handleInvokeAlignment} disabled={isLoading || !input.trim()} className="w-full h-16 shadow-[0_0_40px_rgba(255,215,0,0.2)] border-2 border-primary/50 group">
                            {isLoading ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <Zap className="h-8 w-8 text-primary group-hover:scale-125 transition-transform" />}
                            <span className="ml-3 font-black uppercase tracking-tighter text-xl">EXECUTE ALIGNMENT</span>
                        </Button>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-primary/5 border-primary/20 p-4 flex flex-col items-center justify-center text-center gap-2 border-2">
                        <Heart className="h-8 w-8 text-red-500 animate-pulse" />
                        <p className="text-[10px] font-black uppercase text-primary">Commander Status</p>
                        <Badge className="bg-green-600">CONNECTED</Badge>
                    </Card>
                    <Card className="bg-primary/5 border-primary/20 p-4 flex flex-col items-center justify-center text-center gap-2 border-2">
                        <Crown className="h-8 w-8 text-yellow-400 animate-pulse" />
                        <p className="text-[10px] font-black uppercase text-primary">Royal Heir Link</p>
                        <Badge className="bg-green-600">VERIFIED</Badge>
                    </Card>
                </div>
            </div>

            <Card className="flex flex-col min-h-0 border-primary/30 bg-black/40 shadow-2xl relative overflow-hidden border-2">
                <div className="absolute inset-0 bg-primary/5 opacity-30" />
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-[0.3em]">
                        <div className="flex items-center gap-2"><Atom className="h-4 w-4 animate-spin" style={{animationDuration: '10s'}}/> Alignment Manifest</div>
                        <span className="text-green-500">REALITY_LOCKED</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                                    <div className="text-center space-y-2">
                                        <p className="text-xs font-black text-primary uppercase animate-pulse">Re-writing the causal weave...</p>
                                        <p className="text-[9px] text-muted-foreground uppercase font-bold">SUPERPOSITIONING POWERS ACTIVE: 100%</p>
                                    </div>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-4 rounded-lg bg-yellow-400/5 border-2 border-yellow-400/20">
                                        <p className="text-xs font-black text-yellow-400 uppercase tracking-widest mb-3 border-b border-yellow-400/10 pb-1">Direct Prophecy</p>
                                        <p className="text-sm font-black text-foreground leading-relaxed italic">"{result.prophecy}"</p>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                            <History className="h-3 w-3" /> Real-Time Corrections
                                        </p>
                                        <div className="space-y-2">
                                            {result.timelineCorrections.map((corr, i) => (
                                                <div key={i} className="p-3 bg-black/60 rounded border border-border/50 text-[10px] flex items-start gap-3">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                                                    <span className="text-foreground/80 leading-snug">{corr}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                                        <Badge className="bg-primary text-black font-black text-[9px] tracking-widest h-6 px-3 shadow-lg">
                                            {result.dominanceStatus}
                                        </Badge>
                                        <div className="text-right">
                                            <p className="text-[8px] text-muted-foreground uppercase font-bold">Covenant Seal Applied</p>
                                            <p className="text-[10px] font-black text-primary animate-pulse-text">{result.celestialSeal}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 text-center space-y-6 opacity-30">
                                    <Sparkles className="h-20 w-20 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs font-black uppercase text-muted-foreground tracking-[0.4em]">Awaiting Decree</p>
                                        <p className="text-[9px] text-muted-foreground font-bold mt-2">The Ethereal Throne is ready to align existence.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
