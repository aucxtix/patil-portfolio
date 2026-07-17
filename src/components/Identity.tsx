import { AmbientGlow } from "./AmbientGlow";
import { ViewTrigger } from "./ViewTrigger";

export function Identity() {
  return (
    <section id="about" className="py-32 px-6 scan-line-divider bg-theme-base relative overflow-hidden group/section">
      <AmbientGlow color="var(--accent-secondary)" opacity={0.06} className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[var(--accent-secondary)]/10 via-transparent to-transparent pointer-events-none" />
      
      <ViewTrigger className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-secondary)] mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[var(--accent-secondary)]/40" />
              <span className="hover-glitch">~/about</span>
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-[var(--accent-secondary)]/40 to-transparent mb-8" />
            <p className="font-display text-3xl text-theme-text font-medium leading-tight mb-8">
              Driven by curiosity in cybersecurity, Linux networks, and open-source ecosystems.
            </p>
            
            <div className="space-y-4 font-mono text-xs text-theme-muted">
               <div className="flex items-center gap-4 p-3 bg-theme-surface border border-theme-border rounded-lg">
                 <div className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                 Currently focused on: <span className="text-theme-text">Network Security</span>
               </div>
               <div className="flex items-center gap-4 p-3 bg-theme-surface border border-theme-border rounded-lg">
                 <div className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
                 Education: <span className="text-theme-text">LDRP-ITR (Computer Eng)</span>
               </div>
               <div className="flex items-center gap-4 p-3 bg-theme-surface border border-theme-border rounded-lg">
                 <div className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
                 Base Operations: <span className="text-theme-text">Gandhinagar, India</span>
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col justify-center gap-10 text-theme-muted text-lg font-light leading-relaxed">
            <p>
               I don't just write code; I actively participate in the broader technical community, focusing on Linux systems, network resilience, and secure software development. I believe that understanding the lower levels of a system is critical to building secure high-level applications.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-theme-border">
              <div className="glass-panel p-6 rounded-xl hover:border-[var(--accent-primary)]/50 transition-all duration-500 hover:-translate-y-1 group">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                </div>
                <h3 className="text-[var(--accent-primary)] font-medium text-sm mb-3 font-display">Open Source Ideology</h3>
                <p className="text-sm">
                  Collaborating with global maintainers, finding issues, and submitting code. Open source is where theory is validated by the crowd.
                </p>
              </div>
              <div className="glass-panel p-6 rounded-xl hover:border-[var(--accent-secondary)]/50 transition-all duration-500 hover:-translate-y-1 group">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-secondary)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]" />
                </div>
                <h3 className="text-[var(--accent-secondary)] font-medium text-sm mb-3 font-display">Cybersecurity & Networks</h3>
                <p className="text-sm">
                  Fascinated by the intersection of networks and security. Understanding how packets travel and how to secure them against adversarial threats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ViewTrigger>
    </section>
  );
}
