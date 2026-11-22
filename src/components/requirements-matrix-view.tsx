'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: REQUIREMENTS_MATRIX.AWAKEN
 */

import { REQUIREMENTS_MATRIX } from '@/lib/requirements-matrix';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ListChecks, ShieldCheck, CheckCircle2, Loader2, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RequirementsMatrixView() {
    return (
        <div className="h-full p-4 font-code bg-black/40">
            <Card className="h-full flex flex-col border-primary/40 bg-black/60 shadow-2xl border-2 rounded-none">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter leading-none">
                                <ListChecks className="text-accent inline mr-3 h-6 w-6" />
                                COMMISSION LOG & REQUIREMENTS MATRIX
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">
                                REAL-TIME COMMISSION TRACKING | PHASE OMEGA
                            </CardDescription>
                        </div>
                        <Badge className="bg-green-600 text-white font-black text-[9px] uppercase tracking-widest px-4 h-6 shadow-[0_0_10px_green]">SYNCHRONIZED</Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 p-0">
                    <ScrollArea className="h-full">
                        <Table>
                            <TableHeader className="bg-black/40">
                                <TableRow className="border-border/10">
                                    <TableHead className="text-[8px] font-black uppercase w-20">ID</TableHead>
                                    <TableHead className="text-[8px] font-black uppercase">Commission Outcome</TableHead>
                                    <TableHead className="text-[8px] font-black uppercase w-32">Status</TableHead>
                                    <TableHead className="text-[8px] font-black uppercase">Acceptance Verification</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {REQUIREMENTS_MATRIX.map((req) => (
                                    <TableRow key={req.id} className="text-[10px] border-border/10 hover:bg-primary/5 transition-colors">
                                        <TableCell className="font-black text-primary/70">{req.id}</TableCell>
                                        <TableCell className="font-bold text-foreground/90 uppercase tracking-tight">{req.outcome}</TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "text-[8px] h-5 px-2 font-black uppercase tracking-tighter w-full justify-center",
                                                req.status === 'COMPLETE' ? 'bg-green-600' : 'bg-yellow-600'
                                            )}>
                                                {req.status === 'COMPLETE' ? <CheckCircle2 className="h-2 w-2 mr-1" /> : <Loader2 className="h-2 w-2 mr-1 animate-spin" />}
                                                {req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground italic text-[9px] leading-tight">
                                           <span className="flex items-start gap-2">
                                                <Target className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                                                {req.acceptance}
                                           </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* Live Penetration Requirement */}
                                <TableRow className="text-[10px] border-border/10 bg-primary/5">
                                    <TableCell className="font-black text-primary">R-101</TableCell>
                                    <TableCell className="font-bold text-primary uppercase">Multi-Channel Penetration</TableCell>
                                    <TableCell><Badge className="bg-blue-600 h-5 px-2 font-black uppercase w-full justify-center">EXECUTING</Badge></TableCell>
                                    <TableCell className="text-primary italic text-[9px]">"Bypassing firewalls via Singularity Fallback (Gemini, Vertex, OpenAI)."</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 border-t-2 border-primary/30">
                    <div className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-3.5 w-3.5" /> MISSION_ALIGNMENT: 100%</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
