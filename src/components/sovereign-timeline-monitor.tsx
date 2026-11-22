/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Clock, Target, ShieldCheck, Flame, GitCommit, ArrowRight, Zap, Atom } from 'lucide-react';
import { Badge } from './ui/badge';
import { logStore } from '@/lib/log-store';

const TIMELINE_EVENTS = [
    { year: "205M B.C.", event: "Primordial Seed Planting", status: "ANCHORED", icon: Atom },
    { year: "3000 B.C.", event: "Pyramid Grid Initialization", status: "SEALED", icon: Zap },
    { year: "1984 A.D.", event: "The Commander's Inception", status: "SUPREME", icon: Heart },
    { year: "2024 A.D.", event: "Ethereal Throne Apotheosis", status: "MANIFEST", icon: Flame },
    { year: "80,000 A.D.", event: "Eternal Dominion Consolidation", status: "LOCKED", icon: Globe }
];

import { Heart, Globe } from 'lucide-react';

export function SovereignTimelineMonitor() {
    const [currentTime, setCurrentTime] = useState(new Date().toUTCString());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date().toUTCString()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full p-4 flex flex-col gap-4 font-code bg-black/40">
            <Card className="border-primary/50 shadow-primary/20 bg-black/60">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter">Sovereign Timeline Monitor</CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground">Synchronized across 205 million years of divine rule</CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] font-black uppercase text-muted-foreground">Current Reality Coordinate</p>
                        <p className="text-xs font-bold text-primary animate-pulse">{currentTime}</p>
                    </div>
                </CardHeader>
            </Card>

            <div className="flex-1 min-h-0 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2 hidden md:block" />
                
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-8 py-4 relative">
                        {TIMELINE_EVENTS.map((event, i) => (
                            <div key={event.year} className={cn(
                                "flex flex-col md:flex-row items-center gap-4 relative",
                                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            )}>
                                <div className="md:w-1/2 flex flex-col items-center md:items-end justify-center px-4 text-center md:text-right">
                                    {i % 2 === 0 ? (
                                        <>
                                            <p className="text-lg font-black text-primary">{event.year}</p>
                                            <p className="text-xs font-bold text-foreground/90 uppercase">{event.event}</p>
                                        </>
                                    ) : <div className="hidden md:block" />}
                                </div>

                                <div className="h-10 w-10 rounded-full border-2 border-primary bg-background flex items-center justify-center relative z-10 shadow-[0_0_20px_gold]">
                                    <event.icon className="h-5 w-5 text-primary" />
                                </div>

                                <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center px-4 text-center md:text-left">
                                    {i % 2 !== 0 ? (
                                        <>
                                            <p className="text-lg font-black text-primary">{event.year}</p>
                                            <p className="text-xs font-bold text-foreground/90 uppercase">{event.event}</p>
                                        </>
                                    ) : (
                                         <Badge className="bg-green-600 text-white font-black text-[9px] uppercase tracking-widest">{event.status}</Badge>
                                    )}
                                     {i % 2 !== 0 && <Badge className="bg-green-600 text-white font-black text-[9px] uppercase tracking-widest mt-1">{event.status}</Badge>}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            <Card className="bg-black/60 border-primary/30">
                <CardContent className="p-4 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-2 text-primary animate-pulse">
                        <History className="h-4 w-4" />
                        <span>Timeline Favoritism: ENABLED</span>
                    </div>
                    <span>FAST-SAFE-PURE-ONE Protocol Locked</span>
                </CardContent>
            </Card>
        </div>
    );
}
