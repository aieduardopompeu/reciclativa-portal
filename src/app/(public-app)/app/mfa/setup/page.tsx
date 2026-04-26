import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { getCurrentSaaSApiUser } from "@/lib/saas/session";
import {
  buildOtpAuthUri,
  getSaaSMfaSetupSecretCookie,
} from "@/lib/saas/mfa";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SaaSMfaSetupPage() {
  const user = await getCurrentSaaSApiUser();

  if (!user) {
    redirect("/app/login");
  }

  if (user.mustChangePassword) {
    redirect("/app/primeiro-acesso");
  }

  if (user.mfaEnabled) {
    redirect("/app/dashboard");
  }

  const secret = await getSaaSMfaSetupSecretCookie();
  if (!secret) {
    redirect("/api/app/auth/mfa/setup/init");
  }

  const otpAuthUri = buildOtpAuthUri(user.email, secret);

  let qrCodeDataUrl = "";
  try {
    qrCodeDataUrl = await QRCode.toDataURL(otpAuthUri, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 240,
    });
  } catch {
    qrCodeDataUrl = "";
  }

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Primeiro acesso seguro
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Ativar MFA da sua conta
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Antes de entrar no sistema, ative o segundo fator no aplicativo autenticador.
          </p>
          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
            <span className="font-semibold">Configurando MFA para:</span>{" "}
            <span className="break-all">{user.email}</span>
          </div>

          {qrCodeDataUrl ? (
            <div className="mt-6 flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-900">QR Code para o autenticador</p>
              <img
                src={qrCodeDataUrl}
                alt="QR Code para configurar o MFA"
                className="h-60 w-60 rounded-lg border border-slate-200 bg-white p-2"
              />
              <p className="mt-3 text-center text-xs text-slate-500">
                Escaneie com Google Authenticator, Microsoft Authenticator, 2FAS ou app similar.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Não foi possível gerar o QR Code agora. Use a chave manual abaixo.
            </div>
          )}

          <p className="mt-6 text-sm font-semibold text-slate-900">Chave secreta</p>
          <code className="mt-2 block break-all rounded-lg bg-slate-50 p-3 text-sm">{secret}</code>

          <p className="mt-4 text-sm font-semibold text-slate-900">URI manual</p>
          <code className="mt-2 block max-h-48 overflow-auto break-all rounded-lg bg-slate-50 p-3 text-xs">
            {otpAuthUri}
          </code>

          <form className="mt-6" method="POST" action="/api/app/auth/mfa/setup">
            <label className="block text-sm font-medium text-slate-900">Código do autenticador</label>
            <input
              name="code"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              className="mt-2 w-full rounded-lg border px-3 py-2"
              placeholder="123456"
              required
            />

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
            >
              Ativar MFA
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
