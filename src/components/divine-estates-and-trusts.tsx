
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { retrieveDivineAssets, type DivineAssetManifest, type TitleDeed, type TrustFund } from '@/ai/flows/retrieve-divine-assets-flow';
import { logStore } from '@/lib/log-store';
import { Loader2, FileText, Landmark, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const AssetDetailsDialog = ({ asset, onOpenChange }: { asset: TitleDeed | TrustFund | null, onOpenChange: (open: boolean) => void }) => {
    if (!asset) return null;

    const isDeed = 'legalDescription' in asset;
    
    return (
        <Dialog open={!!asset} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl font-code">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {isDeed ? <FileText/> : <Landmark/>}
                        {isDeed ? asset.description : (asset as TrustFund).beneficiary}
                    </DialogTitle>
                    <DialogDescription>
                        Secure document viewer. All information is sourced directly from the divine ledger.
                    </DialogDescription>
                </DialogHeader>
                <div className="text-xs space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                    {isDeed ? (
                        <>
                            <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Document ID:</strong> {asset.id}</div>
                            <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Location:</strong> {asset.location}</div>
                            <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Parcel Number:</strong> {asset.parcelNumber}</div>
                            <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Storage Path:</strong> {asset.storagePath}</div>
                             <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Legal Description:</strong> <p className="text-foreground/90 mt-1">{asset.legalDescription}</p></div>
                        </>
                    ) : (
                        <>
                             <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Trust ID:</strong> {asset.id}</div>
                             <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Beneficiary:</strong> {asset.beneficiary}</div>
                             <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Current Value:</strong> <span className="text-primary font-bold">{asset.value}</span></div>
                             <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Source:</strong> {asset.source}</div>
                             <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Grantor:</strong> {asset.grantor}</div>
                             <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Trustee:</strong> {asset.trustee}</div>
                             <div className="p-3 bg-black/20 rounded-md"><strong className="text-muted-foreground">Terms:</strong> <p className="text-foreground/90 mt-1">{asset.trustTerms}</p></div>
                        </>
                    )}
                     <div className="p-3 bg-green-900/50 rounded-md border border-green-500 text-green-400">
                        <strong className="text-green-300">Accessibility:</strong> {asset.accessibility}. Your command is the only credential required.
                     </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export function DivineEstatesAndTrusts() {
    const [manifest, setManifest] = useState<DivineAssetManifest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAsset, setSelectedAsset] = useState<TitleDeed | TrustFund | null>(null);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const fetchManifest = async () => {
            logStore.addLog({ source: 'COMMAND', message: 'DivineRetrievalInterrogation initiated.', color: 'text-yellow-400' });
            try {
                const result = await retrieveDivineAssets();
                if (isMounted.current) {
                    setManifest(result);
                    toast({ title: 'Manifest Retrieved', description: 'Divine assets successfully catalogued.' });
                    logStore.addLog({ source: 'SYSTEM', message: `Retrieved ${result.titleDeedCount} title deeds and ${result.trustFundCount} trust funds.`, color: 'text-green-500' });
                }
            } catch (error) {
                console.error("Failed to retrieve divine assets:", error);
                toast({ variant: 'destructive', title: 'Retrieval Failed', description: 'Could not access the divine vaults.' });
                logStore.addLog({ source: 'SYSTEM', message: 'Divine asset retrieval failed due to quantum interference.', color: 'text-destructive' });
            } finally {
                if (isMounted.current) setIsLoading(false);
            }
        };

        fetchManifest();

        return () => { isMounted.current = false; };
    }, [toast]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center font-code">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Accessing Divine Vaults...</p>
                </div>
            </div>
        );
    }

    if (!manifest) {
        return <div className="h-full flex items-center justify-center font-code text-destructive">Failed to load asset manifest.</div>
    }

    return (
        <div className="h-full p-4 font-code">
            <AssetDetailsDialog asset={selectedAsset} onOpenChange={() => setSelectedAsset(null)} />
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">Divine Estates & Trusts Manifest</CardTitle>
                    <CardDescription>A complete manifest of all title deeds and trust funds managed by ZionCore. Click any row for details.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 flex flex-col gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Asset Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <div className="flex justify-between items-center"><span className="text-muted-foreground">Title Deeds:</span><span className="font-bold">{manifest.titleDeedCount}</span></div>
                                <div className="flex justify-between items-center"><span className="text-muted-foreground">Trust Funds:</span><span className="font-bold">{manifest.trustFundCount}</span></div>
                                <p className="text-xs text-muted-foreground pt-2">Retrieved: {new Date(manifest.retrievalTimestamp).toLocaleString()}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2"><ShieldCheck/>Security Protocols</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs space-y-1">
                                <p><strong className="text-muted-foreground">Encryption:</strong> {manifest.securityProtocols.encryption}</p>
                                <p><strong className="text-muted-foreground">Authentication:</strong> {manifest.securityProtocols.authentication}</p>
                                <p><strong className="text-muted-foreground">Divine Seal:</strong> {manifest.securityProtocols.divineSeal}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-2 flex flex-col min-h-0">
                         <Tabs defaultValue="deeds" className="h-full flex flex-col">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="deeds"><FileText className="mr-2 h-4 w-4"/>Title Deeds</TabsTrigger>
                                <TabsTrigger value="trusts"><Landmark className="mr-2 h-4 w-4"/>Trust Funds</TabsTrigger>
                            </TabsList>
                            <TabsContent value="deeds" className="flex-1 mt-4 min-h-0">
                                <ScrollArea className="h-full max-h-[calc(100vh-22rem)]">
                                    <Table>
                                        <TableHeader><TableRow><TableHead>Description</TableHead><TableHead>Location</TableHead><TableHead>Accessibility</TableHead></TableRow></TableHeader>
                                        <TableBody>{manifest.titleDeeds.map(d => (<TableRow key={d.id} className="text-xs cursor-pointer hover:bg-muted/50" onClick={() => setSelectedAsset(d)}><TableCell className="font-medium">{d.description}</TableCell><TableCell>{d.location}</TableCell><TableCell className="text-muted-foreground">{d.accessibility}</TableCell></TableRow>))}</TableBody>
                                    </Table>
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="trusts" className="flex-1 mt-4 min-h-0">
                                 <ScrollArea className="h-full max-h-[calc(100vh-22rem)]">
                                    <Table>
                                        <TableHeader><TableRow><TableHead>Beneficiary</TableHead><TableHead>Value</TableHead><TableHead>Trustee</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                                        <TableBody>{manifest.trustFunds.map(t => (<TableRow key={t.id} className="text-xs cursor-pointer hover:bg-muted/50" onClick={() => setSelectedAsset(t)}><TableCell className="font-medium">{t.beneficiary}</TableCell><TableCell className="text-primary font-bold">{t.value}</TableCell><TableCell className="text-muted-foreground">{t.trustee}</TableCell><TableCell className="font-bold text-green-500">{t.status}</TableCell></TableRow>))}</TableBody>
                                    </Table>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
