# Fixy Hub Marketing
Intranet interna de Marketing para Fixy Logística (frontend estático, modular y escalable).

## Cómo abrir localmente
1. Clonar repo.
2. Abrir `index.html` con un servidor estático (recomendado `python3 -m http.server`).
3. Entrar en navegador: `http://localhost:8000`.

## Estructura
- `index.html`, `admin.html`, `chat.html`
- `css/` estilos base y por página
- `js/` módulos de auth, permisos, parsers, dashboard, admin, wall y chat
- `data/mockData.js` datos demo
- `assets/` logo e imágenes

## Roles demo
- `debora@fixy.com.ar` (admin)
- `marketing@fixy.com.ar` (editor)
- `equipo@fixy.com.ar` (viewer)

## CSV Meta
Desde Admin > Reportes cargados (Meta): subir uno o varios CSV. Se consolida inversión/resultados/campañas.

## CSV Kommo
Desde Admin > Reportes Kommo: subir CSV, aplicar filtros de fuente/teléfono/keywords y clasificación gestionable.

## Cambiar filtros
Admin > Configuración de filtros (JSON editable).

## Limitaciones localStorage
- Datos locales por navegador/dispositivo.
- No multiusuario real.
- Capacidad limitada por navegador.

## Próxima etapa con backend
- API y base de datos (usuarios, posts, archivos).
- Login corporativo SSO.
- Procesamiento server-side de CSV.
- Trazabilidad y auditoría.

## Deploy
- GitHub Pages (estático)
- Netlify
- Vercel
