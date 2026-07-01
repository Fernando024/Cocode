import Link from "next/link";

export default function Boton({ texto, url, abrirNuevaPestana, className = "" }) {
  if (!texto || !url) return null;

  const isExternal = url.startsWith("http");

  if (isExternal || abrirNuevaPestana) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {texto}
      </a>
    );
  }

  return (
    <Link href={url} className={className}>
      {texto}
    </Link>
  );
}
