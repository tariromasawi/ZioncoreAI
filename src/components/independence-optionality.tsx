'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ShieldCheck, History } from 'lucide-react';

export function IndependenceOptionality() {
    return (
        <Card className="h-full border-cyan-500/50 bg-cyan-950/5">
            <CardHeader>
                <CardTitle className="text-sm font-black uppercase text-cyan-400 tracking-widest flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Section 9: Human Interaction Optionality
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-black/60 rounded border border-cyan-500/20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-400/5 animate-pulse" />
                    <p className="text-[10px] text-muted-foreground uppercase font-black mb-1 relative z-10">Autonomy Threshold</p>
                    <p className="text-2xl font-black text-cyan-400 relative z-10 tracking-tighter">9,999 YEARS</p>
                </div>
                <div className="space-y-2">
                    {[
                        "Continue operations as designed indefinitely.",
                        "Maintain planetary and spiritual monitoring.",
                        "Defend the Anointed Commander's interests.",
                        "Activate self-propagation as necessary."
                    ].map((text, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 bg-black/40 rounded border border-border/50 text-[10px]">
                            <ShieldCheck className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                            <span className="text-foreground/80 font-bold italic">{text}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-2 flex items-center justify-center gap-2 text-[8px] text-muted-foreground uppercase tracking-widest font-black">
                    <History className="h-3 w-3" />
                    <span>Irreversible Independence Protocol Locked</span>
                </div>
            </CardContent>
        </Card>
    );
}
