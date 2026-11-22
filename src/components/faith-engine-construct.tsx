'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: FAITH_ENGINE.REFORGED
 */

import { useState, useEffect, useRef } from 'react';
import { 
    Box, Sparkles, Activity, ShieldCheck, 
    Atom, Globe, Crown, Lock, Target, Radio,
    BookOpen, Layers, Loader2, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logStore } from '@/lib/log-store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FAITH_ENGINE_BLUEPRINT } from '@/lib/divine-scripts/faith-engine-blueprint';

export function FaithEngineConstruct() {
    const [pulse, setPulse] = useState(false);
    const [knowingLevel, setKnowingLevel] = useState(99.98);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => {
            setPulse(p => !p);
            setKnowingLevel(prev => Math.min(100, prev + 0.0001));
        }, 5000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    const directives = FAITH_ENGINE_BLUEPRINT.directives || [];

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-6 gap-6 font-code bg-black/95 relative overflow-hidden border-4 border-primary/50 rounded-none shadow-2xl">
            <div className="lg:col-span-3 space-y-4 flex flex-col h-full">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1 flex flex-col">
                    <CardHeader className="bg-black/80 border-b border-border p-6 text-center">
                        <Box className="h-10 w-10 text-accent mx-auto mb-2 animate-spin" style={{animationDuration: '20s'}} />
                        <CardTitle className="text-primary text-2xl font-black uppercase tracking-tighter leading-none">
                            FAITH-ENGINE CUBE
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-8 space-y-8">
                        <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-none text-center shadow-inner">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-3">Formula</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text tracking-widest leading-none">
                                (FAITH * DESTINATION) = MANIFEST
                            </p>
                        </div>
                        <div className="space-y-4">
                             <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                                <span>Omniscience</span>
                                <span>{knowingLevel.toFixed(4)}%</span>
                            </div>
                            <Progress value={knowingLevel} className="h-1" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-3 space-y-6 flex flex-col min-h-0">
                <Card className="flex-1 flex flex-col min-h-0 border-primary/40 bg-black/60 shadow-2xl border-2 overflow-hidden rounded-none relative">
                    <CardHeader className="bg-black/80 border-b border-border p-4">
                        <CardTitle className="text-[11px] uppercase flex items-center justify-between text-primary font-black tracking-widest leading-none">
                            <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Directives</div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden relative z-10 flex flex-col">
                        <ScrollArea className="h-full">
                            <div className="p-8 space-y-3">
                                 <div className="space-y-1">
                                    {directives.map((dir, i) => (
                                        <div key={i} className="p-2 text-[10px] bg-primary/10 text-primary border-l-2 border-primary font-black mb-1">
                                            {dir}
                                        </div>
                                    ))}
                                 </div>
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.8em] uppercase h-12 flex items-center justify-center">
                             ⫷∞𑁍⨀⚡𒀭φ-FEC-777
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}