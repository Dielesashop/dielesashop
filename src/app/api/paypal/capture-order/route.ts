import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = (await req.json()) as { orderId: string };

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId requerido" },
        { status: 400 }
      );
    }

    const capture = await capturePayPalOrder(orderId);
    const isCompleted = capture.status === "COMPLETED";

    // Actualiza el estado en la base de datos
    await db
      .update(orders)
      .set({
        status: isCompleted ? "COMPLETED" : "FAILED",
        providerResponse: capture as unknown as Record<string, unknown>,
        updatedAt: new Date(),
      })
      .where(eq(orders.providerOrderId, orderId));

    if (!isCompleted) {
      return NextResponse.json(
        { error: `Estado inesperado: ${capture.status}` },
        { status: 400 }
      );
    }

    const transactionId =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? orderId;

    return NextResponse.json({ success: true, transactionId });
  } catch (err) {
    console.error("[paypal/capture-order]", err);
    return NextResponse.json(
      { error: "No se pudo capturar el pago" },
      { status: 500 }
    );
  }
}
