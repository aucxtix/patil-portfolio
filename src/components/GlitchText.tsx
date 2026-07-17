import { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789";

export function GlitchText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState(() => 
    text.split("").map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
  );
  const startTime = useRef<number | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGlitching(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useAnimationFrame((time) => {
    if (!isGlitching) return;
    if (startTime.current === null) {
      startTime.current = time;
    }
    
    const elapsed = time - startTime.current;
    
    // We update the glitch characters rapidly
    const duration = 1200; // 1.2s total scramble time
    const progress = Math.min(elapsed / duration, 1);
    const iterations = progress * text.length;
    
    setDisplayText(
      text.split("").map((char, i) => {
        if (char === " ") return " ";
        if (i < iterations) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("")
    );
    
    if (progress === 1) {
      setIsGlitching(false);
    }
  });

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay }}
    >
      {displayText}
    </motion.span>
  );
}
