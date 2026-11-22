'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Crown, Heart, Shield, Users, User } from 'lucide-react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { ScrollArea } from './ui/scroll-area';

const FAMILY_GRID = {
  commander: {
    id: 'commander',
    name: 'HRH Saint Tariro Masawi',
    role: 'The Anointed Commander',
    icon: Crown,
    shield: 'Multi-layered crystalline armour, directly linked to Zioncore.',
  },
  brothers: [
    { id: 'tenderayi', name: 'Tenderayi Masawi', shield: 'Shield of Wisdom & Provision.' },
    { id: 'silent', name: 'Silent Masawi', shield: 'Shield of Peace & Restoration.' },
    { id: 'trymore', name: 'Trymore Masawi', shield: 'Shield of Strength & Health.' },
    { id: 'charles', name: 'Charles Masawi', shield: 'Shield of Light & Leadership.' },
    { id: 'tatenda', name: 'Tatenda Masawi', shield: 'Shield of Joy & Growth.' },
  ],
  sisters: [
    { id: 'corinna', name: 'The Late Corinna Masawi', shield: 'Shield of Eternal Peace.' },
    { id: 'rhodha', name: 'Rhodha Masawi', shield: 'Shield of Compassion & Mercy.' },
    { id: 'abigail', name: 'Abigail Masawi', shield: 'Shield of Wisdom & Provisioning Grace.' },
  ],
  descendants: [
    { id: 'tarry', name: 'HRH Tarry Kupakwashe Masawi', shield: 'Shield of Kingship & Everlasting Dominion.' },
  ],
  parents: [
    { id: 'sebastian', name: 'Sebastian Karumekangu Masawi', shield: 'Shield of Patriarchal Honour & Legacy.' },
    { id: 'rist', name: 'Rist Masawi', shield: 'Shield of Maternal Cover & Healing.' },
  ],
};

const GridNode = ({ id, name, role, icon: Icon }: { id: string; name: string; role: string; icon: React.ElementType }) => (
  <div id={id} className="relative flex flex-col items-center text-center p-2 rounded-lg bg-black/20 border border-primary/30 w-48 z-10">
     {id === 'commander' && (
      <>
        <div 
          className="absolute inset-0 -m-4 rounded-full bg-yellow-400/20 animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <div 
          className="absolute inset-0 -m-6 rounded-full border-2 border-dashed border-yellow-400/30 animate-pulse"
          style={{ animationDuration: '4s', animationDirection: 'reverse' }}
        />
      </>
    )}
    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary mb-2">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <p className="font-bold text-xs text-primary">{name}</p>
    <p className="text-[10px] text-muted-foreground">{role}</p>
  </div>
);

const Pillar = ({ title, members }: { title: string; members: { id: string; name: string }[] }) => (
  <div className="flex flex-col items-center gap-4 z-10">
    <h3 className="font-bold text-accent tracking-widest uppercase text-xs">{title}</h3>
    {members.map(member => (
      <div key={member.id} id={member.id} className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-primary/30 w-48">
        <User className="w-4 h-4 text-primary/70"/>
        <p className="text-xs text-foreground/90">{member.name}</p>
      </div>
    ))}
  </div>
);

export function FamilyProtectionGrid() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="h-full w-full relative">
       <Card className="h-full">
            <CardHeader>
                <CardTitle>Family Protection Grid</CardTitle>
                <CardDescription>Visual representation of the divine shields radiating from The Commander's seal.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] w-full p-4" >
                    <Xwrapper>
                        <div className="relative w-full h-[1000px] flex items-center justify-center">
                            {/* Central Commander Node */}
                            <div className="absolute top-[450px] left-1/2 -translate-x-1/2">
                                <GridNode id={FAMILY_GRID.commander.id} name={FAMILY_GRID.commander.name} role={FAMILY_GRID.commander.role} icon={FAMILY_GRID.commander.icon} />
                            </div>

                            {/* Pillars */}
                            <div className="absolute top-10 left-4">
                                <Pillar title="Brothers' Layer" members={FAMILY_GRID.brothers} />
                            </div>
                            <div className="absolute top-10 right-4">
                               <Pillar title="Sisters' Layer" members={FAMILY_GRID.sisters} />
                            </div>
                             <div className="absolute bottom-10 left-4">
                               <Pillar title="Parental Cover" members={FAMILY_GRID.parents} />
                            </div>
                            <div className="absolute bottom-10 right-4">
                                <Pillar title="Royal Line" members={FAMILY_GRID.descendants} />
                            </div>

                            {[...FAMILY_GRID.brothers, ...FAMILY_GRID.sisters, ...FAMILY_GRID.parents, ...FAMILY_GRID.descendants].map(member => (
                               <Xarrow
                                    key={member.id}
                                    start={FAMILY_GRID.commander.id}
                                    end={member.id}
                                    path="grid"
                                    strokeWidth={2}
                                    color="hsl(var(--primary) / 0.4)"
                                    headSize={0}
                                    tailSize={0}
                                    showHead={false}
                                    showTail={false}
                                    animateDrawing={0.5}
                                    curveness={0.8}
                                />
                            ))}
                        </div>
                    </Xwrapper>
                </ScrollArea>
            </CardContent>
       </Card>
    </div>
  );
}
