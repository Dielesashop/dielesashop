"use client";

import {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  DragEvent,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

interface FormData {
  nombre: string;
  descripcion: string;
  cantidad: string;
  numeroCompras: string;
  correo: string;
  contacto: string;
}

interface FormErrors {
  nombre?: string;
  cantidad?: string;
  correo?: string;
  contacto?: string;
}

interface UploadedImage {
  file: File;
  preview: string;
}

const initialForm: FormData = {
  nombre: "",
  descripcion: "",
  cantidad: "",
  numeroCompras: "",
  correo: "",
  contacto: "",
};

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => {
        const left = `${(i * 5.5 + 10) % 100}%`;
        const delay = `${(i * 0.07).toFixed(2)}s`;
        const duration = `${(1.2 + Math.random() * 0.8).toFixed(2)}s`;
        const color =
          i % 3 === 0
            ? "bg-orange-500"
            : i % 3 === 1
              ? "bg-amber-400"
              : "bg-rose-400";
        return (
          <span
            key={i}
            className={cn(
              "absolute top-0 h-2.5 w-2.5 rounded-sm opacity-0",
              color
            )}
            style={{
              left,
              animation: `confetti-fall ${duration} ${delay} ease-out forwards`,
            }}
          />
        );
      })}
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500"
    >
      {children}
      {required && <span className="ml-0.5 text-orange-500">*</span>}
    </label>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  );
}

export function ProductRequestForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
      @keyframes pop-in {
        0% { transform: scale(0.85); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes draw-check {
        0% { stroke-dashoffset: 40; }
        100% { stroke-dashoffset: 0; }
      }
      .animate-pop-in { animation: pop-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      .animate-draw-check { stroke-dasharray: 40; animation: draw-check 0.5s 0.2s ease-out forwards; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!arr.length) return;
    setImages((prev) => {
      const next = [...prev];
      for (const file of arr) {
        if (next.length >= 5) break;
        next.push({ file, preview: URL.createObjectURL(file) });
      }
      return next;
    });
  }, []);

  const removeImage = (i: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[i].preview);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = "El nombre del producto es obligatorio.";
    if (
      !form.cantidad.trim() ||
      isNaN(Number(form.cantidad)) ||
      Number(form.cantidad) <= 0
    )
      e.cantidad = "Ingresa una cantidad válida mayor a 0.";
    if (!form.correo.trim()) {
      e.correo = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      e.correo = "Ingresa un correo electrónico válido.";
    }
    if (!form.contacto.trim())
      e.contacto = "El nombre de contacto es obligatorio.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setSendError(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setSendError(
          data.error ?? "Ocurrió un error al enviar. Intenta de nuevo."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSendError("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setErrors({});
    setSendError(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0f11] px-6 py-16 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
        <Confetti />

        <div className="animate-pop-in relative z-10 w-full max-w-lg rounded-[2.5rem] border border-white/10 bg-white/5 p-12 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30">
            <svg
              className="h-14 w-14 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                className="animate-draw-check"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
            Solicitud recibida
          </p>
          <h3 className="mt-3 font-serif text-4xl font-semibold text-white">
            ¡Gracias!
          </h3>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Tu solicitud de{" "}
            <span className="font-semibold text-white">{form.nombre}</span> fue
            enviada. Te contactaremos a{" "}
            <span className="font-medium text-slate-300">{form.correo}</span>.
          </p>

          {images.length > 0 && (
            <div className="mb-8 mt-6 flex justify-center gap-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.preview}
                  alt=""
                  className="h-12 w-12 rounded-xl object-cover ring-2 ring-white/10"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleReset}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-orange-50 active:scale-[0.98]"
          >
            Nueva solicitud
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf8f5] px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-orange-200/40 blur-[110px]" />
        <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-amber-200/30 blur-[120px]" />
        <div className="absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-rose-100/40 blur-[90px]" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        {/* Left column: editorial context */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-12">
            {/* <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Compras &amp; Suministros
            </div> */}

            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[0.95] text-slate-950">
              Solicitud de{" "}
              <span className="text-orange-600">producto</span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-600">
              Cuéntanos qué necesitas. Adjunta fotos de referencia y nos
              pondremos en contacto contigo con una propuesta.
            </p>

            {/* Steps */}
            {/* <div className="mt-10 hidden space-y-7 lg:block">
              {[
                { n: "01", title: "Producto", desc: "Nombre, descripción y cantidad" },
                { n: "02", title: "Fotos", desc: "Imágenes de referencia (opcional)" },
                { n: "03", title: "Contacto", desc: "Correo y datos de quien solicita" },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-4">
                  <span className="mt-0.5 font-serif text-2xl font-semibold text-orange-300">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{step.title}</p>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Right column: form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Product */}
            <section className="rounded-[2rem] bg-white p-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-sm font-bold text-white">
                  1
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Información del producto
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <FieldLabel htmlFor="nombre" required>
                    Nombre del producto
                  </FieldLabel>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ej. Taladro percutor 800W"
                    value={form.nombre}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-2xl border bg-white px-5 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400",
                      errors.nombre
                        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    )}
                  />
                  {errors.nombre && <ErrorMessage message={errors.nombre} />}
                </div>

                <div>
                  <FieldLabel htmlFor="descripcion">
                    Descripción / especificaciones técnicas
                  </FieldLabel>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    placeholder="Marca, modelo, dimensiones, color, características técnicas relevantes…"
                    value={form.descripcion}
                    onChange={handleChange}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="cantidad" required>
                    Cantidad
                  </FieldLabel>
                  <input
                    id="cantidad"
                    name="cantidad"
                    type="number"
                    min="1"
                    placeholder="0"
                    value={form.cantidad}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-2xl border bg-white px-5 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400",
                      errors.cantidad
                        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    )}
                  />
                  {errors.cantidad && <ErrorMessage message={errors.cantidad} />}
                </div>
              </div>
            </section>

            {/* Images */}
            <section className="rounded-[2rem] bg-white p-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] sm:p-9">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-sm font-bold text-white">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Fotos de referencia
                    </h2>
                    <p className="text-xs text-slate-500">Hasta 5 imágenes · JPG, PNG, WEBP</p>
                  </div>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                  {images.length}/5
                </span>
              </div>

              <div
                role="button"
                tabIndex={0}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) =>
                  e.key === "Enter" && fileInputRef.current?.click()
                }
                className={cn(
                  "group relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed px-6 py-10 text-center transition-all",
                  dragging
                    ? "border-orange-500 bg-orange-50"
                    : "border-slate-200 bg-slate-50 hover:border-orange-300 hover:bg-orange-50/50"
                )}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm transition group-hover:scale-105">
                  <svg
                    className="h-7 w-7 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {dragging ? "¡Suelta aquí!" : "Arrastra tus imágenes"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    o haz clic para seleccionar archivos
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && addFiles(e.target.files)}
                />
              </div>

              {images.length > 0 && (
                <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-5">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200"
                    >
                      <img
                        src={img.preview}
                        alt={`ref-${i}`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-red-50 hover:text-red-600"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-300 transition hover:border-orange-300 hover:text-orange-400"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* Contact */}
            <section className="rounded-[2rem] bg-white p-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-sm font-bold text-white">
                  3
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Datos de contacto
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="contacto" required>
                    Nombre / Empresa
                  </FieldLabel>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </span>
                    <input
                      id="contacto"
                      name="contacto"
                      type="text"
                      placeholder="Ej. Juan Pérez — Dielesa"
                      value={form.contacto}
                      onChange={handleChange}
                      className={cn(
                        "w-full rounded-2xl border bg-white py-3.5 pl-12 pr-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400",
                        errors.contacto
                          ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      )}
                    />
                  </div>
                  {errors.contacto && <ErrorMessage message={errors.contacto} />}
                </div>

                <div>
                  <FieldLabel htmlFor="correo" required>
                    Correo electrónico
                  </FieldLabel>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </span>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      placeholder="ejemplo@empresa.com"
                      value={form.correo}
                      onChange={handleChange}
                      className={cn(
                        "w-full rounded-2xl border bg-white py-3.5 pl-12 pr-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400",
                        errors.correo
                          ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      )}
                    />
                  </div>
                  {errors.correo && <ErrorMessage message={errors.correo} />}
                </div>

                <div>
                  <FieldLabel htmlFor="numeroCompras">
                    Número de área de compras
                  </FieldLabel>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                        />
                      </svg>
                    </span>
                    <input
                      id="numeroCompras"
                      name="numeroCompras"
                      type="text"
                      placeholder="Ej. OC-2024-0082"
                      value={form.numeroCompras}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Si tienes una orden de compra o referencia, ingrésala aquí.
                  </p>
                </div>
              </div>
            </section>

            {sendError && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-600">{sendError}</p>
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleReset}
                disabled={sending}
                className="rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-500 transition hover:bg-white hover:text-slate-700 disabled:opacity-50"
              >
                Limpiar formulario
              </button>

              <button
                type="submit"
                disabled={sending}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none"
              >
                {sending ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar solicitud
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
