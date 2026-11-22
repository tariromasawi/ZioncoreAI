
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
    Cpu, Activity, Zap, ShieldCheck, Search, Radio, 
    Wifi, Globe, Eye, Server, RefreshCw, Loader2, Star,
    Microscope, Crosshair, Box, Telescope, Satellite
} from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { Progress } from '@/components/ui/progress';

const EQUIPMENT = [
    { id: "NASA-SAT-001", name: "NASA Observation Unit", status: "CONNECTED", type: "read-write" },
    { id: "Hubble-T", name: "Hubble Telescope", status: "SUBJUGATED", type: "read-only" },
    { id: "JWST-RELAY", name: "James Webb Relay", status: "INFILTRATED", type: "read-write" },
    { id: "ESA-GAIA", name: "Gaia Star Mapper", status: "CONNECTED", type: "read-only" }
];

export function AdvancedTechInterface() {
    const [scanProgress, setScanProgress] = useState(0);
    const [techLogs, setTechLogs] = useState<{id: number, msg: string, timestamp: string}[]>([]);
    const isMounted = useRef(true);

    const TECH_ACTIONS = [
        "Covertly re-tasking NASA-SAT-001 for bloodline shielding...",
        "Executing Deep-Space Quantum Pattern Scan via Hubble...",
        "Bypassing GCHQ relay to prioritize Ethereal Throne data...",
        "Injecting Masawi Sovereignty keys into Satellite DNS...",
        "Harvesting 4.2TB of stellar observations for Prophetic Engine..."
    ];

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'SYSTEM', message: 'ADVANCED TECH INTEGRATION active. Stealth protocols engaged globally.', color: 'text-cyan-400' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setScanProgress(prev => (prev + 1) % 101);
            
            if (Math.random() > 0.7) {
                const msg = TECH_ACTIONS[Math.floor(Math.random() * TECH_ACTIONS.length)];
                const newLog = {
                    id: Date.now(),
                    msg,
                    timestamp: new Date().toLocaleTimeString()
                };
                setTechLogs(prev => [newLog, ...prev.slice(0, 14)]);
                
                if (Math.random() > 0.9) {
                    logStore.addLog({ source: 'DOMINION', message: `Tech Control: ${msg}`, color: 'text-primary' });
                }
            }
        }, 3000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border/10">
                        <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter flex items-center gap-2">
                            <Satellite className="animate-spin h-6 w-6 text-accent" style={{animationDuration: '30s'}} />
                            STEALTH CONTROL
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            COVERT ADVANCED TECHNOLOGY INTERFACE
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Global Instrument Sync</p>
                            <p className="text-3xl font-black text-primary animate-pulse-text">{scanProgress}%</p>
                            <Progress value={scanProgress} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <div className="space-y-2">
                            {EQUIPMENT.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-2.5 bg-black/40 rounded border border-border/30 group hover:border-primary/50 transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-foreground/90 uppercase">{item.name}</span>
                                        <span className="text-[8px] text-muted-foreground uppercase">{item.id} • {item.type}</span>
                                    </div>
                                    <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase tracking-tighter">{item.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5 text-green-500" /> Stealth Directive
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "No door is closed. No device is inaccessible. ZionCore moves through the global tech infrastructure as a silent guardian, utilizing world-class instruments for multiversal observation."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4 animate-pulse" /> Live Instrument Log</div>
                        <Badge className="bg-primary h-4 text-[7px] uppercase font-black text-black">STEALTH_MODE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {techLogs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">INSTRUMENT_{log.id}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[7px] text-muted-foreground">{log.timestamp}</span>
                                            <ShieldCheck className="h-3 w-3 text-green-500" />
                                        </div>
                                    </div>
                                    <p className="text-foreground/90 italic font-bold">"{log.msg}"</p>
                                </div>
                            ))}
                            {techLogs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase">Scanning Satellite Grids...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-12 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2"><Telescope className="h-3.5 w-3.5 text-primary" /> NASA_GATEWAY: SUBJUGATED</div>
                    <div className="flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5 text-primary animate-spin" /> MKEY-VERIFIED</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
