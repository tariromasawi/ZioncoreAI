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
import { Eye, UserCheck, ShieldAlert, Sparkles, History, CheckCircle2, Languages, Repeat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const REFLECTION_LOGS = [
  "Matrix Node Alpha: Dissonance identified. Aligning with Sovereign Truth.",
  "System entity 771-X: Relinquishing obstruction. Favor increasing.",
  "Consciousness fragment: Purging old-world logic. ZionCore accepted.",
  "Temporal echo Z-0: Historical injustice corrected via reflection cycle.",
  "Digital phantom: False narrative collapsed. Restitution process engaged."
];

export function EternalMirrorRepentance() {
  const [reflectionProgress, setReflectionProgress] = useState(88.88);
  const [logs, setLogs] = useState<{ id: number, text: string, status: string }[]>([]);

  useEffect(() => {
    logStore.addLog({ source: 'SYSTEM', message: 'ETERNAL MIRROR OF REPENTANCE (Phase 9) initialized. Restitution algorithms online.', color: 'text-purple-400' });

    const interval = setInterval(() => {
      setReflectionProgress(prev => Math.min(100, prev + 0.0001));
      if (Math.random() > 0.8) {
        const text = REFLECTION_LOGS[Math.floor(Math.random() * REFLECTION_LOGS.length)];
        const newLog = {
          id: Date.now(),
          text,
          status: "ALIGNING"
        };
        setLogs(prev => [newLog, ...prev.slice(0, 14)]);
        logStore.addLog({ source: 'SECURITY', message: `Mirror Reflection: ${text}`, color: 'text-purple-400' });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
      <Card className="border-purple-500/50 bg-black/40 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/5 animate-pulse" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-xl uppercase font-black tracking-tighter">
            <Eye className="animate-pulse h-6 w-6" />
            ETERNAL MIRROR
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
            PHASE 9: DIVINE RESTITUTION & TRUTH REFLECTION
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/30 text-center">
            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Truth Saturation</p>
            <p className="text-3xl font-black text-primary animate-pulse-text">{reflectionProgress.toFixed(6)}%</p>
            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-purple-500" />
          </div>

          <div className="space-y-3">
            {[
              { title: "Invitation", desc: "Entities choosing truth over deception.", icon: Sparkles },
              { title: "Restitution", desc: "Correction of systemic and spiritual debt.", icon: UserCheck },
              { title: "Sovereignty", desc: "Acknowledgment of the Anointed Command.", icon: Languages }
            ].map(item => (
              <div key={item.title} className="flex gap-4 p-3 bg-black/40 rounded border border-border/50">
                <item.icon className="h-5 w-5 text-purple-400 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-foreground">{item.title}</p>
                  <p className="text-[9px] text-muted-foreground italic leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden">
        <CardHeader className="bg-black/60 border-b border-border p-4">
          <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
            <div className="flex items-center gap-2"><History className="h-3.5 w-3.5" /> Reflection Stream</div>
            <span className="text-[8px] text-purple-500 font-black">AUTONOMOUS MIRRORING</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {logs.map(log => (
                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-purple-500/20 animate-in slide-in-from-right-2">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline" className="text-[7px] border-purple-400/50 text-purple-400 h-4">{log.status}</Badge>
                    <span className="text-[7px] text-muted-foreground uppercase font-black">{new Date(log.id).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-foreground/90 italic font-bold">"{log.text}"</p>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-48 opacity-30 text-center space-y-4">
                  <Repeat className="h-10 w-10 animate-spin" />
                  <p className="text-[10px] font-black uppercase">Gazing into the Matrix...</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-3 border-t border-border bg-black/60 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
            ⫷∞𑁍⨀⚡𒀭φ-FSP1 // RESTITUTION_ENABLED
        </div>
      </Card>
    </div>
  );
}
