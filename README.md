# Lorenza Rojas — Nutricionista | Landing Page

Versión 1.0 · Estructura lista para subir al servidor.

---

## 📁 Estructura de carpetas

```
lorenza-rojas/
│
├── index.html              ← Página principal (editar aquí)
│
├── css/
│   └── style.css           ← Todos los estilos (paleta, tipografía, layout)
│
├── js/
│   └── script.js           ← Nav scroll, hamburger, reveal, parallax
│
├── images/
│   ├── lorenza-principal.jpg   ← Foto principal (960×1200 px)
│   ├── lorenza-consultorio.jpg ← Foto consultorio (520×640 px)
│   ├── og-image.jpg            ← Imagen para redes sociales (1200×630 px)
│   └── icons/
│       ├── instagram.svg
│       ├── whatsapp.svg
│       ├── linkedin.svg
│       └── agendapro.svg
│
├── fonts/                  ← Carpeta para fuentes locales (opcional)
│   └── (vacía — actualmente usa Google Fonts)
│
└── descargables/           ← PDFs, guías, recetarios para ofrecer como lead magnet
    └── (agrega aquí tus archivos)
```

---

## ✏️ Cosas que debes personalizar en index.html

### 1. Video Hero
Reemplaza el ID del video Vimeo en la línea del iframe:
```html
src="https://player.vimeo.com/video/TU_ID_AQUI?autoplay=1&muted=1&loop=1&background=1"
```

### 2. Sobre mí — Credenciales
Busca los placeholders `[Universidad]`, `[área de especialidad]`, `+X años` y completa con tus datos reales.

### 3. Servicios — Ciudad y dirección
```html
<p>Consulta en [Ciudad, dirección]. Atención cercana y personalizada.</p>
```

### 4. Reels de Instagram
Para cada reel, reemplaza el bloque `<div class="reel-card__placeholder">` con:
```html
<iframe
  src="https://www.instagram.com/reel/TU_REEL_ID/embed"
  scrolling="no"
  allowtransparency="true"
  allowfullscreen="true">
</iframe>
```
El ID del reel es la parte final de la URL de Instagram.

### 5. Redes sociales — Footer
Busca y reemplaza:
- `TU_USUARIO` (Instagram y LinkedIn)
- `56XXXXXXXXX` (número WhatsApp sin el +)

### 6. SEO — Canonical URL
Reemplaza `https://lorenzarojas.cl/` con tu dominio real.

---

## 🎨 Personalizar colores (css/style.css)

Edita las variables en `:root` al inicio del archivo:
```css
:root {
  --sage:        #8A9E7E;   /* Verde salvia principal */
  --sage-light:  #C4D4B8;   /* Verde salvia claro */
  --cream:       #F7F3EE;   /* Fondo crema */
  --bark:        #2C2416;   /* Tierra oscura (texto principal) */
  --accent:      #C17B4E;   /* Terracota (acento) */
}
```

---

## 🚀 Subir al servidor

1. Sube toda la carpeta `lorenza-rojas/` a la raíz de tu hosting (generalmente `public_html/`)
2. El archivo `index.html` debe quedar en la raíz
3. Verifica que las rutas de imágenes sean correctas

### Con dominio propio:
Puedes subir vía FTP (FileZilla), cPanel, o directamente desde tu hosting.

---

## 📦 Descargables (lead magnets)
Coloca tus PDFs en la carpeta `/descargables/` y enlázalos así:
```html
<a href="descargables/guia-alimentacion.pdf" download>Descarga tu guía gratuita</a>
```

---

## 🔧 Fuentes locales (opcional)
Si prefieres no depender de Google Fonts, descarga las fuentes y ponlas en `/fonts/`,
luego reemplaza el `<link>` de Google Fonts en el `<head>` por `@font-face` en el CSS.

---

*Hecho con ♥ — Estructura limpia, lista para producción.*
