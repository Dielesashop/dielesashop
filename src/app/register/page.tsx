"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nombre, setNombre] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [colonia, setColonia] = useState("");
const [telefono, setTelefono] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  // Fuerza de la contraseña
  function passwordStrength(p: string) {
    if (p.length === 0) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  }

  const strength = passwordStrength(password);
  const strengthLabels = ["", "Débil", "Regular", "Buena", "Fuerte"];
  const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        nombre,
        domicilio,
        codigo_postal: codigoPostal,
        colonia,
        telefono,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4">
        <div
          className="text-center p-10 rounded-3xl max-w-md w-full"
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.3)",
            animation: "fadeIn 0.6s ease",
          }}
        >
          <div className="text-7xl mb-4" style={{ animation: "bounce-in 0.6s ease" }}>✅</div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Cuenta creada!</h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Revisa tu correo para confirmar tu cuenta. Redirigiendo al login...
          </p>
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
          @keyframes bounce-in { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a1a] flex items-center justify-center px-4 py-12">

      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #ec4899, transparent 70%)",
            animation: "pulse-slow 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent 70%)",
            animation: "pulse-slow 11s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(236,72,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Partículas */}
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
              background: "rgba(236,72,153,0.6)",
              boxShadow: "0 0 10px rgba(236,72,153,0.8)",
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}

      {/* Card */}
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
            background: "linear-gradient(135deg, #ec4899, #7c3aed, #2563eb, #ec4899)",
            backgroundSize: "300% 300%",
            animation: "gradient-border 4s ease infinite",
          }}
        />

        <div className="relative z-10 rounded-3xl bg-[#0f0f23] p-8 shadow-2xl">

          {/* Icono */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{
                background: "linear-gradient(135deg, #ec4899, #7c3aed)",
                boxShadow: "0 0 40px rgba(236,72,153,0.5)",
                animation: "glow-pulse-pink 3s ease-in-out infinite",
              }}
            >
              🚀
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold text-white mb-1">Crear cuenta</h1>
          <p className="text-center text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            Únete en segundos
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

        {/* Nombre */}
          <div>
            <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
              Nombre completo
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">👤</span>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(236,72,153,0.8)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)";
                  e.currentTarget.style.background = "rgba(236,72,153,0.06)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>
          </div>

          {/* Domicilio */}
          <div>
            <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
              Domicilio
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🏠</span>
              <input
                type="text"
                required
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value)}
                placeholder="Calle y número"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(236,72,153,0.8)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)";
                  e.currentTarget.style.background = "rgba(236,72,153,0.06)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>
          </div>

          {/* Código postal */}
          <div>
            <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
              Código postal
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📮</span>
              <input
                type="text"
                required
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                placeholder="12345"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(236,72,153,0.8)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)";
                  e.currentTarget.style.background = "rgba(236,72,153,0.06)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>
          </div>

          {/* Colonia */}
          <div>
            <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
              Colonia
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📍</span>
              <input
                type="text"
                required
                value={colonia}
                onChange={(e) => setColonia(e.target.value)}
                placeholder="Tu colonia"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(236,72,153,0.8)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)";
                  e.currentTarget.style.background = "rgba(236,72,153,0.06)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
              Teléfono
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📱</span>
              <input
                type="tel"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="55 1234 5678"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(236,72,153,0.8)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)";
                  e.currentTarget.style.background = "rgba(236,72,153,0.06)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>
          </div>

            {/* Email */}
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
                    e.currentTarget.style.border = "1px solid rgba(236,72,153,0.8)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)";
                    e.currentTarget.style.background = "rgba(236,72,153,0.06)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(236,72,153,0.8)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)";
                    e.currentTarget.style.background = "rgba(236,72,153,0.06)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg opacity-50 hover:opacity-100 transition-opacity"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Barra de fuerza */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background: i <= strength ? strengthColors[strength] : "rgba(255,255,255,0.1)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirmar password */}
            <div>
              <label className="block text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                Confirmar contraseña
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  {confirm.length > 0 ? (confirm === password ? "✅" : "❌") : "🔐"}
                </span>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(236,72,153,0.8)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)";
                    e.currentTarget.style.background = "rgba(236,72,153,0.06)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
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

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 rounded-xl font-bold text-white text-base overflow-hidden transition-all duration-300 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #ec4899, #7c3aed)",
                boxShadow: "0 0 30px rgba(236,72,153,0.4)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = "0 0 50px rgba(236,72,153,0.7)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(236,72,153,0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                    style={{ animation: "spin 0.8s linear infinite" }}
                  />
                  Creando cuenta...
                </span>
              ) : (
                "Crear cuenta →"
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>ó</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          </div>

          <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold transition-all duration-200"
              style={{ color: "#f472b6" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ec4899";
                e.currentTarget.style.textShadow = "0 0 10px rgba(236,72,153,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#f472b6";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.15); opacity: 0.45; }
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
        @keyframes glow-pulse-pink {
          0%, 100% { box-shadow: 0 0 40px rgba(236,72,153,0.5); }
          50% { box-shadow: 0 0 70px rgba(236,72,153,0.9), 0 0 30px rgba(124,58,237,0.5); }
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
