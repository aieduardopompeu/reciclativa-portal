import { redirect } from "next/navigation";
import { getCurrentSaaSMfaChallenge } from "@/lib/saas/mfa";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SaaSMfaVerifyPage() {
  const challenge = await getCurrentSaaSMfaChallenge();
  if (!challenge || !challenge.mfa_enabled || !challenge.mfa_secret_encrypted) {
    redirect("/app/login?error=mfa_challenge_missing");
  }

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            MFA da conta
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Confirmar segundo fator
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Informe o código de 6 dígitos do aplicativo autenticador ou um recovery code.
          </p>

          <form className="mt-6 space-y-4" method="POST" action="/api/app/auth/mfa/verify">
            <label className="block">
              <span className="text-sm font-medium text-slate-900">Código MFA</span>
              <input
                name="code"
                className="mt-2 w-full rounded-lg border px-3 py-2"
                placeholder="123456 ou recovery code"
                required
                autoComplete="one-time-code"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
            >
              Entrar no sistema
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
