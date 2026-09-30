"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CartDrawer } from "@/components/ui/CartDrawer";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const panel = document.getElementById("mobile-navigation-panel");
        const items = panel?.querySelectorAll<HTMLElement>('a, button');
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = before; window.removeEventListener("keydown", key); };
  }, [open]);
  useEffect(() => { if (!open) trigger.current?.focus({ preventScroll: true }); }, [open]);

  const links = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Sobre Linde", href: "/#marca" },
  ];

  const home = pathname === "/";
  return <header className={`z-50 text-white ${home ? "absolute inset-x-0 top-0 bg-transparent" : "sticky top-0 border-b border-white/10 bg-ink"}`}>
    <nav aria-label="Navegación principal" className="relative mx-auto flex h-[68px] max-w-site items-center justify-between px-5 md:px-8 lg:h-[100px] lg:px-12">
      <Link href="/" className="flex items-baseline gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><span className="font-display text-[30px] leading-none tracking-tight">Linde</span><span className="hidden text-xs text-white/75 sm:inline">Indumentaria</span></Link>
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
        {links.map((link) => <Link key={link.label} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="min-h-11 content-center text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-paper">{link.label}</Link>)}
      </div>
      <div className="flex items-center gap-2"><CartDrawer /><button ref={trigger} type="button" onClick={() => setOpen(true)} aria-label="Abrir menú" aria-expanded={open} aria-controls="mobile-navigation-panel" className="grid size-11 place-items-center focus-visible:outline-2 focus-visible:outline-paper lg:hidden"><Menu /></button></div>
    </nav>
    {open && <div className="fixed inset-0 z-[100] bg-ink/55 lg:hidden" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><aside id="mobile-navigation-panel" role="dialog" aria-modal="true" aria-label="Navegación" className="absolute inset-y-0 right-0 flex w-[min(88vw,360px)] flex-col bg-paper text-ink shadow-panel"><div className="flex h-16 items-center justify-between border-b border-line px-5"><span className="font-display text-xl">Linde</span><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú" className="grid size-11 place-items-center"><X /></button></div><ul className="flex-1 p-5">{links.map((link) => <li key={link.label} className="border-b border-line"><Link href={link.href} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl">{link.label}</Link></li>)}</ul><div className="border-t border-line p-5"><Link href="/catalogo" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center bg-ink text-sm text-white">Explorar catálogo</Link></div></aside></div>}
  </header>;
}
