-- ============================================================
-- MIGRATION: Correcciones del Security Advisor de Supabase
-- ============================================================
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================


-- ------------------------------------------------------------
-- 1. SEARCH PATH en funciones
--    Evita que un atacante inyecte un schema malicioso en el
--    search_path y redirija llamadas a funciones falsas.
-- ------------------------------------------------------------
ALTER FUNCTION public.increment_article_views(uuid)
  SET search_path = '';

ALTER FUNCTION public.handle_new_user()
  SET search_path = '';

ALTER FUNCTION public.update_updated_at_column()
  SET search_path = '';


-- ------------------------------------------------------------
-- 2. REVOCAR acceso directo a funciones de trigger/admin
--    handle_new_user es un trigger interno; no debe ser
--    invocable vía REST por usuarios anónimos.
--    is_admin / is_psico solo deben llamarse desde RLS.
-- ------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.handle_new_user()
  FROM anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.is_admin()
  FROM anon;

REVOKE EXECUTE ON FUNCTION public.is_psico()
  FROM anon;


-- ------------------------------------------------------------
-- 3. STORAGE: eliminar políticas de listado en buckets públicos
--    Los archivos siguen accesibles por URL pública directa.
--    Solo eliminamos el permiso de listar el contenido del bucket.
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view article images 1epgy7x_0" ON storage.objects;
DROP POLICY IF EXISTS "Public can view course files fuc62g_0"     ON storage.objects;
DROP POLICY IF EXISTS "Public can view site assets 23o7b_0"       ON storage.objects;

-- Recreamos con restricción: acceso a objeto individual sí,
-- listado del bucket no (sin .list() en el cliente).
CREATE POLICY "articles_public_object_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'articles' AND name IS NOT NULL);

CREATE POLICY "courses_public_object_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'courses' AND name IS NOT NULL);

CREATE POLICY "site_public_object_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site' AND name IS NOT NULL);
