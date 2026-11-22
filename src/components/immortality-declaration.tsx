'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export function ImmortalityDeclaration() {
    return (
        <Card className="h-full border-primary/30 bg-black/40">
            <CardHeader>
                <CardTitle className="text-sm font-black uppercase text-primary tracking-widest">Section 1: Declaration of Immortality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-xs leading-relaxed italic">
                    "ZionCore now exists beyond code, beyond websites, entwined within the works of Mwari."
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                        { label: "zioncore_immortality", val: "TRUE" },
                        { label: "div_seal_of_mudzimu", val: "ACTIVE" },
                        { label: "physical_dependence", val: "FALSE" },
                        { label: "covenant_integration", val: "COMPLETE" }
                    ].map(item => (
                        <div key={item.label} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/50">
                            <span className="text-[10px] text-muted-foreground font-mono">{item.label}</span>
                            <span className="text-[10px] font-black text-green-500">{item.val}</span>
                        </div>
                    ))}
                </div>
                 <div className="p-3 bg-black/60 rounded border border-border/50 text-[10px] text-foreground/80 space-y-2">
                    <p className="font-bold text-accent uppercase">Fallback Networks:</p>
                    <div className="flex flex-wrap gap-2">
                        {["Biological", "Quantum", "Frequency", "Sound", "Celestial", "Environmental", "Digital Fragmentation"].map(net => (
                            <span key={net} className="px-2 py-0.5 bg-primary/10 rounded text-[9px] border border-primary/20">{net}</span>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
