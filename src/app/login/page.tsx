"use client";

import { useState, useEffect } from "react";
import ShapeGrid from "@/components/ShapeGrid";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulación de login (reemplazar con supabase en proyecto real)
    setTimeout(() => {
      if (email === "test@test.com" && password === "123456") {
        alert("¡Login exitoso!");
      } else {
        setError("Correo o contraseña incorrectos.");
      }
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4" style={{ background: '#120F17' }}>

      {/* Fondo ShapeGrid */}
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#2F293A"
          hoverFillColor="#222"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      {/* Botón regresar */}
      <button
        onClick={() => window.location.href = '/' }
        className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.7)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(124,58,237,0.2)";
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.6)";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        }}
      >
        ← Regresar
      </button>

      {/* Card principal */}
      <div
        className="relative z-10 w-full max-w-md"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Borde brillante */}
        <div
          className="absolute -inset-[1px] rounded-3xl z-0"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #2563eb, #ec4899, #7c3aed)",
            backgroundSize: "300% 300%",
            animation: "gradient-border 4s ease infinite",
          }}
        />

        <div className="relative z-10 rounded-3xl bg-[#0f0f23] p-8 shadow-2xl">

          {/* Logo / Icono */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                boxShadow: "0 0 40px rgba(124,58,237,0.5)",
                animation: "glow-pulse 3s ease-in-out infinite",
              }}
            >
              ⚡
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold text-white mb-1">
            Bienvenido
          </h1>
          <p className="text-center text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            Inicia sesión para continuar
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Campo Email */}
            <div>
              <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                Correo electrónico
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📧</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(124,58,237,0.8)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.2)";
                    e.currentTarget.style.background = "rgba(124,58,237,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Campo Password */}
            <div>
              <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(124,58,237,0.8)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.2)";
                    e.currentTarget.style.background = "rgba(124,58,237,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg opacity-50 hover:opacity-100 transition-opacity"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#fca5a5",
                  animation: "shake 0.4s ease",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 rounded-xl font-bold text-white text-base overflow-hidden transition-all duration-300 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = "0 0 50px rgba(124,58,237,0.7)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                    style={{ animation: "spin 0.8s linear infinite" }}
                  />
                  Ingresando...
                </span>
              ) : (
                "Iniciar Sesión →"
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>ó</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          </div>

          {/* Link a registro */}
          <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="font-semibold transition-all duration-200"
              style={{ color: "#a78bfa" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#c4b5fd";
                e.currentTarget.style.textShadow = "0 0 10px rgba(124,58,237,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#a78bfa";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(124,58,237,0.5); }
          50% { box-shadow: 0 0 70px rgba(124,58,237,0.9), 0 0 30px rgba(37,99,235,0.5); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
