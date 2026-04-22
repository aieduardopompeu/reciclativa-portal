import type { SaaSModule } from "@/types/saas";

export type SaaSNavItem = {
  href: string;
  label: string;
  module: SaaSModule;
  description: string;
};

export const saasNavigation: SaaSNavItem[] = [
  {
    href: "/app/dashboard",
    label: "Dashboard",
    module: "dashboard",
    description: "Visão geral da empresa",
  },
  {
    href: "/app/configuracoes/empresa",
    label: "Empresa",
    module: "company",
    description: "Dados cadastrais da organização",
  },
  {
    href: "/app/cadastros/unidades",
    label: "Unidades",
    module: "units",
    description: "Filiais, pátios e operações",
  },
  {
    href: "/app/cadastros/usuarios",
    label: "Usuários",
    module: "users",
    description: "Acessos da organização",
  },
  {
    href: "/app/cadastros/clientes",
    label: "Clientes",
    module: "customers",
    description: "Cadastro inicial de clientes",
  },
  {
    href: "/app/cadastros/fornecedores",
    label: "Fornecedores",
    module: "suppliers",
    description: "Cadastro inicial de fornecedores",
  },
  {
    href: "/app/cadastros/transportadores",
    label: "Transportadores",
    module: "carriers",
    description: "Cadastro inicial de transportadores",
  },
  {
    href: "/app/cadastros/categorias-materiais",
    label: "Categorias",
    module: "material_categories",
    description: "Grupos de materiais",
  },
  {
    href: "/app/cadastros/materiais",
    label: "Materiais",
    module: "materials",
    description: "Cadastro de materiais e resíduos",
  },
  {
    href: "/app/cadastros/locais-estoque",
    label: "Locais de estoque",
    module: "inventory_locations",
    description: "Pátios, boxes e áreas",
  },
  {
    href: "/app/operacao/entradas",
    label: "Entradas",
    module: "dashboard",
    description: "Recebimentos de materiais",
  },
  {
    href: "/app/operacao/estoque",
    label: "Estoque",
    module: "dashboard",
    description: "Saldos por material e local",
  },
  {
    href: "/app/operacao/movimentos",
    label: "Movimentos",
    module: "dashboard",
    description: "Histórico operacional",
  },
  {
    href: "/app/operacao/saidas",
    label: "Saídas",
    module: "dashboard",
    description: "Expedições e baixas",
  },
  {
    href: "/app/financeiro/contas-a-pagar",
    label: "Contas a pagar",
    module: "dashboard",
    description: "Obrigações e vencimentos",
  },
  {
    href: "/app/financeiro/contas-a-receber",
    label: "Contas a receber",
    module: "dashboard",
    description: "Recebimentos e cobranças",
  },
];
