import { DefragText } from "./DefragText";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Code2, Network, Server, Terminal, X, ChevronRight } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { AmbientGlow } from "./AmbientGlow";
import { ViewTrigger } from "./ViewTrigger";
import { audio } from "../lib/audio";

export const PROJECTS = [
  {
    id: "PRJ-01",
    title: "Anonymous IP Tracker",
    value: "Python tool for IP tracing/analysis.",
    problem: "Needed a reliable, fast command-line tool for network reconnaissance and OSINT practice.",
    architecture: "Built with Python, utilizing RESTful APIs for geolocation and ISP data retrieval. Designed for speed and minimal dependency overhead.",
    outcome: "Successfully traces and visualizes IP data efficiently for educational network mapping.",
    tech: ["Python", "Networking", "OSINT", "APIs"],
    metrics: [
      { label: "Status", value: "Active" },
      { label: "Type", value: "CLI Tool" },
      { label: "Focus", value: "Recon" }
    ],
    linkHub: "https://github.com/aucxtix/anonymous-IP-tracker",
    linkLive: null,
    color: "var(--accent-primary)",
    icon: <Terminal className="h-5 w-5" />,
    readTime: "2 MIN READ"
  },
  {
    id: "PRJ-02",
    title: "Aniwebi",
    value: "Full-stack content browsing platform.",
    problem: "Required a fast, responsive interface to browse large volumes of media content with complex state management.",
    architecture: "Developed a single-page application using React and TypeScript, focusing on a clean, responsive UI with optimized rendering for media grids.",
    outcome: "Delivered a smooth, app-like browsing experience with modern aesthetics and typing safety.",
    tech: ["React", "TypeScript", "Tailwind", "Vite"],
    metrics: [
      { label: "Stack", value: "Frontend" },
      { label: "Performance", value: "High" },
      { label: "Design", value: "Responsive" }
    ],
    linkHub: "https://github.com/aucxtix/aniwebi222",
    linkLive: null,
    color: "var(--accent-secondary)",
    icon: <Code2 className="h-5 w-5" />,
    readTime: "2 MIN READ"
  },
  {
    id: "PRJ-03",
    title: "Odoo — KSV x LDRP",
    value: "Business automation solution.",
    problem: "Built for the ImpactThon hackathon (GUJCOST collab) to solve real-world organizational inefficiencies.",
    architecture: "Leveraged Odoo's robust framework to build custom ERP modules, focusing on data integration and process automation.",
    outcome: "Secured Finalist position at ImpactThon by delivering a viable, structured automation prototype.",
    tech: ["Odoo", "Python", "ERP", "PostgreSQL"],
    metrics: [
      { label: "Result", value: "Finalist" },
      { label: "Scope", value: "Enterprise" },
      { label: "Event", value: "ImpactThon" }
    ],
    linkHub: "https://github.com/aucxtix/odoo_ksv_ldrp",
    linkLive: null,
    color: "var(--accent-primary)",
    icon: <Server className="h-5 w-5" />,
    readTime: "3 MIN READ"
  }
];

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const handleProjectSelect = (project: typeof PROJECTS[0]) => {
    audio.success();
    setSelectedProject(project);
  };

  const handleCloseSelect = () => {
    audio.click();
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="py-32 px-6 scan-line-divider bg-transparent relative group/section">
        <AmbientGlow color="var(--accent-secondary)" opacity={0.06} className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[var(--accent-primary)]/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <ViewTrigger className="mx-auto max-w-6xl relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-secondary)] mb-16 flex items-center gap-4"
          >
            <span className="w-12 h-px bg-[var(--accent-secondary)]/40" />
            <DefragText text="~/projects" className="hover-glitch" />
          </motion.h2>

          <div className="space-y-32">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col lg:flex-row w-full gap-8 lg:gap-16 items-center group cursor-pointer"
                onMouseEnter={() => audio.hover()}
                onClick={() => handleProjectSelect(project)}
              >
                {/* Product Showcase Panel */}
                <div className="w-full lg:w-5/12 lg:group-hover:w-1/2 transition-all duration-700 ease-out relative aspect-square md:aspect-[4/5] rounded-xl overflow-visible z-20" data-cursor="reticle">
                  <TiltCard className="w-full h-full">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden glass-panel flex flex-col justify-between p-8 border border-theme-border transition-all duration-700 group-hover:border-theme-border-strong bg-theme-surface/80 backdrop-blur-md">
                    {/* Hover Glare Effect */}
                    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-2xl">
                      <div className="absolute top-0 -left-[150%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] group-hover:left-[200%] transition-all duration-[1.5s] ease-in-out" />
                    </div>

                    {/* Dynamic colored glow inside card */}
                    <div 
                      className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity duration-700 bg-gradient-to-br from-transparent to-[var(--p-color)] pointer-events-none" 
                      style={{ '--p-color': project.color } as any} 
                    />
                    
                    <div className="relative z-10 transition-all duration-700 group-hover:-translate-y-2 group-hover:opacity-0 pointer-events-none">
                      <div className="flex items-center justify-between mb-8">
                         <div className="flex items-center gap-4">
                           <div className="font-mono text-[10px] text-theme-muted/70 tracking-widest">{project.id}</div>
                           <div className="font-mono text-[9px] uppercase border border-theme-border rounded px-2 py-0.5 text-theme-muted flex items-center gap-1.5 bg-theme-surface/50">
                             <Terminal className="w-2.5 h-2.5" />
                             {project.readTime}
                           </div>
                         </div>
                         <div className="text-theme-text/50" style={{ color: project.color }}>{project.icon}</div>
                      </div>
                      <h3 className="font-display text-3xl text-theme-text font-medium mb-4 tracking-tight leading-tight">{project.title}</h3>
                      <p className="text-theme-muted text-sm leading-relaxed">{project.value}</p>
                    </div>

                    {/* Mini Terminal Reveal */}
                    <div className="absolute left-8 right-8 top-8 bottom-32 z-10 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 pointer-events-none flex flex-col justify-center">
                       <div className="bg-theme-base/90 backdrop-blur-md border border-theme-border rounded-lg p-5 font-mono text-xs text-[var(--accent-primary)] shadow-2xl relative overflow-hidden h-full flex flex-col">
                         <div className="flex items-center gap-2 mb-4 pb-3 border-b border-theme-border/50">
                           <Terminal className="w-4 h-4 text-theme-text" />
                           <span className="text-[10px] uppercase tracking-widest text-theme-text">sys.log / insight</span>
                         </div>
                         <div className="flex-1 overflow-y-auto flex flex-col justify-center gap-2 scrollbar-thin">
                            <span className="opacity-50 text-[10px]">&gt; Querying architecture log...</span>
                            <span className="text-theme-text leading-relaxed font-light text-xs">{project.architecture}</span>
                         </div>
                       </div>
                    </div>
                    
                    <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest relative z-10 pt-8 border-t border-theme-border transition-transform duration-700 group-hover:translate-y-2">
                       {project.linkLive && (
                         <a href={project.linkLive} target="_blank" rel="noreferrer" onClick={(e) => { e.stopPropagation(); audio.click(); }} onMouseEnter={() => audio.hover()} className="flex w-max items-center gap-3 text-theme-muted hover:text-theme-text transition-colors">
                           <span className="w-6 h-px transition-all duration-300 group-hover:w-10" style={{ backgroundColor: project.color }} />
                           Initialize Demo
                           <ArrowUpRight className="h-3 w-3" />
                         </a>
                       )}
                       {project.linkHub && (
                         <a href={project.linkHub} target="_blank" rel="noreferrer" onClick={(e) => { e.stopPropagation(); audio.click(); }} onMouseEnter={() => audio.hover()} className="flex w-max items-center gap-3 text-theme-muted hover:text-theme-text transition-colors">
                           <span className="w-6 h-px bg-theme-border-strong transition-all duration-300 group-hover:w-10" />
                           Source Verification
                           <Github className="h-3 w-3" />
                         </a>
                       )}
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Case Study Details */}
              <div className="w-full lg:w-7/12 lg:group-hover:w-1/2 transition-all duration-700 ease-out flex flex-col justify-center space-y-12 lg:pl-10 h-full py-8">
                 <div className="relative pl-6 border-l border-theme-border hover:border-theme-border-strong transition-colors duration-500">
                   <h4 className="font-mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-3" style={{ color: project.color }}>
                     <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}` }} />
                     The Constraint
                   </h4>
                   <p className="text-theme-muted text-sm leading-relaxed font-light">{project.problem}</p>
                 </div>
                 <div className="relative pl-6 border-l border-theme-border hover:border-theme-border-strong transition-colors duration-500">
                   <h4 className="font-mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-3 text-theme-muted/70">
                     <Code2 className="h-3 w-3" />
                     Architecture & Protocol
                   </h4>
                   <p className="text-theme-muted text-sm leading-relaxed font-light">{project.architecture}</p>
                 </div>
                 <div className="relative pl-6 border-l border-theme-border hover:border-theme-border-strong transition-colors duration-500">
                   <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-secondary)] mb-3">Measurable Impact</h4>
                   <p className="text-theme-text text-sm leading-relaxed font-medium">{project.outcome}</p>
                   
                   <div className="grid grid-cols-3 gap-4 pt-6">
                     {project.metrics.map(m => (
                       <div key={m.label} className="flex flex-col">
                         <span className="font-mono text-[9px] uppercase tracking-widest text-theme-muted/70 mb-1.5">{m.label}</span>
                         <span className="font-mono text-base text-theme-text tracking-tight" style={{ color: project.color }}>{m.value}</span>
                       </div>
                     ))}
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-2 pt-6 pl-6">
                    {project.tech.map(t => (
                      <span key={t} className="font-mono text-[9px] uppercase px-3 py-1.5 bg-theme-surface border border-theme-border rounded shadow-[0_4px_10px_rgba(0,0,0,0.5)] text-theme-muted hover:text-theme-text hover:border-theme-border-strong hover:bg-white/[0.05] transition-all duration-300 transform hover:-translate-y-0.5">
                        {t}
                      </span>
                    ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ViewTrigger>
    </section>

    {/* Cinematic Project Takeover */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black text-white overflow-y-auto no-scrollbar"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--p-color)_0%,transparent_60%)] opacity-10 pointer-events-none" style={{ '--p-color': selectedProject.color } as any} />
            <div className="absolute inset-0 bg-grid-cyber opacity-[0.1] -z-10" />

            <div className="max-w-6xl mx-auto px-6 py-24 relative">
              <button 
                onClick={handleCloseSelect}
                onMouseEnter={() => audio.hover()}
                className="absolute top-12 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-50 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                 initial={{ y: 50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="flex flex-col mb-16"
              >
                 <div className="font-mono text-[10px] uppercase tracking-widest mb-6 flex items-center gap-3" style={{ color: selectedProject.color }}>
                   <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: selectedProject.color, boxShadow: `0 0 10px ${selectedProject.color}` }} />
                   PROJECT {selectedProject.id} // SECURE ARCHIVE
                 </div>
                 <h1 className="font-display text-5xl md:text-8xl tracking-tight font-medium leading-none mb-8">{selectedProject.title}</h1>
                 <p className="text-xl md:text-2xl text-white/60 max-w-3xl font-light">{selectedProject.value}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-16 mb-24">
                 <motion.div 
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.4, duration: 0.8 }}
                   className="flex flex-col bg-white/[0.02] border border-white/5 p-8 rounded-2xl"
                 >
                   <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4 border-b border-white/10 pb-4">The Constraint</h3>
                   <p className="text-white/80 leading-relaxed font-light">{selectedProject.problem}</p>
                 </motion.div>
                 
                 <motion.div 
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.5, duration: 0.8 }}
                   className="flex flex-col bg-white/[0.02] border border-white/5 p-8 rounded-2xl"
                 >
                   <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4 border-b border-white/10 pb-4">Architecture</h3>
                   <p className="text-white/80 leading-relaxed font-light">{selectedProject.architecture}</p>
                 </motion.div>
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-full relative rounded-2xl border border-white/10 bg-black overflow-hidden p-12 md:p-24 flex flex-col items-center justify-center text-center shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]"
              >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--p-color)]/5 pointer-events-none" style={{ '--p-color': selectedProject.color } as any} />
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] mb-12" style={{ color: selectedProject.color }}>Measurable Impact</h3>
                  <div className="text-3xl md:text-5xl tracking-tight leading-tight max-w-4xl font-medium mb-16">
                     "{selectedProject.outcome}"
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 w-full max-w-4xl border-t border-white/10 pt-16">
                     {selectedProject.metrics.map((m, i) => (
                       <div key={i} className="flex flex-col items-center gap-2">
                         <span className="text-4xl md:text-6xl font-mono text-white/90">{m.value}</span>
                         <span className="font-mono text-xs uppercase tracking-widest text-white/40">{m.label}</span>
                       </div>
                     ))}
                  </div>
              </motion.div>
              
              <div className="mt-24 flex justify-between items-center pt-8 border-t border-white/10">
                 <div className="flex flex-wrap gap-4">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="font-mono text-[10px] uppercase px-4 py-2 border border-white/10 rounded-full text-white/60">
                        {t}
                      </span>
                    ))}
                 </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
