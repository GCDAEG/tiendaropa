import Link from "next/link";
import { siteConfig } from "@/lib/site/siteConfig";

export function FooterSection() {
  return <footer className="border-t border-line bg-paper px-5 py-10 text-ink md:px-8 lg:px-10"><div className="mx-auto flex max-w-site flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><Link href="/" className="font-display text-2xl">Linde <span className="text-base text-muted">Indumentaria</span></Link><p className="mt-3 max-w-md text-sm text-muted">Linde es una marca ficticia. Demo de catálogo desarrollada por TUWEBHOY.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link href="/catalogo" className="underline-offset-4 hover:underline">Catálogo</Link><a href={siteConfig.portfolioUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">tuwebhoysi.com.ar ↗</a></div></div></footer>;
}
