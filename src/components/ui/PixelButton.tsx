import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface PixelButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export default function PixelButton({ 
  variant = "primary", 
  children, 
  className,
  ...props 
}: PixelButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-pixel text-xs px-4 py-3 transition-colors active:translate-y-[2px]";
  
  const variants = {
    primary: "bg-primary text-[#1a1a1a] hover:bg-highlight border-[2px] border-b-black border-r-black border-t-white/50 border-l-white/50",
    secondary: "bg-secondary text-white hover:bg-secondary/80 border-[2px] border-b-black border-r-black border-t-white/30 border-l-white/30",
    outline: "bg-transparent text-primary hover:bg-primary/10 border-2 border-primary",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
