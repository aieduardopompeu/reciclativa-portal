import { requireAdminMasterSession } from "../../../../../lib/admin-master-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
  error?: string;
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

function errorMessage(error?: string) {
  switch (error) {
    case "password_invalid":
      return "A senha atual informada não confere.";
    case "mfa_invalid":
      return "O código MFA informado não é válido.";
    default:
      return "";
  }
}

export default async function AdminMfaRecoveryRegeneratePage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  await requireAdminMasterSession("/admin/mfa/recovery/regenerate");
  const sp = await resolveSearchParams(searchParams);
  const errorMsg = errorMessage(sp.error);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {errorMsg ? (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {errorMsg}
        </div>
      ) : null}

      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Recovery codes
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Gerar novos recovery codes
        </h1>
        <p className="mt-3 text-slate-600">
          Esta ação invalida todos os recovery codes antigos. Para continuar, confirme sua senha atual e um código do autenticador.
        </p>

        <form className="mt-6 space-y-4" method="POST" action="/api/admin/auth/mfa/recovery/regenerate">
          <label className="block">
            <span className="text-sm font-medium text-slate-900">Senha atual</span>
            <input
              name="current_password"
              type="password"
              className="mt-2 w-full rounded-lg border px-3 py-2"
              required
              autoComplete="current-password"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-900">Código MFA atual</span>
            <input
              name="mfa_code"
              className="mt-2 w-full rounded-lg border px-3 py-2"
              placeholder="123456"
              required
              autoComplete="one-time-code"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
            >
              Gerar novos códigos
            </button>

            <a
              href="/admin"
              className="rounded-lg border border-black/10 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Voltar
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
