-- ============================================================
-- MIGRATION: Corregir permisos de funciones SECURITY DEFINER
-- ============================================================
-- El REVOKE anterior no funcionó porque PostgreSQL otorga
-- EXECUTE a PUBLIC al crear funciones. Hay que revocar PUBLIC
-- primero y luego re-conceder solo a quien corresponde.
-- ============================================================


-- ------------------------------------------------------------
-- handle_new_user: función de trigger interno.
-- Nadie debe poder llamarla vía REST. Sin re-grant.
-- ------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;


-- ------------------------------------------------------------
-- is_admin / is_psico: funciones auxiliares de RLS.
-- Anónimos no deben llamarlas; el rol authenticated las necesita
-- para que las políticas RLS funcionen correctamente.
-- ------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.is_admin()  FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_psico()  FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.is_admin()   TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_psico()   TO authenticated;


-- ------------------------------------------------------------
-- increment_article_views: INTENCIONAL que anon pueda llamarla.
-- El aviso del advisor es aceptable para esta función.
-- No hacemos nada.
-- ------------------------------------------------------------
