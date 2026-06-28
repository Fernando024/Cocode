import { getStrapiMediaRaw } from "@/lib/getStrapiMedia";

export default function StrapiFile({ media, label, download = true, className }) {
  if (!media) return null;

  const url = getStrapiMediaRaw(media);
  if (!url) return null;

  const text = label || media.alternativeText || media.name || media.caption || "Descargar archivo";

  return (
    <a
      href={url}
      download={download}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noopener noreferrer"}
      className={className}
    >
      {text}
    </a>
  );
}
