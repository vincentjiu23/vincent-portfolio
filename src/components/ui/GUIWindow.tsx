import React from "react";
import { cn } from "@/lib/utils";

interface GUIWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export default function GUIWindow({ title = "Application", children, className, ...props }: GUIWindowProps) {
  return (
    <div 
      className={cn(
        "flex flex-col border-[2px] border-t-textMain border-l-textMain border-b-borderDark border-r-borderDark bg-[#C0C0C0] p-[2px] shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between bg-[#000080] px-1 py-[2px] text-white">
        <div className="font-pixel text-[10px] leading-none">{title}</div>
        <div className="flex gap-[2px]">
          <button className="flex h-3 w-3 items-center justify-center border border-b-[#000] border-r-[#000] border-t-[#fff] border-l-[#fff] bg-[#C0C0C0]">
            <span className="mb-1 text-[8px] text-black">_</span>
          </button>
          <button className="flex h-3 w-3 items-center justify-center border border-b-[#000] border-r-[#000] border-t-[#fff] border-l-[#fff] bg-[#C0C0C0]">
            <span className="text-[8px] text-black">□</span>
          </button>
          <button className="flex h-3 w-3 items-center justify-center border border-b-[#000] border-r-[#000] border-t-[#fff] border-l-[#fff] bg-[#C0C0C0]">
            <span className="text-[8px] font-bold text-black">×</span>
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 bg-white p-4 text-black border-[2px] border-t-borderDark border-l-borderDark border-b-white border-r-white mt-[2px]">
        {children}
      </div>
    </div>
  );
}
