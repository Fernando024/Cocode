"use client";

import HeroAnimation from "@/components/effects/HeroAnimation";
import Boton from "@/components/blocks/independientes/Boton";
import styles from "./HeroEditorial.module.css";

export default function HeroEditorial({ block }) {
  if (!block) return null;
  const { conceptoClave, tituloPrincipal, parrafoDescriptivo, boton } = block;

  return (
    <section className={styles.hero}>
      <HeroAnimation className={styles.arbolCanvas} />
      <div className={styles.overlay}>
        <div className={styles.contenido}>
          {conceptoClave && <span className={styles.conceptoClave}>{conceptoClave}</span>}
          {tituloPrincipal && <h2 className={styles.tituloPrincipal}>{tituloPrincipal}</h2>}
          {parrafoDescriptivo && <p className={styles.parrafoDescriptivo}>{parrafoDescriptivo}</p>}
          {boton?.texto && (
            <Boton {...boton} className={styles.cta} />
          )}
        </div>
      </div>
    </section>
  );
}
