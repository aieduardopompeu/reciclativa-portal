import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
  email?: string;
  next?: string;
  status?: string;
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
    case "invalid_email":
      return "Informe um e-mail válido para continuar.";
    default:
      return "";
  }
}

export default async function RecoverPasswordPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const email = (sp.email || "").trim();
  const next = safeNextPath(sp.next);
  const success = sp.status === "received";
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
              Recuperar senha
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Informe seu e-mail cadastrado. Se ele estiver autorizado no sistema, enviaremos as próximas instruções.
            </p>
          </div>

          {success ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
              Solicitação registrada. Verifique seu e-mail ou fale com o administrador se não receber as instruções.
            </div>
          ) : null}

          {errorMsg ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-900">
              {errorMsg}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" method="POST" action="/api/auth/forgot-password">
            <input type="hidden" name="next" value={next} />

            <label className="block">
              <span className="text-sm font-semibold text-slate-900">E-mail</span>
              <input
                name="email"
                type="email"
                defaultValue={email}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                placeholder="seuemail@empresa.com.br"
                required
                autoComplete="username"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            >
              Solicitar recuperação
            </button>
          </form>

          <div className="mt-5 text-center text-sm">
            <Link
              href={`/login?next=${encodeURIComponent(next)}${email ? `&email=${encodeURIComponent(email)}` : ""}`}
              className="font-medium text-slate-600 underline underline-offset-4 hover:text-emerald-700"
            >
              Voltar para o login
            </Link>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-5 text-center text-xs text-slate-500">
            Desenvolvido no Brasil por <span className="font-semibold text-slate-700">Alta Cloud</span>
          </div>
        </section>
      </div>
    </main>
  );
}
