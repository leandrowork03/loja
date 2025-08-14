import { Header } from "./components/header";
import "./globals.css";
import { Providers } from "@/lib/providers"; 
import CartProvider from "@/contexts/cartContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers> 
          <CartProvider> 
           <Toaster
  position="top-center"
  reverseOrder={false}
/>
            <Header />
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
