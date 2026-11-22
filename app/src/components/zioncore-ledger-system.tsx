
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { generateLedgerEvent, type LedgerEvent } from '@/ai/flows/ledger-event-flow';
import { Loader2, CheckCircle2, AlertTriangle, FileText, Users, Eye, MessageSquare, BookCopy, Cloud, Lock, ArrowRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScribeChatDialog } from '@/components/scribe-chat';

const SOLIDITY_SCRIPT = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ZionCore Divine Estates & Trusts Fund
// Sealed by MWARINDIMWARI under EOCC-v1
contract DivineTrust {
    address public anointedCommander;
    mapping(address => uint256) public sovereignBalances;
    mapping(bytes32 => bool) private transactionNonces;

    event DivineTransfer(address indexed from, address indexed to, uint256 amount);
    event DivineDeposit(address indexed beneficiary, uint256 amount);

    constructor() {
        anointedCommander = msg.sender;
    }

    modifier onlyCommander() {
        require(msg.sender == anointedCommander, "ZLS: Divine authority required.");
        _;
    }

    function deposit(address _beneficiary, uint256 _amount) public onlyCommander {
        sovereignBalances[_beneficiary] += _amount;
        emit DivineDeposit(_beneficiary, _amount);
    }

    function executeSealedTransfer(address _from, address _to, uint256 _amount, bytes32 _nonce) public onlyCommander {
        require(!transactionNonces[_nonce], "ZLS: Transaction nonce already used.");
        require(sovereignBalances[_from] >= _amount, "ZLS: Insufficient sovereign funds.");
        
        transactionNonces[_nonce] = true;
        sovereignBalances[_from] -= _amount;
        sovereignBalances[_to] += _amount;

        emit DivineTransfer(_from, _to, _amount);
    }
}
`;

const CLOUD_FUNCTION_SCRIPT = `// Firebase Cloud Function for ZLS
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { ethers } = require("ethers"); // Example for blockchain interaction

admin.initializeApp();

// Callable function to interact with the DivineTrust smart contract on your behalf
exports.executeDivineTransaction = functions.https.onCall(async (data, context) => {
    // 1. Verify Authentication & Authorization via your Firebase ID token
    if (!context.auth || context.auth.token.role !== 'commander') {
        throw new functions.https.HttpsError('unauthenticated', 'This action requires your divine authority.');
    }
    
    const { from, to, amount, nonce } = data;

    // 2. Interact with the Blockchain (Conceptual)
    // const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    // const signer = new ethers.Wallet(process.env.COMMANDER_PRIVATE_KEY, provider);
    // const divineTrustContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, signer);
    // const tx = await divineTrustContract.executeSealedTransfer(from, to, amount, nonce);
    // await tx.wait();

    // 3. Log transaction to the immutable audit trail in your Firestore database
    const logRef = admin.firestore().collection('zls_audit_logs').doc();
    await logRef.set({
        transactionId: nonce,
        fromAddress: from,
        toAddress: to,
        amount: amount,
        executedBy: context.auth.uid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: "SUCCESS"
    });

    return { success: true, transactionId: nonce };
});
`;

type LogEntry = LedgerEvent & {
    id: string;
};

const COUNCIL_MEMBERS = [
    { name: "Elias Vance", role: "Chief Scribe", avatar: "EV" },
    { name: "Lyra Meadowlight", role: "Quantum Auditor", avatar: "LM" },
    { name: "Seraphina Vox", role: "Ethical Overseer", avatar: "SV" }
];

type ScribeLog = {
    id: number;
    scribe: string;
    message: string;
    timestamp: string;
}

export function ZionCoreLedgerSystem() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [scribeLogs, setScribeLogs] = useState<ScribeLog[]>([]);
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const isMounted = useRef(true);

    const addScribeLog = useCallback((scribe: string, message: string) => {
        if (!isMounted.current) return;
        const newScribeLog = {
            id: Date.now() + Math.random(),
            scribe,
            message,
            timestamp: new Date().toLocaleTimeString()
        };
        setScribeLogs(prev => [newScribeLog, ...prev.slice(0, 20)]);
    }, []);

    useEffect(() => {
        isMounted.current = true;
        const activationTimeout = setTimeout(() => {
            if (isMounted.current) {
                setStatus('ACTIVE');
                logStore.addLog({ source: 'SYSTEM', message: 'ZionCore Ledger System (ZLS) is now active.', color: 'text-green-500' });
            }
        }, 2000);

        return () => { isMounted.current = false; clearTimeout(activationTimeout); };
    }, []);

    useEffect(() => {
        if (status !== 'ACTIVE') return;

        const eventInterval = setInterval(async () => {
            if (!isMounted.current) return;
            try {
                const event = await generateLedgerEvent();
                if (isMounted.current) {
                    const newLog: LogEntry = { ...event, id: event.transactionId };
                    setLogs(prev => [newLog, ...prev.slice(0, 99)]);
                    logStore.addLog({ source: 'SYSTEM', message: `ZLS Event: ${event.description}`, color: event.riskLevel > 0.7 ? 'text-destructive' : 'text-cyan-400' });

                    if (event.status === 'Flagged') {
                        addScribeLog("Lyra Meadowlight", `Quantum signature anomaly detected in transaction ${event.transactionId.slice(0,8)}... Risk score is abnormally high. Escalating for divine review.`);
                    } else if (event.amount > 5000000) {
                        addScribeLog("Seraphina Vox", `Noting a significant wealth transfer of £${event.amount.toLocaleString()}. Ensuring alignment with divine justice protocols.`);
                    } else if (Math.random() < 0.3) {
                        addScribeLog("Elias Vance", `Transaction ${event.transactionId.slice(0,8)}... verified against the celestial ledger. All appears in order.`);
                    }
                }
            } catch (error) {
                console.error("Failed to generate ledger event:", error);
            }
        }, 5000);
        
        return () => clearInterval(eventInterval);
    }, [status, addScribeLog]);

    const getStatusBadge = (status: LedgerEvent['status']) => {
        switch (status) {
            case 'Pending':
                return <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">Pending</Badge>;
            case 'Verified':
                return <Badge variant="outline" className="text-green-400 border-green-400/50">Verified</Badge>;
            case 'Flagged':
                return <Badge variant="destructive">Flagged</Badge>;
            default:
                return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code">
             <ScribeChatDialog open={isChatOpen} onOpenChange={setIsChatOpen} />
            <div className="lg:col-span-3 flex flex-col min-h-0">
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileText /> ZionCore Divine Ledger</CardTitle>
                        <CardDescription>An immutable, blockchain-based record of all estate and trust fund transactions, recorded on your Firebase Firestore database.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[calc(100vh-16rem)]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Parties</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Risk</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {logs.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center h-48 text-muted-foreground"><Loader2 className="h-4 w-4 mx-auto animate-spin mb-2"/>Awaiting first ledger entry...</TableCell></TableRow> : logs.map(log => (
                                        <TableRow key={log.id} className="text-xs">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-1.5">
                                                    <span>{log.parties[0]}</span>
                                                    <ArrowRight className="h-3 w-3 text-muted-foreground"/>
                                                    <span>{log.parties[1]}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{log.description}</TableCell>
                                            <TableCell className="font-bold">£{log.amount.toLocaleString()}</TableCell>
                                            <TableCell className={cn(log.riskLevel > 0.7 ? 'text-destructive' : log.riskLevel > 0.4 ? 'text-yellow-400' : 'text-green-400')}>{log.riskLevel.toFixed(2)}</TableCell>
                                            <TableCell>{getStatusBadge(log.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><Users /> Council of Scribes</CardTitle>
                        <CardDescription>Oversees and verifies transactions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <Button className="w-full" onClick={() => setIsChatOpen(true)}><MessageSquare className="mr-2"/>Chat with Council</Button>
                       <Card className="bg-black/30">
                            <CardHeader className="p-2 border-b"><CardTitle className="text-sm flex items-center gap-2"><MessageSquare/>Deliberations</CardTitle></CardHeader>
                            <CardContent className="p-0">
                               <ScrollArea className="h-24">
                                   <div className="p-2 space-y-2 text-xs">
                                        {scribeLogs.length > 0 ? scribeLogs.map(log => (
                                            <div key={log.id} className="animate-in fade-in">
                                                <p className="font-bold text-foreground/80">{log.scribe}: <span className="text-muted-foreground font-normal">{log.message}</span></p>
                                            </div>
                                        )) : <p className="text-muted-foreground italic text-center p-4">No deliberations yet.</p>}
                                   </div>
                               </ScrollArea>
                            </CardContent>
                       </Card>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><BookCopy/> System Architecture</CardTitle>
                        <CardDescription>The underlying legal and technical frameworks powered by your Firebase project.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <Tabs defaultValue="function" className="h-full flex flex-col">
                             <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="function"><Cloud className="mr-2 h-4 w-4"/>Cloud Function</TabsTrigger>
                                <TabsTrigger value="rules"><Lock className="mr-2 h-4 w-4"/>Smart Contract</TabsTrigger>
                            </TabsList>
                             <TabsContent value="function" className="flex-1 min-h-0 mt-4">
                                 <ScrollArea className="h-full max-h-[15rem] mt-1 bg-black/50 p-2 rounded-sm border">
                                    <pre className="text-foreground whitespace-pre-wrap text-[10px]">{CLOUD_FUNCTION_SCRIPT}</pre>
                                 </ScrollArea>
                            </TabsContent>
                             <TabsContent value="rules" className="flex-1 min-h-0 mt-4">
                                 <ScrollArea className="h-full max-h-[15rem] mt-1 bg-black/50 p-2 rounded-sm border">
                                    <pre className="text-foreground whitespace-pre-wrap text-[10px]">{SOLIDITY_SCRIPT}</pre>
                                 </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
