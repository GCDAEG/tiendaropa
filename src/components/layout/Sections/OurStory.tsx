"use client";
import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Image from "next/image";
import { Scissors, Shirt, Store } from "lucide-react";

const features = [
  {
    title: "Telas Premium",
    description:
      "Seleccionamos minuciosamente prendas con los mejores algodones, linos y gabardinas para garantizar durabilidad.",
    icon: Shirt,
  },
  {
    title: "Calce Impecable",
    description:
      "Entendemos que la diferencia entre una buena prenda y una prenda excelente radica en cómo se ajusta a tu cuerpo.",
    icon: Scissors,
  },
  {
    title: "Asesoramiento Personal",
    description:
      "Nuestro equipo en el local está capacitado para ayudarte a encontrar el estilo ideal para cada ocasión.",
    icon: Store,
  },
];

const OurStory = () => {
  return (
    <Section
      id="nosotros"
      height="content"
      className="py-24 bg-background border-b border-border"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* COLUMNA DE IMAGEN (Estilo Editorial) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            {/* Elemento decorativo offset */}
            <div className="absolute top-4 -left-4 md:top-6 md:-left-6 w-full h-full border border-border bg-border/20 -z-10" />

            <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden bg-background border border-border">
              <Image
                // Foto verificada: Interior de tienda de ropa elegante
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                alt="Interior de Don Quijote"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out grayscale-[20%]"
              />
            </div>

            {/* Sello/Badge Cuadrado Minimalista */}
            <div className="absolute -bottom-6 -right-6 bg-foreground text-background size-28 flex flex-col items-center justify-center p-4 border-4 border-background shadow-2xl">
              <span className="text-[10px] uppercase tracking-widest font-bold text-background/70 mb-1">
                GCHÚ
              </span>
              <span className="text-xl font-bold tracking-tighter">EST.</span>
            </div>
          </motion.div>

          {/* COLUMNA DE TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl order-1 lg:order-2"
          >
            <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-4 block">
              Nuestra Trayectoria
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tighter uppercase">
              Elegancia para <br />
              <span className="text-foreground/40">hombre y mujer.</span>
            </h2>

            <p className="text-foreground/70 text-base md:text-lg mb-10 leading-relaxed">
              En Don Quijote creemos que la elegancia no es solo una forma de
              vestir, sino una actitud. Llevamos años ofreciendo indumentaria de
              primera línea en Entre Ríos, donde el buen gusto, los cortes
              precisos y la calidad de los materiales son nuestra firma
              indiscutida.
            </p>

            {/* Grid de Características */}
            <div className="space-y-8 mt-10 border-t border-border pt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-5 items-start group">
                  <div className="size-12 bg-background flex items-center justify-center shrink-0 border border-border group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <feature.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-1.5">
                      {feature.title}
                    </h4>
                    <p className="text-foreground/60 text-sm leading-relaxed max-w-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default OurStory;
