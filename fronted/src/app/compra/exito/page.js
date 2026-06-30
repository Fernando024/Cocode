import Link from "next/link";
import styles from "./Exito.module.css";

export default function ExitoPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className={styles.titulo}>¡Compra exitosa!</h1>
        <p className={styles.desc}>
          Gracias por tu compra. Recibirás un correo con los detalles de tu
          pedido. En breve nos pondremos en contacto contigo.
        </p>
        <Link href="/" className={styles.boton}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
