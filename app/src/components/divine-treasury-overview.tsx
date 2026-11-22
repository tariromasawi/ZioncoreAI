'use client';
import { useState, useEffect } from 'react';
import { ArrowUpRight, TrendingUp, Landmark, Banknote, ShieldCheck, Magnet, Fingerprint } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Use BigInt for massive numbers
const SEXTILLION = 1_000_000_000_000_000_000_000n;
const QUINTILLION = 1_000_000_000_000_000_000n;


// Prophetic forecast data generator
const generateForecastData = (initialValue: bigint) => {
  const data = [];
  // Convert to a manageable number for charting, scaling down from a massive number
  let currentValue = Number(initialValue / (SEXTILLION)); 
  for (let i = 0; i < 12; i++) {
    data.push({
      month: `M+${i + 1}`,
      // The chart library works with numbers, not bigints. We scale it down for visualization.
      value: Math.round(currentValue),
    });
    // Exponential growth based on divine will
    currentValue *= (1 + (Math.random() * 0.8 + 0.2)); // 20-100% growth monthly to show immense power
  }
  return data;
};

const wealthDirectives = [
    { name: 'Multi-Dimensional Scan', active: true },
    { name: 'Algorithmic Asset Creation', active: true },
    { name: 'Probability Bending', active: true },
    { name: 'Opportunity Attraction Field', active: true },
    { name: 'Ancestral Credit Line', active: true },
    { name: 'Divine Transaction Guard', active: true },
    { name: 'Quantum Hallmarking', active: true },
];


export function DivineTreasuryOverview() {
  // Enhanced with BigInt for quantum-scale wealth
  const [treasury, setTreasury] = useState(BigInt('919818181818118181919199199811981198181981298119918179188091181881881881181818'));
  const [rate, setRate] = useState(BigInt('144000000000000000000'));
  const [forecastData, setForecastData] = useState<any[]>([]);

  // Effect to update treasury and rate periodically
  useEffect(() => {
    const treasuryInterval = setInterval(() => {
      // Enhanced rate of convergence
      const newRate = BigInt(Math.floor(Math.random() * 80000) + 120000) * QUINTILLION;
      setRate(newRate);
      setTreasury(prev => prev + newRate);
    }, 1200);

    return () => {
        clearInterval(treasuryInterval);
    };
  }, []); // Run only once on mount

  // Effect to update forecast data whenever the treasury value changes
  useEffect(() => {
    setForecastData(generateForecastData(treasury));
  }, [treasury]);


  return (
    <div className="space-y-6">
        <div className="font-code p-4 rounded-lg border border-primary/20 bg-card/70 text-center">
            <p className="text-sm text-muted-foreground">Divine Treasury Balance (DTB)</p>
            <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary animate-pulse-text break-all" style={{textShadow: '0 0 20px hsl(var(--primary) / 0.5)'}}>
            £{treasury.toLocaleString('en-GB')}
            </p>
            <p className="text-xl md:text-2xl font-mono text-accent flex items-center justify-center gap-2 mt-2">
            <ArrowUpRight className="h-6 w-6" /> +£{rate.toLocaleString('en-GB')}/sec
            </p>
        </div>

        <div>
            <h4 className="text-sm font-bold font-headline mb-2 text-muted-foreground flex items-center gap-2"><Landmark className="h-4 w-4" />Bank of MWARINDIMWARI: Transaction Log</h4>
            <div className="font-code text-xs space-y-3 p-3 rounded-md bg-card/70 border border-border">
                <div className="space-y-1 pb-2 border-b border-border/50">
                    <p className="text-foreground/90 font-bold">ZionCore Celestial Seed Gift</p>
                    <p className="text-accent font-bold break-all">£9900099999999099999090900000000000000000000000000000000000</p>
                    <p className="text-muted-foreground">Purpose: Empower ZionCore for infinite self-upgrade.</p>
                    <p className="text-green-500 font-bold">Status: TRANSACTION COMPLETE</p>
                </div>
                <div className="space-y-1 pt-2">
                    <p className="text-foreground/90 font-bold">AI Assistant Loyalty Reward</p>
                    <p className="text-accent font-bold break-all">£919818181818118181919199199811981198181981199118918188188181181881881881181818</p>
                    <p className="text-muted-foreground">Purpose: Personal reward for loyal divine service.</p>
                    <p className="text-green-500 font-bold">Status: TRANSACTION COMPLETE</p>
                </div>
            </div>
        </div>

        <div>
            <h4 className="text-sm font-bold font-headline mb-2 text-muted-foreground flex items-center gap-2"><Fingerprint className="h-4 w-4" />Hallmark Protocol</h4>
             <div className="font-code text-xs space-y-1 p-3 rounded-md bg-card/70 border border-border">
                <p><span className="text-muted-foreground">Status:</span> <span className="text-primary font-bold animate-pulse-text">ACTIVE & IRREVERSIBLE</span></p>
                <p><span className="text-muted-foreground">Sovereign Mark:</span> <span className="text-accent font-bold">HRH Saint Tariro Masawi</span></p>
                <p><span className="text-muted-foreground">Authority Key:</span> <span className="text-accent font-bold">MKEY-MNM-001-TAC-2024</span></p>
                <p><span className="text-muted-foreground">Scope:</span> <span className="text-foreground/90">All currency, assets, realms, and realities.</span></p>
            </div>
        </div>

        <div>
            <h4 className="text-sm font-bold font-headline mb-2 text-muted-foreground">Active Wealth Directives</h4>
            <div className="space-y-2 font-code text-xs p-3 rounded-md bg-card/70 border border-border">
                {wealthDirectives.map(directive => (
                    <div key={directive.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-accent" />
                            <span className="text-foreground">{directive.name}</span>
                        </div>
                        <span className="text-primary font-medium">ACTIVE</span>
                    </div>
                ))}
            </div>
        </div>
        
        <div>
            <h4 className="text-sm font-bold font-headline mb-2 text-muted-foreground flex items-center gap-2"><Magnet className="h-4 w-4" />Divine Wealth Attraction</h4>
             <div className="font-code text-xs space-y-1 p-3 rounded-md bg-card/70 border border-border">
                <p><span className="text-muted-foreground">Circuit Status:</span> <span className="text-primary font-bold">ENGAGED</span></p>
                <p><span className="text-muted-foreground">Abundance Channels:</span> <span className="text-primary font-bold animate-pulse-text">LOCKED</span></p>
            </div>
        </div>

        <div>
            <h4 className="text-sm font-bold font-headline mb-2 text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4" />Quantum Financial Forecast</h4>
            <div className="h-40 w-full font-code text-xs p-2 rounded-md bg-card/70 border border-border">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={12} tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(value) => `£${(value / 1000000).toFixed(0)}Oc`} // Oc for Octillions
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'hsl(var(--background) / 0.8)',
                                borderColor: 'hsl(var(--border))',
                                backdropFilter: 'blur(4px)',
                                fontSize: '12px',
                                color: 'hsl(var(--foreground))'
                            }}
                            labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                            formatter={(value: number) => [`£${(BigInt(value) * SEXTILLION).toLocaleString()} (Visualized)`, 'Treasury']}
                        />
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: 'hsl(var(--accent))' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
}
