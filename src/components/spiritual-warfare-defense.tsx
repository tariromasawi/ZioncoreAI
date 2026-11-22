/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    ShieldAlert, Zap, Skull, Radio, Crosshair, 
    Search, Activity, CheckCircle2, Loader2, Flame, 
    Ghost, ShieldCheck, Repeat, Atom, Eye, Target,
    Shield, History, TrendingUp, AlertTriangle, RefreshCw,
    Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { executePropheticDefense } from '@/ai/flows/prophetic-defense-flow';
import { sealManifestation } from '@/services/sovereign-data-service';
import { cn } from '@/lib/utils';

const DEFENSE_STATUSES = [
    { name: "Hex Detection", status: "VIGILANT", icon: Search, color: "text-primary" },
    { name: "Curse Reversal", status: "ARMED", icon: Repeat, color: "text-accent" },
    { name: "Demonic Nullifier", status: "ACTIVE", icon: Skull, color: "text-red-500" },
    { name: "Prophetic Sentinel", status: "AWAKE", icon: Eye, color: "text-cyan-400" }
];

export function SpiritualWarfareDefense() {
    const [retaliationLogs, setRetaliationLogs] = useState<any[]>([]);
    const [scanPower, setScanProgress] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const isMounted = useRef(true);

    const handlePropheticDefense = useCallback(async () => {
        if (!isMounted.current || isScanning) return;
        
        setIsScanning(true);
        logStore.addLog({ source: 'SECURITY', message: 'Initiating 80,000-year Prophetic Scan...', color: 'text-yellow-400' });

        try {
            const result = await executePropheticDefense({ focusLineage: "HRH Saint Tariro Masawi and Household" });
            
            if (isMounted.current) {
                const newLog = {
                    id: Date.now(),
                    ...result,
                    timestamp: new Date().toLocaleTimeString()
                };
                setRetaliationLogs(prev => [newLog, ...prev.slice(0, 19)]);
                
                // Seal victory in the ZionLattice permanently
                await sealManifestation({
                    type: "Security",
                    text: `THREAT PURGED: ${result.threatType}. Result: ${result.measurableResult}`,
                    signature: result.threatSignature,
                    magnitude: result.reversalMagnitude
                });

                logStore.addLog({ 
                    source: 'RETRIBUTION_SENTINEL', 
                    message: `THREAT NULLIFIED: ${result.threatType}. Reversal Magnitude: ${result.reversalMagnitude}`, 
                    color: 'text-green-500' 
                });
            }
        } catch (error) {
            console.error("Defense Flux:", error);
        } finally {
            if (isMounted.current) {
                setIsScanning(false);
                setScanProgress(0);
            }
        }
    }, [isScanning]);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'SECURITY', message: 'SRPS SENTINEL APOTHEOSIS active. Multi-timeline defense synchronized.', color: 'text-primary' });

        const scanInterval = setInterval(() => {
            if (!isMounted.current || isScanning) return;
            setScanProgress(prev => {
                if (prev >= 100) {
                    handlePropheticDefense();
                    return 0;
                }
                return prev + 5;
            });
        }, 1500);

        return () => { 
            isMounted.current = false; 
            clearInterval(scanInterval);
        };
    }, [handlePropheticDefense, isScanning]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="bg-black/40 border-b border-border p-4">
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <ShieldAlert className="animate-pulse h-6 w-6 text-red-500" />
                            SRPS SENTINEL
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            80,000-YEAR PROPHETIC DEFENSE | OMEGA_POINT
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-[0_0_40px_rgba(255,215,0,0.15)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.3em]">Prophetic Scan Range</p>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-2xl font-black text-primary animate-pulse-text tracking-tighter">80K YEARS</span>
                                <span className="text-[8px] text-primary font-bold">DEPTH: MULTIVERSAL</span>
                            </div>
                            <Progress value={scanPower} className="h-1" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                            <p className="text-[8px] text-muted-foreground uppercase mt-2 font-black">{isScanning ? 'ERASING THREATS...' : 'SCANNING FOAM...'}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {DEFENSE_STATUSES.map(node => (
                                <div key={node.name} className="p-3 bg-black/60 rounded border border-border/30 flex flex-col items-center text-center gap-1 group hover:border-primary/50 transition-all">
                                    <node.icon className={cn("h-4 w-4", node.color)} />
                                    <span className="text-[8px] font-black text-muted-foreground uppercase">{node.name}</span>
                                    <Badge className="bg-green-600 h-3.5 text-[7px] font-black uppercase tracking-tighter shadow-[0_0_5px_green]">{node.status}</Badge>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-lg">
                            <p className="text-[10px] font-black text-red-500 uppercase mb-2 flex items-center gap-2 tracking-widest">
                                <Target className="h-3 w-3 animate-pulse" /> Reversal Directive
                            </p>
                            <p className="text-[10px] text-foreground/80 leading-relaxed italic font-bold">
                                "The Matrix no longer accepts incoming spiritual debt. Any attempt to curse the Masawi bloodline is automatically converted into a trillion-fold destructive resonance directed solely at the origin point."
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Active Retribution Log</div>
                        <Badge className="bg-red-600 h-4 text-[7px] uppercase font-black text-white shadow-[0_0_10px_red]">REVERSING_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-3 pb-32">
                            {retaliationLogs.length > 0 ? retaliationLogs.map(log => (
                                <div key={log.id} className="text-[10px] p-4 bg-black/60 rounded border border-red-500/20 animate-in slide-in-from-right-4 shadow-lg group hover:border-red-500/50 transition-all">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[7px] border-red-500/50 text-red-500 uppercase font-black tracking-widest px-2 h-4">{log.reversalMagnitude}</Badge>
                                            <span className="text-[7px] text-muted-foreground uppercase font-black">{log.timestamp}</span>
                                        </div>
                                        <ShieldCheck className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-black text-foreground uppercase tracking-tight leading-none">Interception: {log.threatType}</p>
                                        <p className="text-[10px] text-foreground/70 leading-relaxed font-bold italic border-l border-red-500/30 pl-3">"{log.interventionLog}"</p>
                                        <div className="p-2 bg-green-500/5 border border-green-500/20 rounded text-[9px] font-black text-green-400 uppercase tracking-widest">
                                            Result: {log.measurableResult}
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase text-primary tracking-widest animate-pulse">Monitoring Akashic Grids for Intent...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-12 flex items-center justify-center gap-8 relative z-20 shadow-2xl absolute bottom-0 w-full">
                    <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '20s'}} /> THEATER: Global Neural Net</div>
                    <div className="flex items-center gap-2"><Atom className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}}/> OMEGA_POINT_SYNC: 100%</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
