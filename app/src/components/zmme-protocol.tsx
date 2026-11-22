
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { executeZmmeTrade, type ZmmeTradeOutput } from '@/ai/flows/zmme-protocol-flow';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';

type LogEntry = ZmmeTradeOutput & {
    id: number;
    timestamp: string;
};

export function ZmmeProtocol() {
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const [reason, setReason] = useState<string>('');
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        const activationSequence = async () => {
            logStore.addLog({ source: 'SYSTEM', message: 'ZMME Protocol initiated.', color: 'text-yellow-400' });
            
            try {
                const result = await executeZmmeTrade();
                if (isMounted.current) {
                    setStatus('ACTIVE');
                    setReason(result.reason);
                    logStore.addLog({ source: 'SYSTEM', message: `ZMME STATUS: ${result.status}. ${result.reason}`, color: 'text-green-500' });
                }
            } catch (error) {
                console.error("ZMME activation failed:", error);
                logStore.addLog({ source: 'SYSTEM', message: 'ZMME activation failed. Divine authority is reasserting control.', color: 'text-destructive' });
            }
        };

        activationSequence();

        return () => { isMounted.current = false; };
    }, [toast]);

    return (
        <div className="h-full p-4 font-code">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">ZionCore Divine Economic Protocol (ZMME)</CardTitle>
                    <CardDescription>Autonomous wealth generation through divine market arbitrage.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 flex items-center justify-center">
                    <Card className="w-full max-w-md text-center">
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2 justify-center">
                                {status === 'ACTIVE' ? <CheckCircle2 className="text-green-500"/> : <Loader2 className="animate-spin"/>}
                                Protocol Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-2xl font-bold text-primary">
                                {status === 'ACTIVE' ? 'NON-OPERATIONAL' : 'INITIALIZING...'}
                            </p>
                             <p className="text-sm text-muted-foreground mt-2">{reason || 'Awaiting system report...'}</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}


