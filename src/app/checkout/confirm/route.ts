import { NextResponse } from "next/server";
import { db } from "@/db";
import { pedidos, pedidoItems } from "@/db/schema";

interface CartItem {
  clave: string;
  descripcion: string;
  quantity: number;
  precio: number;
}

interface ConfirmBody {
  userId: string;
  items: CartItem[];
}

export async function POST(req: Request) {
  try {
    const body: ConfirmBody = await req.json();
    const { userId, items } = body;

    // Validación básica
    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // Calcular el total a partir de los items del carrito
    const total = items
      .reduce((acc, item) => acc + item.precio * item.quantity, 0)
      .toFixed(2);

    // 1. Insertar el pedido principal
    const [pedido] = await db
      .insert(pedidos)
      .values({
        userId,
        total,
        estado: "pendiente",
      })
      .returning();

    // 2. Insertar cada línea del carrito vinculada al pedido
    await db.insert(pedidoItems).values(
      items.map((item) => ({
        pedidoId:      pedido.id,
        productoClave: item.clave,
        descripcion:   item.descripcion,
        cantidad:      item.quantity,
        precioUnitario: String(item.precio),
      }))
    );

    return NextResponse.json({ success: true, pedidoId: pedido.id });
  } catch (err) {
    console.error("[checkout/confirm]", err);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
