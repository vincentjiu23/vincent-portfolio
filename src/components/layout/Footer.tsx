import React from "react";
import { Github, Linkedin, Mail, Database } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="container mx-auto px-6 py-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-[64px]">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-inter font-bold text-lg text-text-main mb-4">
              <Database size={20} className="text-text-main" />
              <span className="tracking-tight">Vincent.</span>
            </div>
            <p className="text-text-muted text-[14px] leading-relaxed max-w-xs">
              Designing, developing, and securing digital experiences with engineering-grade precision.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-[14px] font-semibold text-text-main mb-4">Product</h4>
            <div className="flex flex-col gap-3">
              {["Overview", "Security", "Performance", "Integrations"].map((link) => (
                <a key={link} href={`#`} className="text-[14px] text-text-muted hover:text-text-main transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-[14px] font-semibold text-text-main mb-4">Resources</h4>
            <div className="flex flex-col gap-3">
              {["Documentation", "GitHub Hub", "Illustrations", "Blog"].map((link) => (
                <a key={link} href={`#`} className="text-[14px] text-text-muted hover:text-text-main transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[14px] font-semibold text-text-main mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <a href="#about" className="text-[14px] text-text-muted hover:text-text-main transition-colors w-fit">About</a>
              <a href="#contact" className="text-[14px] text-text-muted hover:text-text-main transition-colors w-fit">Contact</a>
              <a href="https://github.com/vincentjiu23" target="_blank" rel="noreferrer" className="text-[14px] text-text-muted hover:text-text-main transition-colors w-fit flex items-center gap-2">
                <Github size={14} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/vincentjiu/" target="_blank" rel="noreferrer" className="text-[14px] text-text-muted hover:text-text-main transition-colors w-fit flex items-center gap-2">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="mailto:vincent@example.com" className="text-[14px] text-text-muted hover:text-text-main transition-colors w-fit flex items-center gap-2">
                <Mail size={14} /> Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hairline pt-6 flex flex-col md:flex-row items-center justify-between text-[13px] text-text-soft">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Vincent Jiu. All rights reserved.</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Built with Next.js</span>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-text-muted">Privacy Policy</a>
            <a href="#" className="hover:text-text-muted">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
