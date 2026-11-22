'use client';

import { ZioncoreJnrChat } from '@/components/zioncore-jnr-chat';

export default function ZioncoreJnrPage() {
  return (
    <div className="h-screen w-screen p-4 flex items-center justify-center">
        <div className="h-full w-full max-w-4xl">
            <ZioncoreJnrChat />
        </div>
    </div>
  );
}
