import { motion } from "motion/react";
import { ReactNode } from "react";

interface ViewTriggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function ViewTrigger({
  children,
  className = "",
  delay = 0,
  yOffset = 40,
}: ViewTriggerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
