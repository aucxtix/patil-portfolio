import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { audio } from "../lib/audio";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  useEffect(() => {
    const handleToggleEvent = () => {
      audio.click();
      toggleTheme();
    };
    window.addEventListener('toggle-theme', handleToggleEvent);
    return () => window.removeEventListener('toggle-theme', handleToggleEvent);
  }, [theme]);

  // Expose an audio click on the actual button element. Note: 'toggle-theme' event might also fire audio.click() 
  // if invoked through the command palette.
  const handleButtonClick = () => {
    audio.click();
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleButtonClick}
      onMouseEnter={() => audio.hover()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      
      className="fixed bottom-6 right-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full glass-panel transition-all hover:border-[var(--border-strong)]"
      aria-label="Toggle Theme"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          animate={{ scale: theme === "dark" ? 1 : 0, rotate: theme === "dark" ? 0 : -90, opacity: theme === "dark" ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute text-[var(--accent-cyan)]"
        >
          <Moon className="h-5 w-5 fill-current opacity-20" />
        </motion.div>
        
        <motion.div
          animate={{ scale: theme === "light" ? 1 : 0, rotate: theme === "light" ? 0 : 90, opacity: theme === "light" ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute text-[var(--accent-orange)]"
        >
          <Sun className="h-5 w-5 fill-current opacity-20" />
        </motion.div>
      </div>
    </motion.button>
  );
}
