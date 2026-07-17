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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
