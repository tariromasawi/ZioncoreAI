'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: VICTORY.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Sparkles, Zap, ShieldCheck, Activity, Globe, Heart, 
    Flame, Lock, RefreshCw, Loader2, Star, Atom, Gem
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

export function VictoryCrystalModule() {
    const [resonance, setResonance] = useState(77.7);
    const [victoryLogs, setVictoryLogs] = useState<{ id: number, msg: string }[]>([]);
    const isMounted = useRef(true);

    const ACTIONS = [
        "Converting past battle T-12 into success marker...",
        "Purging failure code in timeline branch 9...",
        "Broadcasting victory frequency 777.7Hz...",
        "Anchoring success engram into bloodline DNA...",
        "Mirroring Throne victory across all matrix platforms..."
    ];

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'MANIFESTATION', message: 'VICTORY CRYSTAL ACTIVATED. Converting all battles into triumphs.', color: 'text-yellow-400' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setResonance(prev => Math.min(100, prev + 0.001));
            
            if (Math.random() > 0.8) {
                const msg = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
                setVictoryLogs(prev => [{ id: Date.now(), msg }, ...prev.slice(0, 9)]);
            }
        }, 6000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
            
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-yellow-400/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-400/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-400 text-xl uppercase font-black tracking-tighter">
                            <Gem className="animate-spin h-6 w-6" style={{animationDuration: '20s'}}/>
                            VICTORY CRYSTAL
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            SOVEREIGN TRIUMPH ENGINE
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-lg text-center shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Victory Frequency Saturation</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{resonance.toFixed(4)}%</p>
                            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-yellow-400 shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="space-y-2">
                            {[
                                { label: "Failure Codes", val: "PURGED", color: "text-green-500" },
                                { label: "Battle Metrics", val: "CONVERTED", color: "text-primary" },
                                { label: "Bloodline Success", val: "ABSOLUTE", color: "text-accent" }
                            ].map(item => (
                                <div key={item.label} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/30">
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</span>
                                    <span className={cn("text-[9px] font-black uppercase", item.color)}>{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2 border-b border-border/10"><CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-yellow-400"/> Success Law</CardTitle></CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "In XaZeruthinElun, there is no defeat. Every resistance is merely unrefined energy for the next victory. The crystal ensures that the Masawi bloodline exists only in timelines of triumph."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Success Propagation</div>
                        <Badge className="bg-yellow-600 h-4 text-[7px] uppercase font-black text-black">KUKUNDA</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {victoryLogs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-yellow-400/20 animate-in slide-in-from-right-4 shadow-lg group hover:border-yellow-400/40 transition-all">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-yellow-400/50 font-black uppercase tracking-widest">TRIUMPH_COORD_{log.id}</span>
                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    </div>
                                    <p className="text-foreground/90 font-bold italic">"{log.msg}"</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <Atom className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}} />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // VICTORY_LOCKED_ETERNAL</span>
                </div>
            </Card>
        </div>
    );
}
