import { DefragText } from "./DefragText";
import { AmbientGlow } from "./AmbientGlow";
import { ViewTrigger } from "./ViewTrigger";

export function CurrentFocus() {
  return (
    <section className="py-24 px-6 border-b border-theme-border bg-transparent relative group/section overflow-hidden">
      <AmbientGlow color="var(--accent-purple)" opacity={0.06} className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000" />
      <ViewTrigger className="mx-auto max-w-6xl">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-theme-muted/70 mb-12">
          <DefragText text="~/focus" className="hover-glitch" />
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
           <div className="glass-panel p-8">
             <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500">Active Build</span>
             </div>
             <h3 className="font-medium text-theme-text mb-3 text-lg">Building a custom orchestrator</h3>
             <p className="text-sm text-theme-muted leading-relaxed">
               Writing a simplified container orchestration engine in Go to understand scheduling algorithms, Raft consensus, and container networking primitives from the ground up.
             </p>
           </div>
           
           <div className="glass-panel p-8">
             <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-600"></span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-theme-muted/70">Study Stream</span>
             </div>
             <h3 className="font-medium text-theme-text mb-3 text-lg">Designing Data-Intensive Applications</h3>
             <p className="text-sm text-theme-muted leading-relaxed">
               Currently reading through DDIA to solidify my understanding of replication delays, partitioning topologies, and distributed transactions.
             </p>
           </div>
        </div>
      </ViewTrigger>
    </section>
  );
}
