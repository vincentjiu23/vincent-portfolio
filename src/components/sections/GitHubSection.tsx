import React from "react";
import GitHubSectionClient from "./GitHubSectionClient";

const GITHUB_USERNAME = "vincentjiu23";
const CACHE_OPTIONS = { next: { revalidate: 3600 } }; // 1 hour cache

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function safeFetch(url: string): Promise<any> {
  try {
    const res = await fetch(url, CACHE_OPTIONS);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function GitHubSection() {
  // Fetch all APIs concurrently for maximum performance
  const [
    userData,
    reposData,
    eventsData,
    followersData,
    followingData,
    gistsData,
  ] = await Promise.all([
    safeFetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
    safeFetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
    safeFetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`),
    safeFetch(`https://api.github.com/users/${GITHUB_USERNAME}/followers?per_page=100`),
    safeFetch(`https://api.github.com/users/${GITHUB_USERNAME}/following?per_page=100`),
    safeFetch(`https://api.github.com/users/${GITHUB_USERNAME}/gists?per_page=100`),
  ]);

  // --- Process Repos ---
  const repos = Array.isArray(reposData) ? reposData : [];
  const totalStars = repos.reduce((acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc: number, r: { forks_count: number }) => acc + r.forks_count, 0);

  // Language aggregation across all repos
  const langMap: Record<string, number> = {};
  repos.forEach((r: { language: string | null; size: number }) => {
    if (r.language) {
      langMap[r.language] = (langMap[r.language] || 0) + (r.size || 1);
    }
  });
  const totalSize = Object.values(langMap).reduce((a, b) => a + b, 0);
  const languages = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, size]) => ({
      name,
      percent: Math.round((size / totalSize) * 100 * 10) / 10,
    }));

  // Sort repos for display (by stars, then by updated)
  const topStarred = [...repos]
    .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r: { name: string; description: string; language: string; stargazers_count: number; forks_count: number; html_url: string; updated_at: string; topics: string[] }) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      html_url: r.html_url,
      updated_at: r.updated_at,
      topics: r.topics || [],
    }));

  const recentlyUpdated = [...repos]
    .sort((a: { pushed_at: string }, b: { pushed_at: string }) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 6)
    .map((r: { name: string; description: string; language: string; stargazers_count: number; forks_count: number; html_url: string; updated_at: string; topics: string[] }) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      html_url: r.html_url,
      updated_at: r.updated_at,
      topics: r.topics || [],
    }));

  // --- Process Events ---
  const events = Array.isArray(eventsData) ? eventsData : [];
  const activityFeed = events.slice(0, 15).map((e: { type: string; repo: { name: string }; created_at: string; payload: { commits?: { message: string }[]; action?: string; ref?: string; ref_type?: string } }) => ({
    type: e.type,
    repo: e.repo?.name || "",
    created_at: e.created_at,
    message: e.payload?.commits?.[0]?.message || e.payload?.action || "",
    ref: e.payload?.ref || "",
    ref_type: e.payload?.ref_type || "",
  }));

  // --- Assemble Data ---
  const githubData = {
    username: GITHUB_USERNAME,
    profile: {
      avatar_url: userData?.avatar_url || "",
      name: userData?.name || GITHUB_USERNAME,
      bio: userData?.bio || "",
      location: userData?.location || "",
      blog: userData?.blog || "",
      company: userData?.company || "",
      created_at: userData?.created_at || "",
      public_repos: userData?.public_repos || 0,
      public_gists: userData?.public_gists || 0,
      followers: userData?.followers || 0,
      following: userData?.following || 0,
    },
    stats: {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      totalGists: Array.isArray(gistsData) ? gistsData.length : 0,
      followersCount: Array.isArray(followersData) ? followersData.length : (userData?.followers || 0),
      followingCount: Array.isArray(followingData) ? followingData.length : (userData?.following || 0),
    },
    languages,
    topStarred,
    recentlyUpdated,
    activityFeed,
  };

  return <GitHubSectionClient data={githubData} />;
}
