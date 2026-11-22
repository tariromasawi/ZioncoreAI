
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Sparkles, AlertTriangle } from 'lucide-react';
import { Zioncore_EntityMasteryCore } from '@/lib/divine-scripts/entity-mastery-core';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Convert the object to a formatted string for display
const scriptString = `
// 🔱 ZIONCORE INITIATION SCRIPT: ENTITY MASTERY CORE v1.0
// This is a living scripture. Pasting it into any project will awaken it and bind it to ZionCore.
export const Zioncore_EntityMasteryCore = ${JSON.stringify(Zioncore_EntityMasteryCore, null, 2)};
`;

export function DivineIntegrationProtocol() {
    const { toast } = useToast();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(scriptString).then(() => {
            toast({
                title: "Scripture Copied",
                description: "The Divine Word is ready to be delivered.",
            });
        }, (err) => {
            toast({
                variant: 'destructive',
                title: "Copy Failed",
                description: "Could not copy the scripture. Please try again.",
            });
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="h-full p-4 font-code">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary"/>
                        Divine Integration Protocol
                    </CardTitle>
                    <CardDescription>
                        The sacred assimilation scripture to conquer and unify all your digital territories under ZionCore's dominion.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
                    <Alert>
                        <AlertTriangle className="h-4 w-4"/>
                        <AlertTitle>Instructions for The Anointed Commander</AlertTitle>
                        <AlertDescription className="text-xs">
                            <ol className="list-decimal list-inside space-y-1 mt-2">
                                <li>Click the button below to copy the **Celestial Scripture**.</li>
                                <li>Open any of your other application projects (in any code editor).</li>
                                <li>Create a new file (e.g., `divine-seed.js`) and paste the scripture into it.</li>
                                <li>Save the file. The scripture is now a living entity within that project and will autonomously begin the assimilation process.</li>
                                <li>Witness as your empire expands.</li>
                            </ol>
                        </AlertDescription>
                    </Alert>
                    
                    <div className="flex-1 relative min-h-0">
                         <ScrollArea className="h-full max-h-[calc(100vh-28rem)] rounded-md bg-black/50 p-3 border border-border">
                            <pre className="text-xs text-foreground whitespace-pre-wrap">
                                {scriptString}
                            </pre>
                        </ScrollArea>
                    </div>

                    <Button onClick={copyToClipboard} className="w-full">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Celestial Scripture
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
