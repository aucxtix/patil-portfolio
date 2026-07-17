import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="~/about">
      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-theme-muted">
          <p>
            Computer Engineering student at LDRP Institute of Technology & Research (GTU), 2024–2028, building hands-on experience across cybersecurity, networking, and backend development.
          </p>
          <p>
            Shipped real internship work, coordinated a 300+ person tech fest, and placed as a finalist in two hackathons this year.
          </p>
          <p>
            Currently contributing to open source via GirlScript Summer of Code and Nexus Spring of Code.
          </p>
        </div>
        <div className="flex flex-col space-y-4 font-mono text-sm">
          <div className="flex flex-col space-y-1 border-l border-theme-border pl-4 py-1">
            <span className="text-theme-muted/70 text-xs uppercase tracking-widest">Location</span>
            <span className="text-theme-text">Gandhinagar, India</span>
          </div>
          <div className="flex flex-col space-y-1 border-l border-theme-border pl-4 py-1">
            <span className="text-theme-muted/70 text-xs uppercase tracking-widest">Education</span>
            <span className="text-theme-text">Computer Engineering</span>
            <span className="text-theme-muted text-xs">LDRP-ITR (GTU) '28</span>
          </div>
          <div className="flex flex-col space-y-1 border-l border-theme-border pl-4 py-1">
            <span className="text-theme-muted/70 text-xs uppercase tracking-widest">Focus</span>
            <span className="text-theme-text">Cybersecurity & Backend</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
