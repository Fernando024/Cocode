const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"]);
const AUDIO_EXTENSIONS = new Set([".mp3", ".wav", ".ogg", ".aac", ".flac"]);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif", ".bmp", ".ico"]);

export function isVideoUrl(url) {
  if (!url) return false;
  const ext = url.substring(url.lastIndexOf(".")).toLowerCase();
  return VIDEO_EXTENSIONS.has(ext);
}

export function isImageUrl(url) {
  if (!url) return false;
  const ext = url.substring(url.lastIndexOf(".")).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

export function detectMediaKind(media) {
  if (!media) return null;

  const mime = media.mime || "";
  const url = media.url || "";

  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  if (mime.startsWith("image/")) return "image";

  const ext = url.substring(url.lastIndexOf(".")).toLowerCase();
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  if (AUDIO_EXTENSIONS.has(ext)) return "audio";
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  if (mime && mime !== "application/octet-stream" && mime.startsWith("application/")) return "file";

  return "file";
}
