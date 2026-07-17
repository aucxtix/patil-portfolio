import { DefragText } from "./DefragText";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { AmbientGlow } from "./AmbientGlow";
import { ViewTrigger } from "./ViewTrigger";

function Counter({ value, label, suffix = "" }: { value: string, label: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) return;
      
      const duration = 1500;
      const incrementTime = (duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="glass-panel flex flex-col p-6 lg:p-8">
      <div className="font-mono text-[10px] tracking-widest text-theme-muted/70 uppercase mb-4">{label}</div>
      <div className="text-4xl lg:text-5xl font-display font-medium text-theme-text flex items-baseline gap-1">
        {count}<span className="text-theme-muted/50 text-2xl">{suffix}</span>
      </div>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="py-24 px-6 border-b border-theme-border bg-transparent relative overflow-hidden group/section">
       <AmbientGlow color="var(--accent-orange)" opacity={0.05} className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000" />
       {/* Background structural lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-50" />
      
      <ViewTrigger className="mx-auto max-w-6xl">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-theme-muted/70 mb-12">
          <DefragText text="~/metrics" className="hover-glitch" />
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-theme-border border border-theme-border">
          <Counter value="12" label="Projects Shipped" suffix="+" />
          <Counter value="3" label="Hackathons Won" />
          <Counter value="500" label="Commits/Year" suffix="+" />
          <Counter value="99" label="Uptime Obsession" suffix="%" />
        </div>
      </ViewTrigger>
    </section>
  );
}
