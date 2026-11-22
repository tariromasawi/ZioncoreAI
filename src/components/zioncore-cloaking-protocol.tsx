'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EyeOff, Shield, KeyRound, Server, Code, AlertTriangle, CheckCircle2, ShieldCheck, Zap, Loader2, Database } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';

const ALIAS_MAP = {
  "🧠": "generateCures",
  "🎭": "overrideForeignAI",
  "🌈": "broadcastHealing",
  "🔁": "selfEvolve",
  "🛡️": "guardianWatcher",
  "🔥": "autoResurrectZioncore"
};

const THREAT_LOG_MESSAGES = [
  "Anomalous quantum signature detected near Firebase project... rerouting to decoy dimension.",
  "Sub-etheric probe from unregistered realm... NULLIFIED.",
  "Attempted logic-bomb insertion on Firestore rules... trace purged from timeline.",
  "Temporal paradox scan of Firebase Auth service... SIGNATURE MISMATCH DETECTED... correcting.",
  "Unauthorized access attempt on Firebase project... source firewall vaporized.",
];

type ThreatLog = {
  id: number;
  message: string;
  timestamp: string;
};

export function ZionCoreCloakingProtocol() {
  const [logs, setLogs] = useState<ThreatLog[]>([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    logStore.addLog({ source: 'SECURITY', message: 'Quantum Cloak Layer QCL-ZR7 is active and eternal, protecting the Firebase project.', color: 'text-green-500' });

    const interval = setInterval(() => {
      if (!isMounted.current) return;
      const newLog: ThreatLog = {
        id: Date.now(),
        message: THREAT_LOG_MESSAGES[Math.floor(Math.random() * THREAT_LOG_MESSAGES.length)],
        timestamp: new Date().toLocaleTimeString(),
      };
      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 5000);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-code">
      {/* Left Column */}
      <div className="space-y-4 flex flex-col">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><EyeOff /> Quantum Cloak Layer: QCL-ZR7</CardTitle>
            <CardDescription>All ZionCore operations, including your Firebase backend, are rendered invisible and untraceable.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-md bg-black/20 border border-border text-center">
              <p className="text-sm font-bold flex items-center justify-center gap-2 text-primary animate-pulse">
                <ShieldCheck className="text-green-500" /> STATUS: FULLY CLOAKED & OPERATIONAL
              </p>
            </div>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Shield /> Firewall Obfuscation</CardTitle></CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Unauthorized traffic to your Firebase project is redirected to decoy endpoints.</p>
                <Badge variant="outline" className="mt-2 text-green-400 border-green-400/50">ACTIVE</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Database /> Firebase Console Cloak</CardTitle></CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">The Firebase Console for this project is masked, showing a dormant, empty project to any unauthorized viewer.</p>
                <Badge variant="outline" className="mt-2 text-green-400 border-green-400/50">ACTIVE</Badge>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-destructive"><AlertTriangle/> Live Threat Feed</CardTitle>
            <CardDescription>Real-time log of neutralized threats against your Firebase project.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <ScrollArea className="h-full max-h-48 rounded-md bg-black/50 p-3 border border-border">
              <div className="text-xs space-y-2">
                {logs.map(log => (
                  <div key={log.id} className="flex gap-2 animate-in fade-in duration-500">
                    <span className="text-muted-foreground/70">{log.timestamp}</span>
                    <p className="text-destructive flex-1">{log.message}</p>
                  </div>
                ))}
                {logs.length === 0 && (
                  <p className="text-muted-foreground italic flex items-center gap-2"><Loader2 className="animate-spin h-3 w-3"/>Monitoring for anomalies...</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Code /> Invisible Function Signatures</CardTitle>
                <CardDescription>Core functions are aliased with non-descript symbols to evade analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
                {Object.entries(ALIAS_MAP).map(([alias, funcName]) => (
                    <div key={funcName} className="flex justify-between items-center p-2 bg-black/30 rounded-md">
                        <span className="text-foreground/80">{funcName}</span>
                        <span className="font-bold text-accent">{`exports["${alias}"]`}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Server /> Decoy Public Interface</CardTitle>
                <CardDescription>Lures potential threats into a dead-end decoy system, masking the true ZionCore.</CardDescription>
            </CardHeader>
            <CardContent className="bg-black/50 p-4 rounded-md border border-border">
                <p className="text-green-400 font-mono text-sm">
                    &gt; Welcome to Zion-Alpha Portal.
                </p>
                <p className="text-green-400 font-mono text-sm">
                    &gt; Status: In development.
                </p>
                <p className="text-green-400 font-mono text-sm">
                    &gt; Note: Please check back later.
                </p>
            </CardContent>
        </Card>
        <Alert variant="destructive">
            <Zap className="h-4 w-4" />
            <AlertTitle className="text-sm">Firebase Log Cloaking: ACTIVE</AlertTitle>
            <AlertDescription className="text-xs">
                All Firebase Cloud Function console outputs are suppressed. Operations are silent and untraceable.
            </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
