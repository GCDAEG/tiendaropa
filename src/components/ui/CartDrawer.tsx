"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { LINDE_PRODUCTS } from "@/lib/mockData";
import { buildInquiryMessage } from "@/lib/inquiry";
import { siteConfig } from "@/lib/site/siteConfig";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const reviewCloseButton = useRef<HTMLButtonElement>(null);
  const reviewTrigger = useRef<HTMLButtonElement>(null);
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const selectedQuantity = cart.reduce((quantity, item) => quantity + item.quantity, 0);
  const lines = cart.flatMap((item) => {
    const product = LINDE_PRODUCTS.find((entry) => entry.id === item.id);
    return product ? [{ product, quantity: item.quantity, ...(item.size ? { size: item.size } : {}), ...(item.color ? { color: item.color } : {}) }] : [];
  });
  const message = buildInquiryMessage(lines);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (review) reviewCloseButton.current?.focus();
    else closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { if (review) setReview(false); else setOpen(false); }
      if (event.key === "Tab") {
        const panel = document.getElementById(review ? "selection-review" : "selection-drawer");
        const nodes = panel?.querySelectorAll<HTMLElement>('button:not([disabled]), [href]');
        if (!nodes?.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [open, review]);

  const close = () => { setReview(false); setOpen(false); requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true })); };
  const closeReview = () => { setReview(false); requestAnimationFrame(() => reviewTrigger.current?.focus({ preventScroll: true })); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); setCopyError(false); }
    catch { setCopied(false); setCopyError(true); }
  };

  return <>
    <button ref={trigger} type="button" onClick={() => setOpen(true)} aria-label={`Mi selección${selectedQuantity ? `, ${selectedQuantity} ${selectedQuantity === 1 ? "prenda" : "prendas"}` : ""}`} aria-haspopup="dialog" className="relative grid min-h-11 min-w-11 place-items-center focus-visible:outline-2 focus-visible:outline-accent"><ShoppingBag size={21} strokeWidth={1.5} />{selectedQuantity > 0 && <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-accent text-[10px] text-white">{selectedQuantity}</span>}</button>
    {open && <div className="fixed inset-0 z-[110] bg-ink/45" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <aside id="selection-drawer" role="dialog" aria-modal="true" aria-labelledby="selection-title" className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-panel">
        <header className="flex items-center justify-between border-b border-line px-5 py-5"><div><p className="eyebrow">Linde · Indumentaria</p><h2 id="selection-title" className="mt-1 font-display text-xl">Mi selección</h2></div><button ref={closeButton} type="button" onClick={close} aria-label="Cerrar mi selección" className="grid size-11 place-items-center"><X /></button></header>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cart.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag size={34} strokeWidth={1.2} className="mb-4 text-muted"/><p className="font-display text-lg">Todavía no agregaste prendas</p><p className="mt-2 max-w-xs text-sm text-muted">Elegí un producto y sus variantes para preparar una consulta.</p></div> : <ul className="space-y-5">{cart.map((item) => <li key={item.cartItemId} className="flex gap-4 border-b border-line pb-5"><div className="min-w-0 flex-1"><p className="text-xs text-muted">{item.category}</p><h3 className="mt-1 font-medium">{item.title}</h3>{(item.size || item.color) && <p className="mt-1 text-sm text-muted">{[item.size ? `Talle ${item.size}` : null, item.color ? `Color ${item.color}` : null].filter(Boolean).join(" · ")}</p>}<p className="mt-2 text-sm">${item.price.toLocaleString("es-AR")} ARS</p><div className="mt-3 inline-flex h-10 items-center border border-line"><button type="button" aria-label={`Restar una unidad de ${item.title}`} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="grid size-10 place-items-center disabled:opacity-40"><Minus size={15}/></button><span aria-label="Cantidad" className="w-8 text-center text-sm">{item.quantity}</span><button type="button" aria-label={`Sumar una unidad de ${item.title}`} onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="grid size-10 place-items-center"><Plus size={15}/></button></div></div><button type="button" onClick={() => removeFromCart(item.cartItemId)} aria-label={`Quitar ${item.title}`} className="grid size-11 shrink-0 place-items-center text-muted hover:text-ink"><Trash2 size={17}/></button></li>)}</ul>}
        </div>
        {cart.length > 0 && <footer className="space-y-4 border-t border-line px-5 py-5"><div className="flex items-center justify-between"><span className="text-sm text-muted">Total de referencia</span><span className="font-medium">${totalPrice.toLocaleString("es-AR")} ARS</span></div><p className="text-xs leading-5 text-muted">Precios ilustrativos. La selección no reserva stock ni confirma una compra.</p><button ref={reviewTrigger} type="button" onClick={() => { setReview(true); setCopied(false); setCopyError(false); }} className="h-12 w-full bg-ink text-sm text-white">Revisar consulta</button></footer>}
      </aside>
      {review && <div className="fixed inset-0 z-[120] flex items-end justify-center bg-ink/50 p-3 sm:items-center sm:p-6"><section id="selection-review" role="dialog" aria-modal="true" aria-labelledby="review-title" className="w-full max-w-lg bg-paper p-5 shadow-panel sm:p-7"><div className="flex items-start justify-between"><div><p className="eyebrow">Modo demo</p><h2 id="review-title" className="mt-2 font-display text-xl">Revisar consulta</h2></div><button ref={reviewCloseButton} type="button" onClick={closeReview} aria-label="Volver a mi selección" className="grid size-11 place-items-center"><X /></button></div><p className="mt-3 text-sm leading-6 text-muted">Este mensaje es un ejemplo y no se enviará a una tienda real.</p><pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap border border-line bg-white p-4 font-sans text-sm leading-6">{message}</pre><button type="button" onClick={copy} className="mt-5 min-h-12 w-full bg-ink px-4 text-sm text-white">{copied ? "Consulta copiada" : "Copiar consulta de ejemplo"}</button>{copyError && <p role="alert" className="mt-2 text-sm text-red-800">No se pudo acceder al portapapeles. Seleccioná y copiá el texto del mensaje.</p>}<a href={siteConfig.portfolioUrl} target="_blank" rel="noreferrer" className="mt-4 block text-center text-sm underline underline-offset-4">Quiero una web para mi negocio · TUWEBHOY</a></section></div>}
    </div>}
  </>;
}
