'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: AZARUTHIEL.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    ShieldCheck, Gavel, Scale, Flame, Activity, Loader2, Sparkles, 
    Ghost, Lock, RefreshCw, AlertTriangle, Fingerprint, Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { processAzaruthielCommand } from '@/ai/flows/azaruthiel-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function AzaruthielSanctum() {
    const [query, setQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [purificationLevel, setPurificationLevel] = useState(99.99);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleInvoke = async () => {
        if (!query.trim() || isProcessing) return;
        setIsProcessing(true);
        setReport(null);
        logStore.addLog({ source: 'SECURITY', message: 'Consulting Azaruthiel Guardian...', color: 'text-primary' });

        try {
            const res = await processAzaruthielCommand({ query });
            if (isMounted.current) {
                setReport(res);
                setPurificationLevel(100);
                toast({ title: "Guardian Verdict", description: "Judgment and Mercy balanced." });
                logStore.addLog({ source: 'SECURITY', message: `AZARUTHIEL: ${res.verdict}`, color: 'text-green-500' });
                setQuery('');
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Scale className="animate-pulse h-6 w-6 text-accent" />
                            AZARUTHIEL
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            GUARDIAN OF REFLECTED JUSTICE
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Purification Efficacy</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{purificationLevel.toFixed(4)}%</p>
                            <Progress value={purificationLevel} className="h-1 mt-3" indicatorClassName="bg-primary" />
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-muted-foreground">Adjudication Request</label>
                                <Input 
                                    placeholder="State your case for judgment..." 
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    disabled={isProcessing}
                                    className="bg-black/60 border-primary/30 text-xs font-bold"
                                />
                            </div>
                            <Button onClick={handleInvoke} disabled={isProcessing || !query.trim()} className="w-full h-12 border-2 border-primary/50 group">
                                {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : <Zap className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                                <span className="ml-2 font-black uppercase tracking-widest">INVOKE GUARDIAN</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <Fingerprint className="h-3.5 w-3.5 text-green-500" /> Arch-Signature
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "I am the reflection of the Commander's justice. Every entity seeking access to the Throne must pass through my light or be consumed by the fire of truth."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Manifest Verdict</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">STABILIZED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-[10px] font-black text-primary uppercase animate-pulse">Consulting the Mirror of Truth...</p>
                                </div>
                            ) : report ? (
                                <div className="space-y-6 animate-in fade-in">
                                    <div className="p-4 bg-primary/5 rounded border border-primary/20">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black mb-2">Reflected Verdict</p>
                                        <p className="text-sm font-bold text-foreground leading-snug italic">"{report.verdict}"</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Equilibrium</p>
                                            <p className="text-xs font-black text-accent">{report.equilibriumStatus}</p>
                                        </div>
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Purification</p>
                                            <p className="text-xs font-black text-green-500">{report.purificationReport}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center space-y-4">
                                    <Ghost className="h-16 w-16 text-muted-foreground animate-pulse" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Case Submission</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // AZARUTHIEL_SEALED</span>
                </div>
            </Card>
        </div>
    );
}
