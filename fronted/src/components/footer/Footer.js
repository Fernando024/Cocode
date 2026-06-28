import StrapiImage from "@/components/media/StrapiImage";
import Enlace from "@/components/blocks/independientes/Link";
import styles from "./Footer.module.css";

function sanitizeUrl(url) {
  let u = url || "#";
  if (u.startsWith("www.")) u = "https://" + u;
  return u;
}

export default function Footer({ data }) {
  if (!data) return null;

  const logo = data?.logo || null;
  const bloquesPie = Array.isArray(data?.bloquesPiepagina) ? data.bloquesPiepagina : [];

  const columnas = bloquesPie.filter((b) => b.__component === "bloques-pie-pagina.columnafooter");
  const redesItems = bloquesPie.filter((b) => b.__component === "servicios-externos.redes-sociales");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          {logo && (
            <div className={styles.logoWrapper}>
              <StrapiImage media={logo} fill={false} width={100} height={100} />
            </div>
          )}

          {columnas.length > 0 && (
            <div className={styles.columns}>
              {columnas.map((col, i) => (
                <div key={col.id || `col-${i}`} className={styles.column}>
                  {col.tituloColumna && <h4>{col.tituloColumna}</h4>}
                  {Array.isArray(col.enlaces) && col.enlaces.length > 0 && (
                    col.enlaces.map((enlace, j) => (
                      <Enlace key={enlace.id || j} {...enlace} />
                    ))
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {redesItems.length > 0 && (
          <div className={styles.mid}>
            <ul className={styles.socialList}>
              {redesItems.map((rs, i) => (
                <li key={rs.id || `rs-${i}`} className={styles.socialItem}>
                  <a
                    href={sanitizeUrl(rs.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Red social"
                  >
                    {rs.icono ? (
                      <StrapiImage media={rs.icono} fill={false} width={24} height={24} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.bottom}>
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
