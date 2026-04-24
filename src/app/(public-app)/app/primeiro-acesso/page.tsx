import { redirect } from "next/navigation";
import { getCurrentSaaSApiUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
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

export default async function SaaSFirstAccessPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const user = await getCurrentSaaSApiUser();
  if (!user) {
    redirect("/app/login");
  }

  if (!user.mustChangePassword) {
    redirect(user.mfaEnabled ? "/app/dashboard" : "/app/mfa/setup");
  }

  const sp = await resolveSearchParams(searchParams);
  const errorMsg = errorMessage(sp.error);

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No primeiro acesso, troque a senha provisória por uma senha pessoal.
        </div>

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

        <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Primeiro acesso
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Defina sua senha pessoal
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Conta: {user.email}
          </p>

          <form className="mt-6 space-y-4" method="POST" action="/api/app/auth/change-password">
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

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
            >
              Salvar nova senha
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
