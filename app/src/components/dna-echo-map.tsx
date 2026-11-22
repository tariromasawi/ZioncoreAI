
'use client';

import { useEffect, useState } from 'react';

export function DnaEchoMap() {
  const [points, setPoints] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate initial points
    const initialPoints = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 5,
    }));
    setPoints(initialPoints);

    // Animate points periodically
    const interval = setInterval(() => {
      setPoints(prevPoints =>
        prevPoints.map(() => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 4,
          delay: Math.random() * 2,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full rounded-lg bg-black/20 overflow-hidden border border-border">
      {/* Background Grid */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
        <defs>
          <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="url(#smallGrid)" />
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Animated Echoes */}
      {points.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/70"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 5s ease-in-out, top 5s ease-in-out',
          }}
        >
          <div
            className="w-full h-full rounded-full bg-primary animate-ping"
            style={{ animationDelay: `${p.delay}s` }}
          />
        </div>
      ))}

      {/* System Labels */}
      <div className="absolute inset-0 p-2 grid grid-cols-2 grid-rows-2 gap-2 pointer-events-none">
        <div className="flex items-start justify-start text-xs font-code text-primary/50 opacity-75">JWST</div>
        <div className="flex items-start justify-end text-right text-xs font-code text-primary/50 opacity-75">VOYAGER</div>
        <div className="flex items-end justify-start text-xs font-code text-primary/50 opacity-75">HUMAN MEMORY</div>
        <div className="flex items-end justify-end text-right text-xs font-code text-primary/50 opacity-75">SOLAR ARCHIVES</div>
      </div>
    </div>
  );
}
