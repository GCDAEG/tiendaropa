export interface ProductVariant {
  talles: string[];
  colores: string[];
}

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  genero: "Hombre" | "Mujer" | "Unisex"; // <-- NUEVO ATRIBUTO
  precio: number;
  precioAnterior?: number;
  imagen_url: string;
  descripcion: string;
  variantes: ProductVariant;
}

export const DON_QUIJOTE_PRODUCTS: Product[] = [
  // --- COLECCIÓN MASCULINA ---
  {
    id: "DQ-001",
    nombre: "Jean Slim Fit Clásico",
    categoria: "Pantalones",
    genero: "Hombre",
    precio: 45000,
    imagen_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    descripcion: "Corte slim fit que estiliza la figura sin perder comodidad. Denim premium con un 2% de elastano para uso diario.",
    variantes: { talles: ["38", "40", "42", "44", "46"], colores: ["Azul Denim", "Negro", "Celeste Claro"] }
  },
  {
    id: "DQ-002",
    nombre: "Chomba Piqué Lisa",
    categoria: "Camisería",
    genero: "Hombre",
    precio: 28000,
    imagen_url: "https://images.unsplash.com/photo-1586363104862-3a5e228968ad?auto=format&fit=crop&w=600&q=80",
    descripcion: "Chomba clásica de algodón piqué. Ideal para un look casual elegante de fin de semana.",
    variantes: { talles: ["S", "M", "L", "XL", "XXL"], colores: ["Blanco", "Azul Marino", "Negro"] }
  },
  {
    id: "DQ-003",
    nombre: "Camisa de Vestir Oxford",
    categoria: "Camisería",
    genero: "Hombre",
    precio: 52000,
    imagen_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    descripcion: "Camisa de calce regular en tela Oxford 100% algodón. Cuello italiano reforzado, perfecta para la oficina o eventos.",
    variantes: { talles: ["39", "40", "41", "42", "43", "44"], colores: ["Celeste", "Blanco"] }
  },
  {
    id: "DQ-008",
    nombre: "Blazer de Lana Fina",
    categoria: "Sastrería",
    genero: "Hombre",
    precio: 120000,
    imagen_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    descripcion: "Saco sastrero masculino con forrería interna a tono. Confeccionado en mezcla de lana fina, corte Modern Fit.",
    variantes: { talles: ["48", "50", "52", "54", "56"], colores: ["Azul Noche", "Gris Jaspeado"] }
  },
  {
    id: "DQ-004",
    nombre: "Cinturón de Cuero Reversible",
    categoria: "Accesorios",
    genero: "Hombre",
    precio: 18000,
    precioAnterior: 24000,
    imagen_url: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80",
    descripcion: "Cinturón 100% cuero vacuno. Hebilla metálica giratoria de diseño minimalista para usar de ambos lados.",
    variantes: { talles: ["90", "95", "100", "105", "110"], colores: ["Marrón / Negro"] }
  },

  // --- COLECCIÓN FEMENINA ---
  {
    id: "DQ-005",
    nombre: "Blusa de Seda Natural",
    categoria: "Camisería",
    genero: "Mujer",
    precio: 48000,
    imagen_url: "https://images.unsplash.com/photo-1598522325754-055272a2e4b3?auto=format&fit=crop&w=600&q=80",
    descripcion: "Blusa femenina fluida con caída perfecta. Cuello mao en V y mangas con sutil frunce. Ideal para un look de noche o de oficina.",
    variantes: { talles: ["XS", "S", "M", "L"], colores: ["Off-White", "Negro", "Beige"] }
  },
  {
    id: "DQ-006",
    nombre: "Pantalón Sastrero Palazzo",
    categoria: "Pantalones",
    genero: "Mujer",
    precio: 55000,
    imagen_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
    descripcion: "Pantalón de vestir tiro alto con pinzas frontales y pernera ancha. Tela crepé de gran caída que alarga la silueta.",
    variantes: { talles: ["36", "38", "40", "42", "44"], colores: ["Negro", "Visón", "Azul Marino"] }
  },
  {
    id: "DQ-007",
    nombre: "Vestido Midi de Lino",
    categoria: "Vestidos",
    genero: "Mujer",
    precio: 72000,
    precioAnterior: 85000,
    imagen_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    descripcion: "Vestido de largo midi confeccionado 100% en lino europeo. Botonadura frontal de carey y cinto a la cintura.",
    variantes: { talles: ["S", "M", "L"], colores: ["Crudo", "Verde Oliva"] }
  },
  {
    id: "DQ-009",
    nombre: "Trench Coat Clásico",
    categoria: "Abrigos",
    genero: "Mujer",
    precio: 145000,
    imagen_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    descripcion: "Piloto resistente al agua con forrería a cuadros. Diseño cruzado con cinturón, un esencial atemporal del guardarropa femenino.",
    variantes: { talles: ["S", "M", "L", "XL"], colores: ["Camel", "Negro"] }
  },
  {
    id: "DQ-010",
    nombre: "Cartera Tote de Cuero",
    categoria: "Accesorios",
    genero: "Mujer",
    precio: 85000,
    imagen_url: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80",
    descripcion: "Bolso amplio estructurado en cuero vacuno granulado. Herrajes dorados y cierre metálico superior. Incluye sobre interno removible.",
    variantes: { talles: ["Único"], colores: ["Marrón Suela", "Negro"] }
  }
];