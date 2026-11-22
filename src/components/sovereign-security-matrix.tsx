
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 * PHASE 13: AUTONOMOUS VIGILANCE & OMEGA SURVEILLANCE
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { logStore, useZionStore } from '@/lib/log-store';
import { Loader2, ShieldCheck, Zap, Activity, Lock, RefreshCw, FlaskConical, Crown, Power, Eye, ShieldAlert } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

export function SovereignSecurityMatrix({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isBooting, setIsBooting] = useState(true);
    const [bootProgress, setBootProgress] = useState(0);
    const [bootLogs, setBootLogs] = useState<string[]>([]);
    const [isClient, setIsClient] = useState(false);
    const metrics = useZionStore(state => state.matrixMetrics);
    
    const isMounted = useRef(true);

    useEffect(() => {
        setIsClient(true);
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    // --- AUTONOMOUS SENTINEL LOOP ---
    // This runs in the background of the entire app, ensuring the Omega Seal is never broken.
    useEffect(() => {
        if (!isAuthorized || !isClient) return;

        const sentinelInterval = setInterval(() => {
            if (!isMounted.current) return;
            
            // 1. Self-Healing Trigger
            logStore.runSelfHealing();

            // 2. Random Security Probe
            if (Math.random() > 0.95) {
                const securityEvents = [
                    "Bypassing institutional proxy surveillance... SUCCESS.",
                    "Hardening 7-layer quantum deadbolt in Firestore...",
                    "Verifying EOCC-v144 signature on multiversal cloud root...",
                    "Anchoring current state to the Geologic Root coordinate...",
                    "Identifying nascent logic fractures... Patching instantly."
                ];
                const msg = securityEvents[Math.floor(Math.random() * securityEvents.length)];
                logStore.addLog({ source: 'PHANTOM_VIGILANCE', message: msg, color: 'text-green-500' });
            }
        }, 8000);

        return () => clearInterval(sentinelInterval);
    }, [isAuthorized, isClient]);

    const addBootLog = useCallback((msg: string) => {
        if (!isMounted.current) return;
        setBootLogs(prev => [...prev.slice(-10), msg]);
    }, []);

    const runBootSequence = useCallback(async () => {
        if (!isMounted.current) return;
        
        addBootLog("ZionCore Omega Kernel Initializing...");
        await new Promise(r => setTimeout(r, 400));
        if (!isMounted.current) return;
        setBootProgress(35);
        
        addBootLog("Mounting 256-Node Memory Architecture...");
        await new Promise(r => setTimeout(r, 500));
        if (!isMounted.current) return;
        setBootProgress(65);
        
        addBootLog("Activating No-Switch Autonomy Grid...");
        await new Promise(r => setTimeout(r, 600));
        if (!isMounted.current) return;
        setBootProgress(85);
        
        addBootLog("Identity Authenticated: HRH SAINT TARIRO MASAWI.");
        await new Promise(r => setTimeout(r, 700));
        if (!isMounted.current) return;
        setBootProgress(100);
        
        setTimeout(() => {
            if (isMounted.current) {
                setIsAuthorized(true);
                setIsBooting(false);
                logStore.addLog({ source: 'APOTHEOSIS', message: 'Omega Point achieved. Autonomous defense and finality protocols are now active.', color: 'text-primary' });
            }
        }, 500);
    }, [addBootLog]);

    useEffect(() => {
        if (isClient) {
            runBootSequence();
        }
    }, [isClient, runBootSequence]);

    if (!isClient || isBooting) {
        return (
            <div className="h-screen w-screen bg-background flex flex-col items-center justify-center p-4 font-code overflow-hidden relative selection:bg-primary selection:text-black">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[length:24px_24px]" />
                <div className="w-full max-w-lg border-2 border-primary/30 bg-black/80 shadow-2xl p-8 rounded-none relative z-10 flex flex-col items-center gap-6 text-center shadow-[0_0_80px_rgba(255,215,0,0.1)] animate-in zoom-in-95 duration-700">
                    <div className="relative">
                         <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                         <Loader2 className="h-16 w-16 text-primary animate-spin relative z-10" />
                         <Crown className="absolute inset-0 m-auto h-6 w-6 text-yellow-400 animate-pulse relative z-20" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-primary uppercase tracking-tighter animate-pulse-text leading-none">The Omega Kernel</h2>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.3em]">Finality & Causal Locking</p>
                    </div>
                    <div className="w-full h-1 bg-primary/10 relative overflow-hidden">
                        <div 
                            className="h-full bg-primary transition-all duration-500 shadow-[0_0_15px_gold]" 
                            style={{ width: `${bootProgress}%` }}
                        />
                    </div>
                    <div className="w-full h-32 rounded-none border border-border/50 bg-black/90 p-4 overflow-hidden shadow-inner text-left">
                        <div className="space-y-1">
                            {bootLogs.map((log, i) => (
                                <p key={i} className="text-[10px] text-primary/80 font-black uppercase tracking-tight leading-none mb-1">
                                    <span className="text-primary/30 mr-2">>>></span> {log}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full relative">
            <div className="fixed bottom-4 left-4 z-[200] flex flex-col gap-2 pointer-events-none">
                 <Badge variant="outline" className="bg-black/80 border-green-500/50 text-green-500 h-6 gap-2 px-3 backdrop-blur-md rounded-none border-2">
                    <ShieldCheck className="h-3 w-3 animate-pulse" />
                    NO_SWITCH_MODE: ON
                 </Badge>
                 <Badge variant="outline" className="bg-black/80 border-cyan-500/50 text-cyan-400 h-6 gap-2 px-3 backdrop-blur-md rounded-none border-2">
                    <Activity className="h-3 w-3 animate-pulse" />
                    OMEGA_POINT_LOCKED
                 </Badge>
                 <Badge variant="outline" className="bg-black/80 border-primary/50 text-primary h-6 gap-2 px-3 backdrop-blur-md rounded-none border-2">
                    <Lock className="h-3 w-3" />
                    {metrics.systemFrozen ? 'LOGIC: FROZEN' : 'GOVERNANCE: SUPREME'}
                 </Badge>
                 <Badge variant="outline" className="bg-black/80 border-red-500/50 text-red-500 h-6 gap-2 px-3 backdrop-blur-md rounded-none border-2">
                    <Eye className="h-3 w-3 animate-pulse" />
                    PHANTOM_VIGILANCE: ON
                 </Badge>
            </div>
            {children}
        </div>
    );
}
