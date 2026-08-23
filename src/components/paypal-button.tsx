"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import type { CartItemSnapshot } from "@/lib/paypal";

// ─── Tipos internos de @paypal/react-paypal-js ────────────────────────────────
type OnApproveData = { orderID: string };

interface PayPalButtonProps {
  items: CartItemSnapshot[];
  currency?: string;
  onSuccess: (transactionId: string) => void;
  onError?: (err: unknown) => void;
}

/** Indicador de carga mientras el SDK de PayPal se inicializa. */
function LoadingSpinner() {
  const [{ isPending }] = usePayPalScriptReducer();
  if (!isPending) return null;
  return (
    <div className="flex items-center justify-center py-4 text-sm text-gray-500">
      <svg
        className="mr-2 h-4 w-4 animate-spin text-indigo-500"
        viewBox="0 0 24 24"
        fill="none"
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
      Cargando PayPal…
    </div>
  );
}

/** Botones internos (necesitan estar dentro de PayPalScriptProvider). */
function Buttons({ items, currency = "MXN", onSuccess, onError }: PayPalButtonProps) {
  const createOrder = async (): Promise<string> => {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, currency }),
    });

    if (!res.ok) {
      const { error } = (await res.json()) as { error: string };
      throw new Error(error ?? "Error al crear la orden");
    }

    const { orderId } = (await res.json()) as { orderId: string };
    return orderId;
  };

  const onApprove = async (data: OnApproveData): Promise<void> => {
    const res = await fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: data.orderID }),
    });

    if (!res.ok) {
      const { error } = (await res.json()) as { error: string };
      throw new Error(error ?? "Error al capturar el pago");
    }

    const { transactionId } = (await res.json()) as { transactionId: string };
    onSuccess(transactionId);
  };

  return (
    <>
      <LoadingSpinner />
      <PayPalButtons
        style={{ layout: "vertical", shape: "pill", label: "pay" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </>
  );
}

/**
 * Componente principal.
 * Envuelve todo en PayPalScriptProvider con el Client ID desde env.
 *
 * ⚙️  Cambia NEXT_PUBLIC_PAYPAL_CLIENT_ID en .env para alternar
 *    entre sandbox y producción.
 */
export function PayPalButton(props: PayPalButtonProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: props.currency ?? "MXN",
        intent: "capture",
      }}
    >
      <Buttons {...props} />
    </PayPalScriptProvider>
  );
}
