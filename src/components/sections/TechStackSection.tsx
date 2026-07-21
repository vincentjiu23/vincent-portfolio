"use client";

import React, { useState } from "react";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default function TechStackSection() {
  const { coreSkills } = content;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <section className="container mx-auto px-6 py-section" id="techstack">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="display-lg text-text-main">Core Proficiencies</h2>
        <p className="text-text-muted text-lg max-w-xl">
          An overview of my technical skills and tool stack mapped across various domains. Click on a category to see its application in my projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreSkills.map((skill, idx) => {
          const isActive = activeCategory === skill.category;

          return (
            <motion.div
              key={skill.category}
              layout
              onClick={() => toggleCategory(skill.category)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, layout: { duration: 0.3 } }}
              className={cn(
                "bg-surface-card border rounded-lg p-6 flex flex-col gap-4 cursor-pointer transition-colors overflow-hidden group",
                isActive ? "border-primary" : "border-hairline hover:border-primary/50"
              )}
            >
              <motion.div layout className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3 className={cn(
                    "text-[18px] font-bold transition-colors",
                    isActive ? "text-primary" : "text-text-main group-hover:text-primary"
                  )}>
                    {skill.category}
                  </h3>
                  <p className="text-[14px] text-text-muted font-mono line-clamp-2">
                    {skill.tools}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1"
                >
                  <ChevronDown className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="h-px w-full bg-hairline/50 mt-2" />
                    
                    <p className="text-[13px] text-text-body leading-relaxed">
                      {skill.summary}
                    </p>

                    <div className="flex flex-col gap-2 mt-2">
                      <span className="text-[11px] font-bold text-text-soft uppercase tracking-wider">
                        Related Projects
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {skill.relatedProjects?.map((project: string) => (
                          <span 
                            key={project} 
                            className="text-[11px] font-mono text-text-muted bg-surface-elevated border border-hairline px-2.5 py-1 rounded-md"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout className="flex flex-col gap-2 mt-auto pt-4">
                <div className="flex justify-between items-center text-[13px] font-mono font-semibold">
                  <span className="text-text-soft">Proficiency</span>
                  <span className="text-primary">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-canvas border border-hairline/50 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-primary rounded-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
