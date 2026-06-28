import { getStrapiMediaRaw } from "@/lib/getStrapiMedia";

const MAX_VIDEO_SIZE_KB = 80480;

function hasVideoExtension(url) {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|avi|mkv)(\?|$)/i.test(url);
}

export default function StrapiVideo({ media, className }) {
  if (!media) return null;

  const mime = media.mime || "";
  const url = getStrapiMediaRaw(media);
  if (!url) return null;

  const isVideo = mime.startsWith("video/") || hasVideoExtension(media.url);
  if (!isVideo) return null;

  if (media.size > MAX_VIDEO_SIZE_KB) {
    return (
      <p style={{ color: "red", textAlign: "center", padding: "2rem" }}>
        Solo se soportan 80 MB de video
      </p>
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    >
      <source src={url} type={mime || "video/mp4"} />
    </video>
  );
}
