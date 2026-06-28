"use client";

import { useState } from "react";
import Link from "next/link";
import StrapiImage from "@/components/media/StrapiImage";
import styles from "./Navbar.module.css";

export default function Navbar({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const logo = data?.logo || null;
  const links = Array.isArray(data?.links) ? data.links : [];
  const closeMenu = () => setTimeout(() => setMenuOpen(false), 100);

  return (
    <nav className={styles.nav} aria-label="Principal">
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Link href="/" aria-label="Ir a inicio">
            {logo ? (
              <StrapiImage media={logo} fill={false} priority width={100} height={100} />
            ) : null}
          </Link>
        </div>

        <button
          className={styles.toggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú de navegación"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        {links.length > 0 && (
          <>
            <div
              className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ""}`}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div className={`${styles.menuWrapper} ${menuOpen ? styles.menuOpen : ""}`}>
            <ul className={styles.list}>
              {links.filter((l) => l.__component !== "servicios-externos.redes-sociales").map((item, idx) => {
                const key = item?.id ?? `link-${idx}`;
                const href = item?.url || "#";
                const text = item?.texto ?? "";
                const isExternal = item?.abrirNuevaPestana === true;

                return (
                  <li key={key} className={styles.item}>
                    {isExternal ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link} onClick={closeMenu}>
                        {text}
                      </a>
                    ) : (
                      <Link href={href} className={styles.link} onClick={closeMenu}>
                        {text}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <span className={styles.divider} aria-hidden="true" />

            <ul className={styles.socialList}>
              {links.filter((l) => l.__component === "servicios-externos.redes-sociales").map((item, idx) => {
                const key = item?.id ?? `social-${idx}`;
                const url = item.url || "#";
                const isInternal = url.startsWith("/") || url.startsWith("#");

                return (
                  <li key={key} className={styles.socialItem}>
                    {isInternal ? (
                      <Link href={url} className={styles.socialLink} aria-label="Red social" onClick={closeMenu}>
                        {item.icono ? (
                          <StrapiImage media={item.icono} fill={false} width={20} height={20} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
                        ) : null}
                      </Link>
                    ) : (
                      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Red social" onClick={closeMenu}>
                        {item.icono ? (
                          <StrapiImage media={item.icono} fill={false} width={20} height={20} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
                        ) : null}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          </>
        )}
      </div>
    </nav>
  );
}
