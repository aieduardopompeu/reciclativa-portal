import Link from "next/link";

const nav = [
  { href: "/reciclagem", label: "Reciclagem" },
  { href: "/sustentabilidade", label: "Sustentabilidade" },
  { href: "/guias", label: "Guias" },
  { href: "/blog", label: "Blog" },
  { href: "/diretorio", label: "Diretório" },
  { href: "/anuncie", label: "Anuncie" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Reciclativa
        </Link>

        <nav className="hidden gap-5 md:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-sm text-slate-700 hover:text-slate-950"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/guias"
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
        >
          Ver guias
        </Link>
      </div>

      <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 pb-2 md:hidden">
        {nav.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="whitespace-nowrap rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-800"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
