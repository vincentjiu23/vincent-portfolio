import React from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-borderDark bg-card/30 mt-12">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div>
            <div className="font-pixel text-sm text-primary mb-3">&gt; VJ_</div>
            <p className="text-textDim text-xs leading-relaxed">
              Designing, Developing, and Securing Digital Experiences. Built with passion and lots of coffee.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-textMain uppercase tracking-wider mb-3">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Home", "Projects", "Security", "Design", "Experience", "About"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-xs text-textDim hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-xs font-bold text-textMain uppercase tracking-wider mb-3">Connect</h4>
            <div className="flex gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-textDim hover:text-textMain transition-colors p-2 bg-background border border-borderDark rounded hover:border-primary/30">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-textDim hover:text-textMain transition-colors p-2 bg-background border border-borderDark rounded hover:border-primary/30">
                <Linkedin size={16} />
              </a>
              <a href="mailto:vincent@example.com" className="text-textDim hover:text-textMain transition-colors p-2 bg-background border border-borderDark rounded hover:border-primary/30">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-borderDark pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-textDim">
          <div className="flex items-center gap-1">
            Built with <Heart size={10} className="text-primary mx-0.5" /> using Next.js · Designed in Figma · Hosted on Vercel
          </div>
          <div className="mt-2 md:mt-0">
            © {new Date().getFullYear()} Vincent Jiu. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
