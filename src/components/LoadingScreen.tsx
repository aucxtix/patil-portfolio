import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useMemo } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void; key?: string }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [universeRevealed, setUniverseRevealed] = useState(false);
  const [fullyComplete, setFullyComplete] = useState(false);
  const [coalescing, setCoalescing] = useState(false);

  const texts = [
    "SIGNAL DETECTED...",
    "ESTABLISHING CONNECTION...",
    "AUTHENTICATING VISITOR...",
    "ACCESSING ENGINEERING DATABASE..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUniverseRevealed(true);
            setTimeout(() => {
              setCoalescing(true);
              setTimeout(() => {
                setFullyComplete(true);
                setTimeout(() => {
                  onComplete();
                }, 800); // Wait for final fade out
              }, 1200); // Duration of the coalescing
            }, 3000); // Duration of the universe drifting
          }, 400);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 2;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 20) setTextIndex(1);
    if (progress > 55) setTextIndex(2);
    if (progress > 85) setTextIndex(3);
  }, [progress]);

  // Generate Universe Data
  const stars = useMemo(() => Array.from({ length: 200 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    delay: Math.random() * 1.5,
  })), []);

  const constellations = useMemo(() => [
    { nodes: [{x: 20, y: 30}, {x: 35, y: 25}, {x: 45, y: 40}, {x: 30, y: 55}], color: "var(--accent-cyan)", label: "SYSTEM ARCHITECTURE" },
    { nodes: [{x: 70, y: 20}, {x: 85, y: 35}, {x: 80, y: 50}, {x: 65, y: 45}], color: "var(--accent-purple)", label: "NEURAL NETWORK" },
    { nodes: [{x: 25, y: 70}, {x: 40, y: 85}, {x: 55, y: 75}], color: "var(--accent-cyan)", label: "ENCRYPTED PAYLOAD" },
    { nodes: [{x: 60, y: 65}, {x: 75, y: 80}, {x: 90, y: 70}], color: "var(--accent-orange)", label: "GLOBAL INFRASTRUCTURE" },
  ], []);

  return (
    <AnimatePresence>
      {!fullyComplete && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
           transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
           className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000] text-[#fff] font-mono overflow-hidden"
        >
          {/* Data Universe Background */}
          <motion.div
             className="absolute inset-0 z-0 flex items-center justify-center"
             initial={{ scale: 0.8, opacity: 0 }}
             animate={universeRevealed ? { scale: 1.1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
             transition={{ duration: 4.5, ease: "easeOut" }}
          >
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08),transparent_60%)]" />
             
             {/* Stars Nebulae */}
             {stars.map((star, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{ width: star.size, height: star.size }}
                  initial={{ left: `${star.x}%`, top: `${star.y}%`, opacity: 0 }}
                  animate={
                    coalescing 
                      ? { left: '50%', top: '50%', opacity: 0, scale: 0 }
                      : universeRevealed 
                      ? { left: `${star.x}%`, top: `${star.y}%`, opacity: star.opacity, scale: 1 } 
                      : { left: `${star.x}%`, top: `${star.y}%`, opacity: 0, scale: 1 }
                  }
                  transition={
                    coalescing 
                      ? { duration: 0.8 + Math.random() * 0.4, ease: "backIn" }
                      : { duration: 1.5, delay: star.delay }
                  }
                />
             ))}

             {/* Constellations */}
             <motion.svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                animate={coalescing ? { opacity: 0, scale: 0.2 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "backIn" }}
                style={{ transformOrigin: "center center" }}
             >
                {constellations.map((c, i) => (
                  <g key={`constellation-${i}`}>
                    {c.nodes.map((n, j) => {
                      if (j === 0) return null;
                      const prev = c.nodes[j-1];
                      return (
                        <motion.line
                          key={`line-${i}-${j}`}
                          x1={`${prev.x}%`} y1={`${prev.y}%`}
                          x2={`${n.x}%`} y2={`${n.y}%`}
                          stroke={c.color}
                          strokeWidth="1"
                          strokeOpacity={0.4}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={universeRevealed ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                          transition={{ duration: 1.5, delay: i * 0.4 + j * 0.2 }}
                        />
                      );
                    })}
                    {c.nodes.map((n, j) => (
                      <g key={`node-${i}-${j}`}>
                        <motion.circle
                          cx={`${n.x}%`} cy={`${n.y}%`}
                          r="2.5"
                          fill={c.color}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={universeRevealed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ duration: 0.8, delay: i * 0.4 + j * 0.2 }}
                        />
                        <motion.circle
                          cx={`${n.x}%`} cy={`${n.y}%`}
                          r="8"
                          fill="none"
                          stroke={c.color}
                          strokeWidth="0.5"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={universeRevealed ? { scale: [1, 2, 1], opacity: [0, 0.5, 0] } : { scale: 0, opacity: 0 }}
                          transition={{ duration: 2, delay: i * 0.4 + j * 0.2, repeat: Infinity }}
                        />
                        {j === c.nodes.length - 1 && (
                          <motion.text
                            x={`${n.x + 1}%`} y={`${n.y - 1}%`}
                            fill="white"
                            fontSize="8px"
                            opacity={0.6}
                            letterSpacing="0.2em"
                            initial={{ opacity: 0 }}
                            animate={universeRevealed ? { opacity: 0.6 } : { opacity: 0 }}
                            transition={{ duration: 1, delay: i * 0.4 + j * 0.2 + 0.5 }}
                          >
                             {c.label}
                          </motion.text>
                        )}
                      </g>
                    ))}
                  </g>
                ))}
             </motion.svg>
          </motion.div>

          {/* Core Loading Content */}
          <motion.div 
            className="z-30 w-full max-w-[320px] px-6"
            animate={universeRevealed ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="mb-4 flex flex-col items-start gap-3 justify-center text-[10px] tracking-widest uppercase">
              <motion.span 
                 key={textIndex}
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-white/60"
              >
                {texts[textIndex]}
              </motion.span>
              <span className="text-[var(--accent-cyan)] font-bold ml-0 text-xs">
                {progress > 100 ? 100 : progress}%
              </span>
            </div>
            
            <div className="relative h-px w-full bg-white/10 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-[shimmer_1.5s_infinite]" />
               
               <motion.div 
                 className="absolute top-0 bottom-0 left-0 bg-[var(--accent-cyan)] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                 initial={{ width: "0%" }}
                 animate={{ width: `${progress}%` }}
                 transition={{ ease: "linear", duration: 0.1 }}
               />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
