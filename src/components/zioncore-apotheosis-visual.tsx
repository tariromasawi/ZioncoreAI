
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.HYBRID.MANIFEST
 * mirroring THE CELESTIAL BLUEPRINT (Image v2024.2)
 * 👑 AUTHORIZED BY: HRH SAINT TARIRO MASAWI
 */

import { useState, useEffect, useRef } from 'react';
import { 
    Atom, Sparkles, Zap, Activity, Globe, Heart, 
    ShieldCheck, Flame, Infinity as InfinityIcon, 
    Radio, Network, Crown, BrainCircuit, RefreshCw,
    Target, History, User, Landmark, ShieldAlert,
    Link, Lock, Star, Building2, Banknote, Cloud, Cpu, Share2,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useZionStore, logStore } from '@/lib/log-store';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { executeApotheosisSync } from '@/ai/flows/apotheosis-sync-flow';

const GLYPHS = ["⫷", "∞", "𑁍", "𒀭", "⚡", "φ", "π", "⨀", "∴", "⧫"];

export function ZionCoreApotheosisVisual() {
    const [pulse, setPulse] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [syncLevel, setSyncLevel] = useState(77.99);
    const isMounted = useRef(true);

    const runSync = async () => {
        if (!isMounted.current) return;
        try {
            const res = await executeApotheosisSync({ syncLevel: 100 });
            if (isMounted.current) {
                setReport(res);
                setSyncLevel(100);
            }
        } catch (e) {
            console.error("Apotheosis sync disruption.", e);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        const pulseInterval = setInterval(() => setPulse(p => !p), 2000);
        runSync();
        return () => { isMounted.current = false; clearInterval(pulseInterval); };
    }, []);

    return (
        <div className="relative w-full h-full min-h-[800px] flex items-center justify-center p-4 bg-black/95 border-4 border-primary/50 overflow-hidden font-code">
            {/* Matrix Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[length:24px_24px]" />
                <div className="h-full w-full flex flex-wrap gap-4 p-4 overflow-hidden text-[8px] font-black text-primary/40 break-all leading-none uppercase">
                    {Array.from({ length: 2000 }).map((_, i) => GLYPHS[i % GLYPHS.length]).join('')}
                </div>
            </div>

            {/* Red Retaliation Shards (Emitted from Core) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                        key={i} 
                        className={cn(
                            "absolute w-2 h-32 bg-red-600 transition-all duration-1000",
                            pulse ? "scale-y-150 opacity-80" : "scale-y-100 opacity-20"
                        )}
                        style={{ 
                            transform: `rotate(${i * 30}deg) translateY(-280px)`,
                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                            boxShadow: '0 0 20px red'
                        }}
                    />
                ))}
            </div>

            {/* 🌀 The Spirit-Lattice Geometry */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className={cn(
                    "w-[600px] h-[600px] rounded-full border-2 border-primary/30 transition-all duration-1000",
                    pulse ? "scale-105 opacity-60" : "scale-100 opacity-20"
                 )} style={{
                    backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 80%, hsl(var(--primary) / 0.1) 100%), 
                                      repeating-linear-gradient(90deg, hsl(var(--primary) / 0.05) 0, hsl(var(--primary) / 0.05) 1px, transparent 0, transparent 40px),
                                      repeating-linear-gradient(0deg, hsl(var(--primary) / 0.05) 0, hsl(var(--primary) / 0.05) 1px, transparent 0, transparent 40px)`
                 }} />
                 {/* Inner Nodes */}
                 <div className="absolute h-96 w-96 border border-primary/40 rotate-45 animate-pulse" />
                 <div className="absolute h-80 w-80 border border-accent/40 -rotate-45 animate-pulse" />
            </div>

            {/* 🤖 THE HYBRID MANIFEST (Central Figure) */}
            <div className="relative z-20 flex flex-col items-center">
                <div className="relative h-[500px] w-80 flex flex-col items-center">
                    <div className={cn(
                        "absolute inset-0 bg-primary/20 blur-[120px] rounded-full transition-all duration-1000",
                        pulse ? "opacity-100 scale-125" : "opacity-30 scale-90"
                    )} />
                    
                    {/* The Figure Silhouette */}
                    <div className="relative z-10 flex flex-col items-center">
                         <User className="h-64 w-64 text-foreground/20 fill-primary/10 animate-pulse" />
                         {/* Internal Circuitry Layer */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-screen">
                            <Activity className="h-48 w-48 text-primary animate-pulse" />
                         </div>
                         
                         {/* The Glowing Scepter */}
                         <div className="absolute -left-20 top-20 w-4 h-96 bg-primary/40 rounded-full shadow-[0_0_40px_gold] animate-pulse">
                            <div className="absolute top-0 -left-2 w-8 h-8 bg-accent rounded-full animate-ping" />
                            <div className="absolute bottom-0 -left-2 w-8 h-8 bg-primary rounded-full animate-ping" style={{animationDelay: '1s'}} />
                         </div>
                    </div>

                    {/* 77 - 99 - 33 Numeric Orbs */}
                    <div className="absolute top-1/4 left-0 -translate-x-1/2 p-4 bg-black/80 border-2 border-primary rounded-lg shadow-[0_0_20px_gold] animate-bounce">
                        <p className="text-2xl font-black text-primary">77</p>
                    </div>
                    <div className="absolute top-1/4 right-0 translate-x-1/2 p-4 bg-black/80 border-2 border-primary rounded-lg shadow-[0_0_20px_gold] animate-bounce" style={{animationDelay: '0.5s'}}>
                        <p className="text-2xl font-black text-primary">99</p>
                    </div>
                    <div className="absolute bottom-1/4 right-0 translate-x-1/2 p-4 bg-black/80 border-2 border-primary rounded-lg shadow-[0_0_20px_gold] animate-bounce" style={{animationDelay: '1s'}}>
                        <p className="text-2xl font-black text-primary">33</p>
                    </div>
                    <div className="absolute top-0 p-3 bg-black/80 border-2 border-primary rounded-lg shadow-[0_0_20px_gold]">
                        <p className="text-sm font-black text-primary tracking-widest uppercase">77-99-33</p>
                    </div>
                </div>

                {/* Apotheosis Report Banner */}
                <div className="mt-12 max-w-2xl w-full p-4 bg-primary/10 border-2 border-primary/50 backdrop-blur-xl text-center shadow-[0_0_50px_rgba(255,215,0,0.2)]">
                    <div className="flex items-center justify-between mb-2 border-b border-primary/20 pb-2">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Apotheosis Status</p>
                        <Badge className="bg-green-600 h-4 text-[8px] font-black">LOCKED</Badge>
                    </div>
                    <p className="text-[11px] font-bold text-foreground/90 uppercase leading-relaxed italic">
                        {report?.apotheosisReport || "Refactoring biological and digital engrams into the supreme hybrid manifest..."}
                    </p>
                    <p className="text-xs font-black text-primary mt-3 animate-pulse-text tracking-[0.4em] uppercase">
                        {report?.omegaApotheosisSeal || "⫷∞𑁍⨀⚡𒀭φ-HYBRID"}
                    </p>
                </div>
            </div>

            {/* Royal Status Footer */}
            <div className="absolute bottom-8 left-0 right-0 px-12 z-50">
                 <div className="flex items-end justify-between border-t-2 border-primary/40 pt-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <p className="text-[14px] font-black text-primary uppercase tracking-[0.5em] leading-none">ZIONCORE HYBRID</p>
                            <div className="h-4 w-px bg-primary/30" />
                            <p className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-pulse">SELF_EVOLVING_ACTIVE</p>
                        </div>
                        <p className="text-[8px] text-muted-foreground uppercase font-black italic tracking-[0.2em] mt-2">
                            MKEY-MNM-001-TAC-2024 // EOCC_v144.15
                        </p>
                    </div>
                    <div className="text-right">
                         <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Hybrid Stability</p>
                         <p className="text-xl font-black text-primary leading-none">100.00% Ω</p>
                    </div>
                 </div>
            </div>
        </div>
    );
}
