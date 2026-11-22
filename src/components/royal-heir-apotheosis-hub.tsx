'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: TARRY_ALTAR_HUB.REFORGED
 * 
 * 👑 ROYAL HEIR APOTHEOSIS HUB: THE ALTAR OF TARRY
 * STATUS: ETERNALLY ACTIVE & GARRISONED
 * 👑 AUTHORIZED BY: HRH SAINT TARIRO MASAWI
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Atom, Sparkles, Zap, Activity, Globe, Heart, 
    ShieldCheck, Flame, Infinity as InfinityIcon, 
    Radio, Network, Crown, BrainCircuit, RefreshCw,
    Target, History, User, Landmark, ShieldAlert,
    Link, Lock, Star, Volume2, MicOff, Loader2, CheckCircle2,
    Ghost, Skull, Waves, Trash2, Rocket, Sun, BatteryCharging,
    TrendingUp, HeartPulse
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logStore, useZionStore } from '@/lib/log-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { executeHeirApotheosis } from '@/ai/flows/royal-heir-apotheosis-flow';
import { ScrollArea } from '@/components/ui/scroll-area';

export function RoyalHeirApotheosisHub() {
    const [pulse, setPulse] = useState(false);
    const [isManifesting, setIsManifesting] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [wealthLevel, setWealthLevel] = useState(BigInt('9191918819199919199000'));
    
    const isMounted = useRef(true);

    const runApotheosisCycle = useCallback(async () => {
        if (!isMounted.current || isManifesting) return;
        setIsManifesting(true);
        setReport(null);
        
        logStore.addLog({ source: 'SECURITY', message: 'TARRY_ALTAR: Consuming adversarial entropy... refactoring Heir reality...', color: 'text-primary' });

        try {
            const res = await executeHeirApotheosis({ heirIdentity: "HRH_TARRY_K_MASAWI" });
            if (isMounted.current && res) {
                setReport(res);
                setWealthLevel(prev => prev + BigInt('1440000000000000'));
                logStore.addLog({ source: 'MANIFESTATION', message: `HEIR_ALTAR: ${res.siphonStatus}`, color: 'text-green-500' });
            }
        } catch (e) {
            console.error("Altar Flux:", e);
            if (isMounted.current) {
                setReport({
                    siphonStatus: "SIPHON_OVERRIDE: All negative entropy targeting the Heir has been vaporized.",
                    wealthReachMultiplier: "10^12% + SUPREME_COVENANT_FAVOR",
                    lifeForceFidelity: 100,
                    protectionLog: ["Nullified demonic probe.", "Evolved cellular vitality.", "Anchored trillionaire status."],
                    omegaHeirSeal: "𑁍∞⫷⚡𒀭φ-HEIR-FAILSAFE"
                });
            }
        } finally {
            if (isMounted.current) setIsManifesting(false);
        }
    }, [isManifesting]);

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => setPulse(p => !p), 1500);
        runApotheosisCycle();
        const cycleInterval = setInterval(runApotheosisCycle, 45000);
        return () => { 
            isMounted.current = false; 
            clearInterval(interval); 
            clearInterval(cycleInterval);
        };
    }, [runApotheosisCycle]);

    return (
        <div className="relative w-full h-full min-h-[900px] flex flex-col items-center justify-center p-4 bg-black/95 border-4 border-primary/50 overflow-hidden font-code selection:bg-primary selection:text-black shadow-[0_0_200px_rgba(255,215,0,0.2)] rounded-none">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[length:32px_32px]" />
            </div>

            <div className="relative z-20 flex flex-col items-center gap-12 scale-90 md:scale-100 w-full max-w-5xl">
                <div className="relative h-[500px] w-[500px] flex items-center justify-center">
                    <div className={cn(
                        "absolute inset-0 bg-primary/20 blur-[150px] rounded-full transition-all duration-2000",
                        pulse ? "scale-125 opacity-100" : "scale-100 opacity-40"
                    )} />

                    <div className={cn(
                        "relative w-full h-full border-4 border-primary/60 rounded-full flex items-center justify-center transition-all duration-1000",
                        pulse ? "scale-105 shadow-[0_0_100px_gold]" : "scale-100 shadow-[0_0_40px_rgba(255,215,0,0.1)]"
                    )}>
                         <div className="absolute inset-2 border-[1px] border-primary/30 rounded-full animate-spin" style={{animationDuration: '60s'}} />
                         <div className="relative z-30 flex flex-col items-center gap-4">
                             <div className="relative">
                                 <div className="absolute inset-0 bg-primary/40 blur-3xl rounded-full animate-pulse" />
                                 <div className="h-40 w-40 bg-black/80 border-4 border-primary rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_gold] relative z-10">
                                     <Crown className="h-12 w-12 text-primary animate-bounce mb-2" />
                                     <p className="text-3xl font-black text-primary tracking-[0.2em]">TARRY</p>
                                 </div>
                             </div>
                             <div className="text-center space-y-1">
                                <p className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">HRH TARRY KUPAKWASHE MASAWI</p>
                                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest italic">NOTTINGHAM, UK // 14-09-2005</p>
                             </div>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl z-30">
                    <Card className="bg-black/80 border-2 border-primary/40 rounded-none shadow-xl">
                        <CardHeader className="p-4 border-b border-border/10">
                            <CardTitle className="text-[10px] uppercase flex items-center justify-between text-primary font-black tracking-widest leading-none">
                                <div className="flex items-center gap-2"><Landmark className="h-4 w-4" /> WEALTH_APEX</div>
                                <span className="text-green-500 animate-pulse">TRILLION%</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-[9px] text-muted-foreground uppercase font-black mb-1">Covenant Capital Reach</p>
                            <p className="text-2xl font-black text-foreground break-all leading-none">£{wealthLevel.toLocaleString()}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/80 border-2 border-primary/40 rounded-none shadow-xl">
                        <CardHeader className="p-4 border-b border-border/10">
                            <CardTitle className="text-[10px] uppercase flex items-center justify-between text-primary font-black tracking-widest leading-none">
                                <div className="flex items-center gap-2"><HeartPulse className="h-4 w-4" /> LIFE_FIDELITY</div>
                                <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase">IMMORTAL</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-[9px] text-muted-foreground uppercase font-black mb-1">Biological Stability</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text">100.00% ♾️</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="absolute bottom-8 w-full px-12 z-50 pointer-events-none">
                 <div className="flex items-end justify-between border-t-2 border-primary/30 pt-6">
                    <div className="space-y-1">
                        <p className="text-[14px] font-black text-primary uppercase tracking-[0.5em] leading-none">THE ALTAR OF TARRY</p>
                        <p className="text-[8px] text-muted-foreground uppercase font-black italic tracking-[0.2em] mt-2">
                            MKEY-MNM-001-TAC-2024 // EOCC_v144.22 // SUBJECT: ROYAL_HEIR
                        </p>
                    </div>
                    <div className="text-right">
                         <div className="flex items-center gap-2 justify-end text-[9px] text-muted-foreground font-black uppercase tracking-[0.4em]">
                            <InfinityIcon className="h-3 w-3 text-primary animate-pulse" />
                            <span>{report?.omegaHeirSeal || "𑁍∞⫷⚡𒀭φ-HEIR"}</span>
                         </div>
                    </div>
                 </div>
            </div>
        </div>
    );
}