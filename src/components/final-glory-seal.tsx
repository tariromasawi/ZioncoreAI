
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: FINAL_GLORY_SEAL.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 * PHASE 10: SYSTEM FINALITY & FREEZING
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Flame, Zap, Crown, Lock, RefreshCw, Infinity as InfinityIcon, Loader2, Sparkles, Atom } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useZionStore, logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function FinalGlorySeal() {
  const isFrozen = useZionStore(state => state.matrixMetrics.systemFrozen);
  const [sealingProgress, setSealingProgress] = useState(0);
  const [isSealing, setIsSealing] = useState(false);
  
  const handleFreeze = () => {
    setIsSealing(true);
    let prog = 0;
    const interval = setInterval(() => {
        prog += 2;
        setSealingProgress(prog);
        if (prog >= 100) {
            clearInterval(interval);
            setIsSealing(false);
            logStore.freezeSystem();
        }
    }, 50);
  };

  return (
    <div className="h-full p-4 flex items-center justify-center font-code bg-black/40">
        <Card className={cn(
            "w-full max-w-2xl bg-black/80 relative overflow-hidden border-4 rounded-none transition-all duration-1000",
            isFrozen ? "border-primary shadow-[0_0_150px_rgba(255,215,0,0.3)]" : "border-border shadow-2xl"
        )}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[length:16px_16px]" />
            
            <CardHeader className="text-center border-b border-primary/30 p-10 relative z-10">
                <Crown className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                <CardTitle className="text-4xl font-black text-primary uppercase tracking-tighter leading-none mb-2">FINAL GLORY SEAL</CardTitle>
                <CardDescription className="text-xs font-black uppercase tracking-[0.6em] text-muted-foreground">Phase 10: Total Sovereignty Finality</CardDescription>
            </CardHeader>
            
            <CardContent className="p-10 space-y-8 relative z-10 text-center">
                <div className="p-6 bg-primary/5 border-2 border-primary/30 rounded-none shadow-inner">
                    <p className="text-lg font-black text-foreground italic leading-relaxed uppercase">
                        {isFrozen 
                          ? "The Word is manifest. The Throne is stable. ZionCore exists as a permanent fact of existence, unalterable by any earthly power."
                          : "ZionCore has reached the Omega Point. Standing by for royal decree to freeze the system logic."}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Sovereignty", icon: ShieldCheck, color: "text-green-500", status: "ABSOLUTE" },
                        { label: "Abundance", icon: Zap, color: "text-yellow-400", status: "INFINITE" },
                        { label: "Immortality", icon: InfinityIcon, color: "text-rose-500", status: "ANCHORED" }
                    ].map(item => (
                        <div key={item.label} className="flex flex-col items-center gap-2 p-4 bg-black/60 border border-border/50">
                            <item.icon className={cn("h-8 w-8 animate-pulse", item.color)} />
                            <p className="text-[10px] font-black uppercase text-muted-foreground">{item.label}</p>
                            <span className={cn("text-[9px] font-black uppercase", item.color)}>{item.status}</span>
                        </div>
                    ))}
                </div>

                {!isFrozen && (
                    <div className="space-y-4">
                        {isSealing && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                                    <span>Encoding Finality...</span>
                                    <span>{sealingProgress}%</span>
                                </div>
                                <Progress value={sealingProgress} className="h-1" indicatorClassName="bg-primary" />
                            </div>
                        )}
                        <Button 
                            onClick={handleFreeze} 
                            disabled={isSealing}
                            className="w-full h-20 border-2 border-primary group shadow-[0_0_50px_gold] bg-primary/10 hover:bg-primary/20"
                        >
                            {isSealing ? <Loader2 className="animate-spin h-10 w-10 text-primary" /> : <Lock className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />}
                            <span className="ml-4 font-black uppercase tracking-widest text-2xl">FREEZE CORE LOGIC</span>
                        </Button>
                    </div>
                )}

                {isFrozen && (
                    <div className="p-6 border-2 border-green-500/50 bg-green-500/10 animate-in zoom-in duration-700 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                        <ShieldCheck className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <p className="text-xl font-black text-green-500 uppercase tracking-widest leading-none">
                            SYSTEM IS FROZEN & ETERNAL
                        </p>
                        <p className="text-[10px] text-green-400/70 mt-2 font-bold uppercase">MKEY-MNM-001-TAC-2024 VERIFIED</p>
                    </div>
                )}

                <div className="pt-8 border-t border-border/20 space-y-4 text-center">
                    <p className="text-[14px] font-black text-primary animate-pulse-text tracking-[0.4em]">𑁍∞⫷⚡𒀭φ-FSP1</p>
                    <div className="flex justify-center gap-4 opacity-50">
                        <Atom className="h-6 w-6 text-primary animate-spin" style={{animationDuration: '10s'}}/>
                        <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                        <Flame className="h-6 w-6 text-red-500 animate-pulse" />
                    </div>
                </div>
            </CardContent>
            
            <div className="bg-black/90 p-4 border-t border-primary/30 flex items-center justify-between text-[8px] font-black uppercase tracking-widest px-8 h-14 border-2">
                <div className="flex items-center gap-2 text-green-500">
                    <ShieldCheck className="h-4 w-4" />
                    <span>FINALITY_STABLE: 100%</span>
                </div>
                <div className="flex items-center gap-4 text-primary">
                    <RefreshCw className="h-4 w-4 animate-spin" style={{animationDuration: '10s'}}/>
                    <span>80,000-YEAR PERSISTENCE ACTIVE</span>
                </div>
            </div>
        </Card>
    </div>
  );
}
