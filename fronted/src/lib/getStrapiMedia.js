const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "").replace(/\/$/, "");

const FORMAT_FALLBACK_ORDER = ["large", "medium", "small", "thumbnail"];

function pickBestFormatUrl(media) {
  if (!media) return null;
  if (media.url) return media.url;
  if (media.formats && typeof media.formats === "object") {
    for (const key of FORMAT_FALLBACK_ORDER) {
      const candidate = media.formats[key];
      if (candidate && candidate.url) return candidate.url;
    }
  }
  return null;
}

function buildAbsoluteUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  if (!STRAPI_URL) return null;
  return `${STRAPI_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function getStrapiMedia(media) {
  if (!media) return null;
  const relative = pickBestFormatUrl(media);
  return buildAbsoluteUrl(relative);
}

export function getStrapiMediaRaw(media) {
  if (!media) return null;
  return buildAbsoluteUrl(media.url || null);
}
