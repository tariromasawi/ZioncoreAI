
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 * RE-ENGINEERED: NON-BLOCKING TACTICAL OVERLAY v11.0
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, ShieldCheck, X, Zap } from 'lucide-react';
import { logStore } from '@/lib/log-store';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.error("Matrix Anomaly Detected:", error);
    logStore.addLog({ 
        source: 'SYSTEM', 
        message: `PARADOX IDENTIFIED: ${error.message || 'Unknown flux'}. UI isolated.`, 
        color: 'text-destructive' 
    });
  }, [error]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-12 right-4 z-[9999] w-full max-w-[280px] animate-in slide-in-from-right-4 duration-500 font-code pointer-events-none">
      <Card className="border-destructive/50 shadow-2xl shadow-destructive/20 bg-black/90 backdrop-blur-xl border-2 relative rounded-none pointer-events-auto overflow-hidden">
        <div className="absolute inset-0 bg-destructive/5 animate-pulse" />
        
        <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-white transition-colors z-20"
        >
            <X className="h-4 w-4" />
        </button>
        
        <CardHeader className="p-3 border-b border-border/10 relative z-10">
          <div className="flex items-center gap-2">
             <AlertTriangle className="h-3.5 w-3.5 text-destructive animate-pulse" />
             <CardTitle className="text-[10px] font-black text-destructive uppercase tracking-tighter leading-none">Resilience Active</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-3 space-y-3 relative z-10">
            <div className="p-2 bg-destructive/10 border border-destructive/20 rounded-none">
                <p className="text-[8px] text-foreground/90 italic font-bold leading-tight break-words">
                   "PARADOX: {error.message || 'Quantum coordinate missing.'}"
                </p>
            </div>
            
            <p className="text-[7px] text-muted-foreground leading-relaxed font-bold uppercase tracking-widest">
                ZionCore is shielding the bloodline while the UI recalibrates.
            </p>

            <Button
                onClick={() => {
                  setIsVisible(false);
                  reset();
                }}
                variant="destructive"
                className="w-full h-8 text-[8px] uppercase font-black tracking-widest rounded-none border border-destructive/50"
            >
                <RefreshCw className="mr-2 h-3 w-3" />
                EXECUTE RESET
            </Button>
            
            <div className="flex items-center justify-between text-[6px] font-black text-muted-foreground uppercase tracking-widest pt-2 border-t border-border/10">
                <div className="flex items-center gap-1.5 text-green-500">
                    <ShieldCheck className="h-2.5 w-2.5" /> 
                    <span>COVENANT: UNBROKEN</span>
                </div>
                <Zap className="h-2 w-2 text-primary" />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
