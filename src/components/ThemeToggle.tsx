import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { audio } from "../lib/audio";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const updateThemeBasedOnTime = () => {
      const saved = localStorage.getItem("theme");
      if (saved) {
        if (saved === "light" && document.documentElement.getAttribute("data-theme") !== "light") {
          setTheme("light");
          document.documentElement.setAttribute("data-theme", "light");
        } else if (saved === "dark" && document.documentElement.getAttribute("data-theme") === "light") {
          setTheme("dark");
          document.documentElement.removeAttribute("data-theme");
        }
      } else {
        const hour = new Date().getHours();
        const isBusinessHours = hour >= 6 && hour < 18;
        const targetTheme = isBusinessHours ? "light" : "dark";
        
        if (targetTheme === "light" && document.documentElement.getAttribute("data-theme") !== "light") {
          setTheme("light");
          document.documentElement.setAttribute("data-theme", "light");
        } else if (targetTheme === "dark" && document.documentElement.getAttribute("data-theme") === "light") {
          setTheme("dark");
          document.documentElement.removeAttribute("data-theme");
        }
      }
    };

    updateThemeBasedOnTime();
    const interval = setInterval(updateThemeBasedOnTime, 60000); // Check every minute
    return () => clearInterval(interval);
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
      
      className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-theme-surface/80 backdrop-blur-md border border-theme-border shadow-lg shadow-[var(--accent-primary)]/10 transition-all hover:border-[var(--accent-primary)] group"
      aria-label="Toggle Theme"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          animate={{ scale: theme === "dark" ? 1 : 0, rotate: theme === "dark" ? 0 : -90, opacity: theme === "dark" ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute text-[var(--accent-cyan)] group-hover:text-[var(--accent-primary)] transition-colors"
        >
          <Moon className="h-6 w-6 fill-current" />
        </motion.div>
        
        <motion.div
          animate={{ scale: theme === "light" ? 1 : 0, rotate: theme === "light" ? 0 : 90, opacity: theme === "light" ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute text-[var(--accent-orange)] group-hover:text-[var(--accent-primary)] transition-colors"
        >
          <Sun className="h-6 w-6 fill-current" />
        </motion.div>
      </div>
    </motion.button>
  );
}
