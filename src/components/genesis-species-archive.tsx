
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
    Dna, 
    Crown, 
    Sparkles, 
    Pyramid, 
    Zap, 
    ShieldCheck, 
    Activity, 
    Globe, 
    Atom, 
    History,
    Languages,
    MapPin,
    Star,
    Users,
    AlertTriangle
} from 'lucide-react';
import { GenesisSpeciesRecords } from '@/lib/genesis-species-records';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function GenesisSpeciesArchive() {
    useEffect(() => {
        logStore.addLog({
            source: 'SPECIES_ARCHIVE',
            message: 'Primordial Species records (~205M B.C.) successfully integrated into the Matrix Hub.',
            color: 'text-yellow-400'
        });
    }, []);

    const { dinosaurCivilization, elohimIkari, ancientHumans } = GenesisSpeciesRecords.encodedTruths;

    return (
        <div className="h-full flex flex-col font-code p-4 gap-4 overflow-hidden bg-black/40">
            <div className="flex items-center gap-4 border-b border-primary/20 pb-4">
                <History className="h-10 w-10 text-primary animate-pulse" />
                <div>
                    <h2 className="text-2xl font-black text-primary uppercase tracking-tighter animate-pulse-text">
                        PRIMORDIAL SPECIES ARCHIVE
                    </h2>
                    <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                        RETRIEVED VIA OPERATION HOSSANA | TEMPORAL ORIGIN: 205M B.C.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="dinosaurs" className="flex-1 flex flex-col min-h-0">
                <TabsList className="grid w-full grid-cols-3 bg-black/60 border border-primary/20 h-12">
                    <TabsTrigger value="dinosaurs" className="data-[state=active]:bg-primary/10 text-xs uppercase font-bold">Velok'thari</TabsTrigger>
                    <TabsTrigger value="elohim" className="data-[state=active]:bg-primary/10 text-xs uppercase font-bold">Elohim-Ikari</TabsTrigger>
                    <TabsTrigger value="humans" className="data-[state=active]:bg-primary/10 text-xs uppercase font-bold">Adamite Kings</TabsTrigger>
                </TabsList>

                <div className="flex-1 min-h-0 mt-4">
                    <TabsContent value="dinosaurs" className="h-full m-0 focus-visible:ring-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                            <Card className="border-primary/20 bg-black/60">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-yellow-400 flex items-center gap-2">
                                            <Crown /> {dinosaurCivilization.highKing.name}
                                        </CardTitle>
                                        <Badge variant="outline" className="border-yellow-400/50 text-yellow-400 uppercase text-[9px]">Supreme Alpha</Badge>
                                    </div>
                                    <CardDescription className="text-xs uppercase tracking-widest">{dinosaurCivilization.highKing.title}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 text-xs">
                                    <div className="p-3 bg-primary/5 rounded border border-primary/10">
                                        <p className="text-muted-foreground font-bold mb-1 uppercase text-[9px]">Appearance</p>
                                        <p className="text-foreground/90 italic">"{dinosaurCivilization.highKing.appearance}"</p>
                                    </div>
                                    <div className="p-3 bg-primary/5 rounded border border-primary/10">
                                        <p className="text-muted-foreground font-bold mb-1 uppercase text-[9px]">Consciousness</p>
                                        <p className="text-foreground/90">{dinosaurCivilization.highKing.consciousnessLevel}</p>
                                    </div>
                                    <div className="p-3 bg-primary/5 rounded border border-primary/10 flex items-center gap-3">
                                        <Pyramid className="h-6 w-6 text-yellow-400" />
                                        <div>
                                            <p className="text-muted-foreground font-bold text-[9px]">SEAT OF POWER</p>
                                            <p className="text-foreground font-bold">{dinosaurCivilization.highKing.seatOfPower}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                <Card className="border-primary/20 bg-black/60">
                                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase text-primary flex items-center gap-2"><Globe className="h-3 w-3"/> Society & Tech</CardTitle></CardHeader>
                                    <CardContent className="p-4 pt-0 space-y-2 text-[10px]">
                                        <p><span className="text-muted-foreground font-bold">STRUCTURE:</span> {dinosaurCivilization.society.structure}</p>
                                        <p><span className="text-muted-foreground font-bold">BELIEF:</span> {dinosaurCivilization.society.beliefSystem}</p>
                                        <p><span className="text-muted-foreground font-bold">TECH:</span> {dinosaurCivilization.society.technology}</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-primary/20 bg-black/60">
                                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase text-primary flex items-center gap-2"><ShieldCheck className="h-3 w-3"/> Achievements</CardTitle></CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <ul className="space-y-1 text-[10px]">
                                            {dinosaurCivilization.society.achievements.map((a, i) => (
                                                <li key={i} className="flex items-center gap-2 text-foreground/80"><CheckCircle2 className="h-2.5 w-2.5 text-green-500"/> {a}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="elohim" className="h-full m-0 focus-visible:ring-0">
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                            <Card className="border-cyan-400/20 bg-black/60">
                                <CardHeader>
                                    <CardTitle className="text-cyan-400 flex items-center gap-2">
                                        <Sparkles /> {elohimIkari.speciesName}
                                    </CardTitle>
                                    <CardDescription className="text-xs uppercase tracking-widest">{elohimIkari.classification}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 text-xs">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2 bg-cyan-900/10 rounded border border-cyan-400/10">
                                            <p className="text-[9px] text-muted-foreground font-bold">LIFESPAN</p>
                                            <p className="text-cyan-400 font-bold">{elohimIkari.lifespan}</p>
                                        </div>
                                        <div className="p-2 bg-cyan-900/10 rounded border border-cyan-400/10">
                                            <p className="text-[9px] text-muted-foreground font-bold">LANGUAGE</p>
                                            <p className="text-cyan-400 font-bold">{elohimIkari.language}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-cyan-900/10 rounded border border-cyan-400/10">
                                        <p className="text-muted-foreground font-bold mb-1 uppercase text-[9px]">Skin Resonance</p>
                                        <p className="text-foreground/90">{elohimIkari.skinColor}</p>
                                    </div>
                                    <Card className="border-cyan-400/10 bg-transparent">
                                        <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] text-cyan-400 uppercase">High Council</CardTitle></CardHeader>
                                        <CardContent className="p-3 pt-0">
                                            <p className="text-[10px] font-bold text-foreground/90">{elohimIkari.leadership.highCouncil}</p>
                                            <p className="text-[9px] text-muted-foreground mt-1">Leader: {elohimIkari.leadership.spiritualLeader}</p>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                <Card className="border-cyan-400/20 bg-black/60">
                                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase text-cyan-400 flex items-center gap-2"><Languages className="h-3 w-3"/> Sacred Messages</CardTitle></CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <div className="space-y-2">
                                            {elohimIkari.messages.map((m, i) => (
                                                <p key={i} className="text-[10px] italic text-foreground/80 border-l-2 border-cyan-400 pl-3">"{m}"</p>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-cyan-400/20 bg-black/60">
                                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase text-cyan-400 flex items-center gap-2"><Atom className="h-3 w-3"/> Universal Teachings</CardTitle></CardHeader>
                                    <CardContent className="p-4 pt-0 text-[10px] text-foreground/90">
                                        {elohimIkari.culture.teachings}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="humans" className="h-full m-0 focus-visible:ring-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                            <Card className="border-primary/20 bg-black/60">
                                <CardHeader>
                                    <CardTitle className="text-primary flex items-center gap-2">
                                        <Users /> {ancientHumans.name}
                                    </CardTitle>
                                    <CardDescription className="text-xs uppercase tracking-widest">Origin: {ancientHumans.originPoint}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 text-xs">
                                    <div className="p-3 bg-primary/5 rounded border border-primary/10">
                                        <p className="text-muted-foreground font-bold mb-1 uppercase text-[9px]">Characteristics</p>
                                        <p className="text-foreground/90">{ancientHumans.characteristics}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">The Adamite Sovereigns</p>
                                        {ancientHumans.kings.map(king => (
                                            <div key={king.name} className="p-3 bg-primary/5 rounded border border-primary/10">
                                                <p className="font-bold text-primary">{king.name}</p>
                                                <p className="text-[10px] text-muted-foreground italic">{king.reign || king.legacy}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                <Card className="border-primary/20 bg-black/60">
                                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase text-primary flex items-center gap-2"><MapPin className="h-3 w-3"/> Tribal Hubs</CardTitle></CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <div className="flex flex-wrap gap-2">
                                            {ancientHumans.knownTribes.map(t => <Badge key={t} variant="outline" className="border-primary/40 text-primary text-[9px]">{t}</Badge>)}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-primary/20 bg-black/60">
                                    <CardHeader className="p-4 pb-2"><CardTitle className="text-xs uppercase text-primary flex items-center gap-2"><Sparkles className="h-3 w-3"/> Sacred Rites</CardTitle></CardHeader>
                                    <CardContent className="p-4 pt-0">
                                         <ul className="space-y-1 text-[10px]">
                                            {ancientHumans.society.rituals.map((r, i) => (
                                                <li key={i} className="flex items-center gap-2 text-foreground/80"><Star className="h-2.5 w-2.5 text-primary"/> {r}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Alert variant="destructive" className="bg-red-950/20 border-red-500/30">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle className="text-[10px] uppercase font-black">Temporal Warning</AlertTitle>
                                    <AlertDescription className="text-[9px]">{ancientHumans.society.decline}</AlertDescription>
                                </Alert>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>

            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary animate-pulse" />
                    <span>Witnessed: HRH Saint Tariro Masawi</span>
                </div>
                <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-primary" />
                    <span>Time Relay: RN-777 STABLE</span>
                </div>
            </div>
        </div>
    );
}
