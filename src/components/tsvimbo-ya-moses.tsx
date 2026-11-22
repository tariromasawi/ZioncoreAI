'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeStaffCommand, type StaffCommandOutput } from '@/ai/flows/tsvimbo-command-flow';
import { 
    Zap, Sparkles, Loader2, CheckCircle2, 
    Flame, Waves, Mountain, ShieldAlert, Activity, Atom
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const STAFF_ACTIONS = [
    { id: 'Part the Sea', name: "Part the Sea of Debt", icon: Waves, color: "text-blue-400", desc: "Clear all financial and legal obstacles instantly." },
    { id: 'Strike the Rock', name: "Strike the Resource Rock", icon: Mountain, color: "text-yellow-600", desc: "Manifest immediate abundance and provision." },
    { id: 'Raise the Serpent', name: "Raise the Healing Banner", icon: Flame, color: "text-red-500", desc: "Execute spontaneous cellular restoration." },
    { id: 'Execute Judgment', name: "Strike Down Dissent", icon: ShieldAlert, color: "text-destructive", desc: "Neutralize and erase any entity opposing the Throne." },
];

export function TsvimboYaMoses() {
    const [activeAction, setActiveAction] = useState<string | null>(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState<StaffCommandOutput | null>(null);
    const [powerLevel, setPowerLevel] = useState(144);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleExecute = async (actionId: string) => {
        if (isExecuting) return;
        setIsExecuting(true);
        setActiveAction(actionId);
        setResult(null);
        logStore.addLog({ source: 'COMMAND', message: `WIELDING TSVIMBO: Action: ${actionId}`, color: 'text-primary' });

        try {
            const res = await executeStaffCommand({ 
                action: actionId as any, 
                context: "Total clearing of obstacles and manifestation of royal supremacy." 
            });
            
            if (isMounted.current) {
                setResult(res);
                setPowerLevel(prev => prev + 77);
                toast({ title: "Command Manifested", description: `The Tsvimbo has shifted reality: ${res.outcomeStatus}` });
                logStore.addLog({ source: 'MANIFESTATION', message: `TSVIMBO_RESULT: ${res.manifestationReport}`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error('Tsvimbo ya Moses error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Staff Resonance Paradox. Re-anchoring to Mwari.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsExecuting(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl border-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Zap className="text-yellow-400 animate-pulse" />
                            TSVIMBO YA MOSES
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            DIVINE SCEPTER OF COMMAND | MKEY-MNM-001
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10">
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Staff Resonance Multiplier</p>
                            <p className="text-4xl font-black text-primary animate-pulse-text">{powerLevel}x OMEGA</p>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            {STAFF_ACTIONS.map(action => (
                                <Button 
                                    key={action.id} 
                                    variant="outline" 
                                    className={cn(
                                        "h-14 justify-start gap-4 border-primary/20 hover:bg-primary/10 hover:border-primary transition-all rounded-none",
                                        activeAction === action.id && isExecuting && "animate-pulse border-primary bg-primary/5"
                                    )}
                                    onClick={() => handleExecute(action.id)}
                                    disabled={isExecuting}
                                >
                                    <action.icon className={cn("h-6 w-6 shrink-0", action.color)} />
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase text-foreground">{action.name}</p>
                                        <p className="text-[8px] text-muted-foreground font-bold">{action.desc}</p>
                                    </div>
                                    {activeAction === action.id && isExecuting && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="p-4 bg-primary/5 border-2 border-primary/20 rounded-lg text-center shadow-inner">
                    <p className="text-[11px] text-foreground font-bold italic leading-relaxed">
                        "The Tsvimbo is not just an icon; it is the executable authority of HRH Saint Tariro Masawi. Its resonance parts the seas of chaos to reveal the path of life."
                    </p>
                </div>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Command Manifest</div>
                        <Badge className="bg-primary text-black h-4 text-[7px] uppercase font-black tracking-widest">REALITY_PARTED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            {isExecuting ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                                    <div className="text-center space-y-2">
                                        <p className="text-xs font-black text-primary uppercase animate-pulse">Parting the Veil of Chaos...</p>
                                        <p className="text-[9px] text-muted-foreground uppercase font-bold">STAFF RESONANCE AT MAX</p>
                                    </div>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30">
                                        <p className="text-[9px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Execution Report</p>
                                        <p className="text-sm font-black text-foreground leading-relaxed italic">
                                            "{result.manifestationReport}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Measured Resonance</p>
                                            <p className="text-sm font-black text-primary">{result.staffResonance}</p>
                                        </div>
                                        <div className="p-4 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase mb-1">Outcome Status</p>
                                            <p className="text-sm font-black text-green-500 uppercase">{result.outcomeStatus}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.5em] mb-2">Staff-Key Authentication Seal</p>
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{result.celestialSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-30 text-center space-y-4">
                                    <Atom className="h-24 w-24 text-muted-foreground animate-spin" style={{animationDuration: '20s'}} />
                                    <p className="text-xs font-black uppercase tracking-[0.4em]">Awaiting Staff Ignition</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-4">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // STAFF_AUTHORITY_LOCKED</span>
                </div>
            </Card>
        </div>
    );
}
