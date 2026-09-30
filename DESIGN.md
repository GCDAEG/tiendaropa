# DESIGN.md — Linde · Indumentaria

## Referencia visual observada

Referencia: [Their Nibs](https://www.theirnibs.com/). Se volvió a comparar directamente con Playwright MCP el 30/09/2026 a 1440×900 y 390×844, en inicio y colección.

- El inicio usa una escena fotográfica a sangre que ocupa la primera pantalla. La navegación queda sobre la foto; el titular, el texto breve y el botón se agrupan cerca del centro.
- En escritorio, la barra de navegación ronda los 105 px debajo de una franja superior de 34 px. En móvil ronda los 71 px debajo de una franja de 46 px. Esa franja contiene anuncios comerciales de la tienda; Linde no debe reproducirla ni reemplazarla por una promoción.
- En la colección, el título serif queda a la izquierda y la descripción a la derecha, dentro de una superficie amplia con márgenes generosos. Debajo aparece el control de filtros/orden y una grilla de cuatro productos por fila en escritorio, dos en móvil. Las imágenes son altas, limpias y dominan la tarjeta; el nombre y precio van debajo.
- Los estilos calculados en la página revisada mostraron Poppins para navegación y cuerpo, e Instrument Serif para el titular grande de campaña. Los valores de color no se fijan como tokens de Linde: el navegador de inspección aplica una extensión de modo oscuro que altera los colores computados y las capturas.

## Dirección visual de Linde

Acercarse mediante la estructura, la proporción de la fotografía, el tamaño de las tarjetas y la jerarquía serif/sans. Mantener la identidad tipográfica “Linde”, los textos aprobados y el catálogo de consulta. No reutilizar logo, copy, fotos, campañas, reseñas, descuentos, widgets ni funciones de Their Nibs.

### Inicio

1. Navegación transparente sobre el hero, con Linde a la izquierda, rutas centradas en escritorio y “Mi selección” a la derecha. En móvil, conservar marca, selección y menú accesible.
2. Una foto estática a sangre de alto cercano al viewport. Titular serif y acción centrados sobre la imagen, con contraste suficiente. Sin carrusel, franja promocional ni acciones comerciales inventadas.
3. Tres categorías reales en mosaico: tres columnas en escritorio y dos en móvil.
4. Cuatro productos destacados, cuatro columnas en escritorio y dos en móvil.
5. Presentación breve de la identidad ficticia, CTA al catálogo y footer.

### Catálogo y producto

- Mantener el catálogo en `/catalogo`, con diez productos, filtros, orden, selección de variantes y lista de consulta.
- Presentar el encabezado de colección con título serif grande a la izquierda y apoyo breve a la derecha en escritorio; en móvil, apilarlo sin perder claridad. Agregar accesos de borde fino a las categorías existentes junto al encabezado, sincronizados con los filtros.
- Grilla de cuatro columnas en escritorio y dos en móvil, con imágenes cercanas a 2:3, ancho alineado a los márgenes de contenido y producto sin tarjeta pesada. Nombres y precio van debajo.
- Mantener el control de filtros y orden sobre la grilla. En escritorio, los filtros se despliegan en una banda ancha dentro del flujo, no en una barra lateral persistente; en móvil, se presentan como panel superpuesto que puede cerrarse con Escape.
- Mantener los filtros existentes y sus URLs. No imitar filtros de tela, estilo, disponibilidad o promociones de la referencia.
- En la ficha, priorizar la imagen y la información en paralelo en escritorio, apiladas en móvil. Talles y colores conservan su selección clara; la acción agrega a “Mi selección” y nunca representa un pago.

### Tipografía, color y movimiento

- Poppins para texto y navegación; Instrument Serif para titulares editoriales. Se cargan con `next/font`, sin agregar paquetes.
- Conservar los colores propios de Linde: papel `#FAF8F4`, superficie `#FFFFFF`, arena `#EEEAE3`, tinta `#252A27`, secundario `#60645E`, acento `#596548` y línea `#DADBD4`. El hero usa una capa oscura discreta sobre la foto para legibilidad.
- Botones rectangulares, radios mínimos, bordes selectivos y sin sombras en tarjetas. La foto lleva el mayor peso visual.
- Animación limitada a cambios suaves y hover discreto de imagen. Sin animación automática que demore el contenido.

## Recursos y limitaciones

El hero usa una fotografía ya presente en los datos locales de producto, de una modelo con blusa clara en un interior. El recorte de pantalla completa comunica una escena de moda más envolvente que la composición dividida anterior, pero no ofrece el retrato de cuerpo entero en un ambiente doméstico que aparece en la referencia. No se reemplazó por fotografía de Their Nibs.

Los recursos fotográficos siguen servidos desde URLs de Unsplash existentes. El repositorio no contiene documentación de permisos por imagen ni una campaña fotográfica propia aprobada; hay que resolverlo antes de presentar públicamente la demo como material final. El encuadre de hero se ajusta para privilegiar rostro y prenda dentro del recorte horizontal de escritorio y vertical de móvil. No se afirma equivalencia fotográfica con la referencia.

## Comprobación de diseño

- Playwright MCP: comparar inicio y colección en 1440×900 y 390×844; revisar tipografía, cabecera superpuesta, hero, márgenes, proporciones de tarjeta y captura de móvil.
- Revisar enlaces de categoría, filtros y selección con clics reales. Escape cierra los paneles; mantener scroll y controles accesibles.
- No desplegar. Reportar cualquier limitación de imagen o recurso.
