"use client";

import StrapiImage from "@/components/media/StrapiImage";
import StrapiVideo from "@/components/media/StrapiVideo";
import { detectMediaKind } from "@/lib/mediaKind";
import styles from "./SeccionPrincipal.module.css";

function hasVideoExtension(url) {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|avi|mkv)(\?|$)/i.test(url);
}

export default function SeccionPrincipal({ block }) {
  if (!block) return null;
  const { Titulo, Descripcion, Media } = block;

  const mediaItem = Array.isArray(Media) ? Media[0] : Media;
  const mediaKind = detectMediaKind(mediaItem);
  const isVideo = mediaKind === "video" || (mediaKind !== "image" && hasVideoExtension(mediaItem?.url));

  return (
    <section className={styles.seccion}>
      {mediaItem && (
        <div className={styles.mediaBackground}>
          {isVideo ? <StrapiVideo media={mediaItem} /> : null}
          {!isVideo && mediaKind === "image" ? <StrapiImage media={mediaItem} fill sizes="100vw" /> : null}
        </div>
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        {Titulo && <h1 className={styles.titulo}>{Titulo}</h1>}
        {Descripcion && <p className={styles.descripcion}>{Descripcion}</p>}
      </div>
    </section>
  );
}
