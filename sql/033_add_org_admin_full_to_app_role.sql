-- 033_add_org_admin_full_to_app_role.sql
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_enum e ON e.enumtypid = t.oid
    WHERE t.typname = 'app_role'
      AND e.enumlabel = 'org_admin_full'
  ) THEN
    ALTER TYPE app_role ADD VALUE 'org_admin_full';
  END IF;
END
$$;
