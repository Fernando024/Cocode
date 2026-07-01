"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import StrapiImage from "@/components/media/StrapiImage";
import Boton from "@/components/blocks/independientes/Boton";
import { detectMediaKind } from "@/lib/mediaKind";
import styles from "./Carrusel.module.css";

export default function Carrusel({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  return (
    <>
      {bloques.map((b, i) => {
        if (!b) return null;
        const { Titulo, Cartas, autoReproductor, velocidad } = b;
        if (!Array.isArray(Cartas) || Cartas.length === 0) return null;

        return (
          <CarruselInner
            key={b.id || i}
            titulo={Titulo}
            slides={Cartas}
            autoPlay={autoReproductor ?? false}
            interval={velocidad ? Math.max(1000, (11 - velocidad) * 1000) : 3000}
            boton={b.boton}
          />
        );
      })}
    </>
  );
}

function CarruselInner({ titulo, slides, autoPlay, interval, boton }) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
  }, []);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval, next, total]);

  if (total === 0) return null;

  return (
    <section className={styles.carrusel}>
      {titulo && <h2 className={styles.sectionTitle}>{titulo}</h2>}
      <div className={styles.container}>
        <div
          className={styles.slides}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => {
            const kind = slide?.Imagen ? detectMediaKind(slide.Imagen) : null;
            const content = (
              <>
                {slide.Imagen && kind === "image" && (
                  <StrapiImage
                    media={slide.Imagen}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className={styles.image}
                  />
                )}
                <div className={styles.overlay}>
                  {slide.Titulo && (
                    <h3 className={styles.title}>{slide.Titulo}</h3>
                  )}
                  {slide.Descripcion && (
                    <p className={styles.description}>{slide.Descripcion}</p>
                  )}
                </div>
              </>
            );

            const isExternal = slide.link?.startsWith("http");
            return slide.link ? (
              <a key={slide.id || idx} href={slide.link} className={styles.slideLink} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                {content}
              </a>
            ) : (
              <div key={slide.id || idx} className={styles.slide}>
                {content}
              </div>
            );
          })}
        </div>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className={`${styles.arrow} ${styles.arrowPrev}`}
              aria-label="Anterior"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              onClick={next}
              className={`${styles.arrow} ${styles.arrowNext}`}
              aria-label="Siguiente"
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`${styles.dot} ${idx === current ? styles.dotActive : ""}`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
      {boton?.texto && (
        <div className={styles.botonWrapper}>
          <Boton {...boton} className={styles.botonCarrusel} />
        </div>
      )}
    </section>
  );
}
