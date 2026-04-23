import type { SaaSModule } from "@/types/saas";

export type SaaSNavGroupKey = "geral" | "cadastros" | "operacao" | "financeiro";

export type SaaSNavItem = {
  href: string;
  label: string;
  module: SaaSModule;
  description: string;
  group: SaaSNavGroupKey;
};

export type SaaSNavGroup = {
  key: SaaSNavGroupKey;
  label: string;
};

export const saasNavGroups: SaaSNavGroup[] = [
  { key: "geral", label: "Geral" },
  { key: "cadastros", label: "Cadastros" },
  { key: "operacao", label: "Operação" },
  { key: "financeiro", label: "Financeiro" },
];

export const saasNavigation: SaaSNavItem[] = [
  {
    href: "/app/dashboard",
    label: "Dashboard",
    module: "dashboard",
    description: "Visão geral da empresa",
    group: "geral",
  },
  {
    href: "/app/configuracoes/empresa",
    label: "Empresa",
    module: "company",
    description: "Dados cadastrais da organização",
    group: "geral",
  },
  {
    href: "/app/cadastros/unidades",
    label: "Unidades",
    module: "units",
    description: "Filiais, pátios e operações",
    group: "geral",
  },
  {
    href: "/app/cadastros/usuarios",
    label: "Usuários",
    module: "users",
    description: "Acessos da organização",
    group: "geral",
  },
  {
    href: "/app/cadastros/clientes",
    label: "Clientes",
    module: "customers",
    description: "Cadastro inicial de clientes",
    group: "cadastros",
  },
  {
    href: "/app/cadastros/fornecedores",
    label: "Fornecedores",
    module: "suppliers",
    description: "Cadastro inicial de fornecedores",
    group: "cadastros",
  },
  {
    href: "/app/cadastros/transportadores",
    label: "Transportadores",
    module: "carriers",
    description: "Cadastro inicial de transportadores",
    group: "cadastros",
  },
  {
    href: "/app/cadastros/categorias-materiais",
    label: "Categorias",
    module: "material_categories",
    description: "Grupos de materiais",
    group: "cadastros",
  },
  {
    href: "/app/cadastros/materiais",
    label: "Materiais",
    module: "materials",
    description: "Cadastro de materiais e resíduos",
    group: "cadastros",
  },
  {
    href: "/app/cadastros/locais-estoque",
    label: "Locais de estoque",
    module: "inventory_locations",
    description: "Pátios, boxes e áreas",
    group: "cadastros",
  },
  {
    href: "/app/operacao/entradas",
    label: "Entradas",
    module: "dashboard",
    description: "Recebimentos de materiais",
    group: "operacao",
  },
  {
    href: "/app/operacao/estoque",
    label: "Estoque",
    module: "dashboard",
    description: "Saldos por material e local",
    group: "operacao",
  },
  {
    href: "/app/operacao/movimentos",
    label: "Movimentos",
    module: "dashboard",
    description: "Histórico operacional",
    group: "operacao",
  },
  {
    href: "/app/operacao/saidas",
    label: "Saídas",
    module: "dashboard",
    description: "Expedições e baixas",
    group: "operacao",
  },
  {
    href: "/app/financeiro/contas-a-pagar",
    label: "Contas a pagar",
    module: "dashboard",
    description: "Obrigações e vencimentos",
    group: "financeiro",
  },
  {
    href: "/app/financeiro/contas-a-receber",
    label: "Contas a receber",
    module: "dashboard",
    description: "Recebimentos e cobranças",
    group: "financeiro",
  },
];
