import Link from "next/link";
import StrapiImage from "@/components/media/StrapiImage";
import Boton from "@/components/blocks/independientes/Boton";
import { getStrapiMedia } from "@/lib/getStrapiMedia";
import styles from "./TarjetasPrecios.module.css";

function Tarjeta({ data }) {
  if (!data) return null;
  const {
    titulo,
    subtitulo,
    descripcion,
    precio,
    moneda,
    nota_precio,
    insignia,
    logo,
    caracteristicas,
    boton,
  } = data;

  const logoUrl = logo ? getStrapiMedia(logo) : "";
  const descripcionTexto = descripcion
    ? descripcion.replace(/<[^>]+>/g, "").trim()
    : "";
  const params = new URLSearchParams({
    producto: titulo || "Producto",
    precio: String(precio ?? 0),
    moneda: moneda || "MXN",
    logoUrl: logoUrl || "",
    descripcion: descripcionTexto,
    insignia: insignia || "",
    notaPrecio: nota_precio || "",
    subtitulo: subtitulo || "",
    caracteristicas: Array.isArray(caracteristicas) && caracteristicas.length > 0
      ? JSON.stringify(caracteristicas.map(f => f.texto))
      : "",
  });
  const compraUrl = `/compra?${params}`;

  return (
    <article className={`${styles.card}${insignia ? ` ${styles.hasInsignia}` : ""}`}>
      <div className={styles.cardBody}>
        {(insignia || logo) && (
          <div className={styles.topRow}>
            {logo && (
              <div className={styles.logoWrap}>
                <StrapiImage media={logo} fill className={styles.logo} sizes="48px" />
              </div>
            )}
            {insignia && <span className={styles.insignia}>{insignia}</span>}
          </div>
        )}
        {titulo && <h3 className={styles.cardTitle}>{titulo}</h3>}
        {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
        <div className={styles.precioWrapper}>
          {precio !== undefined && precio !== null && (
            <span className={styles.precio}>
              {typeof precio === "number" ? precio.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : precio}
              {moneda && <span className={styles.moneda}>{moneda}</span>}
            </span>
          )}
          {nota_precio && <span className={styles.notaPrecio}>{nota_precio}</span>}
        </div>
        {descripcion && (
          <div
            className={styles.descripcion}
            dangerouslySetInnerHTML={{ __html: descripcion }}
          />
        )}
        {Array.isArray(caracteristicas) && caracteristicas.length > 0 && (
          <ul className={styles.features}>
            {caracteristicas.map((feat, idx) => (
              <li key={feat.id || idx} className={styles.feature}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feat.texto}
              </li>
            ))}
          </ul>
        )}
        <Boton {...boton} className={styles.botonPrecios} />
        {precio !== undefined && precio !== null && (
          <Link href={compraUrl} className={styles.botonStripe}>
            <span>Comprar con Stripe</span>
            <svg className={styles.stripeArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

export default function TarjetasPrecios({ block }) {
  const cards = Array.isArray(block) ? block : [block];
  if (cards.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {cards.map((card) => (
          <Tarjeta key={card.id} data={card} />
        ))}
      </div>
    </section>
  );
}
