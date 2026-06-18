# Plan de pruebas — Sofía Reyes Psicóloga

## Índice
1. [Tests de usuario (manual)](#1-tests-de-usuario-manual)
2. [Tests de base de datos (Supabase)](#2-tests-de-base-de-datos-supabase)
3. [Seguridad de Supabase](#3-seguridad-de-supabase)
4. [Seguridad de GitHub](#4-seguridad-de-github)

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

### 1.2 Página `/therapies`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 9 | Abrir `/therapies` | Se muestran las terapias activas con título, descripción, duración, precio y modalidad | |
| 10 | Hacer clic en una tarjeta de terapia | Navega al detalle correcto `/therapies/:id` | |
| 11 | Verificar que terapias inactivas no aparecen | Solo se ven las marcadas como activas en el admin | |
| 12 | Con pocas terapias (≤ 3) | El footer es visible sin hacer scroll | |

### 1.3 Página `/therapies/:id`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 13 | Ver detalle de una terapia | Se muestra título, descripción completa, duración, precio y modalidad | |
| 14 | Pulsar "Pedir cita" | Navega a `/contact` | |
| 15 | Pulsar "← Volver" | Regresa a `/therapies` | |
| 16 | Acceder a una URL inválida `/therapies/no-existe` | Se muestra página de error o redirección | |

### 1.4 Página `/workshops`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 17 | Abrir `/workshops` | Se muestran talleres activos con fecha, hora, modalidad, lugar y precio | |
| 18 | Verificar taller online | No aparece campo lugar | |
| 19 | Verificar taller presencial con lugar | Aparece el icono de ubicación y el nombre del lugar | |
| 20 | Verificar taller presencial sin lugar | No aparece ningún lugar (no se muestra vacío) | |
| 21 | Hacer clic en una tarjeta | Navega al detalle correcto `/workshops/:id` | |

### 1.5 Página `/workshops/:id`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 22 | Ver detalle de un taller | Se muestran fecha, hora inicio–fin, modalidad, lugar (si presencial) y precio | |
| 23 | Pulsar "Contactar" | Navega a `/contact` | |
| 24 | Taller online | No aparece campo lugar en el detalle | |

### 1.6 Página `/articles`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 25 | Abrir `/articles` | Se muestran "Más recientes" (máx. 3) y "Más leídos" (resto, sin duplicados) | |
| 26 | Verificar sección "Más leídos" | Solo aparece si hay más de 3 artículos y ninguno está duplicado | |
| 27 | Filtrar por categoría (clic en chip de categoría) | Solo aparecen artículos de esa categoría; desaparecen las secciones | |
| 28 | Quitar el filtro | Vuelve la vista normal con las dos secciones | |
| 29 | Con pocos artículos (≤ 3) | El footer es visible sin hacer scroll | |

### 1.7 Página `/articles/:slug`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 30 | Abrir un artículo | El contador de vistas se incrementa en 1 | |
| 31 | Abrir el mismo artículo desde otra sesión | El contador vuelve a incrementarse | |
| 32 | Verificar artículos relacionados | Aparecen artículos de la misma categoría distintos al actual | |
| 33 | Pulsar "← Todos los artículos" | Regresa a `/articles` | |

### 1.8 Página `/contact`

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 34 | Abrir `/contact` | Se muestra el formulario y la imagen alineada | |
| 35 | Enviar el formulario vacío | Se muestran mensajes de validación | |
| 36 | Rellenar todos los campos y enviar | (Pendiente: confirmar integración de email) | |

### 1.9 Flujo de autenticación

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 37 | Abrir `/login` sin sesión | Se muestra el formulario de login | |
| 38 | Abrir `/login` con sesión activa | Redirige automáticamente a `/dashboard` | |
| 39 | Login con credenciales incorrectas | Se muestra mensaje de error sin revelar detalles | |
| 40 | Login con credenciales correctas | Redirige a `/dashboard` | |
| 41 | Acceder a `/dashboard` sin sesión | Redirige a `/login` | |
| 42 | Cerrar sesión | Redirige a `/` y el candado desaparece del menú | |
| 43 | Tras cerrar sesión, pulsar atrás en el navegador | No se accede al dashboard (redirige a `/login`) | |

### 1.10 Admin — Gestión de terapias (`/dashboard/therapies`)

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 44 | Ver lista de terapias | Se muestran título, duración, precio y badge de modalidad | |
| 45 | Crear terapia con campos obligatorios vacíos | Botón deshabilitado; errores visibles | |
| 46 | Crear terapia completa con modalidad | Se guarda y aparece en la lista y en `/therapies` | |
| 47 | Editar una terapia | Los cambios se reflejan en la web pública | |
| 48 | Desactivar una terapia | Desaparece de `/therapies` y de la home | |
| 49 | Clonar una terapia | Se crea una copia con "(Copia)" en el título | |
| 50 | Borrar una terapia | Desaparece de la lista y de la web pública | |

### 1.11 Admin — Gestión de talleres (`/dashboard/workshops`)

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 51 | Ver lista de talleres | Título, precio (en verde), fecha, hora, modalidad, lugar visible | |
| 52 | Crear taller presencial sin lugar | Aparece el alert de confirmación | |
| 53 | En el alert, elegir "Volver y rellenar" | El taller no se guarda; puede rellenar el campo | |
| 54 | En el alert, elegir "Sí, continuar" | El taller se guarda sin lugar | |
| 55 | Crear taller con hora fin anterior a hora inicio | Se muestra error de validación; botón deshabilitado | |
| 56 | Crear taller online | El campo "Lugar" aparece deshabilitado en el formulario | |
| 57 | Crear taller presencial con lugar | El lugar aparece en las cards y en el detalle | |
| 58 | Editar modalidad de presencial a online | El campo lugar se deshabilita; al guardar desaparece de las cards | |

### 1.12 Admin — Gestión de artículos (`/dashboard/articles`)

| # | Acción | Resultado esperado | ✓ |
|---|--------|--------------------|---|
| 59 | Crear artículo en borrador | No aparece en `/articles` | |
| 60 | Publicar el artículo | Aparece en `/articles` en la sección "Más recientes" | |
| 61 | Insertar imagen en el editor TipTap | La imagen aparece donde estaba el cursor, no al final | |
| 62 | Despublicar un artículo | Desaparece de `/articles` | |
| 63 | Editar categorías (`/dashboard/categories`) | Los cambios se reflejan en los artículos | |

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
| `therapies` | ✓ | Solo `active = true` | ✗ | ✓ |
| `workshops` | ✓ | Solo `active = true` | ✗ | ✓ |
| `articles` | ✓ | Solo `status = published` | ✗ | ✓ |
| `article_categories` | ✓ | ✓ | ✗ | ✓ |
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
-- Verificar que usa SECURITY DEFINER (se ejecuta con permisos del creador, no del llamante)
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
| El archivo `supabase-migration.txt` no contiene datos sensibles | |

### 4.2 Dependencias

```bash
# Auditoría de vulnerabilidades en dependencias
npm audit

# Verificar dependencias desactualizadas con vulnerabilidades conocidas
npm audit --audit-level=high
```

| Verificación | ✓ |
|---|---|
| `npm audit` no muestra vulnerabilidades de severidad alta o crítica | |
| Las versiones de Angular, PrimeNG y Supabase-js están actualizadas | |

### 4.3 Configuración del repositorio (si es público)

| Verificación | ✓ |
|---|---|
| El repositorio es privado, o si es público, no contiene datos reales de pacientes | |
| GitHub Actions (si se usan) no logean variables de entorno | |
| No hay issues o PRs con información sensible | |
| Está activado **Dependabot** para alertas de seguridad automáticas | |

### 4.4 Buenas prácticas generales

| Verificación | ✓ |
|---|---|
| La rama `main` tiene protección contra push directo (branch protection rules) | |
| Se requiere PR con revisión para mergear a `main` | |
| El archivo `.gitignore` cubre: `node_modules/`, `dist/`, `.env*`, `*.local` | |

---

## Checklist final antes del deploy

- [ ] Todas las SQL migrations aplicadas
- [ ] RLS activo y probado en todas las tablas
- [ ] Claves de API verificadas (solo `anon key` en frontend)
- [ ] `npm audit` sin vulnerabilidades altas
- [ ] Variables de entorno configuradas en Vercel/Netlify (no en el repo)
- [ ] Formulario de contacto funcional con email real
- [ ] Email real sustituido en la página de contacto
- [ ] Meta tags SEO configurados por página
- [ ] Tests de usuario completados sin errores
- [ ] Revisión en móvil (iOS + Android)
- [ ] Revisión en Safari (compatibilidad)
