import { DefragText } from "./DefragText";
import { motion } from "motion/react";
import { AmbientGlow } from "./AmbientGlow";
import { ViewTrigger } from "./ViewTrigger";

export function Achievements() {
  const HACKATHONS = [
    {
      id: "HACK-01",
      title: "ImpactThon @ KSV",
      role: "Finalist",
      desc: "Collaborated with GUJCOST for the 2025-26 event, building business automation solutions.",
    },
    {
      id: "HACK-02",
      title: "Bhartiya Antariksh Hackathon 2025",
      role: "ISRO Certified",
      desc: "Ideas Development & Teamwork for space-tech applications.",
    },
    {
      id: "LEAD-01",
      title: "XENESIS 2026",
      role: "Event Coordinator",
      desc: "LDRP-ITR flagship fest. Team Management & Leadership for 300+ attendees.",
    }
  ];

  const CERTS = [
    "AWS (Lambda Foundations)",
    "IBM (Intro to LLMs)",
    "HP (Cybersecurity Awareness)",
    "NPTEL (Programming in Java)",
    "ISRO (Antariksh Hackathon)",
    "KSV (Linear Algebra for ML)"
  ];

  return (
    <section className="py-32 px-6 scan-line-divider bg-transparent relative overflow-hidden group/section">
      <AmbientGlow color="var(--accent-secondary)" opacity={0.06} className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <ViewTrigger className="mx-auto max-w-6xl relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-secondary)] mb-16 flex items-center gap-4"
        >
          <span className="w-12 h-px bg-[var(--accent-secondary)]/40" />
          <DefragText text="~/achievements" className="hover-glitch" />
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {HACKATHONS.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-500 rounded-xl hover:border-theme-border-strong relative overflow-hidden"
            >
              <div className="font-mono text-[9px] text-theme-muted tracking-widest mb-6">{item.id}</div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-theme-text font-medium text-lg font-display tracking-tight">{item.title}</h4>
                </div>
                <span className="inline-block px-2 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-mono text-[9px] uppercase tracking-widest border border-[var(--accent-primary)]/20 rounded mb-4">
                  {item.role}
                </span>
                <p className="text-theme-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-secondary)] mb-8 flex items-center gap-4"
        >
          <span className="w-12 h-px bg-[var(--accent-secondary)]/40" />
          <DefragText text="~/certifications" className="hover-glitch" />
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {CERTS.map(cert => (
            <div key={cert} className="px-4 py-2 border border-theme-border rounded-full bg-theme-surface/30 text-theme-muted font-mono text-xs hover:border-theme-border-strong hover:text-theme-text transition-colors">
              {cert}
            </div>
          ))}
        </motion.div>

      </ViewTrigger>
    </section>
  );
}
