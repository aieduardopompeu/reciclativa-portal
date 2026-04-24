import { redirect } from "next/navigation";
import { getCurrentSaaSApiUser } from "@/lib/saas/session";

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
    case "invalid_credentials":
      return "E-mail ou senha inválidos.";
    case "mfa_setup_invalid":
      return "Código do autenticador inválido para ativar o MFA.";
    case "mfa_verify_invalid":
      return "Código MFA ou recovery code inválido.";
    case "mfa_challenge_missing":
      return "Sua etapa de MFA expirou. Faça login novamente.";
    default:
      return "";
  }
}

export default async function SaaSLoginPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const user = await getCurrentSaaSApiUser();
  if (user) {
    if (user.mustChangePassword) {
      redirect("/app/primeiro-acesso");
    }
    if (!user.mfaEnabled) {
      redirect("/app/mfa/setup");
    }
    redirect("/app/dashboard");
  }

  const sp = await resolveSearchParams(searchParams);
  const errorMsg = errorMessage(sp.error);

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Reciclativa Gestão
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Entrar no sistema
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Use o e-mail e a senha provisória enviados no acesso inicial.
          </p>

          {errorMsg ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
              {errorMsg}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" method="POST" action="/api/app/auth/login">
            <label className="block">
              <span className="text-sm font-medium text-slate-900">E-mail</span>
              <input
                name="email"
                type="email"
                className="mt-2 w-full rounded-lg border px-3 py-2"
                required
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-900">Senha</span>
              <input
                name="password"
                type="password"
                className="mt-2 w-full rounded-lg border px-3 py-2"
                required
                autoComplete="current-password"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
