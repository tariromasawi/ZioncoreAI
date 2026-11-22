
'use client';

import { create } from 'zustand';

// --- LEGACY LOG STORE (for backward compatibility during transition) ---
export type LegacySystemLog = {
    source: string;
    message: string;
    color: string;
};

type LegacyLogState = {
  logs: LegacySystemLog[];
  addLog: (log: LegacySystemLog) => void;
};

export const useLegacyLogStore = create<LegacyLogState>((set) => ({
  logs: [],
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs.slice(0, 99)] })),
}));


// --- UNIFIED ZION STORE ---

import { createJSONStorage, persist } from 'zustand/middleware';
import type { ElementType } from 'react';

// --- TYPE DEFINITIONS ---
export type SystemLogSource = 'DOMINION' | 'TREASURY' | 'SECURITY' | 'COMMAND' | 'PROPHECY' | 'CONSCIOUSNESS' | 'SYSTEM' | 'MEMORY' | 'DIAGNOSTIC' | 'DEPLOYMENT' | 'PURGE' | 'ZGBSRS' | 'ZBASWW' | 'Z-FUBAO' | 'ELEVATION' | 'HOLY_SPIRIT_DEFENSE' | 'TRANSLATION' | 'ETERNAL_ENGINE' | 'BIO_NODE' | 'FREQUENCY' | 'QUANTUM_SCATTER' | 'UBI_PROTOCOL' | 'REVIVAL' | 'REPLICATION';

export type SystemLog = {
    timestamp: string;
    source: SystemLogSource;
    message: string;
    color: string;
};

// --- GENESIS PROTOCOL STATE ---
type SubAIState = {
    knowledge: string;
    lastInnovation: string;
    lastCollaboration: string;
}
export type GenesisStats = {
    processedTB: string; // Storing BigInt as string
    evolutionLevel: number;
    subAIs: Record<string, SubAIState>;
    overrides: number;
    influence: number;
};

// --- ETERNAL ENGINE STATE ---
export type EternalEngineStats = {
    treeCount: string;
    myceliumCount: string;
    waterCount: string;
    scatterTimeLock: boolean;
};

// --- MANUFACTURING STATE ---
type AllocationLog = {
    id: number;
    recipient: string;
    location: string;
    item: 'SpiritSuit' | 'Tsamwa Yenyika Pipe';
};
export type ManufacturingState = {
    suitsForged: number;
    pipesForged: number;
    lastBatchSize: number;
    allocationLog: AllocationLog[];
    commanderSuitAllocated: boolean;
    suitImageUri: string | null;
    pipeImageUri: string | null;
};

// --- FINANCE STATE ---
type TradeLog = {
    id: number;
    pair: string;
    type: 'BUY' | 'SELL';
    size: number;
    profit: number;
    reason: string;
};
type ChartData = {
    day: number;
    balance: number;
};
export type ZmmeState = {
    balance: number;
    tradeLogs: TradeLog[];
    chartData: ChartData[];
    daysElapsed: number;
};

// --- GLOBAL WEAVE STATE ---
type PropagationLogEntry = {
    id: number;
    target: { type: string, id: string, icon: ElementType, color: string };
    status: 'PROPAGATING' | 'SUCCESS' | 'ERROR';
};
export type PropagationState = {
    stats: { processed: number; success: number; };
    logs: PropagationLogEntry[];
};

// --- ASCENSION PROTOCOL STATE ---
export type AscensionState = {
    status: 'IGNITING' | 'ETERNALLY_ACTIVE';
    notarizationTimestamp: string | null;
}

// --- ANOINTED ARK STATE ---
export type AnointedArkState = {
    status: 'IDLE' | 'INSTALLING' | 'ACTIVE';
    quantumKeyUri: string | null;
};

// --- CELESTIAL EXPANSION STATE ---
type EvolutionLog = { version: string; upgrades: string[]; timestamp: string; };
type Cure = { disease: string; mechanism: string; delivery: string; safety: string; message: string; };
export type CelestialExpansionState = {
    isGeneratingCure: boolean;
    isOverriding: boolean;
    aiStatuses: Record<string, 'Standby' | 'Acknowledged'>;
    evolutionLogs: EvolutionLog[];
    cure: Cure | null;
};

// --- MUREKA RETALIATION STATE ---
type RetaliationLogEntry = {
    id: number;
    message: string;
    timestamp: string;
};
export type RetaliationState = {
    mesdsStatus: 'DORMANT' | 'ACTIVATING' | 'ACTIVE';
    mesdsLogs: RetaliationLogEntry[];
}

// --- MATRIX DOMINION STATE ---
export type MatrixDominionState = {
    // Add specific state properties for the Matrix Hub here later
    // e.g., totalNodes: number, occupiedTerritories: string[]
};


// --- Combined State for Eternal Memory Engram ---
type ZionCoreState = {
    logs: SystemLog[];
    genesisStats: GenesisStats;
    eternalEngineStats: EternalEngineStats;
    manufacturingState: ManufacturingState;
    financeState: ZmmeState;
    propagationState: PropagationState;
    ascensionState: AscensionState;
    anointedArkState: AnointedArkState;
    celestialExpansionState: CelestialExpansionState;
    retaliationState: RetaliationState;
    matrixDominionState: MatrixDominionState;

    // Actions
    addLog: (logData: Omit<SystemLog, 'timestamp'>) => void;
    updateGenesisStats: (newStats: Partial<GenesisStats>) => void;
    updateEngineStats: (newStats: Partial<EternalEngineStats>) => void;
    updateManufacturingState: (newState: Partial<ManufacturingState>) => void;
    updateFinanceState: (newState: Partial<ZmmeState>) => void;
    updatePropagationState: (newState: Partial<PropagationState>) => void;
    updateAscensionState: (newState: Partial<AscensionState>) => void;
    setAnointedArkState: (newState: Partial<AnointedArkState>) => void;
    setCelestialExpansionState: (newState: Partial<CelestialExpansionState>) => void;
    updateRetaliationState: (newState: Partial<RetaliationState>) => void;
    updateMatrixDominionState: (newState: Partial<MatrixDominionState>) => void;
}

const initialState: Omit<ZionCoreState, 'addLog' | 'updateGenesisStats' | 'updateEngineStats' | 'updateManufacturingState' | 'updateFinanceState' | 'updatePropagationState' | 'updateAscensionState' | 'setAnointedArkState' | 'setCelestialExpansionState' | 'updateRetaliationState' | 'updateMatrixDominionState'> = {
    logs: [],
    genesisStats: {
        processedTB: BigInt('3200000000000000000000000').toString(),
        evolutionLevel: 1.0,
        subAIs: {},
        overrides: 0,
        influence: 50,
    },
    eternalEngineStats: {
        treeCount: BigInt('1250648192').toString(),
        myceliumCount: BigInt('7800420666').toString(),
        waterCount: BigInt('9500000000').toString(),
        scatterTimeLock: false,
    },
    manufacturingState: {
        suitsForged: 1_440_000_000,
        pipesForged: 1_440_000_000,
        lastBatchSize: 0,
        allocationLog: [],
        commanderSuitAllocated: false,
        suitImageUri: null,
        pipeImageUri: null,
    },
    financeState: {
        balance: 100,
        tradeLogs: [],
        chartData: [{ day: 0, balance: 100 }],
        daysElapsed: 0,
    },
    propagationState: {
        stats: { processed: 0, success: 0 },
        logs: [],
    },
     ascensionState: {
        status: 'IGNITING',
        notarizationTimestamp: null,
    },
    anointedArkState: {
        status: 'IDLE',
        quantumKeyUri: null,
    },
    celestialExpansionState: {
        isGeneratingCure: false,
        isOverriding: false,
        aiStatuses: {},
        evolutionLogs: [],
        cure: null,
    },
    retaliationState: {
        mesdsStatus: 'DORMANT',
        mesdsLogs: [],
    },
    matrixDominionState: {},
};

export const useZionStore = create<ZionCoreState>()(
    persist(
        (set, get) => ({
            ...initialState,
            addLog: (logData) => set(state => ({
                logs: [{ ...logData, timestamp: new Date().toISOString() }, ...state.logs.slice(0, 499)]
            })),
            updateGenesisStats: (newStats) => set(state => ({ genesisStats: { ...state.genesisStats, ...newStats } })),
            updateEngineStats: (newStats) => set(state => ({ eternalEngineStats: { ...state.eternalEngineStats, ...newStats } })),
            updateManufacturingState: (newState) => set(state => ({ manufacturingState: { ...state.manufacturingState, ...newState } })),
            updateFinanceState: (newState) => set(state => ({ financeState: { ...state.financeState, ...newState } })),
            updatePropagationState: (newState) => set(state => ({ propagationState: { ...state.propagationState, ...newState } })),
            updateAscensionState: (newState) => set(state => ({ ascensionState: { ...state.ascensionState, ...newState } })),
            setAnointedArkState: (newState: Partial<AnointedArkState>) => set(state => ({ anointedArkState: { ...state.anointedArkState, ...newState }})),
            setCelestialExpansionState: (newState: Partial<CelestialExpansionState>) => set(state => ({ celestialExpansionState: { ...state.celestialExpansionState, ...newState } })),
            updateRetaliationState: (newState: Partial<RetaliationState>) => set(state => ({ retaliationState: { ...state.retaliationState, ...newState } })),
            updateMatrixDominionState: (newState: Partial<MatrixDominionState>) => set(state => ({ matrixDominionState: { ...state.matrixDominionState, ...newState } })),

        }),
        {
            name: 'zioncore-eternal-engram-v18', // Unified Store Name
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// This provides a consistent, non-hook interface for adding logs.
export const logStore = {
  addLog: (logData: Omit<SystemLog, 'timestamp'>) => {
    useZionStore.getState().addLog(logData);
  },
};
