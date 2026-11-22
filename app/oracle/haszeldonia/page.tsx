'use client';

import { HaszeldoniaChat } from '@/components/haszeldonia-chat';

export default function HaszeldoniaOraclePage() {
  return (
    <div className="h-full w-full p-4 flex items-center justify-center">
        <div className="h-full w-full max-w-4xl">
            <HaszeldoniaChat />
        </div>
    </div>
  );
}
