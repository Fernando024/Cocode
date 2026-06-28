import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import WhatsAppFlotante from "@/components/blocks/WhatsAppFlotante";
import { getFooter, getGlobal, getNavbar, StrapiFetchError } from "@/lib/strapi";

export const metadata = {
  title: {
    default: "",
    template: "%s",
  },
  description: "",
};

async function safeFetch(loader) {
  try {
    return await loader();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      const name = error instanceof StrapiFetchError ? "Strapi" : "desconocido";
      console.warn(`[layout] No se pudo cargar ${name}:`, error?.message ?? error);
    }
    return null;
  }
}

export default async function RootLayout({ children }) {
  const [navbar, footer, globalData] = await Promise.all([
    safeFetch(() => getNavbar()),
    safeFetch(() => getFooter()),
    safeFetch(() => getGlobal()),
  ]);

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <div className="site-wrapper">
          <header className="site-header">
            <Navbar data={navbar} />
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <Footer data={footer} />
          </footer>
        </div>
        <WhatsAppFlotante data={globalData?.whatsapp} />
      </body>
    </html>
  );
}
