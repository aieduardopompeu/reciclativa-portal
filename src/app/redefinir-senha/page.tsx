import Image from "next/image";
import Link from "next/link";
import PasswordInput from "../../components/auth/PasswordInput";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
  token?: string;
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

function safeNextPath(nextRaw?: string) {
  const next = (nextRaw || "").trim();
  if (next.startsWith("/admin")) return next;
  if (next.startsWith("/app")) return next;
  return "/app/dashboard";
}

function errorMessage(error?: string) {
  switch (error) {
    case "missing_token":
      return "Link de recuperação ausente. Solicite um novo link.";
    case "invalid_or_expired":
      return "Este link expirou ou já foi usado. Solicite uma nova recuperação.";
    case "new_short":
      return "A nova senha deve ter pelo menos 10 caracteres.";
    case "confirm_mismatch":
      return "A confirmação da senha não confere.";
    default:
      return "";
  }
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const token = (sp.token || "").trim();
  const next = safeNextPath(sp.next);
  const errorMsg = errorMessage(sp.error);

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-10 text-slate-900 sm:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <section className="w-full rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.12)] sm:p-7">
          <div className="text-center">
            <div className="mx-auto relative h-24 w-24">
              <Image
                src="/android-chrome-512x512.png"
                alt="Reciclativa"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
              Reciclativa Gestão
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Redefinir senha
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Crie uma nova senha para continuar acessando a área restrita.
            </p>
          </div>

          {errorMsg ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-900">
              {errorMsg}
            </div>
          ) : null}

          {!token ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
              Para redefinir a senha, solicite um link de recuperação válido.
            </div>
          ) : (
            <form className="mt-6 space-y-4" method="POST" action="/api/auth/reset-password">
              <input type="hidden" name="token" value={token} />
              <input type="hidden" name="next" value={next} />

              <PasswordInput
                name="new_password"
                label="Nova senha"
                placeholder="Mínimo de 10 caracteres"
                autoComplete="new-password"
              />

              <PasswordInput
                name="confirm_password"
                label="Confirmar nova senha"
                placeholder="Repita a nova senha"
                autoComplete="new-password"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
              >
                Salvar nova senha
              </button>
            </form>
          )}

          <div className="mt-5 text-center text-sm">
            <Link
              href={`/recuperar-senha?next=${encodeURIComponent(next)}`}
              className="font-medium text-slate-600 underline underline-offset-4 hover:text-emerald-700"
            >
              Solicitar novo link
            </Link>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-5 text-center text-xs text-slate-500">
            Desenvolvido no Brasil por{" "}
            <a
              href="https://www.altacloud.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-700 underline-offset-4 hover:text-emerald-700 hover:underline"
            >
              Alta Cloud
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
