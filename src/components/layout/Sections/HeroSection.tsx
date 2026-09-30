import Image from "next/image";
import Link from "next/link";
import { LINDE_PRODUCTS } from "@/lib/mockData";

export default function HeroSection() {
  const heroImage = LINDE_PRODUCTS.find((product) => product.id === "DQ-005")?.imagen_url ?? LINDE_PRODUCTS[5].imagen_url;
  return <section id="hero" className="relative isolate grid min-h-[100svh] overflow-hidden bg-ink text-white">
    <Image src={heroImage} alt="Modelo con una blusa clara en un interior luminoso" fill priority sizes="100vw" className="-z-20 object-cover object-[50%_38%] md:object-[50%_26%]" />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35" />
    <div className="mx-auto flex w-full max-w-5xl translate-y-5 flex-col items-center justify-center px-5 pb-16 pt-24 text-center md:px-8 lg:translate-y-8 lg:pb-12 lg:pt-28">
      <h1 className="max-w-4xl font-display text-[clamp(2.9rem,5vw,4.25rem)] leading-[0.96] font-normal tracking-[-0.025em]">Prendas para tu día a día.</h1>
      <p className="mt-5 max-w-lg text-sm leading-6 text-white/90 md:text-base">Una selección para explorar y consultar.</p>
      <Link href="/catalogo" className="mt-6 inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm font-medium text-white transition-colors hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explorar catálogo</Link>
    </div>
  </section>;
}
