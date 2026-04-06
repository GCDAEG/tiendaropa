"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  height?: "screen" | "content";
  lazy?: boolean;
  animate?: "fade" | "none";
  threshold?: number;
};

export function Section({
  id,
  children,
  className,
  height = "content",
  lazy = false,
  animate = "none",
  threshold = 0.1,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
    amount: threshold,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        // w-full previene el scroll horizontal no deseado que causa w-screen
        "relative w-full px-5 md:px-8 lg:px-40 py-12 md:py-16",
        // 5rem equivale a 80px (altura estándar de un nav). Cambialo si tu nav mide distinto.
        height === "screen" && "min-h-[calc(100vh-5rem)]",
        className,
        animate === "fade" && isInView && "animate-fade-in",
      )}
    >
      {!lazy || isInView ? children : null}
    </section>
  );
}
