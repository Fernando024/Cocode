import styles from "./TarjetasMetricas.module.css";

export default function TarjetasMetricas({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  return (
    <section className={styles.metricas}>
      <div className={styles.grid}>
        {bloques.map((b, i) => {
          if (!b) return null;
          return (
            <div key={b.id || i} className={styles.tarjeta}>
              {b.Metrica && <div className={styles.numero}>{b.Metrica}</div>}
              {b.descripcionMetrica && (
                <p className={styles.descripcion}>{b.descripcionMetrica}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
