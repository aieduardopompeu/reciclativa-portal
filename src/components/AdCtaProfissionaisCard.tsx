// src/components/AdCtaProfissionaisCard.tsx
import Link from "next/link";

type Props = {
  className?: string;
  announceHref?: string; // mídia kit / anuncie
  signupHref?: string; // cadastrar serviço (futuro)
};

export default function AdCtaProfissionaisCard({
  className = "",
  announceHref = "/anuncie",
  signupHref = "/anuncie", // depois você troca para "/profissionais/cadastrar"
}: Props) {
  return (
    <section
      className={`rounded-2xl border border-black/5 bg-white p-6 shadow-sm ${className}`}
    >
      <h3 className="text-lg font-bold tracking-tight">Quer anunciar?</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Apareça para pessoas que estão procurando coleta, consultoria e serviços
        ambientais na sua região.
      </p>

      <div className="mt-4 grid gap-2">
        <Link
          href={announceHref}
          className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Ver mídia kit →
        </Link>

        <Link
          href={signupHref}
          className="inline-flex w-full items-center justify-center rounded-xl border border-black/5 px-4 py-3 text-sm font-semibold hover:bg-black/5"
        >
          Cadastrar meu serviço →
        </Link>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Dica: você poderá cadastrar por estado e cidade (cobertura nacional).
      </p>
    </section>
  );
}
