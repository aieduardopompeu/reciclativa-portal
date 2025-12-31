// src/app/reciclagem/page.tsx
import Link from "next/link";

export default function ReciclagemPilarPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-12">
      {/* Hero */}
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Página pilar · Reciclagem
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Reciclagem: guia prático para reciclar corretamente
        </h1>

        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          Aprenda como separar resíduos, evitar contaminação e entender os
          símbolos da reciclagem para acertar no descarte.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/guias"
            className="inline-flex items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Ver guias
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-black/5 bg-transparent px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-black/5"
          >
            Voltar para a Home
          </Link>
        </div>
      </section>

      {/* Grid: trilha + atalhos */}
      <section className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
        {/* Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Começando do zero
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
            O básico para separar, higienizar e armazenar recicláveis sem gerar
            rejeito por contaminação.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/o-que-pode-ser-reciclado"
              className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Checklist
              </p>
              <h3 className="mt-2 text-lg font-semibold">
                O que pode (e não pode) ser reciclado
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Lista prática por material + regra de ouro para reduzir
                contaminação.
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-emerald-800">
                Ler guia →
              </span>
            </Link>

            <Link
              href="/coleta-seletiva"
              className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Guia base
              </p>
              <h3 className="mt-2 text-lg font-semibold">
                Coleta seletiva: como separar sem erro
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Cores, organização e dicas simples para separar com
                consistência.
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-emerald-800">
                Ver página →
              </span>
            </Link>

            <Link
              href="/simbolos-da-reciclagem"
              className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow sm:col-span-2"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Essencial
              </p>
              <h3 className="mt-2 text-lg font-semibold">
                Símbolos da reciclagem
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Entenda os símbolos nas embalagens e o que eles realmente
                significam.
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-emerald-800">
                Ver símbolos →
              </span>
            </Link>
          </div>
        </div>

        {/* Atalhos */}
        <aside className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold tracking-tight">
            Atalhos da Reciclagem
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Navegação rápida para reforçar SEO interno e facilitar a jornada.
          </p>

          <div className="mt-5 space-y-3">
            <Link
              href="/blog"
              className="flex items-center justify-between rounded-xl border border-black/5 px-4 py-3 text-sm font-semibold hover:bg-black/5"
            >
              Blog da Reciclativa <span aria-hidden>→</span>
            </Link>

            <Link
              href="/guias"
              className="flex items-center justify-between rounded-xl border border-black/5 px-4 py-3 text-sm font-semibold hover:bg-black/5"
            >
              Guias práticos <span aria-hidden>→</span>
            </Link>

            <Link
              href="/coleta-seletiva"
              className="flex items-center justify-between rounded-xl border border-black/5 px-4 py-3 text-sm font-semibold hover:bg-black/5"
            >
              Coleta seletiva <span aria-hidden>→</span>
            </Link>

            <Link
              href="/simbolos-da-reciclagem"
              className="flex items-center justify-between rounded-xl border border-black/5 px-4 py-3 text-sm font-semibold hover:bg-black/5"
            >
              Símbolos da reciclagem <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold">Dica editorial</p>
            <p className="mt-1 text-emerald-900/80">
              Em cada post, linke 3–6 conteúdos relacionados e 1 página pilar.
            </p>
          </div>
        </aside>
      </section>

      {/* Blocos inferiores */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Erros comuns que atrapalham tudo
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
            <li>• Misturar recicláveis com orgânicos (contaminação).</li>
            <li>• Enviar embalagens com excesso de líquido ou comida.</li>
            <li>• Colocar papel engordurado junto do papel limpo.</li>
            <li>• Achar que “símbolo” garante coleta na sua cidade.</li>
          </ul>

          <div className="mt-6">
            <Link
              href="/blog/o-que-pode-ser-reciclado"
              className="inline-flex items-center justify-center rounded-md border border-black/5 px-4 py-2 text-sm font-semibold hover:bg-black/5"
            >
              Ver a regra de ouro →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Checklist rápido (30 segundos)
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
            <li>1) Separe recicláveis do orgânico.</li>
            <li>2) Retire excesso de comida e líquidos.</li>
            <li>3) Mantenha seco (não precisa lavar “perfeito”).</li>
            <li>4) Reduza volume quando fizer sentido (ex.: garrafa PET).</li>
            <li>5) Em dúvida, consulte o guia e a regra local.</li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Explorar guias
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md border border-black/5 px-4 py-2 text-sm font-semibold hover:bg-black/5"
            >
              Ir para o Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
