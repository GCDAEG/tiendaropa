"use client";
import React from "react";
import { Section } from "../Section";
import Image from "next/image";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const ExampleMessage = () => {
  return (
    <Section
      height="content"
      className="bg-zinc-950 py-12 border-t border-white/5"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6"
      >
        {/* Lado Izquierdo: Info de la Demo */}
        <div className="flex items-start gap-4 max-w-md">
          <div className="mt-1">
            <Info className="size-5 text-zinc-500" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-200">
              Versión de Demostración
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Este sitio es una propuesta de diseño y funcionalidad desarrollada
              por
              <span className="text-zinc-300 font-semibold"> TuWebHoy</span>.
              Los productos y precios son ilustrativos para esta presentación.
            </p>
          </div>
        </div>

        {/* Lado Derecho: Tu Marca */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            Desarrollado por Gonzalo Carles de
          </span>
          <a
            href="https://tuwebhoy-chi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-48 h-12 transition-all duration-300 hover:brightness-125"
          >
            <Image
              src="https://tuwebhoy-chi.vercel.app/twhlogo.svg"
              alt="tuwebhoy"
              fill
              className="object-contain"
            />
          </a>
        </div>
      </motion.div>
    </Section>
  );
};

export default ExampleMessage;
