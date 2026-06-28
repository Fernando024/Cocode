import { revalidateTag } from "next/cache";
import { CACHE_TAG } from "@/lib/strapi";

const WEBHOOK_HEADER = "x-webhook-secret";

function unauthorized(message) {
  return Response.json({ revalidated: false, message }, { status: 401 });
}

export async function POST(request) {
  const expected = process.env.STRAPI_WEBHOOK_SECRET;
  if (!expected) {
    return unauthorized("El endpoint no está configurado: falta STRAPI_WEBHOOK_SECRET.");
  }

  const provided = request.headers.get(WEBHOOK_HEADER);
  if (!provided || provided !== expected) {
    return unauthorized("Token inválido.");
  }

  try {
    revalidateTag(CACHE_TAG, { expire: 0 });
  } catch (error) {
    return Response.json(
      { revalidated: false, message: "No se pudo revalidar la caché.", error: String(error) },
      { status: 500 }
    );
  }

  return Response.json({ revalidated: true, tag: CACHE_TAG, now: Date.now() });
}

export async function GET() {
  return Response.json(
    {
      message: "Este endpoint solo acepta POST con el header x-webhook-secret.",
    },
    { status: 405, headers: { Allow: "POST" } }
  );
}
