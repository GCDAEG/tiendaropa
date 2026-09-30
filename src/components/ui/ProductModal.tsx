"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowRight, X } from "lucide-react";
import { Product } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/lib/site/siteConfig";
import { buildInquiryMessage } from "@/lib/inquiry";

interface Props { product: Product | null; isOpen: boolean; onClose: () => void; }
export function ProductModal({ product, isOpen, onClose }: Props) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [showInquiry, setShowInquiry] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inquiryCloseRef = useRef<HTMLButtonElement>(null);
  const inquiryTriggerRef = useRef<HTMLButtonElement>(null);
  const { addToCart } = useCart();
  const hasSizes = Boolean(product?.variantes.talles.length);
  const hasColors = Boolean(product?.variantes.colores.length);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showInquiry) setShowInquiry(false);
        else onClose();
      }
      if (event.key === "Tab") {
        const panel = document.getElementById(showInquiry ? "inquiry-dialog" : "product-dialog");
        const focusable = panel?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea');
        if (!focusable?.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", keydown); };
  }, [isOpen, onClose, showInquiry]);

  useEffect(() => {
    if (showInquiry) inquiryCloseRef.current?.focus();
  }, [showInquiry]);

  if (!isOpen || !product) return null;
  const money = (amount: number) => amount.toLocaleString("es-AR");
  const message = buildInquiryMessage([{ product, quantity: 1, size, color }]);
  const add = () => {
    if ((hasSizes && !size) || (hasColors && !color)) { setError("Elegí las variantes para agregar esta prenda a tu selección."); return; }
    addToCart({ id: product.id, title: product.nombre, price: product.precio, category: product.categoria, ...(size ? { size } : {}), ...(color ? { color } : {}) });
    onClose();
  };
  const copyInquiry = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); }
    catch { setCopied(false); }
  };

  return <div className="fixed inset-0 z-[130] flex items-end justify-center bg-ink/55 p-0 sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section id="product-dialog" role="dialog" aria-modal="true" aria-labelledby="product-title" className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden bg-paper shadow-panel sm:flex-row sm:max-h-[90vh]">
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar detalle" className="absolute right-3 top-3 z-10 grid size-11 place-items-center border border-line bg-paper/95 text-ink focus-visible:outline-2 focus-visible:outline-accent"><X /></button>
      <div className="relative h-[34dvh] min-h-52 bg-sand sm:h-auto sm:min-h-[620px] sm:w-[52%]"><Image src={product.imagen_url} alt={product.nombre} fill sizes="(max-width: 640px) 100vw, 52vw" className="object-cover" priority /></div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-6 sm:px-9 sm:pb-8 sm:pt-12">
        <p className="text-sm text-muted">{product.categoria} · {product.genero}</p>
        <h2 id="product-title" className="mt-2 max-w-md font-display text-2xl font-medium leading-tight sm:text-3xl">{product.nombre}</h2>
        <p className="mt-4 text-lg">${money(product.precio)} <span className="text-sm text-muted">ARS · ilustrativo</span></p>
        <p className="mt-5 max-w-lg text-sm leading-6 text-muted">{product.descripcion}</p>
        <p className="mt-3 text-xs text-muted">La imagen es ilustrativa; no hay fotos específicas para cada variante.</p>
        {(hasSizes || hasColors) && <div className="mt-7 space-y-6">
          {hasSizes && <fieldset><legend className="mb-3 text-sm font-medium">Talle</legend><div className="flex flex-wrap gap-2">{product.variantes.talles.map((value) => <button key={value} type="button" aria-pressed={size === value} onClick={() => { setSize(value); setError(""); }} className={`min-h-11 min-w-11 border px-3 text-sm focus-visible:outline-2 focus-visible:outline-accent ${size === value ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/50"}`}>{value}</button>)}</div></fieldset>}
          {hasColors && <fieldset><legend className="mb-3 text-sm font-medium">Color</legend><div className="flex flex-wrap gap-2">{product.variantes.colores.map((value) => <button key={value} type="button" aria-pressed={color === value} onClick={() => { setColor(value); setError(""); }} className={`min-h-11 border px-3 text-sm focus-visible:outline-2 focus-visible:outline-accent ${color === value ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/50"}`}>{value}</button>)}</div></fieldset>}
        </div>}
        {error && <p role="alert" className="mt-5 flex items-start gap-2 text-sm text-red-800"><AlertCircle size={18} />{error}</p>}
        <div className="mt-7 flex flex-col gap-3 border-t border-line pt-5 sm:mt-8">
          <button type="button" onClick={add} className="min-h-12 bg-ink px-5 text-sm font-medium text-white hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Agregar a mi selección</button>
          <button ref={inquiryTriggerRef} type="button" onClick={() => setShowInquiry(true)} className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-5 text-sm hover:bg-sand focus-visible:outline-2 focus-visible:outline-accent">Consultar esta prenda <ArrowRight size={16} /></button>
          <p className="text-xs leading-5 text-muted">La selección no reserva stock ni confirma una compra.</p>
        </div>
      </div>
      {showInquiry && <div className="absolute inset-0 z-20 flex items-end bg-ink/40 p-3 sm:items-center sm:justify-center sm:p-6"><section id="inquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" className="w-full bg-paper p-5 shadow-panel sm:max-w-lg sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Modo demo</p><h3 id="inquiry-title" className="mt-2 font-display text-xl">Revisar consulta</h3></div><button ref={inquiryCloseRef} type="button" onClick={() => { setShowInquiry(false); requestAnimationFrame(() => inquiryTriggerRef.current?.focus({ preventScroll: true })); }} aria-label="Volver al producto" className="grid size-11 place-items-center"><X /></button></div><p className="mt-3 text-sm leading-6 text-muted">Este mensaje es un ejemplo. No se enviará a una tienda real.</p><pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap border border-line bg-white p-4 font-sans text-sm leading-6">{message}</pre><button type="button" onClick={copyInquiry} className="mt-5 min-h-12 w-full bg-ink px-5 text-sm text-white">{copied ? "Consulta copiada" : "Copiar consulta de ejemplo"}</button>{!copied && <p className="mt-2 text-center text-xs text-muted">Si copiar no está disponible, podés seleccionar y copiar el texto de arriba.</p>}<a href={siteConfig.portfolioUrl} target="_blank" rel="noreferrer" className="mt-4 block text-center text-sm underline underline-offset-4">Quiero una web para mi negocio · TUWEBHOY</a></section></div>}
    </section>
  </div>;
}
