"use client";

import React, { useState, useEffect } from "react";
import TerminalWindow from "@/components/ui/TerminalWindow";
import PixelButton from "@/components/ui/PixelButton";
import { motion } from "framer-motion";

const TITLES = [
  "Information Systems Graduate",
  "Frontend Engineer",
  "Data Enthusiast",
  "Cybersecurity Explorer",
  "UI Designer",
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedTitle === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedTitle === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else {
      timeout = setTimeout(() => {
        setTypedTitle((prev) => 
          isDeleting 
            ? currentTitle.substring(0, prev.length - 1)
            : currentTitle.substring(0, prev.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [typedTitle, isDeleting, titleIndex]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden" id="home">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 25% 25%, rgba(246,142,95,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(88,107,164,0.15) 0%, transparent 50%)"
      }}></div>
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <TerminalWindow title="bash" className="max-w-md">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-highlight">$</span>
                <span className="text-textMain">whoami</span>
              </div>
              <div className="text-primary font-bold text-xl mb-4">Vincent Jiu</div>
              <div className="flex items-center gap-2 h-6">
                <span className="text-highlight">$</span>
                <span className="text-textMuted">{typedTitle}</span>
                <span className="w-2 h-4 bg-textMuted animate-blink-cursor"></span>
              </div>
            </div>
          </TerminalWindow>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight tracking-wide">
            Designing, Developing, <br/> and Securing <br/> <span className="text-primary">Digital Experiences.</span>
          </h1>

          <p className="text-textMuted max-w-lg leading-relaxed">
            I build full-stack applications with an emphasis on robust security, 
            sleek UI/UX design, and seamless performance. Welcome to my digital workspace.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <PixelButton variant="primary">View Projects</PixelButton>
            <PixelButton variant="secondary">Download CV</PixelButton>
          </div>
        </motion.div>

        {/* Right Side: Avatar / Floating Elements */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] flex items-center justify-center"
        >
          {/* Main Avatar / Centerpiece */}
          <div className="w-64 h-64 bg-card border border-borderDark rounded-lg flex items-center justify-center shadow-2xl relative z-20">
            <div className="font-pixel text-primary text-xl">&gt; VJ_</div>
          </div>

          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 right-10 z-30"
          >
            <div className="bg-[#FFBD2E] p-2 rounded shadow-lg font-pixel text-[10px] text-black transform rotate-12">
              Lvl 99 Dev
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-10 z-30"
          >
            <TerminalWindow title="status.log" className="w-48 text-xs bg-black/80 backdrop-blur">
              <span className="text-green-400">System Online.</span><br/>
              <span className="text-textDim">All services running.</span>
            </TerminalWindow>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
