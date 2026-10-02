# Nitro Gym — Página para GitHub

Sitio estático con paleta roja, negra y gris, diseño glassmorphism y carrusel
horizontal de fotografías de las instalaciones. No requiere instalación ni compilación.

## Actualizaciones incluidas

- Logo PNG transparente y estático con iluminación roja tenue.
- Retiro de las dos tarjetas flotantes del inicio (aire acondicionado y opiniones).
- Carrusel integrado entre Servicios y Opiniones, titulado “NUESTRAS INSTALACIONES”.
- Solo las cuatro fotografías proporcionadas de Nitro Gym.
- Recuadros en proporción 9:7 (450 × 350 como tamaño base), también en celular.
- Las fotografías llenan el recuadro mediante `object-fit: cover`, sin deformarse.
  El encuadre central recorta únicamente los bordes necesarios para esa proporción.
  Los JPG originales se conservan sin cambiar sus píxeles ni colores.
- Sin leyendas por fotografía, sin etiqueta de demo y sin botón superior de Instagram.
- Fotos apiladas, desenfoque al cambiar, flechas, indicadores, teclado y gestos táctiles.
- Servicios, opiniones, horarios, mapa, contacto y navegación anteriores conservados.

## Revisar y publicar

1. Extrae el ZIP y abre `index.html` para revisar el sitio.
2. Copia el contenido del ZIP dentro de tu carpeta existente del repositorio,
   sustituyendo los archivos coincidentes y manteniendo tus ajustes de alojamiento.
3. Ejecuta desde la terminal de esa carpeta:

```powershell
git status
git add index.html css js img README.md LEEME.txt
git commit -m "Integrar carrusel de instalaciones y actualizar inicio"
git push origin main
```

Este paquete contiene los archivos para publicar; no sube cambios por sí mismo.
La página principal queda en la raíz. Se incluye `.nojekyll` para alojamiento estático.

## Ampliar el carrusel de 4 a 20 fotos

1. Guarda las nuevas fotografías en `img/instalaciones/`, con nombres como
   `instalacion-05.jpg`, `instalacion-06.jpg`, hasta `instalacion-20.jpg`.
2. Dentro de `index.html`, localiza `id="instagramTrack"`.
3. Añade por cada fotografía un botón como este dentro de ese mismo contenedor:

```html
<button class="ig-card" type="button" aria-label="Ver fotografía de las instalaciones">
  <img src="img/instalaciones/instalacion-05.jpg"
       alt="Descripción del área fotografiada"
       width="1170" height="863" loading="lazy" decoding="async"/>
</button>
```

Ajusta `width` y `height` a las dimensiones reales del archivo. La proporción
visual 9:7 la fija el CSS. El número de fotos, indicadores, contador y navegación
se calculan automáticamente. El carrusel muestra la imagen central y sus vecinas;
las demás se mantienen fuera de la vista hasta que les corresponda aparecer.
No añadas tarjetas vacías: cada botón debe contener una fotografía existente.

## Archivos principales

- `index.html`: sitio completo.
- `css/styles.css` y `js/script.js`: diseño y navegación del sitio.
- `css/instalaciones.css` y `js/instalaciones.js`: carrusel de instalaciones.
- `img/instalaciones/`: las cuatro fotografías incluidas.
- `img/`: logos anteriores.
- `fonts/`: fuentes locales, originales y licencia en `LICENSE.txt`.

Sin JavaScript, las fotografías siguen disponibles en una fila deslizable.
La preferencia de movimiento reducido desactiva las animaciones.
Google Maps, WhatsApp y los enlaces sociales necesitan conexión a Internet.
