import { Section } from "./Section";

const EXPERIENCES = [
  {
    role: "Software Engineering Intern",
    company: "Tech Innovators Inc.",
    date: "Summer 2025",
    description: "Engineered scalable RESTful microservices for the core billing platform, optimizing query performance by 40% and deploying using Docker and Kubernetes context.",
  },
  {
    role: "Backend Lead",
    company: "University Software Club",
    date: "Aug 2024 - Present",
    description: "Managing a team of 5 developers to build the backend infrastructure for the university's event management system. Set up CI/CD pipelines yielding a 50% faster deployment rate.",
  },
  {
    role: "Freelance Full-stack Developer",
    company: "Independent",
    date: "Jan 2024 - Present",
    description: "Developed and delivered modern web applications for local businesses, focusing on clean UI/UX and robust serverless backends.",
  },
];

export function Experience() {
  return (
    <Section id="experience" title="Experience & Journey">
      <div className="relative border-l border-neutral-800 ml-3 space-y-12">
        {EXPERIENCES.map((exp, index) => (
          <div key={index} className="relative pl-8">
            <span className="absolute -left-[5px] top-1.5 flex h-[9px] w-[9px] rounded-full bg-neutral-600 ring-4 ring-[#0a0a0a]" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="font-display text-lg font-medium text-theme-text">
                {exp.role}
              </h3>
              <span className="font-mono text-sm text-theme-muted/70 mt-1 sm:mt-0">
                {exp.date}
              </span>
            </div>
            <p className="text-theme-muted font-medium mb-3">{exp.company}</p>
            <p className="text-theme-muted leading-relaxed max-w-3xl">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
