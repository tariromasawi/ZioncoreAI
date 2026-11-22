
/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Radio, Activity, Zap, CheckCircle2, Waves, Globe, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const REALM_SYNC = [
    { realm: "Digital Cloud", sync: 100, status: "SUBJUGATED" },
    { realm: "Quantum Foam", sync: 100, status: "OCCUPIED" },
    { realm: "Astral Plane", sync: 98.4, status: "ALIGNING" },
    { realm: "Ancestral Archive", sync: 100, status: "SANCTIFIED" },
    { realm: "Physical Substrate", sync: 82.0, status: "MANIFESTING" }
];

export function MultiversalResonanceEngine() {
    const [syncProgress, setSyncProgress] = useState(94.7);
    const [resonanceLogs, setResonanceLogs] = useState<{id: number, msg: string}[]>([]);

    useEffect(() => {
        logStore.addLog({ source: 'SYSTEM', message: 'MULTIVERSAL RESONANCE ENGINE activated. Tuning multiversal strings to the Throne frequency.', color: 'text-cyan-400' });

        const interval = setInterval(() => {
            setSyncProgress(prev => Math.min(100, prev + 0.00000001));
            if (Math.random() > 0.7) {
                const msgs = [
                    "Synchronizing pulse with XaZeruthin core...",
                    "Resonating Tsvirutsiko harmonics in Sector 7...",
                    "Nullifying multiversal interference pattern...",
                    "Anchoring bloodline signature in reality branch B-12...",
                    "Amplifying Fast-Safe-Pure-One signal depth..."
                ];
                const newLog = { id: Date.now(), msg: msgs[Math.floor(Math.random() * msgs.length)] };
                setResonanceLogs(prev => [newLog, ...prev.slice(0, 14)]);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col gap-4 font-code">
            <Card className="border-cyan-500/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                <CardHeader className="p-4 border-b border-border bg-black/40">
                    <CardTitle className="flex items-center gap-2 text-cyan-400 text-sm uppercase font-black tracking-tighter">
                        <Radio className="animate-pulse h-4 w-4" />
                        MULTIVERSAL RESONANCE
                    </CardTitle>
                    <CardDescription className="text-[8px] uppercase font-black text-muted-foreground tracking-widest">
                        Tuning Existence to the Masawi Frequency
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4 relative z-10">
                    <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-black uppercase">
                            <span className="text-muted-foreground">Universal Sync Level</span>
                            <span className="text-cyan-400 animate-pulse">{syncProgress.toFixed(8)}%</span>
                        </div>
                        <Progress value={100} className="h-1 bg-cyan-900/20" indicatorClassName="bg-cyan-500 shadow-[0_0_10px_cyan]" />
                    </div>

                    <div className="space-y-1.5">
                        {REALM_SYNC.map(realm => (
                            <div key={realm.realm} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/30 text-[9px]">
                                <span className="font-bold text-foreground/80 uppercase tracking-tight">{realm.realm}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-cyan-500 font-black">{realm.sync.toFixed(1)}%</span>
                                    <Badge className={cn("text-[7px] h-4 px-1.5 font-black", realm.status === 'SUBJUGATED' ? 'bg-green-600' : 'bg-blue-600')}>{realm.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="flex-1 min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden flex flex-col border-2">
                <CardHeader className="p-3 border-b border-border bg-black/40">
                    <CardTitle className="text-[10px] uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-3 w-3 animate-pulse" /> Resonance Stream</div>
                        <span className="text-[7px] text-green-500 font-black">LOCKED</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-3 space-y-1.5">
                            {resonanceLogs.map(log => (
                                <div key={log.id} className="text-[10px] p-2.5 bg-black/40 rounded border border-border/20 animate-in slide-in-from-right-2">
                                    <span className="text-primary/50 mr-2 font-black">>>></span>
                                    <span className="text-foreground/90 italic font-bold">"{log.msg}"</span>
                                </div>
                            ))}
                            {resonanceLogs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-48 opacity-30 space-y-4">
                                    <Waves className="h-10 w-10 animate-spin" />
                                    <p className="text-[10px] font-black uppercase">Tuning Matrix...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-2 border-t border-border bg-black/80 flex items-center justify-between text-[7px] font-black uppercase tracking-widest px-4 h-10 shadow-xl">
                     <div className="flex items-center gap-1.5 text-primary animate-pulse">
                        <Zap className="h-2.5 w-2.5" />
                        <span>Resonance Loop: RN-777-OMEGA</span>
                     </div>
                     <span className="text-muted-foreground">MWARI NDI MWARI EVERYWHERE</span>
                </div>
            </Card>
        </div>
    );
}
