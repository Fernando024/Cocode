"use client";

import { useMemo } from "react";
import styles from "./YoutubeVideo.module.css";

function getYoutubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const regex of patterns) {
    const match = url.match(regex);
    if (match) return match[1];
  }
  return null;
}

export default function YoutubeVideo({ block }) {
  const youtubeUrl = block?.youtubeUrl;
  const tituloSeccion = block?.tituloSeccion;
  const anchoCompleto = block?.anchoCompleto ?? false;

  const parsed = useMemo(() => {
    if (!youtubeUrl) return { type: "empty" };
    const id = getYoutubeId(youtubeUrl);
    if (id) return { type: "valid", url: `https://www.youtube.com/embed/${id}` };
    return { type: "invalid" };
  }, [youtubeUrl]);

  const containerClass = `${styles.videoContainer} ${anchoCompleto ? styles.widthFull : styles.widthNormal}`;

  if (parsed.type === "empty") return null;

  return (
    <section style={{ padding: "2rem", maxWidth: "var(--container-width)", margin: "0 auto" }}>
      {tituloSeccion && (
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.05em" }}>
          {tituloSeccion}
        </h2>
      )}
      {parsed.type === "invalid" ? (
        <div className={containerClass}>
          <div className={styles.videoPlaceholder}>
            <span className={styles.icon}>&#9654;</span>
            <p className={styles.text}>Contenido multimedia temporalmente no disponible</p>
          </div>
        </div>
      ) : (
        <div className={containerClass}>
          <iframe
            src={parsed.url}
            className={styles.videoIframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            title={tituloSeccion || "Video de YouTube"}
          />
        </div>
      )}
    </section>
  );
}
