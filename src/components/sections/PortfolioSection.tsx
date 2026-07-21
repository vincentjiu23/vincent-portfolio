"use client";

import React, { useState } from "react";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ShieldAlert, Code2, Paintbrush, Database, Star, X, ArrowRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import TerminalWindow from "@/components/ui/TerminalWindow";

const CATEGORIES = ["All", "Hybrid", "Development", "Cybersecurity", "Data", "Design", "Illustration"];

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "Development": return <Code2 size={14} />;
    case "Cybersecurity": return <ShieldAlert size={14} />;
    case "Design": return <Paintbrush size={14} />;
    case "Illustration": return <Paintbrush size={14} />;
    case "Data": return <Database size={14} />;
    case "Hybrid": return <Star size={14} className="text-[#FFBD2E]" />;
    default: return <Code2 size={14} />;
  }
};

type Project = typeof content.projects[0];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = content.projects.filter(
    (p) => activeTab === "All" || p.category === activeTab
  );

  return (
    <section className="container mx-auto px-6 py-24" id="projects">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display text-4xl text-textMain tracking-wide">Work / Projects</h2>
        <div className="h-1 w-20 bg-primary"></div>
        <p className="text-textMuted text-sm max-w-xl">Selected projects across development, cybersecurity, data engineering, and design.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-borderDark pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "px-4 py-2 text-sm transition-all duration-200 rounded-t-md relative font-medium",
              activeTab === cat
                ? "text-primary bg-card/50"
                : "text-textMuted hover:text-textMain hover:bg-card/30"
            )}
          >
            {cat}
            {activeTab === cat && (
              <motion.div
                layoutId="activeProjectTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Project count */}
      <div className="text-xs text-textDim font-mono mb-6">
        Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        {activeTab !== "All" && ` in ${activeTab}`}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <div
                className={cn(
                  "bg-card border rounded-lg overflow-hidden group cursor-pointer transition-all duration-300",
                  "hover:border-primary/50 hover:shadow-[0_0_25px_rgba(246,142,95,0.08)] hover:-translate-y-1",
                  project.featured
                    ? "border-highlight/30 shadow-[0_0_15px_rgba(202,255,138,0.06)]"
                    : "border-borderDark"
                )}
                onClick={() => setSelectedProject(project)}
              >
                {/* Featured badge */}
                {project.featured && (
                  <div className="bg-highlight/10 border-b border-highlight/20 px-4 py-1.5 flex items-center gap-2">
                    <Layers size={12} className="text-highlight" />
                    <span className="text-[10px] font-pixel text-highlight">HYBRID — Full Stack Build</span>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Category + ID */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-textDim text-[10px] font-mono">
                      <CategoryIcon category={project.category} />
                      {project.category}
                    </div>
                    <span className="text-[10px] text-textDim font-mono opacity-50">{project.id}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-textMain group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-textMuted text-xs leading-relaxed line-clamp-3 font-sans">
                    {project.description}
                  </p>

                  {/* Phases (for hybrid projects) */}
                  {project.phases && (
                    <div className="flex items-center gap-1 mt-1">
                      {project.phases.map((phase, i) => (
                        <React.Fragment key={i}>
                          <span className="text-[9px] font-pixel text-highlight/70">{phase}</span>
                          {i < project.phases!.length - 1 && (
                            <ArrowRight size={8} className="text-textDim/40" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-borderDark/50">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[9px] text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/15">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-2 font-sans text-xs">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-textDim hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={13} /> Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-textDim hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                    <span className="ml-auto text-textDim/50 text-[10px] group-hover:text-primary/50 transition-colors">
                      Click for details →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-background border border-borderDark rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm flex items-center justify-between px-6 py-4 border-b border-borderDark">
                <div className="flex items-center gap-3">
                  <CategoryIcon category={selectedProject.category} />
                  <span className="font-pixel text-xs text-primary">{selectedProject.title}</span>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-textDim hover:text-textMain transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-textMain mb-2">{selectedProject.title}</h3>
                  <p className="text-textMuted text-sm leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Phases */}
                {selectedProject.phases && (
                  <div>
                    <h4 className="text-sm font-bold text-textMain mb-3">Build Phases</h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedProject.phases.map((phase, i) => (
                        <React.Fragment key={i}>
                          <div className="bg-card border border-borderDark rounded-lg px-3 py-2 text-xs font-mono text-highlight">
                            {i + 1}. {phase}
                          </div>
                          {i < selectedProject.phases!.length - 1 && (
                            <ArrowRight size={14} className="text-textDim/40" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Case Study */}
                {selectedProject.caseStudy && (
                  <TerminalWindow title="case-study.md">
                    <div className="flex flex-col gap-4 text-sm">
                      <div>
                        <span className="text-primary font-bold">## Problem</span>
                        <p className="text-textMuted mt-1">{selectedProject.caseStudy.problem}</p>
                      </div>
                      <div>
                        <span className="text-secondary font-bold">## Research</span>
                        <p className="text-textMuted mt-1">{selectedProject.caseStudy.research}</p>
                      </div>
                      <div>
                        <span className="text-highlight font-bold">## Solution</span>
                        <p className="text-textMuted mt-1">{selectedProject.caseStudy.solution}</p>
                      </div>
                    </div>
                  </TerminalWindow>
                )}

                {/* Tech */}
                <div>
                  <h4 className="text-sm font-bold text-textMain mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="text-xs text-secondary bg-secondary/10 px-3 py-1.5 rounded border border-secondary/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-borderDark">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors">
                      <Github size={16} /> View Source Code
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
