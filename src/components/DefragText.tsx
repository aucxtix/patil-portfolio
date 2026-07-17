import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimationFrame } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789";

export function DefragText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState(() => 
    text.split("").map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
  );
  
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isGlitching, setIsGlitching] = useState(false);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsGlitching(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  useAnimationFrame((time) => {
    if (!isGlitching) return;
    if (startTime.current === null) {
      startTime.current = time;
    }
    
    const elapsed = time - startTime.current;
    
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
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.1, delay }}
    >
      {displayText}
    </motion.span>
  );
}
