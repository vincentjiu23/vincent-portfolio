# Vincent Jiu — Premium Developer Portfolio

A highly interactive, premium personal portfolio website designed to feel like a developer workstation. It combines the aesthetics of a Linux terminal, retro GUIs, modern developer portfolios, and brutalist design.

## 🚀 Features

- **Terminal-Style Interface**: A unique, immersive experience featuring a simulated OS boot sequence and interactive command-line components.
- **12 Interactive Sections**:
  - **Boot Sequence**: Simulated OS startup animation.
  - **Hero**: Typewriter effect with an interactive terminal prompt.
  - **Skills**: Domain proficiency with scroll-triggered animated progress bars and a radar chart.
  - **Tech Stack**: Filterable grid of 25+ technologies with terminal-style cards and hover tooltips.
  - **Portfolio**: 12+ projects with category tabs, detailed case study modals, and hybrid project badges.
  - **Cybersecurity**: Expandable domain areas, certifications, and security stats.
  - **Illustration**: Pinterest-style masonry gallery with a lightbox preview.
  - **Experience**: Linux log-style timeline with typed event badges.
  - **GitHub Activity**: Contribution graph, language breakdown, and pinned repos.
  - **About**: README.md style container with goals, interests, and fun facts.
  - **Contact**: Fully functional interactive terminal emulator (try `contact --me`, `send --message`, `download --cv`).
  - **Footer**: Comprehensive navigation and social links.
- **Data-Driven**: All content is managed through a single `src/data/content.json` file for easy updates without touching React code.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- **Smooth Animations**: Powered by Framer Motion for seamless page transitions and micro-interactions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Fonts**: Google Fonts (Inter, Bebas Neue, Press Start 2P)

## 💻 Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd porto_vincent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/src/app` - Next.js App Router files, global CSS, and main layout.
- `/src/components` - React components categorized into `ui` (reusable atomic parts), `layout` (nav/footer), and `sections` (main page blocks).
- `/src/data` - Contains `content.json` which powers the entire site's content.
- `/src/lib` - Utility functions (e.g., `cn` for Tailwind class merging).
- `tailwind.config.ts` - Custom color palette and font definitions.

## 🎨 Customization

To update the portfolio with your own information, simply edit `src/data/content.json`. The UI will automatically adapt to your new data, including generating tabs, calculating percentages, and populating modals.

## 📄 License

This project is open-source and available under the MIT License.
