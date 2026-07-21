"use client";

import React from "react";
import content from "@/data/content.json";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Coffee } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="container mx-auto px-6 py-24" id="about">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display text-4xl text-textMain tracking-wide">About Me</h2>
        <div className="h-1 w-20 bg-primary"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* README style container */}
        <div className="bg-card border border-borderDark rounded-lg overflow-hidden shadow-xl">
          {/* File header */}
          <div className="bg-background border-b border-borderDark px-6 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="font-mono text-xs text-primary ml-2">README.md</span>
          </div>

          <div className="p-6 md:p-8 font-sans">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl font-display text-textMain mb-4 tracking-wide">
                Hi, I&apos;m Vincent <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="text-textMuted leading-relaxed mb-8">{content.about.bio}</p>
            </motion.div>

            {/* Career Goals */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-textMain mb-4 flex items-center gap-2">
                <Target size={18} className="text-primary" /> Career Goals
              </h2>
              <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/30">
                {content.about.goals.map((goal, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-textMuted">
                    <span className="text-primary mt-0.5">→</span>
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-textMain mb-4 flex items-center gap-2">
                <Heart size={18} className="text-primary" /> Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {content.about.interests.map((interest, i) => (
                  <span key={i} className="text-xs bg-background border border-borderDark rounded-full px-3 py-1.5 text-textMuted hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-textMain mb-4 flex items-center gap-2">
                <Zap size={18} className="text-[#FFBD2E]" /> Fun Facts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {content.about.funFacts.map((fact, i) => (
                  <div key={i} className="bg-background border border-borderDark rounded-lg p-3 text-sm text-textMuted flex items-start gap-2">
                    <Coffee size={14} className="text-primary shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
