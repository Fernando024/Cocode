"use client";

import StrapiImage from "@/components/media/StrapiImage";
import { detectMediaKind } from "@/lib/mediaKind";
import styles from "./Cuerpo.module.css";

export default function Cuerpo({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  return (
    <>
      {bloques.map((b, i) => {
        if (!b) return null;
        const { Titulo, Subtitulo, Descripcion, Media, imagenDerecha } = b;
        const mediaItem = Array.isArray(Media) ? Media[0] : Media;
        const kind = detectMediaKind(mediaItem);

        return (
          <section
            key={b.id || i}
            className={`${styles.cuerpo} ${imagenDerecha ? styles.imagenDerecha : ""}`}
          >
            <div className={styles.textBlock}>
              {Titulo && <h2 className={styles.titulo}>{Titulo}</h2>}
              {Subtitulo && <p className={styles.subtitulo}>{Subtitulo}</p>}
              {Descripcion && <p className={styles.descripcion}>{Descripcion}</p>}
            </div>
            {mediaItem && kind === "image" && (
              <div className={styles.imagenWrapper}>
                <StrapiImage
                  media={mediaItem}
                  fill={false}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  width={600}
                  height={400}
                />
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
