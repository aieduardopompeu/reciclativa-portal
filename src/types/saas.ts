export type SaaSRole =
  | "super_admin"
  | "org_admin"
  | "org_admin_full"
  | "manager_operational"
  | "manager_financial"
  | "manager_commercial"
  | "operator"
  | "viewer"
  | "custom";

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
  | "operation"
  | "finance"
  | "settings"
  | "audit_logs";

export type SaaSAction = "view" | "create" | "update" | "archive";

export type SaaSAccessLevel = "none" | "read" | "write" | "admin";

export type SaaSModuleAccessMap = Partial<Record<SaaSModule, SaaSAccessLevel>>;

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
  permissions?: SaaSModuleAccessMap;
  mustChangePassword: boolean;
  passwordChangedAt?: Date | null;
  mfaEnabled: boolean;
  organization: SaaSOrganization;
  unit?: SaaSUnit | null;
};
