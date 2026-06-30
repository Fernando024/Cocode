import Link from "next/link";
import CheckoutForm from "./CheckoutForm";
import styles from "./Compra.module.css";

export const dynamic = "force-dynamic";

export default async function CompraPage({ searchParams }) {
  const params = await searchParams;
  const producto = params?.producto || null;
  const precio = params?.precio ? Number(params.precio) : null;
  const moneda = params?.moneda || "MXN";
  const logoUrl = params?.logoUrl || null;
  const descripcion = params?.descripcion || null;
  const insignia = params?.insignia || null;
  const notaPrecio = params?.notaPrecio || null;
  const subtitulo = params?.subtitulo || null;
  let caracteristicas = [];
  if (params?.caracteristicas) {
    try { caracteristicas = JSON.parse(params.caracteristicas); } catch { caracteristicas = []; }
  }

  if (!producto || precio === null) {
    return (
      <div className={styles.page}>
        <div className={styles.sinProducto}>
          <h1 className={styles.tituloSin}>Selecciona un producto</h1>
          <p className={styles.descSin}>
            No has seleccionado ningún producto. Ve a la página de precios y
            elige un plan para comprar.
          </p>
          <Link href="/" className={styles.linkVolver}>
            Ir a la página principal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.contenedor}>
        <h1 className={styles.tituloPagina}>Finalizar compra</h1>
        <CheckoutForm
          producto={producto}
          moneda={moneda}
          precio={precio}
          logoUrl={logoUrl}
          descripcion={descripcion}
          insignia={insignia}
          notaPrecio={notaPrecio}
          subtitulo={subtitulo}
          caracteristicas={caracteristicas}
        />
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Pago 100% seguro procesado por Stripe. No almacenamos datos de
            tarjetas de crédito.
          </p>
        </footer>
      </div>
    </div>
  );
}
