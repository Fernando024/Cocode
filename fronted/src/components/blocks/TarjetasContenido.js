import StrapiImage from "@/components/media/StrapiImage";
import Boton from "@/components/blocks/independientes/Boton";
import styles from "./TarjetasContenido.module.css";

function formatFecha(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
}

export default function TarjetasContenido({ block }) {
  const cards = Array.isArray(block) ? block : [block];
  if (cards.length === 0) return null;

  const sorted = [...cards].filter(Boolean).sort((a, b) => {
    if (a.destacado && !b.destacado) return -1;
    if (!a.destacado && b.destacado) return 1;
    return 0;
  });

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {sorted.map((card) => {
          const { titulo, descripcion, imagen, categoria, boton, enlacesExternos, caracteristicas, fecha, destacado } = card;

          return (
            <article
              key={card.id}
              className={`${styles.card}${destacado ? ` ${styles.destacado}` : ""}`}
            >
              {destacado && (
                <div className={styles.starBadge}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className={styles.starTooltip}>Destacado</span>
                </div>
              )}
              {imagen && (
                <div className={styles.imageWrap}>
                  <StrapiImage media={imagen} fill className={styles.image} quality={100} unoptimized priority sizes="(max-width: 480px) 100vw, (max-width: 1023px) 50vw, 40vw" />
                </div>
              )}

              <div className={styles.body}>
                {categoria && <span className={styles.categoria}>{categoria}</span>}

                {titulo && <h3 className={styles.titulo}>{titulo}</h3>}

                {descripcion && <p className={styles.descripcion}>{descripcion}</p>}

                {fecha && <time className={styles.fecha}>{formatFecha(fecha)}</time>}

                {Array.isArray(caracteristicas) && caracteristicas.length > 0 && (
                  <div className={styles.caracteristicas}>
                    {caracteristicas.map((c) => c.Imagen && (
                      <div key={c.id} className={styles.caracteristicaItem}>
                        <StrapiImage media={c.Imagen} fill={false} width={34} height={34} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </div>
                    ))}
                  </div>
                )}

                {(Array.isArray(boton) && boton.length > 0) || (Array.isArray(enlacesExternos) && enlacesExternos.length > 0) ? (
                  <div className={styles.acciones}>
                    {Array.isArray(boton) && boton.length > 0 && (
                      <div className={styles.botones}>
                        {boton.map((e, i) => (
                          <Boton key={e.id || i} {...e} className={styles.botonContenido} />
                        ))}
                      </div>
                    )}
                    {Array.isArray(enlacesExternos) && enlacesExternos.length > 0 && (
                      <div className={styles.iconos}>
                        {enlacesExternos.map((ico) => (
                          <a key={ico.id} href={ico.url} target="_blank" rel="noopener noreferrer" className={styles.iconoLink}>
                            {ico.icono && (
                              <StrapiImage media={ico.icono} fill={false} width={20} height={20} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
