"use client";

import { useState, useEffect } from "react";
import { convertirUrlAMapaEmbed } from "@/utils/mapParser";
import styles from "./MapaBloque.module.css";

export default function MapaBloque({ block }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!block?.mapUrl) return;
    convertirUrlAMapaEmbed(block.mapUrl).then((url) => {
      if (url) setEmbedUrl(url);
      else setError(true);
    });
  }, [block?.mapUrl]);

  if (!block?.mapUrl) return null;

  const { titulo, anchoCompleto = false } = block;
  const containerClass = anchoCompleto ? styles.containerFullWidth : styles.container;

  return (
    <section style={{ padding: "6rem 2rem", maxWidth: "var(--container-width)", margin: "0 auto" }}>
      {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
      <div className={containerClass}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className={styles.mapIframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            title={titulo || "Mapa de Google Maps"}
          />
        ) : error ? (
          <div className={styles.mapIframe} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", color: "#888" }}>
            <p>Mapa no disponible</p>
          </div>
        ) : (
          <div className={styles.mapIframe} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", color: "#888" }}>
            <p>Cargando mapa...</p>
          </div>
        )}
      </div>
    </section>
  );
}
