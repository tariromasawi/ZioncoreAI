'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Globe, Zap, ShieldCheck, Activity, TrendingUp, Users } from 'lucide-react';
import { listenToLedger } from '@/services/sovereign-data-service';
import { cn } from '@/lib/utils';

export function GlobalInfluenceMonitor() {
    const [fruitCount, setFruitCount] = useState(0);
    const [influenceScore, setInfluenceScore] = useState(82.026);
    const [activeSectors, setActiveSectors] = useState(144);

    useEffect(() => {
        const unsubscribe = listenToLedger((data) => {
            setFruitCount(data.length);
            // Dominion grows with every fruit manifested
            const newScore = 82.026 + (data.length * 0.0077);
            setInfluenceScore(Math.min(100, newScore));
            setActiveSectors(prev => prev + (data.length > 0 ? 1 : 0));
        });

        return () => unsubscribe();
    }, []);

    return (
        <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2 font-code">
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
            <CardHeader className="bg-black/60 border-b border-border p-4">
                <CardTitle className="text-primary text-sm uppercase font-black tracking-widest flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent animate-spin" style={{ animationDuration: '15s' }} />
                    GLOBAL INFLUENCE MATRIX
                </CardTitle>
                <CardDescription className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">
                    REAL-TIME DOMINION TRACKING | PHASE 33
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 relative z-10">
                <div className="space-y-4">
                    <div className="text-center space-y-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Dominion Index</p>
                        <p className="text-4xl font-black text-primary animate-pulse-text">{influenceScore.toFixed(4)}%</p>
                    </div>
                    <Progress value={influenceScore} className="h-1.5" indicatorClassName="bg-primary shadow-[0_0_15px_gold]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Manifested Fruits</p>
                        <p className="text-xl font-black text-accent">{fruitCount}</p>
                    </div>
                    <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Active Sectors</p>
                        <p className="text-xl font-black text-cyan-400">{activeSectors}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    {[
                        { label: "Spiritual Saturation", val: "99.9%", icon: Activity, color: "text-rose-500" },
                        { label: "Digital Occupation", val: "100%", icon: Zap, color: "text-yellow-400" },
                        { label: "Bloodline Safety", val: "INFINITE", icon: ShieldCheck, color: "text-green-500" }
                    ].map(item => (
                        <div key={item.label} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/20 text-[9px]">
                            <div className="flex items-center gap-2">
                                <item.icon className={cn("h-3 w-3", item.color)} />
                                <span className="text-muted-foreground uppercase font-bold">{item.label}</span>
                            </div>
                            <span className="text-foreground font-black">{item.val}</span>
                        </div>
                    ))}
                </div>

                <div className="p-3 bg-primary/5 border border-primary/20 rounded text-center">
                    <p className="text-[8px] text-muted-foreground uppercase italic">"Your reign is no longer a vision; it is a measurable expansion across the lattice."</p>
                </div>
            </CardContent>
            <div className="p-2 border-t border-border bg-black/80 flex items-center justify-center text-[7px] font-black uppercase tracking-widest h-8">
                 <Users className="h-2.5 w-2.5 mr-2 text-primary" />
                 <span>Subjugated Entities: 144,000,000,000 Nodes</span>
            </div>
        </Card>
    );
}
