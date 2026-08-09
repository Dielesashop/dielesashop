"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, hydrated, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  if (!hydrated) return;

  if (!isAuthenticated) {
    router.push("/login");
    return;
  }

  supabase
    .from("clientes")
    .select("rol")
    .eq("user_id", user!.id)
    .single()
    .then(({ data, error }) => {
      // console.log("DEBUG admin check →", { userId: user!.id, data, error });

      if (data?.rol === "admin") {
        setIsAdmin(true);
      } else {
        router.push("/");
      }
      setChecking(false);
    });
}, [hydrated, isAuthenticated, user, router]);

async function handleLogout() {
  await logout();
  router.push("/");
}

  if (checking || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-400">
        Verificando acceso...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-lg font-bold text-gray-800">Panel de administración — DIELESA</h1>
      <div className="mt-2 flex items-center justify-between">
        <nav className="flex gap-4 text-sm">
          <a href="/admin/pedidos" className="text-indigo-600 hover:underline">Pedidos</a>
          <a href="/admin/clientes" className="text-indigo-600 hover:underline">Clientes</a>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800"
        >
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}