"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, X, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ClickHouseButton from "@/components/ui/ClickHouseButton";

const NAV_LINKS = [
  { name: "Product", href: "#projects" },
  { name: "Security", href: "#security" },
  { name: "Developers", href: "#github" },
  { name: "Company", href: "#about" },
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
        "fixed top-0 z-40 w-full transition-all duration-300 h-16 flex items-center",
        isScrolled 
          ? "bg-canvas/90 backdrop-blur-md border-b border-hairline shadow-sm" 
          : "bg-canvas"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 font-inter font-bold text-lg text-text-main hover:text-primary transition-colors">
          <Database size={20} className="text-primary" />
          <span className="tracking-tight">Vincent.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-text-muted">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="hover:text-text-main transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-4 text-text-muted border-r border-hairline pr-6">
            <Link href="https://github.com/vincentjiu23" target="_blank" className="hover:text-text-main transition-colors">
              <Github size={18} />
            </Link>
            <Link href="https://www.linkedin.com/in/vincentjiu/" target="_blank" className="hover:text-text-main transition-colors">
              <Linkedin size={18} />
            </Link>
            <Link href="mailto:contact@example.com" className="hover:text-text-main transition-colors">
              <Mail size={18} />
            </Link>
          </div>
          <ClickHouseButton variant="primary" as="a" href="#contact" className="ml-2">
            Get Started
          </ClickHouseButton>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-main"
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
            className="absolute top-16 left-0 w-full bg-canvas border-b border-hairline py-4 px-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-text-muted hover:text-text-main font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-hairline my-2" />
            <div className="flex items-center gap-6 text-text-muted">
              <Link href="https://github.com/vincentjiu23" target="_blank" className="hover:text-text-main"><Github size={20} /></Link>
              <Link href="https://www.linkedin.com/in/vincentjiu/" target="_blank" className="hover:text-text-main"><Linkedin size={20} /></Link>
              <Link href="mailto:contact@example.com" className="hover:text-text-main"><Mail size={20} /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
