"use client";
import React, { useState, useEffect } from "react";
import { NavSection } from "@/lib/sections";
import Link from "next/link";
import { X, Menu, ChevronRight, Store, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { siteConfig } from "@/lib/site/siteConfig";

interface MobileMenuProps {
  sections: NavSection[];
  activeSection: string | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ sections, activeSection }) => {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const { brand } = siteConfig;

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  const handleScroll = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      lenis?.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
    }, 300);
  };

  return (
    <>
      {/* HEADER MÓVIL ESTÁNDAR - Minimalista */}
      <nav className="fixed top-0 left-0 w-full h-20 z-[100] flex items-center px-5 md:px-8 lg:px-40 bg-background/95 backdrop-blur-md border-b border-border lg:hidden transition-all">
        <div className="w-full flex justify-between items-center">
          {/* LOGO - Corporativo */}
          <Link
            href="/"
            className="text-xl font-bold uppercase tracking-tighter text-foreground flex items-center gap-2"
          >
            <Store className="text-foreground size-5" />
            {brand.name || "Don Quijote"}
          </Link>

          <div className="flex items-center gap-2">
            <CartDrawer />
            <Button
              variant="ghost"
              onClick={() => setOpen(true)}
              className="p-2 h-auto hover:bg-border/50 text-foreground rounded-none"
            >
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* MENÚ LATERAL DESPLEGABLE */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fondo oscuro traslúcido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm min-h-screen"
            />

            {/* Panel del Menú */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[120] bg-background border-l border-border shadow-2xl flex flex-col"
            >
              {/* Header del Menú */}
              <div className="flex justify-between items-center p-6 border-b border-border">
                <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">
                  Navegación
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-border/50 transition-colors text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Enlaces de Secciones */}
              <ul className="flex flex-col p-4 flex-1 overflow-y-auto overscroll-contain">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <li key={sec.id}>
                      <button
                        onClick={() => handleScroll(sec.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 text-sm font-bold uppercase tracking-widest transition-all",
                          isActive
                            ? "bg-foreground text-background"
                            : "text-foreground hover:bg-border/30",
                        )}
                      >
                        {sec.label}
                        <ChevronRight
                          className={cn(
                            "size-4 opacity-30",
                            isActive && "opacity-100",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Footer del Menú */}
              <div className="p-6 bg-background space-y-5 border-t border-border">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">
                    Local Exclusivo
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Gualeguaychú, Entre Ríos
                  </p>
                  <p className="text-xs text-foreground/60">
                    Lunes a Sábado — 9:00 a 20:00
                  </p>
                </div>

                <Button
                  className="w-full h-14 bg-foreground text-background font-bold uppercase text-xs tracking-widest rounded-none hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3"
                  onClick={() => handleScroll("catalog")}
                >
                  Ver Colección
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
