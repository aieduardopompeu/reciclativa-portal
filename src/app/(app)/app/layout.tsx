import type { Metadata } from "next";
import SaaSShell from "@/components/saas/saas-shell";
import { requireSaaSAppReady } from "@/lib/saas/session";

export const metadata: Metadata = {
  title: "Reciclativa Gestão | App",
  description: "Área SaaS da Reciclativa Gestão.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SaaSAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireSaaSAppReady();

  return <SaaSShell user={user}>{children}</SaaSShell>;
}
