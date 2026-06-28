import styles from "./Boton.module.css";

export default function Boton({ texto, url, abrirNuevaPestana, className }) {
  if (!texto || !url) return null;

  const cls = [styles.boton, className].filter(Boolean).join(" ");

  return (
    <a
      href={url}
      className={cls}
      {...(abrirNuevaPestana ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.texto}>{texto}</span>
    </a>
  );
}
