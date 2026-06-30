import { stripe } from "@/lib/stripe";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const sig = request.headers.get("stripe-signature");
    if (!sig) {
      return Response.json({ error: "Missing stripe-signature" }, { status: 400 });
    }

    const body = await request.text();
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { producto, nombre, celular } = session.metadata || {};
      const correo = session.customer_email || session.customer_details?.email;

      if (correo) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Cocode <onboarding@resend.dev>",
          to: correo,
          subject: `Confirmación de compra — ${producto || "Producto"}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
              <h1 style="color:#ff2a6d">¡Gracias por tu compra!</h1>
              <p style="font-size:16px;color:#333">Hola <strong>${nombre || "cliente"}</strong>,</p>
              <p style="font-size:16px;color:#333">
                Hemos recibido tu pedido correctamente. Aquí están los detalles:
              </p>
              <table style="width:100%;border-collapse:collapse;margin:24px 0">
                <tr>
                  <td style="padding:12px;border-bottom:1px solid #eee;color:#666">Producto</td>
                  <td style="padding:12px;border-bottom:1px solid #eee;font-weight:600">${producto || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:12px;border-bottom:1px solid #eee;color:#666">Nombre</td>
                  <td style="padding:12px;border-bottom:1px solid #eee;font-weight:600">${nombre || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:12px;border-bottom:1px solid #eee;color:#666">Celular</td>
                  <td style="padding:12px;border-bottom:1px solid #eee;font-weight:600">${celular || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:12px;border-bottom:1px solid #eee;color:#666">Correo</td>
                  <td style="padding:12px;border-bottom:1px solid #eee;font-weight:600">${correo}</td>
                </tr>
              </table>
              <p style="font-size:16px;color:#333">
                En breve nos pondremos en contacto contigo para darte seguimiento.
              </p>
              <p style="font-size:16px;color:#333">Saludos,<br>El equipo de Cocode</p>
            </div>
          `,
        });
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("[API webhook] Error:", error);
    return Response.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}
