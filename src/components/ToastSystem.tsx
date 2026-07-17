import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, FileText, X } from "lucide-react";

interface ToastProps {
  message: string;
  subMessage?: string;
}

export function ToastSystem() {
  const [toast, setToast] = useState<ToastProps | null>(null);

  useEffect(() => {
    const handleShowToast = (e: CustomEvent<ToastProps>) => {
      setToast(e.detail);
      setTimeout(() => {
        setToast((prev) => {
          if (prev?.message === e.detail.message) {
            return null;
          }
          return prev;
        });
      }, 4000);
    };

    window.addEventListener("show-toast" as any, handleShowToast);
    return () => window.removeEventListener("show-toast" as any, handleShowToast);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[9999] flex items-start gap-4 p-4 border border-[var(--accent-cyan)]/30 bg-theme-base/90 backdrop-blur-md rounded-lg shadow-[0_10px_40px_-10px_rgba(0,240,255,0.15)]"
        >
          <div className="flex-shrink-0 mt-0.5">
            <CheckCircle2 className="h-5 w-5 text-[var(--accent-cyan)]" />
          </div>
          <div className="flex flex-col gap-1 pr-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-cyan)]">
              {toast.message}
            </span>
            {toast.subMessage && (
              <span className="font-sans text-sm text-theme-muted">
                {toast.subMessage}
              </span>
            )}
          </div>
          <button
            onClick={() => setToast(null)}
            className="absolute top-4 right-4 text-theme-muted hover:text-[var(--accent-cyan)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function showToast(message: string, subMessage?: string) {
  window.dispatchEvent(
    new CustomEvent("show-toast", { detail: { message, subMessage } })
  );
}
