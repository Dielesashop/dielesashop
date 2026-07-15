import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { email, password, nombre, domicilio, codigo_postal, colonia, telefono } =
      await req.json();

    if (!email || !password || !nombre) {
      return NextResponse.json(
        { error: "Correo, contraseña y nombre son requeridos." },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres." },
        { status: 400 }
      );
    }

    // Cliente con permisos de administrador (solo se usa en el servidor)
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Guarda los datos del cliente en tu tabla, vinculados al usuario recién creado
    const { error: insertError } = await supabase.from("clientes").insert({
      user_id: data.user?.id,
      nombre,
      domicilio,
      codigo_postal,
      colonia,
      telefono,
      correo: email,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json(
      { user: data.user, message: "Cuenta creada. Revisa tu correo para confirmar." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}