'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Zap, Shield, GitCommit } from 'lucide-react';

const NODE_COUNT = 30;
const CONNECTION_COUNT = 25;

const NODE_TYPES = [
    { type: 'vulnerable', color: 'bg-destructive', icon: Zap },
    { type: 'dark_loop', color: 'bg-yellow-500', icon: GitCommit },
    { type: 'stable', color: 'bg-primary', icon: Shield },
];

type Node = {
    id: number;
    x: number;
    y: number;
    type: 'vulnerable' | 'dark_loop' | 'stable';
};

export const QuantumNodeMap = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [connections, setConnections] = useState<{ from: number; to: number; isDark: boolean }[]>([]);

    useEffect(() => {
        const generateState = () => {
            const newNodes: Node[] = Array.from({ length: NODE_COUNT }).map((_, i) => {
                const typeRoll = Math.random();
                let type: Node['type'] = 'stable';
                if (typeRoll < 0.1) type = 'vulnerable';
                else if (typeRoll < 0.2) type = 'dark_loop';

                return {
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    type,
                };
            });

            const newConnections = Array.from({ length: CONNECTION_COUNT }).map(() => {
                const from = Math.floor(Math.random() * NODE_COUNT);
                let to = Math.floor(Math.random() * NODE_COUNT);
                while (to === from) {
                    to = Math.floor(Math.random() * NODE_COUNT);
                }
                const isDark = newNodes[from].type !== 'stable' || newNodes[to].type !== 'stable';
                return { from, to, isDark };
            });

            setNodes(newNodes);
            setConnections(newConnections);
        };

        generateState();
        const interval = setInterval(generateState, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-64 w-full rounded-lg bg-black/30 overflow-hidden border border-border">
            <svg width="100%" height="100%" className="absolute inset-0">
                {connections.map((conn, i) => {
                    const fromNode = nodes[conn.from];
                    const toNode = nodes[conn.to];
                    if (!fromNode || !toNode) return null;
                    return (
                        <line
                            key={i}
                            x1={`${fromNode.x}%`}
                            y1={`${fromNode.y}%`}
                            x2={`${toNode.x}%`}
                            y2={`${toNode.y}%`}
                            className={cn("transition-all duration-1000", conn.isDark ? "stroke-destructive/50" : "stroke-primary/20")}
                            strokeWidth="1"
                        />
                    );
                })}
            </svg>

            {nodes.map(node => {
                const nodeInfo = NODE_TYPES.find(n => n.type === node.type)!;
                const Icon = nodeInfo.icon;
                return (
                    <div
                        key={node.id}
                        className="absolute group transition-all duration-1000"
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div className={cn("w-3 h-3 rounded-full flex items-center justify-center", nodeInfo.color, node.type !== 'stable' && 'animate-ping')}>
                           <Icon className="w-2 h-2 text-white/80" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
