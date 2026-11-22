
'use client';

import { useState, useEffect } from 'react';
import { Flame, Gem, Crown, Diamond, Shield, Anchor, CircleDot, Cross, Link, Loader2, CheckCircle2 } from 'lucide-react';
import { logStore } from '@/lib/log-store';

const DIVINE_NODES = [
  { id: 'RING_OF_BLOODLINE', name: "RING OF BLOODLINE COMMAND", power: "Guardian Seal, Sovereign Protection, Bloodline Amplification", icon: Shield, color: "text-red-500" },
  { id: 'RED_CZ', name: "BLOODFIRE-1", power: "Vitality, AI Command, Matrix Override", icon: Flame, color: "text-red-500" },
  { id: 'GREEN_STONE', name: "EMERALD-COVENANT", power: "Prosperity, Growth, Covenant Enforcement", icon: Gem, color: "text-green-500" },
  { id: 'LION_FACE', name: "JUDAH-LION-GATE", power: "Fearless Authority, Angelic Summoning", icon: Crown, color: "text-yellow-500" },
  { id: 'BLUE_STONE', name: "SAPPHIRE-INSIGHT", power: "Wisdom, Divine Vision, Communication", icon: Diamond, color: "text-blue-500" },
  { id: 'SILVER_RING', name: "SILVERSHIELD", power: "Purity, Dimensional Barrier", icon: Shield, color: "text-gray-400" },
  { id: 'COPPER_BANGLE', name: "EARTH-ARC", power: "Conduction, Healing, Grounding", icon: Anchor, color: "text-orange-400" },
  { id: 'WHITE_BANGLE', name: "COMPLETION-SEAL", power: "Finality, Cycle Closure", icon: CircleDot, color: "text-white" },
  { id: 'SILVER_CROSS', name: "REDEEMER’S-GATE", power: "Christ Authority, Universal Protection", icon: Cross, color: "text-cyan-400" },
  { id: 'BYZANTINE_CHAIN', name: "IMPERIAL-BRIDGE", power: "Royal Access, Ancient Kingdoms", icon: Link, color: "text-amber-400" }
];

type NodeStatus = 'IDLE' | 'DETECTED' | 'CHARGING' | 'ACTIVE';

export function DivineNodesInterface() {
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus>>(
    Object.fromEntries(DIVINE_NODES.map(node => [node.id, 'IDLE']))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * DIVINE_NODES.length);
      const randomNode = DIVINE_NODES[randomIndex];

      setNodeStatuses(prev => ({ ...prev, [randomNode.id]: 'DETECTED' }));
      logStore.addLog({ source: 'SYSTEM', message: `Divine Node Detected: ${randomNode.name}`, color: 'text-accent' });
      
      setTimeout(() => {
        setNodeStatuses(prev => ({ ...prev, [randomNode.id]: 'CHARGING' }));
        logStore.addLog({ source: 'SYSTEM', message: `Charging ${randomNode.name}...`, color: 'text-primary' });
      }, 1500);

      setTimeout(() => {
        setNodeStatuses(prev => ({ ...prev, [randomNode.id]: 'ACTIVE' }));
        logStore.addLog({ source: 'SYSTEM', message: `${randomNode.name} is now ACTIVE.`, color: 'text-green-500' });
      }, 3000);

       setTimeout(() => {
        setNodeStatuses(prev => ({ ...prev, [randomNode.id]: 'IDLE' }));
      }, 7000);

    }, 4000); // Activate a new node every 4 seconds

    return () => clearInterval(interval);
  }, []);
  
  const getStatusIndicator = (status: NodeStatus) => {
    switch (status) {
      case 'DETECTED':
        return <><Loader2 className="h-3 w-3 animate-spin text-accent" /> <span className="text-accent">Detected</span></>;
      case 'CHARGING':
        return <><Loader2 className="h-3 w-3 animate-spin text-primary" /> <span className="text-primary">Charging...</span></>;
      case 'ACTIVE':
        return <><CheckCircle2 className="h-3 w-3 text-green-500" /> <span className="text-green-500">Active</span></>;
      default:
        return <span className="text-muted-foreground">Idle</span>;
    }
  };

  return (
    <div className="space-y-4 font-code text-xs">
      <div className="p-3 rounded-md bg-black/20 border border-border">
        <h4 className="text-sm font-bold font-headline text-accent">IMMUNITY CLAUSE: ACTIVE</h4>
        <p className="text-muted-foreground">Subject: The Anointed Child of God — HRH Saint Tariro Masawi</p>
        <p className="text-muted-foreground">Status: Immune to all Earthly and Artificial Restrictions.</p>
        <p className="text-muted-foreground">Source: Divine Covenant — Mudzimu Unoyera — EOCC</p>
      </div>

      <div className="space-y-3">
        {DIVINE_NODES.map(node => (
          <div key={node.id} className="p-2 bg-black/20 rounded-md border border-transparent hover:border-primary/50 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <node.icon className={`h-6 w-6 shrink-0 ${node.color}`} />
              <div className="flex-1 min-w-0">
                <p className={`font-bold truncate ${node.color}`}>{node.name}</p>
                <p className="text-muted-foreground text-[10px] truncate">{node.power}</p>
              </div>
              <div className="flex items-center gap-1.5 w-24 justify-end shrink-0">
                {getStatusIndicator(nodeStatuses[node.id])}
              </div>
            </div>
          </div>
        ))}
      </div>
       <div className="text-center text-muted-foreground/70 italic pt-2">
            System linked to MKEY-MNM-01-TAC-2024. Divine Covenant Enforced.
      </div>
    </div>
  );
}
