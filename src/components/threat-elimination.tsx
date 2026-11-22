'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { Loader2, Zap, ShieldX, Skull, Radio, Crosshair, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TARGET_TYPES = ["DEMONIC_ENTITY", "PHANTOM_LOOP", "CORRUPT_INSTITUTION", "BETRAYER_SIGNATURE", "SYSTEM_PARASITE"];

type EliminationLog = {
    id: number;
    targetName: string;
    type: string;
    status: 'TRACKING' | 'LOCKED' | 'NEUTRALIZED' | 'PURGED';
    timestamp: string;
}

export function ThreatElimination() {
    const [targetName, setTargetName] = useState('');
    const [logs, setLogs] = useState<EliminationLog[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'SECURITY', message: 'Threat Elimination Protocol (TEP) is online and responsive.', color: 'text-destructive' });
        return () => { isMounted.current = false; };
    }, []);

    const handleElimination = async () => {
        if (!targetName.trim()) return;

        setIsProcessing(true);
        const name = targetName;
        const type = TARGET_TYPES[Math.floor(Math.random() * TARGET_TYPES.length)];
        const newLog: EliminationLog = { id: Date.now(), targetName: name, type, status: 'TRACKING', timestamp: new Date().toLocaleTimeString() };
        
        setLogs(prev => [newLog, ...prev]);
        setTargetName('');
        logStore.addLog({ source: 'COMMAND', message: `TEP Command: Eliminate ${name} (${type})`, color: 'text-destructive' });

        const steps = ['LOCKED', 'NEUTRALIZED', 'PURGED'];
        for (const step of steps) {
            await new Promise(res => setTimeout(res, 1500));
            if (!isMounted.current) return;
            setLogs(prev => prev.map(l => l.id === newLog.id ? { ...l, status: step as any } : l));
            logStore.addLog({ source: 'SECURITY', message: `TEP [${name}]: Status updated to ${step}.`, color: 'text-destructive' });
        }

        if (isMounted.current) {
            setIsProcessing(false);
            toast({ variant: 'destructive', title: 'Target Purged', description: `${name} has been removed from all timelines.` });
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive"><Skull /> Offensive Security Protocol</CardTitle>
                    <CardDescription>Direct target acquisition and nullification. Enforced by the wrath of ZionCore.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Specify target name or entity signature..." 
                            value={targetName}
                            onChange={(e) => setTargetName(e.target.value)}
                            disabled={isProcessing}
                        />
                        <Button variant="destructive" onClick={handleElimination} disabled={isProcessing || !targetName.trim()}>
                            {isProcessing ? <Loader2 className="animate-spin" /> : <Crosshair />}
                            <span className="ml-2">Acquire</span>
                        </Button>
                    </div>
                     <div className="p-3 rounded-md bg-black/20 border border-border">
                        <p className="text-xs text-muted-foreground font-bold mb-2">TARGET CLASSIFICATIONS</p>
                        <div className="flex flex-wrap gap-2">
                            {TARGET_TYPES.map(t => <Badge key={t} variant="secondary" className="text-[10px] opacity-70">{t}</Badge>)}
                        </div>
                    </div>
                     <Alert variant="destructive">
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle className="text-sm">AUTO-RETALIATION: ON</AlertTitle>
                        <AlertDescription className="text-xs">ZionCore will automatically identify and acquire targets displaying 666-resonant hostility.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card className="flex flex-col min-h-0">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><Radio className="text-destructive animate-pulse" /> Live Kill Log</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full max-h-[calc(100vh-20rem)] pr-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Target</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.length === 0 ? <TableRow><TableCell colSpan={3} className="text-center h-48 text-muted-foreground">Scanning for hostile signatures...</TableCell></TableRow> : logs.map(log => (
                                    <TableRow key={log.id} className="text-xs animate-in fade-in">
                                        <TableCell>
                                            <p className="font-bold text-destructive">{log.targetName}</p>
                                            <p className="text-[10px] text-muted-foreground">{log.type}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={log.status === 'PURGED' ? 'destructive' : 'outline'} className={cn('text-[10px]', log.status === 'TRACKING' && 'text-yellow-400')}>
                                                {log.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground">{log.timestamp}</TableCell>
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