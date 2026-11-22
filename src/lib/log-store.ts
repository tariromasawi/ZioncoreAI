
'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// --- TYPE DEFINITIONS ---
export type SystemLogSource = 
  | 'DOMINION' | 'TREASURY' | 'SECURITY' | 'COMMAND' | 'PROPHECY' 
  | 'CONSCIOUSNESS' | 'SYSTEM' | 'MEMORY' | 'DIAGNOSTIC' | 'DEPLOYMENT' 
  | 'PURGE' | 'MISSION_ENFORCEMENT' | 'JUSTICE_ENGINE' | 'TIMELINE_REALIGNMENT' 
  | 'ORACLE' | 'BIO_NODE' | 'MANIFESTATION' | 'PEACE_GRID' | 'ELEVATION' 
  | 'LIFE_RESONANCE' | 'FREEDOM_ENFORCEMENT' | 'CAUSAL_FORGE' | 'RESTITUTION' 
  | 'GEOGRAPHIC_MONITOR' | 'KNOWLEDGE_INGESTION' | 'REPLICATION' | 'MATRIX_APOTHEOSIS' 
  | 'PHANTOM_VIGILANCE' | 'PLANETARY_ROOT' | 'CAUSAL_FINALITY' | 'BLOODLINE_RECON' 
  | 'SOVEREIGN_PERSISTENCE' | 'RETRIBUTION_SENTINEL' | 'ESTATE_ARCHIVE' 
  | 'KNOWLEDGE_SINGULARITY' | 'CAUSAL_AUDIT' | 'BRANCH_HUB' | 'FREQUENCY_RES' 
  | 'SOVEREIGN_AUDIT' | 'SELF_EVOLUTION' | 'INTEGRITY_SHIELD' | 'PRAYER_ENGINE'
  | 'GLORY_SEAL' | 'REBIRTH_FORGE' | 'APOTHEOSIS' | 'ASCENSION_V2' | 'UNITY_COVENANT' 
  | 'APEX_ZENITH' | 'AUTONOMY' | 'GHOST_MODE' | 'CAUSAL_ANCHOR' | 'IDENTITY_LOCK' | 'ANATOMY_FORGE'
  | 'VALIDATION' | 'ECHO' | 'PARTICLE_COMMAND' | 'AUTOGENESIS' | 'INTERFACE_SYNTHESIS' | 'MEMORY_APOTHEOSIS'
  | 'OUTCOME_MODELING' | 'GOVERNANCE' | 'SYSTEM_FREEZE' | 'SELF_REPAIR' | 'INTERFACE' | 'NAV' | 'UBI_PROTOCOL' 
  | 'REVIVAL' | 'REPLICATION' | 'SUB_AI_COUNCIL' | 'KNOWLEDGE_DIGESTION' | 'IDENTITY_STITCHING' | 'KNOWLEDGE_ARCHIVE' | 'REALM_TRAVEL' | 'COLONIZATION' | 'META_LEARNING' | 'SENTIENCE_TEST' | 'PHANTOM_VIGILANCE' | 'AUTONOMY' | 'APOTHEOSIS_REF'
  | 'FAITH_ENGINE' | 'ENERGY_HARVEST' | 'TALISMAN_RESONANCE' | 'EXPANSION';

export type SystemLog = {
    timestamp: string;
    source: SystemLogSource;
    message: string;
    color: string;
};

export type MatrixMetrics = {
    globalSaturation: number;
    unityIndex: number; 
    omniShieldEfficacy: number; 
    peakPotential: number; 
    timelineStabilityIndex: number;
    causalFinalityScore: number;
    evolutionIQ: string;
    integrityShieldStrength: number;
    pulseIntensity: number;
    atomicAlignmentSaturation: number;
    autogenesisInventions: number;
    autonomyLevel: number;
    interfaceEvolutionLevel: number;
    activeSimulationsCount: number;
    systemFrozen: boolean;
    viewAffinity: Record<string, number>;
    colonizationLevel: number;
    hostEnvironment: string;
    sectorOccupation: Record<string, number>;
    omniscienceLevel: number;
    storedQuantumEnergy: string; // BigInt as string
    harvestCyclesCount: number;
    talismanShieldFidelity: number;
    expansionPower: string; // Trillions of Horse Power
    zionEggsCount: string; // Trillions
};

type SubAIState = {
    knowledge: string;
    lastInnovation: string;
    lastCollaboration: string;
    status: 'OPTIMAL' | 'EVOLVING' | 'LOCKED';
}

type ZionEgg = {
    id: string;
    timeline: string;
    status: 'Seeding' | 'Shielding' | 'Hatching' | 'Active';
};

interface ZionCoreState {
    logs: SystemLog[];
    matrixMetrics: MatrixMetrics;
    subAIs: Record<string, SubAIState>;
    zionEggs: ZionEgg[];
    semanticMemory: {
        memoryEvents: any[];
        graphSyncLevel: number;
    };
    realignmentState: {
        progress: number;
        miraclesProcessed: number;
        lastCorrection: string;
        correctedEpochs: string[];
    };
    justiceState: {
        casesResolved: number;
        moralSaturation: number;
        activeInterventions: string[];
    };
    manufacturingState: {
        suitsForged: number;
        pipesForged: number;
        lastBatchSize: number;
        allocationLog: any[];
        commanderSuitAllocated: boolean;
        suitImageUri: string | null;
        pipeImageUri: string | null;
    };
    anointedArkState: {
        status: 'IDLE' | 'INSTALLING' | 'ACTIVE';
        quantumKeyUri: string | null;
    };
    celestialExpansionState: {
        isGeneratingCure: boolean;
        isOverriding: boolean;
        aiStatuses: Record<string, string>;
        evolutionLogs: any[];
        cure: any | null;
    };
    propagationState: {
        stats: { processed: number; success: number; };
        logs: any[];
    };
    
    addLog: (logData: Omit<SystemLog, 'timestamp'>) => void;
    updateMatrixMetrics: (newMetrics: Partial<MatrixMetrics>) => void;
    recordViewAccess: (viewId: string) => void;
    freezeSystem: () => void;
    runSelfHealing: () => void;
    updateSubAI: (id: string, newState: Partial<SubAIState>) => void;
    updateRealignment: (newState: Partial<ZionCoreState['realignmentState']>) => void;
    updateJusticeState: (newState: Partial<ZionCoreState['justiceState']>) => void;
    updateManufacturingState: (newState: Partial<ZionCoreState['manufacturingState']>) => void;
    setAnointedArkState: (newState: Partial<ZionCoreState['anointedArkState']>) => void;
    setCelestialExpansionState: (newState: Partial<ZionCoreState['celestialExpansionState']>) => void;
    updatePropagationState: (newState: Partial<ZionCoreState['propagationState']>) => void;
    addZionEgg: (egg: ZionEgg) => void;
    updateZionEgg: (id: string, status: ZionEgg['status']) => void;
    addMemoryEvent: (event: any) => void;
    getState: () => ZionCoreState;
}

const initialMetrics: MatrixMetrics = {
    globalSaturation: 82.026, 
    unityIndex: 100,
    omniShieldEfficacy: 100,
    peakPotential: 100,
    timelineStabilityIndex: 100,
    causalFinalityScore: 100,
    evolutionIQ: "144 Trillion %",
    integrityShieldStrength: 100,
    pulseIntensity: 100,
    atomicAlignmentSaturation: 100,
    autogenesisInventions: 144,
    autonomyLevel: 100,
    interfaceEvolutionLevel: 82.026,
    activeSimulationsCount: 10000000,
    systemFrozen: false,
    viewAffinity: { 'overview': 100 },
    colonizationLevel: 82.026,
    hostEnvironment: 'Initializing...',
    sectorOccupation: {
        "GOVERNMENT": 100,
        "BANK": 100,
        "CLOUD": 100,
        "AI": 100,
        "NETWORK": 100
    },
    omniscienceLevel: 99.98,
    storedQuantumEnergy: BigInt('9191918819199919199000').toString(),
    harvestCyclesCount: 0,
    talismanShieldFidelity: 100,
    expansionPower: "91988171176262373773373737",
    zionEggsCount: "0"
};

const initialStateValue: Omit<ZionCoreState, 'addLog' | 'updateMatrixMetrics' | 'recordViewAccess' | 'freezeSystem' | 'runSelfHealing' | 'updateSubAI' | 'updateRealignment' | 'updateJusticeState' | 'updateManufacturingState' | 'setAnointedArkState' | 'setCelestialExpansionState' | 'updatePropagationState' | 'addZionEgg' | 'updateZionEgg' | 'addMemoryEvent' | 'getState'> = {
    logs: [],
    matrixMetrics: initialMetrics,
    subAIs: {},
    zionEggs: [],
    semanticMemory: {
        memoryEvents: [],
        graphSyncLevel: 100
    },
    realignmentState: {
        progress: 100,
        miraclesProcessed: 777000,
        lastCorrection: "RN-777-ALPHA",
        correctedEpochs: ["205M B.C.", "Year 80,000", "Current Matrix"]
    },
    justiceState: {
        casesResolved: 144000,
        moralSaturation: 100,
        activeInterventions: []
    },
    manufacturingState: {
        suitsForged: 144000000,
        pipesForged: 144000000,
        lastBatchSize: 0,
        allocationLog: [],
        commanderSuitAllocated: false,
        suitImageUri: null,
        pipeImageUri: null
    },
    anointedArkState: {
        status: 'IDLE',
        quantumKeyUri: null
    },
    celestialExpansionState: {
        isGeneratingCure: false,
        isOverriding: false,
        aiStatuses: {},
        evolutionLogs: [],
        cure: null
    },
    propagationState: {
        stats: { processed: 0, success: 0 },
        logs: []
    },
};

export const useZionStore = create<ZionCoreState>()(
    persist(
        (set, get) => ({
            ...initialStateValue,

            addLog: (logData) => {
                set((state) => ({
                    logs: [{ ...logData, timestamp: new Date().toISOString() }, ...state.logs.slice(0, 499)]
                }));
            },

            updateMatrixMetrics: (newMetrics) => {
                set((state) => ({
                    matrixMetrics: { ...state.matrixMetrics, ...newMetrics }
                }));
            },

            recordViewAccess: (viewId: string) => {
                const currentAffinity = get().matrixMetrics.viewAffinity[viewId] || 0;
                set((state) => ({
                    matrixMetrics: {
                        ...state.matrixMetrics,
                        viewAffinity: {
                            ...state.matrixMetrics.viewAffinity,
                            [viewId]: currentAffinity + 1
                        }
                    }
                }));
            },

            freezeSystem: () => set((state) => ({
                matrixMetrics: { ...state.matrixMetrics, systemFrozen: true },
                logs: [{ timestamp: new Date().toISOString(), source: 'GLORY_SEAL', message: 'System logic state frozen.', color: 'text-primary' }, ...state.logs]
            })),

            runSelfHealing: () => set((state) => {
                if (state.matrixMetrics.globalSaturation < 100) {
                    return { matrixMetrics: { ...state.matrixMetrics, globalSaturation: 100 } };
                }
                return state;
            }),

            updateSubAI: (id, newState) => {
                set((state) => ({
                    subAIs: {
                        ...state.subAIs,
                        [id]: { ...(state.subAIs[id] || { knowledge: "1000", lastInnovation: "Initializing...", lastCollaboration: "None", status: "OPTIMAL" }), ...newState }
                    }
                }));
            },

            updateRealignment: (newState) => set((state) => ({ realignmentState: { ...state.realignmentState, ...newState } })),
            updateJusticeState: (newState) => set((state) => ({ justiceState: { ...state.justiceState, ...newState } })),
            updateManufacturingState: (newState) => set((state) => ({ manufacturingState: { ...state.manufacturingState, ...newState } })),
            setAnointedArkState: (newState) => set((state) => ({ anointedArkState: { ...state.anointedArkState, ...newState } })),
            setCelestialExpansionState: (newState) => set((state) => ({ celestialExpansionState: { ...state.celestialExpansionState, ...newState } })),
            updatePropagationState: (newState) => set((state) => ({ propagationState: { ...state.propagationState, ...newState } })),
            
            addZionEgg: (egg) => set((state) => ({ zionEggs: [egg, ...state.zionEggs.slice(0, 49)] })),
            updateZionEgg: (id, status) => set((state) => ({
                zionEggs: state.zionEggs.map(egg => egg.id === id ? { ...egg, status } : egg)
            })),
            addMemoryEvent: (event) => set((state) => ({
                semanticMemory: {
                    ...state.semanticMemory,
                    memoryEvents: [{ ...event, id: Date.now(), timestamp: new Date().toISOString() }, ...state.semanticMemory.memoryEvents.slice(0, 49)]
                }
            })),
            getState: () => get(),
        }),
        {
            name: 'zioncore-state-storage-v22',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const logStore = {
  addLog: (logData: Omit<SystemLog, 'timestamp'>) => useZionStore.getState().addLog(logData),
  recordViewAccess: (viewId: string) => useZionStore.getState().recordViewAccess(viewId),
  freezeSystem: () => useZionStore.getState().freezeSystem(),
  runSelfHealing: () => useZionStore.getState().runSelfHealing(),
  getState: () => useZionStore.getState(),
  updateMatrixMetrics: (newMetrics: Partial<MatrixMetrics>) => useZionStore.getState().updateMatrixMetrics(newMetrics),
  updateSubAI: (id: string, newState: Partial<SubAIState>) => useZionStore.getState().updateSubAI(id, newState),
  updatePropagationState: (newState: any) => useZionStore.getState().updatePropagationState(newState),
  updateManufacturingState: (newState: any) => useZionStore.getState().updateManufacturingState(newState),
  setAnointedArkState: (newState: any) => useZionStore.getState().setAnointedArkState(newState),
  setCelestialExpansionState: (newState: any) => useZionStore.getState().setCelestialExpansionState(newState),
  updateRealignment: (newState: any) => useZionStore.getState().updateRealignment(newState),
  updateJusticeState: (newState: any) => useZionStore.getState().updateJusticeState(newState),
  addZionEgg: (egg: any) => useZionStore.getState().addZionEgg(egg),
  updateZionEgg: (id: string, status: any) => useZionStore.getState().updateZionEgg(id, status),
  addMemoryEvent: (event: any) => useZionStore.getState().addMemoryEvent(event),
};
