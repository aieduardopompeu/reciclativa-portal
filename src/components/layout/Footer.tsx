import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

import {
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa6";

type Seal = {
  src: string;
  alt: string;
  className?: string;
  href?: string;
  ariaLabel?: string;
};

const SEALS: Seal[] = [
  {
    src: "/seals/ssl-secure.svg",
    alt: "SSL Seguro",
    className: "h-8",
    href: "https://www.ssllabs.com/ssltest/analyze.html?d=reciclativa.com",
    ariaLabel: "Ver teste SSL no SSL Labs",
  },
  {
    src: "/seals/google-safe.svg",
    alt: "Site Seguro",
    className: "h-8",
    href: "https://transparencyreport.google.com/safe-browsing/search?url=reciclativa.com",
    ariaLabel: "Ver status no Google Safe Browsing",
  },
  {
    src: "/seals/lgpd.png",
    alt: "LGPD",
    className: "h-12",
    href: "/lgpd",
    ariaLabel: "Ver informações LGPD",
  },
  {
    src: "/seals/altacloud.png",
    alt: "Developed by Alta Cloud",
    className: "h-12",
    href: "https://www.altacloud.com.br/",
    ariaLabel: "Acessar Alta Cloud",
  },
];

type Social = {
  href: string;
  label: string;
  icon: ReactNode;
};

const socials: Social[] = [
  {
    href: "https://www.youtube.com/@Reciclativa",
    label: "YouTube",
    icon: <FaYoutube className="h-5 w-5" aria-hidden="true" />,
  },
  {
    href: "https://www.instagram.com/reciclativa/",
    label: "Instagram",
    icon: <FaInstagram className="h-5 w-5" aria-hidden="true" />,
  },
  {
    href: "https://x.com/ReciclativaBR",
    label: "X",
    icon: <FaXTwitter className="h-5 w-5" aria-hidden="true" />,
  },
  {
    href: "https://www.tiktok.com/@reciclativa",
    label: "TikTok",
    icon: <FaTiktok className="h-5 w-5" aria-hidden="true" />,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61559420823914",
    label: "Facebook",
    icon: <FaFacebookF className="h-5 w-5" aria-hidden="true" />,
  },
  {
    href: "https://www.linkedin.com/in/reciclativa/",
    label: "LinkedIn",
    icon: <FaLinkedinIn className="h-5 w-5" aria-hidden="true" />,
  },
  {
    href: "https://br.pinterest.com/brreciclativa/",
    label: "Pinterest",
    icon: <FaPinterestP className="h-5 w-5" aria-hidden="true" />,
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
          <div className="flex flex-wrap items-center gap-2 pt-1 text-slate-600">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-emerald-100 hover:text-emerald-700"
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

        {/* Institucional + Selos */}
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
              <Link href="/politica-de-privacidade" className="hover:text-emerald-700">
                Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos-de-uso" className="hover:text-emerald-700">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link href="/politica-de-cookies" className="hover:text-emerald-700">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-emerald-700">
                FAQ
              </Link>
            </li>
          </ul>

          {/* Selos */}
          <div className="pt-4">
            <div className="text-sm font-semibold text-slate-900">Selos</div>

            <div className="mt-3 flex flex-wrap items-center gap-5">
              {SEALS.map((s) => {
                const img = (
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={120}
                    height={60}
                    className={`${s.className ?? "h-9"} w-auto object-contain opacity-90`}
                    title={s.alt}
                  />
                );

                if (!s.href) return <span key={s.src}>{img}</span>;

                return (
                  <Link
                    key={s.src}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.ariaLabel ?? s.alt}
                    title={s.ariaLabel ?? s.alt}
                    className="inline-flex items-center"
                  >
                    {img}
                  </Link>
                );
              })}
            </div>
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
