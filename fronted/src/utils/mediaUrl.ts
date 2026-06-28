export function normalizeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    parsed.pathname = parsed.pathname.replace(/\/+/g, "/");
    parsed.protocol = "https:";
    return parsed.toString();
  } catch {
    return null;
  }
}

export function isValidR2Url(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return /\.r2\.dev$/.test(hostname) || /\.r2\.cloudflarestorage\.com$/.test(hostname);
  } catch {
    return false;
  }
}
