import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, descripcion, cantidad, numeroCompras, correo, contacto } =
      body as {
        nombre: string;
        descripcion: string;
        cantidad: string;
        numeroCompras: string;
        correo: string;
        contacto: string;
      };

    const to: string[] = [];
    if (process.env.EMAIL_TO_1) to.push(process.env.EMAIL_TO_1);
    if (process.env.EMAIL_TO_2) to.push(process.env.EMAIL_TO_2);

    if (to.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No hay correos destino configurados." },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "onboarding@resend.dev",
      to,
      subject: `Nueva solicitud de producto: ${nombre}`,
      replyTo: correo,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Solicitud de producto</title>
        </head>
        <body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#ff6d1f 0%,#ff9a5c 100%);padding:32px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.8);">
                              Compras &amp; Suministros
                            </p>
                            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#ffffff;">
                              Nueva solicitud de producto
                            </h1>
                          </td>
                          <td align="right">
                            <div style="background:rgba(255,255,255,0.2);border-radius:12px;width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;font-size:24px;">
                              📦
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:32px 40px;">

                      <!-- Producto -->
                      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ff6d1f;">
                        Información del producto
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border:1px solid #f1f1f1;border-radius:10px;overflow:hidden;">
                        <tr style="background:#fff8f4;">
                          <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#64748b;width:40%;">Nombre</td>
                          <td style="padding:12px 16px;font-size:13px;color:#0f172a;font-weight:700;">${nombre}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#64748b;border-top:1px solid #f1f1f1;">Descripción</td>
                          <td style="padding:12px 16px;font-size:13px;color:#334155;border-top:1px solid #f1f1f1;">${descripcion || "—"}</td>
                        </tr>
                        <tr style="background:#fff8f4;">
                          <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#64748b;border-top:1px solid #f1f1f1;">Cantidad</td>
                          <td style="padding:12px 16px;font-size:13px;color:#0f172a;font-weight:700;border-top:1px solid #f1f1f1;">${cantidad}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#64748b;border-top:1px solid #f1f1f1;">N° de compras</td>
                          <td style="padding:12px 16px;font-size:13px;color:#334155;border-top:1px solid #f1f1f1;">${numeroCompras || "—"}</td>
                        </tr>
                      </table>

                      <!-- Contacto -->
                      <p style="margin:28px 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ff6d1f;">
                        Datos de contacto
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border:1px solid #f1f1f1;border-radius:10px;overflow:hidden;">
                        <tr style="background:#fff8f4;">
                          <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#64748b;width:40%;">Contacto</td>
                          <td style="padding:12px 16px;font-size:13px;color:#0f172a;">${contacto}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#64748b;border-top:1px solid #f1f1f1;">Correo</td>
                          <td style="padding:12px 16px;font-size:13px;border-top:1px solid #f1f1f1;">
                            <a href="mailto:${correo}" style="color:#ff6d1f;text-decoration:none;">${correo}</a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 40px;background:#f8fafc;border-top:1px solid #f1f5f9;">
                      <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                        Este correo fue generado automáticamente desde el formulario de solicitud de productos.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-email error:", err);
    return NextResponse.json({ ok: false, error: "Error interno." }, { status: 500 });
  }
}
