-- ============================================================
-- MIGRATION: Activar RLS en todas las tablas públicas
-- ============================================================
-- Ejecutar en: Supabase Dashboard → SQL Editor
--
-- Lógica de acceso:
--   · Público (anónimo): solo lectura de registros activos/publicados
--   · Autenticado (admin): acceso total (SELECT, INSERT, UPDATE, DELETE)
--   · Tabla profiles: cada usuario solo ve/edita su propio perfil
-- ============================================================


-- ------------------------------------------------------------
-- THERAPIES
-- ------------------------------------------------------------
ALTER TABLE therapies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "therapies_public_read"  ON therapies;
DROP POLICY IF EXISTS "therapies_admin_all"    ON therapies;

CREATE POLICY "therapies_public_read"
  ON therapies FOR SELECT
  USING (active = true);

CREATE POLICY "therapies_admin_all"
  ON therapies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ------------------------------------------------------------
-- CONSTELLATIONS (ya tenía RLS; recreamos para asegurar)
-- ------------------------------------------------------------
ALTER TABLE constellations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "constellations_public_read" ON constellations;
DROP POLICY IF EXISTS "constellations_admin_all"   ON constellations;

CREATE POLICY "constellations_public_read"
  ON constellations FOR SELECT
  USING (active = true);

CREATE POLICY "constellations_admin_all"
  ON constellations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ------------------------------------------------------------
-- WORKSHOPS
-- ------------------------------------------------------------
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "workshops_public_read" ON workshops;
DROP POLICY IF EXISTS "workshops_admin_all"   ON workshops;

CREATE POLICY "workshops_public_read"
  ON workshops FOR SELECT
  USING (active = true);

CREATE POLICY "workshops_admin_all"
  ON workshops FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ------------------------------------------------------------
-- ARTICLES
-- ------------------------------------------------------------
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "articles_public_read" ON articles;
DROP POLICY IF EXISTS "articles_admin_all"   ON articles;

CREATE POLICY "articles_public_read"
  ON articles FOR SELECT
  USING (status = 'published');

CREATE POLICY "articles_admin_all"
  ON articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ------------------------------------------------------------
-- ARTICLE_CATEGORIES
-- ------------------------------------------------------------
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "article_categories_public_read" ON article_categories;
DROP POLICY IF EXISTS "article_categories_admin_all"   ON article_categories;

CREATE POLICY "article_categories_public_read"
  ON article_categories FOR SELECT
  USING (true);

CREATE POLICY "article_categories_admin_all"
  ON article_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ------------------------------------------------------------
-- PROFILES (si existe)
-- ------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_own_read"   ON profiles;
DROP POLICY IF EXISTS "profiles_own_update" ON profiles;

CREATE POLICY "profiles_own_read"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_own_update"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
