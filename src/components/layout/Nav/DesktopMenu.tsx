"use client";
import React from "react";
import { NavSection } from "@/lib/sections";
import { Store } from "lucide-react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { siteConfig } from "@/lib/site/siteConfig";

const DesktopMenu = ({
  sections,
  activeSection,
}: {
  sections: NavSection[];
  activeSection: string | null;
}) => {
  const lenis = useLenis();
  const { brand } = siteConfig;

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-100 hidden lg:flex items-center bg-background/95 backdrop-blur-md border-b border-border transition-all">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8 lg:px-40">
        {/* LOGO - Estilo Corporativo / Premium */}
        <Link
          href="/"
          className="text-2xl font-bold uppercase tracking-tighter text-foreground flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Store className="text-foreground size-6" />
          {brand.name || "DON QUIJOTE"}
        </Link>

        {/* LINKS DE NAVEGACIÓN - Minimalismo puro */}
        <ul className="flex items-center gap-10">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => lenis?.scrollTo(`#${s.id}`)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 relative py-2 ${
                  activeSection === s.id
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {s.label}
                {/* Indicador visual de sección activa - Línea recta fina */}
                {activeSection === s.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CARRITO */}
        <div className="flex items-center gap-6">
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};

export default DesktopMenu;
