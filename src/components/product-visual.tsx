"use client";

import {
  Headphones,
  Watch,
  Speaker,
  Glasses,
  Mouse,
  Keyboard,
  Lamp,
  Camera,
  type LucideIcon,
} from "lucide-react";
import type { ProductVisual as ProductVisualType } from "@/lib/products";

const ICONS: Record<ProductVisualType["icon"], LucideIcon> = {
  headphones: Headphones,
  watch: Watch,
  speaker: Speaker,
  glasses: Glasses,
  mouse: Mouse,
  keyboard: Keyboard,
  lamp: Lamp,
  camera: Camera,
};

export function ProductVisual({
  visual,
  className,
}: {
  visual: ProductVisualType;
  className?: string;
}) {
  const Icon = ICONS[visual.icon];
  return (
    <div
      className={className}
      style={{
        background: `radial-gradient(circle at 30% 25%, ${visual.via}55, transparent 60%), radial-gradient(circle at 75% 75%, ${visual.from}66, transparent 55%), ${visual.to}`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `linear-gradient(135deg, ${visual.from}33 0%, transparent 40%)`,
        }}
      />
      <Icon
        aria-hidden
        strokeWidth={1.25}
        className="relative h-16 w-16 text-white/90 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
      />
    </div>
  );
}
