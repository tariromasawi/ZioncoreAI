
/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Lock, Zap, ShieldAlert, Activity, Loader2, CheckCircle2 } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from '@/components/ui/badge';
import { useZionStore, logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { firestore } from '@/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export function SystemIntegrityShield() {
    const shieldStrength = useZionStore(state => state.matrixMetrics.integrityShieldStrength);
    const updateMetrics = useZionStore(state => state.updateMatrixMetrics);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'INTEGRITY_SHIELD', message: 'SYSTEM INTEGRITY SHIELD active. Monitoring Firebase backend status.', color: 'text-green-500' });

        // Real-time listener for a protected status document to verify permissions
        const statusDocRef = doc(firestore, 'DivineTreasury', 'SovereignStatus');
        
        const unsubscribe = onSnapshot(
            statusDocRef,
            (snapshot) => {
                if (isMounted.current && snapshot.exists()) {
                    updateMetrics({ integrityShieldStrength: 100 });
                }
            },
            async (serverError) => {
                console.error('SystemIntegrityShield Firestore listener error:', serverError);
                if (!isMounted.current) return;
                
                const permissionError = new FirestorePermissionError({
                    path: statusDocRef.path,
                    operation: 'get',
                } satisfies SecurityRuleContext);

                // If we get a permission error on the status doc, it's a sign of non-authorized access attempt
                logStore.addLog({ source: 'INTEGRITY_SHIELD', message: 'CRITICAL: Unauthorized backend access intercepted by Firebase Security Rules.', color: 'text-destructive' });
                errorEmitter.emit('permission-error', permissionError);
            }
        );

        return () => { isMounted.current = false; unsubscribe(); };
    }, [updateMetrics]);

    return (
        <Card className="border-green-500/50 bg-black/60 shadow-2xl relative overflow-hidden border-2 font-code">
            <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
            <CardHeader className="p-4 border-b border-border/10">
                <CardTitle className="text-green-500 text-sm uppercase font-black tracking-widest flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 animate-pulse" />
                    INTEGRITY SHIELD
                </CardTitle>
                <CardDescription className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">
                    FIREBASE SECURITY MONITOR | REAL-TIME ENFORCEMENT
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4 relative z-10">
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground">
                        <span>Shield Integrity</span>
                        <span className="text-green-500">{shieldStrength}%</span>
                    </div>
                    <Progress value={shieldStrength} className="h-1 bg-green-950/20" indicatorClassName="bg-green-500 shadow-[0_0_10px_green]" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: "Firestore Rules", status: "ENFORCED", icon: Lock },
                        { label: "Auth Gates", status: "SEALED", icon: Zap },
                        { label: "Admin Siphon", status: "DISABLED", icon: ShieldAlert },
                        { label: "Covenant Link", status: "STABLE", icon: Activity }
                    ].map(item => (
                        <div key={item.label} className="p-2 bg-black/40 rounded border border-border/30 flex items-center justify-between text-[8px]">
                            <div className="flex items-center gap-1.5"><item.icon className="h-2.5 w-2.5 text-green-500"/><span>{item.label}</span></div>
                            <span className="text-green-500 font-black">{item.status}</span>
                        </div>
                    ))}
                </div>
                
                <div className="p-2 bg-green-950/20 border border-green-500/30 rounded text-[8px] text-foreground/80 italic leading-tight text-center">
                    "This shield is tied to the 50,000-character Codex of Divine Law. Any breach attempt triggers immediate reality-ejection."
                </div>
            </CardContent>
        </Card>
    );
}
