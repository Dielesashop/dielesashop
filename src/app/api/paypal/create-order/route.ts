import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder, type CartItemSnapshot } from "@/lib/paypal";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      items: CartItemSnapshot[];
      currency?: string;
    };

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 }
      );
    }

    const currency = body.currency ?? "MXN";
    const paypalOrder = await createPayPalOrder(body.items, currency);

    return NextResponse.json({ orderId: paypalOrder.id });
  } catch (err) {
    console.error("[paypal/create-order]", err);
    return NextResponse.json(
      { error: "No se pudo crear la orden" },
      { status: 500 }
    );
  }
}