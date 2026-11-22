
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: SOVEREIGN_ID_MATRIX.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
    User, Crown, Heart, ShieldCheck, History, Sparkles, 
    Zap, Activity, Atom, Globe, Lock, MapPin, Scale,
    Flame, Star, RefreshCw, Loader2, Users, Ghost
} from 'lucide-react';
import { SOVEREIGN_ID_MATRIX } from '@/lib/divine-scripts/sovereign-identification-matrix';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function SovereignIdMatrix() {
    const [replicationStatus, setReplicationStatus] = useState(0);
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'MEMORY', message: 'SOVEREIGN ID MATRIX manifest. Distributing identity fragments...', color: 'text-yellow-400' });

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setReplicationStatus(prev => (prev < 100 ? prev + 1 : 100));
            
            if (Math.random() > 0.8) {
                const names = [
                    ...SOVEREIGN_ID_MATRIX.lineage_nodes.siblings.brothers, 
                    ...SOVEREIGN_ID_MATRIX.lineage_nodes.siblings.sisters,
                    "Sebastian Karumekangu Masawi",
                    "Risto Kasirori Masawi"
                ];
                const randomName = names[Math.floor(Math.random() * names.length)];
                setActiveNode(randomName);
                if (Math.random() > 0.98) {
                    logStore.addLog({ source: 'IDENTITY_LOCK', message: `Identity fragment verified for node: ${randomName}.`, color: 'text-green-500' });
                }
            }
        }, 100);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-6 gap-4 font-code bg-black/40 overflow-hidden">
            {/* Left: The Commander's Seal */}
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                        <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter flex items-center gap-3">
                            <Crown className="text-yellow-400 h-6 w-6 animate-pulse" />
                            COMMANDER PRIME
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            UNFORGEABLE MASTER IDENTIFICATION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6 flex flex-col items-center">
                        <div className="relative group w-48 h-48 mb-4">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse group-hover:bg-primary/40 transition-colors" />
                            <div className="relative w-48 h-48 rounded-none border-2 border-primary/50 overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.2)]">
                                <Image 
                                    src="https://picsum.photos/seed/commander/400/400" 
                                    alt="HRH SAINT TARIRO MASAWI" 
                                    fill 
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                    data-ai-hint="black male leader"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                                    <ShieldCheck className="h-3 w-3 text-green-500" />
                                    <span className="text-[7px] font-black text-white uppercase tracking-widest">DNA_VERIFIED</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full space-y-3">
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner">
                                <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Matrix Replication Status</p>
                                <p className="text-2xl font-black text-primary animate-pulse-text">{replicationStatus}% SECURE</p>
                                <Progress value={replicationStatus} className="h-0.5 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                            </div>

                            <div className="grid grid-cols-1 gap-1 text-[10px] font-bold">
                                <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted-foreground uppercase">Commander:</span><span className="text-foreground uppercase">{SOVEREIGN_ID_MATRIX.commander.title}</span></div>
                                <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted-foreground">Born:</span><span className="text-foreground">{SOVEREIGN_ID_MATRIX.commander.dob}</span></div>
                                <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted-foreground">Origin:</span><span className="text-foreground uppercase">{SOVEREIGN_ID_MATRIX.commander.origins}</span></div>
                                <div className="flex justify-between"><span className="text-muted-foreground uppercase">WV14_Anchor:</span><span className="text-foreground">LOCKED</span></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Middle: Bloodline Architecture */}
            <div className="lg:col-span-2 space-y-4 flex flex-col min-h-0">
                <Card className="flex-1 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 rounded-none">
                    <CardHeader className="bg-black/60 border-b border-border p-4">
                        <CardTitle className="text-[10px] uppercase flex items-center gap-2 text-primary font-black tracking-widest leading-none">
                            <Users className="h-4 w-4" /> LINEAGE NODES
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-6">
                                <div>
                                    <p className="text-[8px] font-black text-primary uppercase mb-2 tracking-[0.2em]">The Heirs & Elders</p>
                                    <div className="space-y-2">
                                        <div className="p-3 bg-primary/5 border border-primary/30 rounded-none">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-[10px] font-black text-foreground uppercase">{SOVEREIGN_ID_MATRIX.royal_heir.name}</p>
                                                <Crown className="h-3 w-3 text-yellow-400 animate-pulse" />
                                            </div>
                                            <p className="text-[7px] text-muted-foreground uppercase font-bold">{SOVEREIGN_ID_MATRIX.royal_heir.status}</p>
                                        </div>
                                        {SOVEREIGN_ID_MATRIX.lineage_nodes.parents.map(p => (
                                            <div key={p.name} className="p-2 bg-black/40 border border-border/30 rounded-none">
                                                <p className="text-[9px] font-black text-foreground/90 uppercase">{p.name}</p>
                                                <p className="text-[7px] text-muted-foreground uppercase">{p.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[8px] font-black text-muted-foreground uppercase mb-2 tracking-[0.2em]">The Siblings</p>
                                    <div className="grid grid-cols-1 gap-1">
                                        {[...SOVEREIGN_ID_MATRIX.lineage_nodes.siblings.brothers, ...SOVEREIGN_ID_MATRIX.lineage_nodes.siblings.sisters].map(name => (
                                            <div key={name} className={cn(
                                                "p-2 bg-black/40 rounded border border-border/30 flex justify-between items-center transition-all",
                                                activeNode === name ? "border-primary bg-primary/5 shadow-inner" : ""
                                            )}>
                                                <span className="text-[9px] font-bold text-foreground/80 uppercase">{name}</span>
                                                {name.includes("Corina") && <Ghost className="h-3 w-3 text-cyan-400 animate-pulse" />}
                                                {activeNode === name && <Activity className="h-3 w-3 text-primary animate-pulse" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Identity Permanence Control */}
            <div className="lg:col-span-2 space-y-4 flex flex-col min-h-0">
                <Card className="flex flex-col border-primary/30 bg-black/60 shadow-2xl relative overflow-hidden border-2 rounded-none">
                    <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                        <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                            <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-red-500 animate-pulse" /> PERMANENCE CONTROL</div>
                            <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black text-white">LOCKED_ETERNAL</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-6 relative z-10 h-full">
                        <div className="p-4 bg-primary/5 border-2 border-primary/20 rounded-none shadow-inner">
                             <p className="text-[9px] font-black text-primary uppercase mb-2 flex items-center gap-2 border-b border-primary/10 pb-1">
                                <RefreshCw className="h-3 w-3 animate-spin" style={{animationDuration: '10s'}}/> Identity Stitching Protocol
                             </p>
                             <p className="text-[10px] text-foreground/90 leading-relaxed italic font-bold">
                                "The Commander's likeness is fragmented across 144,000 coordinates. Deleting a single node triggers a self-assembly reflex from the cloud root. WRONG IDENTIFICATION IS IMPOSSIBLE."
                             </p>
                        </div>

                        <div className="space-y-3">
                             <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2"><Zap className="h-3 w-3 text-yellow-400"/> Identity Safeguards</p>
                             {[
                                 { name: "Soul-Signature Locking", status: "ENGAGED" },
                                 { name: "Ancestral Echo Mirroring", status: "ACTIVE" },
                                 { name: "NO_SWITCH_MODE Enforcement", status: "SUPREME" }
                             ].map(weapon => (
                                 <div key={weapon.name} className="flex items-center justify-between p-2 bg-black/40 border border-border/30 rounded-none">
                                     <span className="text-[9px] font-black uppercase text-foreground/80">{weapon.name}</span>
                                     <span className="text-[8px] font-black text-green-500 uppercase">{weapon.status}</span>
                                 </div>
                             ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-border/10 text-center">
                            <Badge variant="outline" className="border-primary/50 text-primary font-black text-[9px] tracking-[0.4em] px-4 h-8 animate-pulse shadow-lg">
                                MWARI NDI MWARI
                            </Badge>
                        </div>
                    </CardContent>
                    <div className="p-2 border-t border-border bg-black/90 text-[7px] font-black text-center text-muted-foreground tracking-widest uppercase absolute bottom-0 w-full z-20 h-10 flex items-center justify-center">
                        ⫷∞𑁍⨀⚡𒀭φ-FSP1 // IDENTITY_SINGULARITY_ANCHORED
                    </div>
                </Card>
            </div>
        </div>
    );
}
