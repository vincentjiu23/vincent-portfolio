"use client";

import React, { useRef } from "react";
import content from "@/data/content.json";
import CodeWindowCard from "@/components/ui/CodeWindowCard";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { motion, useInView } from "framer-motion";

const radarData = [
  { subject: "Frontend", A: content.skills.frontend },
  { subject: "Backend", A: content.skills.backend },
  { subject: "Security", A: content.skills.cybersecurity },
  { subject: "Cloud", A: content.skills.cloud },
  { subject: "Database", A: content.skills.database },
  { subject: "AI", A: content.skills.artificialIntelligence },
  { subject: "Design", A: content.skills.design },
];

const allSkills = [
  { subject: "Frontend", value: content.skills.frontend, tools: "React, Next.js, TypeScript" },
  { subject: "Backend", value: content.skills.backend, tools: "Python, Node.js, Laravel" },
  { subject: "Cybersecurity", value: content.skills.cybersecurity, tools: "Keycloak, Nmap, Splunk" },
  { subject: "Cloud / DevOps", value: content.skills.cloud, tools: "Docker, Linux, Git" },
  { subject: "Database", value: content.skills.database, tools: "PostgreSQL, MySQL, MongoDB" },
  { subject: "Artificial Intelligence", value: content.skills.artificialIntelligence, tools: "LangChain, Ollama, FAISS" },
  { subject: "UI/UX Design", value: content.skills.uiux, tools: "Figma, Maze, Hotjar" },
  { subject: "Visual Design", value: content.skills.design, tools: "Illustrator, Photoshop" },
  { subject: "Illustration", value: content.skills.illustration, tools: "Aseprite, Photoshop" },
];

function AnimatedBar({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full bg-canvas h-2 rounded-full overflow-hidden border border-hairline">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full rounded-full bg-primary"
      />
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className="container mx-auto px-6 py-section" id="skills">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="display-lg text-text-main max-w-2xl">Technical capabilities and domain expertise.</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Radar Chart */}
        <CodeWindowCard title="analysis.ts" className="h-[420px]">
          <div className="w-full h-full flex items-center justify-center text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#2a2a2a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888888', fontSize: 12, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="A" stroke="#faff69" fill="#faff69" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CodeWindowCard>

        {/* Right: Detailed progress bars */}
        <CodeWindowCard title="metrics.json">
          <div className="flex flex-col gap-5">
            {allSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-2 group"
              >
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-text-main font-semibold">{skill.subject}</span>
                    <span className="text-text-muted text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                      {skill.tools}
                    </span>
                  </div>
                  <span className="text-text-body font-mono">{skill.value}%</span>
                </div>
                <AnimatedBar value={skill.value} delay={index * 0.05} />
              </motion.div>
            ))}
          </div>
        </CodeWindowCard>
      </div>
    </section>
  );
}
