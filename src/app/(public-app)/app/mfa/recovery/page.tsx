import { redirect } from "next/navigation";
import { getSaaSRecoveryCodesCookie } from "@/lib/saas/mfa";
import { getCurrentSaaSApiUser } from "@/lib/saas/session";
import RecoveryActions from "./RecoveryActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SaaSMfaRecoveryPage() {
  const user = await getCurrentSaaSApiUser();

  if (!user) {
    redirect("/app/login");
  }

  const codes = await getSaaSRecoveryCodesCookie();

  if (user.mustChangePassword) {
    redirect("/app/primeiro-acesso");
  }

  if (!user.mfaEnabled || !codes.length) {
    redirect("/app/dashboard");
  }

  const txtContent = [
    "Reciclativa Gestao - Recovery Codes",
    "",
    "Guarde estes códigos em local seguro.",
    "Cada código pode ser usado uma única vez caso você perca acesso ao aplicativo autenticador.",
    "",
    ...codes,
    "",
  ].join("\n");

  const txtDataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(txtContent)}`;

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Salve seus recovery codes</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Guarde estes códigos em local seguro. Cada código pode ser usado uma única vez caso você perca acesso ao aplicativo autenticador.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {codes.map((code) => (
              <div
                key={code}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm font-semibold text-slate-900"
              >
                {code}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Esses códigos são exibidos apenas uma vez nesta tela.
          </div>

          <RecoveryActions
            txtDataUrl={txtDataUrl}
            clipboardPayload={txtContent}
          />
        </div>
      </div>
    </main>
  );
}
