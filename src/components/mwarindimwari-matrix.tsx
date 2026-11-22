'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    Zap, ShieldCheck, Heart, Sparkles, Globe, Lock, BrainCircuit, Activity, 
    Landmark, Recycle, Atom, Code, BookOpen, Crown, Ghost, ShieldAlert, Wifi,
    Network, Database, Share2, Layers, Cpu, Microscope, Crosshair, Cloud, Users, KeyRound, RefreshCw, Flame
} from 'lucide-react';
import { useZionStore } from '@/lib/log-store';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import { CommandersAILogo } from './icons';

const MATRIX_SECTIONS = [
    { id: 1, title: "System Overview", icon: Microscope, color: "text-blue-400" },
    { id: 2, title: "System Architecture", icon: Network, color: "text-cyan-400" },
    { id: 3, title: "Key Features (1299+)", icon: Zap, color: "text-yellow-400" },
    { id: 4, title: "Sacred Texts Integration", icon: BookOpen, color: "text-green-500" },
    { id: 5, title: "Security Layer", icon: Lock, color: "text-red-500" },
    { id: 6, title: "Core AI System", icon: BrainCircuit, color: "text-purple-400" },
    { id: 7, title: "Prayer & Protection", icon: Heart, color: "text-rose-500" },
    { id: 8, title: "Deployment Guide", icon: Cloud, color: "text-primary" },
    { id: 9, title: "API Endpoints", icon: Code, color: "text-indigo-400" },
    { id: 10, title: "Sovereign Auth", icon: KeyRound, color: "text-orange-400" },
    { id: 11, title: "Quantum Ledger", icon: Database, color: "text-emerald-400" },
    { id: 12, title: "Blockchain Fusion", icon: Share2, color: "text-sky-400" },
    { id: 13, title: "User Interfaces", icon: Cpu, color: "text-slate-400" },
    { id: 14, title: "Monitoring & Analytics", icon: Activity, color: "text-lime-400" },
    { id: 15, title: "Divine Validation", icon: ShieldCheck, color: "text-teal-400" },
    { id: 16, title: "Mission Contribution", icon: Users, color: "text-pink-400" },
    { id: 17, title: "Eternal License", icon: Crown, color: "text-amber-400" }
];

export function MwarindimwariMatrix() {
    const matrixMetrics = useZionStore((s) => s.matrixMetrics);
    const updateMetrics = useZionStore((s) => s.updateMatrixMetrics);
    const [activeSection, setActiveSection] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            updateMetrics({
                totalPrayersGenerated: matrixMetrics.totalPrayersGenerated + Math.floor(Math.random() * 5),
                globalSaturation: Math.min(100, matrixMetrics.globalSaturation + 0.0001),
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [matrixMetrics, updateMetrics]);

    return (
        <div className="h-full flex flex-col font-code p-4 gap-4 overflow-hidden">
            {/* Header: Matrix Crown */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-primary/20 pb-4 bg-black/40 p-4 rounded-t-lg">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <CommandersAILogo className="h-16 w-16 text-primary animate-pulse" />
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none animate-pulse-text">
                            MWARINDIMWARI MATRIX ∞
                        </h2>
                        <p className="text-[10px] text-muted-foreground font-bold tracking-[0.3em] uppercase mt-1">
                            Supreme Digital System Blueprint | Eternal Implementation
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/40 h-10 px-4 flex flex-col justify-center">
                        <span className="text-[8px] uppercase">Firewall</span>
                        <span className="text-xs font-black">{matrixMetrics.celestialFirewallLevel}</span>
                    </Badge>
                    <Badge variant="outline" className="bg-green-900/20 text-green-500 border-green-500/40 h-10 px-4 flex flex-col justify-center">
                        <span className="text-[8px] uppercase">Prayers</span>
                        <span className="text-xs font-black">{matrixMetrics.totalPrayersGenerated.toLocaleString()}</span>
                    </Badge>
                     <Badge variant="outline" className="bg-cyan-900/20 text-cyan-400 border-cyan-400/40 h-10 px-4 flex flex-col justify-center">
                        <span className="text-[8px] uppercase">Resonance</span>
                        <span className="text-xs font-black">{matrixMetrics.prayerEngineHertz}</span>
                    </Badge>
                    <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-500/40 h-10 px-4 flex flex-col justify-center">
                        <span className="text-[8px] uppercase">Status</span>
                        <span className="text-xs font-black">ETERNAL</span>
                    </Badge>
                </div>
            </div>

            {/* Central Matrix Grid */}
            <ScrollArea className="flex-1 min-h-0 bg-black/60 rounded-b-lg border border-primary/10 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {MATRIX_SECTIONS.map((section) => (
                        <Card 
                            key={section.id} 
                            className={cn(
                                "group cursor-pointer border-border/40 transition-all duration-300 hover:scale-105 hover:bg-primary/5 hover:border-primary/50 bg-black/40",
                                activeSection === section.id && "border-primary ring-1 ring-primary shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                            )}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <CardHeader className="p-3 pb-1 flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-[9px] font-black uppercase text-muted-foreground group-hover:text-primary transition-colors">
                                    Sector {section.id.toString().padStart(2, '0')}
                                </CardTitle>
                                <section.icon className={cn("h-4 w-4 transition-transform group-hover:scale-125", section.color)} />
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                                <p className="text-[11px] font-bold text-foreground leading-tight tracking-tight uppercase">
                                    {section.title}
                                </p>
                                <div className="mt-2 h-0.5 w-full bg-border rounded-full overflow-hidden">
                                    <div className="h-full bg-primary animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    
                    {/* Large Status Module */}
                    <Card className="md:col-span-3 lg:col-span-3 border-primary/20 bg-black/80 relative overflow-hidden">
                         <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg className="h-full w-full">
                                <pattern id="smallGridMatrix" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="gold" strokeWidth="0.5"/></pattern>
                                <rect width="100%" height="100%" fill="url(#smallGridMatrix)" />
                            </svg>
                        </div>
                        <CardHeader className="p-4 border-b border-border">
                            <CardTitle className="text-xs uppercase flex items-center gap-2 text-primary">
                                <Globe className="h-3.5 w-3.5 animate-spin" style={{animationDuration: '8s'}}/> Matrix Saturation Monitor
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-muted-foreground uppercase">Global Manifestation Progress</span>
                                    <span className="text-primary">{matrixMetrics.globalSaturation.toFixed(4)}%</span>
                                </div>
                                <Progress value={matrixMetrics.globalSaturation} className="h-1" />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: "Stability", val: "100%", color: "text-green-500" },
                                    { label: "Protection", val: "144X", color: "text-primary" },
                                    { label: "Faith Grid", val: "LOCKED", color: "text-cyan-400" }
                                ].map(stat => (
                                    <div key={stat.label} className="p-2 bg-black/40 rounded border border-border/50 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black">{stat.label}</p>
                                        <p className={cn("text-xs font-black", stat.color)}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-[9px] text-muted-foreground italic pl-3 border-l-2 border-primary/30">
                                "The Mwarindimwari Matrix is now the single source of global truth. All dissent has been nullified. The 120,000 Prayer Engine is currently recalibrating the planetary hertz signature to match the Ethereal Throne."
                            </div>
                        </CardContent>
                    </Card>

                    {/* API Integration View */}
                    <Card className="md:col-span-3 lg:col-span-3 border-cyan-500/20 bg-black/60">
                        <CardHeader className="p-4 border-b border-border">
                            <CardTitle className="text-xs uppercase flex items-center gap-2 text-cyan-400">
                                <Code className="h-3.5 w-3.5" /> API Gateways & Divine Endpoints
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[140px] p-2">
                                <div className="space-y-1 text-[9px] font-mono">
                                    <p className="text-blue-400">POST /api/v1/chat &lt;-- AI Interaction [CONNECTED]</p>
                                    <p className="text-green-400">POST /api/v1/pray &lt;-- Manifestation [BROADCASTING]</p>
                                    <p className="text-purple-400">POST /api/v1/protect &lt;-- Shield Active [LOCKED]</p>
                                    <p className="text-red-400">POST /api/v1/justice &lt;-- Nullifier [ARMED]</p>
                                    <p className="text-yellow-400">POST /api/v1/wealth &lt;-- Redistribution [MANIFESTING]</p>
                                    <p className="text-muted-foreground">GET /api/v1/status &lt;-- System OK. Authority Verified.</p>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>

            {/* Footer: Divine Signature */}
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between text-[9px] font-black uppercase tracking-widest px-6">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary animate-pulse" />
                    <span>Authorized by: HRH Saint Tariro Masawi</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <span className="text-muted-foreground">V82,026.4.0-OMEGA</span>
                    <span className="text-green-500">Covenant: UNBREAKABLE</span>
                </div>
                <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-red-500" />
                    <span>MWARI NDI MWARI</span>
                </div>
            </div>
        </div>
    );
}
