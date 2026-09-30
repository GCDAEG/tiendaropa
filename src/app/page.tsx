import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LINDE_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/mockData";
import HeroSection from "@/components/layout/Sections/HeroSection";

const categoryVisuals: Record<string, string> = {
  Pantalones: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
  Camisería: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85",
  Sastrería: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
  Accesorios: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
};
const featured = [LINDE_PRODUCTS[0], LINDE_PRODUCTS[2], LINDE_PRODUCTS[5], LINDE_PRODUCTS[8]];
const price = (value: number) => value.toLocaleString("es-AR");

export default function Home() {
  const categories = PRODUCT_CATEGORIES.slice(0, 3);
  return <main className="bg-paper text-ink">
    <HeroSection />
    <section className="mx-auto max-w-site px-5 py-12 md:px-8 md:py-16 lg:px-12"><div className="mb-6 flex items-end justify-between"><div><p className="eyebrow">Explorar</p><h2 className="mt-2 font-display text-3xl md:text-4xl">Por categoría</h2></div><Link href="/catalogo" className="hidden items-center gap-2 text-sm underline underline-offset-4 sm:flex">Ver todo <ArrowUpRight size={16}/></Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">{categories.map((category) => <Link key={category} href={`/catalogo?categoria=${encodeURIComponent(category)}`} className="group relative block overflow-hidden bg-sand focus-visible:outline-2 focus-visible:outline-accent"><div className="relative aspect-[3/4]"><Image src={categoryVisuals[category]} alt={`Explorar ${category.toLowerCase()}`} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" /></div><div className="flex items-center justify-between border-b border-line bg-white px-3 py-3 sm:px-4"><h3 className="font-display text-base sm:text-lg">{category}</h3><ArrowUpRight size={17}/></div></Link>)}</div><Link href="/catalogo" className="mt-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4 sm:hidden">Ver todas las categorías</Link></section>
    <section className="bg-sand/65 px-5 py-12 md:px-8 md:py-16 lg:px-12"><div className="mx-auto max-w-site"><div className="mb-6 flex items-end justify-between"><div><p className="eyebrow">Una selección</p><h2 className="mt-2 font-display text-3xl md:text-4xl">Prendas destacadas</h2></div><Link href="/catalogo" className="hidden items-center gap-2 text-sm underline underline-offset-4 sm:flex">Catálogo completo <ArrowUpRight size={16}/></Link></div><div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">{featured.map((product) => <Link key={product.id} href={`/catalogo?producto=${product.id}`} className="group min-w-0 focus-visible:outline-2 focus-visible:outline-accent"><div className="relative aspect-[2/3] overflow-hidden bg-paper"><Image src={product.imagen_url} alt={product.nombre} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"/></div><p className="mt-3 text-xs text-muted">{product.categoria}</p><h3 className="mt-1 text-sm font-medium leading-snug sm:text-base">{product.nombre}</h3><p className="mt-1 text-sm">${price(product.precio)} <span className="text-xs text-muted">ARS</span></p></Link>)}</div><Link href="/catalogo" className="mt-7 inline-flex min-h-11 items-center text-sm underline underline-offset-4 sm:hidden">Ver catálogo completo</Link></div></section>
    <section id="marca" className="scroll-mt-20 px-5 py-14 md:px-8 md:py-20 lg:px-10"><div className="mx-auto grid max-w-site gap-5 md:grid-cols-[0.4fr_1fr] md:gap-12"><p className="eyebrow">Sobre Linde</p><div><h2 className="max-w-3xl font-display text-3xl leading-tight md:text-5xl">Una mirada simple sobre prendas, formas y combinaciones.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-muted">Linde es una identidad ficticia creada para mostrar una experiencia de catálogo. Reunimos prendas de ejemplo para que puedas explorar categorías, elegir variantes y preparar una consulta.</p></div></div></section>
    <section className="px-5 pb-14 md:px-8 md:pb-20 lg:px-10"><div className="mx-auto flex max-w-site flex-col gap-5 border-y border-line py-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Seguí explorando</p><h2 className="mt-2 font-display text-2xl md:text-3xl">Encontrá una prenda para consultar.</h2></div><Link href="/catalogo" className="inline-flex min-h-12 items-center justify-center bg-ink px-6 text-sm text-white hover:bg-ink/90">Explorar catálogo <ArrowUpRight size={16} className="ml-2"/></Link></div></section>
  </main>;
}
