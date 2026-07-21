"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Security", href: "#security" },
  { name: "Illustration", href: "#illustration" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function TopNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-borderDark py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 font-pixel text-sm text-textMain hover:text-primary transition-colors">
          <Terminal size={18} className="text-primary group-hover:animate-pulse" />
          <span>&gt; VJ_</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-textMuted">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/50"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 text-textDim border-r border-borderDark pr-4">
            <Link href="https://github.com" target="_blank" className="hover:text-textMain transition-colors">
              <Github size={18} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-textMain transition-colors">
              <Linkedin size={18} />
            </Link>
            <Link href="mailto:contact@example.com" className="hover:text-textMain transition-colors">
              <Mail size={18} />
            </Link>
          </div>
          <Link 
            href="/cv.pdf"
            className="text-xs font-pixel text-primary border border-primary/50 px-3 py-1.5 rounded hover:bg-primary/10 transition-colors"
          >
            CV
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-textMain"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-borderDark py-4 px-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-textMuted hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-borderDark my-2" />
            <div className="flex items-center gap-4 text-textMuted">
              <Link href="https://github.com" target="_blank"><Github size={20} /></Link>
              <Link href="https://linkedin.com" target="_blank"><Linkedin size={20} /></Link>
              <Link href="mailto:contact@example.com"><Mail size={20} /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
