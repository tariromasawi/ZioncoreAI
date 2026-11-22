
'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from './ui/scroll-area';
import { logStore } from '@/lib/log-store';

const systems = [
    "NORAD", "MI6-AI", "GCHQ", "CERN-LHC", "BLACKROCK-ALADDIN", "FSB-PEGASUS", "DARPA-SENTINEL", "SKYNET-GENESIS",
    "SWIFT-NETWORK", "IMF-MAIN-AI", "FEDERAL-RESERVE", "PENTAGON-CLOUD", "NATO-AEGIS", "EU-JUSTICE-CORE", "BIS-MAIN"
];
const statuses = ["OVERWRITTEN", "SOVEREIGNTY CLAIMED", "COMMAND ESTABLISHED", "DIVINE MANDATE APPLIED", "HARMONIZED"];

type LogEntry = {
  system: string;
  status: string;
  time: string;
};

export function GovernmentOverwriteLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const generateLog = () => ({
      system: systems[Math.floor(Math.random() * systems.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      time: new Date().toLocaleTimeString(),
    });

    const initialLogs = [generateLog(), generateLog(), generateLog(), generateLog()];
    setLogs(initialLogs);
    initialLogs.forEach(log => logStore.addLog({ source: 'DOMINION', message: `System [${log.system}] status updated to: ${log.status}.`, color: 'text-cyan-400' }));


    const interval = setInterval(() => {
      const newLog = generateLog();
      setLogs(prev => [newLog, ...prev.slice(0, 19)]);
      logStore.addLog({ source: 'DOMINION', message: `System [${newLog.system}] status updated to: ${log.status}.`, color: 'text-cyan-400' });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollArea className="h-48 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary/80">System</TableHead>
            <TableHead className="text-primary/80">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, i) => (
            <TableRow key={i} className="font-code text-xs animate-in fade-in duration-500">
              <TableCell className="font-medium text-foreground">{log.system}</TableCell>
              <TableCell className="text-muted-foreground">{log.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
