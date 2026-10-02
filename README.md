# Nitro Gym — Poder Interno

Página informativa de Nitro Gym, Chicxulub, Yucatán, con diseño glassmorphism y paleta roja, negra y gris. Incluye servicios, opiniones, horarios, ubicación y contacto por WhatsApp, teléfono e Instagram/Facebook.

La portada utiliza un logo PNG transparente y estático, con iluminación roja suave aplicada mediante CSS.

## Tecnologías

- HTML5, CSS y JavaScript, sin dependencias de instalación.
- Fuentes e imágenes locales incluidas.
- Google Maps integrado mediante iframe.

## Archivos principales

| Archivo o carpeta | Contenido |
| --- | --- |
| `index.html` | Página principal. Debe quedar en la raíz del repositorio. |
| `css/styles.css` | Diseño, iluminación del logo y adaptación a pantallas. |
| `js/script.js` | Menú, navegación y transiciones. |
| `img/` | Emblemas originales y logo transparente. |
| `fonts/` | Tipografías locales, originales y su licencia. |
| `.gitignore` | Exclusión de archivos temporales y configuración local. |
| `.gitattributes` | Tratamiento de archivos de texto y binarios en Git. |
| `.nojekyll` | Archivo para servir el contenido estático mediante GitHub Pages. |

## Revisar la página en tu computadora

Extrae el ZIP y abre `index.html` en tu navegador. Mantén las carpetas junto a ese archivo. Las fuentes y el logo funcionan sin descargarse de otros sitios; Google Maps y los servicios externos requieren Internet.

También puedes iniciar un servidor local desde esta carpeta si tienes Python instalado:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## Subir a GitHub desde el navegador

1. Extrae el ZIP. Sube sus archivos y carpetas, no el ZIP comprimido.
2. Abre tu repositorio de GitHub.
3. Selecciona **Add file → Upload files**. En un repositorio vacío, utiliza la opción de subir archivos existentes.
4. Arrastra el contenido de la carpeta extraída. `index.html`, `README.md`, `css`, `js`, `img` y `fonts` deben quedar en la raíz del repositorio, sin otra carpeta contenedora.
5. Confirma la carga mediante **Commit changes**. Si estás actualizando un repositorio existente, puedes guardar los cambios en una nueva rama y revisarlos mediante una pull request.

Para actualizar un repositorio existente, sustituye los archivos de esta página en sus mismas rutas y conserva los ajustes de alojamiento que ya tengas, como `CNAME` o configuraciones de despliegue. Los archivos que empiezan con punto pueden estar ocultos en tu explorador; puedes subirlos mediante Git o GitHub Desktop si no aparecen en la selección.

## Subir con Git a un repositorio nuevo y vacío

Ejecuta estos comandos dentro de la carpeta extraída. Sustituye `URL_DE_TU_REPOSITORIO` por la URL real de tu repositorio:

```bash
git init -b main
git add .
git commit -m "Preparar página de Nitro Gym para GitHub"
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```

Si el repositorio ya tiene historial, trabaja dentro de su copia clonada y copia allí los archivos de la página; utiliza su rama y remoto actuales.

## Publicación opcional con GitHub Pages

Subir el proyecto y publicarlo son pasos separados. Cuando quieras publicarlo mediante GitHub Pages:

1. Abre **Settings → Pages** en el repositorio.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Selecciona la rama que contiene estos archivos; en un repositorio nuevo creado con los comandos anteriores es `main`.
4. Selecciona **/ (root)** y guarda.
5. GitHub mostrará la dirección de la página cuando termine el despliegue.

No se necesita un proceso de compilación ni instalar paquetes. La disponibilidad de Pages depende de la configuración y los permisos del repositorio.

## Licencias de las fuentes

La información de las fuentes Nimbus se conserva en `fonts/LICENSE.txt`, junto con sus archivos originales. Este paquete no asigna una nueva licencia al logotipo ni al contenido de Nitro Gym.

## Documentación oficial

- [Subir archivos a un repositorio](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Configurar la publicación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
