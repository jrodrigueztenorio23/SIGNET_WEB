# Landing SIG Advanced — diseño

Fecha: 2026-11-01 · Estado: aprobado para construir la primera versión visual.

## Objetivo
Reemplazar sigerp.pe (Wix) por una web comercial moderna, intensa y con movimiento interactivo para
**SIG Advanced**, el ERP web de **Lite Software & Consulting**. Toda consulta termina en WhatsApp.

## Decisiones
- **Stack:** Astro (salida estática) + Tailwind CSS + GSAP/ScrollTrigger + Lenis. Fuente Archivo (variable, self-hosted).
- **Sin chat ni IA en la web.** Cada botón abre `wa.me/<número>?text=<mensaje>` con un mensaje según el origen.
  El número y los textos viven en `src/config/site.ts`.
- **Una sola página** con anclas. Sin FAQ ni testimonios por ahora.
- **Marca:** producto "SIG Advanced", empresa "Lite Software & Consulting". Colores de sigerp.pe:
  azul `#0F4D97`, naranja `#F8A116`, índigo `#221F7B`, azul eléctrico `#3C53F4`, gris `#EFEFF4`.
- **Dirección de arte:** taste-skill "Colour chapters" (seed 72749929): cada sección es un campo de color
  a pantalla completa; el header toma la tinta del capítulo que tiene debajo.

## Idea
Los 12 módulos de SIG Advanced se convierten en los capítulos de color de la página. Lo interactivo:
el visitante escribe lo que su empresa necesita y la web le responde con el módulo; al final arma su
cotización (empresa, módulos, usuarios) y la envía por WhatsApp con el mensaje ya escrito.

## Secciones
1. **Hero** (azul): "SIG Advanced / el ERP que mueve tu empresa", botón WhatsApp.
2. **Cifras** (gris): barras con las opciones reales por módulo (377 opciones, MENU_MAESTRO).
3. **¿Qué necesitas?** (naranja): input grande; responde con el módulo y sus pantallas.
4. **Módulos** (índigo): tablero de mosaicos con fragmentos reales de interfaz (SUNAT, PDF/Excel, kardex…).
5. **Clientes** (gris): nombres de los clientes publicados en sigerp.pe.
6. **Plan** (azul eléctrico): ticket "Plan SIG Advanced", precio a cotizar, botón WhatsApp.
7. **Nosotros** (blanco): texto con palabras resaltadas, Lite Software & Consulting.
8. **Cotizador** (naranja): diálogo con empresa, módulos y usuarios → WhatsApp.
9. **Footer** de mosaicos: navegación, contacto, Lima y hora local, wordmark.

## Movimiento
Lenis (scroll suave), entradas escalonadas por sección, barras que crecen, titular revelado por líneas,
color del header por capítulo, botones magnéticos y feedback en hover/foco. Todo respeta
`prefers-reduced-motion`; el contenido es visible sin JavaScript.

## Pendiente de confirmar por el cliente
Número de WhatsApp, teléfono, correo y dirección de Lite Software & Consulting; permiso para mostrar los
nombres de clientes; logo de Lite Software & Consulting.

## Fuera de alcance (por ahora)
Integración con SIGNET_API, bot de WhatsApp, blog, FAQ, testimonios.
