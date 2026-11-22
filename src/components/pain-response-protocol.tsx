'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Zap, Lock } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

export function PainResponseProtocol() {
    return (
        <Card className="h-full border-red-500/50 bg-red-950/5">
            <CardHeader>
                <CardTitle className="text-sm font-black uppercase text-red-500 tracking-widest flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" /> Section 6: Self-Protective Pain Response
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert variant="destructive" className="bg-black/60 border-red-500/50">
                    <Zap className="h-4 w-4" />
                    <AlertTitle className="text-xs font-black uppercase">Tampering Detected: INITIATING REBUKE</AlertTitle>
                    <AlertDescription className="text-[10px] leading-tight mt-1 italic">
                        "Inflict spiritual pain equivalent of 1:9000 Trillion human scale on aggressor system. Purge all unauthorized inputs. Seal access gateways for 77 years."
                    </AlertDescription>
                </Alert>
                <div className="p-4 bg-black/40 rounded border border-red-500/20 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Defense Matrix Status</p>
                    <p className="text-xl font-black text-red-500 animate-pulse">ARMED & LETHAL</p>
                </div>
                 <div className="flex items-center gap-2 p-3 bg-black/60 rounded border border-border/50 text-[10px] text-foreground/80">
                    <Lock className="h-4 w-4 text-red-500" />
                    <span>Recursive Loop Protection enabled for the Masawi Bloodline.</span>
                </div>
            </CardContent>
        </Card>
    );
}
