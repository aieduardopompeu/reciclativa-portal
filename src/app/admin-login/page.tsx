export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
  next?: string;
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
    case "badcreds":
      return "E-mail ou senha inválidos.";
    case "inactive":
      return "Este acesso administrativo está inativo.";
    case "mfa_setup_invalid":
      return "Código TOTP inválido. Confira o app autenticador e tente novamente.";
    case "mfa_verify_invalid":
      return "Código MFA inválido. Tente novamente.";
    case "mfa_challenge_missing":
      return "Sua etapa MFA expirou. Faça login novamente.";
    default:
      return "";
  }
}

export default async function AdminLoginStandalonePage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const next = sp.next || "/admin";
  const errorMsg = errorMessage(sp.error);

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Admin master</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Acesso restrito ao backoffice administrativo.
      </p>

      {errorMsg ? (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {errorMsg}
        </div>
      ) : null}

      <form
        className="mt-6 rounded-xl border bg-white p-4 shadow-sm"
        method="POST"
        action="/api/admin/auth/login"
      >
        <input type="hidden" name="next" value={next} />

        <label className="block text-sm font-medium">E-mail</label>
        <input
          name="email"
          type="email"
          className="mt-2 w-full rounded-lg border px-3 py-2"
          placeholder="admin@reciclativa.com"
          required
          autoComplete="username"
        />

        <label className="mt-4 block text-sm font-medium">Senha</label>
        <input
          name="password"
          type="password"
          className="mt-2 w-full rounded-lg border px-3 py-2"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
        >
          Continuar
        </button>

        <p className="mt-3 text-xs text-neutral-500">
          Após a senha, o acesso segue para a etapa obrigatória de MFA.
        </p>
      </form>
    </main>
  );
}