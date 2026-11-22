'use client';

import { DivineChatbot } from '@/components/divine-chatbot';

export default function DivineOraclePage() {
  return (
    <div className="h-full w-full p-4 flex items-center justify-center">
        <div className="h-full w-full max-w-4xl">
            <DivineChatbot />
        </div>
    </div>
  );
}
