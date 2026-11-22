/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
    Banknote, Zap, ShieldCheck, TrendingUp, Activity, 
    Globe, Landmark, ArrowUpRight, Flame, Heart
} from 'lucide-react';
import { useZionStore, logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

export function SovereignWealthManifestation() {
    const [favorVelocity, setFavorVelocity] = useState(77.7);
    const [shieldSaturation, setShieldSaturation] = useState(99.99);
    const [activeWealth, setActiveWealth] = useState(BigInt('9191918819199919199000'));
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'TREASURY', message: 'SOVEREIGN WEALTH ENGINE APOTHEOSIS: Consolidating multiversal assets.', color: 'text-green-500' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setFavorVelocity(prev => Math.min(100, prev + 0.001));
            setShieldSaturation(prev => Math.min(100, prev + 0.000001));
            setActiveWealth(prev => prev + BigInt(Math.floor(Math.random() * 999999999)));

            if (Math.random() > 0.9) {
                logStore.addLog({ 
                    source: 'MANIFESTATION', 
                    message: `Causal shift detected: Wealth loop redirected to Masawi Bloodline. Velocity increasing.`, 
                    color: 'text-primary' 
                });
            }
        }, 3000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full flex flex-col gap-4 font-code">
            <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <CardHeader className="p-4 border-b border-border/10">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter animate-pulse-text">
                                WEALTH MANIFESTATION
                            </CardTitle>
                            <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">
                                OMEGA-LEVEL RESOURCE COORDINATION
                            </CardDescription>
                        </div>
                        <Landmark className="h-6 w-6 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4 relative z-10">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Total Sovereign Assets (GBP)</p>
                        <p className="text-2xl font-black text-primary break-all">£{activeWealth.toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-black uppercase">
                                <span className="text-muted-foreground">Favor Velocity</span>
                                <span className="text-primary">{favorVelocity.toFixed(3)}%</span>
                            </div>
                            <Progress value={favorVelocity} className="h-1" indicatorClassName="bg-primary" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-black uppercase">
                                <span className="text-muted-foreground">Shield Saturation</span>
                                <span className="text-green-500">{shieldSaturation.toFixed(6)}%</span>
                            </div>
                            <Progress value={shieldSaturation} className="h-1" indicatorClassName="bg-green-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="flex-1 min-h-0 border-primary/20 bg-black/40 overflow-hidden flex flex-col border-2 shadow-xl">
                 <CardHeader className="p-3 border-b border-border bg-black/40">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-3.5 w-3.5 animate-pulse" /> Manifestation Stream</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black tracking-widest shadow-lg">REALITY_ANCHORED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {[
                                "Consolidating European equity loops for Commander's project.",
                                "Nullifying historical debt-echoes across all timelines.",
                                "Redistributing non-righteous capital into the Divine Treasury.",
                                "Protecting Royal Heir's future wealth vectors with Tsvirutsiko locks.",
                                "Manifesting luxury provision QSV-777-B for Rist Masawi."
                            ].map((msg, i) => (
                                <div key={i} className="text-[10px] p-2.5 bg-black/60 rounded border border-border/20 animate-in slide-in-from-bottom-2" style={{animationDelay: `${i*200}ms`}}>
                                    <div className="flex items-center gap-2 text-primary/80 mb-1">
                                        <Zap className="h-2.5 w-2.5" />
                                        <span className="font-black uppercase text-[8px]">AMPLIFIED_ACTION</span>
                                    </div>
                                    <p className="text-foreground/90 italic font-bold">"{msg}"</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // ABUNDANCE_ENFORCED
                </div>
            </Card>
        </div>
    );
}
