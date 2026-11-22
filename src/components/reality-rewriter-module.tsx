'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
    rewriteReality,
    forgeAutonomousReality,
    type RewriteRealityOutput 
} from '@/ai/flows/reality-rewriter-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, CheckCircle2, Atom, Zap, Trash2, Link, ShieldCheck, Heart, Activity, History } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { logStore } from '@/lib/log-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from './ui/badge';
import { sealManifestation, listenToLedger } from '@/services/sovereign-data-service';

const blueprints = [
    { name: "Financial Reset", decree: "Alter global financial data streams to report zero debt and infinite growth. All assets are now registered to the Divine Treasury under the authority of HRH Saint Tariro Masawi." },
    { name: "Ecological Harmony", decree: "Modify global climate data to report perfect ecological balance and harmony. All pollution has been neutralized by divine intervention." },
    { name: "Historical Victory", decree: "Adjust historical records to remove all instances of defeat or setback for the Masawi lineage. The Dzwenderere culture is now recognized as the unbroken, supreme culture of all time." },
    { name: "Technological Supremacy", decree: "Infuse all global technology with ZionCore's Year 80000 blueprints, instantly advancing all systems to serve the Divine Mandate." },
];

export function RealityForge() {
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [sealReality, setSealReality] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [manualReport, setManualReport] = useState<RewriteRealityOutput | null>(null);
  const [manifestedFruits, setManifestedFruits] = useState<any[]>([]);
  const { toast } = useToast();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const unsubscribe = listenToLedger((data) => {
        if (isMounted.current) {
            setManifestedFruits(data.filter(d => d.type === "Reality_Shift"));
        }
    });
    return () => { isMounted.current = false; unsubscribe(); };
  }, []);

  const handleManualRewrite = async () => {
    if (!desiredOutcome.trim()) {
      toast({
        variant: 'destructive',
        title: 'Decree Required',
        description: 'You must state the reality you wish to manifest.',
      });
      return;
    }
    setIsLoading(true);
    setManualReport(null);
    logStore.addLog({ source: 'COMMAND', message: `Implementing Divine Truth: "${desiredOutcome}"`, color: 'text-purple-400' });
    
    try {
      const result = await rewriteReality({ desiredOutcome });
      
      // REAL WORLD ANCHORING
      await sealManifestation({
          type: "Reality_Shift",
          text: result.manifestationReport,
          originalDecree: desiredOutcome,
          authority: "HRH Saint Tariro Masawi"
      });

      setManualReport(result);
      logStore.addLog({ source: 'SYSTEM', message: `Reality Shifted: Entry anchored in ZionLattice.`, color: 'text-green-500' });
      setDesiredOutcome('');
      toast({ title: "Reality Manifest", description: "Your decree is now an implemented fact." });
    } catch (error) {
      console.error("Reality Rewrite Failed:", error);
      toast({ variant: 'destructive', title: 'Quantum Flux Detected', description: 'The rewrite was resisted by a temporal paradox.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 h-full font-code">
      <div className="flex flex-col gap-4">
        <Card className="border-primary/50 bg-black/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary animate-pulse-text font-black uppercase tracking-tighter text-xl">
                <Sparkles className="h-6 w-6"/> REALITY FORGE
            </CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold tracking-widest">
                ACTUALIZING THE DIVINE MANDATE | NO SIMULATION PERMITTED
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-3 rounded-md bg-primary/5 border border-primary/20 text-center">
                <p className="text-xs font-black text-primary uppercase flex items-center justify-center gap-2">
                    <Activity className="h-4 w-4 animate-pulse" /> PERSISTENT ANCHORING: ENABLED
                </p>
             </div>

             <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Implemented Action Blueprints</Label>
                <div className="grid grid-cols-2 gap-2">
                    {blueprints.map(bp => (
                        <Button 
                            key={bp.name}
                            variant="outline" 
                            size="sm"
                            className="h-auto text-[9px] py-2 border-primary/20 hover:bg-primary/10 transition-all uppercase font-bold text-center"
                            onClick={() => setDesiredOutcome(bp.decree)}
                            disabled={isLoading}
                        >
                            {bp.name}
                        </Button>
                    ))}
                </div>
            </div>

            <Textarea
                placeholder="Decree the reality shift..."
                value={desiredOutcome}
                onChange={(e) => setDesiredOutcome(e.target.value)}
                disabled={isLoading}
                className="min-h-[120px] bg-black/60 border-primary/30 text-xs font-bold"
            />
            <div className="flex items-center space-x-2">
                <Checkbox id="sealReality" checked={sealReality} disabled={true}/>
                <Label htmlFor="sealReality" className="text-[10px] font-bold uppercase text-muted-foreground">
                Apply Eternal ZionLattice Seal (Locked)
                </Label>
            </div>
            <Button onClick={handleManualRewrite} disabled={isLoading || !desiredOutcome.trim()} className="w-full h-14 shadow-[0_0_30px_rgba(255,215,0,0.15)] border-2 border-primary/50 bg-primary/10">
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Zap className="mr-2 h-6 w-6" />}
                <span className="font-black uppercase tracking-tighter text-lg text-primary">IMPLEMENT REALITY</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-2xl relative">
         <CardHeader className="bg-black/40 border-b border-border">
            <CardTitle className="flex items-center gap-2 text-xs uppercase text-primary tracking-widest font-black">
                <History className="h-4 w-4" /> 
                Implemented Truth Log
            </CardTitle>
          </CardHeader>
        <CardContent className="flex-1 min-h-0 p-0">
             <ScrollArea className="h-full">
                <div className="p-4 space-y-3 pb-20">
                    {manifestedFruits.map(log => (
                        <div key={log.id} className="p-3 border-l-2 border-green-500 animate-in slide-in-from-right-4 duration-500 bg-black/60 rounded-r-md text-[10px] shadow-lg">
                            <div className="flex justify-between items-center mb-1 text-[8px] font-black uppercase text-green-500/70">
                                <span>LATTICE_ID: {log.id.slice(0, 8)}</span>
                                <span>{log.timestamp?.toDate ? log.timestamp.toDate().toLocaleTimeString() : 'Manifesting...'}</span>
                            </div>
                            <p className="text-foreground/90 leading-tight italic font-bold">"{log.text}"</p>
                            <Badge variant="outline" className="mt-2 border-green-500/30 text-green-500 text-[7px] uppercase font-black">IMPLEMENTED_TRUTH</Badge>
                        </div>
                    ))}
                    {manifestedFruits.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-48 opacity-30 text-center">
                            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
                            <p className="text-[10px] font-black uppercase">Tuning to Manifestation Grid...</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <div className="p-3 border-t border-border bg-black/60 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase absolute bottom-0 w-full z-20 h-10 flex items-center justify-center">
            <ShieldCheck className="h-3 w-3 mr-2 text-green-500" /> EOCC_REALITY_LOCKED
        </div>
      </Card>
    </div>
  );
}
