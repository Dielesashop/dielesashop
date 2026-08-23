import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder, type CartItemSnapshot } from "@/lib/paypal";
import { db } from "@/db";
import { orders } from "@/db/schema";

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

    const totalAmount = body.items
      .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
      .toFixed(2);

    // Persiste la orden en estado PENDING
    await db.insert(orders).values({
      provider: "paypal",
      providerOrderId: paypalOrder.id,
      status: "PENDING",
      amount: totalAmount,
      currency,
      cartSnapshot: body.items,
    });

    return NextResponse.json({ orderId: paypalOrder.id });
  } catch (err) {
    console.error("[paypal/create-order]", err);
    return NextResponse.json(
      { error: "No se pudo crear la orden" },
      { status: 500 }
    );
  }
}
