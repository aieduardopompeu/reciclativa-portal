import { redirect } from "next/navigation";
import { getCurrentAdminMasterSession } from "@/lib/admin-master-auth";
import { getCurrentSaaSApiUser } from "@/lib/saas/session";
import Image from "next/image";
import PasswordInput from "../../components/auth/PasswordInput";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
  next?: string;
  error?: string;
  email?: string;
  status?: string;
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
    case "badcreds":
    case "invalid_credentials":
      return "E-mail ou senha inválidos.";
    case "inactive":
      return "Este acesso está inativo. Fale com o administrador.";
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

export default async function UnifiedLoginPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const next = safeNextPath(sp.next);
  const errorMsg = errorMessage(sp.error);
  const successMsg = sp.status === "password_reset" ? "Senha redefinida com sucesso. Entre novamente para continuar." : "";
  const email = (sp.email || "").trim();

  const [adminSession, saasUser] = await Promise.all([
    getCurrentAdminMasterSession(),
    getCurrentSaaSApiUser(),
  ]);

  if (adminSession && next.startsWith("/admin")) {
    redirect(next);
  }

  if (saasUser && next.startsWith("/app")) {
    if (saasUser.mustChangePassword) {
      redirect("/app/primeiro-acesso");
    }
    if (!saasUser.mfaEnabled) {
      redirect("/app/mfa/setup");
    }
    redirect(next);
  }

  if (adminSession && !saasUser) {
    redirect("/admin");
  }

  if (saasUser && !adminSession) {
    if (saasUser.mustChangePassword) {
      redirect("/app/primeiro-acesso");
    }
    if (!saasUser.mfaEnabled) {
      redirect("/app/mfa/setup");
    }
    redirect("/app/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-10 text-slate-900 sm:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <section className="w-full rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.12)] sm:p-7">
          <div className="text-center">
            <div className="mx-auto relative h-28 w-28">
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
              Área restrita
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Use seu e-mail e senha. O sistema identifica automaticamente seu tipo de acesso.
            </p>
          </div>

          {successMsg ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
              {successMsg}
            </div>
          ) : null}

          {errorMsg ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-900">
              {errorMsg}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" method="POST" action="/api/auth/login">
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

            <PasswordInput />

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            >
              Entrar
            </button>
          </form>

          <div className="mt-5 flex flex-col items-center gap-2 text-center text-sm">
            <a
              href={`/recuperar-senha?email=${encodeURIComponent(email)}&next=${encodeURIComponent(next)}`}
              className="font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
            >
              Esqueci minha senha
            </a>
            <a
              href="mailto:contato@reciclativa.com"
              className="font-medium text-slate-600 underline underline-offset-4 hover:text-emerald-700"
            >
              Problemas para acessar?
            </a>
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
