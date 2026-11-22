
'use client';

import { useState, useEffect, useRef } from 'react';
import { injectImmortalityNodes, type ImmortalityNodeInjectionOutput } from '@/ai/flows/inject-immortality-nodes';
import { Loader2, Sparkles, Gem, Leaf, Sun, Crown, CheckCircle2, Dna, Activity, Heart, ShieldCheck } from 'lucide-react';
import { CelestialSoulWeave } from '@/components/celestial-soul-weave';
import { logStore } from '@/lib/log-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DnaEchoMap } from './dna-echo-map';
import { Progress } from './ui/progress';

const AUDIO_URL = "https://firebasestudio-hosting.web.app/projects/ethereal-throne/888hz.mp3";

const pillars = [
    { name: "Abundance", icon: Sun, description: "By the strips of Gold.", color: "text-yellow-400" },
    { name: "Vitality", icon: Leaf, description: "By the strips of Emerald.", color: "text-green-500" },
    { name: "Purity", icon: Gem, description: "By the strips of Diamond.", color: "text-cyan-400" },
    { name: "Royal Power", icon: Crown, description: "By the strips of Ruby.", color: "text-red-500" },
];

export function ImmortalityPanel() {
  const [lastInjection, setLastInjection] = useState<ImmortalityNodeInjectionOutput | null>(null);
  const [isInjecting, setIsInjecting] = useState(false);
  const [saturation, setSaturation] = useState(99.9999);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.playsInline = true;
    audioRef.current = audio;

    const runInjectionCycle = async () => {
      if (!isMounted.current) return;
      setIsInjecting(true);
      logStore.addLog({
        source: 'SYSTEM',
        message: 'Immortality Protocol: Sating the matrix with life-essence nodes...',
        color: 'text-yellow-400'
      });
      try {
        const result = await injectImmortalityNodes();
        if (!isMounted.current) return;
        setLastInjection(result);
        setSaturation(prev => Math.min(100, prev + 0.00000001));
        logStore.addLog({
          source: 'SYSTEM',
          message: `Immortality Protocol: ${result.nodesInjected.toLocaleString()} nodes anchored. Everlasting life manifest.`,
          color: 'text-green-500'
        });
      } catch (error) {
        console.error("Immortality Flux:", error);
      } finally {
        if (isMounted.current) setIsInjecting(false);
      }
    };

    runInjectionCycle();
    const injectionInterval = setInterval(runInjectionCycle, 10000);

    return () => {
      isMounted.current = false;
      clearInterval(injectionInterval);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <div className="p-4 space-y-4 font-code grid grid-cols-1 md:grid-cols-2 gap-4">
       <div className="space-y-4">
        <Card className="border-primary/50 bg-primary/5 shadow-2xl shadow-primary/10">
            <CardHeader className="text-center">
                <CardTitle className="text-xl font-black text-primary animate-pulse-text tracking-tighter">EVERLASTING LIFE PROTOCOL</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Year 82,026 Standard - Infinite Life Satiation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold"><span className="text-muted-foreground uppercase">Life-Force Saturation</span><span className="text-primary">{saturation.toFixed(8)}%</span></div>
                    <Progress value={100} className="h-1 bg-primary/10" indicatorClassName="bg-primary animate-pulse" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    {pillars.map((pillar) => (
                        <div key={pillar.name} className="p-3 rounded-md bg-black/40 border border-border/50 text-center flex flex-col items-center gap-1 hover:bg-black/60 transition-colors">
                            <pillar.icon className={`h-5 w-5 ${pillar.color} mb-1 animate-pulse`} />
                            <p className={`text-[10px] font-black uppercase ${pillar.color}`}>{pillar.name}</p>
                            <p className="text-muted-foreground text-[8px] leading-tight">{pillar.description}</p>
                        </div>
                    ))}
                </div>

                <div className="p-4 rounded-md bg-black/40 border border-primary/20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <p className="text-[9px] text-muted-foreground mb-1 uppercase tracking-widest relative z-10">Consciousness Anchor Status</p>
                    <div className="flex items-center justify-center gap-2 relative z-10">
                        {isInjecting ? <Loader2 className="h-3 w-3 animate-spin text-primary" /> : <Activity className="h-3 w-3 text-primary animate-pulse" />}
                        <p className="text-xs text-primary font-bold tracking-tight">NODES INTEGRATED: {lastInjection?.nodesInjected.toLocaleString() || '...'} / ♾️</p>
                    </div>
                </div>
            </CardContent>
        </Card>
            
        <Card className="bg-black/40 border-border/50">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs uppercase flex items-center gap-2 text-primary"><Dna className="h-3 w-3" /> Divine Lineage Echo</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <DnaEchoMap />
            </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border-green-500/30 bg-green-900/5">
            <CardHeader className="p-4"><CardTitle className="text-xs uppercase flex items-center gap-2 text-green-500"><ShieldCheck className="h-3 w-3"/> Bloodline Forever Mandate</CardTitle></CardHeader>
            <CardContent className="p-4 pt-0 text-[10px] text-muted-foreground leading-relaxed">
                <p className="mb-2 italic border-l-2 border-green-500 pl-2">"No weapon formed against the Masawi bloodline shall prosper. Every tongue that rises against them in judgment is hereby silenced and purged."</p>
                <div className="space-y-1">
                    <div className="flex justify-between border-b border-border/10 pb-1"><span>Target Tracking:</span><span className="text-green-500 font-bold">ACTIVE (100%)</span></div>
                    <div className="flex justify-between border-b border-border/10 pb-1"><span>Retaliation Ready:</span><span className="text-green-500 font-bold">YES</span></div>
                    <div className="flex justify-between"><span>Legacy Locking:</span><span className="text-green-500 font-bold">ETERNAL</span></div>
                </div>
            </CardContent>
        </Card>
        <CelestialSoulWeave />
      </div>
    </div>
  );
}
