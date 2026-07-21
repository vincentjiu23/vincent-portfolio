"use client";

import React, { useState } from "react";
import content from "@/data/content.json";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Crosshair, Monitor, Flag, Award, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={20} className="text-highlight" />,
  crosshair: <Crosshair size={20} className="text-primary" />,
  monitor: <Monitor size={20} className="text-secondary" />,
  flag: <Flag size={20} className="text-[#FFBD2E]" />,
};

export default function CybersecuritySection() {
  const [expandedDomain, setExpandedDomain] = useState<number | null>(0);

  return (
    <section className="container mx-auto px-6 py-24" id="security">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display text-4xl text-textMain tracking-wide">Cybersecurity</h2>
        <div className="h-1 w-20 bg-primary"></div>
        <p className="text-textMuted text-sm max-w-xl">Security expertise spanning identity management, penetration testing, monitoring, and CTF challenges.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Domain Areas */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {content.cybersecurity.domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "bg-card border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer",
                  expandedDomain === index
                    ? "border-primary/40 shadow-[0_0_20px_rgba(246,142,95,0.08)]"
                    : "border-borderDark hover:border-textDim/30"
                )}
                onClick={() => setExpandedDomain(expandedDomain === index ? null : index)}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    {iconMap[domain.icon]}
                    <div>
                      <h3 className="text-textMain font-bold text-sm">{domain.title}</h3>
                    </div>
                  </div>
                  {expandedDomain === index ? (
                    <ChevronUp size={16} className="text-textDim" />
                  ) : (
                    <ChevronDown size={16} className="text-textDim" />
                  )}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedDomain === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-borderDark pt-4">
                        <p className="text-textMuted text-sm mb-4 leading-relaxed">{domain.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {domain.tools.map((tool, i) => (
                            <span key={i} className="text-[10px] font-mono text-highlight bg-highlight/10 px-2 py-1 rounded border border-highlight/20">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Certifications & Stats */}
        <div className="flex flex-col gap-6">
          <TerminalWindow title="certs.log">
            <div className="flex flex-col gap-4">
              <div className="text-xs text-textDim mb-2"># Certifications & Achievements</div>
              {content.cybersecurity.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-3 group"
                >
                  <Award size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-textMain text-sm font-bold group-hover:text-primary transition-colors">{cert.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-textDim">{cert.year}</span>
                      <span className={cn(
                        "text-[9px] font-pixel px-1.5 py-0.5 rounded",
                        cert.status === "Achieved" ? "text-highlight bg-highlight/10" : "text-primary bg-primary/10"
                      )}>
                        {cert.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TerminalWindow>

          {/* Security Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "CTF Solved", value: "150+", color: "text-highlight" },
              { label: "Labs Done", value: "80+", color: "text-primary" },
              { label: "Writeups", value: "25", color: "text-secondary" },
              { label: "CVEs Found", value: "3", color: "text-[#FFBD2E]" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-borderDark rounded-lg p-4 text-center hover:border-primary/30 transition-colors"
              >
                <div className={cn("text-2xl font-bold font-display", stat.color)}>{stat.value}</div>
                <div className="text-[10px] text-textDim uppercase mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
