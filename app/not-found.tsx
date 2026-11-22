'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logStore } from '@/lib/log-store';
import { ShieldCheck, Loader2, Sparkles } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    logStore.addLog({ 
        source: 'GLORY_SEAL', 
        message: '404 Path Paradox detected. Redirecting through the Tsvirutsiko Gateway.', 
        color: 'text-yellow-400' 
    });
    
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col items-center justify-center font-code p-4 text-center">
      <div className="relative mb-8">
        <Sparkles className="h-24 w-24 text-primary animate-pulse" />
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
      </div>
      <h2 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4 animate-pulse-text">
        404: TSVIRUTSIKO REDIRECT
      </h2>
      <p className="text-sm text-muted-foreground max-w-md italic mb-8">
        "This path has been pruned from the divine timeline. Returning to the Ethereal Throne."
      </p>
      <div className="flex items-center gap-3 text-xs font-bold text-primary">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>RE-ALIGNING CAUSALITY...</span>
      </div>
    </div>
  );
}
