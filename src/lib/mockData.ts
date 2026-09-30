export interface ProductVariant {
  talles: string[];
  colores: string[];
}

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  genero: "Hombre" | "Mujer";
  precio: number;
  imagen_url: string;
  descripcion: string;
  variantes: ProductVariant;
}

/** Datos ilustrativos del portfolio; las prendas, precios y variantes son de demostración. */
export const LINDE_PRODUCTS: Product[] = [
  {
    id: "DQ-001",
    nombre: "Jean Slim Fit Clásico",
    categoria: "Pantalones",
    genero: "Hombre",
    precio: 45000,
    imagen_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    descripcion: "Jean de corte slim y diseño clásico para combinar todos los días.",
    variantes: { talles: ["38", "40", "42", "44", "46"], colores: ["Azul denim", "Negro", "Celeste claro"] },
  },
  {
    id: "DQ-002",
    nombre: "Chomba Piqué Lisa",
    categoria: "Camisería",
    genero: "Hombre",
    precio: 28000,
    imagen_url: "https://images.unsplash.com/photo-1720514496161-914011a9ee02?q=80&w=900&auto=format&fit=crop",
    descripcion: "Chomba de líneas simples con cuello clásico.",
    variantes: { talles: ["S", "M", "L", "XL", "XXL"], colores: ["Blanco", "Azul marino", "Negro"] },
  },
  {
    id: "DQ-003",
    nombre: "Camisa Oxford",
    categoria: "Camisería",
    genero: "Hombre",
    precio: 52000,
    imagen_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    descripcion: "Camisa de calce regular, cuello clásico y frente abotonado.",
    variantes: { talles: ["39", "40", "41", "42", "43", "44"], colores: ["Celeste", "Blanco"] },
  },
  {
    id: "DQ-008",
    nombre: "Blazer de Corte Recto",
    categoria: "Sastrería",
    genero: "Hombre",
    precio: 120000,
    imagen_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    descripcion: "Blazer de silueta recta con solapas y bolsillos frontales.",
    variantes: { talles: ["48", "50", "52", "54", "56"], colores: ["Azul noche", "Gris"] },
  },
  {
    id: "DQ-004",
    nombre: "Cinturón Reversible",
    categoria: "Accesorios",
    genero: "Hombre",
    precio: 18000,
    imagen_url: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=85",
    descripcion: "Cinturón de diseño reversible con hebilla metálica.",
    variantes: { talles: ["90", "95", "100", "105", "110"], colores: ["Marrón / negro"] },
  },
  {
    id: "DQ-005",
    nombre: "Blusa de Silueta Fluida",
    categoria: "Camisería",
    genero: "Mujer",
    precio: 48000,
    imagen_url: "https://images.unsplash.com/photo-1772855436877-3fe7489f4199?q=80&w=900&auto=format&fit=crop",
    descripcion: "Blusa de líneas suaves, escote en V y mangas con frunce.",
    variantes: { talles: ["XS", "S", "M", "L"], colores: ["Natural", "Negro", "Beige"] },
  },
  {
    id: "DQ-006",
    nombre: "Pantalón Sastrero Palazzo",
    categoria: "Pantalones",
    genero: "Mujer",
    precio: 55000,
    imagen_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    descripcion: "Pantalón de tiro alto, con pinzas y pernera amplia.",
    variantes: { talles: ["36", "38", "40", "42", "44"], colores: ["Negro", "Visón", "Azul marino"] },
  },
  {
    id: "DQ-007",
    nombre: "Vestido Midi",
    categoria: "Vestidos",
    genero: "Mujer",
    precio: 72000,
    imagen_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    descripcion: "Vestido midi con frente abotonado y lazo en la cintura.",
    variantes: { talles: ["S", "M", "L"], colores: ["Crudo", "Verde oliva"] },
  },
  {
    id: "DQ-009",
    nombre: "Trench Clásico",
    categoria: "Abrigos",
    genero: "Mujer",
    precio: 145000,
    imagen_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    descripcion: "Abrigo cruzado con cinturón y cuello de solapas.",
    variantes: { talles: ["S", "M", "L", "XL"], colores: ["Camel", "Negro"] },
  },
  {
    id: "DQ-010",
    nombre: "Cartera Tote",
    categoria: "Accesorios",
    genero: "Mujer",
    precio: 85000,
    imagen_url: "https://images.unsplash.com/photo-1624687943971-e86af76d57de?q=80&w=900&auto=format&fit=crop",
    descripcion: "Cartera tote de formato amplio con cierre superior.",
    variantes: { talles: ["Único"], colores: ["Marrón", "Negro"] },
  },
];

export const PRODUCT_CATEGORIES = [
  "Pantalones",
  "Camisería",
  "Sastrería",
  "Accesorios",
  "Vestidos",
  "Abrigos",
] as const;
