"use client";

import React, { useRef } from "react";
import content from "@/data/content.json";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const radarData = [
  { subject: "Frontend", A: content.skills.frontend },
  { subject: "Backend", A: content.skills.backend },
  { subject: "Security", A: content.skills.cybersecurity },
  { subject: "Cloud", A: content.skills.cloud },
  { subject: "Database", A: content.skills.database },
  { subject: "Design", A: content.skills.design },
];

const allSkills = [
  { subject: "Frontend", value: content.skills.frontend, color: "#F68E5F", tools: "React, Next.js, TypeScript" },
  { subject: "Backend", value: content.skills.backend, color: "#586BA4", tools: "Python, Node.js, Laravel" },
  { subject: "Cybersecurity", value: content.skills.cybersecurity, color: "#CAFF8A", tools: "Keycloak, Nmap, Splunk" },
  { subject: "Cloud / DevOps", value: content.skills.cloud, color: "#F68E5F", tools: "Docker, Linux, Git" },
  { subject: "Database", value: content.skills.database, color: "#586BA4", tools: "PostgreSQL, MySQL, MongoDB" },
  { subject: "Data Engineering", value: content.skills.dataEngineering, color: "#CAFF8A", tools: "Kafka, Power BI, Grafana" },
  { subject: "Machine Learning", value: content.skills.machineLearning, color: "#F68E5F", tools: "Scikit-learn, Pandas, Jupyter" },
  { subject: "UI/UX Design", value: content.skills.uiux, color: "#586BA4", tools: "Figma, Maze, Hotjar" },
  { subject: "Visual Design", value: content.skills.design, color: "#CAFF8A", tools: "Illustrator, Photoshop" },
  { subject: "Illustration", value: content.skills.illustration, color: "#F68E5F", tools: "Aseprite, Photoshop" },
];

function AnimatedBar({ value, color, delay }: { value: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full bg-[#161b22] h-2.5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className="container mx-auto px-6 py-24" id="skills">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display text-4xl text-textMain tracking-wide">Technical Arsenal</h2>
        <div className="h-1 w-20 bg-primary"></div>
        <p className="text-textMuted text-sm max-w-xl">A comprehensive view of my skills across development, security, data, and design.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Radar Chart */}
        <TerminalWindow title="radar_scan.sh" className="h-[420px]">
          <div className="w-full h-full flex items-center justify-center text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#C9CED6', fontSize: 11, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="A" stroke="#CAFF8A" fill="#CAFF8A" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </TerminalWindow>

        {/* Right: Detailed progress bars */}
        <TerminalWindow title="cat skills.md">
          <div className="flex flex-col gap-5">
            <div className="text-xs text-textDim font-mono mb-1"># Domain Proficiency Overview</div>
            {allSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-1.5 group"
              >
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-textMain font-medium">{skill.subject}</span>
                    <span className="text-textDim text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                      {skill.tools}
                    </span>
                  </div>
                  <span style={{ color: skill.color }} className="font-bold font-mono">{skill.value}%</span>
                </div>
                <AnimatedBar value={skill.value} color={skill.color} delay={index * 0.05} />
              </motion.div>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
