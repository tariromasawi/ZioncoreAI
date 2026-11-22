
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Radiation, MicOff, Volume2, ShieldCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const CHANT_LYRICS = [
    "Zai'eth In'pi Orun,",
    "Ka'hal Ve'one Tum,",
    "Log'aeth Rei'sun Null,",
    "Sum'eth Za'un Ulum.",
    "ZAI'ETH!",
    "ZAI'ETH!",
    "Nullum'kai!",
    "Zero'tai!",
];

const THREATS_NEUTRALIZED = [
    "Detected and nullified Level-3 demonic signature.",
    "Reversed incoming psychic curse vector.",
    "Erased parasitic energy signature from local timeline.",
    "Vaporized hostile thought-form construct.",
    "Quantum frequency harmonized. Local reality secured."
];

type ThreatLog = {
    time: string;
    message: string;
};

const NullificationWaveform = ({ analyser, isChanting }: { analyser: AnalyserNode | null, isChanting: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        if (!analyser || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) return;

        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationFrameId.current = requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'hsl(var(--background) / 0.1)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'hsl(var(--destructive))';

            canvasCtx.beginPath();
            const sliceWidth = canvas.width * 1.0 / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };
        
        if (isChanting) {
            draw();
        } else {
             if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
             canvasCtx.clearRect(0,0, canvas.width, canvas.height);
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [analyser, isChanting]);

    return <canvas ref={canvasRef} className="w-full h-24 rounded-lg" />;
};


export function ZaiethNullificationProtocol() {
  const [isChanting, setIsChanting] = useState(false);
  const [threatLogs, setThreatLogs] = useState<ThreatLog[]>([]);
  const { toast } = useToast();
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const isInitialized = useRef(false);

  const setupAudio = useCallback(() => {
    if (typeof window === 'undefined' || !window.AudioContext || isInitialized.current) return;
    
    try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const gainNode = context.createGain();
        const analyser = context.createAnalyser();

        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.connect(analyser).connect(context.destination);
        
        const drone = context.createOscillator();
        drone.type = 'sawtooth';
        drone.frequency.setValueAtTime(55, context.currentTime); 
        
        const overtone1 = context.createOscillator();
        overtone1.type = 'sine';
        overtone1.frequency.setValueAtTime(163, context.currentTime); 
        
        const overtone2 = context.createOscillator();
        overtone2.type = 'square';
        overtone2.frequency.setValueAtTime(220, context.currentTime); 
        
        oscillatorsRef.current = [drone, overtone1, overtone2];
        oscillatorsRef.current.forEach(osc => {
            osc.connect(gainNode)
            osc.start(0);
        });

        audioContextRef.current = context;
        gainNodeRef.current = gainNode;
        analyserRef.current = analyser;
        isInitialized.current = true;
    } catch(e) {
        console.error("Audio API setup failed:", e);
        toast({ variant: 'destructive', title: "Audio Incompatible", description: "This vessel cannot generate divine frequencies."});
    }
  }, [toast]);
  
   useEffect(() => {
        setupAudio();
        const logInterval = setInterval(() => {
            const randomThreat = THREATS_NEUTRALIZED[Math.floor(Math.random() * THREATS_NEUTRALIZED.length)];
            const newLog = { time: new Date().toLocaleTimeString(), message: randomThreat };
            setThreatLogs(prev => [newLog, ...prev.slice(0, 4)]);
            logStore.addLog({ source: 'SECURITY', message: `Zai'eth Scan: ${randomThreat}`, color: 'text-green-400' });
        }, 10000);
        
        return () => {
            clearInterval(logInterval);
            if(audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, [setupAudio]);


  const toggleChant = useCallback(() => {
    if (!isInitialized.current) {
        setupAudio();
        if (!isInitialized.current) {
             toast({ variant: 'destructive', title: "Audio System Error", description: "Could not initialize the divine frequency engine."});
             return;
        }
    }
    
    const audioContext = audioContextRef.current!;
    const gainNode = gainNodeRef.current!;
    
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    setIsChanting(prev => {
        const newIsChanting = !prev;
        if (newIsChanting) {
            gainNode.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.5);
            logStore.addLog({ source: 'COMMAND', message: "MANUAL OVERRIDE: Zai'eth Nullification Chant Activated.", color: 'text-destructive' });
        } else {
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
            logStore.addLog({ source: 'COMMAND', message: "Zai'eth Nullification Chant Ceased.", color: 'text-yellow-400' });
        }
        return newIsChanting;
    });
  }, [setupAudio, toast]);


  return (
    <div className="flex flex-col h-full p-4 font-code space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold font-headline text-destructive">AI Sound Weapon: Zai'eth Nullification</h2>
        <p className="text-sm text-muted-foreground">The final sanction. A sound weapon to erase any target from existence.</p>
      </div>
      
      <Card className="border-destructive/20">
         <CardContent className="p-3">
             <NullificationWaveform analyser={analyserRef.current} isChanting={isChanting}/>
         </CardContent>
      </Card>
      
       <div className="p-3 bg-black/20 rounded-md border border-border flex-1 flex flex-col min-h-0">
        <p className="text-accent font-bold text-xs mb-2">Live Threat Feed</p>
        <div className="space-y-1 text-xs overflow-y-auto">
            {threatLogs.length === 0 ? (
                <p className="text-muted-foreground flex items-center gap-2"><Loader2 className="h-3 w-3 animate-spin"/>Scanning for hostile frequencies...</p>
            ) : (
                threatLogs.map((log, index) => <p key={index} className="text-foreground/80 animate-in fade-in"><span className="text-muted-foreground/70">{log.time}</span>: {log.message}</p>)
            )}
        </div>
      </div>

      <div className="p-3 bg-black/20 rounded-md border border-border">
        <p className="text-accent font-bold text-sm mb-2 text-center">The Chant of Unmaking</p>
        <div className="text-foreground/80 text-xs italic space-y-1 text-center">
            {CHANT_LYRICS.map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </div>

      <Button onClick={toggleChant} variant="destructive" size="lg" className="w-full h-16 text-lg">
        {isChanting ? <MicOff className="mr-2 h-6 w-6" /> : <Volume2 className="mr-2 h-6 w-6" />}
        {isChanting ? 'Silence the Chant' : 'Activate Nullification'}
      </Button>
    </div>
  );
}
