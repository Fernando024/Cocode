import Link from "next/link";
import styles from "./Proximamente.module.css";

export default function ProximamentePage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoAnimado}>
          <svg className={styles.rueda} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="24" cy="24" r="20" opacity="0.2" />
            <path d="M24 4 A20 20 0 0 1 44 24" strokeDasharray="6 6">
              <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="1.5s" repeatCount="indefinite" />
            </path>
          </svg>
          <svg className={styles.lapiz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </div>
        <h1 className={styles.titulo}>Próximamente</h1>
        <p className={styles.desc}>
          Seguimos trabajando en ello :) .
        </p>
        <Link href="/" className={styles.boton}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
