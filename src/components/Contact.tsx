import React from "react";
import { Section } from "./Section";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-medium text-theme-text mb-3">
            Let's build something.
          </h3>
          <p className="text-theme-muted mb-8 leading-relaxed max-w-md">
            I'm currently seeking new opportunities and challenges. Whether you have a question, a project idea, or just want to connect, feel free to reach out.
          </p>
          
          <div className="space-y-4">
            <ContactLink
              href="mailto:patilatharv104@gmail.com"
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value="patilatharv104@gmail.com"
            />
            <ContactLink
              href="https://github.com/atharv-patil"
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
              value="github.com/atharv-patil"
            />
            <ContactLink
              href="https://linkedin.com/in/atharv-patil"
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
              value="linkedin.com/in/atharv-patil"
            />
          </div>
        </div>
        
        <div className="rounded-xl border border-neutral-800 bg-theme-surface/80 backdrop-blur-md p-6 lg:p-8">
          <form className="space-y-4 text-sm">
            <div className="space-y-2">
              <label htmlFor="name" className="font-medium text-theme-muted block">Name</label>
              <input
                id="name"
                type="text"
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-theme-text placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="font-medium text-theme-muted block">Email</label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-theme-text placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="font-medium text-theme-muted block">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-theme-text placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors resize-none"
                placeholder="How can we work together?"
              ></textarea>
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-md bg-white py-2.5 px-4 text-center font-medium text-[#0a0a0a] transition-colors hover:bg-neutral-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}

function ContactLink({ href, icon, label, value }: { href: string; icon: React.ReactNode; label: string; value: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-lg border border-neutral-800/50 bg-theme-surface/80 backdrop-blur-md/50 p-4 transition-colors hover:border-neutral-700"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-900 text-theme-muted group-hover:text-theme-text transition-colors">
          {icon}
        </div>
        <div>
           <p className="text-sm font-medium text-neutral-200">{label}</p>
           <p className="text-xs font-mono text-theme-muted/70">{value}</p>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-theme-text" />
    </a>
  );
}
