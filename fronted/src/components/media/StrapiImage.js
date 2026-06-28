import Image from "next/image";
import { getStrapiMedia } from "@/lib/getStrapiMedia";
import { detectMediaKind } from "@/lib/mediaKind";

function resolveAlt(media) {
  if (!media) return "";
  return media.alternativeText || media.name || "Imagen";
}

export default function StrapiImage({
  media,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  quality,
  unoptimized,
  className,
  style,
}) {
  const url = getStrapiMedia(media);
  if (!url) return null;

  const kind = detectMediaKind(media);
  if (kind !== "image") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[StrapiImage] El media no es una imagen, retornando null", media?.url);
    }
    return null;
  }

  const finalAlt = alt ?? resolveAlt(media);
  const intrinsicWidth = media?.width || width;
  const intrinsicHeight = media?.height || height;

  if (fill) {
    return (
      <Image
        src={url}
        alt={finalAlt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized}
        className={className}
        style={style}
      />
    );
  }

  if (intrinsicWidth && intrinsicHeight) {
    return (
      <Image
        src={url}
        alt={finalAlt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={finalAlt}
      width={width || 1200}
      height={height || 800}
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={unoptimized}
      className={className}
      style={style}
    />
  );
}
