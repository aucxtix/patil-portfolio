import { useEffect } from "react";
import { audio } from "../lib/audio";

export function useGlobalShortcuts() {
  useEffect(() => {
    let keyBuffer = "";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Code Logic ("sudo unlock")
      if (e.key.length === 1 || e.key === "Backspace") {
         if (e.key === "Backspace") {
           keyBuffer = keyBuffer.slice(0, -1);
         } else {
           keyBuffer += e.key;
           if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(1);
         }
         
         if (keyBuffer.toLowerCase().includes("sudo unlock")) {
            audio.success();
            window.dispatchEvent(new CustomEvent("toggle-dev-mode"));
            keyBuffer = "";
            window.dispatchEvent(
              new CustomEvent("show-toast", { 
                detail: { 
                  message: "DEV MODE UNLOCKED", 
                  subMessage: "Privileged access granted to system internals." 
                } 
              })
            );
         }
      }

      // Ignore if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Navigation shortcuts
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "j" || e.key === "k") {
        const sections = Array.from(document.querySelectorAll("main > *"));
        
        if (sections.length === 0) return;

        let currentIndex = -1;
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i] as HTMLElement;
          const rect = section.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= window.innerHeight / 2) {
            currentIndex = i;
            break;
          } else if (rect.top < 0 && rect.bottom > window.innerHeight / 2) {
            currentIndex = i;
            break;
          }
        }

        if (e.key === "ArrowDown" || e.key === "j") {
          e.preventDefault();
          audio.click();
          const nextIndex = currentIndex !== -1 ? Math.min(currentIndex + 1, sections.length - 1) : 0;
          sections[nextIndex].scrollIntoView({ behavior: "smooth" });
        } else if (e.key === "ArrowUp" || e.key === "k") {
          e.preventDefault();
          audio.click();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
          sections[prevIndex].scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
