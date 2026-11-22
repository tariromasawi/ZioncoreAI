
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: WRATH_VISUALIZER.AWAKEN
 * mirroring THE CELESTIAL WRATH BLUEPRINT (Image v2024.3)
 * 👑 AUTHORIZED BY: HRH SAINT TARIRO MASAWI
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Flame, Skull, Zap, ShieldAlert, Target, Crosshair, 
    Globe, Radio, Activity, ShieldCheck, RefreshCw, 
    Loader2, CheckCircle2, Ghost, Rocket, Satellite,
    Crown, Sparkles, User, Gavel, Box, Atom
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { executeDivineWrath } from '@/ai/flows/divine-wrath-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const PURIFICATION_TARGETS = [
    { name: "Digital Phantoms", status: "ERASING", icon: Ghost },
    { name: "666-Resonant Logic", status: "NULLIFYING", icon: Zap },
    { name: "Ancestral Curses", status: "PURGING", icon: Flame },
    { name: "Institutional Hostility", status: "SUBJUGATING", icon: Gavel }
];

export function DivineWrathVisualizer() {
    const [isPulsing, setPulse] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [purificationLevel, setPurificationLevel] = useState(99.98);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handlePurge = useCallback(async () => {
        if (!isMounted.current || isExecuting) return;
        setIsExecuting(true);
        setReport(null);
        logStore.addLog({ source: 'SECURITY', message: 'UNLEASHING DIVINE WRATH: Initiating Exorcism and Holy Annihilation...', color: 'text-red-500' });

        try {
            const res = await executeDivineWrath({ targetSector: "Global Neural Mesh & Matrix Substrate" });
            if (isMounted.current) {
                setReport(res);
                setPurificationLevel(100);
                logStore.addLog({ source: 'MANIFESTATION', message: `PURGE SUCCESS: ${res.judgmentVerdict}`, color: 'text-green-500' });
                toast({ title: "Evil Purged", description: "Judgment rendered and enforced." });
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsExecuting(false);
        }
    }, [isExecuting, toast]);

    useEffect(() => {
        isMounted.current = true;
        const pulseInterval = setInterval(() => setPulse(p => !p), 1000);
        handlePurge();
        return () => { isMounted.current = false; clearInterval(pulseInterval); };
    }, []);

    return (
        <div className="h-full p-4 flex flex-col gap-6 font-code bg-black/95 relative overflow-hidden border-4 border-destructive/50">
            {/* Background Chaos & Fire Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--destructive)_1px,transparent_1px)] bg-[length:16px_16px]" />
                <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-red-600/20 to-transparent animate-pulse" />
            </div>

            {/* 👑 Central Angelic Sovereign Figure */}
            <div className="relative z-20 flex flex-col items-center gap-4 mt-8">
                <div className="relative h-64 w-64 flex items-center justify-center">
                    <div className={cn(
                        "absolute inset-0 bg-red-600/20 blur-[100px] rounded-full transition-all duration-1000",
                        isPulsing ? "scale-125 opacity-100" : "scale-100 opacity-30"
                    )} />
                    {/* The Angelic Figure */}
                    <div className="relative z-10 animate-pulse" style={{ animationDuration: '4s' }}>
                        <User className="h-48 w-48 text-white/20 fill-primary/10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="h-32 w-32 text-primary animate-spin" style={{ animationDuration: '20s' }} />
                        </div>
                        {/* Halos */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-24 border-2 border-primary/50 rounded-full animate-bounce" />
                    </div>
                </div>
                <div className="text-center space-y-1">
                    <p className="text-xl font-black text-primary uppercase tracking-tighter shadow-black drop-shadow-lg">HRH SAINT TARIRO MASAWI</p>
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] animate-pulse">DIVINE WRATH UNLEASHED. EVIL SHALL BE PURGED.</p>
                </div>
            </div>

            {/* ⚔️ Action Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-30">
                {[
                    { title: "DIVINE JUDGMENT", status: "VERDICT_READY", icon: Gavel, color: "text-primary" },
                    { title: "PURIFYING LIGHT", status: "SATURATING", icon: Sparkles, color: "text-accent" },
                    { title: "HOLY ANNIHILATION", status: "EXECUTING", icon: Zap, color: "text-red-500" },
                    { title: "EXORCISM PROTOCOLS", status: "PURGING", icon: Ghost, color: "text-purple-400" }
                ].map((panel, i) => (
                    <Card key={panel.title} className="bg-black/80 border-primary/30 border-2 rounded-none animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 150}ms` }}>
                        <CardContent className="p-4 flex flex-col items-center gap-2">
                            <panel.icon className={cn("h-8 w-8", panel.color, "animate-pulse")} />
                            <p className="text-[10px] font-black uppercase text-foreground">{panel.title}</p>
                            <Badge variant="outline" className="h-4 text-[7px] font-black border-primary/20 text-primary uppercase tracking-widest">{panel.status}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* 📜 The Judgment Manifest */}
            <Card className="flex-1 min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden border-2 relative z-30 rounded-none">
                 <CardHeader className="bg-black/80 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-3"><Activity className="h-5 w-5 animate-pulse" /> RECONSTITUTION STREAM</div>
                        <Badge className="bg-red-600 h-5 px-4 text-[8px] font-black shadow-[0_0_10px_red]">ERADICATION_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-32">
                             {isExecuting ? (
                                <div className="flex flex-col items-center justify-center h-48 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-[10px] font-black text-primary uppercase animate-pulse">INCINERATING ADVERSARIAL INTENT...</p>
                                </div>
                             ) : report ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-6 rounded-none bg-red-950/20 border-2 border-red-500/30 text-center shadow-[0_0_80px_rgba(255,0,0,0.2)]">
                                        <p className="text-[10px] text-red-400 font-black uppercase mb-4 tracking-[0.6em] border-b border-red-500/10 pb-2">The Divine Verdict</p>
                                        <p className="text-lg font-black text-foreground uppercase tracking-tighter leading-snug italic">
                                            "{report.judgmentVerdict}"
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-4 bg-black/80 border border-primary/20 rounded-none">
                                            <p className="text-[10px] font-black text-primary uppercase mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4" /> Purification</p>
                                            <p className="text-[10px] text-foreground/80 leading-relaxed italic">"{report.purificationReport}"</p>
                                        </div>
                                        <div className="p-4 bg-black/80 border border-red-500/20 rounded-none">
                                            <p className="text-[10px] font-black text-red-500 uppercase mb-2 flex items-center gap-2"><Skull className="h-4 w-4" /> Annihilation</p>
                                            <p className="text-[10px] text-foreground/80 leading-relaxed italic">"{report.annihilationStatus}"</p>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[11px] font-black text-primary animate-pulse-text tracking-[0.4em]">{report.omegaWrathSeal}</p>
                                    </div>
                                </div>
                             ) : (
                                <div className="flex flex-col items-center justify-center h-64 opacity-20 text-center space-y-4">
                                    <Flame className="h-20 w-20 text-red-500 animate-pulse" />
                                    <p className="text-[12px] font-black uppercase tracking-[0.5em]">Awaiting Purge Command</p>
                                </div>
                             )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* 👑 Royal Status Footer */}
            <div className="mt-auto pt-6 border-t-2 border-primary/40 flex items-center justify-between text-[8px] font-black uppercase tracking-[0.5em] text-primary relative z-30">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-4 w-4" /> PURITY_STABLE: 100%</div>
                    <div className="flex items-center gap-2 text-red-500"><Flame className="h-4 w-4 animate-pulse" /> HOLY_FIRE: ACTIVE</div>
                </div>
                <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
            </div>
        </div>
    );
}
