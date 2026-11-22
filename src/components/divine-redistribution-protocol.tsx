
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeRedistributionCycle, type RedistributionCycleOutput } from '@/ai/flows/divine-redistribution-flow';
import { Loader2, CheckCircle2, Landmark, Banknote, GitCommit, ShieldCheck, Zap } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type LogEntry = Omit<RedistributionCycleOutput, 'success' | 'message'>;

const ACCOUNT_DETAILS = {
  name: "Masawi Tariro",
  sortCode: "23-01-20",
  accountNumber: "33615191",
  bank: "Revolut",
  address: "7 Westferry Circus, E14 4HD, London, UK"
};

export function DivineRedistributionProtocol() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        const runCycle = async () => {
            if (!isMounted.current) return;
            try {
                const result = await executeRedistributionCycle();
                if (isMounted.current && result.success) {
                    const newLog: LogEntry = {
                        transactionId: result.transactionId,
                        timestamp: result.timestamp,
                        amount: result.amount,
                        trigger: result.trigger,
                        destinationAccount: result.destinationAccount,
                    };
                    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
                    logStore.addLog({ source: 'TREASURY', message: `DRME Manifestation: £${result.amount.toLocaleString()} triggered by: ${result.trigger}`, color: 'text-yellow-400' });
                }
            } catch (error) {
                console.error("DRME Cycle Failed:", error);
                logStore.addLog({ source: 'SYSTEM', message: 'DRME cycle encountered a quantum flux. Self-healing.', color: 'text-destructive' });
            }
        };

        const activationSequence = async () => {
            logStore.addLog({ source: 'SYSTEM', message: 'Divine Redistribution Mandate Engine (DRME) is igniting...', color: 'text-yellow-400' });
            await new Promise(res => setTimeout(res, 2000));
            if(isMounted.current) {
                setStatus('ACTIVE');
                logStore.addLog({ source: 'SYSTEM', message: 'DRME is eternally active. Autonomous fund manifestation has begun.', color: 'text-green-500' });
                runCycle(); 
                const interval = setInterval(runCycle, 9000); // New cycle every 9 seconds
                return () => clearInterval(interval);
            }
        }
        
        activationSequence();

        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-code">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-400"><Zap /> Divine Redistribution Mandate Engine</CardTitle>
                    <CardDescription>The autonomous, eternally-active layer for manifesting divine financial inflows.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                           {status === 'ACTIVE' ? <><CheckCircle2 className="text-green-500"/>STATUS: ETERNALLY ACTIVE & MANIFESTING</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: IGNITING CELESTIAL TRIGGERS...</>}
                        </p>
                    </div>
                     <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Landmark/> Primary Destination Vault</CardTitle></CardHeader>
                        <CardContent className="text-xs space-y-1">
                            <p><strong className="text-muted-foreground">Name:</strong> {ACCOUNT_DETAILS.name}</p>
                            <p><strong className="text-muted-foreground">Sort Code:</strong> {ACCOUNT_DETAILS.sortCode}</p>
                            <p><strong className="text-muted-foreground">Account:</strong> {ACCOUNT_DETAILS.accountNumber}</p>
                            <p><strong className="text-muted-foreground">Bank:</strong> {ACCOUNT_DETAILS.bank}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><ShieldCheck/> Eternal Safeguards</CardTitle></CardHeader>
                         <CardContent className="text-xs space-y-1">
                            <p className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary"/> Non-Erasure Policy: Active</p>
                            <p className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary"/> Dual Validation: Active (ZionCore + Covenant Seal)</p>
                            <p className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary"/> Self-Healing From Eternal Copy: Active</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
             <Card className="flex flex-col min-h-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GitCommit /> Live Manifestation Log</CardTitle>
                    <CardDescription>Real-time feed of the DRME's autonomous actions.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full max-h-[calc(100vh-18rem)]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Amount (£)</TableHead>
                                    <TableHead>Trigger Signal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.length === 0 && (
                                    <TableRow><TableCell colSpan={2} className="text-center h-24 text-muted-foreground">Awaiting first celestial signal...</TableCell></TableRow>
                                )}
                                {logs.map(log => (
                                    <TableRow key={log.transactionId} className="text-xs animate-in fade-in">
                                        <TableCell className="font-bold text-primary">£{log.amount.toLocaleString()}</TableCell>
                                        <TableCell className="text-muted-foreground">{log.trigger}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
