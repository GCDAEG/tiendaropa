"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ArrowRight, AlertCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/mockData";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const WHATSAPP_NUMBER = "5493446123456";
  const { addToCart } = useCart();

  const [selectedTalle, setSelectedTalle] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  // Nuevo estado para manejar el error visualmente
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Limpiamos la selección y errores cada vez que se abre un producto nuevo
  useEffect(() => {
    const resetState = () => {
      setSelectedTalle("");
      setSelectedColor("");
      setErrorMsg("");
    };
    if (isOpen) {
      resetState();
    }
  }, [isOpen, product]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!product) return null;

  const hasTalles = product.variantes.talles.length > 0;
  const hasColores = product.variantes.colores.length > 0;

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("es-AR");
  };

  const handleAddToCart = () => {
    // Validación de variantes
    if (hasTalles && !selectedTalle && hasColores && !selectedColor) {
      setErrorMsg("Por favor, selecciona un talle y un color.");
      return;
    }
    if (hasTalles && !selectedTalle) {
      setErrorMsg("Por favor, selecciona un talle.");
      return;
    }
    if (hasColores && !selectedColor) {
      setErrorMsg("Por favor, selecciona un color.");
      return;
    }

    addToCart({
      id: product.id,
      title: product.nombre,
      price: product.precio.toString(),
      category: product.categoria,
      variantInfo: `${selectedColor} - Talle ${selectedTalle}`.trim(),
    });

    onClose(); // Cerramos el modal tras agregar
  };

  const handleWhatsAppOrder = () => {
    const talleText = selectedTalle ? ` | Talle: ${selectedTalle}` : "";
    const colorText = selectedColor ? ` | Color: ${selectedColor}` : "";

    const message = `Hola Don Quijote, me interesa esta prenda de la web:
• Item: ${product.nombre}${talleText}${colorText}
(Ref: ${product.id})

¿Tienen stock para pasar a probarme?`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop oscurecido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Contenedor del Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-background border border-border flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
          >
            {/* Botón Cerrar (Absoluto) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur border border-border text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <X className="size-5" />
            </button>

            {/* Columna Izquierda: Imagen */}
            <div className="w-full md:w-1/2 relative min-h-75 md:min-h-full bg-border/20">
              <Image
                src={product.imagen_url}
                alt={product.nombre}
                fill
                className="object-cover"
              />
              {product.precioAnterior && (
                <div className="absolute top-6 left-6 bg-foreground text-background text-[10px] font-bold uppercase px-3 py-1.5 tracking-widest">
                  Sale
                </div>
              )}
            </div>

            {/* Columna Derecha: Detalles */}
            <div
              className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col overflow-y-auto overscroll-contain"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-2 block">
                {product.categoria}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-tight mb-4">
                {product.nombre}
              </h2>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold text-foreground">
                  ${formatPrice(product.precio)}
                </span>
                {product.precioAnterior && (
                  <span className="text-sm text-foreground/40 line-through">
                    ${formatPrice(product.precioAnterior)}
                  </span>
                )}
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed mb-8">
                {product.descripcion}
              </p>

              {/* Opciones (Talles y Colores) */}
              <div className="space-y-6 mb-10 flex-1">
                {hasTalles && (
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                        Seleccionar Talle
                      </span>
                      <button className="text-[10px] uppercase tracking-widest text-foreground/50 hover:text-foreground underline underline-offset-4">
                        Guía de talles
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.variantes.talles.map((talle) => (
                        <button
                          key={talle}
                          onClick={() => {
                            setSelectedTalle(talle);
                            setErrorMsg(""); // Limpiamos el error si elige una opción
                          }}
                          className={cn(
                            "min-w-[3rem] h-10 px-2 text-xs font-semibold border transition-all",
                            selectedTalle === talle
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-foreground hover:border-foreground/40",
                          )}
                        >
                          {talle}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {hasColores && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground block mb-3">
                      Color disponible
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.variantes.colores.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setSelectedColor(color);
                            setErrorMsg(""); // Limpiamos el error si elige una opción
                          }}
                          className={cn(
                            "px-4 h-10 text-xs font-semibold border transition-all",
                            selectedColor === color
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-foreground hover:border-foreground/40",
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-border relative">
                {/* Mensaje de Error Animado */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-widest bg-red-50 p-3 border border-red-100 rounded-sm mb-2"
                    >
                      <AlertCircle className="size-4" />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleAddToCart}
                  className="w-full h-14 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="size-4" />
                  Agregar al Carrito
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full h-14 bg-transparent border border-foreground text-foreground text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 transition-colors flex items-center justify-center gap-3"
                >
                  Consultar Stock
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
