import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { audio } from "../lib/audio";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  const [bootStage, setBootStage] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);

  // Sequences
  const sequence = [
    { text: "> whoami", delay: 500 },
    { text: "> scanning network...", delay: 1000 },
    { text: "> identity confirmed: Atharv Patil", delay: 1500 },
  ];

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    
    // Play type sound during boot
    if (!bootComplete) {
      const typeInterval = setInterval(() => {
        if (bootStage < sequence.length) audio.type();
      }, 100);
      timers.push(typeInterval);
    }

    if (bootStage < sequence.length) {
      const t = setTimeout(() => {
        setBootStage(bootStage + 1);
      }, sequence[bootStage].delay);
      timers.push(t);
    } else if (bootStage === sequence.length && !bootComplete) {
      const t = setTimeout(() => {
        audio.success();
        setBootComplete(true);
      }, 500);
      timers.push(t);
    }

    return () => timers.forEach(clearTimeout);
  }, [bootStage, bootComplete]);

  const skipBoot = () => {
    if (!bootComplete) {
      audio.success();
      setBootComplete(true);
    }
  };

  return (
    <section 
      onClick={skipBoot}
      className="relative flex min-h-screen flex-col justify-center px-6 border-b border-theme-border bg-theme-base overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-cyber opacity-[0.2] -z-10" />
      
      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <motion.div
            key="boot-sequence"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto font-mono text-sm md:text-base text-[var(--accent-primary)] flex flex-col gap-2"
          >
            {sequence.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: bootStage >= idx ? 1 : 0 }}
                className="flex items-center gap-2"
              >
                {step.text}
                {bootStage === idx && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-[var(--accent-primary)] inline-block" />}
              </motion.div>
            ))}
            {bootStage < sequence.length && (
               <div className="mt-8 text-theme-muted text-xs uppercase tracking-widest animate-pulse">Click anywhere to skip</div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="hero-content"
            style={{ y: yText, opacity: opacityText }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-6xl mx-auto flex flex-col z-10"
          >
            <div className="mb-8 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--accent-primary)] flex items-center gap-4">
              <span className="w-8 md:w-12 h-px bg-[var(--accent-primary)]/40" />
              IDENTITY_CONFIRMED
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-theme-text mb-6 leading-[1.1]">
              Atharv Patil
            </h1>

            <div className="max-w-2xl">
              <h2 className="text-xl md:text-2xl text-theme-muted font-light leading-relaxed mb-8">
                Cybersecurity & Networking Enthusiast · Python/Django Developer · Computer Engineering @ GTU
              </h2>
              
              <div className="flex flex-col gap-2 mb-12 border-l border-theme-border pl-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-secondary)]">Current Status</span>
                <p className="text-sm text-theme-muted">Open to internships & entry-level roles · Based in Gandhinagar, Gujarat, India</p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="#projects" 
                  onClick={() => audio.click()}
                  onMouseEnter={() => audio.hover()}
                  className="px-6 py-3 bg-theme-text text-theme-base font-mono text-xs uppercase tracking-widest hover:bg-[var(--accent-primary)] hover:text-white transition-colors flex items-center gap-2"
                >
                  View Work
                  <ArrowDown className="w-4 h-4" />
                </a>
                <a 
                  href="/resume.pdf" 
                  target="_blank"
                  onClick={() => audio.click()}
                  onMouseEnter={() => audio.hover()}
                  className="px-6 py-3 border border-theme-border text-theme-text font-mono text-xs uppercase tracking-widest hover:border-theme-border-strong transition-colors"
                >
                  Resume
                </a>
                <a 
                  href="#contact" 
                  onClick={() => audio.click()}
                  onMouseEnter={() => audio.hover()}
                  className="px-6 py-3 text-theme-muted hover:text-theme-text font-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
