import StrapiImage from "@/components/media/StrapiImage";
import { detectMediaKind } from "@/lib/mediaKind";
import styles from "./Tarjetas.module.css";

export default function Tarjetas({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  return (
    <>
      {bloques.map((b, i) => {
        if (!b) return null;
        const { Titulo, Tarjetas: cards } = b;
        if (!Array.isArray(cards) || cards.length === 0) return null;

        return (
          <section key={b.id || i} className={styles.section}>
            {Titulo && <h2 className={styles.title}>{Titulo}</h2>}
            <div className={styles.grid}>
              {cards.map((card, idx) => {
                if (!card) return null;
                const { Imagen, Titulo: cardTitulo } = card;
                const kind = Imagen ? detectMediaKind(Imagen) : null;

                return (
                  <div key={card.id || idx} className={styles.card}>
                    {Imagen && kind === "image" && (
                      <div className={styles.cardImage}>
                        <StrapiImage
                          media={Imagen}
                          fill={false}
                          width={80}
                          height={80}
                          sizes="80px"
                        />
                      </div>
                    )}
                    {cardTitulo && (
                      <h3 className={styles.cardTitle}>{cardTitulo}</h3>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
