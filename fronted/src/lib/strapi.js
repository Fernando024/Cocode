import qs from "qs";

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "").replace(/\/$/, "");

const DEFAULT_TIMEOUT_MS = 10000;
const CACHE_TAG = "strapi-content";

class StrapiFetchError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message);
    this.name = "StrapiFetchError";
    this.status = status;
    if (cause) this.cause = cause;
  }
}

function buildHeaders() {
  const headers = { Accept: "application/json" };
  const token = process.env.STRAPI_API_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function strapiFetch(path, { searchParams, tags, revalidate, signal } = {}) {
  if (!STRAPI_URL) {
    throw new StrapiFetchError("NEXT_PUBLIC_STRAPI_URL no está configurada.");
  }

  const raw = searchParams && typeof searchParams === "object"
    ? qs.stringify(searchParams)
    : "";

  const query = raw.replace(/%2A/g, "*");

  const url = `${STRAPI_URL}${path}${query ? `?${query}` : ""}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders(),
      signal: controller.signal,
      next: {
        tags: tags ?? [CACHE_TAG],
        ...(typeof revalidate === "number" ? { revalidate } : {}),
      },
    });

    if (!response.ok) {
      throw new StrapiFetchError(`Strapi respondió ${response.status} en ${path}`, {
        status: response.status,
      });
    }

    return await response.json();
  } catch (error) {
    if (error instanceof StrapiFetchError) throw error;
    throw new StrapiFetchError(`No se pudo conectar con Strapi en ${path}`, { cause: error });
  } finally {
    clearTimeout(timeout);
  }
}

function unwrapData(payload) {
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && payload.data && !Array.isArray(payload.data)) return [payload.data];
  return [];
}

export async function getNavbar() {
  const payload = await strapiFetch("/api/navbar", {
    searchParams: {
      populate: {
        logo: true,
        links: {
          on: {
            "independientes.link": {
              populate: true,
            },
            "servicios-externos.redes-sociales": {
              populate: { icono: true },
            },
          },
        },
      },
    },
  });
  return payload?.data ?? null;
}

export async function getFooter() {
  const payload = await strapiFetch("/api/footer", {
    searchParams: {
      populate: {
        logo: true,
        bloquesPiepagina: {
          on: {
            "bloques-pie-pagina.columnafooter": {
              populate: { enlaces: { populate: true } },
            },
            "servicios-externos.redes-sociales": {
              populate: { icono: true },
            },
          },
        },
      },
    },
  });
  return payload?.data ?? null;
}

export async function getGlobal() {
  const payload = await strapiFetch("/api/global", {
    searchParams: {
      populate: { whatsapp: { populate: "*" } },
    },
  });
  return payload?.data ?? null;
}

const PAGE_POPULATE = {
  bloques: {
    on: {
      "presentacion-pagina.seccion-principal": {
        populate: { Media: true },
      },
      "presentacion-pagina.heroeditorial": {
        populate: { imagenProtagonista: true, boton: { populate: true } },
      },
      "contenido.cuerpo": {
        populate: { Media: true },
      },
      "contenido.titulo-principal": {
        populate: true,
      },
      "contenido.preguntas-frecuentes": {
        populate: { preguntas: { populate: true } },
      },
      "contenido.tarjetas": {
        populate: {
          Tarjetas: { populate: { Imagen: true } },
        },
      },
      "contenido.tarjetascontenido": {
        populate: {
          imagen: true,
          boton: { populate: true },
          enlacesExternos: { populate: { icono: true } },
          caracteristicas: { populate: { Imagen: true } },
        },
      },
      "contenido.tarjeta-individual": {
        populate: { Imagen: true },
      },
      "medios-visuales.carrusel": {
        populate: {
          Cartas: { populate: { Imagen: true } },
        },
      },
      "medios-visuales.galeria": {
        populate: {
          Cartas: { populate: { Imagen: true } },
        },
      },
      "servicios-externos.correo": {
        populate: true,
      },
      "precios.tarjetas-precios": {
        populate: {
          logo: true,
          caracteristicas: { populate: true },
          boton: { populate: true },
        },
      },
      "independientes.boton": {
        populate: true,
      },
      "independientes.link": {
        populate: true,
      },
    },
  },
};

export async function getPageBySlug(slug) {
  if (!slug) return null;
  const payload = await strapiFetch("/api/pages", {
    searchParams: {
      filters: { slug: { $eq: slug } },
      populate: PAGE_POPULATE,
    },
  });
  const list = unwrapData(payload);
  return list[0] ?? null;
}

export async function getAllPageSlugs() {
  const payload = await strapiFetch("/api/pages", {
    searchParams: { fields: ["slug"] },
  });
  const list = unwrapData(payload);
  return list
    .map((entry) => entry?.slug)
    .filter((value) => typeof value === "string" && value.length > 0);
}

export { StrapiFetchError, CACHE_TAG };
