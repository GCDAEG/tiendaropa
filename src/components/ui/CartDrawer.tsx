"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  X,
  Trash2,
  MessageCircle,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWSModal, setShowWSModal] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const WHATSAPP_NUMBER = "5493446123456";

  const generateWSMessage = () => {
    const productList = cart
      .map((item) => {
        // Agregamos la información de la variante si existe
        const variantStr = item.variantInfo ? ` (${item.variantInfo})` : "";
        return `${item.quantity}x ${item.title}${variantStr} - $${(Number(item.price) * item.quantity).toLocaleString("es-AR")}`;
      })
      .join("\n");

    return `NUEVO PEDIDO - DON QUIJOTE 👔\n\nHola! Me gustaría consultar por la siguiente selección:\n\n${productList}\n\nTOTAL ESTIMADO: $${totalPrice.toLocaleString("es-AR")}\n\n¿Tienen disponibilidad en el local para pasar a probarme?`;
  };

  const handleFinalSend = () => {
    const message = generateWSMessage();
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setShowWSModal(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* BOTÓN DISPARADOR */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center justify-center p-2 text-foreground/80 hover:text-foreground transition-colors"
      >
        <ShoppingBag className="size-6" strokeWidth={1.5} />
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 size-4 bg-foreground text-[9px] text-background flex items-center justify-center rounded-full font-bold shadow-sm"
            >
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* DRAWER Y MODAL */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm min-h-screen"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md z-[130] bg-background shadow-2xl flex flex-col border-l border-border"
            >
              {/* HEADER */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                    Tu Selección
                  </span>
                  <h2 className="text-xl font-bold text-foreground tracking-tight uppercase">
                    Carrito de Compras
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-border/50 transition-colors text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* LISTA DE PRODUCTOS */}
              <div
                className="flex-1 overflow-y-auto p-6 space-y-4 data-lenis-prevent"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-foreground/30">
                    <ShoppingBag
                      className="size-16 mb-4 opacity-50"
                      strokeWidth={1}
                    />
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground/50">
                      No hay prendas seleccionadas
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.cartItemId} // Usamos el ID único generado en el Context
                      layout
                      className="flex gap-4 p-4 border border-border bg-background transition-colors hover:border-foreground/20"
                    >
                      <div className="flex-1">
                        <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-widest block mb-1">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold leading-tight mb-1 uppercase tracking-tight text-foreground">
                          {item.title}
                        </h4>

                        {/* Mostramos las variantes elegidas de forma elegante */}
                        {item.variantInfo && (
                          <p className="text-xs text-foreground/60 mb-2 font-medium">
                            {item.variantInfo}
                          </p>
                        )}

                        <p className="text-sm font-bold text-foreground">
                          ${Number(item.price).toLocaleString("es-AR")}
                        </p>
                      </div>

                      {/* CONTROLES DE CANTIDAD */}
                      <div className="flex flex-col items-end justify-between gap-2">
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-foreground/30 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <div className="flex items-center gap-3 border border-border p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            className="p-1 hover:bg-border/50 transition-all disabled:opacity-30 text-foreground"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="p-1 hover:bg-border/50 transition-all text-foreground"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* FOOTER */}
              {cart.length > 0 && (
                <div className="p-6 bg-background border-t border-border space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">
                      Total Estimado
                    </span>
                    <span className="text-2xl font-black text-foreground">
                      ${totalPrice.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowWSModal(true)}
                    className="w-full h-14 bg-foreground text-background font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-colors hover:bg-foreground/90"
                  >
                    Revisar Pedido
                    <MessageCircle className="size-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* MODAL SIMULADOR WHATSAPP */}
        {showWSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 min-h-screen"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#e5ddd5] w-full max-w-sm overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Header WhatsApp */}
              <div className="bg-[#075e54] p-4 text-white flex items-center gap-3">
                <div className="size-10 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  D
                </div>
                <div>
                  <h3 className="font-bold text-sm">Don Quijote</h3>
                  <p className="text-[10px] opacity-70">En línea ahora</p>
                </div>
              </div>

              {/* Cuerpo del Chat */}
              <div className="p-4 space-y-4 min-h-[250px] flex flex-col justify-end">
                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start text-[11px] leading-relaxed">
                  ¡Hola! Bienvenido a Don Quijote. ¿Qué prendas te interesan
                  para pasar a probarte? 👔
                </div>
                <div className="bg-[#dcf8c6] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] self-end text-[11px] whitespace-pre-wrap leading-relaxed relative">
                  {generateWSMessage()}
                  <span className="block text-[9px] text-right opacity-50 mt-1">
                    Ahora
                  </span>
                </div>
              </div>

              {/* Botones Acción */}
              <div className="p-4 bg-white flex gap-2 border-t border-gray-200">
                <button
                  onClick={() => setShowWSModal(false)}
                  className="flex-1 py-3 text-xs font-bold uppercase text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Volver
                </button>
                <button
                  onClick={handleFinalSend}
                  className="flex-[2] py-3 bg-[#25d366] text-white font-bold uppercase text-xs shadow-md hover:bg-[#1ebe57] flex items-center justify-center gap-2 transition-colors"
                >
                  <Check className="size-4" /> Enviar ahora
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
