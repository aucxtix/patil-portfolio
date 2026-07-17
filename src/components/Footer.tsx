import { useState, useEffect } from "react";
import { Battery, BatteryFull, BatteryMedium, BatteryLow, BatteryWarning } from "lucide-react";

export function Footer() {
  const [time, setTime] = useState(new Date().toISOString());
  const [battery, setBattery] = useState(87);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBattery(prev => {
        if (prev <= 1) return 100;
        return prev - 1;
      });
    }, 60000); // Drain 1% every minute
    return () => clearInterval(batteryInterval);
  }, []);

  const getBatteryIcon = () => {
    if (battery > 80) return <BatteryFull className="w-4 h-4" />;
    if (battery > 50) return <BatteryMedium className="w-4 h-4" />;
    if (battery > 20) return <BatteryLow className="w-4 h-4" />;
    return <BatteryWarning className="w-4 h-4" />;
  };

  const getBatteryColor = () => {
    if (battery > 50) return "text-[var(--accent-primary)]";
    if (battery > 20) return "text-[var(--accent-orange)]";
    return "text-red-500 animate-pulse";
  };

  return (
    <footer className="w-full bg-theme-base border-t border-theme-border py-8 px-6 relative z-10">
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
          <div className={`hidden md:flex items-center gap-1.5 ${getBatteryColor()} transition-colors`}>
            {getBatteryIcon()}
            <span>{battery}%</span>
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
