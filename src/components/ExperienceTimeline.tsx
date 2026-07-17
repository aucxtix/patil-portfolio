import { motion } from "motion/react";
import { AmbientGlow } from "./AmbientGlow";
import { ViewTrigger } from "./ViewTrigger";

const TIMELINE = [
  {
    year: "MAY 2026 - JUL 2026",
    role: "Python Development Intern",
    entity: "Webvanta Innovations (Remote)",
    detail: "Built scripting/automation workflows, backend components, and REST API integrations using Python, Django & Flask.",
    type: "WORK",
    glow: "group-hover:bg-[var(--accent-primary)] group-hover:shadow-[0_0_15px_var(--accent-primary)]"
  },
  {
    year: "MAY 2026 - JUN 2026",
    role: "IT Technical Support Intern",
    entity: "Sai Computer, Gandhinagar",
    detail: "ASUS Certified. Hardware deployment, LAN configuration/troubleshooting, system diagnostics, OS deployment, storage integration, CCTV infrastructure.",
    type: "WORK",
    glow: "group-hover:bg-[var(--accent-secondary)] group-hover:shadow-[0_0_15px_var(--accent-secondary)]"
  },
  {
    year: "APR 2026 - PRESENT",
    role: "Member",
    entity: "GDG Cloud Gandhinagar",
    detail: "Active community member, participating in cloud computing discussions and technical events.",
    type: "COMMUNITY",
    glow: "group-hover:bg-[var(--accent-primary)] group-hover:shadow-[0_0_15px_var(--accent-primary)]"
  },
  {
    year: "MAY 2026 - JUL 2026",
    role: "Open Source Contributor",
    entity: "GSSoC & Nexus Spring of Code",
    detail: "Contributing to open source projects by independently identifying issues, submitting pull requests, and collaborating with global maintainers.",
    type: "OPEN SOURCE",
    glow: "group-hover:bg-[var(--accent-secondary)] group-hover:shadow-[0_0_15px_var(--accent-secondary)]"
  }
];

export function ExperienceTimeline() {
  return (
    <section id="timeline" className="py-32 px-6 scan-line-divider bg-mesh-dark relative group/section overflow-hidden">
      <AmbientGlow color="var(--accent-purple)" opacity={0.06} className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000" />
      <ViewTrigger className="mx-auto max-w-6xl relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-theme-muted/70 mb-16 flex items-center gap-4"
        >
          <span className="w-12 h-px bg-theme-border-strong" />
          <span className="hover-glitch">~/experience</span>
        </motion.h2>

        <div className="relative border-l border-theme-border ml-4 lg:ml-[120px]">
          {TIMELINE.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 pb-16 last:pb-0 group"
            >
              {/* Node */}
              <div className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-neutral-800 ring-4 ring-[var(--bg-base)] transition-all duration-300 ${item.glow}`} />
              
              {/* Year - Desktop positioned to the left */}
              <div className="hidden lg:block absolute -left-[180px] top-0 font-mono text-xs text-theme-muted/70 tracking-widest text-right w-[140px]">
                {item.year}
              </div>

              <div className="flex flex-col glass-panel p-6 rounded-xl border border-theme-border hover:border-theme-border-strong transition-all duration-500 hover:-translate-y-1">
                 <div className="lg:hidden font-mono text-[10px] text-theme-muted/70 mb-3 tracking-widest">{item.year}</div>
                 <div className="flex flex-wrap items-center gap-3 mb-2">
                   <h3 className="font-display text-xl text-theme-text font-medium">{item.role}</h3>
                   <span className="font-mono text-[9px] tracking-widest uppercase bg-theme-surface border border-theme-border shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] px-2 py-0.5 text-theme-muted">
                     {item.type}
                   </span>
                 </div>
                 <h4 className="text-[var(--accent-primary)] text-sm mb-4 font-mono">{item.entity}</h4>
                 <p className="text-theme-muted text-sm leading-relaxed max-w-2xl">
                   {item.detail}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ViewTrigger>
    </section>
  );
}
