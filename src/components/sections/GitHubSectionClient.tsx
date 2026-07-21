"use client";

import React, { useState } from "react";
import CodeWindowCard from "@/components/ui/CodeWindowCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, GitFork, Github, User, MapPin, Calendar, ExternalLink,
  GitCommit, GitPullRequest, Eye, BookOpen, Activity, BarChart3,
  FolderGit2, Clock, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Language Colors ---
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F1E05A", Python: "#3572A5",
  Java: "#B07219", "C++": "#F34B7D", C: "#555555", Go: "#00ADD8",
  Rust: "#DEA584", Ruby: "#701516", PHP: "#4F5D95", Swift: "#F05138",
  Kotlin: "#A97BFF", Dart: "#00B4AB", HTML: "#E34C26", CSS: "#563D7C",
  Shell: "#89E051", "Jupyter Notebook": "#DA5B0B", Vue: "#41B883",
  Svelte: "#FF3E00", SCSS: "#C6538C", Lua: "#000080", Zig: "#EC915C",
  Dockerfile: "#384D54", Makefile: "#427819",
};
const getLangColor = (lang: string) => LANG_COLORS[lang] || "#888888";

// --- Event Icons ---
const getEventIcon = (type: string) => {
  switch (type) {
    case "PushEvent": return <GitCommit size={14} />;
    case "PullRequestEvent": return <GitPullRequest size={14} />;
    case "WatchEvent": return <Star size={14} />;
    case "CreateEvent": return <FolderGit2 size={14} />;
    case "ForkEvent": return <GitFork size={14} />;
    case "IssuesEvent": return <BookOpen size={14} />;
    default: return <Activity size={14} />;
  }
};
const getEventLabel = (type: string) => {
  switch (type) {
    case "PushEvent": return "pushed to";
    case "PullRequestEvent": return "opened PR in";
    case "WatchEvent": return "starred";
    case "CreateEvent": return "created";
    case "ForkEvent": return "forked";
    case "IssuesEvent": return "opened issue in";
    case "DeleteEvent": return "deleted from";
    case "ReleaseEvent": return "released in";
    default: return type.replace("Event", "").toLowerCase();
  }
};
const getEventColor = (type: string) => {
  switch (type) {
    case "PushEvent": return "text-primary";
    case "PullRequestEvent": return "text-accent-blue";
    case "WatchEvent": return "text-primary";
    case "CreateEvent": return "text-accent-emerald";
    case "ForkEvent": return "text-primary";
    default: return "text-text-muted";
  }
};

// --- Types ---
type GitHubRepo = {
  name: string; description: string; language: string;
  stargazers_count: number; forks_count: number;
  html_url: string; updated_at: string; topics: string[];
};
type ActivityEvent = {
  type: string; repo: string; created_at: string;
  message: string; ref: string; ref_type: string;
};
type GitHubData = {
  username: string;
  profile: {
    avatar_url: string; name: string; bio: string;
    location: string; blog: string; company: string;
    created_at: string; public_repos: number; public_gists: number;
    followers: number; following: number;
  };
  stats: {
    totalRepos: number; totalStars: number; totalForks: number;
    totalGists: number; followersCount: number; followingCount: number;
  };
  languages: { name: string; percent: number }[];
  topStarred: GitHubRepo[];
  recentlyUpdated: GitHubRepo[];
  activityFeed: ActivityEvent[];
};

// --- Tabs ---
const TABS = [
  { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
  { id: "repos", label: "Repositories", icon: <FolderGit2 size={16} /> },
  { id: "activity", label: "Activity Feed", icon: <Activity size={16} /> },
  { id: "stats", label: "Stats & Graphs", icon: <Zap size={16} /> },
];

export default function GitHubSectionClient({ data }: { data: GitHubData }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [repoView, setRepoView] = useState<"starred" | "recent">("starred");

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  const memberSince = data.profile.created_at
    ? new Date(data.profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <section className="container mx-auto px-6 py-section" id="github">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="display-lg text-text-main max-w-2xl">Developer insights.</h2>
        <p className="text-text-muted text-lg max-w-xl">
          Live repository data and activity from <span className="font-mono bg-surface-card px-2 py-0.5 rounded text-text-main">github.com/{data.username}</span>.
        </p>
      </div>

      {/* Profile Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-surface-card border border-hairline rounded-lg p-xl mb-12 flex flex-col md:flex-row items-start md:items-center gap-8"
      >
        {data.profile.avatar_url && (
          <img
            src={data.profile.avatar_url}
            alt={data.profile.name}
            className="w-24 h-24 rounded-full border border-hairline-strong"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h3 className="display-sm">{data.profile.name}</h3>
            <span className="text-[12px] font-mono text-text-muted bg-canvas px-2 py-1 rounded border border-hairline">@{data.username}</span>
          </div>
          {data.profile.bio && <p className="text-[16px] text-text-body mt-1 max-w-2xl">{data.profile.bio}</p>}
          <div className="flex flex-wrap items-center gap-6 mt-4 text-[14px] text-text-muted font-medium">
            {data.profile.location && (
              <span className="flex items-center gap-1.5"><MapPin size={16} /> {data.profile.location}</span>
            )}
            {data.profile.company && (
              <span className="flex items-center gap-1.5"><User size={16} /> {data.profile.company}</span>
            )}
            {memberSince && (
              <span className="flex items-center gap-1.5"><Calendar size={16} /> Joined {memberSince}</span>
            )}
            {data.profile.blog && (
              <a href={data.profile.blog.startsWith("http") ? data.profile.blog : `https://${data.profile.blog}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline underline-offset-4">
                <ExternalLink size={16} /> {data.profile.blog}
              </a>
            )}
          </div>
        </div>
        {/* Mini stats in profile bar */}
        <div className="flex gap-6 text-center shrink-0 mt-4 md:mt-0">
          {[
            { label: "Repos", value: data.stats.totalRepos },
            { label: "Followers", value: data.stats.followersCount },
            { label: "Following", value: data.stats.followingCount },
          ].map((s) => (
            <div key={s.label}>
              <div className="display-sm text-text-main leading-none mb-1">{s.value}</div>
              <div className="text-[12px] text-text-muted uppercase tracking-wider font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 overflow-x-auto border-b border-hairline pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-[14px] font-semibold rounded-md transition-all duration-200 shrink-0",
              activeTab === tab.id
                ? "bg-surface-card text-text-main border border-hairline"
                : "bg-transparent text-text-muted hover:text-text-main hover:bg-surface-soft"
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {/* ===================== OVERVIEW TAB ===================== */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats Grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Repositories", value: data.stats.totalRepos, icon: <FolderGit2 size={20} />, color: "text-text-main" },
                    { label: "Stars Earned", value: data.stats.totalStars, icon: <Star size={20} />, color: "text-primary" },
                    { label: "Total Forks", value: data.stats.totalForks, icon: <GitFork size={20} />, color: "text-text-main" },
                    { label: "Gists", value: data.stats.totalGists, icon: <BookOpen size={20} />, color: "text-text-main" },
                    { label: "Followers", value: data.stats.followersCount, icon: <User size={20} />, color: "text-text-main" },
                    { label: "Following", value: data.stats.followingCount, icon: <Eye size={20} />, color: "text-text-main" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className="bg-surface-card border border-hairline rounded-lg p-xl hover:border-hairline-strong transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={cn(stat.color)}>{stat.icon}</span>
                      </div>
                      <div className={cn("display-md mb-1", stat.color)}>{stat.value}</div>
                      <div className="text-[12px] text-text-muted uppercase font-semibold tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Language Breakdown */}
                <CodeWindowCard title="languages.ts">
                  <div className="flex flex-col gap-4 p-2">
                    <div className="text-[12px] text-text-muted">// Repository language distribution</div>
                    {/* Stacked bar */}
                    <div className="w-full h-3 rounded-full overflow-hidden flex border border-hairline">
                      {data.languages.map((lang, i) => (
                        <motion.div
                          key={lang.name}
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.percent}%` }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                          className="h-full relative group cursor-pointer"
                          style={{ backgroundColor: getLangColor(lang.name) }}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface-elevated border border-hairline rounded-md text-[10px] text-text-main font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {lang.name}: {lang.percent}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    {/* Legend Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 font-sans">
                      {data.languages.map((lang) => (
                        <div key={lang.name} className="flex items-center justify-between text-[14px] group cursor-default">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: getLangColor(lang.name) }} />
                            <span className="text-text-muted group-hover:text-text-main transition-colors truncate font-semibold">{lang.name}</span>
                          </div>
                          <span className="text-text-body font-mono">{lang.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CodeWindowCard>
              </div>

              {/* Right: Recent Activity Mini */}
              <div className="flex flex-col gap-4">
                <div className="text-[14px] font-semibold text-text-main uppercase tracking-wider flex items-center gap-2">
                  <Activity size={16} className="text-primary" /> Event Log
                </div>
                <div className="bg-surface-card border border-hairline rounded-lg divide-y divide-hairline overflow-hidden max-h-[640px] overflow-y-auto">
                  {data.activityFeed.length > 0 ? data.activityFeed.slice(0, 10).map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 hover:bg-surface-elevated transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className={cn("mt-0.5 shrink-0", getEventColor(event.type))}>
                          {getEventIcon(event.type)}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[14px] text-text-muted leading-relaxed">
                            <span className={cn("font-semibold", getEventColor(event.type))}>{getEventLabel(event.type)}</span>{" "}
                            <span className="text-text-main font-mono">{event.repo.split("/").pop()}</span>
                          </p>
                          {event.message && (
                            <p className="text-[12px] text-text-body mt-1 truncate">{event.message}</p>
                          )}
                          <p className="text-[12px] text-text-muted mt-2 flex items-center gap-1 font-semibold">
                            <Clock size={12} /> {timeAgo(event.created_at)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="p-8 text-center text-[14px] text-text-muted font-medium">No recent events</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===================== REPOS TAB ===================== */}
          {activeTab === "repos" && (
            <div>
              {/* Sort Toggle */}
              <div className="flex gap-2 mb-8 border-b border-hairline pb-4">
                {(["starred", "recent"] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setRepoView(view)}
                    className={cn(
                      "px-4 py-2 text-[14px] font-semibold rounded-md transition-all duration-200",
                      repoView === view
                        ? "bg-surface-card text-text-main border border-hairline"
                        : "bg-transparent text-text-muted hover:text-text-main hover:bg-surface-soft"
                    )}
                  >
                    {view === "starred" ? "⭐ Most Starred" : "🕐 Recently Updated"}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(repoView === "starred" ? data.topStarred : data.recentlyUpdated).map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-surface-card border border-hairline rounded-lg p-xl hover:border-hairline-strong transition-all duration-300 flex flex-col group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <FolderGit2 size={18} className="text-text-muted shrink-0" />
                      <span className="text-[18px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </span>
                    </div>
                    <p className="text-[14px] text-text-muted mb-6 leading-relaxed line-clamp-2 flex-1">
                      {repo.description || "No description provided."}
                    </p>
                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span key={topic} className="text-[12px] px-2 py-1 rounded-sm bg-canvas text-text-body border border-hairline font-semibold">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-[13px] text-text-muted font-semibold mt-auto pt-4 border-t border-hairline">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: getLangColor(repo.language) }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 hover:text-primary transition-colors"><Star size={14} /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1.5 hover:text-text-main transition-colors"><GitFork size={14} /> {repo.forks_count}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* ===================== ACTIVITY FEED TAB ===================== */}
          {activeTab === "activity" && (
            <div className="max-w-4xl mx-auto">
              <CodeWindowCard title="events.ts">
                <div className="flex flex-col gap-2 p-2">
                  <div className="text-[12px] text-text-muted mb-4">// System event stream</div>
                  {data.activityFeed.length > 0 ? data.activityFeed.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-4 py-3 px-4 rounded-md hover:bg-surface-elevated transition-colors border border-transparent hover:border-hairline"
                    >
                      <span className={cn("mt-0.5 shrink-0", getEventColor(event.type))}>
                        {getEventIcon(event.type)}
                      </span>
                      <div className="flex-1 min-w-0 font-sans">
                        <p className="text-[14px] text-text-muted">
                          <span className={cn("font-bold", getEventColor(event.type))}>{getEventLabel(event.type)}</span>{" "}
                          <a
                            href={`https://github.com/${event.repo}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-text-main hover:text-primary transition-colors font-mono font-semibold"
                          >
                            {event.repo}
                          </a>
                        </p>
                        {event.message && (
                          <p className="text-[13px] text-text-body mt-1 font-mono truncate max-w-xl">
                            &quot;{event.message}&quot;
                          </p>
                        )}
                        {event.ref && event.ref_type && (
                          <p className="text-[12px] text-text-muted mt-1">
                            {event.ref_type}: <span className="text-text-main font-mono bg-canvas px-1.5 py-0.5 rounded border border-hairline">{event.ref}</span>
                          </p>
                        )}
                      </div>
                      <span className="text-[12px] text-text-muted font-semibold shrink-0 mt-0.5 flex items-center gap-1.5">
                        <Clock size={12} /> {timeAgo(event.created_at)}
                      </span>
                    </motion.div>
                  )) : (
                    <div className="py-12 text-center text-text-muted text-[14px] font-semibold">
                      No recent public events found.
                    </div>
                  )}
                </div>
              </CodeWindowCard>
            </div>
          )}

          {/* ===================== STATS & GRAPHS TAB ===================== */}
          {activeTab === "stats" && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* GitHub Readme Stats */}
              <CodeWindowCard title="metrics.svg">
                <div className="p-4">
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&title_color=faff69&text_color=cccccc&icon_color=faff69&bg_color=0a0a0a&border_color=2a2a2a`}
                    alt="GitHub Stats"
                    className="w-full rounded-md"
                  />
                </div>
              </CodeWindowCard>

              {/* Streak Stats */}
              <CodeWindowCard title="streak.svg">
                <div className="p-4">
                  <img
                    src={`https://streak-stats.demolab.com/?user=${data.username}&ring=faff69&fire=faff69&currStreakLabel=cccccc&sideLabels=cccccc&sideNums=faff69&currStreakNum=faff69&dates=888888&background=0a0a0a&border=2a2a2a`}
                    alt="GitHub Streak"
                    className="w-full rounded-md"
                  />
                </div>
              </CodeWindowCard>

              {/* Top Languages */}
              <CodeWindowCard title="languages.svg">
                <div className="p-4">
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&title_color=faff69&text_color=cccccc&bg_color=0a0a0a&border_color=2a2a2a`}
                    alt="Top Languages"
                    className="w-full rounded-md"
                  />
                </div>
              </CodeWindowCard>

              {/* Contribution Graph (Activity) */}
              <CodeWindowCard title="activity.svg">
                <div className="p-4">
                  <img
                    src={`https://github-readme-activity-graph.vercel.app/graph?username=${data.username}&bg_color=0a0a0a&color=cccccc&line=faff69&point=ffffff&area_color=faff69&border_color=2a2a2a`}
                    alt="Contribution Graph"
                    className="w-full rounded-md"
                  />
                </div>
              </CodeWindowCard>

              {/* Full Width: Repo badges */}
              <div className="md:col-span-2">
                <CodeWindowCard title="badges.sh">
                  <div className="flex flex-col gap-4 p-4">
                    <div className="text-[12px] text-text-muted">// Generated shields</div>
                    <div className="flex flex-wrap gap-4">
                      {data.topStarred.slice(0, 6).map((repo) => (
                        <a
                          key={repo.name}
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 bg-canvas border border-hairline rounded-md px-4 py-2 hover:border-hairline-strong transition-all duration-200 group"
                        >
                          <FolderGit2 size={16} className="text-text-muted" />
                          <span className="text-[14px] font-semibold text-text-main group-hover:text-primary transition-colors font-mono">{repo.name}</span>
                          <div className="flex gap-2 ml-4">
                            <img src={`https://img.shields.io/github/stars/${data.username}/${repo.name}?style=flat-square&color=faff69&labelColor=1a1a1a`} alt="stars" className="h-5 rounded-sm" />
                            <img src={`https://img.shields.io/github/forks/${data.username}/${repo.name}?style=flat-square&color=888888&labelColor=1a1a1a`} alt="forks" className="h-5 rounded-sm" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </CodeWindowCard>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
