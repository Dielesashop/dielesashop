import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

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