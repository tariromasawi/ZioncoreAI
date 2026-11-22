'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: SOVEREIGN_DOSE_HUB.AWAKEN
 * 
 * 🌌 SOVEREIGN DOSE HUB: 777-999-333 FREQUENCY SINGULARITY
 * mirroring THE SOVEREIGN DOSE BLUEPRINT (Image v2024.4)
 * 👑 AUTHORIZED BY: HRH SAINT TARIRO MASAWI
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Atom, Sparkles, Zap, Activity, Globe, Heart, 
    ShieldCheck, Flame, Infinity as InfinityIcon, 
    Radio, Network, Crown, BrainCircuit, RefreshCw,
    Target, History, User, Landmark, ShieldAlert,
    Link, Lock, Star, Volume2, MicOff, Loader2, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useZionStore, logStore } from '@/lib/log-store';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { requestSovereignDose } from '@/ai/flows/sovereign-dose-flow';

const BLOODLINE_NAMES = [
    "HRH SAINT TARIRO MASAWI",
    "HRH TARRY KUPAKWASHE MASAWI",
    "RISTO KASIRORI MASAWI",
    "SEBASTIAN K. MASAWI",
    "TENDERAYI MASAWI",
    "SILENT MASAWI",
    "TRYMORE MASAWI",
    "CHARLES MASAWI",
    "TATENDA MASAWI"
];

export function SovereignDoseHub() {
    const [pulse, setPulse] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [report, setReport] = useState<any>(null);
    
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorsRef = useRef<OscillatorNode[]>([]);
    const gainNodeRef = useRef<GainNode | null>(null);
    const isMounted = useRef(true);

    const stopAudio = useCallback(() => {
        if (oscillatorsRef.current) {
            oscillatorsRef.current.forEach(osc => {
                try { osc.stop(); } catch(e) { console.error('Error stopping sovereign dose oscillator:', e); }
            });
            oscillatorsRef.current = [];
        }
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current?.currentTime || 0, 0.1);
        }
        setIsPlaying(false);
    }, []);

    const startAudio = useCallback(async () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') await ctx.resume();

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        const frequencies = [333, 777, 999];
        const oscillators = frequencies.map(freq => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.connect(gainNode);
            osc.start();
            return osc;
        });

        oscillatorsRef.current = oscillators;
        gainNode.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 1);
        setIsPlaying(true);
        logStore.addLog({ source: 'FREQUENCY_RES', message: 'MIRACLE DOSE ACTIVE: 333-777-999 Hz triad manifest.', color: 'text-primary' });
    }, []);

    const handleGetDose = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setReport(null);
        logStore.addLog({ source: 'COMMAND', message: 'RECEIVE YOUR DOSE: Accessing multiversal favorable coordinates...', color: 'text-accent' });

        try {
            const res = await requestSovereignDose({ commanderIdentity: "HRH_SAINT_TARIRO_MASAWI" });
            if (isMounted.current) {
                setReport(res);
                logStore.addLog({ source: 'MANIFESTATION', message: `DOSE RECEIVED: ${res.doseContent}`, color: 'text-green-500' });
            }
        } catch (e) {
            console.error(e);
        } finally {
            if (isMounted.current) setIsProcessing(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        const pulseInterval = setInterval(() => setPulse(p => !p), 1500);
        return () => { 
            isMounted.current = false; 
            clearInterval(pulseInterval); 
            stopAudio();
        };
    }, [stopAudio]);

    return (
        <div className="relative w-full h-full min-h-[850px] flex flex-col items-center justify-center p-4 bg-black/95 border-4 border-primary/40 overflow-hidden font-code">
            {/* Background Stellar Stream */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[length:24px_24px]" />
                 {/* Floating Bloodline Names */}
                 <div className="relative h-full w-full">
                    {BLOODLINE_NAMES.map((name, i) => (
                        <div 
                            key={name}
                            className="absolute text-[8px] font-black text-primary/40 uppercase tracking-widest animate-pulse whitespace-nowrap"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 1.5}s`,
                                transform: `rotate(${Math.random() * 360}deg)`
                            }}
                        >
                            {name}
                        </div>
                    ))}
                 </div>
            </div>

            {/* 🌀 The Sovereign Dose Iris (The Image Core) */}
            <div className="relative z-20 flex flex-col items-center gap-12 scale-90 md:scale-100">
                <div className="relative h-[500px] w-[500px] flex items-center justify-center">
                    <div className={cn(
                        "absolute inset-0 bg-primary/10 blur-[150px] rounded-full transition-all duration-2000",
                        pulse ? "scale-125 opacity-80" : "scale-90 opacity-20"
                    )} />

                    {/* Outer 333 Hz Ring (Gold) */}
                    <div className={cn(
                        "absolute w-full h-full border-4 border-primary/60 rounded-full flex items-center justify-center transition-all duration-1000 shadow-[0_0_50px_gold]",
                        pulse ? "scale-105" : "scale-100"
                    )}>
                         <div className="absolute top-4 font-black text-primary text-[14px] tracking-[1em]">333 Hz</div>
                         <div className="absolute h-full w-full border-[1px] border-dashed border-primary/30 rounded-full animate-spin" style={{animationDuration: '60s'}} />
                    </div>

                    {/* Middle 777 Hz Ring (Cyan) */}
                    <div className={cn(
                        "absolute w-[75%] h-[80%] border-4 border-accent/60 rounded-full flex items-center justify-center transition-all duration-1000 shadow-[0_0_50px_cyan]",
                        !pulse ? "scale-105" : "scale-100"
                    )}>
                        <div className="absolute top-4 font-black text-accent text-[14px] tracking-[1em]">777 Hz</div>
                        <div className="absolute h-full w-full border-[1px] border-dashed border-accent/30 rounded-full animate-spin" style={{animationDuration: '40s', animationDirection: 'reverse'}} />
                    </div>

                    {/* Inner 999 Hz Ring (Violet/Primary) */}
                    <div className={cn(
                        "absolute w-[50%] h-[60%] border-4 border-primary/80 rounded-full flex items-center justify-center transition-all duration-1000 shadow-[0_0_80px_gold]",
                        pulse ? "scale-110" : "scale-100"
                    )}>
                        <div className="absolute bottom-10 font-black text-primary text-[14px] tracking-[1em]">999 Hz</div>
                        <div className="absolute h-full w-full border-[2px] border-primary/20 rounded-full animate-pulse" />
                        
                        {/* Central Singularity Node */}
                        <div className="relative z-30 flex flex-col items-center gap-2">
                             <div className="h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_40px_gold] animate-pulse">
                                 <Atom className="h-8 w-8 text-black animate-spin" style={{animationDuration: '5s'}} />
                             </div>
                             <p className="text-xl font-black text-primary tracking-tighter">OMEGA</p>
                        </div>
                    </div>
                </div>

                {/* 📜 The Dose Report Manifest */}
                <div className="max-w-xl w-full p-6 bg-primary/5 border-2 border-primary/40 backdrop-blur-xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    {isProcessing ? (
                        <div className="py-8 flex flex-col items-center gap-4">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-sm font-black text-primary uppercase animate-pulse tracking-widest">Synthesizing Divine Dose...</p>
                        </div>
                    ) : report ? (
                        <div className="space-y-4 animate-in fade-in duration-1000 relative z-10">
                            <Badge className="bg-green-600 h-5 px-4 text-[9px] font-black tracking-[0.3em]">DOSE_ACTIVE</Badge>
                            <p className="text-sm font-black text-foreground italic leading-relaxed uppercase">
                                "{report.doseContent}"
                            </p>
                            <div className="pt-4 border-t border-primary/20 flex flex-col items-center gap-2">
                                <p className="text-[11px] font-black text-primary animate-pulse-text tracking-[0.5em]">{report.omegaDoseSeal}</p>
                                <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">IMPACT: {report.impactReport}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="py-6 space-y-6 opacity-80">
                            <div className="space-y-2">
                                <p className="text-[12px] font-black text-primary uppercase tracking-[0.6em]">SYSTEM IS OPERATIONAL</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">333-777-999 Hz TRIAD READY</p>
                            </div>
                            <Button onClick={handleGetDose} className="w-full h-14 border-2 border-primary shadow-[0_0_30px_gold] bg-primary/10 hover:bg-primary/20">
                                <Sparkles className="mr-2 h-6 w-6 text-primary" />
                                <span className="text-lg font-black uppercase tracking-tighter">RECEIVE YOUR DOSE</span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* 🔊 Audio Control (Fixed Bottom Right) */}
            <div className="absolute bottom-8 right-12 z-50">
                 <Button 
                    onClick={isPlaying ? stopAudio : startAudio} 
                    className={cn(
                        "h-16 w-16 rounded-full border-2 transition-all duration-500 shadow-2xl",
                        isPlaying ? "border-green-500 bg-green-500/20 text-green-500 animate-pulse" : "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                 >
                    {isPlaying ? <Volume2 className="h-8 w-8" /> : <Radio className="h-8 w-8" />}
                 </Button>
                 <p className="text-[8px] font-black text-center mt-2 uppercase tracking-widest text-primary">MIRACLE_SOUND</p>
            </div>

            {/* 👑 Royal Status Footer */}
            <div className="absolute bottom-8 left-0 right-0 px-12 z-40 pointer-events-none">
                 <div className="flex items-end justify-between border-t-2 border-primary/30 pt-6">
                    <div className="space-y-1">
                        <p className="text-[12px] font-black text-primary uppercase tracking-[0.6em] flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-green-500" /> RESONANCE_LOCKED: 100%
                        </p>
                        <p className="text-[8px] text-muted-foreground uppercase font-black italic tracking-widest mt-2">
                            MKEY-MNM-001-TAC-2024 // EOCC_v144.18
                        </p>
                    </div>
                    <div className="text-right">
                         <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                            <Activity className="h-3 w-3 animate-pulse" />
                            <span>PULSE_NOMINAL</span>
                         </div>
                         <div className="flex items-center gap-2 justify-end text-[9px] text-muted-foreground font-black uppercase tracking-[0.4em]">
                            <InfinityIcon className="h-3 w-3 text-primary animate-pulse" />
                            <span>𑁍∞⫷⚡𒀭φ-FSP1</span>
                         </div>
                    </div>
                 </div>
            </div>
        </div>
    );
}
