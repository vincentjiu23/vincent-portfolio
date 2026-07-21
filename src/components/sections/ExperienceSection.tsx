"use client";

import React from "react";
import content from "@/data/content.json";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { motion } from "framer-motion";
import { Briefcase, Rocket, Award, GraduationCap, Flag, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const eventIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  work: { icon: <Briefcase size={12} />, color: "text-primary bg-primary/10 border-primary/30" },
  release: { icon: <Rocket size={12} />, color: "text-highlight bg-highlight/10 border-highlight/30" },
  cert: { icon: <Award size={12} />, color: "text-[#FFBD2E] bg-[#FFBD2E]/10 border-[#FFBD2E]/30" },
  award: { icon: <Flag size={12} />, color: "text-[#FFBD2E] bg-[#FFBD2E]/10 border-[#FFBD2E]/30" },
  education: { icon: <GraduationCap size={12} />, color: "text-secondary bg-secondary/10 border-secondary/30" },
  project: { icon: <Code2 size={12} />, color: "text-primary bg-primary/10 border-primary/30" },
  milestone: { icon: <Flag size={12} />, color: "text-textMuted bg-textMuted/10 border-textMuted/30" },
};

export default function ExperienceSection() {
  return (
    <section className="container mx-auto px-6 py-24" id="experience">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display text-4xl text-textMain tracking-wide">System Logs / Experience</h2>
        <div className="h-1 w-20 bg-primary"></div>
        <p className="text-textMuted text-sm max-w-xl">A chronological log of key milestones, achievements, and career events.</p>
      </div>

      <TerminalWindow title="/var/log/career.log" className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-1 font-mono text-sm">
          <div className="text-xs text-textDim mb-4">$ tail -f /var/log/career.log</div>
          
          {content.experience.map((exp, yearIndex) => (
            <motion.div
              key={yearIndex}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
            >
              {/* Year Header */}
              <div className="flex items-center gap-3 mb-3 mt-6 first:mt-0">
                <div className="text-primary font-bold text-lg font-display tracking-wider">{exp.year}</div>
                <div className="flex-1 h-px bg-borderDark"></div>
                <div className="text-[10px] text-textDim">{exp.events.length} event{exp.events.length !== 1 ? "s" : ""}</div>
              </div>

              {/* Events */}
              <div className="flex flex-col gap-2 pl-4 border-l-2 border-borderDark ml-4">
                {exp.events.map((event, eventIndex) => {
                  const eventStyle = eventIcons[event.type] || eventIcons.milestone;
                  return (
                    <motion.div
                      key={eventIndex}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (yearIndex * exp.events.length + eventIndex) * 0.05 }}
                      className="relative flex items-start gap-3 py-2 group hover:bg-card/30 rounded-r-lg px-3 -ml-3 transition-colors"
                    >
                      {/* Timeline dot */}
                      <div className={cn(
                        "absolute -left-[13px] top-3 w-[10px] h-[10px] rounded-full border-2 bg-background transition-colors",
                        eventStyle.color.includes("primary") ? "border-primary" :
                        eventStyle.color.includes("highlight") ? "border-highlight" :
                        eventStyle.color.includes("FFBD2E") ? "border-[#FFBD2E]" :
                        eventStyle.color.includes("secondary") ? "border-secondary" :
                        "border-textDim"
                      )} />

                      {/* Icon badge */}
                      <div className={cn("flex items-center justify-center w-6 h-6 rounded border shrink-0 mt-0.5", eventStyle.color)}>
                        {eventStyle.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <span className="text-textMuted group-hover:text-textMain transition-colors text-sm">
                          {event.text}
                        </span>
                      </div>

                      {/* Type label */}
                      <span className={cn("text-[9px] font-pixel px-1.5 py-0.5 rounded border shrink-0 mt-1", eventStyle.color)}>
                        {event.type}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Waiting cursor */}
          <div className="flex items-center gap-2 mt-8 text-textDim">
            <span className="text-xs animate-pulse">[LISTENING FOR NEW EVENTS...]</span>
            <span className="w-2 h-4 bg-textDim animate-blink-cursor"></span>
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
}
