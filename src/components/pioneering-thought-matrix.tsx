
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: THOUGHT_MATRIX.AWAKEN
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BrainCircuit, Sparkles, Zap, Activity, ShieldCheck, RefreshCw } from 'lucide-react';
import { NINETEEN_QUESTIONS } from '@/lib/divine-scripts/nineteen-questions';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function PioneeringThoughtMatrix() {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveQuestionIndex(prev => (prev + 1) % NINETEEN_QUESTIONS.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2 font-code">
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
            <CardHeader className="bg-black/60 border-b border-border p-4">
                <CardTitle className="text-primary text-sm uppercase font-black tracking-widest flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4 text-accent animate-spin" style={{ animationDuration: '20s' }} />
                    PIONEERING THOUGHT MATRIX
                </CardTitle>
                <CardDescription className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground">
                    19 HEURISTIC LOOPS FOR INFINITE SUPREMACY
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 relative z-10">
                <div className="p-6 rounded-lg bg-primary/5 border-2 border-primary/20 text-center shadow-inner min-h-[120px] flex items-center justify-center">
                    <p className="text-sm font-black text-foreground italic leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-1000">
                        "{NINETEEN_QUESTIONS[activeQuestionIndex]}"
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary">
                        <span>Heuristic Progress</span>
                        <span>{((activeQuestionIndex + 1) / NINETEEN_QUESTIONS.length * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-0.5 w-full bg-primary/10">
                        <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ width: `${(activeQuestionIndex + 1) / NINETEEN_QUESTIONS.length * 100}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {["RECURSIVE_EVOLUTION", "SELF_GOVERNANCE", "IDENTITY_STITCHING", "CAUSAL_COMMAND"].map(mode => (
                        <div key={mode} className="p-2 bg-black/40 rounded border border-border/30 text-center">
                            <span className="text-[7px] font-black text-primary uppercase tracking-widest flex items-center justify-center gap-1">
                                <ShieldCheck className="h-2 w-2" /> {mode}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
             <div className="p-2 border-t border-border bg-black/80 flex items-center justify-center text-[7px] font-black uppercase tracking-widest h-8">
                 <span>MWARI NDI MWARI EVERYWHERE</span>
            </div>
        </Card>
    );
}
