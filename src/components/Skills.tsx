import { Section } from "./Section";
import { Terminal, Database, Layout, Server, Cpu, Cloud, GitBranch, Wrench } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: <Terminal className="h-4 w-4" />,
    skills: ["TypeScript", "Python", "Java", "C++", "SQL", "Go"],
  },
  {
    title: "Backend",
    icon: <Server className="h-4 w-4" />,
    skills: ["Node.js", "Express", "Django", "FastAPI", "REST APIs", "GraphQL"],
  },
  {
    title: "Frontend",
    icon: <Layout className="h-4 w-4" />,
    skills: ["React", "Next.js", "Tailwind CSS", "HTML5/CSS3", "Framer Motion"],
  },
  {
    title: "Databases",
    icon: <Database className="h-4 w-4" />,
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma ORM"],
  },
  {
    title: "Cloud & Dev Setup",
    icon: <Cloud className="h-4 w-4" />,
    skills: ["AWS", "Docker", "Linux", "Nginx", "CI/CD"],
  },
  {
    title: "Version Control",
    icon: <GitBranch className="h-4 w-4" />,
    skills: ["Git", "GitHub", "GitLab"],
  },
];

export function Skills() {
  return (
    <Section id="skills" title="Technical Stack">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="group rounded-lg border border-neutral-800/50 bg-theme-surface/80 backdrop-blur-md p-6 transition-colors hover:border-neutral-700"
          >
            <div className="mb-4 flex items-center gap-3 font-medium text-neutral-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-theme-muted group-hover:text-theme-text transition-colors">
                {category.icon}
              </span>
              <span>{category.title}</span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md bg-neutral-900/50 px-2.5 py-1 text-sm font-medium text-theme-muted border border-neutral-800/50"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
