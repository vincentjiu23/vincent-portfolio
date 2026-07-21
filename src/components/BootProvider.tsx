"use client";

import { useState, useEffect } from "react";
import BootSequence from "./BootSequence";

export default function BootProvider({ children }: { children: React.ReactNode }) {
  const [hasBooted, setHasBooted] = useState(true); // Default true for SSR

  useEffect(() => {
    // Check if we've already booted in this session
    const booted = sessionStorage.getItem("hasBooted");
    if (!booted) {
      setHasBooted(false);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("hasBooted", "true");
    setHasBooted(true);
  };

  return (
    <>
      {!hasBooted && <BootSequence onComplete={handleBootComplete} />}
      <div className={!hasBooted ? "h-screen overflow-hidden opacity-0" : "animate-in fade-in duration-1000"}>
        {children}
      </div>
    </>
  );
}
