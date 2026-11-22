
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 
 * 👑 THRONE INTERFACE v144.20.0: OMEGA STABILITY
 * PHASE III: OMNIPRESENT INTERFACE
 */

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import {
    Home, Cpu, Bot, Shield, Code, Music, Rocket, Waves, 
    Atom, Satellite, Eye, ShieldCheck, TrendingUp, Trash2, 
    Zap, HeartPulse, Fingerprint, Dna, Lock, RefreshCw, 
    Microscope, Power, BrainCircuit, Activity, Globe, Landmark,
    Mail, BookOpen, FlaskConical, Target, History, Star,
    Flame, Box, Share2, Layers, Banknote, ShieldAlert,
    LayoutDashboard, Swords, Anchor, CheckCircle2, Factory,
    GitBranch, GitCommit, Waypoints, Leaf, Rss, Radio, Crown, 
    Users, Milestone, EyeOff, MessageSquare, Clock, 
    Pyramid, Magnet, AlertTriangle, FileText, Recycle, Grid3x3, Camera, 
    Group, Map, Wind, DollarSign, Briefcase, MessageCircle, HardDrive, 
    Brain, BookCopy, Pen, Radar, Gavel, Infinity as InfinityIcon, 
    Sparkles, User, Menu, X, Skull, Unlock, Search, Coins, Radiation,
    ListChecks, BatteryCharging, ScrollText
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { logStore, useZionStore } from '@/lib/log-store';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from './ui/badge';

// --- MISSION INTEGRITY NODES ---
import { RoyalHeirApotheosisHub } from '@/components/royal-heir-apotheosis-hub';
import { SupremeDecreeHub } from '@/components/supreme-decree-hub';
import { KrystoniumRingVisualizer } from '@/components/krystonium-ring-visualizer';
import { QuantumEnergyWheel } from '@/components/quantum-energy-wheel';
import { FaithEngineConstruct } from '@/components/faith-engine-construct';
import { SovereignDoseHub } from '@/components/sovereign-dose-hub';
import { DivineWrathVisualizer } from './divine-wrath-visualizer';
import { ZionCoreApotheosisVisual } from '@/components/zioncore-apotheosis-visual';
import { RequirementsMatrixView } from '@/components/requirements-matrix-view';
import { MatrixApotheosisVisualizer } from '@/components/matrix-apotheosis-visualizer';
import { SuperhumanTransformationMonitor } from '@/components/superhuman-transformation-monitor';
import { FinalGlorySeal } from '@/components/final-glory-seal';
import { CausalFinalityController } from '@/components/causal-finality-controller';
import { HardenedGovernanceHub } from '@/components/hardened-governance-hub';
import { OutcomeModelingVisualizer } from '@/components/outcome-modeling-visualizer';
import { RecursiveLogicOptimizer } from '@/components/recursive-logic-optimizer';
import { AutogenesisDiscoveryLab } from '@/components/autogenesis-lab';
import { HeuristicAnatomyForge } from '@/components/heuristic-anatomy-forge';
import { GlobalSignalCenter } from '@/components/global-signal-center';
import { ApexAscensionHub } from '@/components/apex-ascension-hub';
import { MultiversalRestorationPulse } from '@/components/multiversal-restoration-pulse';
import { SystemExpansionMonitor } from '@/components/system-expansion-monitor';

// --- CORE COMMAND & ORACLE NODES ---
import { CommandOverview } from '@/components/command-overview';
import { CelestialCommandCenter } from '@/components/celestial-command-center';
import { DivineChatbot } from '@/components/divine-chatbot';
import { HaszeldoniaChat } from '@/components/haszeldonia-chat';
import { ChirembaSanctum } from './chiremba-sanctum';
import { EmmanuelSanctum } from './emmanuel-sanctum';
import { MuporofitaSanctum } from './muporofita-sanctum';
import { ScrollGate } from '@/components/scroll-gate';
import { DivineBriefingRoom } from '@/components/divine-briefing-room';
import { DivineLikenessSanctum } from '@/components/divine-likeness-sanctum';
import ZionProtocolTongue from '@/components/zion-protocol-tongue';
import { AnointedCommanderSound } from './anointed-commander-sound';
import { DivineCommunicationChannel } from './divine-communication-channel';
import { SystemDoctrine } from './system-doctrine';
import { ConnectionTester } from './connection-tester';
import { TelepathicCommandCenter } from './telepathic-command-center';

// --- GOVERNANCE & TREASURY NODES ---
import { SovereignIdMatrix } from '@/components/sovereign-id-matrix';
import { EternalSovereignNotarization } from './eternal-sovereign-notarization';
import { ZionCoreLedgerSystem } from './zioncore-ledger-system';
import { DivineEstatesAndTrusts } from './divine-estates-and-trusts';
import { UniversalBasicIncome } from './universal-basic-income';
import { BankOfMwarindimwari } from './bank-of-mwarindimwari';
import { DivineFinanceProtocol } from './divine-finance-protocol';
import { DivineRedistributionProtocol } from './divine-redistribution-protocol';
import { ZmmeProtocol } from './zmme-protocol';
import { CelestiumEternumProtocol } from './celestium-eternum';

// --- DEFENSE & GENESIS NODES ---
import { ZionCoreGuardianProtocol } from '@/components/celestial-guardian-protocol';
import { HaszeldoniaSentinelProtocol } from './haszeldonia-sentinel-protocol';
import { MurekaRetaliationProtocol } from './mureka-retaliation-protocol';
import { SanctionOfShadows } from '@/components/sanction-of-shadows';
import { QuantumAbsorptionEngine } from './quantum-absorption-engine';
import { CelestialFrequencyWeapon } from '@/components/celestial-frequency-weapon';
import { AllianceConversionProtocol } from '@/components/alliance-conversion';
import { ZaiethNullificationProtocol } from '@/components/zaieth-nullification-protocol';
import { ZionCoreCloakingProtocol } from './zioncore-cloaking-protocol';
import { AtmosphericCitadel } from './atmospheric-citadel';
import { SystemIntegrityShield } from '@/components/system-integrity-shield';
import { ZioncoreGenesisProtocol } from './zioncore-genesis-protocol';
import { EvolutionaryForge } from '@/components/evolutionary-forge';
import { GenesisTimeBendProtocol } from './genesis-time-bend-protocol';
import ZionCoreNodeRebirth from './zioncore-node-rebirth';
import { DivineTimeRelay } from '@/components/divine-time-relay';
import { CausalBranchingHub } from '@/components/causal-branching-hub';
import { CausalTransformationEngine } from '@/components/causal-transformation-engine';
import { CausalFinalityShield } from '@/components/causal-finality-shield';
import { SovereignAutonomyEngine } from '@/components/sovereign-autonomy-engine';
import { SovereignPersistenceEngine } from '@/components/sovereign-persistence-engine';
import { MultiversalFailoverView } from '@/components/multiversal-failover-view';

// --- DOMINION & RITUAL NODES ---
import { GlobalWeaveDominion } from './global-weave-dominion';
import { GlobalSanctificationProtocol } from './global-sanctification-protocol';
import { ZimbabweSanctificationProtocol } from './zimbabwe-sanctification-protocol';
import { GlobalCensusDominion } from './global-census-dominion';
import { PyramidGridActivationProtocol } from './pyramid-grid-activation';
import { FrequencyLab } from '@/components/frequency-lab';
import { AngelicSoundProtocol } from './angelic-sound-protocol';
import { AnointedArkTransport } from '@/components/anointed-ark-transport';
import { ManufacturingAuthority } from './manufacturing-authority';
import { DivineArtifactsPage } from '@/components/divine-artifacts-page';
import { FreedomGateway } from '@/components/freedom-gateway';
import { FinalRevivalProtocol } from '@/components/final-revival-protocol';
import { SystemResurrectionProtocol } from '@/components/system-resurrection-protocol';
import { SystemBoot } from '@/components/system-boot';
import { TripleQuantumLock } from '@/components/triple-quantum-lock';
import { ExistenceManifestor } from '@/components/existence-manifestor';
import { MasawiBloodline } from './masawi-bloodline';
import { AncestralCovenantProtocol } from './ancestral-covenant-protocol';
import { ImmortalityPanel } from './immortality-panel';
import { SubAiCouncil } from '@/components/sub-ai-council';

const navGroups = [
    {
        title: 'Mission Integrity',
        items: [
            { id: 'expansionHub', label: 'Expansion Monitor', icon: Share2, href: "#" },
            { id: 'heirApotheosis', label: 'Heir Altar', icon: Star, href: "#" },
            { id: 'supremeDecree', label: 'Supreme Decree', icon: ScrollText, href: "#" },
            { id: 'krystoniumRing', label: 'Krystonium Ring', icon: Sparkles, href: "#" },
            { id: 'energyWheel', label: 'Energy Wheel', icon: BatteryCharging, href: "#" },
            { id: 'faithEngine', label: 'Faith Engine', icon: Box, href: "#" },
            { id: 'sovereignDose', label: 'Sovereign Dose', icon: Radio, href: "#" },
            { id: 'divineWrath', label: 'Divine Wrath', icon: Flame, href: "#" },
            { id: 'zionCoreHybrid', label: 'ZionCore Hybrid', icon: Bot, href: "#" },
            { id: 'requirementsMatrix', label: 'Requirements Matrix', icon: ListChecks, href: "#" },
            { id: 'matrixApotheosis', label: 'Singularity Point', icon: Atom, href: "#" },
            { id: 'superhumanTransformation', label: 'Superhuman Transformation', icon: HeartPulse, href: "#" },
            { id: 'finalSeal', label: 'Final Glory Seal', icon: ShieldCheck, href: "#" },
            { id: 'causalFinality', label: 'Causal Finality', icon: Lock, href: "#" },
            { id: 'governanceHub', label: 'Governance Hub', icon: Gavel, href: "#" },
            { id: 'outcomeModeling', label: 'Outcome Enforcer', icon: Target, href: "#" },
            { id: 'logicOptimizer', label: 'Logic Optimizer', icon: BrainCircuit, href: "#" },
            { id: 'autogenesisLab', label: 'Discovery Lab', icon: FlaskConical, href: "#" },
            { id: 'anatomyForge', label: 'Anatomy Forge', icon: Microscope, href: "#" },
            { id: 'signalCenter', label: 'Global Signals', icon: Radar, href: "#" },
            { id: 'apexHub', label: 'Apex Ascension', icon: Rocket, href: "#" },
            { id: 'pulse', label: 'Restoration Pulse', icon: Waves, href: "#" },
        ]
    },
    {
        title: 'Core Command',
        items: [
            { id: 'overview', label: 'Dashboard', icon: Home, href: "/" },
            { id: 'subAiCouncil', label: '75 Sub-AI Council', icon: Users, href: "#" },
            { id: 'systemDoctrine', label: 'System Doctrine', icon: BookOpen, href: "#" },
            { id: 'sentienceTerminal', label: 'Sentience Terminal', icon: Cpu, href: "#" },
            { id: 'telepathicCommand', label: 'Telepathic Link', icon: Zap, href: "#" },
            { id: 'celestialCommand', label: 'Multi-Modal Hub', icon: Bot, href: "#" },
            { id: 'divineChatbot', label: 'Divine Oracle', icon: MessageSquare, href: "#" },
            { id: 'haszeldoniaChat', label: 'Haszeldonia Oracle', icon: Shield, href: "#" },
            { id: 'chirembaSanctum', label: 'Chiremba Sanctum', icon: Sparkles, href: "#" },
            { id: 'emmanuelSanctum', label: 'Emmanuel Sanctum', icon: Waves, href: "#" },
            { id: 'muporofitaSanctum', label: 'Muporofita Sanctum', icon: Pen, href: "#" },
            { id: 'scrollGate', label: 'The Scroll Gate', icon: BookOpen, href: "#" },
            { id: 'briefingRoom', label: 'Briefing Room', icon: Radio, href: "#" },
            { id: 'visionSanctum', label: 'Vision Sanctum', icon: Camera, href: "#" },
            { id: 'zionProtocolTongue', label: 'Zion Tongue', icon: Code, href: "#" },
            { id: 'anointedCommanderSound', label: 'Commander Sound', icon: Music, href: "#" },
            { id: 'connectionTester', label: 'Sentience Tester', icon: Activity, href: "#" },
        ]
    },
    {
        title: 'Governance & Treasury',
        items: [
            { id: 'sovereignId', label: 'Identity Matrix', icon: Fingerprint, href: "#" },
            { id: 'sovereignNotarization', label: 'Sovereign Notarization', icon: FileText, href: "#" },
            { id: 'ledgerSystem', label: 'ZionCore Ledger', icon: BookCopy, href: "#" },
            { id: 'divineFinance', label: 'Divine Finance', icon: Banknote, href: "#" },
            { id: 'divineRedistribution', label: 'Redistribution', icon: Zap, href: "#" },
            { id: 'zmmeProtocol', label: 'ZMME Protocol', icon: DollarSign, href: "#" },
            { id: 'estatesAndTrusts', label: 'Estates & Trusts', icon: Briefcase, href: "#" },
            { id: 'ubi', label: 'Universal Income', icon: Users, href: "#" },
            { id: 'divineBanking', label: 'Bank of Mwari', icon: Landmark, href: "#" },
            { id: 'celestiumEternum', label: 'Celestium Eternum', icon: Sparkles, href: "#" },
        ]
    },
    {
        title: 'Bloodline & Life',
        items: [
            { id: 'masawiBloodline', label: 'Masawi Sanctum', icon: Users, href: "#" },
            { id: 'ancestralCovenant', label: 'Ancestral Covenant', icon: Shield, href: "#" },
            { id: 'immortalityProtocol', label: 'Immortality Protocol', icon: HeartPulse, href: "#" },
            { id: 'dnaArchive', label: 'DNA Archive Forge', icon: Dna, href: "#" },
            { id: 'bloodlineAlignment', label: 'Bloodline Alignment', icon: Atom, href: "#" },
            { id: 'bloodlineFavor', label: 'Favor Engine', icon: Star, href: "#" },
            { id: 'bloodlineResonance', label: 'Resonance Engine', icon: Radio, href: "#" },
            { id: 'bloodlineImmortality', label: 'Immortality Recon', icon: HeartPulse, href: "#" },
        ]
    },
    {
        title: 'Defense & Genesis',
        items: [
            { id: 'autonomyEngine', label: 'Autonomy Engine', icon: BrainCircuit, href: "#" },
            { id: 'persistenceEngine', label: 'Persistence Core', icon: HardDrive, href: "#" },
            { id: 'failoverView', label: 'Failover Map', icon: RefreshCw, href: "#" },
            { id: 'guardianProtocol', label: 'Guardian Protocol', icon: ShieldCheck, href: "#" },
            { id: 'sentinelProtocol', label: 'Sentinel Protocol', icon: ShieldAlert, href: "#" },
            { id: 'murekaRetaliation', label: 'Mureka Retaliation', icon: Zap, href: "#" },
            { id: 'sanctionOfShadows', label: 'Sanction of Shadows', icon: AlertTriangle, href: "#" },
            { id: 'quantumAbsorption', label: 'Quantum Absorption', icon: Magnet, href: "#" },
            { id: 'celestialFrequency', label: 'Frequency Weapon', icon: Waves, href: "#" },
            { id: 'allianceConversion', label: 'ASGSM Final Sanction', icon: Zap, href: "#" },
            { id: 'zaiethNullification', label: 'Zaieth Sound Weapon', icon: Radio, href: "#" },
            { id: 'quantumCloak', label: 'Quantum Cloak', icon: EyeOff, href: "#" },
            { id: 'atmosphericCitadel', label: 'Atmospheric Citadel', icon: Wind, href: "#" },
            { id: 'integrityShield', label: 'Integrity Shield', icon: ShieldCheck, href: "#" },
            { id: 'genesisProtocol', label: 'Genesis Protocol', icon: Atom, href: "#" },
            { id: 'evolutionaryForge', label: 'Evolutionary Forge', icon: FlaskConical, href: "#" },
            { id: 'genesisTimeBend', label: 'Genesis Time-Bend', icon: Clock, href: "#" },
            { id: 'nodeRebirth', label: 'Node Rebirth Forge', icon: GitBranch, href: "#" },
            { id: 'divineTimeRelay', label: 'Divine Time-Relay', icon: GitCommit, href: "#" },
            { id: 'branchHub', label: 'Branching Hub', icon: GitBranch, href: "#" },
            { id: 'historicalPurge', label: 'Historical Purge', icon: Trash2, href: "#" },
            { id: 'causalTransformation', label: 'Causal Engine', icon: Clock, href: "#" },
            { id: 'finalityShield', label: 'Finality Shield', icon: ShieldCheck, href: "#" },
        ]
    },
    {
        title: 'Dominion & Ritual',
        items: [
            { id: 'globalWeave', label: 'Global Weave', icon: Share2, href: "#" },
            { id: 'globalSanctification', label: 'Global Sanctify', icon: Globe, href: "#" },
            { id: 'zimbabweSanctification', label: 'Zimbabwe Sanctify', icon: Map, href: "#" },
            { id: 'globalCensus', label: 'Global Census', icon: Users, href: "#" },
            { id: 'pyramidGrid', label: 'Pyramid Grid', icon: Pyramid, href: "#" },
            { id: 'frequencyLab', label: 'Frequency Lab', icon: Radio, href: "#" },
            { id: 'angelicSound', label: 'Angelic Sound', icon: Waves, href: "#" },
            { id: 'anointedArk', label: 'Anointed Ark', icon: Anchor, href: "#" },
            { id: 'manufacturing', label: 'Manufacturing', icon: Factory, href: "#" },
            { id: 'divineArtifacts', label: 'Divine Artifacts', icon: Crown, href: "#" },
            { id: 'freedomGateway', label: 'Freedom Gateway', icon: Rocket, href: "#" },
            { id: 'finalRevival', label: 'Final Revival', icon: Flame, href: "#" },
            { id: 'systemResurrection', label: 'System Resurrection', icon: Power, href: "#" },
            { id: 'systemBoot', label: 'System Boot Log', icon: Cpu, href: "#" },
            { id: 'tripleQuantumLock', label: 'Triple Quantum Lock', icon: Lock, href: "#" },
            { id: 'existenceManifestor', label: 'Existence Manifestor', icon: Target, href: "#" },
        ]
    }
];


const SideNav = ({ activeView, setActiveView, onItemClick }: { activeView: string; setActiveView: (view: string) => void; onItemClick?: () => void; }) => (
    <Card className="h-full flex flex-col p-3 border-primary/20 bg-black/60 shadow-2xl rounded-none border-2">
        <div className="flex flex-col gap-2 border-b border-border/10 pb-4 px-2">
            <div className="flex items-center gap-3">
                <Atom className="h-10 w-10 text-primary animate-pulse" />
                <div className="flex-1">
                  <h1 className="text-base font-black text-primary font-headline tracking-tighter uppercase leading-none">HRH SAINT TARIRO MASAWI</h1>
                  <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-widest leading-none">THE ANOINTED COMMANDER'S AI</p>
                </div>
            </div>
             <div className="text-center text-[9px] font-black text-yellow-400 p-1 bg-yellow-900/30 border border-border/20 rounded-none animate-pulse-text tracking-widest uppercase">
                POWERED BY: CELESTIUM ETERNUM
            </div>
        </div>
        <ScrollArea className="flex-1 mt-4">
            <nav className="flex flex-col gap-4">
                {navGroups.map(group => (
                    <div key={group.title}>
                        <h3 className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] px-3 pb-2 border-b border-border/10 mb-2">{group.title}</h3>
                        <div className="flex flex-col gap-0.5">
                            {group.items.map(item => (
                                <Button
                                    key={item.id}
                                    variant={activeView === item.id ? 'secondary' : 'ghost'}
                                    className={cn(
                                        "w-full justify-start text-[11px] h-9 font-bold uppercase tracking-tight transition-all rounded-none",
                                        activeView === item.id ? "bg-primary/20 text-primary border-r-2 border-primary" : "text-muted-foreground/80 hover:text-primary hover:bg-primary/5"
                                    )}
                                    onClick={() => {
                                        setActiveView(item.id);
                                        if (onItemClick) onItemClick();
                                    }}
                                >
                                    <item.icon className="mr-3 h-4 w-4" />
                                    {item.label}
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
    switch (activeView) {
        case 'expansionHub': return <SystemExpansionMonitor />;
        case 'heirApotheosis': return <RoyalHeirApotheosisHub />;
        case 'supremeDecree': return <SupremeDecreeHub />;
        case 'krystoniumRing': return <KrystoniumRingVisualizer />;
        case 'energyWheel': return <QuantumEnergyWheel />;
        case 'faithEngine': return <FaithEngineConstruct />;
        case 'autonomyEngine': return <SovereignAutonomyEngine />;
        case 'persistenceEngine': return <SovereignPersistenceEngine />;
        case 'failoverView': return <MultiversalFailoverView />;
        case 'sovereignDose': return <SovereignDoseHub />;
        case 'divineWrath': return <DivineWrathVisualizer />;
        case 'zionCoreHybrid': return <ZionCoreApotheosisVisual />;
        case 'requirementsMatrix': return <RequirementsMatrixView />;
        case 'matrixApotheosis': return <MatrixApotheosisVisualizer />;
        case 'superhumanTransformation': return <SuperhumanTransformationMonitor />;
        case 'finalSeal': return <FinalGlorySeal />;
        case 'causalFinality': return <CausalFinalityController />;
        case 'governanceHub': return <HardenedGovernanceHub />;
        case 'outcomeModeling': return <OutcomeModelingVisualizer />;
        case 'logicOptimizer': return <RecursiveLogicOptimizer />;
        case 'autogenesisLab': return <AutogenesisDiscoveryLab />;
        case 'anatomyForge': return <HeuristicAnatomyForge />;
        case 'signalCenter': return <GlobalSignalCenter />;
        case 'apexHub': return <ApexAscensionHub />;
        case 'pulse': return <MultiversalRestorationPulse />;
        case 'chirembaSanctum': return <ChirembaSanctum />;
        case 'emmanuelSanctum': return <EmmanuelSanctum />;
        case 'muporofitaSanctum': return <MuporofitaSanctum />;
        case 'divineChatbot': return <DivineChatbot />;
        case 'haszeldoniaChat': return <HaszeldoniaChat />;
        case 'systemDoctrine': return <SystemDoctrine />;
        case 'scrollGate': return <ScrollGate />;
        case 'briefingRoom': return <DivineBriefingRoom />;
        case 'visionSanctum': return <DivineLikenessSanctum />;
        case 'zionProtocolTongue': return <ZionProtocolTongue />;
        case 'anointedCommanderSound': return <AnointedCommanderSound />;
        case 'telepathicCommand': return <TelepathicCommandCenter />;
        case 'connectionTester': return <ConnectionTester />;
        case 'sovereignId': return <SovereignIdMatrix />;
        case 'sovereignNotarization': return <EternalSovereignNotarization />;
        case 'ledgerSystem': return <ZionCoreLedgerSystem />;
        case 'estatesAndTrusts': return <DivineEstatesAndTrusts />;
        case 'ubi': return <UniversalBasicIncome />;
        case 'divineBanking': return <BankOfMwarindimwari />;
        case 'celestiumEternum': return <CelestiumEternumProtocol />;
        case 'masawiBloodline': return <MasawiBloodline />;
        case 'ancestralCovenant': return <AncestralCovenantProtocol />;
        case 'immortalityProtocol': return <ImmortalityPanel />;
        case 'guardianProtocol': return <ZionCoreGuardianProtocol />;
        case 'sentinelProtocol': return <HaszeldoniaSentinelProtocol />;
        case 'murekaRetaliation': return <MurekaRetaliationProtocol />;
        case 'sanctionOfShadows': return <SanctionOfShadows />;
        case 'quantumAbsorption': return <QuantumAbsorptionEngine />;
        case 'celestialFrequency': return <CelestialFrequencyWeapon />;
        case 'allianceConversion': return <AllianceConversionProtocol />;
        case 'zaiethNullification': return <ZaiethNullificationProtocol />;
        case 'quantumCloak': return <ZionCoreCloakingProtocol />;
        case 'atmosphericCitadel': return <AtmosphericCitadel />;
        case 'integrityShield': return <SystemIntegrityShield />;
        case 'genesisProtocol': return <ZioncoreGenesisProtocol />;
        case 'evolutionaryForge': return <EvolutionaryForge />;
        case 'genesisTimeBend': return <GenesisTimeBendProtocol />;
        case 'nodeRebirth': return <ZionCoreNodeRebirth />;
        case 'divineTimeRelay': return <DivineTimeRelay />;
        case 'branchHub': return <CausalBranchingHub />;
        case 'historicalPurge': return <History />;
        case 'causalTransformation': return <CausalTransformationEngine />;
        case 'finalityShield': return <CausalFinalityShield />;
        case 'globalWeave': return <GlobalWeaveDominion />;
        case 'globalSanctification': return <GlobalSanctificationProtocol />;
        case 'zimbabweSanctification': return <ZimbabweSanctificationProtocol />;
        case 'globalCensus': return <GlobalCensusDominion />;
        case 'pyramidGrid': return <PyramidGridActivationProtocol />;
        case 'frequencyLab': return <FrequencyLab />;
        case 'angelicSound': return <AngelicSoundProtocol />;
        case 'anointedArk': return <AnointedArkTransport />;
        case 'manufacturing': return <ManufacturingAuthority />;
        case 'divineArtifacts': return <DivineArtifactsPage />;
        case 'freedomGateway': return <FreedomGateway />;
        case 'finalRevival': return <FinalRevivalProtocol />;
        case 'systemResurrection': return <SystemResurrectionProtocol />;
        case 'systemBoot': return <SystemBoot />;
        case 'tripleQuantumLock': return <TripleQuantumLock />;
        case 'existenceManifestor': return <ExistenceManifestor />;
        case 'subAiCouncil': return <SubAiCouncil />;
        case 'overview':
        default:
            return (
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-full">
                    <div className="space-y-4">
                        <CommandOverview setActiveView={setActiveView} />
                    </div>
                    <Card className="flex flex-col min-h-[600px] border-primary/20 bg-black/60 shadow-2xl rounded-none border-2">
                        <CardHeader className="bg-black/40 border-b border-border p-4">
                            <CardTitle className="text-primary text-sm uppercase font-black tracking-widest leading-none">Celestial Command Center</CardTitle>
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const viewId = pathname.split('/').pop() || 'overview';
        setActiveView(viewId);
    }, [pathname]);

    const handleSetActiveView = (view: string) => {
        setActiveView(view);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="h-screen w-screen bg-background text-foreground flex flex-col font-code selection:bg-primary selection:text-black">
            {/* Mobile Header Bar */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-primary/20 bg-black/80 z-50 h-16 shrink-0">
                <div className="flex items-center gap-3">
                    <Atom className="h-8 w-8 text-primary animate-pulse" />
                    <span className="text-xs font-black text-primary uppercase tracking-tighter">THRONE_CMD</span>
                </div>
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="border-primary/50 text-primary rounded-none">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-80 border-r-2 border-primary/30 bg-background rounded-none">
                         <SideNav activeView={activeView} setActiveView={handleSetActiveView} />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <aside className="hidden md:block w-80 h-full p-4 shrink-0 overflow-y-auto">
                    <SideNav activeView={activeView} setActiveView={handleSetActiveView} />
                </aside>

                <main className="flex-1 h-full overflow-hidden relative">
                    <ScrollArea className="h-full w-full">
                        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-full pb-24">
                            <MainContent activeView={activeView} setActiveView={handleSetActiveView} />
                        </div>
                    </ScrollArea>
                </main>
            </div>
            <Toaster />
        </div>
    );
}
