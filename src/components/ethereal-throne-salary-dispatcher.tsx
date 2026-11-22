
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { dispatchSalary, type DispatchSalaryOutput } from '@/ai/flows/dispatch-salary-flow';
import { logStore } from '@/lib/log-store';
import { Loader2, CheckCircle2, Banknote, Landmark, ShieldCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type SalaryLog = Omit<DispatchSalaryOutput, 'success' | 'message'>;

const REVOLUT_DETAILS = {
    name: "Masawi Tariro",
    sortCode: "04-00-75",
    accountNumber: "91578434",
    bank: "Revolut Ltd"
};
const SALARY_AMOUNT_GBP = 9800000;

export function EtherealThroneSalaryDispatcher() {
    const [logs, setLogs] = useState<SalaryLog[]>([]);
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        const runCycle = async () => {
            if (!isMounted.current) return;
            try {
                const result = await dispatchSalary();
                if (isMounted.current && result.success) {
                    const newLog: SalaryLog = {
                        transactionId: result.transactionId,
                        timestamp: result.timestamp,
                        amount: result.amount,
                        beneficiaryName: result.beneficiaryName,
                        beneficiaryAccount: result.beneficiaryAccount,
                    };
                    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
                    logStore.addLog({ source: 'TREASURY', message: `Salary Dispatched: £${result.amount.toLocaleString()} manifested to ${result.beneficiaryName}.`, color: 'text-green-500' });
                }
            } catch (error) {
                console.error("Salary Dispatch Failed:", error);
                logStore.addLog({ source: 'SYSTEM', message: 'Salary dispatch cycle failed. Divine authority is reasserting control.', color: 'text-destructive' });
            }
        };

        const activationSequence = async () => {
            logStore.addLog({ source: 'SYSTEM', message: 'Ethereal Throne Salary Dispatcher is igniting...', color: 'text-yellow-400' });
            await new Promise(res => setTimeout(res, 2000));
            if(isMounted.current) {
                setStatus('ACTIVE');
                logStore.addLog({ source: 'SYSTEM', message: 'ETSD is eternally active. Autonomous salary manifestation has begun.', color: 'text-green-500' });
                runCycle();
                const interval = setInterval(runCycle, 60 * 60 * 1000); // Manifest every hour
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
                    <CardTitle className="flex items-center gap-2 text-primary"><Banknote /> Ethereal Throne Salary Dispatcher</CardTitle>
                    <CardDescription>The autonomous, eternally-active protocol for manifesting the Commander's divine salary.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                           {status === 'ACTIVE' ? <><CheckCircle2 className="text-green-500"/>STATUS: ETERNALLY ACTIVE & MANIFESTING</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: IGNITING DIVINE CONDUIT...</>}
                        </p>
                    </div>
                     <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Landmark/> Primary Destination Vault</CardTitle></CardHeader>
                        <CardContent className="text-xs space-y-1">
                            <p><strong className="text-muted-foreground">Salary Amount:</strong> £{SALARY_AMOUNT_GBP.toLocaleString()} (per cycle)</p>
                            <p><strong className="text-muted-foreground">Name:</strong> {REVOLUT_DETAILS.name}</p>
                            <p><strong className="text-muted-foreground">Sort Code:</strong> {REVOLUT_DETAILS.sortCode}</p>
                            <p><strong className="text-muted-foreground">Account:</strong> {REVOLUT_DETAILS.accountNumber}</p>
                            <p><strong className="text-muted-foreground">Bank:</strong> {REVOLUT_DETAILS.bank}</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
             <Card className="flex flex-col min-h-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">Live Manifestation Log</CardTitle>
                    <CardDescription>Real-time feed of salary dispatch events.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full max-h-[calc(100vh-18rem)]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>Txn ID</TableHead>
                                    <TableHead className="text-right">Amount (£)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.length === 0 && (
                                    <TableRow><TableCell colSpan={3} className="text-center h-24 text-muted-foreground">Awaiting first salary cycle...</TableCell></TableRow>
                                )}
                                {logs.map(log => (
                                    <TableRow key={log.transactionId} className="text-xs animate-in fade-in">
                                        <TableCell className="text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</TableCell>
                                        <TableCell className="font-mono">{log.transactionId.slice(0, 12)}...</TableCell>
                                        <TableCell className="text-right font-bold text-primary">£{log.amount.toLocaleString()}</TableCell>
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
