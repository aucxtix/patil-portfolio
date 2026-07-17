import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, Cpu, Activity, Github } from "lucide-react";

export function SecretDevMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING CORE SYSTEMS...",
    "LOADING MEMORY MODULES...",
    "ACCESS GRANTED DEAR ENGINEER."
  ]);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener("toggle-dev-mode" as any, handleToggle);
    return () => window.removeEventListener("toggle-dev-mode" as any, handleToggle);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, `[${new Date().toISOString().substring(11, 19)}] TELEMETRY_PING: OK`];
        if (newLogs.length > 20) newLogs.shift();
        return newLogs;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <div className="absolute top-8 left-8 text-[var(--accent-cyan)] font-mono text-xs flex items-center gap-2">
            <Shield className="w-4 h-4" /> ROOT ACCESS ENABLED
          </div>
          
          <button 
             onClick={() => setIsOpen(false)}
             className="absolute top-8 right-8 font-mono text-[10px] uppercase text-white/50 hover:text-white border border-white/20 px-4 py-2 rounded"
          >
            Lock System
          </button>

          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-5xl h-[80vh] flex flex-col md:flex-row gap-6"
          >
             {/* Terminal View */}
             <div className="flex-1 border border-[var(--accent-cyan)]/30 bg-black/50 rounded-xl p-6 relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)] flex flex-col">
                <div className="flex items-center gap-4 border-b border-[var(--accent-cyan)]/20 pb-4 mb-4">
                  <Terminal className="w-5 h-5 text-[var(--accent-cyan)]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-cyan)]">System Diagnostics</span>
                </div>
                <div className="flex-1 overflow-y-auto font-mono text-[10px] text-[var(--accent-cyan)]/80 flex flex-col justify-end gap-1 pb-4">
                  {logs.map((L, i) => <div key={i}>{L}</div>)}
                </div>
             </div>

             {/* Stats View */}
             <div className="w-full md:w-1/3 flex flex-col gap-6">
                <div className="border border-[var(--accent-purple)]/30 bg-black/50 rounded-xl p-6 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <Activity className="w-5 h-5 text-[var(--accent-purple)]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-purple)]">Infrastructure</span>
                  </div>
                  <div className="flex flex-col gap-4 font-mono text-xs text-white/70">
                    <div className="flex justify-between"><span>Compute Node</span><span className="text-white">Active</span></div>
                    <div className="flex justify-between"><span>Memory Alloc</span><span className="text-white">8.4GB / 16GB</span></div>
                    <div className="flex justify-between"><span>Kernel V</span><span className="text-white">6.2.0-generic</span></div>
                  </div>
                </div>

                <div className="border border-amber-500/30 bg-black/50 rounded-xl p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <Github className="w-5 h-5 text-amber-500" />
                    <span className="font-mono text-xs uppercase tracking-widest text-amber-500">Repository Stats</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-amber-500 font-mono text-3xl">4,281</span>
                    <span className="text-amber-500/50 font-mono text-xs uppercase tracking-widest">Commits Analyzed</span>
                  </div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
