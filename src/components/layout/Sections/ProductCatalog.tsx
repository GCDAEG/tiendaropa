"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { LINDE_PRODUCTS, Product } from "@/lib/mockData";
import { ProductModal } from "@/components/ui/ProductModal";
import { CatalogFilterState, CatalogFilters } from "./CatalogFilters";

type SortOption = "default" | "price-asc" | "price-desc";
const EMPTY: CatalogFilterState = { gender: "Todos", category: "Todos", sizes: [], colors: [], minPrice: "", maxPrice: "" };
const formatPrice = (price: number) => price.toLocaleString("es-AR");

function readUrl(): { filters: CatalogFilterState; sort: SortOption } {
  const params = new URLSearchParams(window.location.search);
  const sizes = [...new Set(LINDE_PRODUCTS.flatMap((p) => p.variantes.talles))];
  const colors = [...new Set(LINDE_PRODUCTS.flatMap((p) => p.variantes.colores))];
  const gender = params.get("genero");
  const category = params.get("categoria") ?? "Todos";
  const min = params.get("min");
  const max = params.get("max");
  const numberOrEmpty = (value: string | null) => value && /^\d+$/.test(value) ? value : "";
  return {
    filters: {
      gender: gender === "Hombre" || gender === "Mujer" ? gender : "Todos",
      category: [...new Set(LINDE_PRODUCTS.map((p) => p.categoria))].includes(category) ? category : "Todos",
      sizes: params.getAll("talle").filter((size) => sizes.includes(size)),
      colors: params.getAll("color").filter((color) => colors.includes(color)),
      minPrice: numberOrEmpty(min),
      maxPrice: numberOrEmpty(max),
    },
    sort: params.get("orden") === "precio-asc" ? "price-asc" : params.get("orden") === "precio-desc" ? "price-desc" : "default",
  };
}

function writeUrl(filters: CatalogFilterState, sort: SortOption, mode: "push" | "replace" = "push") {
  const params = new URLSearchParams();
  if (filters.gender !== "Todos") params.set("genero", filters.gender);
  if (filters.category !== "Todos") params.set("categoria", filters.category);
  filters.sizes.forEach((size) => params.append("talle", size));
  filters.colors.forEach((color) => params.append("color", color));
  if (filters.minPrice) params.set("min", filters.minPrice);
  if (filters.maxPrice) params.set("max", filters.maxPrice);
  if (sort !== "default") params.set("orden", sort === "price-asc" ? "precio-asc" : "precio-desc");
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
}

export default function ProductCatalog() {
  const [filters, setFilters] = useState(EMPTY);
  const [sort, setSort] = useState<SortOption>("default");
  const [ready, setReady] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const cardTrigger = useRef<HTMLButtonElement | null>(null);
  const min = filters.minPrice === "" ? null : Number(filters.minPrice);
  const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);
  const invalidRange = min !== null && max !== null && min > max;

  useEffect(() => {
    const sync = () => {
      const state = readUrl();
      setFilters(state.filters);
      setSort(state.sort);
      const productId = new URLSearchParams(window.location.search).get("producto");
      if (productId) setSelectedProduct(LINDE_PRODUCTS.find((product) => product.id === productId) ?? null);
      setReady(true);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const updateFilters = useCallback((next: CatalogFilterState) => {
    setFilters(next);
    writeUrl(next, sort, "push");
  }, [sort]);

  const products = useMemo(() => {
    if (invalidRange) return [];
    const filtered = LINDE_PRODUCTS.filter((product) =>
      (filters.gender === "Todos" || product.genero === filters.gender) &&
      (filters.category === "Todos" || product.categoria === filters.category) &&
      (!filters.sizes.length || filters.sizes.some((size) => product.variantes.talles.includes(size))) &&
      (!filters.colors.length || filters.colors.some((color) => product.variantes.colores.includes(color))) &&
      (min === null || product.precio >= min) && (max === null || product.precio <= max),
    );
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.precio - b.precio);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.precio - a.precio);
    return filtered;
  }, [filters, invalidRange, min, max, sort]);

  const categories = [...new Set(LINDE_PRODUCTS.map((p) => p.categoria))];
  const sizes = [...new Set(LINDE_PRODUCTS.flatMap((p) => p.variantes.talles))].sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
  const colors = [...new Set(LINDE_PRODUCTS.flatMap((p) => p.variantes.colores))].sort((a, b) => a.localeCompare(b, "es"));
  const prices = LINDE_PRODUCTS.map((p) => p.precio);
  const active: Array<{ key: string; label: string; clear: () => void }> = [];
  if (filters.gender !== "Todos") active.push({ key: "gender", label: filters.gender, clear: () => updateFilters({ ...filters, gender: "Todos" }) });
  if (filters.category !== "Todos") active.push({ key: "category", label: filters.category, clear: () => updateFilters({ ...filters, category: "Todos" }) });
  filters.sizes.forEach((size) => active.push({ key: `size-${size}`, label: `Talle ${size}`, clear: () => updateFilters({ ...filters, sizes: filters.sizes.filter((v) => v !== size) }) }));
  filters.colors.forEach((color) => active.push({ key: `color-${color}`, label: color, clear: () => updateFilters({ ...filters, colors: filters.colors.filter((v) => v !== color) }) }));
  if (filters.minPrice) active.push({ key: "min", label: `Desde $${formatPrice(Number(filters.minPrice))}`, clear: () => updateFilters({ ...filters, minPrice: "" }) });
  if (filters.maxPrice) active.push({ key: "max", label: `Hasta $${formatPrice(Number(filters.maxPrice))}`, clear: () => updateFilters({ ...filters, maxPrice: "" }) });
  const clearFilters = () => updateFilters(EMPTY);
  const closeProduct = () => {
    setSelectedProduct(null);
    const params = new URLSearchParams(window.location.search);
    if (params.has("producto")) {
      params.delete("producto");
      const query = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
    }
    requestAnimationFrame(() => (cardTrigger.current ?? filterTrigger.current)?.focus({ preventScroll: true }));
  };
  const filterProps = { filters, categories, sizes, colors, priceBounds: { min: Math.min(...prices), max: Math.max(...prices) }, onChange: updateFilters, onClear: clearFilters };

  useEffect(() => {
    if (!filtersOpen && !selectedProduct) return;
    const previous = document.body.style.overflow;
    const mobileFilters = window.matchMedia("(max-width: 1023px)").matches;
    if (mobileFilters || selectedProduct) document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedProduct) setSelectedProduct(null);
        else setFiltersOpen(false);
      }
      if (event.key === "Tab" && filtersOpen && mobileFilters) {
        const panel = document.getElementById("catalog-filter-drawer");
        const focusable = panel?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), [href]');
        if (!focusable?.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [filtersOpen, selectedProduct]);

  useEffect(() => {
    if (filtersOpen) (document.getElementById("catalog-filter-close") ?? document.querySelector<HTMLElement>("#catalog-filter-desktop input, #catalog-filter-desktop button"))?.focus();
    else if (ready) filterTrigger.current?.focus({ preventScroll: true });
  }, [filtersOpen, ready]);

  return (
    <main className="min-h-[70vh] bg-paper px-5 py-10 text-ink md:px-8 md:py-14 lg:px-12">
      <div className="mx-auto max-w-site">
        <header className="relative mb-8 min-h-[26rem] md:mb-10 lg:mb-0 lg:flex lg:min-h-[33rem] lg:items-start lg:justify-between lg:gap-10">
          <div className="pt-2"><p className="eyebrow">Linde · Indumentaria</p>
          <h1 className="mt-3 font-display text-5xl font-normal tracking-tight md:text-6xl">Catálogo</h1></div>
          <p className="mt-5 max-w-md text-base leading-7 text-muted lg:mt-3 lg:text-right">Prendas para explorar y consultar.</p>
          <div role="group" aria-label="Filtrar por categoría" className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 lg:bottom-8">
            {categories.map((category) => <button key={category} type="button" aria-pressed={filters.category === category} onClick={() => updateFilters({ ...filters, category: filters.category === category ? "Todos" : category })} className="min-h-10 border border-line bg-white px-3 text-xs transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white">{category}</button>)}
          </div>
        </header>
        <div className="mb-6 flex min-h-14 items-center justify-between gap-3 border-y border-line py-2">
          <button ref={filterTrigger} type="button" onClick={() => setFiltersOpen((value) => !value)} aria-expanded={filtersOpen} aria-controls="catalog-filter-drawer catalog-filter-desktop" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium">{filtersOpen ? "Ocultar filtros" : "Filtrar"}{active.length ? ` · ${active.length}` : ""}</button>
          <p className="hidden text-sm text-muted lg:block">{ready ? products.length : LINDE_PRODUCTS.length} {products.length === 1 ? "prenda" : "prendas"}</p>
          <label className="ml-auto flex items-center gap-2 text-sm text-muted"><span>Ordenar</span><select aria-label="Ordenar productos" value={sort} onChange={(event) => { const next = event.target.value as SortOption; setSort(next); writeUrl(filters, next); }} className="min-h-11 bg-transparent text-ink focus-visible:outline-2 focus-visible:outline-accent"><option value="default">Destacados</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option></select></label>
        </div>
        {filtersOpen && <div id="catalog-filter-desktop" className="mb-7 hidden border-y border-line py-5 lg:block">{invalidRange && <p role="alert" className="mb-4 text-sm text-red-800">El precio mínimo no puede superar al máximo.</p>}<CatalogFilters {...filterProps} layout="wide" /></div>}
        {active.length > 0 && <div className="mb-6 flex flex-wrap items-center gap-2">{active.map((item) => <button key={item.key} type="button" onClick={item.clear} className="inline-flex min-h-9 items-center gap-1 border border-line bg-white px-3 text-xs">{item.label}<X size={13} aria-hidden="true" /></button>)}<button type="button" onClick={clearFilters} className="min-h-9 px-2 text-sm underline underline-offset-4">Limpiar filtros</button></div>}
        <div className="min-w-0"><p className="mb-4 text-sm text-muted lg:hidden">{products.length} {products.length === 1 ? "prenda" : "prendas"}</p>
            {invalidRange ? <div className="border-t border-line py-12 text-center"><p>El precio mínimo no puede superar al máximo.</p><button onClick={clearFilters} className="mt-4 underline">Limpiar filtros</button></div> : products.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">{products.map((product) => <article key={product.id} className="min-w-0"><button ref={(node) => { if (node && selectedProduct?.id === product.id) cardTrigger.current = node; }} type="button" onClick={(event) => { cardTrigger.current = event.currentTarget; setSelectedProduct(product); }} aria-label={`Ver ${product.nombre}`} className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><div className="relative aspect-[2/3] overflow-hidden bg-sand"><Image src={product.imagen_url} alt={product.nombre} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" /></div><div className="pt-3"><p className="text-xs text-muted">{product.categoria}</p><h2 className="mt-1 text-sm font-medium leading-snug sm:text-base">{product.nombre}</h2><p className="mt-1 text-sm">${formatPrice(product.precio)} <span className="text-xs text-muted">ARS</span></p></div></button></article>)}</div> : <div className="border-t border-line py-16 text-center"><p className="font-display text-xl">No encontramos prendas con esos filtros.</p><button onClick={clearFilters} className="mt-4 min-h-11 underline underline-offset-4">Limpiar filtros</button></div>}
        </div>
      </div>
      {filtersOpen && <div className="fixed inset-0 z-[100] lg:hidden"><button type="button" aria-label="Cerrar filtros" onClick={() => setFiltersOpen(false)} className="absolute inset-0 bg-ink/45" /><aside id="catalog-filter-drawer" role="dialog" aria-modal="true" aria-labelledby="filter-title" className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-paper shadow-panel"><div className="flex h-16 items-center justify-between border-b border-line px-5"><h2 id="filter-title" className="font-display text-lg">Filtrar catálogo</h2><button id="catalog-filter-close" type="button" onClick={() => setFiltersOpen(false)} aria-label="Cerrar filtros" className="grid size-11 place-items-center focus-visible:outline-2 focus-visible:outline-accent"><X /></button></div><div className="flex-1 overflow-y-auto px-5 py-6">{invalidRange && <p role="alert" className="mb-4 text-sm text-red-800">El precio mínimo no puede superar al máximo.</p>}<CatalogFilters {...filterProps} /></div><div className="border-t border-line bg-paper p-5"><button type="button" onClick={() => setFiltersOpen(false)} className="h-12 w-full bg-ink text-sm text-white">Ver {products.length} {products.length === 1 ? "prenda" : "prendas"}</button></div></aside></div>}
      <ProductModal product={selectedProduct} isOpen={Boolean(selectedProduct)} onClose={closeProduct} />
    </main>
  );
}
