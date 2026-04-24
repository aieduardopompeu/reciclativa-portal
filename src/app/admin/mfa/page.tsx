import { redirect } from "next/navigation";
import { getCurrentAdminMasterChallenge } from "../../../lib/admin-master-mfa";

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

export default async function AdminMfaVerifyPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const next = sp.next || "/admin";

  const challenge = await getCurrentAdminMasterChallenge();
  if (!challenge || !challenge.mfa_enabled || !challenge.mfa_secret_encrypted) {
    redirect(`/admin/login?error=mfa_challenge_missing&next=${encodeURIComponent(next)}`);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Verificar MFA</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Informe o código de 6 dígitos do aplicativo autenticador ou um recovery code.
      </p>

      <form className="mt-6 rounded-xl border bg-white p-4 shadow-sm" method="POST" action="/api/admin/auth/mfa/verify">
        <input type="hidden" name="next" value={next} />

        <label className="block text-sm font-medium">Código MFA</label>
        <input
          name="code"
          className="mt-2 w-full rounded-lg border px-3 py-2"
          placeholder="123456 ou recovery code"
          required
          autoComplete="one-time-code"
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
        >
          Entrar no admin
        </button>
      </form>
    </main>
  );
}
