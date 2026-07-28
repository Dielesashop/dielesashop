"use client";

import { motion } from "framer-motion";

export function WhatsAppButton() {
  const phoneNumber = "5568058380"; // ← cambia este número
  const message = encodeURIComponent("Hola! Quiero más información 👋");
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Anillo pulsante exterior */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-40"
        animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Anillo pulsante medio */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Botón principal con efecto 3D */}
      <motion.div
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.5),0_2px_8px_rgba(0,0,0,0.25)] bg-[#25D366]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: [0, 8, 0, -8, 0],
          rotateX: [0, -4, 0, 4, 0],
          y: [0, -4, 0, -4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.15,
          rotateY: 0,
          rotateX: 0,
          boxShadow: "0 16px 40px rgba(37,211,102,0.65), 0 4px 12px rgba(0,0,0,0.3)",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Brillo superior 3D */}
        <span className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-full bg-white/30 blur-[2px]" />

        {/* Icono SVG oficial de WhatsApp */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-white drop-shadow-sm"
        >
          <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.478.648 4.804 1.776 6.828L2 30l7.376-1.744A13.93 13.93 0 0 0 16.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.464a11.53 11.53 0 0 1-5.876-1.604l-.42-.252-4.376 1.032 1.056-4.264-.276-.44A11.464 11.464 0 0 1 4.536 16c0-6.32 5.148-11.464 11.468-11.464S27.468 9.68 27.468 16c0 6.324-5.148 11.464-11.464 11.464zm6.296-8.592c-.344-.172-2.036-1.004-2.352-1.12-.316-.112-.548-.172-.776.172-.228.344-.888 1.12-1.088 1.348-.2.228-.4.256-.744.084-.344-.172-1.452-.536-2.764-1.704-1.02-.912-1.712-2.036-1.912-2.38-.2-.344-.02-.528.152-.7.156-.152.344-.4.516-.6.172-.2.228-.344.344-.572.116-.228.056-.428-.028-.6-.084-.172-.776-1.872-1.064-2.564-.28-.676-.564-.584-.776-.596-.2-.012-.428-.012-.656-.012a1.26 1.26 0 0 0-.912.428c-.312.344-1.196 1.168-1.196 2.848 0 1.68 1.224 3.308 1.396 3.536.172.228 2.412 3.68 5.844 5.16.816.352 1.452.56 1.948.716.82.26 1.564.224 2.152.136.656-.1 2.036-.832 2.32-1.636.284-.8.284-1.488.2-1.632-.084-.14-.312-.228-.656-.4z" />
        </svg>
      </motion.div>
    </a>
  );
}
