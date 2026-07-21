"use client";

import React from "react";
import content from "@/data/content.json";
import CodeWindowCard from "@/components/ui/CodeWindowCard";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutSection() {
  return (
    <section className="container mx-auto px-6 py-section" id="about">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="display-lg text-text-main max-w-2xl">Operator profile.</h2>
        <p className="text-text-muted text-lg max-w-xl">
          Background, interests, and objectives.
        </p>
      </div>

      <div className="max-w-4xl">
        <CodeWindowCard title="README.md">
          <div className="p-4 md:p-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-[32px] font-bold text-text-main mb-6 tracking-tight">
                Hi, I&apos;m Vincent <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="text-text-body text-[16px] leading-relaxed mb-10 max-w-3xl">{content.about.bio}</p>
            </motion.div>

            {/* Career Goals */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <h2 className="text-[18px] font-bold text-text-main mb-4 flex items-center gap-3">
                <Target size={20} className="text-primary" /> Objectives
              </h2>
              <div className="flex flex-col gap-4 pl-5 border-l border-primary/30 ml-2">
                {content.about.goals.map((goal, i) => (
                  <div key={i} className="flex items-start gap-3 text-[14px] text-text-muted">
                    <span className="text-primary mt-0.5">→</span>
                    <span className="leading-relaxed">{goal}</span>
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
              className="mb-10"
            >
              <h2 className="text-[18px] font-bold text-text-main mb-4 flex items-center gap-3">
                <Heart size={20} className="text-accent-rose" /> Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {content.about.interests.map((interest, i) => (
                  <span key={i} className="text-[12px] bg-canvas border border-hairline rounded-sm px-3 py-1.5 text-text-muted font-semibold hover:text-text-main hover:border-hairline-strong transition-colors cursor-default">
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
              <h2 className="text-[18px] font-bold text-text-main mb-4 flex items-center gap-3">
                <Zap size={20} className="text-primary" /> Telemetry
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.about.funFacts.map((fact, i) => (
                  <div key={i} className="bg-canvas border border-hairline rounded-md p-4 text-[13px] text-text-muted flex items-start gap-3">
                    <Coffee size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </CodeWindowCard>
      </div>
    </section>
  );
}
