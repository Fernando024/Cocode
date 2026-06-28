"use client";

import { useState } from "react";
import styles from "./PreguntasFrecuentes.module.css";

function PreguntaItem({ pregunta, isOpen, onToggle }) {
  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
      <button
        className={styles.pregunta}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{pregunta.titulo}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`${styles.respuesta} ${isOpen ? styles.respuestaOpen : ""}`}
      >
        <div
          className={styles.respuestaInner}
          dangerouslySetInnerHTML={{ __html: pregunta.descripcion }}
        />
      </div>
    </div>
  );
}

export default function PreguntasFrecuentes({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  return (
    <>
      {bloques.map((b, i) => {
        if (!b) return null;
        const { titulo_general, preguntas } = b;
        return (
          <AccordionSection
            key={b.id || i}
            titulo={titulo_general}
            preguntas={preguntas}
          />
        );
      })}
    </>
  );
}

function AccordionSection({ titulo, preguntas }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!Array.isArray(preguntas) || preguntas.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
        <div className={styles.lista}>
          {preguntas.map((p, idx) => (
            <PreguntaItem
              key={p.id || idx}
              pregunta={p}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
