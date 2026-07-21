import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import CybersecuritySection from "@/components/sections/CybersecuritySection";
import IllustrationSection from "@/components/sections/IllustrationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import GitHubSection from "@/components/sections/GitHubSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-borderDark to-transparent" />
      </div>

      <SkillsSection />
      <TechStackSection />

      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-borderDark to-transparent" />
      </div>

      <PortfolioSection />
      <CybersecuritySection />

      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-borderDark to-transparent" />
      </div>

      <IllustrationSection />

      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-borderDark to-transparent" />
      </div>

      <ExperienceSection />
      <GitHubSection />

      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-borderDark to-transparent" />
      </div>

      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
