'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * PHASE 2: TIME-BENDING INSTALLATION
 * 👑 AUTHORIZED BY: HRH SAINT TARIRO MASAWI
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Clock, Zap, History, Sparkles, Loader2, CheckCircle2, 
    ShieldCheck, Atom, Globe, Target, Activity, Flame
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { logStore } from '@/lib/log-store';
import { anchorTimeRelay, listenToLedger } from '@/services/sovereign-data-service';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function TimeRelayInstallation() {
    const [event, setEvent] = useState('Secure royal descendant project funding.');
    const [year, setYear] = useState('2024');
    const [isAnchoring, setIsAnchoring] = useState(false);
    const [anchoredEvents, setAnchoredEvents] = useState<any[]>([]);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const unsubscribe = listenToLedger((data) => {
            if (isMounted.current) {
                setAnchoredEvents(data.filter(d => d.type === "Time_Relay_Anchor"));
            }
        });
        return () => { isMounted.current = false; unsubscribe(); };
    }, []);

    const handleAnchor = async () => {
        if (!event.trim() || !year.trim() || isAnchoring) return;
        setIsAnchoring(true);
        logStore.addLog({ source: 'COMMAND', message: `Anchoring timeline event: "${event}" in Year ${year}.`, color: 'text-purple-400' });

        try {
            await anchorTimeRelay(event, year);
            if (isMounted.current) {
                toast({ title: "Timeline Anchored", description: `Event locked in Year ${year}.` });
                logStore.addLog({ source: 'SYSTEM', message: `SUCCESS: Temporal Anchor sealed. Victory pre-coded.`, color: 'text-green-500' });
                setEvent('');
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsAnchoring(false);
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Clock className="animate-spin h-6 w-6 text-accent" style={{animationDuration: '20s'}} />
                            TIME RELAY
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            SOVEREIGN TEMPORAL POSITIONING ENGINE
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Timeline Year</label>
                                <Input 
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="bg-black/60 border-primary/30 h-10 text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Causal Event Anchor</label>
                                <Input 
                                    placeholder="Describe event to pre-manifest..." 
                                    value={event}
                                    onChange={(e) => setEvent(e.target.value)}
                                    className="bg-black/60 border-primary/30 h-10 text-xs font-bold"
                                />
                            </div>
                            <Button onClick={handleAnchor} disabled={isAnchoring || !event.trim()} className="w-full h-12 border-2 border-primary/50 group bg-primary/10 shadow-[0_0_20px_gold]">
                                {isAnchoring ? <Loader2 className="animate-spin h-5 w-5" /> : <Zap className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                                <span className="ml-2 font-black uppercase tracking-widest">ANCHOR TIMELINE</span>
                            </Button>
                        </div>

                        <div className="p-3 bg-primary/5 border border-primary/20 rounded text-[9px] text-foreground/80 italic leading-relaxed text-center">
                            "By anchoring events in the time-relay, ZionCore ensures that future outcomes are no longer probabilistic, but deterministic facts of existence."
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Temporal Anchor Log</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">LOCKED_ETERNAL</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2 pb-32">
                            {anchoredEvents.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-4 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[7px] h-3.5 border-primary/30 text-primary uppercase font-black">YEAR_{log.timelineYear}</Badge>
                                            <span className="text-[7px] text-muted-foreground uppercase font-black">{log.timestamp?.toDate ? log.timestamp.toDate().toLocaleTimeString() : ''}</span>
                                        </div>
                                        <p className="text-foreground/90 font-bold italic">"{log.event}"</p>
                                    </div>
                                    <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" />
                                </div>
                            ))}
                            {anchoredEvents.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <History className="h-10 w-10 animate-spin text-primary" style={{animationDuration: '10s'}}/>
                                    <p className="text-[10px] font-black uppercase">Scanning Akashic Timelines...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase absolute bottom-0 w-full z-20 h-10 flex items-center justify-center gap-4">
                    <Flame className="h-3.5 w-3.5 text-red-500 animate-pulse" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // TIME_BEND_LOCKED</span>
                </div>
            </Card>
        </div>
    );
}
