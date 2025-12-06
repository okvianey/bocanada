import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import CartButton from "@/components/CartButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Bocanada | Un dulce antojo",
  description: "Repostería artesanal hecha con cariño",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-cream text-softblack">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <CartDrawer />
          <CartButton />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
