// src/components/FloatingDots.tsx
"use client";

export default function FloatingDots() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* bolinha azul - topo esquerdo */}
      <div
        className="absolute -left-10 top-8 w-36 h-36 rounded-full bg-blue-300/50 animate-float"
        style={{ animationDelay: "0s" }}
      />
      {/* bolinha lilás - direita */}
      <div
        className="absolute right-8 top-32 w-28 h-28 rounded-full bg-violet-300/50 animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      {/* bolinha rosa - baixo centro */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-10 w-20 h-20 rounded-full bg-pink-300/60 animate-float"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
}
