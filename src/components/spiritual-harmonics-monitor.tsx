
'use client';

import { useState, useEffect, useRef } from 'react';
import { logStore } from '@/lib/log-store';

const scanStatuses = [
    "CALIBRATING TO ZION PROTOCOL TONGUE...",
    "ANALYZING QUANTUM ENTANGLEMENTS...",
    "DETECTING SUBTLE CAUSALITY SHIFTS...",
    "NEUTRALIZING PRE-COGNITIVE THREATS...",
    "HARMONIZING WITH CELESTIAL FREQUENCIES...",
    "ALL TIMELINES SECURE. VIGILANCE CONTINUES.",
];

export function SpiritualHarmonicsMonitor() {
  const [status, setStatus] = useState(scanStatuses[0]);
  const statusIndex = useRef(0);

  useEffect(() => {
    const statusInterval = setInterval(() => {
        statusIndex.current = (statusIndex.current + 1) % scanStatuses.length;
        const newStatus = scanStatuses[statusIndex.current];
        setStatus(newStatus);
        logStore.addLog({ source: 'SECURITY', message: `Harmonics Monitor: ${newStatus}`, color: 'text-yellow-400' });
    }, 7500); // Update status every 7.5 seconds

    return () => {
        clearInterval(statusInterval);
    }
  }, []);

  return (
    <div className="space-y-4">
        <div className="h-20 w-full rounded-md bg-black/20 flex items-center justify-center overflow-hidden p-4 border border-border">
             <svg viewBox="0 0 100 40" className="w-full h-full">
                <defs>
                    <linearGradient id="harmonics-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: 'hsl(var(--accent))', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: 'hsl(var(--primary))', stopOpacity:1}} />
                    </linearGradient>
                </defs>
                <path
                    d="M 0 20 Q 5 10, 10 20 T 20 20 Q 25 10, 30 20 T 40 20 Q 45 10, 50 20 T 60 20 Q 65 10, 70 20 T 80 20 Q 85 10, 90 20 T 100 20"
                    stroke="url(#harmonics-grad)"
                    fill="none"
                    strokeWidth="2"
                >
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        values="0 0; 0 2; 0 0"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="d"
                        attributeType="XML"
                        values="M 0 20 Q 5 10, 10 20 T 20 20 Q 25 10, 30 20 T 40 20 Q 45 10, 50 20 T 60 20 Q 65 10, 70 20 T 80 20 Q 85 10, 90 20 T 100 20; M 0 20 Q 5 30, 10 20 T 20 20 Q 25 30, 30 20 T 40 20 Q 45 30, 50 20 T 60 20 Q 65 30, 70 20 T 80 20 Q 85 30, 90 20 T 100 20; M 0 20 Q 5 10, 10 20 T 20 20 Q 25 10, 30 20 T 40 20 Q 45 10, 50 20 T 60 20 Q 65 10, 70 20 T 80 20 Q 85 10, 90 20 T 100 20"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                </path>
             </svg>
        </div>
        <p className="font-code text-xs text-primary text-center animate-pulse-text truncate">
            {status}
        </p>
    </div>
  );
}
