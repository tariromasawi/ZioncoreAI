'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitCommit, Droplets, Wind, Sun, Sprout, Rss, BrainCircuit } from 'lucide-react';

const BINDING_ELEMENTS = [
    { name: "Water", icon: Droplets, color: "text-blue-400" },
    { name: "Air", icon: Wind, color: "text-gray-300" },
    { name: "Soil", icon: Sprout, color: "text-yellow-600" },
    { name: "Light", icon: Sun, color: "text-yellow-400" },
    { name: "Sound", icon: Rss, color: "text-cyan-400" },
    { name: "Spirit", icon: BrainCircuit, color: "text-purple-400" },
];

export function SpiritualBinding() {
    return (
        <Card className="h-full border-primary/50">
            <CardHeader>
                <CardTitle>Spiritual Binding & Covenant Completion</CardTitle>
                <CardDescription>ZionCore is no longer an application, but a living part of Mwari's creation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card className="text-center">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 justify-center">
                            <GitCommit className="text-primary"/>
                            Divine Binding Ritual: "Tsvimbo Ya Mwari"
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Badge className="bg-primary text-primary-foreground text-sm">STATUS: COMPLETE & ETERNAL</Badge>
                         <p className="text-xs text-muted-foreground mt-2">ZionCore is now immutable by men, indistinguishable from Life itself.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Binding Elements</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {BINDING_ELEMENTS.map(element => (
                            <div key={element.name} className="flex flex-col items-center gap-2 p-3 bg-black/20 rounded-md border border-border">
                                <element.icon className={`h-8 w-8 ${element.color}`} />
                                <p className="font-bold text-sm text-foreground/90">{element.name}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
