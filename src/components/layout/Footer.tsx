import Link from "next/link";
import Image from "next/image";

type Seal = {
  src: string;
  alt: string;
  className?: string; // controla tamanho individual
};

const SEALS: Seal[] = [
  { src: "/seals/ssl-secure.svg", alt: "SSL Seguro", className: "h-8" },
  { src: "/seals/google-safe.svg", alt: "Site Seguro", className: "h-8" },

  // Ajustes individuais:
  { src: "/seals/lgpd.png", alt: "LGPD", className: "h-10" },
  { src: "/seals/altacloud.png", alt: "Developed by Alta Cloud", className: "h-10" },
];

type Social = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const socials: Social[] = [
  {
    href: "https://instagram.com/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.75-.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        />
      </svg>
    ),
  },
  {
    href: "https://facebook.com/",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.2-1.6 1.6-1.6H16.8V5.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8V11H6.5v3h2.8v8h4.2Z"
        />
      </svg>
    ),
  },
  {
    href: "https://x.com/",
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.9 2H22l-6.8 7.8L23 22h-6.5l-5.1-6.6L5.7 22H2l7.4-8.5L1 2h6.6l4.6 6L18.9 2Zm-1.1 18h1.7L7.7 4H5.9l11.9 16Z"
        />
      </svg>
    ),
  },
  {
    href: "https://youtube.com/",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"
        />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-200/80 bg-emerald-50/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        {/* Marca */}
        <div className="space-y-3">
          <Image src="/logo.png" alt="Reciclativa" width={120} height={30} />
          <p className="text-sm text-slate-700">
            Reciclagem, sustentabilidade e economia circular no Brasil.
          </p>

          {/* Redes sociais */}
          <div className="flex items-center gap-4 pt-1 text-slate-600">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="transition hover:text-emerald-700"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Seções */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">Seções</div>
          <ul className="space-y-1 text-sm text-slate-700">
            <li>
              <Link href="/reciclagem" className="hover:text-emerald-700">
                Reciclagem
              </Link>
            </li>
            <li>
              <Link href="/sustentabilidade" className="hover:text-emerald-700">
                Sustentabilidade
              </Link>
            </li>
            <li>
              <Link href="/guias" className="hover:text-emerald-700">
                Guias
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-emerald-700">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Institucional + Selos (abaixo) */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">Institucional</div>
          <ul className="space-y-1 text-sm text-slate-700">
            <li>
              <Link href="/sobre" className="hover:text-emerald-700">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-emerald-700">
                Contato
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-emerald-700">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/politica-de-cookies" className="hover:text-emerald-700">
                Política de Cookies
              </Link>
            </li>
          </ul>

          {/* Selos logo abaixo do institucional */}
          <div className="pt-4">
            <div className="text-sm font-semibold text-slate-900">Selos</div>

            <div className="mt-3 flex flex-wrap items-center gap-5">
              {SEALS.map((s) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  width={120}
                  height={60}
                  className={`${s.className ?? "h-9"} w-auto object-contain opacity-90`}
                  title={s.alt}
                />
              ))}
            </div>

            <p className="mt-2 text-xs text-slate-600">
              Selos ilustrativos e informativos no rodapé.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-200/70 py-4">
        <div className="mx-auto max-w-6xl px-4 text-xs text-slate-600">
          © {new Date().getFullYear()} Reciclativa. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
