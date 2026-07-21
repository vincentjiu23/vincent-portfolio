"use client";

import React from "react";
import content from "@/data/content.json";
import CodeWindowCard from "@/components/ui/CodeWindowCard";
import { motion } from "framer-motion";
import { Briefcase, Rocket, Award, GraduationCap, Flag, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const eventIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  work: { icon: <Briefcase size={14} />, color: "text-primary bg-primary/10 border-primary/20" },
  release: { icon: <Rocket size={14} />, color: "text-accent-rose bg-accent-rose/10 border-accent-rose/20" },
  cert: { icon: <Award size={14} />, color: "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20" },
  award: { icon: <Flag size={14} />, color: "text-accent-blue bg-accent-blue/10 border-accent-blue/20" },
  education: { icon: <GraduationCap size={14} />, color: "text-text-main bg-canvas border-hairline-strong" },
  project: { icon: <Code2 size={14} />, color: "text-primary bg-primary/10 border-primary/20" },
  milestone: { icon: <Flag size={14} />, color: "text-text-muted bg-canvas border-hairline" },
};

export default function ExperienceSection() {
  return (
    <section className="container mx-auto px-6 py-section" id="experience">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="display-lg text-text-main max-w-2xl">Event stream.</h2>
        <p className="text-text-muted text-lg max-w-xl">
          A chronological log of key milestones, achievements, and career events.
        </p>
      </div>

      <CodeWindowCard title="events.log" className="max-w-4xl">
        <div className="flex flex-col gap-2 p-2">
          <div className="text-[12px] text-text-muted mb-6">// Tailing /var/log/career.log</div>
          
          {content.experience.map((exp, yearIndex) => (
            <motion.div
              key={yearIndex}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
            >
              {/* Year Header */}
              <div className="flex items-center gap-4 mb-4 mt-8 first:mt-0">
                <div className="text-primary font-bold text-[18px] font-mono tracking-wider">{exp.year}</div>
                <div className="flex-1 h-px bg-hairline"></div>
                <div className="text-[12px] text-text-muted font-semibold uppercase">{exp.events.length} event{exp.events.length !== 1 ? "s" : ""}</div>
              </div>

              {/* Events */}
              <div className="flex flex-col gap-3 pl-5 border-l border-hairline ml-2">
                {exp.events.map((event, eventIndex) => {
                  const eventStyle = eventIcons[event.type] || eventIcons.milestone;
                  return (
                    <motion.div
                      key={eventIndex}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (yearIndex * exp.events.length + eventIndex) * 0.05 }}
                      className="relative flex items-start gap-4 py-3 group hover:bg-surface-elevated rounded-md px-4 -ml-4 transition-colors border border-transparent hover:border-hairline"
                    >
                      {/* Timeline dot */}
                      <div className={cn(
                        "absolute -left-[17px] top-4 w-2 h-2 rounded-full border bg-surface-card transition-colors",
                        eventStyle.color.includes("primary") ? "border-primary" :
                        eventStyle.color.includes("accent-rose") ? "border-accent-rose" :
                        eventStyle.color.includes("accent-emerald") ? "border-accent-emerald" :
                        eventStyle.color.includes("accent-blue") ? "border-accent-blue" :
                        eventStyle.color.includes("text-main") ? "border-text-main" :
                        "border-hairline-strong"
                      )} />

                      {/* Icon badge */}
                      <div className={cn("flex items-center justify-center w-8 h-8 rounded-md border shrink-0", eventStyle.color)}>
                        {eventStyle.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 mt-1">
                        <span className="text-text-muted group-hover:text-text-main transition-colors text-[14px] leading-relaxed">
                          {event.text}
                        </span>
                      </div>

                      {/* Type label */}
                      <span className={cn("text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm border shrink-0 mt-1.5", eventStyle.color)}>
                        {event.type}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Waiting cursor */}
          <div className="flex items-center gap-2 mt-12 mb-4 text-text-muted">
            <span className="text-[12px] font-mono animate-pulse">Waiting for events...</span>
            <span className="w-2 h-4 bg-text-muted animate-blink-cursor"></span>
          </div>
        </div>
      </CodeWindowCard>
    </section>
  );
}
