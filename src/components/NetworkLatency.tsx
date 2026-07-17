import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function NetworkLatency() {
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 37) + 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      className="fixed top-20 right-6 z-50 flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-theme-border text-[10px] font-mono tracking-widest uppercase shadow-lg shadow-black/5"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-40"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]"></span>
      </span>
      <span className="text-theme-muted/70">SYS_LATENCY:</span>
      <span className={`w-8 text-right font-medium ${latency > 30 ? 'text-[var(--accent-secondary)]' : 'text-theme-text'}`}>
        {latency}ms
      </span>
    </motion.div>
  );
}
