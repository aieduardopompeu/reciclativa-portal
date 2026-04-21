import Link from "next/link";

const legalLinks = [
  { href: "/lgpd", label: "LGPD" },
  { href: "/politica-de-privacidade", label: "Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/politica-de-cookies", label: "Cookies" },
  { href: "/contato", label: "Contato" },
];

export function AppLegalFooter() {
  return (
    <footer className="border-t border-emerald-200/80 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="leading-relaxed">
          <p className="font-medium text-slate-800">Reciclativa Gestão</p>
          <p>Ambiente da plataforma com acesso às informações legais e de privacidade.</p>
        </div>

        <nav aria-label="Links legais da plataforma" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {legalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-slate-700 transition hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
