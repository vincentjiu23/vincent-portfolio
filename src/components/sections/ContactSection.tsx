"use client";

import React, { useState, useEffect, useRef } from "react";
import CodeWindowCard from "@/components/ui/CodeWindowCard";
import ClickHouseButton from "@/components/ui/ClickHouseButton";
import { motion, AnimatePresence } from "framer-motion";

type TermLine = { type: "input" | "output" | "error" | "success"; text: string };

const HELP_TEXT = [
  "Available commands:",
  "  contact --me     Show contact information",
  "  send --message   Open contact form",
  "  download --cv    Download resume",
  "  clear            Clear output",
  "  help             Show this help message",
];

export default function ContactSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TermLine[]>([
    { type: "output", text: "Welcome to Vincent's contact endpoint." },
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
          { type: "output", text: "  LinkedIn   → linkedin.com/in/vincentjiu" },
          { type: "output", text: "  GitHub     → github.com/vincentjiu23" },
          { type: "output", text: "  Behance    → behance.net/vincentjiu" },
          { type: "output", text: "  Location   → Jakarta, Indonesia" },
          { type: "output", text: "" },
        ]);
        break;
      case "send --message":
        setShowForm(true);
        addLines([{ type: "success", text: "Opening secure contact channel..." }]);
        break;
      case "download --cv":
        addLines([
          { type: "success", text: "Downloading resume..." },
          { type: "output", text: "[████████████████████████] 100%" },
          { type: "output", text: "→ vincent_jiu_cv.pdf saved." },
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
    <section className="container mx-auto px-6 py-section" id="contact">
      {/* CTA Band Yellow Style */}
      <div className="bg-primary text-text-onPrimary rounded-lg p-[64px] flex flex-col md:flex-row gap-12 items-center justify-between">
        <div className="flex-1">
          <h2 className="display-md mb-6">Ready to deploy?</h2>
          <p className="text-[18px] font-semibold opacity-90 max-w-md">
            Whether you need a full-stack build, a security audit, or a complex data pipeline, let&apos;s build it.
          </p>
        </div>
        
        <div className="w-full md:w-[500px]">
          <CodeWindowCard className="min-h-[300px] shadow-2xl">
            <div
              className="flex flex-col gap-1 max-h-[250px] overflow-y-auto font-mono text-sm cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "input" ? "text-text-main font-bold" :
                    line.type === "error" ? "text-accent-rose" :
                    line.type === "success" ? "text-accent-emerald" :
                    "text-text-body"
                  }
                >
                  {line.text || "\u00A0"}
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                <span className="text-primary font-bold shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                  className="bg-transparent border-none outline-none text-text-main flex-1 font-mono text-sm"
                  autoFocus
                />
                <span className="w-2 h-4 bg-text-main animate-blink-cursor shrink-0"></span>
              </form>

              <div ref={bottomRef} />
            </div>
          </CodeWindowCard>

          {/* Contact Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="bg-surface-card border border-hairline rounded-lg p-6">
                  <h3 className="font-bold text-text-main mb-4">Secure Channel</h3>
                  <form className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Name"
                        className="bg-canvas border border-hairline rounded-md px-4 py-2.5 text-[14px] text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="bg-canvas border border-hairline rounded-md px-4 py-2.5 text-[14px] text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      className="bg-canvas border border-hairline rounded-md px-4 py-2.5 text-[14px] text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                    />
                    <textarea
                      rows={3}
                      placeholder="Payload..."
                      className="bg-canvas border border-hairline rounded-md px-4 py-2.5 text-[14px] text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                    <ClickHouseButton
                      variant="primary"
                      type="button"
                      className="w-full mt-2"
                      onClick={() => {
                        addLines([{ type: "success", text: "Payload transmitted successfully." }]);
                        setShowForm(false);
                      }}
                    >
                      Transmit
                    </ClickHouseButton>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
