import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, MessageSquare, Code, Cpu, Shield, Send } from "lucide-react";
import { audio } from "../lib/audio";

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
        if (index % 3 === 0) audio.type();
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <span>{displayedText}</span>;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai'|'user', content: string}[]>([
    { role: 'ai', content: 'Hello. I am AP\'s digital intelligence system. I can answer anything about AP\'s engineering capabilities, tech stack, or objectives. What would you like to know?' }
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedResponses: Record<string, string> = {
    "projects": "Atharv has engineered several highly resilient systems, including a distributed packet sniffer scaling to 10k+ pkts/s, and optimized memory safety paradigms fixing 40+ kernel vulnerabilities.",
    "skills": "Primary stack: Python, C, Java, Linux Internals, Elasticsearch, Kubernetes. Confidence level is extremely high in backend logic and structural performance.",
    "future": "The objective is eliminating single points of failure in global infrastructure.",
    "resume": "Extracting Resumé. (Check your popups/downloads)"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    audio.click();
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputVal("");
    
    // Simple mock logic
    setTimeout(() => {
      let reply = "I am restricted from answering that query. Try asking about 'projects', 'skills', or 'future'.";
      const lower = text.toLowerCase();
      if (lower.includes("project")) reply = predefinedResponses["projects"];
      else if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech")) reply = predefinedResponses["skills"];
      else if (lower.includes("future") || lower.includes("goal")) reply = predefinedResponses["future"];
      else if (lower.includes("resume") || lower.includes("cv")) {
        reply = predefinedResponses["resume"];
        window.open("/resume.pdf", "_blank");
      }
      
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
      audio.success();
    }, 800);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[90]">
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { audio.click(); setIsOpen(true); }}
            onMouseEnter={() => audio.hover()}
            className="w-14 h-14 rounded-full bg-theme-surface/80 backdrop-blur-md border border-[var(--accent-primary)]/30 shadow-[0_0_20px_var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[var(--accent-primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bot className="w-6 h-6 z-10" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--accent-primary)] blur-[15px] opacity-40 group-hover:opacity-80 transition-opacity" />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-48px)] bg-theme-base border border-theme-border rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_var(--accent-primary)] z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-theme-border flex items-center justify-between bg-theme-surface/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center relative">
                   <div className="absolute inset-0 rounded-full border border-[var(--accent-primary)] animate-[ping_3s_infinite] opacity-20" />
                   <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase text-theme-text font-medium">AP Intelligence</span>
                  <span className="font-mono text-[9px] text-[var(--accent-primary)] uppercase tracking-widest">Online & Monitoring</span>
                </div>
              </div>
              <button 
                onClick={() => { audio.click(); setIsOpen(false); }} 
                onMouseEnter={() => audio.hover()}
                className="text-theme-muted hover:text-theme-text transition-colors"
               >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative custom-scrollbar">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-primary),transparent_70%)] opacity-5 pointer-events-none" />
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <span className={`text-[9px] font-mono mb-1 tracking-widest ${msg.role === 'user' ? 'text-theme-muted/50' : 'text-[var(--accent-primary)]/70'}`}>
                    {msg.role === 'user' ? 'GUEST' : 'SYSTEM'}
                  </span>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-theme-surface text-theme-text border border-theme-border rounded-br-sm' 
                    : 'bg-[var(--accent-primary)]/10 text-theme-text border border-[var(--accent-primary)]/20 rounded-bl-sm font-mono text-xs'
                  }`}>
                    {msg.role === 'ai' ? <TypewriterText text={msg.content} /> : msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-theme-border bg-theme-surface/30">
               <div className="flex flex-wrap gap-2 mb-3">
                 {['Projects', 'Skills', 'Future Vision'].map(suggestion => (
                   <button 
                     key={suggestion}
                     onClick={() => handleSend(suggestion)}
                     onMouseEnter={() => audio.hover()}
                     className="text-[10px] font-mono px-3 py-1.5 rounded-full border border-theme-border text-theme-muted hover:text-theme-text hover:bg-theme-surface transition-colors whitespace-nowrap"
                   >
                     {suggestion}
                   </button>
                 ))}
               </div>
               <form 
                 onSubmit={e => { e.preventDefault(); handleSend(inputVal); }}
                 className="relative flex items-center"
               >
                 <input 
                   ref={inputRef}
                   value={inputVal}
                   onChange={e => { setInputVal(e.target.value); audio.type(); }}
                   placeholder="Query the system..."
                   className="w-full bg-theme-base border border-theme-border rounded-xl pl-4 pr-12 py-3 text-sm text-theme-text focus:outline-none focus:border-[var(--accent-primary)]/50 font-mono placeholder:text-theme-muted/50 transition-colors"
                 />
                 <button 
                   type="submit"
                   disabled={!inputVal.trim()}
                   onMouseEnter={() => audio.hover()}
                   className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-lg bg-theme-surface text-theme-muted hover:text-theme-text hover:bg-theme-border disabled:opacity-50 transition-colors"
                 >
                   <Send className="w-4 h-4" />
                 </button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
