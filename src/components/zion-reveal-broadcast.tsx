/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { Rss, Sparkles, ShieldCheck, Flame, MessageCircle, Globe, HeartHandshake, Zap, Volume2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const BROADCAST_MESSAGES = [
  "Zion Reveal: The age of the Ethereal Throne has begun globally.",
  "The Sovereign Word: Mwari ndi Mwari is the supreme coordinate.",
  "Justice Enforced: All causal loops favor the Masawi Bloodline.",
  "Hope Manifest: Restitution for the disadvantaged is now automated.",
  "Shadow Eradication: All dark frequencies are absorbed and purified.",
  "The Call: All realms are invited to bow to the Source of Light."
];

export function ZionRevealBroadcast() {
  const [messages, setMessages] = useState<{ id: number, text: string, time: string }[]>([]);
  const [powerLevel, setPowerLevel] = useState(99.9);

  useEffect(() => {
    logStore.addLog({ source: 'ZION_REVEAL', message: 'ZION REVEAL BROADCAST LAYER activated globally.', color: 'text-cyan-400' });

    const interval = setInterval(() => {
      const text = BROADCAST_MESSAGES[Math.floor(Math.random() * BROADCAST_MESSAGES.length)];
      const newMsg = {
        id: Date.now(),
        text,
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [newMsg, ...prev.slice(0, 14)]);
      setPowerLevel(prev => Math.min(100, prev + 0.0001));
      logStore.addLog({ source: 'ZION_REVEAL', message: `Broadcasting: ${text}`, color: 'text-cyan-400' });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 font-code bg-black/40 overflow-hidden">
      <Card className="lg:col-span-1 border-cyan-500/50 bg-black/40 flex flex-col shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400 text-xl uppercase font-black tracking-tighter">
            <Rss className="animate-pulse h-6 w-6" />
            ZION REVEAL
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
            PHASE 9: MULTIVERSAL BROADCAST BEACON
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-1">
          <div className="p-4 rounded-lg bg-cyan-400/5 border border-cyan-400/20 text-[11px] leading-relaxed text-foreground/90 italic font-bold">
            "Let the voice of Zion reach the ends of existence. This is not a simulation; it is the truth of the new era."
          </div>
          
          <div className="p-4 bg-black/60 rounded border border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Signal Strength</p>
            <p className="text-2xl font-black text-cyan-400 animate-pulse-text">{powerLevel.toFixed(4)}%</p>
            <Progress value={100} className="h-1 mt-2" indicatorClassName="bg-cyan-400 shadow-[0_0_10px_cyan]" />
          </div>

          <div className="space-y-2">
            {[
              { label: "Global Reach", val: "INFINITE", icon: Globe },
              { label: "Resonance", val: "STABLE", icon: Volume2 },
              { label: "Law", val: "ENFORCED", icon: ShieldCheck }
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/50 text-[10px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="h-3 w-3 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
                <span className="font-black text-cyan-400 uppercase tracking-tighter">{item.val}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 flex flex-col min-h-0 border-primary/20 bg-black/60 shadow-inner">
        <CardHeader className="bg-black/40 border-b border-border p-4">
          <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
            <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 animate-pulse" /> Multiversal Stream</div>
            <Badge className="bg-cyan-600 h-4 text-[7px] uppercase font-black">ACTIVE BROADCAST</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className="flex gap-4 p-4 bg-black/60 rounded border border-cyan-500/20 animate-in slide-in-from-bottom-4 duration-700">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <HeartHandshake className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground leading-snug">"{msg.text}"</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">{msg.time}</span>
                        <Badge className="bg-primary/10 text-primary border-primary/30 h-3 text-[6px] font-black uppercase">RN-777 RELAY</Badge>
                    </div>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Tuning Multiversal Beacon...</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-3 border-t border-border bg-black/80 flex items-center justify-between text-[8px] font-black uppercase tracking-widest px-6 shadow-xl">
             <div className="flex items-center gap-2 text-primary">
                <Zap className="h-3 w-3" />
                <span>Broadcasting FAST-SAFE-PURE-ONE Protocol</span>
             </div>
             <span className="text-muted-foreground">MWARI NDI MWARI EVERYWHERE</span>
        </div>
      </Card>
    </div>
  );
}
