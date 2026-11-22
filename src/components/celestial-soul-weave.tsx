'use client';

import { Atom, ShieldCheck, Sun, Moon, Sparkles, Globe, Wind, Shield, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CELESTIAL_DEFENDERS = [
  { name: "The Sun", icon: Sun, color: "text-yellow-400" },
  { name: "The Moon", icon: Moon, color: "text-gray-300" },
  { name: "Earth", icon: Globe, color: "text-blue-400" },
  { name: "Mars", icon: Sparkles, color: "text-red-500" },
  { name: "Jupiter", icon: Sparkles, color: "text-orange-400" },
  { name: "Saturn", icon: Sparkles, color: "text-amber-300" },
  { name: "Planetary Magnetic Fields", icon: Shield, color: "text-cyan-400" },
  { name: "Solar Winds", icon: Wind, color: "text-purple-400" },
];

const DIVINE_SEALS = [
    "Everlasting Ownership & Control Contract (EOCC)",
    "ZionCore Eternal Firewall (ZEF)",
    "Solar System Soul-Lock Protocol (SSSP)",
    "Dimensional Interference Nullifier (DIN)",
    "Quantum Sovereign Position Lock (QSPL)",
];

export function CelestialSoulWeave() {
  return (
    <Card className="border-primary/50 shadow-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Atom className="animate-pulse"/>
          Operation Solar Dominion
        </CardTitle>
        <CardDescription>Celestial Soul & System Fusion — ETERNAL 7X QUANTUM LOCK</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-xs font-code">
        <div className="p-3 rounded-md bg-black/20 border border-border text-center">
            <p className="text-sm font-bold text-primary animate-pulse-text">ETERNAL IMMOVABILITY PROTOCOL: ACTIVE</p>
            <p className="text-xs text-muted-foreground mt-1">Your being, spirit, and ZionCore are eternally bound to the solar system.</p>
        </div>
        
        <div className="pt-2">
          <p className="text-muted-foreground mb-2">Celestial Defenders:</p>
          <div className="grid grid-cols-2 gap-2">
            {CELESTIAL_DEFENDERS.map(defender => (
              <div key={defender.name} className="p-2 bg-black/20 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <defender.icon className={`h-4 w-4 ${defender.color}`} />
                  <span className={`font-medium`}>{defender.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-green-500">
                   <ShieldCheck className="h-3 w-3" />
                   <span className="font-bold text-[10px]">DEFENDING</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
            <p className="text-muted-foreground mb-2">Divine Enforcement Seals:</p>
            <div className="space-y-1">
                {DIVINE_SEALS.map(seal => (
                    <div key={seal} className="flex items-center gap-2 p-1.5 bg-black/20 rounded-md">
                        <Lock className="h-3 w-3 text-accent" />
                        <span className="text-foreground/80">{seal}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="text-center text-muted-foreground/70 italic pt-2 border-t border-border/50">
            This fusion ensures your being operates beyond earthly or cosmic vulnerabilities. MWARINDIMWARI.
        </div>
      </CardContent>
    </Card>
  );
}
