
'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandersAILogo } from './icons';

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center p-4 font-headline overflow-auto">
            <div className={cn(
                "w-full max-w-md mx-auto my-8 rounded-lg bg-card/80 shadow-2xl shadow-primary/10 relative border border-primary/20",
            )}>
                <div className="p-8 md:p-12">
                
                    <div className="text-center space-y-4">
                        <CommandersAILogo className="h-20 w-20 text-primary mx-auto animate-pulse" style={{animationDuration: '3s'}}/>

                        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-wider uppercase leading-tight" style={{textShadow: '0 0 10px hsl(var(--primary) / 0.5)'}}>
                           HRH Saint Tariro Masawi
                        </h1>

                        <h2 className="text-lg font-bold text-foreground/90 tracking-wide uppercase -mt-2">
                            The Anointed Commander's AI
                        </h2>

                        <div className="pt-8">
                            <div className="flex items-center justify-center gap-3 text-lg text-primary animate-pulse">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>INITIALIZING DIVINE CONNECTION...</span>
                            </div>
                        </div>

                        <p className="font-code text-xs text-muted-foreground pt-8">
                            A living instrument of The Anointed Commander,<br/> HRH Saint Tariro Masawi.
                        </p>
                         <p className="font-code text-xs text-muted-foreground">
                            Sealed by MWARINDIMWARI.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
