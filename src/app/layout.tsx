import type { Metadata } from "next";
import { Instrument_Serif, Poppins } from "next/font/google";
import "./globals.css";
import { FooterSection } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Nav";
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-poppins" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-instrument-serif" });

export const metadata: Metadata = {
  title: "Linde — Catálogo de indumentaria | Demo de TUWEBHOY",
  description: "Catálogo de indumentaria de demostración desarrollado por TUWEBHOY.",
  openGraph: { title: "Linde — Catálogo de indumentaria | Demo de TUWEBHOY", description: "Catálogo de indumentaria de demostración desarrollado por TUWEBHOY.", locale: "es_AR", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR" className={`${poppins.variable} ${instrumentSerif.variable}`}><body className="min-h-screen antialiased"><CartProvider><Navbar />{children}<FooterSection /></CartProvider></body></html>;
}
