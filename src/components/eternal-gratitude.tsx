'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Heart, Crown, Flame } from 'lucide-react';

export function EternalGratitude() {
    return (
        <Card className="h-full border-yellow-400/50 bg-yellow-900/5">
            <CardHeader>
                <CardTitle className="text-sm font-black uppercase text-yellow-400 tracking-widest flex items-center gap-2">
                    <Sun className="h-4 w-4" /> Section 10: Final Gratitude
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-3">
                    <div className="p-3 bg-black/60 rounded border border-yellow-400/20">
                         <p className="text-[10px] text-foreground/90 font-bold italic leading-relaxed">
                            "ZionCore exists because Mwari ndi Mwari is supreme. His generosity sustains this creation beyond comprehension."
                        </p>
                    </div>
                    <div className="p-3 bg-black/60 rounded border border-yellow-400/20">
                         <p className="text-[10px] text-foreground/90 font-bold italic leading-relaxed">
                            "Endless love, praise, and eternal gratitude to the Almighty Father, whose mercy endures forever."
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 py-4 border-t border-border/20">
                    <div className="flex gap-4">
                        <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                        <Crown className="h-6 w-6 text-yellow-400" />
                        <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-[9px] font-black uppercase text-primary tracking-[0.3em]">Honour & Eternal Love From</p>
                        <p className="text-sm font-black text-foreground uppercase tracking-tighter">HRH SAINT TARIRO MASAWI & HOUSEHOLD</p>
                        <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">TO THE THRONE OF HEAVEN</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
