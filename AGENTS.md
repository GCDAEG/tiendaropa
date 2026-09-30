AGENTS.md — Catálogo de indumentaria · TUWEBHOY
Proyecto
Demo para el portfolio de TUWEBHOY e historias destacadas de Instagram. La identidad anterior Don Quijote corresponde a una marca real y debe reemplazarse según BRIEF.md. No copiar datos comerciales de ese negocio.
Leer AGENTS.md, BRIEF.md y DESIGN.md antes de editar. Inspeccionar código y estado de Git; preservar cambios del usuario. Las instrucciones directas más recientes del usuario prevalecen sobre estos documentos.
Trabajo

- Conservar la base existente y resolver decisiones menores con autonomía.
- No repetir relevamientos ya disponibles salvo para resolver una duda concreta del código actual.
- Mantener Next.js, React, TypeScript, Tailwind y npm del repositorio. No actualizar versiones ni migrar de stack sin necesidad acordada.
- Si faltan dependencias para ejecutar el trabajo, instalar las fijadas por package-lock.json mediante npm ci. No regenerar el lockfile para sortear errores; informar inconsistencias.
- Preferir componentes sencillos, utilidades Tailwind y tokens compartidos. Evitar abstracciones, dependencias y refactorizaciones ajenas al objetivo.
- Consultar referencias como inspiración. No copiar su código, marcas, imágenes ni textos.
- No añadir CMS, backend, pagos, autenticación o integraciones no solicitadas.
- No borrar trabajo ajeno ni detener procesos desconocidos. Reutilizar el servidor local correcto cuando sea posible.
  Contenido y comportamiento
- BRIEF.md define el alcance comercial; DESIGN.md define la presentación.
- No inventar datos de contacto, ubicación, horarios, reseñas, stock, materiales, certificaciones o condiciones de venta.
- Los productos y precios de ejemplo deben estar identificados como demostrativos.
- No exponer credenciales o valores de variables de entorno en informes ni archivos.
- No enviar consultas, pedidos, mensajes ni pagos reales durante pruebas.
- Mantener semántica accesible, foco visible, teclado, contraste y movimiento reducido. Los paneles deben gestionar cierre, foco y scroll correctamente.
- No ocultar contenido esencial si falla una animación o JavaScript.
  Verificación y entrega
- Usar Playwright MCP para comprobar la aplicación local en móvil y escritorio, cuando esté disponible.
- Verificar el flujo afectado: filtros, variantes, selección, retorno al listado y persistencia. Pruebas adicionales solo para riesgos concretos.
- Los clics por evaluación directa del DOM no equivalen a comprobar que un usuario pueda pulsar el control: investigar bloqueos de overlays o foco.
- Ejecutar los scripts de lint y build disponibles según el cambio. Diferenciar errores existentes de los introducidos.
- Informar cambios, comprobaciones realizadas y pendientes. No declarar verificado lo que solo se dedujo del código.
- No hacer commits, push, publicación o despliegue sin solicitud explícita.
