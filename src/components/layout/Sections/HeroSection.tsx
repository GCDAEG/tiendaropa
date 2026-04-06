"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Section } from "../Section";
import { siteConfig } from "@/lib/site/siteConfig";
import { useLenis } from "lenis/react";
import Image from "next/image";

const HeroSection = () => {
  const { hero } = siteConfig;
  const lenis = useLenis();

  return (
    <Section
      height="screen"
      id="hero"
      // Mantenemos el fondo limpio y evitamos desbordes
      className="bg-background border-b border-border overflow-hidden relative flex items-center"
    >
      {/* Contenedor principal: 
        - Eliminamos paddings (px-6) porque Section ya los provee.
        - Usamos max-w-7xl para limitar el ancho en pantallas ultra anchas. 
      */}
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* COLUMNA DE TEXTO */}
          <div className="flex flex-col gap-5 lg:gap-8 order-2 lg:order-1 w-full max-w-2xl mx-auto lg:mx-0">
            {/* Badge Editorial */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start border border-border bg-background px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-foreground"
            >
              Nueva Temporada
            </motion.div>

            {/* Título Principal (Escalado fluido) */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground uppercase leading-[0.95] tracking-tighter"
            >
              {hero.title || "Elegancia Clásica"}
            </motion.h1>

            {/* Subtítulo ajustado para moda mixta */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-foreground/60 max-w-md leading-relaxed font-medium"
            >
              {hero.subtitle ||
                "Descubrí nuestra nueva colección para hombre y mujer. Calce perfecto, telas premium y el estilo que te define."}
            </motion.p>

            {/* Botones de Acción */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 md:pt-4"
            >
              <button
                onClick={() => lenis?.scrollTo("#catalog")}
                className="h-12 md:h-14 px-6 md:px-8 w-full sm:w-auto bg-foreground text-background text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3"
              >
                Ver Colección
                <ArrowRight className="size-4" />
              </button>

              <button
                onClick={() => lenis?.scrollTo("#nosotros")}
                className="h-12 md:h-14 px-6 md:px-8 w-full sm:w-auto bg-transparent border border-transparent text-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest hover:border-border transition-colors flex items-center justify-center gap-3"
              >
                Conocenos
                <ArrowDown className="size-4 text-foreground/50" />
              </button>
            </motion.div>
          </div>

          {/* COLUMNA DE IMAGEN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            // Altura controlada: min-300px asegura que no colapse, 35vh deja espacio al texto en mobile
            className="relative w-full min-h-75 h-[35vh] sm:h-[45vh] lg:h-[75vh] max-h-200 overflow-hidden order-1 lg:order-2 bg-border/30"
          >
            <Image
              // Foto de un perchero boutique elegante (ideal para moda mixta)
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1000&q=80"
              alt="Colección Don Quijote"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
