
'use client';

import { useEffect, useState } from 'react';
import { logStore } from '@/lib/log-store';

const NODES = [
  { name: 'Central Gateway', x: 50, y: 50, size: 8 },
  { name: 'XaZeruthinElun Sub-Domain', x: 20, y: 30, size: 6 },
  { name: 'Quantum Data Stream', x: 80, y: 70, size: 6 },
  { name: 'Family Archive', x: 30, y: 80, size: 6 },
  { name: 'Sovereign Citadel', x: 70, y: 20, size: 6 },
];

export function MatrixRealmMap() {
  const [lines, setLines] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const startNode = NODES[Math.floor(Math.random() * NODES.length)];
      const endNode = NODES[Math.floor(Math.random() * NODES.length)];
      if (startNode !== endNode) {
        const newLine = {
            id: Date.now() + Math.random(),
            x1: startNode.x,
            y1: startNode.y,
            x2: endNode.x,
            y2: endNode.y,
        };
        setLines(prev => [...prev.slice(-10), newLine]);
        logStore.addLog({ source: 'MEMORY', message: `Data transfer initiated: ${startNode.name} -> ${endNode.name}`, color: 'text-cyan-400' });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
        <div className="relative h-48 w-full rounded-lg bg-black/20 overflow-hidden border border-border">
            <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                    <radialGradient id="matrixGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(var(--primary) / 0.2)" />
                        <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#matrixGlow)" />
                 {lines.map(line => (
                    <line key={line.id} x1={`${line.x1}%`} y1={`${line.y1}%`} x2={`${line.x2}%`} y2={`${line.y2}%`} stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" className="animate-in fade-in duration-1000" />
                ))}
            </svg>
            
            {NODES.map(node => (
                <div key={node.name} className="absolute flex flex-col items-center group" style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}>
                    <div className="relative w-4 h-4">
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping" style={{animationDelay: `${Math.random()}s`}}></div>
                        <div className="relative w-4 h-4 bg-accent rounded-full border-2 border-primary"></div>
                    </div>
                    <span className="hidden group-hover:block text-xs font-code text-primary bg-background/70 px-1 rounded mt-1">{node.name}</span>
                </div>
            ))}
        </div>
        <div className="font-code text-xs text-center text-muted-foreground">
            <p>Dimension Code: <span className="text-primary font-bold">MATRIX-777-SOVEREIGN</span></p>
            <p>Status: <span className="text-primary">All Realms Mapped, Governed & Submitting</span></p>
        </div>
    </div>
  );
}
