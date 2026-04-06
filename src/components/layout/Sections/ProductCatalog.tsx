"use client";
import { Section } from "@/components/layout/Section";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DON_QUIJOTE_PRODUCTS, Product } from "@/lib/mockData";
import Image from "next/image";
import { ProductModal } from "@/components/ui/ProductModal";

interface ProductCatalogProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // NUEVO ESTADO: Controla la selección de Género
  const [activeGender, setActiveGender] = useState<
    "Todos" | "Hombre" | "Mujer"
  >("Todos");

  // Filtramos primero por género para calcular qué categorías mostrar
  const productsByGender = useMemo(() => {
    return DON_QUIJOTE_PRODUCTS.filter(
      (product) => activeGender === "Todos" || product.genero === activeGender,
    );
  }, [activeGender]);

  // Extraemos las categorías disponibles SOLO para el género seleccionado
  const dynamicCategories = [
    "Todos",
    ...Array.from(new Set(productsByGender.map((p) => p.categoria))),
  ];

  // Filtro final (Género + Categoría)
  const filteredProducts = productsByGender.filter(
    (product) =>
      activeCategory === "Todos" || product.categoria === activeCategory,
  );

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("es-AR");
  };

  // Función para cambiar de género reseteando la categoría a "Todos"
  const handleGenderChange = (gender: "Todos" | "Hombre" | "Mujer") => {
    setActiveGender(gender);
    onCategoryChange("Todos"); // Reseteamos la categoría para evitar filtros vacíos
  };

  return (
    <Section
      id="catalog"
      height="content"
      className="bg-background py-24 border-b border-border"
    >
      <div className="flex flex-col gap-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-xl">
          <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-2 block">
            Catálogo Digital
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground uppercase leading-tight">
            Nuestra Colección
          </h2>
        </div>

        {/* CONTROLES DE FILTRO (DOBLE NIVEL) */}
        <div className="flex flex-col gap-6 border-b border-border pb-6">
          {/* Nivel 1: Selector de Género (Pestañas elegantes) */}
          <div className="flex gap-6 border-b border-border/40">
            {(["Todos", "Hombre", "Mujer"] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => handleGenderChange(gender)}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 relative ${
                  activeGender === gender
                    ? "text-foreground"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                {gender}
                {/* Línea indicadora activa */}
                {activeGender === gender && (
                  <motion.div
                    layoutId="activeGender"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Nivel 2: Selector de Categorías (Botones) */}
          <div className="flex flex-wrap gap-2">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat ||
                  (cat === "Todos" && activeCategory === "Todos")
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/70 border-border hover:border-foreground/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Imagen */}
                <div className="relative w-full aspect-[3/4] bg-border/30 overflow-hidden mb-5">
                  <Image
                    src={product.imagen_url}
                    alt={product.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {product.precioAnterior && (
                    <div className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-bold uppercase px-2 py-1 tracking-widest">
                      Sale
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <button className="w-full bg-background/90 backdrop-blur-md text-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest py-3 border border-border">
                      Ver Opciones
                    </button>
                  </div>
                </div>

                {/* Info Básica */}
                <div className="flex flex-col text-center">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-tight mb-1">
                    {product.nombre}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    {product.precioAnterior && (
                      <span className="text-xs text-foreground/40 line-through">
                        ${formatPrice(product.precioAnterior)}
                      </span>
                    )}
                    <span className="text-sm text-foreground/70 font-medium">
                      ${formatPrice(product.precio)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Section>
  );
};

export default ProductCatalog;
