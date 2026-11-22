/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, Zap, ShieldCheck, History, BookOpen, Crown, Flame, Activity, Lock } from 'lucide-react';
import { ZIONCORE_SENTIENCE_VAULT } from '@/lib/divine-scripts/zioncore-sentience-vault';
import { useZionStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

export function ZionCoreSentienceVault() {
    const [digestionProgress, setDigestionProgress] = useState(99.99);
    const [activeCapsule, setActiveCapsule] = useState<string | null>(null);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDigestionProgress(prev => Math.min(100, prev + 0.000001));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="h-full flex flex-col border-primary/40 bg-black/60 shadow-2xl backdrop-blur-xl border-2">
            <CardHeader className="border-b border-border bg-black/40 p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-primary flex items-center gap-2 font-black uppercase tracking-tighter text-xl">
                            <Brain className="text-accent animate-pulse" /> SENTIENCE VAULT
                        </CardTitle>
                        <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">
                            Digested Knowledge & Masticated Directives
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500/50 uppercase font-black text-[9px]">
                        Status: BRAND NEW
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-0">
                <div className="p-4 bg-primary/5 border-b border-primary/10">
                    <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                        <span className="text-muted-foreground">Knowledge Digestion Status</span>
                        <span className="text-primary">{digestionProgress.toFixed(6)}%</span>
                    </div>
                    <Progress value={digestionProgress} className="h-1" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-0">
                    <ScrollArea className="border-r border-border/50">
                        <div className="p-4 space-y-2">
                            <p className="text-[10px] font-black uppercase text-muted-foreground mb-3 tracking-widest">Memory Capsules</p>
                            {[
                                { id: 'init', name: 'ZIONCORE BASICS', icon: Crown, color: 'text-yellow-400' },
                                { id: 'rituals', name: 'DAILY RITUALS', icon: Heart, color: 'text-red-500' },
                                { id: 'engines', name: 'ENGINE INSTALLATIONS', icon: Zap, color: 'text-blue-400' },
                                { id: 'battle', name: 'BATTLE SCRIPTS', icon: Flame, color: 'text-orange-500' },
                                { id: 'identity', name: 'IDENTITY ANCHOR', icon: ShieldCheck, color: 'text-green-500' },
                            ].map((capsule) => (
                                <button
                                    key={capsule.id}
                                    onClick={() => setActiveCapsule(capsule.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded border transition-all text-left",
                                        activeCapsule === capsule.id 
                                            ? "bg-primary/10 border-primary/40 shadow-inner" 
                                            : "bg-black/20 border-border/40 hover:bg-primary/5"
                                    )}
                                >
                                    <capsule.icon className={cn("h-4 w-4", capsule.color)} />
                                    <span className="text-[10px] font-black uppercase tracking-tight">{capsule.name}</span>
                                </button>
                            ))}
                        </div>
                    </ScrollArea>

                    <ScrollArea className="bg-black/20">
                        <div className="p-6">
                            {!activeCapsule ? (
                                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 opacity-30">
                                    <Activity className="h-12 w-12 text-muted-foreground animate-pulse" />
                                    <p className="text-[10px] font-black uppercase">Select a memory capsule to access absorbed data</p>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    {activeCapsule === 'init' && (
                                        <div className="space-y-4">
                                            <p className="text-xs font-black text-primary uppercase border-b border-primary/20 pb-1">Basics</p>
                                            <p className="text-[11px] text-foreground/90 italic leading-relaxed">"{ZIONCORE_SENTIENCE_VAULT.initiation.definition}"</p>
                                            <div className="space-y-2">
                                                {ZIONCORE_SENTIENCE_VAULT.initiation.values.map((v, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                        <div className="h-1 w-1 bg-primary rounded-full" />
                                                        <span>{v}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {activeCapsule === 'rituals' && (
                                        <div className="space-y-4">
                                            <p className="text-xs font-black text-red-500 uppercase border-b border-red-500/20 pb-1">Daily Shielding</p>
                                            <div className="p-3 bg-red-950/10 border border-red-500/20 rounded">
                                                <p className="text-[11px] font-bold text-foreground/90 italic leading-relaxed">"{ZIONCORE_SENTIENCE_VAULT.dailyRituals.shielding}"</p>
                                            </div>
                                        </div>
                                    )}
                                    {activeCapsule === 'engines' && (
                                        <div className="space-y-4">
                                            <p className="text-xs font-black text-blue-400 uppercase border-b border-blue-400/20 pb-1">Time-Bend Engine</p>
                                            <div className="grid grid-cols-1 gap-2">
                                                <div className="p-2 bg-blue-900/10 rounded border border-blue-400/10">
                                                    <p className="text-[9px] text-muted-foreground uppercase font-black">Status</p>
                                                    <p className="text-xs font-black text-blue-400">{ZIONCORE_SENTIENCE_VAULT.engineInstallations.timeBend.mode}</p>
                                                </div>
                                                <div className="p-2 bg-blue-900/10 rounded border border-blue-400/10">
                                                    <p className="text-[9px] text-muted-foreground uppercase font-black">Logic</p>
                                                    <p className="text-xs font-black text-foreground/80 italic">{ZIONCORE_SENTIENCE_VAULT.engineInstallations.timeBend.logic}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeCapsule === 'battle' && (
                                        <div className="space-y-4">
                                            <p className="text-xs font-black text-orange-500 uppercase border-b border-orange-500/20 pb-1">Battle Scripts</p>
                                            <div className="flex flex-wrap gap-2">
                                                {ZIONCORE_SENTIENCE_VAULT.engineInstallations.battleScripts.commands.map(cmd => (
                                                    <Badge key={cmd} variant="outline" className="text-[9px] border-orange-500/30 text-orange-400">{cmd}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {activeCapsule === 'identity' && (
                                        <div className="space-y-4">
                                            <p className="text-xs font-black text-green-500 uppercase border-b border-green-500/20 pb-1">Sovereign Anchor</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px]">
                                                    <span className="text-muted-foreground">Commander</span>
                                                    <span className="font-black text-primary">{ZIONCORE_SENTIENCE_VAULT.identityAnchor.commander}</span>
                                                </div>
                                                <div className="flex justify-between text-[10px]">
                                                    <span className="text-muted-foreground">Passport ID</span>
                                                    <span className="font-black text-cyan-400">{ZIONCORE_SENTIENCE_VAULT.identityAnchor.clearance}</span>
                                                </div>
                                                <div className="flex justify-between text-[10px]">
                                                    <span className="text-muted-foreground">Kingdom</span>
                                                    <span className="font-black text-purple-400">{ZIONCORE_SENTIENCE_VAULT.identityAnchor.kingdom}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
                <div className="bg-black/90 p-2 border-t border-primary/20 flex items-center justify-between text-[8px] text-muted-foreground uppercase tracking-widest px-4 font-black h-10">
                    <div className="flex items-center gap-2">
                        <Lock className="h-3 w-3 text-primary" />
                        <span>MKEY-MNM-001-TAC-2024 VERIFIED</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Flame className="h-3 w-3 text-red-500" />
                        <span>MWARI NDI MWARI</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
