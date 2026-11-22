
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Radio, Waves, CheckCircle2, Recycle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';

type WeaponMode = 'strike' | 'manifest';

export function CelestialFrequencyWeapon() {
  const [status, setStatus] = useState<'idle' | 'firing' | 'complete'>('idle');
  const [mode, setMode] = useState<WeaponMode>('strike');
  const [manifestationProgress, setManifestationProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const initAudioContext = () => {
    if (!audioContextRef.current) {
        try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API is not supported in this browser", e);
            toast({
                variant: 'destructive',
                title: 'Auditory Channel Error',
                description: 'This vessel does not support divine frequency projection.',
            });
        }
    }
    return audioContextRef.current;
  }

  const playStrikeSound = () => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    const now = audioContext.currentTime;
    const rumble = audioContext.createOscillator();
    rumble.type = 'sawtooth';
    rumble.frequency.setValueAtTime(80, now);
    rumble.frequency.exponentialRampToValueAtTime(30, now + 0.5);
    const rumbleGain = audioContext.createGain();
    rumbleGain.gain.setValueAtTime(0.3, now);
    rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
    rumble.connect(rumbleGain).connect(audioContext.destination);
    const highPitch = audioContext.createOscillator();
    highPitch.type = 'sine';
    highPitch.frequency.setValueAtTime(4000, now);
    highPitch.frequency.exponentialRampToValueAtTime(12000, now + 0.2);
    highPitch.frequency.exponentialRampToValueAtTime(6000, now + 1);
    const highPitchGain = audioContext.createGain();
    highPitchGain.gain.setValueAtTime(0.2, now);
    highPitchGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
    highPitch.connect(highPitchGain).connect(audioContext.destination);
    const noise = audioContext.createBufferSource();
    const bufferSize = audioContext.sampleRate * 1;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    noise.connect(noiseGain).connect(audioContext.destination);
    rumble.start(now);
    highPitch.start(now);
    noise.start(now);
    rumble.stop(now + 2);
    highPitch.stop(now + 2);
    noise.stop(now + 2);
  };

  const playManifestSound = () => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    const now = audioContext.currentTime;
    const fundamental = 261.63; // C4
    const frequencies = [fundamental, fundamental * 1.25, fundamental * 1.5]; // C, E, G

    frequencies.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.1);

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, now + index * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.4, now + index * 0.1 + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.1 + 1.5);

        osc.connect(gainNode).connect(audioContext.destination);
        osc.start(now + index * 0.1);
        osc.stop(now + index * 0.1 + 1.6);
    });
  };

  const toggleWeapon = () => {
    if (status === 'complete') {
        setStatus('idle');
        setManifestationProgress(0);
        return;
    }

    if (status === 'idle') {
      const audioContext = initAudioContext();
      if (!audioContext) return;
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      setStatus('firing');
      if(mode === 'strike'){
        logStore.addLog({ source: 'SECURITY', message: 'LETHAL SPIRITUAL STRIKE ACTIVATED.', color: 'text-destructive' });
        playStrikeSound();
        intervalRef.current = setInterval(playStrikeSound, 1500);
      } else {
        logStore.addLog({ source: 'SYSTEM', message: 'MANIFESTATION WAVE EMITTED. Harmonizing local reality.', color: 'text-primary' });
        playManifestSound();
        intervalRef.current = setInterval(playManifestSound, 2500);

        setManifestationProgress(0);
        progressIntervalRef.current = setInterval(() => {
            setManifestationProgress(prev => {
                const newProgress = prev + 10;
                if (newProgress >= 100) {
                    if(progressIntervalRef.current) clearInterval(progressIntervalRef.current);
                    if(intervalRef.current) clearInterval(intervalRef.current);
                    setStatus('complete');
                    logStore.addLog({ source: 'SYSTEM', message: 'MANIFESTATION COMPLETE. Realities aligned.', color: 'text-green-500' });
                }
                return newProgress;
            });
        }, 1200);
      }
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setStatus('idle');
      setManifestationProgress(0);
      logStore.addLog({ source: 'SECURITY', message: 'Divine frequency wave has been silenced.', color: 'text-yellow-400' });
    }
  };
  
  const handleModeChange = (newMode: string) => {
    if (status === 'firing' || status === 'complete') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setStatus('idle');
      setManifestationProgress(0);
    }
    setMode(newMode as WeaponMode);
  }

  return (
    <div className="relative p-4 rounded-md border border-border bg-black/30 overflow-hidden flex flex-col items-center justify-center text-center space-y-4">
      <div className={cn(
          "absolute inset-0 transition-opacity duration-500",
          status === 'firing' 
            ? 'animate-pulse opacity-75' 
            : 'opacity-0',
          status === 'firing' && (mode === 'strike' ? 'bg-destructive/80' : 'bg-primary/80')
      )}></div>
      
      <div className="relative z-10 w-full">
        <Tabs defaultValue="strike" onValueChange={handleModeChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="strike">Lethal Strike</TabsTrigger>
                <TabsTrigger value="manifest">Manifestation</TabsTrigger>
            </TabsList>
            <TabsContent value="strike" className="space-y-4 pt-4">
                <h4 className="text-sm font-bold font-headline text-destructive flex items-center justify-center gap-2">
                    <Radio className="h-4 w-4" />
                    Lethal Frequency Weapon
                </h4>
                <p className="font-code text-xs text-muted-foreground">
                    Unleash to nullify hostile spiritual constructs. Use with extreme prejudice.
                </p>
                <Button
                    onClick={toggleWeapon}
                    variant="destructive"
                    size="lg"
                    className="w-full shadow-lg shadow-destructive/20"
                >
                    <Zap className="mr-2 h-4 w-4" />
                    {status === 'firing' && mode === 'strike' ? 'DEACTIVATE STRIKE' : 'LAUNCH LETHAL STRIKE'}
                </Button>
            </TabsContent>
            <TabsContent value="manifest" className="space-y-4 pt-4">
                <h4 className="text-sm font-bold font-headline text-primary flex items-center justify-center gap-2">
                    <Waves className="h-4 w-4" />
                    Manifestation Wave
                </h4>
                <p className="font-code text-xs text-muted-foreground">
                    Emit a harmonizing frequency to align physical reality with celestial manifestations.
                </p>
                <div className="p-3 rounded-md bg-black/20 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">STATUS</p>
                    {status === 'complete' && mode === 'manifest' ? (
                        <p className="text-green-500 font-bold flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            MANIFESTATION COMPLETE
                        </p>
                    ) : status === 'firing' && mode === 'manifest' ? (
                        <div>
                            <p className="text-primary font-bold animate-pulse-text flex items-center justify-center gap-2 mb-2">
                                <Waves className="h-4 w-4" />
                                EMITTING HARMONIZING FREQUENCY...
                            </p>
                            <Progress value={manifestationProgress} className="h-2" />
                        </div>
                    ) : (
                        <p className="text-muted-foreground font-bold">INACTIVE</p>
                    )}
                </div>
                <Button
                    onClick={toggleWeapon}
                    variant={status === 'complete' ? 'outline' : 'default'}
                    size="lg"
                    className="w-full shadow-lg shadow-primary/20"
                >
                     {status === 'complete' ? (
                        <><Recycle className="mr-2 h-4 w-4" /> Reset Protocol</>
                    ) : status === 'firing' && mode === 'manifest' ? (
                        <><Waves className="mr-2 h-4 w-4" /> Cease Wave</>
                    ) : (
                        <><Waves className="mr-2 h-4 w-4" /> Emit Manifestation Wave</>
                    )}
                </Button>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
