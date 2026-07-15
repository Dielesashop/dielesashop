"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [nombre, setNombre] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [colonia, setColonia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    // Generar partículas solo en cliente
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a1a] flex items-center justify-center px-4">

      {/* Fondo degradado animado */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent 70%)",
            animation: "pulse-slow 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #2563eb, transparent 70%)",
            animation: "pulse-slow 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #ec4899, transparent 70%)",
            animation: "pulse-slow 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* Grid de líneas */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Partículas flotantes */}
      {mounted &&
        particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full z-0"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "rgba(124,58,237,0.6)",
              boxShadow: "0 0 10px rgba(124,58,237,0.8)",
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}

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
            <div className="group">
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
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
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
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
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
            <Link
              href="/register"
              className="font-semibold transition-all duration-200"
              style={{ color: "#a78bfa" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#7c3aed";
                e.currentTarget.style.textShadow = "0 0 10px rgba(124,58,237,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#a78bfa";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.5; }
        }
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-30px) scale(1.2); }
        }
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
