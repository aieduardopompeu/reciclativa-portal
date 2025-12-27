import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <Image src="/logo.png" alt="Reciclativa" width={140} height={36} />
          <p className="text-sm text-slate-600">
            Reciclagem, sustentabilidade e economia circular no Brasil.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">Seções</div>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>
              <Link href="/reciclagem" className="hover:text-slate-900">
                Reciclagem
              </Link>
            </li>
            <li>
              <Link href="/sustentabilidade" className="hover:text-slate-900">
                Sustentabilidade
              </Link>
            </li>
            <li>
              <Link href="/guias" className="hover:text-slate-900">
                Guias
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-slate-900">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">Institucional</div>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>
              <Link href="/sobre" className="hover:text-slate-900">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-slate-900">
                Contato
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade" className="hover:text-slate-900">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/politica-de-cookies" className="hover:text-slate-900">
                Política de Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4">
        <div className="mx-auto max-w-6xl px-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Reciclativa. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
