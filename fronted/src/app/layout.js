import "./globals.css";

export const metadata = {
  title: {
    default: "",
    template: "%s",
  },
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
