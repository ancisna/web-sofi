# Plan de pruebas — Sofía Reyes Psicóloga

## Índice
1. [Tests de usuario (manual)](#1-tests-de-usuario-manual)
2. [Tests de base de datos (Supabase)](#2-tests-de-base-de-datos-supabase)
3. [Seguridad de Supabase](#3-seguridad-de-supabase)
4. [Seguridad de GitHub](#4-seguridad-de-github)
5. [SEO y rendimiento](#5-seo-y-rendimiento)
6. [Responsiveness](#6-responsiveness)

---

## 1. Tests de usuario (manual)

### 1.1 Navegación general

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 1 | Abrir `/` | Se carga la home con hero, terapias destacadas y talleres destacados | |
| 2 | Hacer clic en el logo | Navega a `/` | |
| 3 | Clic en cada enlace del menú de navegación | Navega a la página correcta sin error | |
| 4 | Reducir la ventana a móvil (< 768px) | Aparece el menú hamburguesa | |
| 5 | Abrir y cerrar el menú móvil | Se abre y cierra correctamente | |
| 6 | Pulsar Tab por toda la página | El foco es visible en todos los elementos interactivos | |
| 7 | Pulsar el enlace "Ir al contenido principal" (skip link) | El foco salta al contenido principal | |
| 8 | Hacer scroll hacia abajo | El header permanece fijo en la parte superior | |

### 1.2 Topbar y footer

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 9 | Ver la topbar en escritorio | Se ven icono WhatsApp + `681 998 181` e icono email + `sofiam.reyes.roson@gmail.com` | |
| 10 | Clic en el teléfono de la topbar | Abre WhatsApp (`wa.me/34681998181`) en nueva pestaña | |
| 11 | Clic en el email de la topbar | Abre cliente de correo con `sofiam.reyes.roson@gmail.com` | |
| 12 | Ver el footer | Aparece el texto `@sofiareyes_psicologa` junto al icono de Instagram | |
| 13 | Clic en Instagram del footer | Abre `instagram.com/sofiareyes_psicologa` en nueva pestaña | |
| 14 | Reducir ventana a < 480px | En la topbar desaparecen los textos y solo quedan los iconos | |
| 15 | Ver el número de teléfono en móvil (topbar) | El número no se parte en dos líneas (`white-space: nowrap`) | |

### 1.3 Logo y favicon

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 16 | Abrir la web en escritorio (≥ 768px) | El logo horizontal (`logo-horizontal.svg`) es visible en el navbar | |
| 17 | Reducir a móvil (< 768px) | El logo cambia al icono cuadrado (`logo-icon.svg`) | |
| 18 | Verificar la pestaña del navegador | Aparece el favicon SVG personalizado | |

### 1.4 Skeleton loaders

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 19 | Simular conexión lenta y abrir `/therapies` | Aparecen tarjetas skeleton durante la carga | |
| 20 | Simular conexión lenta y abrir `/therapies/:id` | Aparece skeleton de detalle durante la carga | |
| 21 | Simular conexión lenta y abrir `/articles` | Aparecen skeletons de artículos | |
| 22 | Simular conexión lenta en admin y editar una terapia | Aparece `ProgressSpinner` mientras carga el formulario | |

### 1.5 Página `/therapies`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 23 | Abrir `/therapies` | Se muestran las terapias activas con título, descripción, duración, precio y modalidad | |
| 24 | Hacer clic en una tarjeta de terapia | Navega al detalle correcto `/therapies/:id` | |
| 25 | Verificar que terapias inactivas no aparecen | Solo se ven las marcadas como activas en el admin | |
| 26 | Con pocas terapias (≤ 3) | El footer es visible sin hacer scroll | |

### 1.6 Página `/therapies/:id`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 27 | Ver detalle de una terapia | Se muestra título, descripción completa, duración, precio y modalidad | |
| 28 | Pulsar "Pedir cita" | Navega a `/contact` | |
| 29 | Pulsar "← Volver" | Regresa a `/therapies` | |
| 30 | Acceder a una URL inválida `/therapies/no-existe` | Se muestra página de error o redirección | |

### 1.7 Página `/workshops`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 31 | Abrir `/workshops` | Se muestran talleres activos con fecha, hora, modalidad, lugar y precio | |
| 32 | Verificar taller online | No aparece campo lugar | |
| 33 | Verificar taller presencial con lugar | Aparece el icono de ubicación y el nombre del lugar | |
| 34 | Verificar taller presencial sin lugar | No aparece ningún lugar (no se muestra vacío) | |
| 35 | Hacer clic en una tarjeta | Navega al detalle correcto `/workshops/:id` | |

### 1.8 Página `/workshops/:id`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 36 | Ver detalle de un taller | Se muestran fecha, hora inicio–fin, modalidad, lugar (si presencial) y precio | |
| 37 | Pulsar "Contactar" | Navega a `/contact` | |
| 38 | Taller online | No aparece campo lugar en el detalle | |

### 1.9 Página `/articles`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 39 | Abrir `/articles` | Se muestran "Más recientes" (máx. 3) y "Más leídos" (resto, sin duplicados) | |
| 40 | Verificar sección "Más leídos" | Solo aparece si hay más de 3 artículos y ninguno está duplicado | |
| 41 | Filtrar por categoría (clic en chip de categoría) | Solo aparecen artículos de esa categoría; desaparecen las secciones | |
| 42 | Quitar el filtro | Vuelve la vista normal con las dos secciones | |
| 43 | Con pocos artículos (≤ 3) | El footer es visible sin hacer scroll | |

### 1.10 Página `/articles/:slug`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 44 | Abrir un artículo | El contador de vistas se incrementa en 1 | |
| 45 | Abrir el mismo artículo desde otra sesión | El contador vuelve a incrementarse | |
| 46 | Verificar artículos relacionados | Aparecen artículos de la misma categoría distintos al actual | |
| 47 | Pulsar "← Todos los artículos" | Regresa a `/articles` | |

### 1.11 Página `/contact`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 48 | Abrir `/contact` | Se muestra la sección de contacto con los dos iconos (WhatsApp y email) | |
| 49 | Ver el icono de WhatsApp | Aparece en verde (`#25d366`) junto al número `681 998 181` | |
| 50 | Ver el icono de email | Aparece en gris junto a `sofiam.reyes.roson@gmail.com` | |
| 51 | Clic en el enlace de WhatsApp | Abre `wa.me/34681998181` en nueva pestaña | |
| 52 | Clic en el enlace de email | Abre el cliente de correo con la dirección de Sofía | |
| 53 | Ver en móvil | La tarjeta de contacto ocupa el ancho completo y no queda cortada | |

### 1.12 Flujo de autenticación

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 54 | Abrir `/login` sin sesión | Se muestra el formulario de login | |
| 55 | Abrir `/login` con sesión activa | Redirige automáticamente a `/dashboard` | |
| 56 | Login con credenciales incorrectas | Se muestra mensaje de error sin revelar detalles | |
| 57 | Login con credenciales correctas | Redirige a `/dashboard` | |
| 58 | Acceder a `/dashboard` sin sesión | Redirige a `/login` | |
| 59 | Cerrar sesión | Redirige a `/` y el candado desaparece del menú | |
| 60 | Tras cerrar sesión, pulsar atrás en el navegador | No se accede al dashboard (redirige a `/login`) | |

### 1.13 Admin — Gestión de terapias (`/dashboard/therapies`)

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 61 | Ver lista de terapias | Se muestran título, duración, precio y badge de modalidad | |
| 62 | Crear terapia con campos obligatorios vacíos | Botón deshabilitado; errores visibles | |
| 63 | Crear terapia completa con modalidad | Se guarda y aparece en la lista y en `/therapies` | |
| 64 | Editar una terapia | Los cambios se reflejan en la web pública | |
| 65 | Desactivar una terapia | Desaparece de `/therapies` y de la home | |
| 66 | Clonar una terapia | Se crea una copia con "(Copia)" en el título | |
| 67 | Borrar una terapia | Desaparece de la lista y de la web pública | |

### 1.14 Admin — Gestión de talleres (`/dashboard/workshops`)

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 68 | Ver lista de talleres | Título, precio (en verde), fecha, hora, modalidad, lugar visible | |
| 69 | Crear taller presencial sin lugar | Aparece el alert de confirmación | |
| 70 | En el alert, elegir "Volver y rellenar" | El taller no se guarda; puede rellenar el campo | |
| 71 | En el alert, elegir "Sí, continuar" | El taller se guarda sin lugar | |
| 72 | Crear taller con hora fin anterior a hora inicio | Se muestra error de validación; botón deshabilitado | |
| 73 | Crear taller online | El campo "Lugar" aparece deshabilitado en el formulario | |
| 74 | Crear taller presencial con lugar | El lugar aparece en las cards y en el detalle | |
| 75 | Editar modalidad de presencial a online | El campo lugar se deshabilita; al guardar desaparece de las cards | |

### 1.15 Admin — Gestión de artículos (`/dashboard/articles`)

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 76 | Crear artículo en borrador | No aparece en `/articles` | |
| 77 | Publicar el artículo | Aparece en `/articles` en la sección "Más recientes" | |
| 78 | Insertar imagen en el editor TipTap | La imagen aparece donde estaba el cursor, no al final | |
| 79 | Despublicar un artículo | Desaparece de `/articles` | |
| 80 | Editar categorías (`/dashboard/categories`) | Los cambios se reflejan en los artículos | |

### 1.16 Admin — Responsiveness del dashboard

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 81 | Ver el dashboard en tablet (768px–1023px) | Sidebar colapsado a 60px mostrando solo iconos | |
| 82 | Ver el dashboard en móvil (< 640px) | Sidebar convertido en barra horizontal superior con scroll | |
| 83 | Gestionar tarjetas admin en móvil | Las cards se muestran en columna; los botones en fila con wrap | |

---

## 2. Tests de base de datos (Supabase)

### 2.1 Verificación de esquema

Ejecutar en el **SQL Editor** de Supabase:

```sql
-- Verificar columnas de therapies
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'therapies'
ORDER BY ordinal_position;
-- Debe incluir: modality (text, nullable)

-- Verificar columnas de workshops
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'workshops'
ORDER BY ordinal_position;
-- Debe incluir: modality, start_time, end_time, location (todos text, nullable)

-- Verificar columna views en articles
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'articles' AND column_name = 'views';
-- Debe mostrar: views | integer | 0

-- Verificar función increment_article_views
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_name = 'increment_article_views';
-- Debe devolver una fila
```

### 2.2 Verificación de constraints

```sql
-- El valor de modality en therapies solo acepta los valores permitidos
INSERT INTO therapies (title, modality) VALUES ('Test', 'invalido');
-- Debe fallar con violación de CHECK constraint

-- Lo mismo para workshops
INSERT INTO workshops (title, modality) VALUES ('Test', 'invalido');
-- Debe fallar
```

### 2.3 Verificación del contador de vistas

```sql
-- Estado inicial
SELECT id, title, views FROM articles LIMIT 3;

-- Llamar a la función
SELECT increment_article_views('<uuid-de-un-artículo>');

-- Verificar que incrementó
SELECT id, title, views FROM articles WHERE id = '<uuid-de-un-artículo>';
-- views debe ser views_anterior + 1
```

### 2.4 Verificación de datos huérfanos

```sql
-- Artículos sin categoría válida
SELECT a.id, a.title, a.category_id
FROM articles a
LEFT JOIN article_categories c ON a.category_id = c.id
WHERE a.category_id IS NOT NULL AND c.id IS NULL;
-- Debe devolver 0 filas

-- Artículos publicados sin published_at
SELECT id, title FROM articles
WHERE status = 'published' AND published_at IS NULL;
-- Debe devolver 0 filas
```

---

## 3. Seguridad de Supabase

### 3.1 Row Level Security (RLS)

Verificar en **Supabase Dashboard → Authentication → Policies** que:

| Tabla | RLS activo | Lectura anónima | Escritura anónima | Escritura autenticada |
|-------|-----------|-----------------|-------------------|-----------------------|
| `therapies` | ✓ | Solo `active = true` | ✗ | Solo `is_admin() OR is_psico()` |
| `constellations` | ✓ | Solo `active = true` | ✗ | Solo `is_admin() OR is_psico()` |
| `workshops` | ✓ | Solo `active = true` | ✗ | Solo `is_admin() OR is_psico()` |
| `articles` | ✓ | Solo `status = published` | ✗ | Solo `is_admin() OR is_psico()` |
| `article_categories` | ✓ | ✓ | ✗ | Solo `is_admin() OR is_psico()` |
| `profiles` | ✓ | ✗ | ✗ | Solo el propio perfil |

Pruebas manuales desde el **SQL Editor con rol anon**:

```sql
-- Simular petición anónima
SET LOCAL ROLE anon;

-- No debe devolver terapias inactivas
SELECT * FROM therapies WHERE active = false;
-- Debe devolver 0 filas

-- No debe devolver artículos en borrador
SELECT * FROM articles WHERE status = 'draft';
-- Debe devolver 0 filas

-- No debe poder insertar
INSERT INTO therapies (title) VALUES ('Hack');
-- Debe fallar con error de permisos
```

### 3.2 Claves de API

| Verificación | Cómo comprobar | ✓ |
|---|---|---|
| La `SUPABASE_SERVICE_ROLE_KEY` nunca está en el frontend | Buscar en `/src` con `grep -r "service_role"` → debe dar vacío | |
| El archivo `environment.ts` solo contiene la `anon key` | Revisar manualmente el archivo | |
| Las claves no aparecen en el bundle compilado | Inspeccionar `dist/` con `grep -r "service_role" dist/` | |
| Las variables de entorno de producción están en Vercel/Netlify, no en el repo | Verificar en el dashboard del proveedor | |

### 3.3 Función `increment_article_views`

```sql
-- Verificar que usa SECURITY DEFINER
SELECT routine_name, security_type
FROM information_schema.routines
WHERE routine_name = 'increment_article_views';
-- security_type debe ser 'DEFINER'

-- Un usuario anónimo solo puede incrementar vistas, no modificar otros campos
SET LOCAL ROLE anon;
UPDATE articles SET title = 'Hackeado' WHERE id = '<uuid>';
-- Debe fallar
```

### 3.4 Autenticación

| Verificación | ✓ |
|---|---|
| No es posible registrarse sin invitación (sign-up deshabilitado en Supabase Auth settings) | |
| El token JWT expira correctamente (comprobar en Supabase Auth → Settings → JWT expiry) | |
| Las contraseñas no se almacenan en texto plano (gestionado por Supabase Auth) | |
| El login con credenciales erróneas no revela si el email existe o no | |

### 3.5 Permisos de funciones

| Verificación | ✓ |
|---|---|
| `handle_new_user` no es invocable vía REST por anon ni authenticated | |
| `is_admin` no es invocable vía REST por anon (sí por authenticated para RLS) | |
| `is_psico` no es invocable vía REST por anon (sí por authenticated para RLS) | |
| Los buckets de storage no permiten listar todos los archivos (solo acceso por URL directa) | |

```sql
-- Verificar que handle_new_user no tiene EXECUTE para PUBLIC
SELECT grantee, privilege_type
FROM information_schema.routine_privileges
WHERE routine_name = 'handle_new_user';
-- No debe aparecer 'PUBLIC', 'anon' ni 'authenticated'
```

### 3.6 Security Headers (tras el deploy)

Verificar en [securityheaders.com](https://securityheaders.com) con la URL de producción:

| Header | Valor esperado | ✓ |
|---|---|---|
| `X-Frame-Options` | `DENY` | |
| `X-Content-Type-Options` | `nosniff` | |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | |
| `Permissions-Policy` | restricciones de cámara, micrófono, geolocalización | |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | |
| `Content-Security-Policy` | presente y sin `unsafe-eval` | |

---

## 4. Seguridad de GitHub

### 4.1 Secretos en el repositorio

```bash
# Buscar posibles secretos expuestos en el historial de git
git log --all --full-history -- "**/.env*"
git log --all --full-history -- "**/environment*.ts"

# Buscar claves hardcodeadas en el código fuente actual
grep -r "eyJ" src/          # tokens JWT
grep -r "service_role" src/ # service role key
grep -r "password" src/ --include="*.ts" # contraseñas
```

| Verificación | ✓ |
|---|---|
| `.env` y `.env.*` están en `.gitignore` | |
| `environment.prod.ts` no contiene claves de producción en el repo | |
| No hay commits con claves en el historial | |

### 4.2 Dependencias

```bash
npm audit
npm audit --audit-level=high
```

| Verificación | ✓ |
|---|---|
| `npm audit` no muestra vulnerabilidades de severidad alta o crítica | |
| Las versiones de Angular, PrimeNG y Supabase-js están actualizadas | |

### 4.3 Configuración del repositorio

| Verificación | ✓ |
|---|---|
| El repositorio es privado, o si es público, no contiene datos reales de pacientes | |
| No hay issues o PRs con información sensible | |
| El archivo `.gitignore` cubre: `node_modules/`, `dist/`, `.env*`, `*.local` | |

---

## 5. SEO y rendimiento

### 5.1 Meta tags por página

| Página | Title dinámico | Meta description | OG tags | ✓ |
|---|---|---|---|---|
| `/` | "Sofía Reyes Psicóloga" | ✓ | ✓ | |
| `/about` | "Sobre mí — Sofía Reyes" | ✓ | ✓ | |
| `/therapies` | "Terapias — Sofía Reyes" | ✓ | ✓ | |
| `/therapies/:id` | Título dinámico de la terapia | ✓ | ✓ | |
| `/workshops` | "Talleres — Sofía Reyes" | ✓ | ✓ | |
| `/contact` | "Contacto — Sofía Reyes" | ✓ | ✓ | |
| `/articles/:slug` | Título del artículo | Extracto del artículo | og:image = portada | |

### 5.2 Archivos estáticos

| Verificación | ✓ |
|---|---|
| `/sitemap.xml` accesible y válido | |
| `/robots.txt` accesible; `/dashboard/` y `/login` en `Disallow` | |
| JSON-LD de LocalBusiness presente en la home (inspeccionar con DevTools → Elements) | |

### 5.3 Antes del deploy (pendiente)

| Verificación | ✓ |
|---|---|
| Dominio real sustituido en `SeoService` y `sitemap.xml` (actualmente `sofiareyespsicologa.com`) | |
| `og-image.jpg` creado y subido a `/branding/` | |
| Google Search Console registrado y sitemap enviado | |

---

## 6. Responsiveness

### 6.1 Breakpoints principales

| Breakpoint | Elemento | Comportamiento esperado | ✓ |
|---|---|---|---|
| ≥ 768px | Logo | `logo-horizontal.svg` | |
| < 768px | Logo | `logo-icon.svg` | |
| < 480px | Topbar | Solo iconos, sin texto de email/teléfono | |
| 768px–1023px | Admin sidebar | 60px de ancho, solo iconos | |
| < 640px | Admin sidebar | Barra horizontal superior con scroll | |
| < 640px | Admin cards | Columna en lugar de fila | |

### 6.2 Dispositivos a probar

| Dispositivo | Navegador | ✓ |
|---|---|---|
| iPhone (Safari) | Safari iOS | |
| Android (Chrome) | Chrome Android | |
| iPad (768px) | Safari / Chrome | |
| Escritorio (1280px+) | Chrome / Firefox | |
| Escritorio | Safari macOS | |

---

## Checklist final antes del deploy

- [ ] Todas las SQL migrations aplicadas y verificadas
- [ ] RLS activo y probado en todas las tablas (incluye `is_admin()`/`is_psico()` en políticas admin)
- [ ] Security Advisor de Supabase sin avisos corregibles pendientes
- [ ] Claves de API verificadas (solo `anon key` en frontend)
- [ ] `npm audit` sin vulnerabilidades altas
- [ ] Variables de entorno configuradas en Vercel (no en el repo)
- [ ] CORS de Supabase configurado con el dominio de producción
- [ ] Dominio real sustituido en `SeoService` y `sitemap.xml`
- [ ] LinkedIn actualizado en el footer
- [ ] Imágenes reales de Sofía subidas (home, contacto, sobre mí)
- [ ] `og-image.jpg` creado
- [ ] Meta tags SEO verificados por página
- [ ] Tests de usuario completados sin errores
- [ ] Revisión en móvil (iOS + Android)
- [ ] Revisión en Safari (compatibilidad)
- [ ] Security headers verificados en securityheaders.com
- [ ] Google Search Console registrado y sitemap enviado
