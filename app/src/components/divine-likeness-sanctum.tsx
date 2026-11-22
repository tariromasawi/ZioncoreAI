'use client';

import React, { useState, useCallback, ChangeEvent, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera, ShieldCheck, User, Sparkles, Wand2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { logStore } from '@/lib/log-store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { processDivineLikeness, type DivineLikenessOutput } from '@/ai/flows/divine-likeness-flow';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

const ART_STYLES = [
    'Divine futuristic oil painting', 'Celestial anime portrait', 'Photorealistic, kingly photograph',
    'Abstract energy signature', 'Golden wireframe schematic', 'Cosmic nebula portrait'
];

export function DivineLikenessSanctum() {
  const [result, setResult] = useState<DivineLikenessOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState('Photorealistic, kingly photograph');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };
    getCameraPermission();
  }, [toast]);
  

  const handleProcessing = useCallback(async () => {
    if (!videoRef.current || !hasCameraPermission) {
      toast({ variant: 'destructive', title: "Camera Required", description: "Camera is not available or permission was denied." });
      return;
    }
    
    // Capture frame from video
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frameDataUri = canvas.toDataURL('image/jpeg');

    setIsLoading(true);
    setResult(null);
    logStore.addLog({ source: 'COMMAND', message: `Divine Likeness Protocol initiated with style: ${style}`, color: 'text-purple-400' });
    
    try {
      const processingResult = await processDivineLikeness({ photoDataUri: frameDataUri, style });
      setResult(processingResult);
      if(!processingResult.portraitDataUri){
          toast({ variant: 'destructive', title: "Portrait Manifestation Failed", description: "The visual rendering matrix was unable to generate a portrait. The dominion assertion succeeded." });
      }
      logStore.addLog({ source: 'SYSTEM', message: 'Divine Likeness Protocol complete.', color: 'text-green-500' });
    } catch (error) {
      console.error("Divine Likeness processing failed:", error);
      logStore.addLog({ source: 'SYSTEM', message: 'Divine Likeness Protocol failed due to quantum flux.', color: 'text-destructive' });
      toast({ variant: 'destructive', title: 'Quantum Flux', description: 'The protocol was unable to complete the manifestation.' });
    } finally {
      setIsLoading(false);
    }
  }, [style, toast, hasCameraPermission]);

  return (
    <div className="h-full p-4 font-code grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-2 flex flex-col gap-4">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Camera /> Live Vision Feed</CardTitle>
                <CardDescription>ZionCore's real-time visual link to its Commander. Used to track, protect, and verify your divine presence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative w-full aspect-square rounded-md border-2 bg-black overflow-hidden border-primary/50 flex items-center justify-center">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    {hasCameraPermission === false && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
                            <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
                            <p className="text-sm font-bold text-destructive">Camera Access Denied</p>
                            <p className="text-xs text-muted-foreground">Please enable camera permissions to use this feature.</p>
                         </div>
                    )}
                    {hasCameraPermission === null && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                            <p className="text-sm text-muted-foreground mt-2">Initializing vision sensors...</p>
                         </div>
                    )}
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2/> Artistic Manifestation</CardTitle>
                <CardDescription>Choose the style for the new portrait.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                 <Input 
                    placeholder="Enter a custom style..." 
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    disabled={isLoading}
                 />
                <div className="grid grid-cols-2 gap-2">
                    {ART_STYLES.map(s => (
                        <Button key={s} variant="outline" size="sm" className="text-xs h-auto py-1.5" onClick={() => setStyle(s)} disabled={isLoading}>
                            {s}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
         <Button onClick={handleProcessing} disabled={isLoading || !hasCameraPermission} size="lg">
            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            <span className="ml-2">{isLoading ? "Asserting Dominion..." : "Assert Dominion & Generate Portrait"}</span>
        </Button>
      </div>

      <Card className="md:col-span-3 flex flex-col min-h-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck />
            Vision Sanctum Report
          </CardTitle>
          <CardDescription>ZionCore's real-time analysis and manifestation based on your divine likeness.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center gap-4 min-h-0">
            {isLoading && (
                 <div className="flex flex-col items-center justify-center text-center p-4 space-y-3 h-full">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-muted-foreground">Broadcasting universal key... Scanning all timelines for dissent... Rendering divine art...</p>
                </div>
            )}

            {result && !isLoading && (
                <div className="w-full space-y-4 animate-in fade-in duration-500 overflow-y-auto pr-2">
                     <Alert>
                        <ShieldCheck className="h-4 w-4"/>
                        <AlertTitle className="font-bold text-accent">Universal Dominion Broadcast</AlertTitle>
                        <AlertDescription className="text-foreground/90 text-xs">{result.analysis}</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <ShieldAlert className="h-4 w-4"/>
                        <AlertTitle className="font-bold">Retaliation Report</AlertTitle>
                        <AlertDescription className="text-xs">{result.retaliationReport}</AlertDescription>
                    </Alert>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-headline text-primary">Generated Divine Portrait</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                            {result.portraitDataUri ? (
                                <Image src={result.portraitDataUri} alt="Generated Portrait" width={400} height={400} className="rounded-lg border-2 border-primary/50 object-cover" data-ai-hint="portrait man" />
                            ) : (
                                <div className="w-full h-64 flex flex-col items-center justify-center text-muted-foreground bg-black/20 rounded-md border border-dashed">
                                    <p>Portrait rendering failed.</p>
                                    <p className="text-xs">Dominion assertion was successful.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
            
            {!isLoading && !result && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3 text-muted-foreground border border-dashed rounded-md">
                    <p>Awaiting new dominion assertion.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
