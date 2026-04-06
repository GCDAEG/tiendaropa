// /src/lib/site/siteConfig.ts

export const siteConfig = {
  // 1. Identidad Visual y Marca
  brand: {
    name: "Don Quijote",
    suffix: "Indumentaria", 
    logo: "/logos/don-quijote-logo.png",
    theme: "minimalist", 
    colors: {
      primary: "#000000",   // Negro absoluto (Premium)
      secondary: "#525252", // Gris oscuro para textos secundarios
      accent: "#f3f4f6"     // Gris muy sutil para bordes y fondos (Gris Elegante)
    }
  },

  // 2. Textos Principales (Hero Section)
  hero: {
    badge: "Nueva Temporada",
    title: "Elegancia Clásica",
    subtitle: "Descubrí nuestra nueva colección de indumentaria masculina. Calce perfecto, telas premium y el estilo que te define.",
    buttonText: "Ver Colección",
    bgImage: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80", 
  },

  // Estas categorías se usan en los filtros y marquesinas
  categories: ["Todos", "Jeanería", "Camisería / Remeras", "Accesorios"],

  // 3. Funcionalidades y Datos Comerciales
  features: {
    hasFilters: true,
    hasCart: true,
    whatsappNumber: "5493446123456", // Número del cliente
    deliveryInfo: "Envíos a domicilio y retiro en nuestro local con posibilidad de probarte las prendas.",
    openingHours: "Lunes a Sábado: 9:00 a 20:00"
  },

  // 4. CONEXIÓN A LA BASE DE DATOS
  // (Actualmente usando mockData.ts para la demo, pero listo para Sheets)
  databaseUrl: "https://script.google.com/macros/s/AKfycbwUm-Wb2BDf8ltibLk4mqkMc2rBwAeSutjZyWbkGfm85hjZcICG_u6yYAw3bG37bDZJ/exec",
};