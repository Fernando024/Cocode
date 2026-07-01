export default function LinkBtn({ texto, url, abrirNuevaPestana }) {
  if (!texto || !url) return null;

  return (
    <a
      href={url}
      target={abrirNuevaPestana ? "_blank" : undefined}
      rel={abrirNuevaPestana ? "noopener noreferrer" : undefined}
    >
      {texto}
    </a>
  );
}
