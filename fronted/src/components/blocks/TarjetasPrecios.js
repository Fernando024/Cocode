import StrapiImage from "@/components/media/StrapiImage";
import Boton from "@/components/blocks/independientes/Boton";
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
