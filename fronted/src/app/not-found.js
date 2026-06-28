export const metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section style={{ padding: "10rem 2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "clamp(4rem, 10vw, 8rem)", fontWeight: 900, marginBottom: "1rem", color: "var(--clr-pink)" }}>
        404
      </h1>
      <p style={{ fontSize: "1.125rem", opacity: 0.75 }}>
        La página solicitada no existe.
      </p>
    </section>
  );
}
