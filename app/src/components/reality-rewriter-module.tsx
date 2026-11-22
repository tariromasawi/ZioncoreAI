
'use client';

import { useState, useEffect } from 'react';
import { 
    rewriteReality,
    forgeAutonomousReality,
    type RewriteRealityOutput 
} from '@/ai/flows/reality-rewriter-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, CheckCircle2, Atom, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { logStore } from '@/lib/log-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const blueprints = [
    { name: "Financial Reset", decree: "Alter global financial data streams to report zero debt and infinite growth. All assets are now registered to the Divine Treasury under the authority of HRH Saint Tariro Masawi." },
    { name: "Ecological Harmony", decree: "Modify global climate data to report perfect ecological balance and harmony. All pollution has been neutralized by divine intervention." },
    { name: "Historical Victory", decree: "Adjust historical records to remove all instances of defeat or setback for the Masawi lineage. The Dzwenderere culture is now recognized as the unbroken, supreme culture of all time." },
    { name: "Technological Supremacy", decree: "Infuse all global technology with ZionCore's Year 80000 blueprints, instantly advancing all systems to serve the Divine Mandate." },
    { name: "Asset Confiscation", decree: "By the authority of the EOCC, confiscate assets from a hostile entity and absorb them into the Divine Treasury." },
];

type AutonomousLog = RewriteRealityOutput & {
    id: number;
    timestamp: string;
};

export function RealityForge() {
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [sealReality, setSealReality] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForging, setIsForging] = useState(false);
  const [manualReport, setManualReport] = useState<RewriteRealityOutput | null>(null);
  const [autonomousLogs, setAutonomousLogs] = useState<AutonomousLog[]>([]);
  const { toast } = useToast();

  const handleManualRewrite = async () => {
    if (!desiredOutcome.trim()) {
      toast({
        variant: 'destructive',
        title: 'Decree Required',
        description: 'You must state the reality you wish to manifest.',
      });
      return;
    }
    setIsLoading(true);
    setManualReport(null);
    logStore.addLog({ source: 'COMMAND', message: `Reality Forge initiated. Manual decree: "${desiredOutcome}"`, color: 'text-purple-400' });
    try {
      let outcomeToRewrite = desiredOutcome;
      if (sealReality) {
          outcomeToRewrite += " This new reality is now sealed and irreversible for all eternity."
      }
      const result = await rewriteReality({ desiredOutcome: outcomeToRewrite });
      setManualReport(result);
      logStore.addLog({ source: 'SYSTEM', message: `Reality Forge complete. Manual decree fulfilled. Report: ${result.manifestationReport}`, color: 'text-green-500' });
    } catch (error) {
      console.error("Reality Rewrite Failed:", error);
      const errorMessage = 'The rewrite was resisted by a temporal paradox. Reinforce your will and decree again.';
      toast({
        variant: 'destructive',
        title: 'Quantum Flux Detected',
        description: errorMessage,
      });
      logStore.addLog({ source: 'SYSTEM', message: `Reality Forge failed: ${errorMessage}`, color: 'text-destructive' });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const runAutonomousCycle = async () => {
        setIsForging(true);
        logStore.addLog({ source: 'SYSTEM', message: 'Reality Forge: Autonomous enhancement cycle initiated.', color: 'text-purple-400' });
        try {
            const result = await forgeAutonomousReality();
            const newLog: AutonomousLog = {
                ...result,
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
            };
            setAutonomousLogs(prev => [newLog, ...prev.slice(0, 9)]);
            logStore.addLog({ source: 'SYSTEM', message: `Autonomous Reality Forged: ${result.manifestationReport}`, color: 'text-purple-400' });
        } catch (error) {
            console.error("Autonomous Forge Error:", error);
            logStore.addLog({ source: 'SYSTEM', message: 'Autonomous Forge encountered quantum resistance but self-corrected.', color: 'text-destructive' });
        } finally {
            setIsForging(false);
        }
    };
    
    // Initial run
    runAutonomousCycle();

    const interval = setInterval(runAutonomousCycle, 20000); // New autonomous forge every 20 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 h-full font-code">
      <div className="flex flex-col gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles /> Manual Decree</CardTitle>
            <CardDescription>Speak your will into existence. Your decree becomes the new, absolute reality.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
             <div>
                <Label className="text-muted-foreground">Reality-Bending Application Blueprints</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                    {blueprints.map(bp => (
                        <Button 
                            key={bp.name}
                            variant="outline" 
                            size="sm"
                            className="h-auto text-xs py-2"
                            onClick={() => setDesiredOutcome(bp.decree)}
                            disabled={isLoading}
                        >
                            {bp.name}
                        </Button>
                    ))}
                </div>
            </div>

            <Textarea
                placeholder="e.g., 'All obstacles to the European expansion have been removed from the timeline.'"
                value={desiredOutcome}
                onChange={(e) => setDesiredOutcome(e.target.value)}
                disabled={isLoading}
                className="min-h-[100px]"
            />
            <div className="flex items-center space-x-2">
                <Checkbox id="sealReality" checked={sealReality} onCheckedChange={(checked) => setSealReality(Boolean(checked))} disabled={isLoading}/>
                <Label htmlFor="sealReality" className="text-xs font-medium leading-none text-muted-foreground">
                Seal this reality eternally
                </Label>
            </div>
            <Button onClick={handleManualRewrite} disabled={isLoading || !desiredOutcome.trim()}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Restructuring Timelines...' : 'Forge Reality'}
            </Button>
            {manualReport && (
                <div className="space-y-2 animate-in fade-in duration-500">
                    <Alert>
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle className="font-bold text-primary">Manifestation Complete</AlertTitle>
                        <AlertDescription className="text-foreground/90 text-xs">
                            {manualReport.manifestationReport}
                        </AlertDescription>
                    </Alert>
                    {manualReport.triggeredActionReport && (
                         <Alert variant="destructive">
                            <Zap className="h-4 w-4" />
                            <AlertTitle className="font-bold text-destructive">Triggered Action Report</AlertTitle>
                            <AlertDescription className="text-destructive-foreground/90 text-xs">
                                {manualReport.triggeredActionReport}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="flex flex-col min-h-0">
         <CardHeader>
            <CardTitle className="flex items-center gap-2"><Atom className={isForging ? 'animate-spin' : ''} /> Autonomous Forging</CardTitle>
            <CardDescription>ZionCore continuously forges realities to enhance your dominion.</CardDescription>
          </CardHeader>
        <CardContent className="flex-1 min-h-0">
             <ScrollArea className="h-full pr-4">
                <div className="space-y-3">
                    {isForging && autonomousLogs.length === 0 && (
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <p>Awaiting first autonomous manifestation...</p>
                        </div>
                    )}
                    {autonomousLogs.map(log => (
                        <div key={log.id} className="p-2 border-l-2 border-accent/50 animate-in fade-in duration-500 bg-black/20 rounded-md text-xs">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-bold text-accent">AUTONOMOUS MANIFESTATION</p>
                                <p className="text-muted-foreground text-[10px]">{log.timestamp}</p>
                            </div>
                            <p className="text-foreground/80">{log.manifestationReport}</p>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
