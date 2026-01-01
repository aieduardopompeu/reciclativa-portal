// src/app/profissionais/[uf]/[cidade]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getByUFCity, normalizeUF } from "@/content/profissionais";

type PageProps = { params: { uf: string; cidade: string } };

export default function ProfissionaisCidadePage({ params }: PageProps) {
  const uf = normalizeUF(params.uf);
  const cidadeSlug = (params.cidade || "").toLowerCase();
  const list = getByUFCity(uf, cidadeSlug);

  if (!list.length) return notFound();

  const cidadeNome = list[0]?.city ?? "Cidade";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-12">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Profissionais · {uf} · {cidadeNome}
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Serviços em {cidadeNome} ({uf})
        </h1>

        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          Lista de profissionais e serviços disponíveis na cidade.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={`/profissionais/${uf.toLowerCase()}`}
            className="rounded-md border border-black/5 px-4 py-2 text-sm font-semibold hover:bg-black/5"
          >
            Voltar para {uf}
          </Link>
          <Link
            href="/profissionais"
            className="rounded-md border border-black/5 px-4 py-2 text-sm font-semibold hover:bg-black/5"
          >
            Trocar estado
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {p.service}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.whatsapp ? (
                  <a
                    className="rounded-md border border-black/5 px-3 py-2 text-sm font-semibold hover:bg-black/5"
                    href={`https://wa.me/${p.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                ) : null}
                {p.email ? (
                  <a
                    className="rounded-md border border-black/5 px-3 py-2 text-sm font-semibold hover:bg-black/5"
                    href={`mailto:${p.email}`}
                  >
                    E-mail
                  </a>
                ) : null}
                {p.website ? (
                  <a
                    className="rounded-md border border-black/5 px-3 py-2 text-sm font-semibold hover:bg-black/5"
                    href={p.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Site
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
