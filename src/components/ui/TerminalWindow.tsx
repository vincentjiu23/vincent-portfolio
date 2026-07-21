import React from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export default function TerminalWindow({ title = "terminal", children, className, ...props }: TerminalWindowProps) {
  return (
    <div 
      className={cn(
        "flex flex-col overflow-hidden rounded-md border border-borderDark bg-card shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-textMuted/20",
        className
      )}
      {...props}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-borderDark bg-[#252A36] px-4 py-2">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="font-pixel text-[10px] text-textDim">{title}</div>
        <div className="w-12" /> {/* Spacer for centering title */}
      </div>
      
      {/* Terminal Body */}
      <div className="flex-1 p-4 font-mono text-sm text-textMain">
        {children}
      </div>
    </div>
  );
}
