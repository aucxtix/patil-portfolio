import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, FileText, Github, Linkedin, Terminal, X, Code, Network, Server, ArrowUp } from "lucide-react";
import { PROJECTS } from "./FeaturedProjects";
import { audio } from "../lib/audio";

interface CommandDef {
  id: string;
  title: string;
  category: string;
  icon: any;
  action: () => void;
}

const COMMANDS: CommandDef[] = [
  { id: "nav-top", title: "Top of Stack", category: "Navigation", icon: ArrowUp, action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { id: "nav-identity", title: "Identity Kernel", category: "Navigation", icon: Compass, action: () => document.getElementById("identity")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "nav-skills", title: "Capability Matrix", category: "Navigation", icon: Code, action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "nav-projects", title: "Selected Engineering", category: "Navigation", icon: Server, action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "nav-timeline", title: "Operational Path", category: "Navigation", icon: Network, action: () => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "nav-contact", title: "Establish Connection", category: "Navigation", icon: Terminal, action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "act-resume", title: "Extract Resumé", category: "Links", icon: FileText, action: () => {
      window.dispatchEvent(
        new CustomEvent("show-toast", { 
          detail: { message: "Extraction Initialized", subMessage: "Secure transmission of resume payload started." } 
        })
      );
      window.open("/resume.pdf", "_blank");
  } },
  { id: "act-github", title: "Verify Source (GitHub)", category: "Links", icon: Github, action: () => window.open("https://github.com/aucxtix", "_blank") },
  { id: "act-linkedin", title: "Establish Link (LinkedIn)", category: "Links", icon: Linkedin, action: () => window.open("https://linkedin.com/in/atharvpatil110", "_blank") },
];

const PROJECT_COMMANDS: CommandDef[] = PROJECTS.map((project) => ({
  id: `project-${project.id.toLowerCase()}`,
  title: `Project: ${project.title}`,
  category: "Projects",
  icon: Server,
  action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
}));

const ALL_COMMANDS = [...COMMANDS, ...PROJECT_COMMANDS];

function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold px-0.5 rounded">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        audio.click();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpenConsole = () => {
      setIsOpen(true);
      audio.click();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenConsole);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenConsole);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch("");
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const filteredCommands = ALL_COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) || 
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "j")) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      audio.hover();
    } else if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "k")) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      audio.hover();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        audio.success();
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  const handleSelect = (index: number) => {
    if (filteredCommands[index]) {
      audio.success();
      filteredCommands[index].action();
      setIsOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    audio.type();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] bg-theme-base/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-xl pointer-events-auto bg-theme-base border border-theme-border-strong rounded-xl shadow-2xl overflow-hidden flex flex-col"
              style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5), 0 0 40px var(--accent-primary-hover)' }}
            >
              <div className="flex items-center px-4 py-3 border-b border-theme-border bg-theme-surface/30">
                <Terminal className="h-5 w-5 text-theme-muted mr-3" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Execute command... (e.g. Nav, Link)"
                  className="flex-1 bg-transparent border-none outline-none text-theme-text font-mono text-sm placeholder:text-theme-muted"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => audio.hover()}
                  className="text-theme-muted hover:text-theme-text p-1.5 rounded-md hover:bg-theme-surface transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-theme-muted font-mono text-sm">
                    No matching protocols found.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((command, idx) => {
                      const Icon = command.icon;
                      const isSelected = idx === selectedIndex;
                      
                      return (
                        <div
                          key={command.id}
                          className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-none transition-all duration-200 ${
                            isSelected ? 'bg-theme-surface border border-theme-border-strong pl-4' : 'border border-transparent hover:bg-theme-surface/50'
                          }`}
                          onMouseEnter={() => {
                            if (selectedIndex !== idx) audio.hover();
                            setSelectedIndex(idx);
                          }}
                          onClick={() => handleSelect(idx)}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`h-4 w-4 ${isSelected ? 'text-[var(--accent-primary)]' : 'text-theme-muted'}`} />
                            <span className={`font-mono text-xs tracking-wide ${isSelected ? 'text-theme-text' : 'text-theme-muted'}`}>
                              <HighlightedText text={command.title} highlight={search} />
                            </span>
                          </div>
                          <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border transition-colors ${
                            isSelected ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5' : 'text-theme-muted/50 border-theme-border'
                          }`}>
                            <HighlightedText text={command.category} highlight={search} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="px-4 py-3 border-t border-theme-border bg-theme-surface/50 flex items-center justify-between">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent-primary)] flex items-center gap-2">
                  System Command Console
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-theme-muted flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="flex items-center justify-center h-4 w-4 rounded border border-theme-border bg-theme-base">↑</span>
                    <span className="flex items-center justify-center h-4 w-4 rounded border border-theme-border bg-theme-base">↓</span> navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="flex items-center justify-center h-4 w-6 rounded border border-theme-border bg-theme-base">↵</span> execute
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
