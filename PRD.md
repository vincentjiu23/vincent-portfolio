# Product Requirements Document (PRD)
**Project Name**: Premium Developer Portfolio
**Author**: Vincent Jiu (via AI Assistant)
**Date**: July 2026

## 1. Product Overview

The goal of this project is to build a premium, highly interactive personal portfolio website. Unlike standard portfolio templates, this website is designed to simulate a "developer workstation," immersing visitors in an environment that blends modern UX with a hacker/terminal aesthetic.

## 2. Target Audience

- **Recruiters & Talent Acquisition**: Looking for clear summaries of experience, skills, and contact info.
- **Software Engineers & Peers**: Looking for technical depth, code quality, and impressive UI/UX implementation.
- **Designers**: Looking for aesthetic cohesion, micro-animations, and visual polish.

## 3. Design Aesthetic & Themes

The UI is a deliberate hybrid of several distinct visual styles:
- **Linux Terminal / Hacker Vibe**: Monospace fonts, glowing text, command-line interfaces.
- **Retro GUI (Windows 95/98)**: Window frames, pixelated buttons, pixel fonts.
- **GitHub / Developer Tools**: Contribution graphs, code snippet aesthetics, markdown rendering.
- **Modern Minimalist**: Dark mode base (`#0d1b2a`), smooth framer-motion animations, bento-box layouts, and glassmorphism.

**Core Color Palette**:
- Background: `#0d1b2a` (Deep Navy)
- Primary: `#F68E5F` (Orange/Coral)
- Secondary: `#586BA4` (Muted Blue)
- Highlight: `#CAFF8A` (Neon Green)

## 4. Core Features & Architecture

### 4.1. Data-Driven Architecture
The entire content of the site must be decoupled from the React components. A single `content.json` file dictates the skills, projects, timeline, and stats.

### 4.2. Boot Sequence
- A one-time (per session) simulated OS boot screen that outputs system logs before revealing the actual website.
- Users can press `ESC` or a button to skip.

### 4.3. Navigation
- Sticky top navigation bar with a pixel-art logo.
- Smooth scrolling to anchor links.
- Responsive mobile menu.

### 4.4. Sections

1. **Hero**: Typewriter effect displaying various titles. Floating avatar or window.
2. **Skills**: Visual representation of skills using a Radar Chart and animated progress bars.
3. **Tech Stack**: A grid of technologies categorized (Frontend, Backend, etc.) with hover states showing proficiency.
4. **Portfolio**: A filterable gallery of projects. Clicking a project opens a detailed modal with phases, tech used, and case study details.
5. **Cybersecurity**: Accordion-style layout detailing security domains, plus a section for certifications and stats.
6. **Illustration Gallery**: A masonry grid layout for artwork, complete with a lightbox for full-screen viewing.
7. **Experience**: A timeline styled as a server log file (`/var/log/career.log`), grouping events by year with specific event types (work, award, cert).
8. **GitHub Activity**: A simulated GitHub contribution graph, language usage bar, and pinned repositories.
9. **About**: Rendered to look like a `README.md` file in a code editor.
10. **Contact**: A functional terminal emulator where users must type commands (e.g., `contact --me`, `send --message`) to interact.

## 5. Technical Requirements

- **Framework**: Next.js 14 App Router.
- **Styling**: Tailwind CSS with custom configuration for colors and fonts.
- **State Management**: React Hooks (`useState`, `useEffect`).
- **Animation**: Framer Motion for scroll reveals, layout animations, and micro-interactions.
- **Icons**: Lucide React.
- **Data Visualization**: Recharts (for the Skills radar chart).
- **Deployment**: Vercel (recommended).

## 6. Future Enhancements (V2)

- Actual backend integration for the contact form (e.g., Resend, Formspree).
- Live GitHub API integration to fetch real contribution data instead of static JSON.
- Spotify currently playing integration.
- Dark/Light mode toggle (currently locked to dark mode by design).
