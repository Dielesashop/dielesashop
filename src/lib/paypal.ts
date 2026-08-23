/**
 * Helper server-side para la API REST de PayPal v2.
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │  SANDBOX  → PAYPAL_MODE=sandbox  (default, para pruebas)     │
 * │  PRODUCCIÓN → PAYPAL_MODE=production                         │
 * └──────────────────────────────────────────────────────────────┘
 */

const MODE = process.env.PAYPAL_MODE ?? "sandbox";

const BASE_URL =
  MODE === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;

/** Obtiene un Bearer token usando Client Credentials. */
async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    // No cachear el token para evitar usar tokens expirados
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal auth error: ${err}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** Realiza una llamada autenticada a la API de PayPal. */
async function paypalFetch<T>(
  method: "GET" | "POST" | "PATCH",
  path: string,
  body?: unknown
): Promise<T> {
  const token = await getAccessToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal API error [${res.status}]: ${err}`);
  }

  // 204 No Content (ej. void) no tiene body
  if (res.status === 204) return {} as T;
  return res.json() as Promise<T>;
}

// ─── Tipos mínimos de respuesta ──────────────────────────────────────────────

export interface PayPalOrderResponse {
  id: string;
  status: string;
  links: { href: string; rel: string; method: string }[];
}

export interface PayPalCaptureResponse {
  id: string;
  status: string;
  purchase_units: {
    payments: {
      captures: { id: string; amount: { value: string; currency_code: string } }[];
    };
  }[];
}

// ─── Funciones públicas ───────────────────────────────────────────────────────

export type CartItemSnapshot = {
  clave: string;
  descripcion: string;
  quantity: number;
  unitPrice: number;
};

/**
 * Crea una orden en PayPal.
 * currency: "MXN" | "USD"
 */
export async function createPayPalOrder(
  items: CartItemSnapshot[],
  currency = "MXN"
): Promise<PayPalOrderResponse> {
  const itemTotal = items
    .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
    .toFixed(2);

  return paypalFetch<PayPalOrderResponse>("POST", "/v2/checkout/orders", {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: itemTotal,
          breakdown: {
            item_total: { currency_code: currency, value: itemTotal },
          },
        },
        items: items.map((i) => ({
          name: i.descripcion || i.clave,
          unit_amount: {
            currency_code: currency,
            value: i.unitPrice.toFixed(2),
          },
          quantity: String(i.quantity),
        })),
      },
    ],
  });
}

/** Captura (cobra) una orden ya aprobada por el usuario. */
export async function capturePayPalOrder(
  orderId: string
): Promise<PayPalCaptureResponse> {
  return paypalFetch<PayPalCaptureResponse>(
    "POST",
    `/v2/checkout/orders/${orderId}/capture`,
    {}
  );
}
