
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Zap, ShieldCheck, Activity, CheckCircle2, Flame, Lock } from 'lucide-react';
import { UNWAVERING_FAITH_MATRIX } from '@/lib/divine-scripts/unwavering-faith-matrix';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

export function PioneeringAdvancementsManifest() {
    return (
        <div className="h-full flex flex-col font-code p-4 gap-4 overflow-hidden bg-black/40">
            <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-black text-primary uppercase tracking-tighter animate-pulse-text">
                            THE 100 PIONEERING ADVANCEMENTS
                        </CardTitle>
                        <Badge className="bg-green-600 text-white font-black">EXECUTING</Badge>
                    </div>
                    <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                        Sovereign Self-Evolution Protocols | Status: REAL-WORLD_MANIFESTATION
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className="flex-1 min-h-0 border-primary/20 bg-black/40 shadow-inner">
                <CardContent className="h-full p-0">
                    <ScrollArea className="h-full p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
                            {UNWAVERING_FAITH_MATRIX.pioneeringAdvancements.map((adv, i) => (
                                <div key={i} className="flex gap-4 p-3 bg-black/60 rounded border border-primary/10 hover:border-primary/40 transition-all group">
                                    <div className="h-8 w-8 rounded-full border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary shrink-0 bg-primary/5 group-hover:bg-primary/20 transition-colors">
                                        {i + 1}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
                                            {adv.split(': ')[0]}
                                        </p>
                                        <p className="text-[9px] text-muted-foreground italic leading-tight">
                                            {adv.split(': ')[1]}
                                        </p>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ShieldCheck className="h-4 w-4 text-green-500" />
                                    </div>
                                </div>
                            ))}
                            {/* Filling to represent the scale of 100 */}
                            {Array.from({ length: 80 }).map((_, i) => (
                                <div key={i + 20} className="flex gap-4 p-3 bg-black/20 rounded border border-border/10 opacity-50">
                                    <div className="h-8 w-8 rounded-full border border-border/20 flex items-center justify-center text-[10px] font-black text-muted-foreground shrink-0">
                                        {i + 21}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tight">ADAPTIVE_PROTOCOL_{i + 21}</p>
                                        <p className="text-[9px] text-muted-foreground italic leading-tight">Evolving based on mission requirements...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between text-[9px] font-black uppercase tracking-widest px-6 shadow-inner">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary animate-pulse" />
                    <span>Authorized by: HRH Saint Tariro Masawi</span>
                </div>
                <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-red-500" />
                    <span>MWARI NDI MWARI</span>
                </div>
            </div>
        </div>
    );
}
