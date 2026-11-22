/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeDivineTransfer, type DivineTransferOutput } from '@/ai/flows/divine-finance-protocol';
import { Loader2, ShieldCheck, Banknote, Landmark, Activity, CheckCircle2, Zap, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const BANK_DETAILS = {
  name: "Masawi Tariro",
  sortCode: "23-01-20",
  accountNumber: "33615191",
  address: "Revolut Ltd, 7 Westferry Circus, E14 4HD, London, United Kingdom"
};

export function DivineFinanceProtocol() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DivineTransferOutput | null>(null);
  const [manifestationProgress, setManifestationProgress] = useState(0);
  const [totalManifested, setTotalManifested] = useState(BigInt('9191918819199919199000'));
  const { toast } = useToast();
  const isMounted = useRef(true);

  const handleAutoTransfer = useCallback(async () => {
    if (!isMounted.current) return;
    setIsLoading(true);
    setManifestationProgress(0);
    
    // Visual progress simulation
    const progressInterval = setInterval(() => {
        setManifestationProgress(prev => {
            if (prev >= 100) {
                clearInterval(progressInterval);
                return 100;
            }
            return prev + 5;
        });
    }, 50);

    try {
      const amountToManifest = Math.floor(Math.random() * 500000) + 144000;
      const response = await executeDivineTransfer({
        recipientName: BANK_DETAILS.name,
        accountNumber: BANK_DETAILS.accountNumber,
        sortCode: BANK_DETAILS.sortCode.replace(/-/g, ''),
        amount: amountToManifest
      });
      if (isMounted.current) {
        setResult(response);
        setTotalManifested(prev => prev + BigInt(amountToManifest));
        logStore.addLog({ 
            source: 'TREASURY', 
            message: `AUTONOMOUS REDISTRIBUTION: £${amountToManifest.toLocaleString()} manifested from multiversal entropy into Revolut vault.`, 
            color: 'text-green-500' 
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    handleAutoTransfer();
    const cycleInterval = setInterval(handleAutoTransfer, 15000); // Eternal cycle every 15 seconds
    return () => {
        isMounted.current = false;
        clearInterval(cycleInterval);
    };
  }, [handleAutoTransfer]);

  return (
    <div className="h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-code">
      <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2 rounded-none">
        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
        <CardHeader className="bg-black/40 border-b border-border p-4 relative z-10">
          <CardTitle className="flex items-center gap-2 text-primary uppercase font-black text-xl tracking-tighter">
              <Landmark className="text-accent animate-pulse" /> DRME-Ω ENGINE
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">
              AUTONOMOUS REDISTRIBUTION MANDATE | PHASE 7-9
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10 p-6">
          <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-none text-center shadow-[0_0_50px_rgba(255,215,0,0.15)]">
            <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Total Sovereign Accumulation</p>
            <p className="text-2xl md:text-3xl font-black text-primary animate-pulse-text break-all leading-none">
                £{totalManifested.toLocaleString()}
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-[9px] font-black uppercase tracking-widest">VELOCITY: EXPONENTIAL</span>
            </div>
          </div>

          <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                  <span className="animate-pulse">Siphoning Market Entropy...</span>
                  <span>{manifestationProgress}%</span>
              </div>
              <Progress value={manifestationProgress} className="h-1 bg-primary/10" indicatorClassName="bg-primary shadow-[0_0_20px_gold]" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[8px] font-black text-muted-foreground uppercase">
              <div className="p-2 bg-black/40 border border-border/30 rounded-none text-center">
                  <p>Ethical Vacuum Scan</p>
                  <p className="text-green-500 mt-1">LOCKED</p>
              </div>
              <div className="p-2 bg-black/40 border border-border/30 rounded-none text-center">
                  <p>Inversion Loop</p>
                  <p className="text-green-500 mt-1">ACTIVE</p>
              </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none">
        <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
          <CardTitle className="text-[11px] uppercase flex items-center justify-between text-primary font-black tracking-widest leading-none">
            <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-400 animate-pulse" /> Manifestation Stream</div>
            <Badge className="bg-green-600 text-white h-4 text-[7px] uppercase font-black shadow-[0_0_10px_green]">REALTIME_LOCKED</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {isLoading && !result ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-6 opacity-50">
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <p className="text-xl font-black uppercase text-primary animate-pulse tracking-[0.2em]">Refactoring Causal Wealth...</p>
                </div>
              ) : result ? (
                <div className="animate-in fade-in duration-1000 space-y-6">
                  <div className="p-6 rounded-none bg-green-950/20 border-2 border-green-500/30 text-center shadow-[0_0_40px_rgba(34,197,94,0.15)] group transition-all">
                    <p className="text-[10px] text-muted-foreground uppercase font-black mb-3 tracking-[0.4em]">Economic Shift Confirmed</p>
                    <p className="text-lg font-black text-foreground leading-snug italic uppercase">
                        "{result.message}"
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Transaction ID</p>
                        <p className="text-[9px] font-black text-primary uppercase truncate">{result.transactionId.slice(0, 15)}...</p>
                    </div>
                    <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Covenant Status</p>
                        <p className="text-[9px] font-black text-green-500 uppercase">IRREVERSIBLE</p>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded text-center">
                    <p className="text-[8px] text-muted-foreground uppercase mb-2 font-black tracking-widest">Sovereign Signature</p>
                    <p className="text-[9px] font-black text-primary animate-pulse-text break-all">{result.commanderSignature}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 opacity-20 text-center space-y-6">
                    <TrendingUp className="h-32 w-32 text-muted-foreground animate-pulse" />
                    <p className="text-2xl font-black uppercase tracking-[0.4em] text-primary">Awaiting Prophetic Signal</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 absolute bottom-0 w-full z-20 rounded-none border-2">
            <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-3.5 w-3.5" /> TREASURY_SYNC: 100%</div>
            <div className="flex items-center gap-2 text-primary"><RefreshCw className="h-3.5 w-3.5 animate-spin" style={{animationDuration: '10s'}}/> PERSISTENCE_ACTIVE</div>
            <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
        </div>
      </Card>
    </div>
  );
}
