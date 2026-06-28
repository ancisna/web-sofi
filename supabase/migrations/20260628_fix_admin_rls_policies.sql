-- ============================================================
-- MIGRATION: Restringir políticas admin a usuarios con rol admin/psico
-- ============================================================
-- Cambia USING(true) por USING(is_admin() OR is_psico()) en todas
-- las políticas de escritura para usuarios autenticados.
-- Así cuando Phase 2 añada estudiantes, no tendrán acceso de escritura.
-- ============================================================


-- ------------------------------------------------------------
-- THERAPIES
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "therapies_admin_all" ON therapies;

CREATE POLICY "therapies_admin_all"
  ON therapies FOR ALL
  TO authenticated
  USING (is_admin() OR is_psico())
  WITH CHECK (is_admin() OR is_psico());


-- ------------------------------------------------------------
-- CONSTELLATIONS
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "constellations_admin_all" ON constellations;

CREATE POLICY "constellations_admin_all"
  ON constellations FOR ALL
  TO authenticated
  USING (is_admin() OR is_psico())
  WITH CHECK (is_admin() OR is_psico());


-- ------------------------------------------------------------
-- WORKSHOPS
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "workshops_admin_all" ON workshops;

CREATE POLICY "workshops_admin_all"
  ON workshops FOR ALL
  TO authenticated
  USING (is_admin() OR is_psico())
  WITH CHECK (is_admin() OR is_psico());


-- ------------------------------------------------------------
-- ARTICLES
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "articles_admin_all" ON articles;

CREATE POLICY "articles_admin_all"
  ON articles FOR ALL
  TO authenticated
  USING (is_admin() OR is_psico())
  WITH CHECK (is_admin() OR is_psico());


-- ------------------------------------------------------------
-- ARTICLE_CATEGORIES
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "article_categories_admin_all" ON article_categories;

CREATE POLICY "article_categories_admin_all"
  ON article_categories FOR ALL
  TO authenticated
  USING (is_admin() OR is_psico())
  WITH CHECK (is_admin() OR is_psico());
