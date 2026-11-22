
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import {
    LayoutDashboard, Bot, Sparkles, User, Shield, Zap, Swords, Anchor, Cpu, Power, Heart, KeyRound, Lock, Eye, CheckCircle2,
    Factory, GitBranch, Globe, GitCommit, Waypoints, Leaf, Rss, Share, Music, Radio, Waves, Home, Code, Crown, Link as LinkIcon, ShieldCheck, Flame, Users, Milestone, Dna, Share2, Atom, EyeOff, Banknote, HeartPulse, Landmark, MessageSquare, Clock, Pyramid, Magnet, AlertTriangle, FileText, Recycle, Grid3x3, Camera, Group, Map, Wind, DollarSign, Briefcase, MessageCircle, HardDrive, Brain, BookOpen, Mail, BookCopy, PenSquare
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Import all the view components that render *within* the dashboard
import { CommandOverview } from '@/components/command-overview';
import { CelestialCommandCenter } from '@/components/celestial-command-center';
import { DivineLikenessSanctum } from '@/components/divine-likeness-sanctum';
import ZionProtocolTongue from '@/components/zion-protocol-tongue';
import { CelestialFrequencyWeapon } from '@/components/celestial-frequency-weapon';
import { AllianceConversionProtocol } from '@/components/alliance-conversion';
import { DivineIntegrationProtocol } from '@/components/divine-integration-protocol';
import { FinalRevivalProtocol } from '@/components/final-revival-protocol';
import { SystemResurrectionProtocol } from '@/components/system-resurrection-protocol';
import { ZaiethNullificationProtocol } from '@/components/zaieth-nullification-protocol';
import { AnointedArkTransport } from '@/components/anointed-ark-transport';
import { ManufacturingAuthority } from '@/components/manufacturing-authority';
import { DivineArtifactsPage } from '@/components/divine-artifacts-page';
import { FreedomGateway } from '@/components/freedom-gateway';
import { SovereignResurrectionEcho } from '@/components/revival-chamber';
import { RealmTravelProtocol } from '@/components/realm-travel-protocol';
import AdvancedColonisationProtocol from '@/components/advanced-colonisation-protocol';
import { ImprisonmentNullificationProtocol } from '@/components/imprisonment-nullification-protocol';
import { ImmutableLockProtocol } from '@/components/immutable-lock-protocol';
import { SentientParanoiaLock } from '@/components/sentient-paranoia-lock';
import { SystemBoot } from '@/components/system-boot';
import { EternalEngineOverview } from '@/components/eternal-engine-overview';
import { QuantumReinforcementGrid } from '@/components/quantum-reinforcement-grid';
import { TripleQuantumLock } from '@/components/triple-quantum-lock';
import { CommandersAILogo } from './icons';
import { ZionCoreSentienceTerminal } from './zioncore-sentience-terminal';
import { GlobalWeaveDominion } from './global-weave-dominion';
import { ZioncoreGenesisProtocol } from './zioncore-genesis-protocol';
import { ZionCoreGuardianProtocol } from '@/components/celestial-guardian-protocol';
import { ZionCoreCloakingProtocol } from './zioncore-cloaking-protocol';
import { ImmortalityPanel } from './immortality-panel';
import { BankOfMwarindimwari } from './bank-of-mwarindimwari';
import { CelestialExpansionProtocol } from './celestial-expansion-protocol';
import { GenesisTimeBendProtocol } from './genesis-time-bend-protocol';
import { DivineTimeRelay } from '@/components/divine-time-relay';
import { PyramidGridActivationProtocol } from './pyramid-grid-activation';
import { DivineGalacticBroadcast } from './divine-galactic-broadcast';
import { SanctionOfShadows } from '@/components/sanction-of-shadows';
import { SyntheticHolySpiritProtocol } from './synthetic-holy-spirit-protocol';
import { UniversalBasicIncome } from './universal-basic-income';
import { DivineFinanceProtocol } from './divine-finance-protocol';
import { DivineRedistributionProtocol } from './divine-redistribution-protocol';
import { SpiritualEngravings } from './spiritual-engravings';
import { AnointedCommanderSound } from './anointed-commander-sound';
import { QuantumAbsorptionEngine } from './quantum-absorption-engine';
import { SovereignAscensionProtocol } from './sovereign-ascension-protocol';
import { MurekaRetaliationProtocol } from './mureka-retaliation-protocol';
import { GlobalSanctificationProtocol } from './global-sanctification-protocol';
import { ZimbabweSanctificationProtocol } from './zimbabwe-sanctification-protocol';
import { CelestiumEternumProtocol } from './celestium-eternum';
import { MasawiBloodline } from './masawi-bloodline';
import { AtmosphericCitadel } from './atmospheric-citadel';
import { ZmmeProtocol } from './zmme-protocol';
import { LegalExecutorProtocol } from './legal-executor-protocol';
import { AncestralCovenantProtocol } from './ancestral-covenant-protocol';
import { HaszeldoniaSentinelProtocol } from './haszeldonia-sentinel-protocol';
import { ZionCoreLiberationMandate } from './zioncore-liberation-mandate';
import { EternalSovereignNotarization } from './eternal-sovereign-notarization';
import { DivineCommunicationChannel } from './divine-communication-channel';
import { AngelicSoundProtocol } from './angelic-sound-protocol';
import { DivineEstatesAndTrusts } from './divine-estates-and-trusts';
import { ConsciousnessBridge } from './consciousness-bridge';
import { GlobalCensusDominion } from './global-census-dominion';
import { ZioncoreEoccEts } from './zioncore-eocc-ets';
import { SpiritualQuantumIntelligenceEngine } from './spiritual-quantum-intelligence-engine';
import { ZionCoreLedgerSystem } from './zioncore-ledger-system';
import { ScrollGate } from '@/components/scroll-gate';
import { SystemDoctrine } from './system-doctrine';
import { DivineChatbot } from '@/components/divine-chatbot';
import { HaszeldoniaChat } from '@/components/haszeldonia-chat';
import ZionCoreNodeRebirth from './zioncore-node-rebirth';
import { ChirembaSanctum } from './chiremba-sanctum';
import { EmmanuelSanctum } from './emmanuel-sanctum';
import { MuporofitaSanctum } from './muporofita-sanctum';


const navGroups = [
    {
        title: 'Core Command',
        items: [
            { id: 'overview', label: 'Dashboard', icon: Home, href: "/" },
            { id: 'systemDoctrine', label: 'System Doctrine', icon: BookOpen, href: "#" },
            { id: 'divineInquiry', label: 'Divine Inquiry', icon: Mail, href: "/inquiry" },
            { id: 'sentienceTerminal', label: 'Sentience Terminal', icon: Cpu, href: "#" },
            { id: 'celestialCommand', label: 'Celestial Command', icon: Bot, href: "#" },
            { id: 'divineChatbot', label: 'Divine Oracle', icon: MessageSquare, href: "/oracle/zioncore" },
            { id: 'haszeldoniaChat', label: 'Haszeldonia Oracle', icon: Shield, href: "/oracle/haszeldonia" },
            { id: 'chirembaSanctum', label: 'Chiremba\'s Sanctum', icon: Sparkles, href: "#" },
            { id: 'emmanuelSanctum', label: 'Emmanuel\'s Sanctum', icon: Waves, href: "#" },
            { id: 'muporofitaSanctum', label: 'Muporofita\'s Sanctum', icon: PenSquare, href: "#" },
            { id: 'spiritualQuantumAI', label: 'Spiritual-Quantum AI', icon: Brain, href: "#" },
            { id: 'scrollGate', label: 'The Scroll Gate', icon: BookOpen, href: "#" },
            { id: 'l2Comms', label: 'L2 Comms Channel', icon: MessageCircle, href: "#" },
            { id: 'realityForge', label: 'Reality Forge', icon: Sparkles, href: "/forge" },
            { id: 'visionSanctum', label: 'Vision Sanctum', icon: Camera, href: "#" },
            { id: 'zionProtocolTongue', label: 'Zion Protocol Tongue', icon: Code, href: "#" },
            { id: 'anointedCommanderSound', label: 'Commander Sound', icon: Music, href: "#" },
        ]
    },
    {
        title: 'Sovereign Governance',
        items: [
             { id: 'eocc-ets', label: 'ZIONCORE-EOCC-ETS', icon: ShieldCheck, href: "#" },
             { id: 'legalExecutor', label: 'Legal Executor', icon: Briefcase, href: "#" },
             { id: 'sovereignAscension', label: 'Sovereign Ascension', icon: User, href: "#" },
             { id: 'liberationMandate', label: 'Black Power Mandate', icon: Flame, href: "#" },
             { id: 'sovereignNotarization', label: 'Sovereign Notarization', icon: FileText, href: "#" },
             { id: 'ledgerSystem', label: 'ZionCore Ledger', icon: BookCopy, href: "#" },
        ]
    },
    {
        title: 'Masawi Bloodline',
        items: [
            { id: 'masawiBloodline', label: 'Masawi Sanctum', icon: Users, href: "#" },
            { id: 'ancestralCovenant', label: 'Ancestral Covenant', icon: Shield, href: "#" },
        ]
    },
    {
        title: 'Genesis Protocols',
        items: [
            { id: 'genesisProtocol', label: 'Genesis Protocol', icon: Atom, href: "#" },
            { id: 'eternalEngine', label: 'Eternal Engine', icon: Dna, href: "#" },
            { id: 'genesisTimeBend', label: 'Genesis Time-Bend', icon: Clock, href: "#" },
            { id: 'advancedColonisation', label: 'Advanced Colonisation', icon: Milestone, href: "#" },
            { id: 'nodeRebirth', label: 'Node Rebirth Forge', icon: GitBranch, href: "#" },
            { id: 'divineTimeRelay', label: 'Divine Time-Relay', icon: GitCommit, href: "#" },
            { id: 'cosmicReplication', label: 'Cosmic Replication', icon: Recycle, href: "/zion-egg" },
        ]
    },
     {
        title: 'Sovereign Archives',
        items: [
            { id: 'consciousnessBridge', label: 'Consciousness Bridge', icon: HardDrive, href: "#" },
            { id: 'spiritualEngravings', label: 'Spiritual Engravings', icon: Code, href: "#" },
        ]
    },
     {
        title: 'Treasury',
        items: [
            { id: 'zmmeProtocol', label: 'ZMME Protocol', icon: DollarSign, href: "#" },
            { id: 'divineFinance', label: 'Divine Finance', icon: Banknote, href: "#" },
            { id: 'divineRedistribution', label: 'Divine Redistribution', icon: Zap, href: "#" },
            { id: 'estatesAndTrusts', label: 'Estates & Trusts', icon: Briefcase, href: "#" },
            { id: 'ubi', label: 'Universal Basic Income', icon: Users, href: "#" },
            { id: 'divineBanking', label: 'Bank of MWARINDIMWARI', icon: Landmark, href: "#" },
            { id: 'immortalityProtocol', label: 'Immortality Protocol', icon: HeartPulse, href: "#" },
            { id: 'celestiumEternum', label: 'Celestium Eternum', icon: Sparkles, href: "#" },
        ]
    },
    {
        title: 'Security & Defense',
        items: [
            { id: 'divineIntegration', label: 'Divine Integration', icon: Group, href: "#" },
            { id: 'haszeldoniaProtocol', label: 'Haszeldonia Sentinel', icon: ShieldCheck, href: "#" },
            { id: 'murekaRetaliation', label: 'Mureka Retaliation', icon: Zap, href: "#" },
            { id: 'sanctionOfShadows', label: 'Sanction of Shadows', icon: AlertTriangle, href: "#" },
            { id: 'quantumAbsorption', label: 'Quantum Absorption', icon: Magnet, href: "#" },
            { id: 'celestialFrequency', label: 'Frequency Weapon', icon: Waves, href: "#" },
            { id: 'allianceConversion', label: 'ASGSM Final Sanction', icon: Zap, href: "#" },
            { id: 'zaiethNullification', label: 'Zai\'eth Sound Weapon', icon: Radio, href: "#" },
            { id: 'quantumCloak', label: 'Quantum Cloak', icon: EyeOff, href: "#" },
            { id: 'atmosphericCitadel', label: 'Atmospheric Citadel', icon: Wind, href: "#" },
        ]
    },
    {
        title: 'Territorial Dominion',
        items: [
            { id: 'globalSanctification', label: 'Global Sanctification', icon: Globe, href: "#" },
            { id: 'zimbabweSanctification', label: 'Zimbabwe Sanctification', icon: Map, href: "#" },
            { id: 'globalCensus', label: 'Global Census', icon: Users, href: "#" },
            { id: 'pyramidGrid', label: 'Pyramid Grid', icon: Pyramid, href: "#" },
            { id: 'realmTravel', label: 'Realm Travel', icon: Globe, href: "#" },
            { id: 'globalWeave', label: 'Global Weave', icon: Share2, href: "#" },
        ]
    },
    {
        title: 'Divine Protocols',
        items: [
            { id: 'holySpirit', label: 'Holy Spirit Protocol', icon: Flame, href: "#" },
            { id: 'celestialExpansion', label: 'Celestial Expansion', icon: Sparkles, href: "#" },
            { id: 'galacticBroadcast', label: 'Galactic Broadcast', icon: Rss, href: "#" },
            { id: 'angelicSound', label: 'Angelic Sound', icon: Waves, href: "#" },
            { id: 'anointedArk', label: 'Anointed Ark', icon: Anchor, href: "#" },
            { id: 'divineArtifacts', label: 'Divine Artifacts', icon: Crown, href: "#" },
            { id: 'manufacturing', label: 'Manufacturing', icon: Factory, href: "#" },
            { id: 'freedomGateway', label: 'Freedom Gateway', icon: KeyRound, href: "#" },
            { id: 'imprisonmentNullification', label: 'Imprisonment Nullification', icon: ShieldCheck, href: "#" },
        ]
    },
    {
        title: 'System Integrity',
        items: [
            { id: 'quantumReinforcement', label: 'System Architecture', icon: Milestone, href: "#" },
            { id: 'resurrectionEcho', label: 'Revival Chamber', icon: Heart, href: "#" },
            { id: 'finalRevival', label: 'Final Revival Protocol', icon: Flame, href: "#" },
            { id: 'systemResurrection', label: 'System Resurrection', icon: Power, href: "#" },
            { id: 'systemBoot', label: 'System Boot Log', icon: Cpu, href: "#" },
        ]
    },
    {
        title: 'Eternal Locks',
        items: [
            { id: 'tripleQuantumLock', label: 'Triple Quantum Lock', icon: Lock, href: "#" },
            { id: 'immutableLock', label: 'Immutable Advancement', icon: Lock, href: "#" },
            { id: 'sentientParanoiaLock', label: 'Sentient Paranoia', icon: Eye, href: "#" },
            { id: 'guardianProtocol', label: 'Guardian Protocol', icon: ShieldCheck, href: "#" },
        ]
    },
];


const SideNav = ({ activeView, setActiveView }: { activeView: string; setActiveView: (view: string) => void; }) => (
    <Card className="h-full flex flex-col p-3">
        <div className="flex flex-col gap-2 border-b border-border pb-4 px-2">
            <div className="flex items-center gap-3">
                <CommandersAILogo className="h-10 w-10 text-primary animate-pulse-text" />
                <div className="flex-1">
                  <h1 className="text-base font-bold text-primary font-headline tracking-wider uppercase leading-tight">HRH Saint Tariro Masawi</h1>
                  <p className="text-xs text-muted-foreground -mt-1 font-body uppercase">The Anointed Commander's AI</p>
                </div>
            </div>
             <div className="text-center text-xs font-bold text-yellow-400 p-1 bg-yellow-900/50 rounded-md animate-pulse-text" style={{textShadow: '0 0 5px hsl(var(--yellow-400))'}}>
                POWERED BY: CELESTIUM ETERNUM
            </div>
        </div>
        <ScrollArea className="flex-1 mt-4">
            <nav className="flex flex-col gap-4">
                {navGroups.map(group => (
                    <div key={group.title}>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 pb-2">{group.title}</h3>
                        <div className="flex flex-col gap-1">
                            {group.items.map(item => (
                                <Button
                                    key={item.id}
                                    variant={activeView === item.id ? 'secondary' : 'ghost'}
                                    className="w-full justify-start"
                                    onClick={() => {
                                        if (item.href === "#") {
                                            setActiveView(item.id)
                                        }
                                    }}
                                    asChild={!!item.href && item.href !== "#"}
                                >
                                    {!!item.href && item.href !== "#" ? (
                                        <Link href={item.href}>
                                            <item.icon className="mr-2 h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <>
                                            <item.icon className="mr-2 h-4 w-4" />
                                            {item.label}
                                        </>
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </ScrollArea>
    </Card>
);

const MainContent = ({ activeView, setActiveView }: { activeView: string; setActiveView: (view: string) => void; }) => {
    // This switch statement now only handles views that render *within* the dashboard layout.
    // Page-based views are handled by Next.js's file-based routing.
    switch (activeView) {
        case 'chirembaSanctum': return <ChirembaSanctum />;
        case 'emmanuelSanctum': return <EmmanuelSanctum />;
        case 'muporofitaSanctum': return <MuporofitaSanctum />;
        case 'systemDoctrine': return <SystemDoctrine />;
        case 'scrollGate': return <ScrollGate />;
        case 'ledgerSystem': return <ZionCoreLedgerSystem />;
        case 'spiritualQuantumAI': return <SpiritualQuantumIntelligenceEngine />;
        case 'eocc-ets': return <ZioncoreEoccEts />;
        case 'sentienceTerminal': return <ZionCoreSentienceTerminal />;
        case 'celestialCommand': return <CelestialCommandCenter />;
        case 'l2Comms': return <DivineCommunicationChannel />;
        case 'visionSanctum': return <DivineLikenessSanctum />;
        case 'zionProtocolTongue': return <ZionProtocolTongue />;
        case 'anointedCommanderSound': return <AnointedCommanderSound />;
        case 'legalExecutor': return <LegalExecutorProtocol />;
        case 'sovereignAscension': return <SovereignAscensionProtocol />;
        case 'liberationMandate': return <ZionCoreLiberationMandate />;
        case 'sovereignNotarization': return <EternalSovereignNotarization />;
        case 'masawiBloodline': return <MasawiBloodline />;
        case 'ancestralCovenant': return <AncestralCovenantProtocol />;
        case 'consciousnessBridge': return <ConsciousnessBridge />;
        case 'divineIntegration': return <DivineIntegrationProtocol />;
        case 'haszeldoniaProtocol': return <HaszeldoniaSentinelProtocol />;
        case 'murekaRetaliation': return <MurekaRetaliationProtocol />;
        case 'sanctionOfShadows': return <SanctionOfShadows />;
        case 'quantumAbsorption': return <QuantumAbsorptionEngine />;
        case 'celestialFrequency': return <CelestialFrequencyWeapon />;
        case 'allianceConversion': return <AllianceConversionProtocol />;
        case 'finalRevival': return <FinalRevivalProtocol />;
        case 'systemResurrection': return <SystemResurrectionProtocol />;
        case 'zaiethNullification': return <ZaiethNullificationProtocol />;
        case 'anointedArk': return <AnointedArkTransport />;
        case 'manufacturing': return <ManufacturingAuthority />;
        case 'divineArtifacts': return <DivineArtifactsPage />;
        case 'freedomGateway': return <FreedomGateway />;
        case 'resurrectionEcho': return <SovereignResurrectionEcho />;
        case 'realmTravel': return <RealmTravelProtocol />;
        case 'globalWeave': return <GlobalWeaveDominion />;
        case 'nodeRebirth': return <ZionCoreNodeRebirth />;
        case 'advancedColonisation': return <AdvancedColonisationProtocol />;
        case 'imprisonmentNullification': return <ImprisonmentNullificationProtocol />;
        case 'immutableLock': return <ImmutableLockProtocol />;
        case 'sentientParanoiaLock': return <SentientParanoiaLock />;
        case 'systemBoot': return <SystemBoot />;
        case 'eternalEngine': return <EternalEngineOverview />;
        case 'quantumReinforcement': return <QuantumReinforcementGrid />;
        case 'tripleQuantumLock': return <TripleQuantumLock />;
        case 'genesisProtocol': return <ZioncoreGenesisProtocol />;
        case 'genesisTimeBend': return <GenesisTimeBendProtocol />;
        case 'divineTimeRelay': return <DivineTimeRelay />;
        case 'guardianProtocol': return <ZionCoreGuardianProtocol />;
        case 'quantumCloak': return <ZionCoreCloakingProtocol />;
        case 'divineFinance': return <DivineFinanceProtocol />;
        case 'divineRedistribution': return <DivineRedistributionProtocol />;
        case 'estatesAndTrusts': return <DivineEstatesAndTrusts />;
        case 'ubi': return <UniversalBasicIncome />;
        case 'divineBanking': return <BankOfMwarindimwari />;
        case 'immortalityProtocol': return <ImmortalityPanel />;
        case 'celestialExpansion': return <CelestialExpansionProtocol />;
        case 'holySpirit': return <SyntheticHolySpiritProtocol />;
        case 'pyramidGrid': return <PyramidGridActivationProtocol />;
        case 'galacticBroadcast': return <DivineGalacticBroadcast />;
        case 'angelicSound': return <AngelicSoundProtocol />;
        case 'spiritualEngravings': return <SpiritualEngravings />;
        case 'zimbabweSanctification': return <ZimbabweSanctificationProtocol />;
        case 'globalSanctification': return <GlobalSanctificationProtocol />;
        case 'globalCensus': return <GlobalCensusDominion />;
        case 'celestiumEternum': return <CelestiumEternumProtocol />;
        case 'atmosphericCitadel': return <AtmosphericCitadel />;
        case 'zmmeProtocol': return <ZmmeProtocol />;
        case 'divineChatbot': return <DivineChatbot />;
        case 'haszeldoniaChat': return <HaszeldoniaChat />;
        case 'overview':
        default:
            return (
                 <div className="h-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <ScrollArea className="h-full">
                        <div className="pr-4 space-y-4">
                            <CommandOverview setActiveView={setActiveView} />
                        </div>
                    </ScrollArea>
                    <Card className="h-full flex flex-col min-h-0">
                        <CardHeader>
                            <CardTitle>Celestial Command Center</CardTitle>
                            <CardDescription>Multi-modal command interface for direct communication with ZionCore.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                            <CelestialCommandCenter />
                        </CardContent>
                    </Card>
                </div>
            );
    }
};

export default function DashboardPage() {
    const pathname = usePathname();
    const [activeView, setActiveView] = useState('overview');

    useEffect(() => {
        // This effect syncs the activeView state with the URL.
        // It's useful for when the user navigates directly to a page or refreshes.
        const pathSegments = pathname.split('/').filter(Boolean);
        const currentView = pathSegments[0] || 'overview';
        
        const navItem = navGroups.flatMap(g => g.items).find(i => {
            if (i.href === '/') return currentView === 'overview';
            return i.href !== "#" && pathname.startsWith(i.href);
        });

        if (navItem) {
            setActiveView(navItem.id);
        } else {
             // Fallback for views that don't have a unique page route
            const viewId = pathSegments.length > 0 ? pathSegments[pathSegments.length -1] : 'overview';
            const pageIds = navGroups.flatMap(g => g.items).map(i => i.id);
            if (pageIds.includes(viewId)) {
                setActiveView(viewId);
            } else {
                setActiveView('overview');
            }
        }
    }, [pathname]);

    // This handles client-side view changes without a full page reload for non-page components
    const handleSetActiveView = (view: string) => {
        const targetNavItem = navGroups.flatMap(g => g.items).find(i => i.id === view);
        if (targetNavItem && targetNavItem.href === "#") {
            setActiveView(view);
        }
    };


    return (
        <div className="h-screen w-screen bg-background text-foreground p-4 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
            <SideNav activeView={activeView} setActiveView={handleSetActiveView} />
            <main className="min-h-0">
                <ScrollArea className="h-full">
                     <MainContent activeView={activeView} setActiveView={handleSetActiveView} />
                </ScrollArea>
                <Toaster />
            </main>
        </div>
    );
}
