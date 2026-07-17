import { ArrowUpRight, Mail, Linkedin, Github, FileText } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { motion, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import { AmbientGlow } from "./AmbientGlow";
import { ViewTrigger } from "./ViewTrigger";
import { audio } from "../lib/audio";

export function ContactTerminal() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section id="contact" ref={containerRef} className="py-32 px-6 scan-line-divider bg-theme-base relative overflow-hidden bg-mesh-dark group/section">
      <AmbientGlow color="var(--accent-secondary)" opacity={0.06} className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[var(--accent-primary)] opacity-[0.02] blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      <ViewTrigger className="mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center">
        
        {/* Generative AI Speech Line */}
        <motion.div 
          className="flex flex-col items-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-12 h-12 rounded-full border border-[var(--accent-primary)]/30 flex items-center justify-center relative bg-black">
             <div className="absolute inset-0 rounded-full border border-[var(--accent-primary)]/50 animate-[ping_3s_infinite] opacity-30" />
             <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]" />
          </div>
          <div className="font-mono text-xs md:text-sm text-theme-muted flex flex-col gap-2 uppercase tracking-widest">
            <span>&gt; End of profile.</span>
            <span>&gt; Assessment complete.</span>
            <span className="text-[var(--accent-primary)]">&gt; Engineering potential: High.</span>
            <span className="mt-4 text-theme-text">&gt; Would you like to establish contact?</span>
          </div>
        </motion.div>

        {/* Links Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
           <Magnetic intensity={0.1}>
             <a href="mailto:patilatharv104@gmail.com" onMouseEnter={() => audio.hover()} onClick={() => audio.click()} className="w-full flex flex-col items-center justify-center h-32 bg-theme-surface border border-theme-border rounded-xl hover:border-theme-border-strong transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-theme-base opacity-0 group-hover:opacity-100 transition-opacity" />
                <Mail className="w-6 h-6 text-theme-muted group-hover:text-theme-text mb-3 transition-colors" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-theme-muted group-hover:text-theme-text transition-colors mb-2">Initialize</span>
                <span className="font-display font-medium text-theme-text tracking-tight text-xl">Email</span>
             </a>
           </Magnetic>

           <Magnetic intensity={0.1}>
             <a href="https://www.linkedin.com/in/atharv-patil-ldrp/" target="_blank" rel="noreferrer" onMouseEnter={() => audio.hover()} onClick={() => audio.click()} className="w-full flex flex-col items-center justify-center h-32 bg-theme-surface border border-theme-border rounded-xl hover:border-[var(--accent-secondary)]/40 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent-secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Linkedin className="w-6 h-6 text-theme-muted group-hover:text-theme-text mb-3 transition-colors" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-theme-muted group-hover:text-theme-text transition-colors mb-2">Connect</span>
                <span className="font-display font-medium text-theme-text tracking-tight text-xl">LinkedIn</span>
             </a>
           </Magnetic>

           <Magnetic intensity={0.1}>
             <a href="https://github.com/aucxtix" target="_blank" rel="noreferrer" onMouseEnter={() => audio.hover()} onClick={() => audio.click()} className="w-full flex flex-col items-center justify-center h-32 bg-theme-surface border border-theme-border rounded-xl hover:border-[var(--accent-primary)]/40 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent-primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Github className="w-6 h-6 text-theme-muted group-hover:text-theme-text mb-3 transition-colors" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-theme-muted group-hover:text-theme-text transition-colors mb-2">Verify</span>
                <span className="font-display font-medium text-theme-text tracking-tight text-xl">GitHub</span>
             </a>
           </Magnetic>

           <Magnetic intensity={0.1}>
             <a href="/resume.pdf" target="_blank" onMouseEnter={() => audio.hover()} onClick={(e) => {
                 audio.click();
                 window.dispatchEvent(
                    new CustomEvent("show-toast", { detail: { message: "Extraction Initialized", subMessage: "Secure transmission of resume payload started." }})
                 );
             }} className="w-full flex flex-col items-center justify-center h-32 bg-theme-surface border border-theme-border rounded-xl hover:border-theme-border-strong transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-theme-base opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileText className="w-6 h-6 text-theme-muted group-hover:text-theme-text mb-3 transition-colors" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-theme-muted group-hover:text-theme-text transition-colors mb-2">Extract</span>
                <span className="font-display font-medium text-theme-text tracking-tight text-xl">Resume</span>
             </a>
           </Magnetic>
        </div>

      </ViewTrigger>
    </section>
  );
}
