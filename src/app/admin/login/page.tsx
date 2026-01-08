export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  searchParams?: Promise<{ next?: string; error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const next = sp.next || "/admin/profissionais";
  const error = sp.error;

  const errorMsg =
    error === "badpass"
      ? "Senha inválida. Tente novamente."
      : error === "env"
      ? "Configuração do admin incompleta (ENV)."
      : "";

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Acesso restrito</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Entre com a senha de administração para acessar o painel.
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

        <label className="block text-sm font-medium">Senha</label>
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
          Entrar
        </button>

        <p className="mt-3 text-xs text-neutral-500">
          Dica: salve o link <code>/admin/login</code> nos favoritos.
        </p>
      </form>
    </main>
  );
}
