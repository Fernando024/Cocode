export async function convertirUrlAMapaEmbed(urlOriginal) {
  if (!urlOriginal || typeof urlOriginal !== "string") return null;

  if (urlOriginal.includes("/maps/embed")) return urlOriginal;

  let realUrl = urlOriginal;

  if (urlOriginal.includes("maps.app.goo.gl")) {
    try {
      const res = await fetch("/api/resolve-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlOriginal }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.resolvedUrl) realUrl = data.resolvedUrl;
      }
    } catch (e) {
      console.warn("[mapParser] Error resolviendo URL corta:", e);
      return null;
    }
  }

  let textoExtraido = "";

  if (realUrl.includes("/maps/place/")) {
    const match = realUrl.match(/\/maps\/place\/([^/?]+)/);
    if (match) {
      textoExtraido = decodeURIComponent(match[1].replace(/\+/g, " "));
    }
  } else if (realUrl.includes("/maps/dir/")) {
    const parts = realUrl.split("/maps/dir/")[1];
    if (parts) {
      const destino = parts.split("/")[1] || parts.split("/")[0];
      textoExtraido = decodeURIComponent(destino.replace(/\+/g, " "));
    }
  } else if (realUrl.includes("/maps/search/")) {
    const match = realUrl.match(/\/maps\/search\/([^/?]+)/);
    if (match) {
      textoExtraido = decodeURIComponent(match[1].replace(/\+/g, " "));
    }
  } else if (realUrl.includes("@")) {
    const coordsMatch = realUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordsMatch) {
      textoExtraido = `${coordsMatch[1]},${coordsMatch[2]}`;
    }
  }

  try {
    const parsed = new URL(realUrl);
    const q = parsed.searchParams.get("q") || parsed.searchParams.get("query") || "";
    if (q && !textoExtraido) textoExtraido = q;
  } catch {}

  if (!textoExtraido) {
    try {
      const parsed = new URL(realUrl);
      textoExtraido = parsed.pathname.replace(/\/maps\/?/, "").replace(/\//g, " ") || "ubicación";
    } catch {
      textoExtraido = "ubicación";
    }
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(textoExtraido)}&output=embed`;
}
