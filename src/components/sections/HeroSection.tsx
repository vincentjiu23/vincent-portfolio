"use client";

import React, { useState, useEffect } from "react";
import CodeWindowCard from "@/components/ui/CodeWindowCard";
import ClickHouseButton from "@/components/ui/ClickHouseButton";
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
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-canvas" id="home">
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: 7 Columns */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-hairline rounded-pill text-xs font-semibold text-text-body w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            System Online
          </div>

          <h1 className="display-xl text-text-main max-w-3xl">
            Designing, developing, and securing digital experiences.
          </h1>

          <div className="text-xl font-medium text-text-body h-8 flex items-center gap-2">
            <span className="text-primary font-bold">Vincent Jiu</span>
            <span className="text-hairline-strong">/</span>
            <span>{typedTitle}</span>
            <span className="w-2 h-5 bg-text-muted animate-blink-cursor"></span>
          </div>

          <p className="text-text-muted text-lg max-w-xl leading-relaxed">
            I build full-stack applications with an emphasis on robust security, sleek UI/UX design, and seamless performance. Welcome to my digital workspace.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <ClickHouseButton variant="primary" as="a" href="#projects">
              View Projects
            </ClickHouseButton>
            <ClickHouseButton variant="secondary" as="a" href="#contact">
              Contact Me
            </ClickHouseButton>
          </div>
        </motion.div>

        {/* Right Side: 5 Columns */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5"
        >
          <CodeWindowCard title="init.ts" className="shadow-2xl shadow-black/50">
            <pre className="text-sm">
              <code>
                <span className="text-accent-rose">import</span> {'{'} Developer, Designer {'}'} <span className="text-accent-rose">from</span> <span className="text-accent-emerald">&apos;@vincent/core&apos;</span>;<br/>
                <span className="text-accent-rose">import</span> {'{'} Security {'}'} <span className="text-accent-rose">from</span> <span className="text-accent-emerald">&apos;@vincent/sec&apos;</span>;<br/>
                <br/>
                <span className="text-accent-blue">const</span> profile = <span className="text-accent-blue">new</span> Developer({'{'}<br/>
                {'  '}name: <span className="text-accent-emerald">&apos;Vincent Jiu&apos;</span>,<br/>
                {'  '}focus: [<span className="text-accent-emerald">&apos;Frontend&apos;</span>, <span className="text-accent-emerald">&apos;Fullstack&apos;</span>, <span className="text-accent-emerald">&apos;Security&apos;</span>],<br/>
                {'  '}location: <span className="text-accent-emerald">&apos;Jakarta, ID&apos;</span><br/>
                {'}'});<br/>
                <br/>
                profile.<span className="text-primary">deploy</span>();
              </code>
            </pre>
          </CodeWindowCard>
        </motion.div>
      </div>
    </section>
  );
}
