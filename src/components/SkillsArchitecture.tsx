import { DefragText } from "./DefragText";
import { motion } from "motion/react";
import { ViewTrigger } from "./ViewTrigger";
import { Terminal, Database, Code2, Network, Shield, Cpu, LayoutTemplate, Github } from "lucide-react";

const STACK = [
  {
    category: "Languages",
    icon: <Code2 className="w-4 h-4" />,
    items: ["Python", "Java", "C", "C++", "TypeScript"]
  },
  {
    category: "Backend",
    icon: <Database className="w-4 h-4" />,
    items: ["Django", "Flask"]
  },
  {
    category: "Frontend",
    icon: <LayoutTemplate className="w-4 h-4" />,
    items: ["React"]
  },
  {
    category: "Security & Networking",
    icon: <Shield className="w-4 h-4" />,
    items: ["Wireshark", "Nmap", "Kali Linux"]
  },
  {
    category: "Infrastructure",
    icon: <Cpu className="w-4 h-4" />,
    items: ["Docker", "AWS", "Linux", "Git"]
  }
];

export function SkillsArchitecture() {
  return (
    <section className="py-32 px-6 scan-line-divider bg-transparent relative overflow-hidden flex flex-col justify-center">
      <ViewTrigger className="mx-auto w-full max-w-6xl relative z-10 flex flex-col items-center h-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-primary)] mb-16 flex items-center gap-4 w-full"
        >
          <span className="w-12 h-px bg-[var(--accent-primary)]/40" />
          <DefragText text="~/skills" className="hover-glitch" />
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {STACK.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-panel border border-theme-border rounded-xl p-6 relative group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-[var(--accent-secondary)]">
                  {group.icon}
                </div>
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-theme-muted">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {group.items.map(item => (
                  <div key={item} className="flex items-center gap-3 group/item">
                    <span className="w-1.5 h-1.5 rounded-full border border-theme-border group-hover/item:bg-[var(--accent-primary)] group-hover/item:border-[var(--accent-primary)] transition-colors" />
                    <span className="font-mono text-sm text-theme-text">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </ViewTrigger>
    </section>
  );
}
