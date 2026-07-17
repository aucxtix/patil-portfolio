import { Section } from "./Section";
import { Github, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Distributed Task Queue",
    description: "A high-performance, fault-tolerant distributed task queue built for high-throughput asynchronous processing.",
    problem: "Needed a reliable way to process background jobs across multiple worker nodes without data loss during node failures.",
    technologies: ["Go", "Redis", "Docker", "gRPC"],
    github: "https://github.com/atharv-patil",
    demo: null,
  },
  {
    title: "E-Commerce Microservices Engine",
    description: "A robust backend engine for scalable e-commerce platforms using domain-driven design.",
    problem: "Monolithic e-commerce platforms struggle with independent scaling of inventory, orders, and payment domains.",
    technologies: ["Node.js", "Express", "PostgreSQL", "RabbitMQ"],
    github: "https://github.com/atharv-patil",
    demo: null,
  },
  {
    title: "Real-time Metrics Aggregator",
    description: "Telemetry ingestion pipeline capable of handling millions of data points per minute for application monitoring.",
    problem: "Existing solutions were either too expensive or too difficult to self-host for small to medium scale applications.",
    technologies: ["Python", "FastAPI", "TimescaleDB", "React"],
    github: "https://github.com/atharv-patil",
    demo: "https://example.com",
  },
];

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="group relative flex flex-col rounded-xl border border-neutral-800 bg-theme-surface/80 backdrop-blur-md p-6 lg:flex-row lg:p-8 hover:border-neutral-700 transition-colors"
          >
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-medium text-theme-text">
                  {project.title}
                </h3>
                <p className="mt-3 text-theme-muted leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mt-4 border-l-2 border-neutral-800 pl-4 py-1">
                  <p className="text-sm text-theme-muted/70">
                    <strong className="font-medium text-theme-muted">Problem:</strong> {project.problem}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-neutral-900 px-2 py-1 font-mono text-xs text-theme-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-theme-muted transition-colors hover:text-theme-text"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-theme-muted transition-colors hover:text-theme-text"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
            
            {/* Minimal Placeholder for thumbnail area - in a real app this might be an image */}
            <div className="mt-8 hidden w-full shrink-0 overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 lg:ml-8 lg:mt-0 lg:flex lg:w-[400px] items-center justify-center relative">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
               <span className="font-mono text-neutral-700 select-none">System Architecture Preview</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
