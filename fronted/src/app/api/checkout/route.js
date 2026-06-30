import { getStripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const { producto, precio, moneda, nombre, correo, celular, tipoPago, monto } =
      await request.json();

    const errores = [];
    if (!producto) errores.push("Falta el producto");
    if (precio === undefined || precio === null) errores.push("Falta el precio");
    if (!nombre?.trim()) errores.push("El nombre es obligatorio");
    if (!correo?.trim()) errores.push("El correo es obligatorio");
    else if (!/\S+@\S+\.\S+/.test(correo))
      errores.push("Formato de correo inválido");
    if (errores.length > 0) {
      return Response.json({ ok: false, error: errores.join(". ") }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const etiquetaPago =
      tipoPago === "completo"
        ? "Pago completo"
        : tipoPago === "anticipo"
          ? "Anticipo 50%"
          : "Liquidar 50%";

    const nombreProducto = `${producto} — ${etiquetaPago}`;
    const montoCobrar = monto ?? precio;

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: (moneda || "MXN").toLowerCase(),
            product_data: { name: nombreProducto },
            unit_amount: Math.round(montoCobrar * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: correo,
      metadata: { producto, nombre, celular: celular || "", tipoPago: tipoPago || "completo" },
      success_url: `${origin}/compra/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/compra`,
    });

    return Response.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("[API checkout] Error:", error);
    return Response.json(
      { ok: false, error: "Error al procesar el pago." },
      { status: 500 }
    );
  }
}
