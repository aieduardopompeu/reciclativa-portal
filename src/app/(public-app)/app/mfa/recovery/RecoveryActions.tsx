"use client";

export default function RecoveryActions({
  txtDataUrl,
  clipboardPayload,
}: {
  txtDataUrl: string;
  clipboardPayload: string;
}) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(clipboardPayload);
            alert("Recovery codes copiados.");
          } catch {
            alert("Não foi possível copiar automaticamente. Use o botão Baixar TXT.");
          }
        }}
      >
        Copiar códigos
      </button>

      <a
        href={txtDataUrl}
        download="reciclativa-gestao-recovery-codes.txt"
        className="inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
      >
        Baixar TXT
      </a>

      <form className="w-full" method="POST" action="/api/app/auth/mfa/recovery/ack">
        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
        >
          Já salvei os recovery codes
        </button>
      </form>
    </div>
  );
}
