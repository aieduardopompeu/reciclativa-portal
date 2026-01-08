"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();

  const next = useMemo(() => {
    return searchParams.get("next") || "/admin/profissionais";
  }, [searchParams]);

  const error = useMemo(() => {
    return searchParams.get("error") || "";
  }, [searchParams]);

  const errorMsg =
    error === "badpass"
      ? "Senha incorreta."
      : error === "env"
        ? "Configuração ausente no servidor (ADMIN_PASSWORD/ADMIN_TOKEN)."
        : error
          ? "Não foi possível autenticar. Tente novamente."
          : "";

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center text-3xl font-semibold">Acesso restrito</h1>
      <p className="mt-2 text-center text-sm text-neutral-600">
        Entre com a senha de administração para acessar o painel.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        {errorMsg ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMsg}
          </div>
        ) : null}

        <form method="POST" action="/api/admin/auth/login" className="space-y-4">
          <input type="hidden" name="next" value={next} />

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 outline-none focus:border-neutral-400"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-green-600 font-semibold text-white hover:bg-green-700"
          >
            Entrar
          </button>

          <p className="text-xs text-neutral-500">
            Dica: salve o link <span className="font-mono">/admin/login</span> nos favoritos.
          </p>
        </form>
      </div>
    </main>
  );
}
