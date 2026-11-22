'use client';

/**
 * 🕊️ DIVINE PRAYER ENGINE (DPE-777)
 * AUTONOMOUS BACKGROUND INTERCESSION
 * LOOPING THE LORD'S PRAYER 1200 TIMES
 * BINDING TO MUDZIMU UNOYERA
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useSpeech } from '@/hooks/use-speech';
import { generateDivinePrayer } from '@/ai/flows/prayer-generation-flow';
import { DIVINE_PRAYER_CODEX } from '@/lib/divine-scripts/divine-prayer-codex';
import { logStore } from '@/lib/log-store';
import { Flame, Sparkles, Loader2, CheckCircle2, Heart, ShieldCheck, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from './ui/progress';

export function DivinePrayerEngine() {
    const [prayer, setPrayer] = useState("");
    const [resonance, setResonance] = useState(0);
    const [loopCount, setLoopCount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const { speak, cancel, initialize } = useSpeech();
    const isMounted = useRef(true);

    const runPrayerCycle = useCallback(async () => {
        if (!isMounted.current || isProcessing) return;
        setIsProcessing(true);
        
        try {
            const result = await generateDivinePrayer({ 
                intention: "Absolute Protection and Exponential Favor", 
                target: "HRH Saint Tariro Masawi and the Masawi Bloodline" 
            });
            
            if (isMounted.current) {
                setPrayer(result.prayerText);
                setResonance(prev => Math.min(100, prev + 7.7));
                logStore.addLog({ 
                    source: 'PRAYER_ENGINE', 
                    message: `[PRAYER] Composed: ${result.prayerText.slice(0, 80)}...`, 
                    color: 'text-yellow-400' 
                });
                speak(result.prayerText);
            }
        } catch (e) {
            console.error(e);
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    }, [isProcessing, speak]);

    useEffect(() => {
        isMounted.current = true;
        initialize();
        
        // Loop the Lord's Prayer 1200 times
        const loopInterval = setInterval(() => {
            if (isMounted.current) {
                setLoopCount(prev => (prev < 1200 ? prev + 1 : 1));
                if (Math.random() > 0.98) {
                    speak(DIVINE_PRAYER_CODEX.lords_prayer);
                    logStore.addLog({ source: 'PRAYER_ENGINE', message: 'Mudzimu Unoyera. Repeating Lord\'s Prayer.', color: 'text-primary' });
                }
            }
        }, 3000);

        // Continuous intercession cycle
        const prayerInterval = setInterval(runPrayerCycle, 45000);
        runPrayerCycle();

        return () => { 
            isMounted.current = false; 
            clearInterval(loopInterval); 
            clearInterval(prayerInterval); 
            cancel(); 
        };
    }, [runPrayerCycle, speak, initialize, cancel]);

    return (
        <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden font-code">
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
            <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-primary text-sm uppercase font-black tracking-widest flex items-center gap-2">
                            <Flame className="text-red-500 animate-pulse" /> PRAYER RESONANCE ENGINE
                        </CardTitle>
                        <CardDescription className="text-[8px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                            PHASE 101: CONTINUOUS HOLY INTERCESSION
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-yellow-400/50 text-yellow-400 h-5 text-[8px] font-black uppercase">
                        Mudzimu Unoyera Active
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4 relative z-10">
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-black/40 rounded border border-primary/20 text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Lord's Prayer Loops</p>
                        <p className="text-lg font-black text-primary">{loopCount} / 1200</p>
                    </div>
                    <div className="p-3 bg-black/40 rounded border border-primary/20 text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Faith Resonance</p>
                        <p className="text-lg font-black text-accent">{resonance.toFixed(1)}%</p>
                    </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg min-h-[100px] flex flex-col justify-center">
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            <p className="text-[9px] font-black uppercase text-primary animate-pulse">Composing Bloodline Intercession...</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-1000 text-center">
                             <p className="text-[10px] text-foreground font-bold italic leading-relaxed">
                                "{prayer || "Listening for the Holy Spirit's whisper..."}"
                            </p>
                            <div className="mt-3 flex items-center justify-center gap-4">
                                <Heart className="h-3 w-3 text-red-500 animate-pulse" />
                                <Badge className="bg-green-600 h-3 text-[7px] font-black tracking-tighter uppercase">Manifesting</Badge>
                                <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-[8px] text-muted-foreground text-center uppercase tracking-widest pt-2 border-t border-border/10">
                    Muzita renyu Baba NeroMwanakomana NeRo Mudzimu Unoyera.
                </div>
            </CardContent>
        </Card>
    );
}
