BRIEF.md — Linde · Indumentaria

1. Contexto
   Nombre de trabajo para esta demo: Linde — Indumentaria. Es una identidad ficticia propuesta para sustituir Don Quijote, que corresponde a una marca real. No afirmar exclusividad o disponibilidad registral del nombre.
   Objetivo: mostrar un catálogo de ropa terminado, con presentación de marca, filtros, elección de variantes y preparación de consultas. Se usará en el portfolio de TUWEBHOY y en historias de Instagram.
   Objetivo comercial real: que otros negocios consulten por una web en https://tuwebhoysi.com.ar.
   Público representado: personas que exploran prendas de hombre y mujer y quieren consultar precio, talle, color y disponibilidad. Español argentino; tono breve, claro y cuidado.
2. Alcance y base
   Conservar inicio en / y catálogo en /catalogo. Mantener los diez productos locales, sus IDs y las categorías válidas: Pantalones, Camisería, Sastrería, Accesorios, Vestidos y Abrigos.
   Conservar filtros, orden por precio, modal de producto, selección de talle/color y lista persistente. La demo es un catálogo de consulta; no un checkout. Usar “Mi selección”, “Agregar a mi selección” y “Revisar consulta” como rótulos visibles.
   No añadir pagos, stock en tiempo real, cuentas, favoritos, newsletter, chat, reseñas, promociones nuevas, CMS o backend. No implementar nuevas rutas de producto en esta etapa: adaptar el modal existente.
3. Datos e identidad
   Centralizar marca, moneda ARS, modo demo y destino opcional de WhatsApp. Reemplazar Don Quijote en interfaz, metadata, mensajes y configuración; revisar también referencias internas cuando sea necesario para evitar confusión.
   Conservar inicialmente los precios numéricos como ejemplos y aclarar “Precios ilustrativos en pesos argentinos (ARS)”. Retirar precio anterior y etiquetas Sale sin una promoción aprobada.
   Reescribir descripciones de ejemplo en términos visuales simples compatibles con el producto. Retirar afirmaciones no respaldadas sobre origen, composición exacta, resistencia, calidad premium, sustentabilidad o fabricación. No inventar stock ni disponibilidad por combinación.
   Retirar horarios, teléfonos, direcciones, redes y condiciones comerciales heredadas no aprobadas. No simular un local físico, envíos gratuitos ni posibilidad de probar prendas.
   Usar datos locales como fuente activa. Limpiar referencias inactivas a Google Sheets solo después de comprobar consumidores; no conectar servicios externos.
4. Inicio
   Navbar: marca, Catálogo, Sobre Linde y Mi selección. Menú móvil funcional. Los destinos internos deben funcionar desde ambas rutas usando /#marca cuando corresponda.
   Portada fotográfica: “Prendas para tu día a día.”, breve apoyo y CTA “Explorar catálogo”. Sin campaña estacional o colección nueva inventada.
   Después: hasta tres accesos visuales a categorías existentes; cuatro productos seleccionados; presentación breve; acceso final al catálogo y footer. Los accesos de categoría deben abrir /catalogo con el filtro aplicado en la URL.
   La presentación explica la selección de prendas sin inventar historia empresarial. Identificar la marca ficticia discretamente. Footer: “Linde es una marca ficticia. Demo de catálogo desarrollada por TUWEBHOY”, con enlace real.
5. Catálogo
   Mostrar inicialmente los diez productos con contador. Conservar filtros por género, categoría, talle, color y precio, y orden predeterminado/precio ascendente/precio descendente.
   Dentro de una misma faceta, varias selecciones se combinan como OR; entre facetas, como AND. No tratar esta lógica como un error. Etiquetar selecciones, permitir quitarlas y ofrecer “Limpiar filtros”. No ofrecer valores inexistentes como Unisex si no hay artículos asociados.
   Persistir filtros y orden en parámetros de URL legibles. Validar parámetros desconocidos o inválidos sin romper la página. Recargar, compartir el enlace y volver desde inicio deben mantener una selección coherente.
   Validar rangos de precios y resolver mínimo mayor que máximo con un mensaje claro. Estado sin resultados con opción de limpiar filtros.
   Con diez artículos no hace falta paginación, scroll infinito ni búsqueda nueva.
6. Producto y selección
   Modal con imagen, nombre, descripción disponible, precio, talles y colores aplicables. No inventar galería: si existe una sola fotografía, mostrar una sola.
   Exigir variantes aplicables para agregar. No generar campos vacíos en el resumen. Diferenciar artículos por ID y combinación de variantes; sumar cantidad cuando coincidan. Cantidades positivas enteras.
   La consulta individual puede prepararse sin variantes para preguntar en general; expresar “talle/color a consultar” cuando corresponda, sin confundirlo con una selección confirmada.
   No alterar la fotografía al elegir color si no hay imágenes específicas. Aclarar brevemente que la imagen es ilustrativa de las variantes si es necesario.
   Retirar “Guía de talles” hasta disponer de medidas válidas. No inventar tablas. Cerrar el modal conserva filtros, orden, posición y foco del disparador.
   Lista de selección: editar cantidades, quitar artículos, ver variantes y total de referencia. Explicar que la selección no reserva stock ni confirma una compra.
   Validar datos restaurados de localStorage y tolerar JSON inválido. Reconciliar IDs, variantes y precios contra el catálogo actual. Comprobar que la hidratación no borre la selección guardada.
7. Consulta y modo demo
   Preparar un mensaje con productos, variantes, cantidades e importes de referencia, solicitando disponibilidad. Unificar el generador para consulta individual y selección múltiple.
   Modo demo activo por defecto: mostrar previsualización y “Copiar consulta de ejemplo”, con alternativa seleccionable si el portapapeles falla. Aclarar que no se envía a una tienda real.
   Conservar la capacidad de abrir WhatsApp configurable para una futura adaptación real. Habilitarla únicamente con destino suministrado o autorizado y modo demo desactivado explícitamente. No reutilizar teléfonos heredados.
   No mostrar “compra realizada” al abrir WhatsApp ni vaciar automáticamente la selección como si hubiera confirmación. Para contratar una web, usar el enlace real a TUWEBHOY, separado del flujo de consulta de prendas.
8. Recursos, metadata y aceptación
   Usar fotos suministradas o con permisos documentados, preferentemente locales y optimizadas. No copiar imágenes de Their Nibs. Conservar recursos actuales adecuados; reportar procedencia desconocida o imágenes no correspondientes sin inventar licencias.
   Metadata: “Linde — Catálogo de indumentaria | Demo de TUWEBHOY”. No inventar dominio ni structured data de tienda real. No cambiar indexación o desplegar sin solicitud.
   Aceptación: identidad coherente; categorías de inicio con filtros reales; filtros combinados y URL correctos; variantes y selección robustas; ninguna acción vacía; responsive sin desbordamiento; paneles accesibles; demo explícita y sin mensajes externos durante pruebas. Informar validaciones y pendientes.
