import { requireAdminMasterSession } from "../../../lib/admin-master-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
  next?: string;
  updated?: string;
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
    case "current_invalid":
      return "A senha atual informada não confere.";
    case "new_short":
      return "A nova senha deve ter pelo menos 10 caracteres.";
    case "new_equal_current":
      return "A nova senha precisa ser diferente da senha atual.";
    case "confirm_mismatch":
      return "A confirmação da nova senha não confere.";
    default:
      return "";
  }
}

export default async function AdminChangePasswordPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const session = await requireAdminMasterSession("/admin/change-password");
  const sp = await resolveSearchParams(searchParams);
  const next = sp.next || "/admin";
  const errorMsg = errorMessage(sp.error);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {session.mustChangePassword ? (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Por segurança, troque agora a senha provisória por uma senha pessoal.
        </div>
      ) : null}

      {sp.updated === "ok" ? (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Senha alterada com sucesso.
        </div>
      ) : null}

      {errorMsg ? (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {errorMsg}
        </div>
      ) : null}

      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Segurança da conta
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Alterar senha do admin master
        </h1>
        <p className="mt-3 text-slate-600">
          Use uma senha forte e exclusiva para este acesso administrativo.
        </p>

        <form className="mt-6 space-y-4" method="POST" action="/api/admin/auth/change-password">
          <input type="hidden" name="next" value={next} />

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
            <span className="text-sm font-medium text-slate-900">Nova senha</span>
            <input
              name="new_password"
              type="password"
              className="mt-2 w-full rounded-lg border px-3 py-2"
              required
              minLength={10}
              autoComplete="new-password"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-900">Confirmar nova senha</span>
            <input
              name="confirm_password"
              type="password"
              className="mt-2 w-full rounded-lg border px-3 py-2"
              required
              minLength={10}
              autoComplete="new-password"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
            >
              Salvar nova senha
            </button>

            <a
              href={next}
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
