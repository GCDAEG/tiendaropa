"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Ruler, MapPin, RefreshCcw } from "lucide-react";
const experiences = [
  {
    title: "Asesoría Personal",
    description:
      "No dejes tu elección al azar. Te guiamos para encontrar el corte y talle exacto que mejor se adapta a tu silueta y estilo personal.",
    icon: Ruler,
  },
  {
    title: "Reservá y Probá",
    description:
      "Armá tu selección online. Prepararemos las prendas en nuestro local de Gualeguaychú para que pases directamente a nuestro probador exclusivo.",
    icon: MapPin,
  },
  {
    title: "Garantía de Calce",
    description:
      "Tu satisfacción es nuestra prioridad absoluta. Si la prenda no te convence al 100%, gestionamos el cambio o ajuste en el momento.",
    icon: RefreshCcw,
  },
];

// Variantes de Framer Motion para animación en cascada
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut", // Ahora TS sabe que esto es un Easing válido
    },
  },
};

const StoreExperience = () => {
  return (
    <Section
      id="experiencia"
      height="content"
      // Fondo negro (foreground) para dar ese toque de "Alta Costura"
      className="py-24 bg-foreground text-background"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* HEADER DE LA SECCIÓN */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[10px] font-bold text-background/50 uppercase tracking-widest mb-4 block"
          >
            Servicio Premium
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-tight"
          >
            La Experiencia <br /> Don Quijote
          </motion.h2>
        </div>

        {/* GRID DE BENEFICIOS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              {/* Contenedor del ícono minimalista */}
              <div className="size-16 mb-6 border border-background/20 flex items-center justify-center bg-transparent group-hover:bg-background group-hover:text-foreground transition-colors duration-500">
                <exp.icon className="size-6" strokeWidth={1} />
              </div>

              {/* Textos */}
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">
                {exp.title}
              </h3>
              <p className="text-sm text-background/60 leading-relaxed max-w-xs font-light">
                {exp.description}
              </p>

              {/* Línea decorativa que se expande al hacer hover */}
              <div className="h-[1px] w-8 bg-background/20 mt-8 group-hover:w-16 group-hover:bg-background transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default StoreExperience;
