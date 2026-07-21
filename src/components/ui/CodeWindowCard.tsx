import React from "react";
import { cn } from "@/lib/utils";

interface CodeWindowCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function CodeWindowCard({ title, children, className }: CodeWindowCardProps) {
  return (
    <div className={cn("bg-surface-card border border-hairline rounded-lg overflow-hidden flex flex-col", className)}>
      {/* Optional Top Bar for File Name or Command */}
      {title && (
        <div className="bg-surface-elevated border-b border-hairline px-4 py-2 flex items-center gap-3">
          {/* Subtle colored dots (optional, keeping them very minimal/gray) */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-hairline-strong" />
            <div className="w-2.5 h-2.5 rounded-full bg-hairline-strong" />
            <div className="w-2.5 h-2.5 rounded-full bg-hairline-strong" />
          </div>
          <div className="text-xs font-mono text-text-muted">{title}</div>
        </div>
      )}
      
      {/* Content Area */}
      <div className="p-lg font-mono text-text-body text-sm leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
