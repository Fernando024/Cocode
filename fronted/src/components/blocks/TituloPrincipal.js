import styles from "./TituloPrincipal.module.css";

export default function TituloPrincipal({ block }) {
  if (!block) return null;
  const { titulo, descripcion } = block;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
        {descripcion && <p className={styles.descripcion}>{descripcion}</p>}
      </div>
    </section>
  );
}
