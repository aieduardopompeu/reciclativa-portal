import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diretório | Reciclativa",
  description:
    "Atalhos úteis para navegar pelos principais conteúdos da Reciclativa e acessar o Diretório de Profissionais por região.",
  alternates: { canonical: "/diretorio" },
  openGraph: {
    title: "Diretório | Reciclativa",
    description:
      "Acesso rápido a páginas-base, guias práticos e ao Diretório de Profissionais por UF e cidade.",
    url: "/diretorio",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
