import Link from "next/link";

type ProfissionaisCTAProps = {
  variant?: "primary" | "inline" | "footer";
  context?: "home" | "blog" | "guia" | "reciclagem" | "sustentabilidade" | "diretorio";
  className?: string;
};

const COPY_BY_CONTEXT: Record<
  NonNullable<ProfissionaisCTAProps["context"]>,
  { title: string; description: string; primaryCta: string; secondaryCta?: string }
> = {
  home: {
    title: "Você é profissional de reciclagem ou sustentabilidade?",
    description:
      "Cadastre seu serviço e apareça para pessoas e empresas que precisam de coleta, consultoria, gestão de resíduos e soluções ambientais.",
    primaryCta: "Cadastrar profissional",
    secondaryCta: "Ver profissionais",
  },
  blog: {
    title: "Precisa de ajuda prática na sua região?",
    description:
      "Encontre profissionais e serviços para reciclagem, coleta, consultoria e sustentabilidade.",
    primaryCta: "Ver profissionais",
  },
  guia: {
    title: "Quer ajuda prática além do guia?",
    description:
      "Profissionais especializados podem cuidar disso para você com segurança e conformidade.",
    primaryCta: "Buscar profissionais",
  },
  reciclagem: {
    title: "Precisa de ajuda para reciclar corretamente?",
    description:
      "Encontre profissionais e serviços na sua região para coleta, destinação e orientação.",
    primaryCta: "Encontrar profissionais",
  },
  sustentabilidade: {
    title: "Consultoria e serviços ambientais perto de você",
    description:
      "Gestão de resíduos, ESG, sustentabilidade e soluções ambientais com profissionais locais.",
    primaryCta: "Ver profissionais",
  },
  diretorio: {
    title: "É profissional da área?",
    description:
      "Cadastre seu serviço e comece a receber contatos qualificados pelo Reciclativa.",
    primaryCta: "Cadastrar meu serviço",
  },
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfissionaisCTA({
  variant = "primary",
  context = "home",
  className,
}: ProfissionaisCTAProps) {
  const copy = COPY_BY_CONTEXT[context];

  const isPrimary = variant === "primary";
  const container = cx(
    "rounded-2xl border bg-white/60 backdrop-blur",
    "shadow-sm",
    isPrimary ? "p-6 md:p-8" : "p-5 md:p-6",
    className
  );

  const title = cx("font-semibold tracking-tight", isPrimary ? "text-xl md:text-2xl" : "text-lg md:text-xl");
  const desc = "mt-2 text-sm md:text-base text-neutral-700";

  const primaryBtn = cx(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold",
    "bg-neutral-900 text-white hover:bg-neutral-800",
    "focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
  );

  const secondaryBtn = cx(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold",
    "border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900",
    "focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
  );

  return (
    <section className={container} aria-label="CTA Profissionais">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className={title}>{copy.title}</h2>
          <p className={desc}>{copy.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
          <Link href="/profissionais/cadastrar" className={primaryBtn}>
            {copy.primaryCta}
          </Link>

          {copy.secondaryCta ? (
            <Link href="/profissionais" className={secondaryBtn}>
              {copy.secondaryCta}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
