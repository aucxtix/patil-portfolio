import React, { useRef, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

interface AmbientGlowProps {
  color?: string;
  opacity?: number;
  className?: string;
}

export function AmbientGlow({ 
  color = "var(--accent-cyan)", 
  opacity = 0.03,
  className = "" 
}: AmbientGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-screen pointer-events-none transition-opacity duration-1000"
        style={{
          background: useMotionTemplate`radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
          opacity,
          left: useMotionTemplate`calc(${mouseX}px - 400px)`,
          top: useMotionTemplate`calc(${mouseY}px - 400px)`,
        }}
      />
    </div>
  );
}
