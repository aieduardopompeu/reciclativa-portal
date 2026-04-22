import type { SaaSAction, SaaSModule, SaaSRole } from "@/types/saas";

const moduleAccess: Record<SaaSRole, SaaSModule[]> = {
  super_admin: [
    "dashboard",
    "company",
    "units",
    "users",
    "customers",
    "suppliers",
    "carriers",
    "material_categories",
    "materials",
    "inventory_locations",
    "audit_logs",
  ],
  org_admin: [
    "dashboard",
    "company",
    "units",
    "users",
    "customers",
    "suppliers",
    "carriers",
    "material_categories",
    "materials",
    "inventory_locations",
    "audit_logs",
  ],
  manager_operational: [
    "dashboard",
    "customers",
    "suppliers",
    "carriers",
    "material_categories",
    "materials",
    "inventory_locations",
  ],
  manager_financial: ["dashboard", "suppliers"],
  manager_commercial: ["dashboard", "customers", "suppliers"],
  operator: [
    "dashboard",
    "customers",
    "suppliers",
    "carriers",
    "materials",
    "inventory_locations",
  ],
  viewer: [
    "dashboard",
    "customers",
    "suppliers",
    "carriers",
    "material_categories",
    "materials",
    "inventory_locations",
  ],
};

const actionAccess: Record<SaaSRole, SaaSAction[]> = {
  super_admin: ["view", "create", "update", "archive"],
  org_admin: ["view", "create", "update", "archive"],
  manager_operational: ["view", "create", "update"],
  manager_financial: ["view", "create", "update"],
  manager_commercial: ["view", "create", "update"],
  operator: ["view", "create", "update"],
  viewer: ["view"],
};

export function canAccessModule(role: SaaSRole, module: SaaSModule): boolean {
  return moduleAccess[role]?.includes(module) ?? false;
}

export function canPerformAction(
  role: SaaSRole,
  module: SaaSModule,
  action: SaaSAction,
): boolean {
  if (!canAccessModule(role, module)) return false;
  return actionAccess[role]?.includes(action) ?? false;
}
