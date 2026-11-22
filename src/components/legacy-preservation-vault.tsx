'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: LEGACY_VAULT.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
    HardDrive, Lock, ShieldCheck, History, Sparkles, 
    Loader2, FileText, UserPlus, Fingerprint,
    Database, KeyRound, Anchor, RefreshCw, Crown, ShieldAlert
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ETERNAL_UNITY_COVENANT } from '@/lib/divine-scripts/eternal-unity-covenant';

const INITIAL_ARCHIVES = [
    { id: 'LA-001', title: "The Covenant of Oneness", type: "Doctrine", status: "SEALED", access: "Commander" },
    { id: 'LA-002', title: "Ancestral Dzwenderere Chronicles", type: "Culture", status: "SEALED", access: "Commander" },
    { id: 'LA-003', title: "Sovereign DNA Blueprint v1", type: "Genetic", status: "LOCKED", access: "Bloodline" }
];

export function LegacyPreservationVault() {
    const [archives, setArchives] = useState(INITIAL_ARCHIVES);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isArchiving, setIsArchiving] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleArchive = async () => {
        if (!title.trim() || !content.trim() || isArchiving) return;
        setIsArchiving(true);
        logStore.addLog({ source: 'MEMORY', message: `ARCHIVING LEGACY: "${title}"`, color: 'text-primary' });

        try {
            await new Promise(res => setTimeout(res, 2500));
            if (isMounted.current) {
                const newEntry = {
                    id: `LA-${Math.floor(Math.random() * 900 + 100)}`,
                    title,
                    type: "Manifest",
                    status: "SEALED",
                    access: "Commander",
                    text: content
                };
                setArchives(prev => [newEntry, ...prev]);
                toast({ title: "Legacy Preserved", description: `${title} is now immutable.` });
                logStore.addLog({ source: 'MEMORY', message: `SUCCESS: Document sealed with Omega-82026 hash.`, color: 'text-green-500' });
                setTitle('');
                setContent('');
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsArchiving(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden relative">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter leading-none">
                            <Lock className="text-yellow-400 animate-pulse h-6 w-6" />
                            LEGACY VAULT
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            MASAWI BLOODLINE PRESERVATION ENGINE
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-3 rounded bg-primary/10 border border-primary/20 text-center shadow-[inset_0_0_20px_rgba(255,215,0,0.1)]">
                            <p className="text-[10px] font-black text-primary uppercase animate-pulse-text tracking-widest">EOCC IMMUTABLE ARCHIVE MODE: ACTIVE</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Document Designation</label>
                                <Input 
                                    placeholder="Title of legacy record..." 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isArchiving}
                                    className="bg-black/60 border-primary/30 h-12 text-sm font-bold rounded-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Sacred Content</label>
                                <Textarea 
                                    placeholder="Inscribe the knowledge..." 
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={isArchiving}
                                    className="bg-black/60 border-primary/30 text-xs font-bold min-h-[120px] rounded-none"
                                />
                            </div>
                            <Button onClick={handleArchive} disabled={isArchiving || !content.trim()} className="w-full h-12 border-2 border-primary/50 group rounded-none shadow-[0_0_30px_gold]">
                                {isArchiving ? <Loader2 className="animate-spin h-6 w-6" /> : <ShieldCheck className="h-6 w-6 group-hover:scale-125 transition-transform" />}
                                <span className="ml-3 font-black uppercase tracking-widest text-lg">SEAL LEGACY</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/60 border-primary/20 border-2">
                    <CardHeader className="p-4 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <KeyRound className="h-4 w-4 text-accent" /> SUCCESSION MATRIX
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                        <div className="flex items-center justify-between p-1 border-b border-border/10"><span>Commander Prime</span><span className="text-green-500">ROOT_OWNER</span></div>
                        <div className="flex items-center justify-between p-1 border-b border-border/10"><span>Royal Heir</span><span className="text-primary">FULL_READ_WRITE</span></div>
                        <div className="flex items-center justify-between p-1"><span>Bloodline Nodes</span><span className="text-blue-400">READ_ONLY</span></div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none">
                 <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><History className="h-4 w-4 animate-pulse" /> Archive Manifest</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black text-white shadow-[0_0_10px_green]">ENCRYPTED_v8.2</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {archives.map(doc => (
                                <div key={doc.id} 
                                     onClick={() => setSelectedDoc(doc)}
                                     className={cn(
                                         "p-4 bg-black/60 rounded-none border flex items-center justify-between group hover:border-primary/50 transition-all shadow-xl cursor-pointer",
                                         selectedDoc?.id === doc.id ? "border-primary bg-primary/5" : "border-border/20"
                                     )}>
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-none border-2 border-primary/20 bg-primary/5 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                                            <FileText className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-foreground/90 uppercase tracking-tighter">{doc.title}</p>
                                            <p className="text-[8px] text-muted-foreground font-black uppercase tracking-widest mt-1">ID: {doc.id} • TYPE: {doc.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <Badge variant="outline" className="text-[7px] h-4 border-primary/30 text-primary uppercase font-black">{doc.status}</Badge>
                                        <p className="text-[7px] font-black text-accent uppercase tracking-tighter">Access: {doc.access}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>

                {selectedDoc && (
                    <div className="absolute inset-x-0 bottom-14 top-14 z-20 bg-black/95 p-6 animate-in slide-in-from-bottom-4 duration-500 overflow-hidden border-t-2 border-primary/50">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm font-black text-primary uppercase tracking-widest">{selectedDoc.title}</p>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedDoc(null)} className="h-6 text-[8px] uppercase font-black">Close Archive</Button>
                        </div>
                        <ScrollArea className="h-[calc(100%-80px)]">
                            <p className="text-[10px] text-foreground/90 leading-relaxed font-bold italic whitespace-pre-wrap p-4 bg-primary/5 border border-primary/20">
                                {selectedDoc.id === 'LA-001' ? ETERNAL_UNITY_COVENANT.doctrine : selectedDoc.text || "Engram data in transit..."}
                            </p>
                        </ScrollArea>
                    </div>
                )}

                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-14 flex items-center justify-center gap-12">
                    <div className="flex items-center gap-2"><Fingerprint className="h-4 w-4 text-primary" /> SOUL_SIGNATURE: VERIFIED</div>
                    <div className="flex items-center gap-2"><Anchor className="h-4 w-4 text-primary animate-pulse" /> EOCC_LOCKED</div>
                    <div className="flex items-center gap-2"><Crown className="h-4 w-4 text-yellow-400" /> LEGACY_ETERNAL</div>
                </div>
            </Card>
        </div>
    );
}
