-- ============================================================
-- MIGRATION: bonus fields en therapies + tabla constellations
-- ============================================================

-- ------------------------------------------------------------
-- 1. CAMPOS DE BONO EN THERAPIES
-- ------------------------------------------------------------
ALTER TABLE therapies
  ADD COLUMN IF NOT EXISTS bonus_enabled  boolean   NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS bonus_sessions integer,
  ADD COLUMN IF NOT EXISTS bonus_discount numeric(10,2);

-- Restricción: si bonus_enabled, debe haber bonus_sessions
ALTER TABLE therapies
  ADD CONSTRAINT IF NOT EXISTS chk_bonus_sessions
    CHECK (NOT bonus_enabled OR bonus_sessions IS NOT NULL);

-- ------------------------------------------------------------
-- 2. MIGRAR modality → modalities (text[]) EN THERAPIES
--    Primero añadimos la columna nueva, copiamos los datos
--    existentes y solo entonces borramos la columna antigua.
-- ------------------------------------------------------------
ALTER TABLE therapies
  ADD COLUMN IF NOT EXISTS modalities text[] NOT NULL DEFAULT '{}';

-- Copiar el valor antiguo al array nuevo (si la fila tenía modality)
UPDATE therapies
  SET modalities = ARRAY[modality]
  WHERE modality IS NOT NULL
    AND modalities = '{}';

-- Ahora sí podemos borrar la columna sin perder datos
ALTER TABLE therapies
  DROP COLUMN IF EXISTS modality;

-- ------------------------------------------------------------
-- 3. TABLA CONSTELLATIONS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS constellations (
  id               uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text          NOT NULL,
  description      text          NOT NULL,
  long_description text,
  duration         integer       NOT NULL DEFAULT 90,
  price            numeric(10,2) NOT NULL DEFAULT 0,
  modalities       text[]        NOT NULL DEFAULT '{}',
  active           boolean       NOT NULL DEFAULT true,
  created_at       timestamptz   NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- 4. ROW LEVEL SECURITY — CONSTELLATIONS
-- ------------------------------------------------------------
ALTER TABLE constellations ENABLE ROW LEVEL SECURITY;

-- Lectura pública: solo registros activos
CREATE POLICY "constellations_public_read"
  ON constellations
  FOR SELECT
  USING (active = true);

-- Admin autenticado: acceso total
CREATE POLICY "constellations_admin_all"
  ON constellations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------
-- 5. ÍNDICES
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_constellations_active
  ON constellations (active, created_at);

CREATE INDEX IF NOT EXISTS idx_therapies_modalities
  ON therapies USING GIN (modalities);
