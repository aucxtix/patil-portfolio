import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function NetworkLatency() {
  const [latency, setLatency] = useState(12);
  const [status, setStatus] = useState<'good' | 'warning' | 'error'>('good');

  useEffect(() => {
    let isActive = true;
    
    const measureLatency = async () => {
      try {
        const start = performance.now();
        // Ping the current origin with a cache-buster
        await fetch(window.location.origin + '/?ping=' + Date.now(), { cache: 'no-store' });
        const end = performance.now();
        
        if (!isActive) return;
        
        const currentLatency = Math.floor(end - start);
        // Add some jitter for realism and to avoid completely static numbers if it hits cache
        const jitter = Math.floor(Math.random() * 5);
        const finalLatency = Math.max(1, currentLatency + jitter);
        
        setLatency(finalLatency);
        
        if (finalLatency > 150) setStatus('error');
        else if (finalLatency > 80) setStatus('warning');
        else setStatus('good');
        
      } catch (err) {
        if (!isActive) return;
        setLatency(999);
        setStatus('error');
      }
    };

    // Initial measurement
    measureLatency();

    // Measure every 3 seconds
    const interval = setInterval(measureLatency, 3000);
    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, []);

  const getStatusColor = () => {
    switch(status) {
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'good': 
      default: return 'bg-[var(--accent-primary)]';
    }
  };

  const getTextColor = () => {
    switch(status) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'good': 
      default: return 'text-theme-text';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      className="fixed top-20 right-6 z-50 flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-theme-border text-[10px] font-mono tracking-widest uppercase shadow-lg shadow-black/5 bg-theme-surface/80 backdrop-blur-md"
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${getStatusColor()} opacity-40`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${getStatusColor()}`}></span>
      </span>
      <span className="text-theme-muted/70">SYS_LATENCY:</span>
      <span className={`w-8 text-right font-medium ${getTextColor()}`}>
        {latency > 999 ? 'ERR' : `${latency}ms`}
      </span>
    </motion.div>
  );
}
