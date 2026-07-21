import React from "react";
import { cn } from "@/lib/utils";

interface ClickHouseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "icon";
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
}

export default function ClickHouseButton({
  variant = "primary",
  children,
  className,
  as = "button",
  href,
  ...props
}: ClickHouseButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-inter transition-all duration-200";
  
  const variants = {
    primary: "bg-primary text-text-onPrimary font-semibold text-[14px] px-[20px] py-[10px] h-[40px] rounded-md hover:bg-primary-active disabled:bg-primary-disabled disabled:text-text-muted",
    secondary: "bg-surface-card text-text-main font-semibold text-[14px] px-[20px] py-[10px] h-[40px] rounded-md border border-hairline hover:border-hairline-strong",
    text: "bg-transparent text-primary text-[14px] font-semibold hover:underline decoration-primary underline-offset-4",
    icon: "bg-surface-card text-text-main w-[36px] h-[36px] rounded-full border border-hairline hover:border-hairline-strong flex items-center justify-center",
  };

  if (as === "a" && href) {
    return (
      <a href={href} className={cn(baseStyles, variants[variant], className)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
