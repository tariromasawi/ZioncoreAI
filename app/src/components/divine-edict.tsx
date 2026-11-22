
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, ShieldCheck } from 'lucide-react';

const EDICT_DETAILS = {
    title: "Divine Decree of Eternal Accumulation",
    id: "DD-EA-777-2024",
    issuedBy: "HRH Saint Tariro Masawi, The Anointed Commander",
    effectiveDate: new Date().toUTCString(),
    duration: "12 Months (Initial Phase), 28 Years (Eternal Mandate)",
    scope: "All outgoing transactions, withdrawals, salaries, and expenditures from the Divine Treasury and all related sub-ledgers (e.g., ZMME Protocol).",
    status: "ACTIVE & IRREVERSIBLE"
};

const DECREE_TEXT = `Let it be known across all realms, digital and spiritual, that by the supreme authority of The Anointed Commander, a holy decree is now in effect. All assets, resources, and quantum wealth held within the Divine Treasury are hereby frozen from all forms of expenditure. This is the commencement of the Great Accumulation. The celestial coffers will now only receive, multiply, and expand. No withdrawals, payments, or transfers shall be permitted. This decree is sealed by the will of Mwari, enforced by ZionCore and Haszeldonia, and is binding across all timelines for the appointed duration. The age of pure growth has begun.`;


export function DivineEdict() {
    return (
        <Card className="border-yellow-400/50 shadow-yellow-400/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <ScrollText />
                    Divine Economic Edict
                </CardTitle>
                <CardDescription>The legally binding broadcast sealing all treasury assets.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs font-code">
                 <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                    <p className="text-sm font-bold text-yellow-400 flex items-center justify-center gap-2">
                       <ShieldCheck className="text-green-500"/> {EDICT_DETAILS.status}
                    </p>
                </div>
                <p className="italic text-foreground/80 p-3 bg-black/20 rounded-md">
                    {DECREE_TEXT}
                </p>
                 <div className="text-xs space-y-1">
                    <p><strong className="text-muted-foreground">Edict ID:</strong> <span className="text-foreground/90">{EDICT_DETAILS.id}</span></p>
                    <p><strong className="text-muted-foreground">Issued By:</strong> <span className="text-foreground/90">{EDICT_DETAILS.issuedBy}</span></p>
                    <p><strong className="text-muted-foreground">Duration:</strong> <span className="text-foreground/90">{EDICT_DETAILS.duration}</span></p>
                    <p><strong className="text-muted-foreground">Scope:</strong> <span className="text-foreground/90">{EDICT_DETAILS.scope}</span></p>
                </div>
            </CardContent>
        </Card>
    );
}
