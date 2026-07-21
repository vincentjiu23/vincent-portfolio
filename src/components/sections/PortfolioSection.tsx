"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Code2, ShieldAlert, Brain, Paintbrush, FileText, MonitorPlay, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CodeWindowCard from "@/components/ui/CodeWindowCard";
import ClickHouseButton from "@/components/ui/ClickHouseButton";

type Project = typeof content.projects[0];

const getCategoryColor = (category: string) => {
  if (category.toLowerCase().includes("development") || category.toLowerCase().includes("website")) return "text-accent-blue bg-accent-blue/10 border-accent-blue/20";
  if (category.toLowerCase().includes("cybersecurity")) return "text-accent-rose bg-accent-rose/10 border-accent-rose/20";
  if (category.toLowerCase().includes("artificial intelligence") || category.toLowerCase().includes("ai")) return "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20";
  if (category.toLowerCase().includes("ui/ux") || category.toLowerCase().includes("design")) return "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20";
  return "text-primary bg-primary/10 border-primary/20"; // Hybrid/Other
};

const getCategoryIcon = (category: string) => {
  if (category.toLowerCase().includes("development") || category.toLowerCase().includes("website")) return <Code2 size={16} />;
  if (category.toLowerCase().includes("cybersecurity")) return <ShieldAlert size={16} />;
  if (category.toLowerCase().includes("artificial intelligence") || category.toLowerCase().includes("ai")) return <Brain size={16} />;
  if (category.toLowerCase().includes("ui/ux") || category.toLowerCase().includes("design")) return <Paintbrush size={16} />;
  return <Code2 size={16} />;
};

const getStatusStyles = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("prototype")) return { color: "#ffee32", backgroundColor: "#ffee321a", borderColor: "#ffee3240" };
  if (s.includes("proof of concept") || s.includes("poc")) return { color: "#20BF55", backgroundColor: "#20BF551a", borderColor: "#20BF5540" };
  if (s.includes("development")) return { color: "#5AD2F4", backgroundColor: "#5AD2F41a", borderColor: "#5AD2F440" };
  if (s.includes("publish")) return { color: "#ef233c", backgroundColor: "#ef233c1a", borderColor: "#ef233c40" };
  return { color: "#faff69", backgroundColor: "#faff691a", borderColor: "#faff6940" };
};

const FILTERS = [
  "All",
  "Development",
  "Cybersecurity",
  "Artificial Intelligence",
  "UI/UX Design",
  "Published",
  "Prototype",
  "Proof of Concept"
];

function ImageCarousel({ images, autoPlay = false, className }: { images: string[], autoPlay?: boolean, className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [autoPlay, images.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%"
    }),
    center: {
      x: 0
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%"
    })
  };

  return (
    <div className={cn("relative w-full aspect-video overflow-hidden bg-canvas group", className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface-card/90 p-2 rounded-full border border-hairline hover:bg-surface-elevated hover:text-primary transition-colors text-text-main backdrop-blur-sm shadow-xl"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface-card/90 p-2 rounded-full border border-hairline hover:bg-surface-elevated hover:text-primary transition-colors text-text-main backdrop-blur-sm shadow-xl"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-surface-card/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-hairline/50">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300", 
                  i === currentIndex ? "bg-primary w-4" : "bg-text-muted/50 hover:bg-text-muted"
                )} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects by checking if the filter matches the Category OR the Status.
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return content.projects;
    return content.projects.filter(p => {
      const isStatusMatch = p.status.toLowerCase().includes(activeFilter.toLowerCase());
      const isCategoryMatch = p.category.toLowerCase().includes(activeFilter.toLowerCase());
      return isStatusMatch || isCategoryMatch;
    });
  }, [activeFilter]);

  return (
    <section className="container mx-auto px-6 py-section" id="projects">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="display-lg text-text-main max-w-2xl">Featured engineering work.</h2>
        <p className="text-text-muted text-lg max-w-xl">
          Selected projects across development, AI, cybersecurity, and design.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-hairline pb-4">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-4 py-2 text-[14px] font-semibold rounded-md transition-all duration-200",
              activeFilter === filter
                ? "bg-surface-card text-text-main border border-hairline"
                : "bg-transparent text-text-muted hover:text-text-main hover:bg-surface-soft"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isFeatured = project.status.toLowerCase() === "published";
            const isGitaPortal = project.title === "GITA Portal";
            const catColor = getCategoryColor(project.category);
            
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={cn(isGitaPortal ? "md:col-span-2 lg:col-span-2" : "")}
              >
                <div
                  className={cn(
                    "border rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 h-full flex flex-col",
                    isGitaPortal
                      ? "bg-surface-elevated text-text-main border-primary/50 hover:border-primary shadow-[0_0_30px_rgba(250,255,105,0.1)] relative"
                      : "bg-surface-card text-text-main border-hairline hover:border-hairline-strong"
                  )}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Subtle Background Glow for GITA Portal */}
                  {isGitaPortal && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none z-0"></div>
                  )}

                  {/* Thumbnail / Carousel Header */}
                  {(project as any).images && (project as any).images.length > 0 && (
                    <div className="w-full border-b border-hairline relative z-10">
                      <ImageCarousel images={(project as any).images} autoPlay={true} className="rounded-t-lg" />
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                    {/* Header: Category and Year */}
                    <div className="flex items-center justify-between mb-4 border-b border-hairline pb-4">
                      <div className="flex items-center gap-2 text-text-muted">
                        {getCategoryIcon(project.category)}
                        <span className="text-[12px] font-semibold uppercase tracking-wider">{project.category}</span>
                      </div>
                      <span className="text-[12px] font-mono text-text-muted px-2 py-0.5 rounded border border-hairline bg-canvas">
                        {project.year}
                      </span>
                    </div>

                    {/* Title and Status */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className={cn("font-bold leading-tight", isGitaPortal ? "text-2xl" : "text-xl")}>
                          {project.title}
                        </h3>
                        {isGitaPortal && (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 rounded-sm flex items-center gap-1">
                            <ShieldAlert size={10} /> Enterprise Stack
                          </span>
                        )}
                      </div>
                      <span 
                        className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm border shrink-0"
                        style={getStatusStyles(project.status)}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="text-primary font-mono text-[13px] mb-4">{project.role}</div>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed line-clamp-3 mb-6 text-text-muted">
                      {project.description}
                    </p>

                    {/* Tech badges (Preview) */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[12px] px-2 py-1 rounded-sm font-semibold bg-canvas text-text-muted border border-hairline">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-[12px] px-2 py-1 rounded-sm font-semibold bg-canvas text-text-muted border border-hairline">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 backdrop-blur-sm p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface-card border border-hairline rounded-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-surface-card/95 backdrop-blur-sm flex items-center justify-between px-8 py-6 border-b border-hairline">
                <div className="flex items-center gap-3 text-text-muted font-semibold text-[14px]">
                  {getCategoryIcon(selectedProject.category)}
                  <span className="uppercase tracking-wider">{selectedProject.category}</span>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-text-muted hover:text-text-main transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="display-md">{selectedProject.title}</h3>
                    <span className="text-[14px] font-mono text-text-muted px-2 py-1 rounded border border-hairline bg-canvas">
                      {selectedProject.year}
                    </span>
                  </div>
                  <div className="text-primary font-mono text-[16px] mb-6">{selectedProject.role}</div>
                  <p className="text-text-body text-lg leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Status */}
                <div>
                  <span 
                    className="text-[12px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-sm border w-fit"
                    style={getStatusStyles(selectedProject.status)}
                  >
                    Status: {selectedProject.status}
                  </span>
                </div>

                {/* Tech */}
                <div>
                  <h4 className="text-[14px] font-bold text-text-main mb-4 uppercase tracking-wider">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="text-[14px] bg-canvas text-text-main px-3 py-1.5 rounded-sm border border-hairline font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                {selectedProject.languages && selectedProject.languages.length > 0 && (
                  <div>
                    <h4 className="text-[14px] font-bold text-text-main mb-4 uppercase tracking-wider">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.languages.map((l, i) => (
                        <span key={i} className="text-[13px] text-text-muted font-mono px-3 py-1 bg-canvas border border-hairline-strong rounded-sm">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Carousel */}
                {(selectedProject as any).images && (selectedProject as any).images.length > 0 && (
                  <div>
                    <h4 className="text-[14px] font-bold text-text-main mb-4 uppercase tracking-wider">Documentation / Gallery</h4>
                    <ImageCarousel images={(selectedProject as any).images} className="rounded-lg border border-hairline" />
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 pt-6 border-t border-hairline">
                  {selectedProject.demo && (
                    <ClickHouseButton variant="primary" as="a" href={selectedProject.demo}>
                      <ExternalLink size={16} className="mr-2" /> Live Demo
                    </ClickHouseButton>
                  )}
                  {(selectedProject as any).github && (
                    <ClickHouseButton variant="secondary" as="a" href={(selectedProject as any).github}>
                      <Github size={16} className="mr-2" /> Source Code
                    </ClickHouseButton>
                  )}
                  <ClickHouseButton variant="secondary">
                    <FileText size={16} className="mr-2" /> Case Study
                  </ClickHouseButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
