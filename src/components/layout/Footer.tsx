"use client";
import {
  Instagram,
  Facebook,
  Store,
  ShieldCheck,
  MapPin,
  Globe,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { sections } from "@/lib/sections";
import Link from "next/link";
import { siteConfig } from "@/lib/site/siteConfig";
import { motion } from "framer-motion";

export function FooterSection() {
  const lenis = useLenis();
  const { brand, features } = siteConfig;

  return (
    <footer className="bg-background text-foreground border-t border-border pt-16 pb-8 px-6 overflow-hidden">
      {/* MARQUESINA DE TEXTO (Estilo Editorial) */}
      <div className="w-full border-b border-border pb-12 mb-16 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 items-center"
        >
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground/5"
              >
                Don Quijote Indumentaria • Nueva Temporada • Gualeguaychú •
              </span>
            ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* COLUMNA 1: BRAND */}
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="text-2xl font-bold uppercase tracking-tighter"
          >
            {brand.name || "Don Quijote"}
          </Link>
          <p className="text-xs text-foreground/50 leading-relaxed max-w-[200px] uppercase tracking-widest font-medium">
            Estilo y elegancia para hombre y mujer en el corazón de
            Gualeguaychú.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="text-foreground/40 hover:text-foreground transition-colors"
              >
                <Icon className="size-5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN */}
        <div className="flex flex-col gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
            Navegación
          </span>
          <ul className="flex flex-col gap-4">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => lenis?.scrollTo(`#${section.id}`)}
                  className="text-xs font-bold uppercase tracking-widest hover:text-foreground/50 transition-colors"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMNA 3: CONTACTO */}
        <div className="flex flex-col gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
            Contacto
          </span>
          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
            <p className="text-foreground/70">
              WhatsApp: {features.whatsappNumber}
            </p>
            <p className="text-foreground/70 text-[10px] leading-relaxed">
              Lunes a Sábado <br /> 09:00 — 20:00
            </p>
          </div>
        </div>

        {/* COLUMNA 4: UBICACIÓN */}
        <div className="flex flex-col gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
            Encuéntranos
          </span>
          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest leading-relaxed text-foreground/70">
            <p>
              Gualeguaychú, <br /> Entre Ríos, Argentina
            </p>
            <div className="flex items-center gap-2 text-foreground/40 text-[9px]">
              <Globe className="size-3" />
              <span>Envíos a todo el país</span>
            </div>
          </div>
        </div>
      </div>

      {/* LÍNEA FINAL */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3" />
            <span>Calidad Garantizada</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-3" />
            <span>Local Exclusivo</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-[0.1em]">
            © {new Date().getFullYear()} {brand.name} • Todos los derechos
            reservados.
          </p>
          <a
            href="#"
            className="text-[9px] font-bold text-foreground/20 tracking-widest hover:text-foreground/40 transition-colors"
          >
            SITIO POR{" "}
            <span className="text-foreground/40 underline underline-offset-4">
              GONZALO - TU WEB HOY
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
