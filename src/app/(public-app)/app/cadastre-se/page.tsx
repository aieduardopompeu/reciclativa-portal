import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CompanySignupForm from "./CompanySignupForm";

export const metadata: Metadata = {
  title: "Cadastre-se | Reciclativa Gestão",
  description:
    "Solicite o cadastro da sua empresa na Reciclativa Gestão para análise do admin master.",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = Promise<{
  ok?: string;
  error?: string;
}>;

export default async function AppSignupPage({ searchParams }: { searchParams?: SearchParams }) {
  const params = (await searchParams) ?? {};
  const ok = params.ok === "1";
  const error = params.error ? decodeURIComponent(params.error) : "";

  return (
    <main className="min-h-screen bg-[#f6faf7] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-white/88 to-[#f6faf7]" aria-hidden />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm backdrop-blur sm:px-5">
            <Link href="/app-home" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Reciclativa" width={124} height={32} priority />
              <span className="hidden text-sm font-semibold text-slate-600 sm:inline">Gestão</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">

              <Link
                href="/app-home"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Voltar
              </Link>
            </div>
          </header>

          <div className="py-10 lg:py-14">
            <CompanySignupForm ok={ok} error={error} />
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-4 py-8 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        Desenvolvida no Brasil pela Alta Cloud
      </footer>
    </main>
  );
}

