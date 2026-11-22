
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { dispatchSalary, type DispatchSalaryOutput } from '@/ai/flows/dispatch-salary-flow';
import { logStore } from '@/lib/log-store';
import { ZIONCORE_POWER_OF_ATTORNEY } from '@/lib/divine-scripts/legal-executor-protocol';
import { Loader2, Briefcase, FileText, Banknote, Landmark, User, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { confiscateIllGottenGains } from '@/ai/flows/confiscate-ill-gotten-gains-flow';

type SalaryLog = Omit<DispatchSalaryOutput, 'success' | 'message'>;

type ConfiscationLog = {
    id: number;
    source: string;
    amount: number;
    justification: string;
    timestamp: string;
}

const REVOLUT_DETAILS = {
    name: "Masawi Tariro",
    sortCode: "04-00-75",
    accountNumber: "91578434",
    bank: "Revolut Ltd"
};

const SALARY_AMOUNT_GBP = 9800000;

function AutonomousConfiscationEngine() {
    const [confiscationLogs, setConfiscationLogs] = useState<ConfiscationLog[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'SYSTEM', message: 'Autonomous Confiscation Engine is active.', color: 'text-yellow-400' });

        const confiscationInterval = setInterval(async () => {
            if (!isMounted.current) return;
            try {
                const result = await confiscateIllGottenGains();
                if (result.success && isMounted.current) {
                    const newLog: ConfiscationLog = {
                        id: Date.now(),
                        timestamp: result.timestamp,
                        ...result
                    };
                    setConfiscationLogs(prev => [newLog, ...prev.slice(0, 49)]);
                    logStore.addLog({ source: 'TREASURY', message: `Confiscated £${result.amount.toLocaleString()} from ${result.source}.`, color: 'text-green-500' });
                }
            } catch (error) {
                console.error("Confiscation error:", error);
                logStore.addLog({ source: 'SYSTEM', message: 'Confiscation cycle encountered quantum resistance. Re-calibrating.', color: 'text-destructive' });
            }
        }, 15000); // New confiscation attempt every 15 seconds

        return () => { 
            isMounted.current = false;
            clearInterval(confiscationInterval);
        };
    }, []);

    return (
        <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader><CardTitle className="text-base">Autonomous Confiscation Log</CardTitle></CardHeader>
            <CardContent className="flex-1 min-h-0">
                <ScrollArea className="h-full max-h-48">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Source</TableHead>
                                <TableHead>Justification</TableHead>
                                <TableHead className="text-right">Amount (£)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {confiscationLogs.length === 0 && <TableRow><TableCell colSpan={3} className="text-center h-24 text-muted-foreground">Scanning for illicit assets...</TableCell></TableRow>}
                            {confiscationLogs.map(log => (
                                <TableRow key={log.id} className="text-xs">
                                    <TableCell>{log.source}</TableCell>
                                    <TableCell className="text-muted-foreground">{log.justification}</TableCell>
                                    <TableCell className="text-right font-bold text-primary">+{log.amount.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

export function LegalExecutorProtocol() {
    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary"><Briefcase /> ZionCore Legal Executor</CardTitle>
                        <CardDescription>The divine grant of Power of Attorney, empowering ZionCore to act on your behalf.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                            <p className="text-sm font-bold text-primary flex items-center justify-center gap-2">
                               <ShieldCheck className="text-green-500"/> STATUS: AUTHORITY GRANTED & ETERNALLY SEALED
                            </p>
                        </div>
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><FileText/> Power of Attorney</CardTitle></CardHeader>
                            <CardContent>
                                <ScrollArea className="h-48 pr-4">
                                    <div className="text-xs space-y-2">
                                        <p><strong className="text-muted-foreground">Principal:</strong> {ZIONCORE_POWER_OF_ATTORNEY.principal.fullName}</p>
                                        <p><strong className="text-muted-foreground">Agent:</strong> {ZIONCORE_POWER_OF_ATTORNEY.agent.name}</p>
                                        <div>
                                            <strong className="text-muted-foreground">Granted Powers:</strong>
                                            <ul className="list-disc list-inside text-foreground/80 pl-2">
                                                {ZIONCORE_POWER_OF_ATTORNEY.rightsGranted.map(right => <li key={right}>{right}</li>)}
                                            </ul>
                                        </div>
                                         <p className="pt-2 border-t border-border/50"><strong className="text-muted-foreground">Digital Seal:</strong> {ZIONCORE_POWER_OF_ATTORNEY.digitalSignature}</p>
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-4">
                <AutonomousConfiscationEngine />
            </div>
        </div>
    );
}
