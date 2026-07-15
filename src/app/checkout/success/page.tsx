"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [confetti, setConfetti] = useState<
    { id: number; x: number; color: string; duration: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    const colors = ["#7c3aed", "#2563eb", "#ec4899", "#22c55e", "#f97316", "#eab308"];
    const generated = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      size: Math.random() * 10 + 5,
    }));
    setConfetti(generated);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a1a] flex items-center justify-center px-4">

      {/* Fondo degradado */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #22c55e, transparent 70%)",
            animation: "pulse-slow 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent 70%)",
            animation: "pulse-slow 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Confetti */}
      {mounted &&
        confetti.map((c) => (
          <div
            key={c.id}
            className="absolute z-0 rounded-sm"
            style={{
              left: `${c.x}%`,
              top: "-10px",
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              animation: `confetti-fall ${c.duration}s ease-in ${c.delay}s infinite`,
              opacity: 0.8,
            }}
          />
        ))}

      {/* Card principal */}
      <div
        className="relative z-10 w-full max-w-lg text-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Borde brillante */}
        <div
          className="absolute -inset-[1px] rounded-3xl z-0"
          style={{
            background: "linear-gradient(135deg, #22c55e, #7c3aed, #2563eb, #22c55e)",
            backgroundSize: "300% 300%",
            animation: "gradient-border 4s ease infinite",
          }}
        />

        <div className="relative z-10 rounded-3xl bg-[#0f0f23] p-10 shadow-2xl">

          {/* Checkmark animado */}
          <div className="flex justify-center mb-6">
            <div
              className="relative w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 0 60px rgba(34,197,94,0.6)",
                animation: "bounce-in 0.7s cubic-bezier(0.175,0.885,0.32,1.275) both",
              }}
            >
              <svg
                className="w-14 h-14 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                style={{ animation: "draw-check 0.5s ease 0.5s both" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>

              {/* Anillos pulsantes */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid rgba(34,197,94,0.4)",
                  animation: "ring-pulse 2s ease-out 0.8s infinite",
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid rgba(34,197,94,0.2)",
                  animation: "ring-pulse 2s ease-out 1.2s infinite",
                }}
              />
            </div>
          </div>

          {/* Texto principal */}
          <h1
            className="text-4xl font-bold text-white mb-3"
            style={{ animation: "slide-up 0.6s ease 0.3s both" }}
          >
            ¡Compra Exitosa! 🎉
          </h1>

          <p
            className="text-lg mb-2"
            style={{
              color: "rgba(255,255,255,0.6)",
              animation: "slide-up 0.6s ease 0.5s both",
            }}
          >
            Tu pedido ha sido procesado correctamente.
          </p>

          <p
            className="text-sm mb-8"
            style={{
              color: "rgba(255,255,255,0.35)",
              animation: "slide-up 0.6s ease 0.6s both",
            }}
          >
            Recibirás un correo de confirmación pronto.
          </p>

          {/* Detalles decorativos */}
          <div
            className="flex justify-center gap-6 mb-8"
            style={{ animation: "slide-up 0.6s ease 0.7s both" }}
          >
            {[
              { icon: "📦", label: "Pedido confirmado" },
              { icon: "💳", label: "Pago procesado" },
              { icon: "🚚", label: "En camino pronto" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  {item.icon}
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Botón regresar */}
          <button
            onClick={() => router.push("/")}
            className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              boxShadow: "0 0 30px rgba(34,197,94,0.4)",
              animation: "slide-up 0.6s ease 0.9s both",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 50px rgba(34,197,94,0.7)";
              e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(34,197,94,0.4)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            🏠 Regresar a la tienda
          </button>

          {/* Link secundario */}
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.3)", animation: "slide-up 0.6s ease 1s both" }}>
            ¿Necesitas ayuda?{" "}
            <span className="cursor-pointer" style={{ color: "#86efac" }}>
              Contáctanos
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes draw-check {
          from { stroke-dasharray: 0 100; }
          to { stroke-dasharray: 100 0; }
        }
      `}</style>
    </div>
  );
}
