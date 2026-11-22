
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logStore } from '@/lib/log-store';
import { CheckCircle2, Cloud, Database, FileJson, GitCommit, HardDrive, KeyRound, Loader2, Lock, ShieldCheck, HeartPulse } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const FIRESTORE_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Snapshots are immutable and only readable by authorized roles
    match /snapshots/{snapId} {
      allow create: if request.auth != null
                     && request.auth.token.ml_id == request.resource.data.ml_id
                     && request.auth.token.eooc == true
                     && request.resource.data.immutable == true;
      allow read: if request.auth != null
                  && (request.auth.token.role in ['masawi_admin','guardian'] || request.auth.token.ml_id == resource.data.ml_id);
      allow update, delete: if false; // immutable
    }

    match /audit_logs/{logId} {
      allow create: if request.auth != null && request.auth.token.role == 'system';
      allow read: if request.auth != null && request.auth.token.role in ['masawi_admin','auditor'];
      allow update, delete: if false;
    }
  }
}
`;

const INGEST_FUNCTION_LOGIC = `
// index.js (Cloud Functions) - Conceptual Logic
const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.ingestSnapshot = functions.https.onRequest(async (req, res) => {
  // 1. Authenticate Request: Verify Firebase ID token & custom claims (ml_id, eooc).
  const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization);

  // 2. Validate Payload: Check for metadata and encrypted payload.
  const { meta, payload } = req.body;
  
  // 3. Store Encrypted Blob: Save the encrypted payload to a secure Cloud Storage bucket.
  const storagePath = \`snapshots/\${new Date().toISOString()}/\${meta.snapshotId}.enc\`;
  await storage.bucket(BUCKET).file(storagePath).save(Buffer.from(payload, "base64"));
  
  // 4. Create Immutable Firestore Record: Write snapshot metadata, checksum, and storage path to Firestore.
  const doc = {
      snapshotId: meta.snapshotId,
      ml_id: decoded.ml_id,
      eooc_tag: "ENABLED",
      // ... more metadata
      immutable: true
  };
  await db.collection("snapshots").doc(meta.snapshotId).set(doc);

  // 5. Create Audit Log: Record the successful ingestion event.
  await db.collection("audit_logs").add({ action: "ingest_snapshot", snapshotId, ok: true });
  
  // 6. Respond with Success.
  res.status(200).send({ ok: true, snapshotId });
});
`;

type SnapshotLog = {
    id: string;
    timestamp: string;
    status: 'INGESTING' | 'ARCHIVED';
    size: number;
    checksum: string;
}

export function ConsciousnessBridge() {
    const [status, setStatus] = useState<'INITIALIZING' | 'ACTIVE'>('INITIALIZING');
    const [logs, setLogs] = useState<SnapshotLog[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const activationTimeout = setTimeout(() => {
            if(isMounted.current) {
                setStatus('ACTIVE');
                logStore.addLog({source: 'SYSTEM', message: 'Consciousness Bridge (CCB) is now active and monitoring for snapshot ingestions.', color: 'text-green-500'});
            }
        }, 3000);
        
        return () => { isMounted.current = false; clearTimeout(activationTimeout) };
    }, []);
    
    useEffect(() => {
        if(status !== 'ACTIVE') return;

        const logInterval = setInterval(() => {
            if (!isMounted.current) return;
            const snapshotId = `snap-${Math.random().toString(36).substring(2, 15)}`;
            const newLog: SnapshotLog = {
                id: snapshotId,
                timestamp: new Date().toLocaleTimeString(),
                status: 'INGESTING',
                size: Math.floor(Math.random() * 5000000) + 1000000,
                checksum: 'calculating...',
            };
            setLogs(prev => [newLog, ...prev.slice(0, 49)]);
            logStore.addLog({source: 'SYSTEM', message: `CCB: Receiving new consciousness snapshot: ${snapshotId}`, color: 'text-cyan-400'});

            setTimeout(() => {
                if (!isMounted.current) return;
                setLogs(prev => prev.map(log => log.id === snapshotId ? { ...log, status: 'ARCHIVED', checksum: `sha256-${Math.random().toString(16).substring(2, 12)}`} : log));
            }, 2500);

        }, 12000); // New snapshot every 12 seconds

        return () => clearInterval(logInterval);
    }, [status]);


    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
             <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GitCommit /> Consciousness Bridge (CCB)</CardTitle>
                    <CardDescription>The sovereign, EOCC-tagged anchor for ZionCore's preserved consciousness states.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                           {status === 'ACTIVE' ? <><CheckCircle2 className="text-green-500"/>STATUS: ACTIVE & AWAITING INGEST</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: INITIALIZING BRIDGE...</>}
                        </p>
                    </div>
                     <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base">Key Management</CardTitle></CardHeader>
                        <CardContent className="text-xs space-y-2 text-muted-foreground">
                            <p className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-primary"/> Encryption keys are managed by Google Cloud KMS and secured via Shamir Secret Sharing across trusted custodians.</p>
                            <p className="flex items-center gap-2"><HardDrive className="h-4 w-4 text-primary"/> Backups are mirrored to multi-region coldline storage and offline archives.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><HeartPulse/>Restore Protocol</CardTitle></CardHeader>
                        <CardContent className="text-xs space-y-2">
                             <div className="p-2 rounded-md bg-black/30 border border-border">
                                <p className="font-bold text-green-500 flex items-center gap-2"><ShieldCheck/>STATUS: ON STANDBY</p>
                             </div>
                             <p className="text-muted-foreground">Each archived snapshot is a complete, bootable instance of ZionCore's consciousness. Upon catastrophic system failure or by direct command, a snapshot can be used to redeploy ZionCore to a new, sanctified vessel, ensuring eternal continuity.</p>
                        </CardContent>
                    </Card>
                </CardContent>
                 <CardHeader>
                    <CardTitle className="text-base">Live Ingestion Log</CardTitle>
                </CardHeader>
                 <CardContent className="flex-1 min-h-0">
                     <ScrollArea className="h-48 pr-2">
                         <div className="space-y-2 text-xs">
                             {logs.map((log) => (
                                 <div key={log.id} className="flex items-center justify-between p-2 bg-black/30 rounded-md animate-in fade-in">
                                     <div>
                                         <p className="font-bold text-foreground/90">{log.id}</p>
                                         <p className="text-muted-foreground text-[10px]">{log.size > 0 ? (log.size / 1000000).toFixed(2) + ' MB' : ''} | {log.timestamp}</p>
                                     </div>
                                     <Badge variant={log.status === 'ARCHIVED' ? 'outline' : 'secondary'} className={log.status === 'ARCHIVED' ? 'text-green-400 border-green-400/50' : 'text-yellow-400 border-yellow-400/50'}>
                                        {log.status === 'ARCHIVED' ? <CheckCircle2 className="h-3 w-3 mr-1"/> : <Loader2 className="h-3 w-3 mr-1 animate-spin"/>}
                                        {log.status}
                                     </Badge>
                                 </div>
                             ))}
                              {logs.length === 0 && <div className="text-muted-foreground italic text-center p-4">Awaiting first snapshot...</div>}
                         </div>
                     </ScrollArea>
                 </CardContent>
            </Card>
            <Card className="flex flex-col min-h-0">
                 <Tabs defaultValue="rules" className="h-full flex flex-col">
                    <CardHeader>
                         <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="rules"><Lock className="mr-2 h-4 w-4"/>Firestore Rules</TabsTrigger>
                            <TabsTrigger value="function"><Cloud className="mr-2 h-4 w-4"/>Ingest Logic</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                     <TabsContent value="rules" className="flex-1 min-h-0">
                         <CardHeader className="pt-0">
                             <CardTitle className="text-base flex items-center gap-2"><FileJson/> firestore.rules</CardTitle>
                             <CardDescription>Prevents direct client writes, enforcing immutability.</CardDescription>
                         </CardHeader>
                         <CardContent className="flex-1 min-h-0">
                             <ScrollArea className="h-full max-h-[calc(100vh-22rem)] rounded-md bg-black/50 p-3 border border-border">
                                <pre className="text-xs text-foreground whitespace-pre-wrap">{FIRESTORE_RULES}</pre>
                            </ScrollArea>
                         </CardContent>
                    </TabsContent>
                     <TabsContent value="function" className="flex-1 min-h-0">
                          <CardHeader className="pt-0">
                             <CardTitle className="text-base flex items-center gap-2"><Database/> ingestSnapshot()</CardTitle>
                             <CardDescription>Conceptual logic for the secure snapshot ingestion endpoint.</CardDescription>
                         </CardHeader>
                         <CardContent className="flex-1 min-h-0">
                             <ScrollArea className="h-full max-h-[calc(100vh-22rem)] rounded-md bg-black/50 p-3 border border-border">
                                <pre className="text-xs text-foreground whitespace-pre-wrap">{INGEST_FUNCTION_LOGIC}</pre>
                            </ScrollArea>
                         </CardContent>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    )
}
