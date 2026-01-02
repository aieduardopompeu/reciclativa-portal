// src/app/diretorio/page.tsx
import Link from "next/link";
import AdCtaProfissionaisCard from "@/components/AdCtaProfissionaisCard";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-12">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Diretório
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Diretório da Reciclativa
        </h1>

        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          MVP: esta área será expandida. Por enquanto, foco em conteúdo prático e
          navegação útil.
        </p>

        <p className="mt-3 text-sm font-semibold text-slate-900">
          Transforme resíduos em recursos!
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/profissionais"
            className="inline-flex items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Ver profissionais por estado →
          </Link>

          <Link
            href="/anuncie"
            className="inline-flex items-center justify-center rounded-md border border-black/5 px-4 py-2 text-sm font-semibold hover:bg-black/5"
          >
            Anunciar no site →
          </Link>
        </div>
      </section>

      {/* ✅ Bloco B2B (alto CTR) */}
      <section className="mt-10">
        <AdCtaProfissionaisCard signupHref="/anuncie" />
      </section>
    </main>
  );
}
