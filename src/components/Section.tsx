import { ReactNode } from "react";
import { motion } from "motion/react";

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, filter: "brightness(1.5) contrast(1.2)", clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, filter: "brightness(1) contrast(1)", clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`py-32 scan-line-divider ${className}`}
    >
      <div className="mx-auto max-w-5xl px-6">
        {title && (
          <div className="mb-12 flex items-center gap-4">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-theme-text">
              {title}
            </h2>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
