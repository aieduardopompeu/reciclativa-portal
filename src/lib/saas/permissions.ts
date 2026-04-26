import type {
  SaaSAccessLevel,
  SaaSAction,
  SaaSModule,
  SaaSModuleAccessMap,
  SaaSRole,
  SaaSSessionUser,
} from "@/types/saas";

type ModuleAccessMatrix = Partial<Record<SaaSModule, SaaSAccessLevel>>;

const allModules: SaaSModule[] = [
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
  "operation",
  "finance",
  "settings",
  "audit_logs",
];

function fullAccess(): ModuleAccessMatrix {
  return Object.fromEntries(allModules.map((module) => [module, "admin"])) as ModuleAccessMatrix;
}

function readAccess(modules: SaaSModule[]): ModuleAccessMatrix {
  return Object.fromEntries(modules.map((module) => [module, "read"])) as ModuleAccessMatrix;
}

export const DEFAULT_CUSTOM_PERMISSIONS: SaaSModuleAccessMap = readAccess([
  "dashboard",
  "company",
  "units",
  "customers",
  "suppliers",
  "carriers",
  "material_categories",
  "materials",
  "inventory_locations",
  "operation",
  "finance",
]);

const roleAccess: Record<SaaSRole, ModuleAccessMatrix> = {
  super_admin: fullAccess(),
  org_admin: fullAccess(),
  org_admin_full: fullAccess(),

  manager_operational: {
    dashboard: "read",
    company: "read",
    units: "write",
    customers: "write",
    suppliers: "write",
    carriers: "write",
    material_categories: "write",
    materials: "write",
    inventory_locations: "write",
    operation: "write",
  },

  manager_financial: {
    dashboard: "read",
    company: "read",
    customers: "read",
    suppliers: "read",
    finance: "write",
  },

  manager_commercial: {
    dashboard: "read",
    company: "read",
    customers: "write",
    suppliers: "write",
  },

  operator: {
    dashboard: "read",
    customers: "write",
    suppliers: "write",
    carriers: "write",
    material_categories: "read",
    materials: "write",
    inventory_locations: "write",
    operation: "write",
  },

  viewer: readAccess([
    "dashboard",
    "company",
    "units",
    "customers",
    "suppliers",
    "carriers",
    "material_categories",
    "materials",
    "inventory_locations",
    "operation",
    "finance",
  ]),

  custom: DEFAULT_CUSTOM_PERMISSIONS,
};

const actionMinimumLevel: Record<SaaSAction, SaaSAccessLevel> = {
  view: "read",
  create: "write",
  update: "write",
  archive: "admin",
};

const levelWeight: Record<SaaSAccessLevel, number> = {
  none: 0,
  read: 1,
  write: 2,
  admin: 3,
};

export function getRoleModuleAccessLevel(role: SaaSRole, module: SaaSModule): SaaSAccessLevel {
  return roleAccess[role]?.[module] ?? "none";
}

export function getUserModuleAccessLevel(user: SaaSSessionUser, module: SaaSModule): SaaSAccessLevel {
  if (user.role === "custom") {
    return user.permissions?.[module] ?? getRoleModuleAccessLevel(user.role, module);
  }

  return getRoleModuleAccessLevel(user.role, module);
}

export function canAccessModule(role: SaaSRole, module: SaaSModule): boolean {
  return getRoleModuleAccessLevel(role, module) !== "none";
}

export function canAccessModuleForUser(user: SaaSSessionUser, module: SaaSModule): boolean {
  return getUserModuleAccessLevel(user, module) !== "none";
}

export function canPerformAction(
  role: SaaSRole,
  module: SaaSModule,
  action: SaaSAction,
): boolean {
  const currentLevel = getRoleModuleAccessLevel(role, module);
  const requiredLevel = actionMinimumLevel[action];

  return levelWeight[currentLevel] >= levelWeight[requiredLevel];
}

export function canPerformActionForUser(
  user: SaaSSessionUser,
  module: SaaSModule,
  action: SaaSAction,
): boolean {
  const currentLevel = getUserModuleAccessLevel(user, module);
  const requiredLevel = actionMinimumLevel[action];

  return levelWeight[currentLevel] >= levelWeight[requiredLevel];
}

export function assertCanPerformActionForUser(
  user: SaaSSessionUser,
  module: SaaSModule,
  action: SaaSAction,
) {
  if (!canPerformActionForUser(user, module, action)) {
    throw new Error("Você não tem permissão para executar esta ação.");
  }
}

export function isSaaSAdminRole(role: SaaSRole): boolean {
  return role === "super_admin" || role === "org_admin" || role === "org_admin_full";
}

export function formatSaaSRole(role: SaaSRole): string {
  switch (role) {
    case "super_admin":
      return "Admin Master";
    case "org_admin":
      return "Administrador da organização";
    case "org_admin_full":
      return "Administrador full";
    case "manager_operational":
      return "Operação";
    case "manager_financial":
      return "Financeiro";
    case "manager_commercial":
      return "Comercial";
    case "operator":
      return "Operador";
    case "viewer":
      return "Somente leitura";
    case "custom":
      return "Personalizado";
    default:
      return role;
  }
}
