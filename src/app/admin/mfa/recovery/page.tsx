import { redirect } from "next/navigation";
import { getAdminMasterRecoveryCodesCookie } from "../../../../lib/admin-master-mfa";
import { requireAdminMasterSession, safeAdminNextPath } from "../../../../lib/admin-master-auth";
import RecoveryActions from "./RecoveryActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
  next?: string;
};

async function resolveSearchParams(
  value?: SearchParamsShape | Promise<SearchParamsShape>
): Promise<SearchParamsShape> {
  if (!value) return {};
  if (typeof (value as Promise<SearchParamsShape>).then === "function") {
    return (await value) ?? {};
  }
  return value;
}

export default async function AdminMfaRecoveryPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  await requireAdminMasterSession("/admin/mfa/recovery");
  const sp = await resolveSearchParams(searchParams);
  const next = safeAdminNextPath(sp.next || "/admin");
  const codes = await getAdminMasterRecoveryCodesCookie();

  if (!codes.length) {
    redirect(next);
  }

  const txtContent = [
    "Reciclativa Admin - Recovery Codes",
    "",
    "Guarde estes códigos em local seguro.",
    "Cada código pode ser usado uma única vez caso você perca acesso ao aplicativo autenticador.",
    "",
    ...codes,
    "",
  ].join("\n");

  const txtDataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(txtContent)}`;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold">Salve seus recovery codes</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Guarde estes códigos em local seguro. Cada código pode ser usado uma única vez caso você perca acesso ao aplicativo autenticador.
      </p>

      <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2">
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
          next={next}
        />
      </div>
    </main>
  );
}
