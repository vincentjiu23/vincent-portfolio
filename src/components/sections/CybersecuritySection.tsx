"use client";

import React from "react";
import content from "@/data/content.json";
import CodeWindowCard from "@/components/ui/CodeWindowCard";
import { motion } from "framer-motion";
import { Award, Briefcase, Users, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CybersecuritySection() {

  return (
    <section className="container mx-auto px-6 py-section" id="security">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="display-lg text-text-main max-w-2xl">Certifications & Milestones.</h2>
        <p className="text-text-muted text-lg max-w-xl">
          Professional experience, organizational leadership, and industry certifications.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Experiences & Organizations Timeline */}
        <div className="lg:col-span-2 flex flex-col">
          {content.certificationsAndMilestones.experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 md:gap-6"
            >
              {/* Timeline Line & Node */}
              <div className="flex flex-col items-center">
                {/* Top line (transparent on first item to not extend upward) */}
                <div className={cn("w-px bg-hairline flex-1", index === 0 ? "opacity-0" : "")} />
                
                {/* Node Dot */}
                <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-canvas my-6 shrink-0 relative z-10" />
                
                {/* Bottom line (transparent on last item to not extend downward) */}
                <div className={cn("w-px bg-hairline flex-1", index === content.certificationsAndMilestones.experiences.length - 1 ? "opacity-0" : "")} />
              </div>

              {/* Experience Card */}
              <div className="flex-1 py-4">
                <div
                  className="bg-surface-card border border-hairline hover:border-hairline-strong rounded-lg overflow-hidden transition-all duration-300 shadow-sm"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 gap-4 border-b border-hairline/50 bg-canvas/30">
                    <div className="flex items-center gap-4">
                      {exp.type === "Work" ? (
                        <Briefcase size={20} className="text-primary shrink-0" />
                      ) : (
                        <Users size={20} className="text-primary shrink-0" />
                      )}
                      <div>
                        <h3 className="text-text-main font-bold text-[16px] leading-tight">{exp.title}</h3>
                        <div className="text-text-muted text-[13px] mt-1">{exp.organization}</div>
                      </div>
                    </div>
                    <span className="text-[12px] font-mono text-text-muted border border-hairline px-2 py-1 rounded bg-canvas self-start sm:self-auto shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  {/* Expanded Content */}
                  <div className="px-6 py-5">
                    <p className="text-text-body text-[14px] leading-relaxed max-w-2xl whitespace-pre-wrap">
                      {exp.description}
                    </p>
                    
                    {/* Skills */}
                    {(exp as any).skills && (exp as any).skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-hairline/50">
                        {(exp as any).skills.map((skill: string, i: number) => (
                          <span key={i} className="text-[11px] font-mono text-text-muted bg-canvas border border-hairline px-2.5 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Certifications */}
        <div className="flex flex-col gap-6">
          <CodeWindowCard title="certifications.ts">
            <div className="flex flex-col gap-5 p-2">
              {content.certificationsAndMilestones.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-4 group"
                >
                  <Award size={24} className="text-primary shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="text-text-main text-[15px] font-bold group-hover:text-primary transition-colors mb-2 leading-tight">
                      {cert.name}
                    </div>
                    <div className="text-text-muted text-[13px] mb-3">{cert.organization}</div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-text-muted uppercase tracking-wider">Issued:</span>
                        <span className="text-[12px] font-mono text-text-main">{cert.issued}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-text-muted uppercase tracking-wider">Expires:</span>
                        <span className="text-[12px] font-mono text-text-main">{cert.expires}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] text-text-muted uppercase tracking-wider">Credential ID:</span>
                        <span className="text-[12px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                          {cert.credentialId}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CodeWindowCard>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-card border border-hairline rounded-lg p-5 flex flex-col items-center justify-center text-center hover:border-hairline-strong transition-colors"
          >
            <Award size={32} className="text-text-muted mb-3" />
            <div className="text-[14px] font-bold text-text-main mb-1">Verify Credentials</div>
            <div className="text-[12px] text-text-muted mb-4">View official certification badges and verifiable credentials on LinkedIn.</div>
            <a href="https://www.linkedin.com/in/vincentjiu/" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-primary flex items-center gap-1 hover:underline">
              View LinkedIn Profile <ExternalLink size={12} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
