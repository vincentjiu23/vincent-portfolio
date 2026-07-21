"use client";

import React, { useState } from "react";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TECH_CATEGORIES = ["All", ...Array.from(new Set(content.techStack.map((t) => t.category)))];

const levelColor: Record<string, string> = {
  Expert: "text-highlight bg-highlight/10 border-highlight/30",
  Advanced: "text-primary bg-primary/10 border-primary/30",
  Intermediate: "text-secondary bg-secondary/10 border-secondary/30",
};

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredTech = content.techStack.filter(
    (t) => activeCategory === "All" || t.category === activeCategory
  );

  return (
    <section className="container mx-auto px-6 py-24" id="techstack">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display text-4xl text-textMain tracking-wide">Technology Stack</h2>
        <div className="h-1 w-20 bg-primary"></div>
        <p className="text-textMuted text-sm max-w-xl">Tools and technologies I use to build, secure, and design digital products.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TECH_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200",
              activeCategory === cat
                ? "bg-primary/20 border-primary/50 text-primary"
                : "bg-card/30 border-borderDark text-textDim hover:text-textMuted hover:border-textDim/30"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredTech.map((tech) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              className={cn(
                "relative group bg-card border border-borderDark rounded-lg p-4 cursor-default transition-all duration-300",
                "hover:border-primary/40 hover:shadow-[0_0_20px_rgba(246,142,95,0.1)] hover:-translate-y-1"
              )}
            >
              {/* Terminal-style header */}
              <div className="text-[9px] text-textDim font-mono mb-2 opacity-60">
                $ which {tech.name.toLowerCase().replace(/\s+/g, "-")}
              </div>

              {/* Tech Name */}
              <div className="font-mono text-sm text-textMain font-bold group-hover:text-primary transition-colors">
                {tech.name}
              </div>

              {/* Level Badge */}
              <div className={cn("text-[9px] font-pixel mt-2 px-1.5 py-0.5 rounded border w-fit", levelColor[tech.level] || "text-textDim")}>
                {tech.level}
              </div>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#1a2332] border border-borderDark rounded px-3 py-1.5 text-[10px] font-mono text-textMuted whitespace-nowrap z-50 shadow-xl"
                  >
                    {tech.years} yr{tech.years > 1 ? "s" : ""} · {tech.category}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
