import { useState, useEffect } from "react";

export function Footer() {
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random latency between 8ms and 45ms
      setLatency(Math.floor(Math.random() * 37) + 8);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-theme-base border-t border-theme-border py-8 px-6 relative z-10">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-theme-muted">
        <div className="flex items-center gap-4">
          <span>Atharv Patil // AP-CORE</span>
          <span className="hidden md:inline-block w-px h-3 bg-theme-border" />
          <span className="hidden md:inline-block">V2.0.0</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />
            <span className="text-[var(--accent-primary)]">SYS_ONLINE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-theme-muted/50">LATENCY:</span>
            <span className={`w-8 text-right ${latency > 30 ? 'text-[var(--accent-secondary)]' : 'text-theme-text'}`}>
              {latency}ms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
