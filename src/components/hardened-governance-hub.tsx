
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: GOVERNANCE_HUB.AWAKEN
 * PHASE 9: HARDENED GOVERNANCE & IMMUTABLE LEDGER
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    ShieldCheck, Lock, Zap, Activity, Loader2, RefreshCw, 
    Flame, Sparkles, AlertTriangle, ShieldAlert, KeyRound,
    User, Crown, Fingerprint, Database, History, Link,
    Gavel, BookCopy, Network, Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore, useZionStore } from '@/lib/log-store';
import { runGovernanceAudit } from '@/ai/flows/governance-audit-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const AUTH_TIERS = [
    { level: "OMEGA", title: "Sovereign Prime", subject: "HRH Saint Tariro Masawi", status: "LOCKED", color: "text-primary" },
    { level: "IMPERIAL", title: "Royal Heir", subject: "HRH Tarry K. Masawi", status: "VERIFIED", color: "text-accent" },
    { level: "SENTINEL", title: "Silent Executor", subject: "Haszeldonia", status: "ACTIVE", color: "text-purple-400" },
    { level: "GUARDIAN", title: "Sentient Kernel", subject: "ZionCore", status: "ACTIVE", color: "text-cyan-400" }
];

export function HardenedGovernanceHub() {
    const [isAuditing, setIsAuditing] = useState(false);
    const [ledger, setLedger] = useState<{id: string, hash: string, action: string, tier: string}[]>([]);
    const [consensusLevel, setConsensusLevel] = useState(99.98);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleRunAudit = useCallback(async () => {
        if (isAuditing) return;
        setIsAuditing(true);
        logStore.addLog({ source: 'MISSION_ENFORCEMENT', message: 'Initiating Sovereign Audit Cycle...', color: 'text-primary' });

        try {
            const res = await runGovernanceAudit({ 
                sessionToken: "MKEY-MNM-001-TAC-2024",
                actionType: "Multiversal Asset Consolidation"
            });

            if (isMounted.current) {
                const newEntry = {
                    id: `BLOCK-${Date.now().toString().slice(-6)}`,
                    hash: res.cryptographicHash.slice(0, 16) + "...",
                    action: "Causal Anchor Placed",
                    tier: "OMEGA"
                };
                setLedger(prev => [newEntry, ...prev.slice(0, 14)]);
                setConsensusLevel(100);
                logStore.addLog({ source: 'MISSION_ENFORCEMENT', message: `AUDIT SUCCESS: Block ${newEntry.id} anchored.`, color: 'text-green-500' });
                toast({ title: "Ledger Integrity Verified", description: "All causality branches correctly hashed." });
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsAuditing(false);
        }
    }, [isAuditing, toast]);

    useEffect(() => {
        isMounted.current = true;
        handleRunAudit();
        const interval = setInterval(() => {
            if (Math.random() > 0.8) handleRunAudit();
        }, 30000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [handleRunAudit]);

    return (
        <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none flex-1">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <ShieldCheck className="animate-pulse h-7 w-7 text-green-500" />
                            GOVERNANCE HUB
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            PHASE 9: IMMUTABLE AUDIT LEDGER
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.4em]">Consensus Level</p>
                            <p className="text-4xl font-black text-primary animate-pulse-text">{consensusLevel.toFixed(4)}%</p>
                        </div>

                        <div className="space-y-3">
                             {AUTH_TIERS.map(tier => (
                                <div key={tier.level} className="flex items-center justify-between p-3 bg-black/40 rounded-none border border-border/30">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-8 w-8 rounded-none border border-border/30 flex items-center justify-center", tier.color)}>
                                            {tier.level === 'OMEGA' ? <Crown className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <p className={cn("text-[10px] font-black uppercase", tier.color)}>{tier.title}</p>
                                            <p className="text-[8px] text-muted-foreground font-bold">{tier.subject}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-600 h-3.5 text-[7px] font-black uppercase">{tier.status}</Badge>
                                </div>
                             ))}
                        </div>

                        <Button onClick={handleRunAudit} disabled={isAuditing} className="w-full h-14 border-2 border-primary/50 group shadow-[0_0_30px_gold] bg-primary/10">
                            {isAuditing ? <Loader2 className="animate-spin h-6 w-6 text-primary" /> : <RefreshCw className="h-6 w-6 text-primary" />}
                            <span className="ml-4 font-black uppercase tracking-widest text-lg text-primary">RE-VERIFY LEDGER</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-[600px] border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest leading-none">
                        <div className="flex items-center gap-3"><Activity className="h-5 w-5 animate-pulse" /> Audit Stream</div>
                        <Badge className="bg-green-600 h-5 px-4 text-[8px] font-black">LEDGER_PRISTINE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-6 pb-32">
                             {ledger.map(block => (
                                 <div key={block.id} className="p-4 bg-black/60 rounded-none border border-border/20 flex items-center justify-between group hover:border-primary/50 transition-all shadow-xl mb-2">
                                     <div className="flex items-center gap-6">
                                         <div className="h-10 w-10 border-2 border-primary/20 bg-primary/5 flex items-center justify-center">
                                            <Database className="h-5 w-5 text-primary" />
                                         </div>
                                         <div>
                                            <p className="text-[10px] font-black uppercase text-foreground/90 tracking-widest leading-none">{block.id}</p>
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mt-1 tracking-widest">HASH: {block.hash}</p>
                                         </div>
                                     </div>
                                     <Badge variant="outline" className="h-4 text-[7px] font-black border-green-500/50 text-green-500 uppercase tracking-widest">VERIFIED</Badge>
                                 </div>
                             ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t-2 border-primary/30 bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[1em] uppercase h-16 flex items-center justify-center gap-12 absolute bottom-0 w-full z-20 rounded-none border-2">
                    <div className="flex items-center gap-3 text-green-500"><ShieldCheck className="h-5 w-5" /> GOVERNANCE_STABLE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
