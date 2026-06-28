import Link from "next/link";
import styles from "./Link.module.css";

function sanitizeUrl(url) {
  let u = url || "#";
  if (u.startsWith("www.")) u = "https://" + u;
  return u;
}

export default function Enlace({ texto, url, abrirNuevaPestana, className }) {
  if (!texto || !url) return null;

  const href = sanitizeUrl(url);
  const isExternal = abrirNuevaPestana === true || !href.startsWith("/");
  const cls = [styles.enlace, className].filter(Boolean).join(" ");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {texto}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {texto}
    </Link>
  );
}
