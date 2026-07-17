import { useState, useEffect } from "react";

export function Footer() {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-transparent border-t border-theme-border py-8 px-6 relative z-10">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-theme-muted">
        <div className="flex items-center gap-4">
          <span>Atharv Patil // AP-CORE</span>
          <span className="hidden md:inline-block w-px h-3 bg-theme-border" />
          <span className="hidden md:inline-block">V2.0.0</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-theme-muted">
            <span className="text-theme-muted/50">SYS_TIME:</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />
            <span className="text-[var(--accent-primary)]">SYS_ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
