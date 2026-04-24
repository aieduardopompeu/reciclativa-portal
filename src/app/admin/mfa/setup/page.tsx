import { redirect } from "next/navigation";
import QRCode from "qrcode";
import {
  buildOtpAuthUri,
  getAdminMasterSetupSecretCookie,
  getCurrentAdminMasterChallenge,
} from "../../../../lib/admin-master-mfa";

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

export default async function AdminMfaSetupPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const next = sp.next || "/admin";

  const challenge = await getCurrentAdminMasterChallenge();
  const secret = await getAdminMasterSetupSecretCookie();

  if (!challenge || challenge.mfa_enabled || !secret) {
    redirect(`/admin/login?error=mfa_challenge_missing&next=${encodeURIComponent(next)}`);
  }

  const otpAuthUri = buildOtpAuthUri(challenge.email, secret);

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
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold">Ativar MFA do admin master</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Escaneie o QR Code no seu aplicativo autenticador. Se preferir, você também pode usar a chave manual.
      </p>

      <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
        {qrCodeDataUrl ? (
          <div className="mb-6 flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-4">
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
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Não foi possível gerar o QR Code agora. Use a chave manual abaixo.
          </div>
        )}

        <p className="text-sm font-semibold text-slate-900">Chave secreta</p>
        <code className="mt-2 block break-all rounded-lg bg-slate-50 p-3 text-sm">{secret}</code>

        <p className="mt-4 text-sm font-semibold text-slate-900">URI manual</p>
        <code className="mt-2 block max-h-48 overflow-auto break-all rounded-lg bg-slate-50 p-3 text-xs">
          {otpAuthUri}
        </code>

        <form className="mt-6" method="POST" action="/api/admin/auth/mfa/setup">
          <input type="hidden" name="next" value={next} />

          <label className="block text-sm font-medium">Código do autenticador</label>
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
            Ativar MFA e entrar
          </button>
        </form>
      </div>
    </main>
  );
}
