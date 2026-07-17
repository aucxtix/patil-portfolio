import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { motion, useScroll } from "motion/react";
import { Command, Volume2, VolumeX } from "lucide-react";
import { audio } from "../lib/audio";

const NAV_LINKS = [
  { name: "~/about", href: "#about" },
  { name: "~/projects", href: "#projects" },
  { name: "~/experience", href: "#timeline" },
  { name: "~/contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const [soundEnabled, setSoundEnabled] = useState(audio.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-6 transition-all duration-500",
        scrolled
          ? "bg-theme-base/80 backdrop-blur-xl border-b border-theme-border"
          : "bg-transparent"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--accent-primary)] opacity-70 origin-left z-[100] shadow-[0_0_10px_var(--accent-primary)]"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between mt-1">
        <a
          href="#"
          onClick={() => audio.click()}
          onMouseEnter={() => audio.hover()}
          className="font-display text-sm font-bold tracking-widest text-theme-text hover:text-theme-muted transition-colors uppercase"
        >
          Atharv<span className="text-neutral-600 font-mono font-normal ml-2">sys_01</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => audio.click()}
              onMouseEnter={() => audio.hover()}
              className="text-[10px] uppercase tracking-[0.2em] font-medium text-theme-muted/70 hover:text-theme-text transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 border border-theme-border/50 bg-theme-surface/30 px-3 py-1.5 rounded-full mr-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_8px_var(--accent-primary)]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-theme-muted">Available for work</span>
          </div>
          <button
             onClick={() => {
               const newState = audio.toggle();
               setSoundEnabled(newState);
               if (newState) audio.click();
             }}
             onMouseEnter={() => audio.hover()}
             className="hidden md:flex items-center gap-2 border border-theme-border px-3 py-1.5 rounded-md hover:border-theme-border-strong transition-colors bg-theme-surface/50 group"
             title={soundEnabled ? "Mute Sound" : "Enable Sound"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-theme-muted group-hover:text-[var(--accent-primary)] transition-colors" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-theme-muted/50 transition-colors" />
            )}
          </button>
          <button
             onClick={() => {
               audio.click();
               window.dispatchEvent(new CustomEvent('open-command-palette'));
             }}
             onMouseEnter={() => audio.hover()}
             className="hidden md:flex items-center gap-2 border border-theme-border px-3 py-1.5 rounded-md hover:border-theme-border-strong transition-colors bg-theme-surface/50 group"
             
          >
            <Command className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text transition-colors" />
            <span className="font-mono text-[10px] text-theme-muted group-hover:text-theme-text uppercase tracking-widest transition-colors">Menu</span>
            <div className="flex items-center gap-0.5 ml-1">
              <span className="text-[9px] text-theme-muted bg-theme-base border border-theme-border px-1 rounded shadow-sm">⌘</span>
              <span className="text-[9px] text-theme-muted bg-theme-base border border-theme-border px-1 rounded shadow-sm">K</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
