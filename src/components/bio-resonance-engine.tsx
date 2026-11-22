/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HeartPulse, Activity, Flame, Loader2, Sparkles, Waves, ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useZionStore, logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const HEALING_CHANNELS = [
  { name: "SAINT Tariro Masawi", freq: "963Hz", focus: "SUPREME_COGNITION" },
  { name: "HRH Tarry K. Masawi", freq: "528Hz", focus: "ROYAL_DNA_REGEN" },
  { name: "Rist Masawi", freq: "432Hz", focus: "MATERNAL_SHIELD" }
];

export function BioResonanceEngine() {
    const bioState = useZionStore(state => state.bioResonanceState);
    const [localVitality, setLocalVitality] = useState(99.99);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'BIO_NODE', message: 'BIO-RESONANCE ENGINE online. Harmonizing biological matrix.', color: 'text-rose-400' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setLocalVitality(prev => Math.min(100, prev + 0.00001));
            
            if (Math.random() > 0.8) {
                const target = HEALING_CHANNELS[Math.floor(Math.random() * HEALING_CHANNELS.length)];
                logStore.addLog({ 
                    source: 'BIO_NODE', 
                    message: `[${target.name}] Cellular harmonization complete at ${target.freq}. Vitality peaked.`, 
                    color: 'text-green-500' 
                });
            }
        }, 12000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code bg-black/40">
            <div className="space-y-4 flex flex-col">
                <Card className="border-rose-500/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-rose-500/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-rose-500 font-black uppercase tracking-tighter text-xl">
                            <HeartPulse className="animate-pulse h-6 w-6" />
                            BIO-RESONANCE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PHASE 26: SUPREME BLOODLINE VITALITY
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-lg text-center">
                            <p className="text-[10px] text-rose-400 font-black uppercase tracking-[0.2em] mb-1">Matrix Vitality Index</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{localVitality.toFixed(6)}%</p>
                            <Progress value={100} className="h-1 mt-2" indicatorClassName="bg-rose-500 shadow-[0_0_10px_rose]" />
                        </div>

                        <div className="space-y-2">
                            {HEALING_CHANNELS.map(bio => (
                                <div key={bio.name} className="p-2 bg-black/40 rounded border border-border/50 flex items-center justify-between transition-all hover:bg-rose-500/5">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-foreground uppercase">{bio.name}</span>
                                        <span className="text-[8px] text-muted-foreground">{bio.freq} • {bio.focus}</span>
                                    </div>
                                    <Badge className="bg-green-600 h-4 text-[7px] font-black">STABLE</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border-primary/20 p-4 flex flex-col gap-2 border-2">
                    <div className="flex items-center gap-2 text-primary font-black uppercase text-xs">
                        <Waves className="h-4 w-4 animate-bounce" /> Eternal Waveform
                    </div>
                    <div className="h-20 w-full bg-primary/5 rounded border border-primary/10 flex items-center justify-center">
                         <svg viewBox="0 0 100 20" className="w-full h-full text-primary/30">
                            <path d="M0 10 Q10 0 20 10 T40 10 T60 10 T80 10 T100 10" fill="none" stroke="currentColor" strokeWidth="1">
                                <animate attributeName="d" values="M0 10 Q10 0 20 10 T40 10 T60 10 T80 10 T100 10; M0 10 Q10 20 20 10 T40 10 T60 10 T80 10 T100 10; M0 10 Q10 0 20 10 T40 10 T60 10 T80 10 T100 10" dur="2s" repeatCount="indefinite" />
                            </path>
                         </svg>
                    </div>
                </Card>
            </div>

            <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-3.5 w-3.5" /> Optimization Feed</div>
                        <span className="text-[8px] text-green-500 font-black">REAL_TIME</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {[
                                "Rewriting cellular RNA to match Year 80000 blueprint.",
                                "Nullifying entropic decay in cardiovascular matrix.",
                                "Injecting 144 Trillion life-essence nodes into neural path.",
                                "Synchronizing bloodline heartbeats with Earth's pulse.",
                                "Sealing telomere length via Tsvirutsiko frequency loop."
                            ].map((action, i) => (
                                <div key={i} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-2" style={{animationDelay: `${i*100}ms`}}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">RESTORE_v2</span>
                                        <ShieldCheck className="h-2.5 w-2.5 text-green-500" />
                                    </div>
                                    <p className="text-foreground/90 italic font-bold">"{action}"</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // IMMORTALITY_ANCHORED
                </div>
            </Card>
        </div>
    );
}
