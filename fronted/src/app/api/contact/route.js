import { Resend } from "resend";

export async function POST(request) {
  try {
    const body = await request.json();
    const { correo_destino, nombre, correo, telefono, mensaje } = body;

    if (!nombre || !correo || !mensaje || !correo_destino) {
      return Response.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Portafolio <onboarding@resend.dev>",
      to: correo_destino,
      replyTo: correo,
      subject: `Nuevo mensaje de ${nombre} desde el portafolio`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono || "No especificado"}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("[API contact] Resend error:", error);
      return Response.json(
        { ok: false, error: "No se pudo enviar el mensaje." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[API contact] Error:", error);
    return Response.json(
      { ok: false, error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
