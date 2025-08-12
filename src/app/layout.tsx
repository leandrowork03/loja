import { Header } from "./components/header";
import "./globals.css";
import { Providers } from "@/lib/providers"; // ApolloProvider
import CartProvider from "@/contexts/cartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* Apollo Client */}
          <CartProvider> {/* Carrinho */}
            <Header />
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
