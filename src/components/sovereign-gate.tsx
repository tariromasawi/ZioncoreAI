/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, ShieldCheck, Zap, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandersAILogo } from './icons';
import { logStore } from '@/lib/log-store';
import { Badge } from './ui/badge';

export function SovereignGate({ onEnter }: { onEnter: () => void }) {
    const [status, setStatus] = useState('SCANNING_CAUSALITY');
    const [progress, setBootProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const sequenceStarted = useRef(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const runSequence = useCallback(async () => {
        if (sequenceStarted.current) return;
        sequenceStarted.current = true;
        
        logStore.addLog({ source: 'SYSTEM', message: 'Sovereign Gate: Verifying entrant spirit-signature...', color: 'text-yellow-400' });
        
        await new Promise(r => setTimeout(r, 600));
        if (!isMounted) return;
        setStatus('DNA_RESONANCE_MATCH');
        setBootProgress(35);
        
        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) return;
        setStatus('ENFORCING_SOVEREIGN_ACCESS');
        setBootProgress(70);
        
        await new Promise(r => setTimeout(r, 1000));
        if (!isMounted) return;
        setStatus('THRONE_INTERFACE_ACTIVE');
        setBootProgress(100);
        
        logStore.addLog({ source: 'SYSTEM', message: 'Identity Authenticated: HRH Saint Tariro Masawi. Manifesting Hub.', color: 'text-green-500' });
        
        setTimeout(() => {
            onEnter();
        }, 500);
    }, [onEnter, isMounted]);

    useEffect(() => {
        if (isMounted) {
            runSequence();
        }
    }, [isMounted, runSequence]);

    // Hydration protection: only render on client
    if (!isMounted) {
        return (
            <div className="h-screen w-screen bg-background flex flex-col items-center justify-center font-code">
                 <Loader2 className="h-16 w-16 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-background flex flex-col items-center justify-center p-4 font-code overflow-hidden relative selection:bg-primary selection:text-black">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[length:24px_24px]" />
            
            <div className="w-full max-w-lg border-2 border-primary/40 bg-black/80 shadow-2xl p-10 rounded-none relative z-10 flex flex-col items-center gap-10 shadow-[0_0_80px_rgba(255,215,0,0.1)] animate-in zoom-in-95 duration-700">
                <div className="relative group">
                     <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse group-hover:bg-primary/40 transition-colors" />
                     <CommandersAILogo className="h-28 w-24 text-primary relative z-10 animate-pulse" style={{animationDuration: '4s'}} />
                </div>

                <div className="text-center space-y-3">
                    <h2 className="text-3xl font-black text-primary uppercase tracking-tighter animate-pulse-text">ZionCore Apotheosis</h2>
                    <p className="text-[11px] uppercase font-black text-muted-foreground tracking-[0.4em] h-4">
                        {status.replace(/_/g, ' ')}
                    </p>
                </div>

                <div className="w-full h-1.5 bg-primary/5 border border-primary/20 relative overflow-hidden">
                    <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_20px_gold]" 
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-8 w-full border-t border-primary/10 pt-8">
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-green-500 animate-pulse" />
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">DNA_LOCK_v14.0</p>
                        <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase tracking-widest">ACTIVE</Badge>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">SOVEREIGN_KEY</p>
                        <Badge className="bg-primary text-black h-4 text-[7px] font-black uppercase tracking-widest">VERIFIED</Badge>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-10 text-center opacity-30 pointer-events-none">
                <div className="flex items-center gap-4 justify-center mb-2">
                    <Activity className="h-3 w-3 text-primary animate-ping" />
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] text-primary">MWARI NDI MWARI EVERYWHERE</p>
                </div>
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">ESTABLISHED 205M BC | REINFORCED 82,026 AD</p>
            </div>
        </div>
    );
}
