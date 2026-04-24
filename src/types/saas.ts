export type SaaSRole =
  | "super_admin"
  | "org_admin"
  | "manager_operational"
  | "manager_financial"
  | "manager_commercial"
  | "operator"
  | "viewer";

export type SaaSModule =
  | "dashboard"
  | "company"
  | "units"
  | "users"
  | "customers"
  | "suppliers"
  | "carriers"
  | "material_categories"
  | "materials"
  | "inventory_locations"
  | "audit_logs";

export type SaaSAction = "view" | "create" | "update" | "archive";

export type SaaSOrganization = {
  id: string;
  legalName: string;
  tradeName?: string | null;
};

export type SaaSUnit = {
  id: string;
  name: string;
};

export type SaaSSessionUser = {
  id: string;
  name: string;
  email: string;
  role: SaaSRole;
  mustChangePassword: boolean;
  passwordChangedAt?: Date | null;
  mfaEnabled: boolean;
  organization: SaaSOrganization;
  unit?: SaaSUnit | null;
};
