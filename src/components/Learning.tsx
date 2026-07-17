import { Section } from "./Section";

export function Learning() {
  return (
    <Section id="learning" title="Current Focus">
      <div className="rounded-xl border border-neutral-800 bg-theme-surface/80 backdrop-blur-md p-8">
        <h3 className="font-display text-xl font-medium text-theme-text mb-4">
          What I'm building right now
        </h3>
        <p className="text-theme-muted leading-relaxed mb-8 max-w-3xl">
          Continuous learning is the core of my engineering philosophy. Rather than just reading documentation, I believe in building systems from the ground up to understand their constraints and trade-offs.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-l-2 border-emerald-500/50 pl-5 relative">
            <div className="absolute -left-1.5 top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 absolute mix-blend-screen shadow-[0_0_10px_2px_rgba(16,185,129,0.5)] animate-pulse" />
            <h4 className="font-medium text-neutral-200">Writing a Key-Value Store in Go</h4>
            <p className="mt-2 text-sm text-theme-muted/70 leading-relaxed">
              Implementing an append-only log and LSM trees to understand database internals, disk I/O optimization, and concurrency primitives in Go.
            </p>
          </div>
          
          <div className="border-l-2 border-neutral-800 pl-5">
            <h4 className="font-medium text-neutral-200">Exploring gRPC & Service Mesh</h4>
            <p className="mt-2 text-sm text-theme-muted/70 leading-relaxed">
              Studying how large-scale microservices communicate securely and observe telemetry data across distributed boundaries.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
