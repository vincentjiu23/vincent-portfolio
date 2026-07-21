"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "BIOS Version 2.4.1 (C) 2026",
  "Initializing CPU...",
  "CPU OK.",
  "Memory Test: 65536K OK",
  "Mounting root filesystem...",
  "Starting network interface...",
  "Loading Development Environment...",
  "Starting Docker...",
  "Initializing Next.js App Router...",
  "Fetching Portfolio Data...",
  "Welcome, Vincent.",
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    
    // Quick loop to show logs line by line
    const showLogs = async () => {
      for (let i = 0; i < BOOT_LOGS.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 100)); // 100-400ms per line
        setLogs((prev) => [...prev, BOOT_LOGS[i]]);
      }
      
      // Blinking cursor
      setShowCursor(true);
      
      // Wait for a second before fading out
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsFadingOut(true);
      
      // Wait for fade out animation
      timeout = setTimeout(() => {
        onComplete();
      }, 800);
    };

    showLogs();

    return () => clearTimeout(timeout);
  }, [onComplete]);

  // Allow skip with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col bg-black p-6 font-pixel text-xs text-textMain sm:text-sm"
        >
          <div className="flex-1 overflow-hidden">
            {logs.map((log, index) => (
              <div key={index} className="mb-2">
                {log}
              </div>
            ))}
            {showCursor && (
              <div className="mt-4 flex items-center gap-2">
                <span>&gt; _</span>
                <span className="h-4 w-2 animate-blink-cursor bg-textMain"></span>
              </div>
            )}
          </div>
          
          <div className="mt-auto flex justify-end opacity-50">
            Press ESC to skip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
