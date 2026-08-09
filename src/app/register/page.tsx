"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShapeGrid from "@/components/ShapeGrid";

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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      setError(result.error ?? "Ocurrió un error al crear la cuenta.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 3000);
  }

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#120d0a" }}
      >
        <div
          className="text-center p-10 rounded-3xl max-w-md w-full"
          style={{
            background: "rgba(255,109,31,0.08)",
            border: "1px solid rgba(255,109,31,0.3)",
            animation: "fadeIn 0.6s ease",
          }}
        >
          <div className="text-7xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            ¡Cuenta creada!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Revisa tu correo para confirmar tu cuenta. Redirigiendo al login...
          </p>
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-12"
      style={{ background: "#120d0a" }}
    >
      {/* Fondo ShapeGrid */}
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#2a2220"
          hoverFillColor="#1f1714"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      {/* Botón regresar */}
      <button
        onClick={() => (window.location.href = "/")}
        className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
        style={{
          background: "rgba(255,109,31,0.08)",
          border: "1px solid rgba(255,109,31,0.25)",
          color: "rgba(255,255,255,0.7)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,109,31,0.2)";
          e.currentTarget.style.borderColor = "rgba(255,109,31,0.6)";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,109,31,0.08)";
          e.currentTarget.style.borderColor = "rgba(255,109,31,0.25)";
          e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        }}
      >
        ← Regresar
      </button>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Borde brillante naranja */}
        <div
          className="absolute -inset-[1px] rounded-3xl z-0"
          style={{
            background:
              "linear-gradient(135deg, #ff6d1f, #e85a0f, #ff9a56, #ff6d1f)",
            backgroundSize: "300% 300%",
            animation: "gradient-border 4s ease infinite",
          }}
        />

        <div className="relative z-10 rounded-3xl bg-[#1a1118] p-8 shadow-2xl">
          {/* Icono */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{
                background: "linear-gradient(135deg, #ff6d1f, #e85a0f)",
                boxShadow: "0 0 40px rgba(255,109,31,0.5)",
                animation: "glow-pulse-orange 3s ease-in-out infinite",
              }}
            >
              🚀
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold text-white mb-1">
            Crear cuenta
          </h1>
          <p
            className="text-center text-sm mb-8"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Únete en segundos
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Nombre completo
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  👤
                </span>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,109,31,0.05)",
                    border: "1px solid rgba(255,109,31,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,109,31,0.2)";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Domicilio */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Domicilio
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🏠
                </span>
                <input
                  type="text"
                  required
                  value={domicilio}
                  onChange={(e) => setDomicilio(e.target.value)}
                  placeholder="Calle y número"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,109,31,0.05)",
                    border: "1px solid rgba(255,109,31,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,109,31,0.2)";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Código postal */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Código postal
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  📮
                </span>
                <input
                  type="text"
                  required
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  placeholder="12345"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,109,31,0.05)",
                    border: "1px solid rgba(255,109,31,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,109,31,0.2)";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Colonia */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Colonia
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  📍
                </span>
                <input
                  type="text"
                  required
                  value={colonia}
                  onChange={(e) => setColonia(e.target.value)}
                  placeholder="Tu colonia"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,109,31,0.05)",
                    border: "1px solid rgba(255,109,31,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,109,31,0.2)";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Teléfono
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  📱
                </span>
                <input
                  type="tel"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="55 1234 5678"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,109,31,0.05)",
                    border: "1px solid rgba(255,109,31,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,109,31,0.2)";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Correo electrónico
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  📧
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,109,31,0.05)",
                    border: "1px solid rgba(255,109,31,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,109,31,0.2)";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🔒
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,109,31,0.05)",
                    border: "1px solid rgba(255,109,31,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,109,31,0.2)";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.05)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg opacity-50 hover:opacity-100 transition-opacity"
                >
                  {showPass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i <= strength
                              ? strengthColors[strength]
                              : "rgba(255,255,255,0.1)",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: strengthColors[strength] }}
                  >
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirmar password */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  {confirm.length > 0
                    ? confirm === password
                      ? "✅"
                      : "❌"
                    : "🔐"}
                </span>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,109,31,0.05)",
                    border: "1px solid rgba(255,109,31,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,109,31,0.2)";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,109,31,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(255,109,31,0.05)";
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
                background: "linear-gradient(135deg, #ff6d1f, #e85a0f)",
                boxShadow: "0 0 30px rgba(255,109,31,0.4)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow =
                    "0 0 50px rgba(255,109,31,0.7)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(255,109,31,0.4)";
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
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,109,31,0.15)" }}
            />
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              ó
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,109,31,0.15)" }}
            />
          </div>

          <p
            className="text-center text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login"
              className="font-semibold transition-all duration-200"
              style={{ color: "#ffb380" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffd4b3";
                e.currentTarget.style.textShadow =
                  "0 0 10px rgba(255,109,31,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ffb380";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow-pulse-orange {
          0%, 100% { box-shadow: 0 0 40px rgba(255,109,31,0.5); }
          50% { box-shadow: 0 0 70px rgba(255,109,31,0.9), 0 0 30px rgba(232,90,15,0.5); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}