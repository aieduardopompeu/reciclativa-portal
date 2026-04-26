import Link from "next/link";

type SaaSAccessDeniedProps = {
  moduleLabel?: string;
};

export default function SaaSAccessDenied({
  moduleLabel = "esta área",
}: SaaSAccessDeniedProps) {
  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
        Acesso restrito
      </p>
      <h1 className="mt-3 text-2xl font-bold text-slate-950">
        Você não tem permissão para acessar {moduleLabel}.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-amber-900">
        Seu perfil atual não possui acesso a este módulo. Fale com o administrador da organização para ajustar suas permissões.
      </p>
      <Link
        href="/app/dashboard"
        prefetch={false}
        className="mt-5 inline-flex rounded-2xl bg-[#1d5b84] px-4 py-2 text-sm font-semibold text-white hover:bg-[#164866]"
      >
        Voltar ao dashboard
      </Link>
    </section>
  );
}
