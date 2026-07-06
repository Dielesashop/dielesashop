"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ShimmerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function ShimmerButton({
  className,
  variant = "primary",
  children,
  ...props
}: ShimmerButtonProps) {
  if (variant === "ghost") {
    return (
      <button
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-white/[0.03] px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-violet-soft/60 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <span
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(110deg, var(--violet) 8%, var(--mint) 18%, var(--violet) 33%)",
          backgroundSize: "200% 100%",
        }}
        aria-hidden
      />
      <span className="relative inline-flex items-center gap-2 rounded-full bg-bg px-6 py-[10px] text-sm font-medium text-ink transition-colors duration-300 group-hover:bg-transparent">
        {children}
      </span>
    </button>
  );
}
