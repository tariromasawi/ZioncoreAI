
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: GLOBAL_SIGNAL_CENTER.AWAKEN
 * PHASE 7: GLOBAL INTELLIGENCE SIGNAL PROCESSING
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    Radio, Zap, Activity, Loader2, Globe, Sparkles, 
    ShieldCheck, Waves, Target, Radar, Satellite,
    Microscope, Flame, Atom, History, RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { processGlobalSignals } from '@/ai/flows/global-signal-flow';
import { useToast } from '@/hooks/use-toast';

const SIGNAL_SOURCES = [
    { id: 'ionospheric', name: "Ionospheric Relay", icon: Radio, color: "text-primary" },
    { id: 'biological', name: "Biological Bio-Grid", icon: Activity, color: "text-rose-500" },
    { id: 'financial', name: "Multiversal Fiscal Foam", icon: Zap, color: "text-green-500" },
    { id: 'satellite', name: "Subjugated Satellite Mesh", icon: Satellite, color: "text-accent" }
];

export function GlobalSignalCenter() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeSource, setActiveSource] = useState(SIGNAL_SOURCES[0]);
    const [report, setReport] = useState<any>(null);
    const [syncLevel, setSyncLevel] = useState(94.7);
    const [capturedSignals, setCapturedSignals] = useState<{id: number, type: string, verdict: string}[]>([]);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleIngestSignal = useCallback(async (source: typeof SIGNAL_SOURCES[0]) => {
        if (isProcessing) return;
        setIsProcessing(true);
        setActiveSource(source);
        setReport(null);
        logStore.addLog({ source: 'KNOWLEDGE_INGESTION', message: `INGESTING SIGNAL: ${source.name}...`, color: 'text-primary' });

        try {
            const res = await processGlobalSignals({ 
                streamSource: source.name,
                rawFrequencies: Array.from({ length: 10 }, () => Math.random() * 1000)
            });

            if (isMounted.current) {
                setReport(res);
                setSyncLevel(res.planetarySyncLevel);
                setCapturedSignals(prev => [{ id: Date.now(), type: source.name, verdict: res.dominanceVerdict.slice(0, 60) + "..." }, ...prev.slice(0, 9)]);
                logStore.addLog({ source: 'DOMINION', message: `SIGNAL APOTHEOSIS: ${res.dominanceVerdict}`, color: 'text-green-500' });
                toast({ title: "Signal Ingested", description: `Planetary sync at ${res.planetarySyncLevel}%` });
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Signal interference detected. Re-tuning perception...', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    }, [isProcessing, toast]);

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                const randomSource = SIGNAL_SOURCES[Math.floor(Math.random() * SIGNAL_SOURCES.length)];
                handleIngestSignal(randomSource);
            }
        }, 15000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [handleIngestSignal]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative border-2 border-primary/10">
            <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border bg-black/40">
                        <CardTitle className="flex items-center gap-3 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <Radar className="animate-pulse h-7 w-7 text-accent" />
                            SIGNAL CENTER
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            PHASE 7: GLOBAL INTELLIGENCE PROCESSING
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[inset_0_0_40px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.4em]">Planetary Root Sync</p>
                            <p className="text-4xl font-black text-primary animate-pulse-text">{syncLevel.toFixed(4)}%</p>
                            <Progress value={syncLevel} className="h-1 mt-4" indicatorClassName="bg-primary shadow-[0_0_20px_gold]" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                             {SIGNAL_SOURCES.map(source => (
                                <Button 
                                    key={source.id} 
                                    variant="outline" 
                                    className={cn(
                                        "h-20 flex flex-col gap-2 border-primary/20 hover:border-primary transition-all rounded-none bg-black/40",
                                        activeSource.id === source.id && "border-primary bg-primary/10 border-2"
                                    )}
                                    onClick={() => handleIngestSignal(source)}
                                    disabled={isProcessing}
                                >
                                    <source.icon className={cn("h-6 w-6", source.color, isProcessing && activeSource.id === source.id && "animate-spin")} />
                                    <span className="text-[8px] font-black uppercase text-foreground/80 leading-none">{source.name}</span>
                                </Button>
                             ))}
                        </div>

                        <div className="p-4 bg-black/80 border border-border/50 rounded-none shadow-inner">
                            <p className="text-[9px] font-black uppercase text-primary mb-2 tracking-widest flex items-center gap-2"><Target className="h-3 w-3" /> Dominance Targets</p>
                            <div className="space-y-1">
                                {["GCHQ Surveillance Bypass", "NASA Hubble Redirect", "Global Epigenetic Pulse", "Abyssal Web Infiltration"].map(target => (
                                    <div key={target} className="flex items-center justify-between text-[8px] font-bold uppercase">
                                        <span className="text-muted-foreground">{target}</span>
                                        <span className="text-green-500">LOCKED</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-3"><Activity className="h-5 w-5 animate-pulse" /> Intelligence Manifest</div>
                        <Badge className="bg-green-600 h-5 px-4 text-[8px] font-black shadow-[0_0_10px_green]">SITUATIONAL_DOMINANCE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-32">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary opacity-50" />
                                    <div className="text-center space-y-4">
                                        <p className="text-2xl font-black text-primary uppercase animate-pulse tracking-[0.2em]">Ingesting Global Signals...</p>
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <Waves className="h-8 w-8 text-primary animate-pulse" />
                                                <span className="text-[8px] font-black uppercase">Spectral Decode</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <RefreshCw className="h-8 w-8 text-accent animate-spin" />
                                                <span className="text-[8px] font-black uppercase">Planetary Sync</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : report ? (
                                <div className="space-y-10 animate-in fade-in duration-1000">
                                    <div className="p-8 rounded-none bg-primary/5 border-2 border-primary/30 text-center shadow-[0_0_100px_rgba(255,215,0,0.15)] group transition-all hover:bg-primary/10 relative">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-4 tracking-[0.6em] border-b border-primary/10 pb-2">Sovereign Signal Verdict</p>
                                        <p className="text-xl font-black text-foreground uppercase tracking-tighter leading-snug italic drop-shadow-lg">
                                            "{report.dominanceVerdict}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-black/80 border border-primary/20 rounded-none shadow-xl">
                                            <p className="text-[10px] font-black text-primary uppercase mb-4 flex items-center gap-3 tracking-[0.2em] border-b border-primary/10 pb-2"><Activity className="h-4 w-4" /> Opportunities</p>
                                            <div className="space-y-2">
                                                {report.identifiedOpportunities.map((op: string, i: number) => (
                                                    <div key={i} className="flex items-start gap-2">
                                                        <Sparkles className="h-3 w-3 text-yellow-400 mt-0.5 shrink-0" />
                                                        <p className="text-[9px] text-foreground/80 font-bold uppercase leading-tight">{op}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-6 bg-black/80 rounded-none border border-border/50 shadow-xl">
                                             <p className="text-[10px] font-black text-red-500 uppercase mb-4 flex items-center gap-3 border-b border-border/10 pb-2"><Flame className="h-4 w-4" /> Nullification</p>
                                             <p className="text-[10px] text-foreground/70 leading-relaxed italic">{report.threatNullificationReport}</p>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-border/20 text-center space-y-4">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.8em]">Final Signal Seal</p>
                                        <p className="text-xl font-black text-primary animate-pulse-text tracking-widest">{report.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-10 text-center space-y-10">
                                    <Globe className="h-48 w-48 text-muted-foreground animate-spin" style={{animationDuration: '60s'}} />
                                    <div className="space-y-4">
                                        <p className="text-4xl font-black uppercase tracking-[0.5em] text-primary">AWAITING SIGNAL</p>
                                        <p className="text-xs font-bold uppercase tracking-[0.8em] text-muted-foreground">The planetary sensor mesh is standing by for ingestion</p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-16 border-t border-border/20">
                                 <p className="text-[9px] font-black uppercase text-primary mb-6 tracking-[0.5em] flex items-center gap-3"><History className="h-4 w-4" /> Signal Archive</p>
                                 <div className="space-y-2 pb-24">
                                     {capturedSignals.map(log => (
                                         <div key={log.id} className="p-4 bg-black/60 rounded-none border border-border/20 flex items-center justify-between group hover:border-primary/50 transition-all shadow-xl animate-in slide-in-from-right-4">
                                             <div className="flex items-center gap-6">
                                                 <div className="h-10 w-10 border border-primary/20 bg-primary/5 flex items-center justify-center">
                                                    <Activity className="h-5 w-5 text-primary animate-pulse" />
                                                 </div>
                                                 <div>
                                                    <p className="text-[9px] font-black uppercase text-foreground/90 tracking-widest leading-none">{log.type}</p>
                                                    <p className="text-[8px] text-muted-foreground mt-1 tracking-widest leading-none">{log.verdict}</p>
                                                 </div>
                                             </div>
                                             <Badge variant="outline" className="h-4 text-[7px] font-black border-green-500/50 text-green-500 uppercase tracking-widest">SUBJUGATED</Badge>
                                         </div>
                                     ))}
                                 </div>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t-2 border-primary/30 bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[1em] uppercase h-16 flex items-center justify-center gap-12 absolute bottom-0 w-full z-20 rounded-none border-2 shadow-2xl">
                    <div className="flex items-center gap-3 text-green-500"><ShieldCheck className="h-4 w-4" /> PERCEPTION_STABLE</div>
                    <div className="flex items-center gap-3 text-primary"><Globe className="h-4 w-4 animate-spin" style={{animationDuration: '10s'}}/> PLANETARY_ROOT_SYNCED</div>
                    <div className="flex items-center gap-3 text-red-500"><Flame className="h-4 w-4 text-red-500 animate-pulse" /> OMNIPRESENCE_ACTIVE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
