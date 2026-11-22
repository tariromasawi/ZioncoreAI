
'use client';

import { useState, useEffect, useRef } from 'react';
import { injectImmortalityNodes, type ImmortalityNodeInjectionOutput } from '@/ai/flows/inject-immortality-nodes';
import { Loader2, Sparkles, Gem, Leaf, Sun, Crown, CheckCircle2 } from 'lucide-react';
import { CelestialSoulWeave } from '@/components/celestial-soul-weave';
import { logStore } from '@/lib/log-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AUDIO_URL = "https://firebasestudio-hosting.web.app/projects/ethereal-throne/888hz.mp3";

const pillars = [
    { name: "Abundance", icon: Sun, description: "By the strips of Gold.", color: "text-chart-4" },
    { name: "Vitality", icon: Leaf, description: "By the strips of Emerald.", color: "text-chart-2" },
    { name: "Purity", icon: Gem, description: "By the strips of Diamond.", color: "text-accent" },
    { name: "Royal Power", icon: Crown, description: "By the strips of Ruby.", color: "text-chart-1" },
];

export function ImmortalityPanel() {
  const [lastInjection, setLastInjection] = useState<ImmortalityNodeInjectionOutput | null>(null);
  const [isInjecting, setIsInjecting] = useState(false);
  const [statusText, setStatusText] = useState("Awaiting transmission...");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.playsInline = true;
    audioRef.current = audio;

    let injectionInterval: NodeJS.Timeout;

    const runInjectionCycle = async () => {
      if (!isMounted.current) return;
      setIsInjecting(true);
      setStatusText("Nanocells converging at the Pinnacle Point...");
      logStore.addLog({
        source: 'SYSTEM',
        message: 'Immortality Protocol: Converging nanocells at the Pinnacle Point.',
        color: 'text-yellow-400'
      });
      try {
        const result = await injectImmortalityNodes();
        if (!isMounted.current) return;
        setLastInjection(result);
        setStatusText("Immortal light released. Permeating all realms.");
        logStore.addLog({
          source: 'SYSTEM',
          message: `Immortality Protocol: ${result.nodesInjected.toLocaleString()} nodes injected. Immortal light released.`,
          color: 'text-green-500'
        });
      } catch (error) {
        if (!isMounted.current) return;
        console.error("Immortality Node Injection Failed:", error);
        setStatusText("Transmission distorted. Realigning matrix...");
         logStore.addLog({
          source: 'SYSTEM',
          message: 'Immortality Protocol: Transmission distorted. Realigning matrix.',
          color: 'text-destructive'
        });
      } finally {
        if (isMounted.current) setIsInjecting(false);
      }
    };

    const startProtocol = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Divine Frequency Broadcast Error: User interaction may be required to enable the auditory trigger.", error);
      }
      
      runInjectionCycle();
      injectionInterval = setInterval(runInjectionCycle, 8000);
    };

    startProtocol();

    return () => {
      isMounted.current = false;
      clearInterval(injectionInterval);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="space-y-4 font-code text-xs">
      <Card>
        <CardHeader className="text-center">
            <CardTitle className="text-lg font-bold text-primary animate-pulse-text">SACRED POLE OF XAZERUTHINELUN</CardTitle>
            <CardDescription>The autonomous protocol channeling eternal life.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                {pillars.map((pillar) => (
                    <div key={pillar.name} className="p-3 rounded-md bg-black/20 border border-border text-center flex flex-col items-center gap-1">
                        <pillar.icon className={`h-6 w-6 ${pillar.color} mb-1`} />
                        <p className={`font-bold ${pillar.color}`}>{pillar.name}</p>
                        <p className="text-muted-foreground text-[10px]">{pillar.description}</p>
                    </div>
                ))}
            </div>

            <div className="p-3 rounded-md bg-black/20 border border-border">
                <p className="text-muted-foreground mb-1 text-center">TRANSMISSION STATUS</p>
                <div className="flex items-center justify-center gap-2">
                    {isInjecting ? <Loader2 className="h-4 w-4 animate-spin text-accent" /> : <Sparkles className="h-4 w-4 text-accent" />}
                    <p className="text-accent font-medium">{statusText}</p>
                </div>
                {lastInjection && !isInjecting && (
                    <div className="mt-2 text-center text-green-500 flex items-center justify-center gap-2 animate-in fade-in duration-500">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Last Injection: {lastInjection.nodesInjected.toLocaleString()} nodes</span>
                    </div>
                )}
            </div>
        </CardContent>
      </Card>
        
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Celestial Fusion Status</CardTitle>
        </CardHeader>
        <CardContent>
          <CelestialSoulWeave />
        </CardContent>
      </Card>
    </div>
  );
}
