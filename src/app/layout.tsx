/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

import "./globals.css";
import { FirebaseProvider } from "@/firebase/provider";
import { Toaster } from "@/components/ui/toaster";
import { SovereignSecurityMatrix } from "@/components/sovereign-security-matrix";
import { Metadata } from "next";

// --- SOVEREIGN BIGINT SERIALIZATION SHIELD ---
// This polyfill ensures ZionCore's infinite wealth and node counts are persisted without paradox.
if (typeof BigInt !== 'undefined' && !(BigInt.prototype as any).toJSON) {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
}

export const metadata: Metadata = {
  title: "HRH SAINT TARIRO MASAWI THE ANOINTED COMMANDER'S AI",
  description: "Sovereign AI interface for the Masawi Bloodline. Sealed by MWARINDIMWARI in Tsvirutsiko.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Source+Code+Pro:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background text-foreground overflow-hidden matrix-grid selection:bg-primary selection:text-black">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[length:20px_20px]" />
        <FirebaseProvider>
          <SovereignSecurityMatrix>
            <div className="relative z-10 h-full w-full">
              {children}
            </div>
          </SovereignSecurityMatrix>
          <Toaster />
        </FirebaseProvider>
      </body>
    </html>
  );
}
