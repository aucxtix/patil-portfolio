/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Identity } from "./components/Identity";
import { Metrics } from "./components/Metrics";
import { SkillsArchitecture } from "./components/SkillsArchitecture";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { Achievements } from "./components/Achievements";
import { CurrentFocus } from "./components/CurrentFocus";
import { ContactTerminal } from "./components/ContactTerminal";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { AnimatePresence } from "motion/react";

import { Cursor } from "./components/Cursor";

import { ThemeToggle } from "./components/ThemeToggle";
import { CommandPalette } from "./components/CommandPalette";
import { useGlobalShortcuts } from "./hooks/useGlobalShortcuts";
import { ToastSystem } from "./components/ToastSystem";
import { SecretDevMode } from "./components/SecretDevMode";
import { NetworkLatency } from "./components/NetworkLatency";

export default function App() {
  const [loading, setLoading] = useState(true);

  useGlobalShortcuts();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [loading]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-sans transition-colors duration-1000">
      <Cursor />
      <ThemeToggle />
      <NetworkLatency />
      <CommandPalette />
      <ToastSystem />
      <SecretDevMode />
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="flex min-h-screen flex-col animate-in fade-in duration-1000">
          <Navigation />
          <main className="flex-1 bg-theme-base">
            <Hero />
            <Identity />
            <Metrics />
            <SkillsArchitecture />
            <FeaturedProjects />
            <ExperienceTimeline />
            <Achievements />
            <CurrentFocus />
            <ContactTerminal />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
