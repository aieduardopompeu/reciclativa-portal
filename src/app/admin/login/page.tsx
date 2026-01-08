export const dynamic = "force-dynamic";

type Props = {
  searchParams?: { next?: string };
};

export default function AdminLoginPage({ searchParams }: Props) {
  const next = searchParams?.next || "/admin/profissionais";

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Acesso restrito</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Entre com a senha de administração para acessar o painel.
      </p>

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
