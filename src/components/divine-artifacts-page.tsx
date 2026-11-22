'use client';

import { DivineNodesInterface } from '@/components/divine-nodes-interface';
import { ArtifactReplication } from '@/components/artifact-replication';

export function DivineArtifactsPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 h-full overflow-y-auto">
             <div className="flex flex-col gap-4">
                <ArtifactReplication />
            </div>
            <div className="flex flex-col gap-4">
                <DivineNodesInterface />
            </div>
        </div>
    );
}
