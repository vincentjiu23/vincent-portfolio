"use client";

import React from "react";
import content from "@/data/content.json";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { motion } from "framer-motion";
import { Star, GitFork, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const getContribColor = (count: number) => {
  if (count === 0) return "bg-[#161b22]";
  if (count <= 2) return "bg-highlight/20";
  if (count <= 4) return "bg-highlight/40";
  if (count <= 6) return "bg-highlight/60";
  return "bg-highlight/90";
};

export default function GitHubSection() {
  return (
    <section className="container mx-auto px-6 py-24" id="github">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display text-4xl text-textMain tracking-wide">GitHub Activity</h2>
        <div className="h-1 w-20 bg-primary"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Stats + Contribution Graph */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Commits", value: content.githubStats.totalCommits, color: "text-highlight" },
              { label: "Repositories", value: content.githubStats.totalRepos, color: "text-primary" },
              { label: "Stars Earned", value: content.githubStats.totalStars, color: "text-[#FFBD2E]" },
              { label: "Pull Requests", value: content.githubStats.totalPRs, color: "text-secondary" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-borderDark rounded-lg p-4 text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={cn("text-2xl font-bold font-display", stat.color)}>{stat.value}</div>
                <div className="text-[10px] text-textDim uppercase mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Contribution Graph */}
          <TerminalWindow title="contributions.sh">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-textDim">$ git log --oneline --graph --all | wc -l</div>
              <div className="flex flex-wrap gap-[3px]">
                {content.githubStats.contributionData.map((count, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.01 }}
                    className={cn(
                      "w-3 h-3 rounded-[2px] transition-all duration-200 hover:ring-1 hover:ring-textMuted/50",
                      getContribColor(count)
                    )}
                    title={`${count} contributions`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-textDim mt-2">
                <span>Less</span>
                <div className="flex gap-[2px]">
                  {[0, 1, 3, 5, 7].map((v, i) => (
                    <div key={i} className={cn("w-3 h-3 rounded-[2px]", getContribColor(v))} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </TerminalWindow>

          {/* Language Breakdown */}
          <TerminalWindow title="languages.sh">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-textDim">$ tokei --sort lines .</div>
              {/* Stacked bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex">
                {content.githubStats.topLanguages.map((lang, i) => (
                  <div
                    key={i}
                    className="h-full transition-all duration-500"
                    style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percent}%`}
                  />
                ))}
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-1">
                {content.githubStats.topLanguages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-textMuted">{lang.name}</span>
                    <span className="text-textDim">{lang.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TerminalWindow>
        </div>

        {/* Right: Pinned Repos */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-mono text-textDim mb-1">Pinned repositories</div>
          {content.githubStats.pinned.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/vjiu/${repo.name}`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-borderDark rounded-lg p-4 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <Github size={14} className="text-textDim" />
                <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{repo.name}</span>
              </div>
              <p className="text-xs text-textMuted mb-3 leading-relaxed">{repo.description}</p>
              <div className="flex items-center gap-4 text-[11px] text-textDim">
                {repo.language !== "N/A" && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1"><Star size={12} /> {repo.stars}</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
