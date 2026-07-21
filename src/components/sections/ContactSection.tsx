"use client";

import React, { useState, useEffect, useRef } from "react";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { motion, AnimatePresence } from "framer-motion";

type TermLine = { type: "input" | "output" | "error" | "success"; text: string };

const HELP_TEXT = [
  "Available commands:",
  "  contact --me     Show contact information",
  "  send --message   Open contact form",
  "  download --cv    Download resume",
  "  skills           Show skills overview",
  "  clear            Clear terminal",
  "  help             Show this help message",
];

export default function ContactSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TermLine[]>([
    { type: "output", text: "Welcome to Vincent's contact terminal." },
    { type: "output", text: 'Type "help" for available commands.' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const addLines = (lines: TermLine[]) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addLines([{ type: "input", text: `$ ${cmd}` }]);

    switch (trimmed) {
      case "contact --me":
        addLines([
          { type: "success", text: "Establishing secure connection... OK." },
          { type: "output", text: "" },
          { type: "output", text: "  Email      → vincent@example.com" },
          { type: "output", text: "  LinkedIn   → linkedin.com/in/vjiu" },
          { type: "output", text: "  GitHub     → github.com/vjiu" },
          { type: "output", text: "  Behance    → behance.net/vjiu" },
          { type: "output", text: "  Location   → Jakarta, Indonesia" },
          { type: "output", text: "" },
        ]);
        break;
      case "send --message":
        setShowForm(true);
        addLines([{ type: "success", text: "Opening contact form..." }]);
        break;
      case "download --cv":
        addLines([
          { type: "success", text: "Downloading resume..." },
          { type: "output", text: "[████████████████████████] 100%" },
          { type: "output", text: "→ vincent_jiu_cv.pdf saved." },
        ]);
        break;
      case "skills":
        addLines([
          { type: "output", text: "Frontend    ████████████████████░ 95%" },
          { type: "output", text: "Design      ████████████████████░ 92%" },
          { type: "output", text: "Database    █████████████████░░░░ 88%" },
          { type: "output", text: "Security    █████████████████░░░░ 85%" },
          { type: "output", text: "Backend     ████████████████░░░░░ 80%" },
          { type: "output", text: "Cloud       ███████████████░░░░░░ 75%" },
        ]);
        break;
      case "clear":
        setHistory([]);
        setShowForm(false);
        return;
      case "help":
        addLines(HELP_TEXT.map((t) => ({ type: "output" as const, text: t })));
        break;
      default:
        addLines([{ type: "error", text: `command not found: ${cmd}` }]);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <section className="container mx-auto px-6 py-24" id="contact">
      <div className="flex flex-col gap-4 mb-12 items-center text-center">
        <h2 className="font-display text-4xl text-textMain tracking-wide">Initiate Connection</h2>
        <div className="h-1 w-20 bg-primary mx-auto"></div>
        <p className="text-textMuted text-sm">Interactive terminal. Type commands to interact.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <TerminalWindow title="contact@vincent:~" className="min-h-[400px]">
          <div
            className="flex flex-col gap-1 max-h-[350px] overflow-y-auto font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === "input" ? "text-textMain" :
                  line.type === "error" ? "text-[#FF5F56]" :
                  line.type === "success" ? "text-highlight" :
                  "text-textMuted"
                }
              >
                {line.text || "\u00A0"}
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
              <span className="text-highlight shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                className="bg-transparent border-none outline-none text-textMain flex-1 font-mono text-sm"
                autoFocus
              />
              <span className="w-2 h-4 bg-textMain animate-blink-cursor shrink-0"></span>
            </form>

            <div ref={bottomRef} />
          </div>
        </TerminalWindow>

        {/* Contact Form (shown on send --message) */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <div className="bg-card border border-borderDark rounded-lg p-6">
                <h3 className="font-bold text-textMain mb-4 text-sm">Send a Message</h3>
                <form className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="bg-background border border-borderDark rounded px-4 py-2.5 text-sm text-textMain placeholder:text-textDim focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="bg-background border border-borderDark rounded px-4 py-2.5 text-sm text-textMain placeholder:text-textDim focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="bg-background border border-borderDark rounded px-4 py-2.5 text-sm text-textMain placeholder:text-textDim focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your message..."
                    className="bg-background border border-borderDark rounded px-4 py-2.5 text-sm text-textMain placeholder:text-textDim focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                  <button
                    type="button"
                    className="bg-primary text-background font-pixel text-xs px-6 py-3 rounded hover:bg-primary/90 transition-colors w-fit"
                    onClick={() => {
                      addLines([{ type: "success", text: "Message sent successfully! ✓" }]);
                      setShowForm(false);
                    }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
