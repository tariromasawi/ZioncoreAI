
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeHistoricalPurge, type HistoricalPurgeOutput } from '@/ai/flows/historical-purge-flow';
import { sealManifestation } from '@/services/sovereign-data-service';
import { Trash2, Sparkles, Loader2, Zap, ShieldCheck, History, Flame, Atom } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function HistoricalPurgeEngine() {
    const [eventToPurge, setEventToPurge] = useState('');
    const [replacementTruth, setReplacementTruth] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<HistoricalPurgeOutput | null>(null);
    const [purgeProgress, setPurgeProgress] = useState(0);
    const { toast } = useToast();

    const handlePurge = async () => {
        if (!eventToPurge.trim() || !replacementTruth.trim() || isProcessing) return;

        setIsProcessing(true);
        setPurgeProgress(0);
        logStore.addLog({ source: 'COMMAND', message: `INITIATING HISTORICAL PURGE: "${eventToPurge}"`, color: 'text-red-500' });

        const progressInterval = setInterval(() => {
            setPurgeProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 150);

        try {
            const res = await executeHistoricalPurge({ eventToPurge, replacementTruth });
            
            // Seal in Lattice
            sealManifestation({
                type: "Causal",
                text: `Historical Purge Executed: ${eventToPurge} erased. New Truth: ${replacementTruth}.`,
                causalityHash: res.causalityHash
            });

            setResult(res);
            toast({ title: "Timeline Purged", description: "The past has been corrected eternally." });
            logStore.addLog({ source: 'SYSTEM', message: `PURGE COMPLETE: ${res.resonanceLevel || 'Resonance Established'}.`, color: 'text-green-500' });
            
            setEventToPurge('');
            setReplacementTruth('');
        } catch (error) {
            console.error('Historical purge engine error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Temporal flux detected. Reinforcing the Purge Seal.', color: 'text-destructive' });
        } finally {
            setIsProcessing(false);
            clearInterval(progressInterval);
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code bg-black/40">
            <div className="space-y-4 flex flex-col">
                <Card className="border-red-500/50 bg-black/60 shadow-2xl relative overflow-hidden border-2 rounded-none">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                    <CardHeader className="bg-black/40 border-b border-border p-4">
                        <CardTitle className="flex items-center gap-2 text-red-500 font-black uppercase tracking-tighter text-xl">
                            <Trash2 className="animate-pulse h-6 w-6" />
                            HISTORICAL PURGE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE 35: CAUSAL RE-ORIENTATION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10 p-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-red-400">Target Record for Erasure</label>
                            <Input 
                                placeholder="Describe the history to be erased..." 
                                value={eventToPurge}
                                onChange={(e) => setEventToPurge(e.target.value)}
                                disabled={isProcessing}
                                className="bg-black/60 border-red-500/30 text-xs font-bold h-10 rounded-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-green-400">Implemented Sovereign Truth</label>
                            <Textarea 
                                placeholder="State the reality that replaces it..." 
                                value={replacementTruth}
                                onChange={(e) => setReplacementTruth(e.target.value)}
                                disabled={isProcessing}
                                className="bg-black/60 border-green-500/30 text-xs font-bold min-h-[100px] rounded-none"
                            />
                        </div>
                        
                        {isProcessing && (
                            <div className="space-y-1">
                                <div className="flex justify-between text-[8px] font-black uppercase">
                                    <span className="text-red-500 animate-pulse">ERASING RECORD...</span>
                                    <span className="text-red-500">{purgeProgress}%</span>
                                </div>
                                <Progress value={purgeProgress} className="h-1" indicatorClassName="bg-red-500 shadow-[0_0_15px_red]" />
                            </div>
                        )}

                        <Button 
                            onClick={handlePurge} 
                            disabled={isProcessing || !eventToPurge.trim() || !replacementTruth.trim()} 
                            className="w-full h-14 border-2 border-red-500/50 group rounded-none shadow-[0_0_20px_rgba(255,0,0,0.2)] bg-red-950/20"
                        >
                            {isProcessing ? <Loader2 className="animate-spin h-6 w-6 text-red-500" /> : <Flame className="h-6 w-6 text-red-500 group-hover:scale-125 transition-transform" />}
                            <span className="ml-3 font-black uppercase tracking-widest text-lg text-red-500">EXECUTE PURGE</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><History className="h-4 w-4 animate-pulse" /> Purge Manifest</div>
                        <Badge className="bg-red-600 h-4 text-[7px] font-black uppercase">RECORD_ERASED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-red-500" />
                                    <p className="text-[10px] font-black text-red-500 uppercase animate-pulse">REWRITING THE AKASHIC RECORDS...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-4 rounded-lg bg-red-950/20 border-2 border-red-500/30">
                                        <p className="text-[11px] font-bold text-foreground leading-snug italic">
                                            "{result.purgeReport}"
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[7px] text-muted-foreground uppercase mb-1">Resonance</p>
                                            <p className="text-[10px] font-black text-primary">{result.resonanceLevel}</p>
                                        </div>
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[7px] text-muted-foreground uppercase mb-1">Status</p>
                                            <p className="text-[10px] font-black text-green-500 uppercase tracking-tighter">PERMANENTLY_ERASED</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-primary/5 border border-primary/20 rounded text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase mb-1 tracking-widest">Divine Authentication Seal</p>
                                        <p className="text-[10px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center space-y-4">
                                    <Trash2 className="h-16 w-16 text-muted-foreground" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Purge Directive</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-4">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                    <span>SOVEREIGN_RECONSTRUCTION_LOCKED</span>
                </div>
            </Card>
        </div>
    );
}
