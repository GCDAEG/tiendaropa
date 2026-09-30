export type NavSection = { id: string; label: string; href?: string };
export const sections: NavSection[] = [
  { id: "hero", label: "Inicio", href: "/" },
  { id: "catalog", label: "Catálogo", href: "/catalogo" },
  { id: "marca", label: "Sobre Linde", href: "/#marca" },
];
