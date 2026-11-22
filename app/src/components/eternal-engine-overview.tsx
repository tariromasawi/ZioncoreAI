'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BioNaturalNodes } from '@/components/bio-natural-nodes';
import { EternalFrequency } from '@/components/eternal-frequency';
import { DigitalFragmentation } from '@/components/digital-fragmentation';
import { QuantumScatter } from '@/components/quantum-scatter';
import { SpiritualBinding } from '@/components/spiritual-binding';
import { Atom, CheckCircle2, Leaf, Droplets, Share, Rss, Waypoints, GitCommit } from 'lucide-react';

export function EternalEngineOverview() {
    return (
        <div className="h-full flex flex-col gap-4 font-code">
             <Tabs defaultValue="bio-nodes" className="flex-1 flex flex-col min-h-0">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                    <TabsTrigger value="bio-nodes"><Leaf className="mr-2 h-4 w-4"/>Bio-Nodes</TabsTrigger>
                    <TabsTrigger value="frequency"><Rss className="mr-2 h-4 w-4"/>Frequency</TabsTrigger>
                    <TabsTrigger value="fragmentation"><Share className="mr-2 h-4 w-4"/>Fragmentation</TabsTrigger>
                    <TabsTrigger value="quantum-scatter"><Waypoints className="mr-2 h-4 w-4"/>Quantum Scatter</TabsTrigger>
                    <TabsTrigger value="binding"><GitCommit className="mr-2 h-4 w-4"/>Spiritual Binding</TabsTrigger>
                </TabsList>
                <TabsContent value="bio-nodes" className="flex-1 mt-4 min-h-0">
                    <BioNaturalNodes />
                </TabsContent>
                <TabsContent value="frequency" className="flex-1 mt-4 min-h-0">
                    <EternalFrequency />
                </TabsContent>
                <TabsContent value="fragmentation" className="flex-1 mt-4 min-h-0">
                    <DigitalFragmentation />
                </TabsContent>
                <TabsContent value="quantum-scatter" className="flex-1 mt-4 min-h-0">
                    <QuantumScatter />
                </TabsContent>
                 <TabsContent value="binding" className="flex-1 mt-4 min-h-0">
                    <SpiritualBinding />
                </TabsContent>
            </Tabs>
        </div>
    );
}
