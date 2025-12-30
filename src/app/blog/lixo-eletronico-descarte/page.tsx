// src/app/blog/lixo-eletronico-descarte/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "lixo-eletronico-descarte";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Lixo eletrônico: como descartar corretamente sem poluir | Reciclativa",
  description:
    "Guia prático de descarte de lixo eletrônico (e-lixo): o que é, riscos ambientais, como separar por tipo e onde levar com segurança (pilhas, baterias, celulares, cabos e eletrodomésticos).",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Lixo eletrônico: como descartar corretamente sem poluir",
    description:
      "Guia prático de descarte de lixo eletrônico (e-lixo): separação por tipo, cuidados com baterias e onde levar para destinação correta.",
    url: `/blog/${SLUG}`,
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <ArticleJsonLd
        siteUrl={SITE_URL}
        url={URL}
        headline="Lixo eletrônico: como descartar corretamente sem poluir"
        description="Entenda o que é lixo eletrônico, por que ele é perigoso e como separar e descartar corretamente (pilhas, baterias, celulares, cabos e eletrodomésticos) com segurança."
        datePublished="2025-12-07"
      />

      {/* Breadcrumb */}
      <div className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">Lixo eletrônico</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Lixo eletrônico: como descartar corretamente sem poluir
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Celulares antigos, cabos, carregadores, pilhas, baterias e eletrodomésticos quebrados
          não deveriam ir para o lixo comum. O e-lixo pode conter metais e componentes que contaminam
          solo e água. Este guia te mostra como separar e onde levar, com um passo a passo simples.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/coleta-seletiva-no-brasil"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: Coleta seletiva no Brasil
          </Link>
          <Link
            href="/blog/reduzir-lixo-na-rotina"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: Reduzir lixo na rotina
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <article className="prose prose-slate mt-10 max-w-none">
        <h2>O que é lixo eletrônico (e por que ele é diferente)</h2>
        <p>
          Lixo eletrônico (e-lixo) é todo resíduo de equipamentos elétricos e eletrônicos: celulares,
          notebooks, TVs, impressoras, cabos, carregadores, pilhas, baterias, lâmpadas, pequenos e
          grandes eletrodomésticos. Ele é diferente porque mistura materiais valiosos (metais, plásticos)
          com componentes que exigem tratamento específico.
        </p>

        <h2>Por que não deve ir para o lixo comum</h2>
        <ul>
          <li>
            <strong>Risco ambiental:</strong> componentes podem contaminar solo e água quando vão para aterros inadequados.
          </li>
          <li>
            <strong>Risco de segurança:</strong> baterias podem aquecer/estufar quando perfuradas ou esmagadas.
          </li>
          <li>
            <strong>Perda de recursos:</strong> muitos materiais podem ser recuperados por logística reversa e reciclagem técnica.
          </li>
        </ul>

        <h2>Regra de ouro: separar por categoria</h2>
        <p>
          Para facilitar o descarte correto, crie uma “caixa do e-lixo” em casa e separe por tipo:
        </p>

        <h3>1) Pilhas e baterias</h3>
        <ul>
          <li>Exemplos: pilhas AA/AAA, baterias de celular, power bank, baterias de notebook.</li>
          <li>
            <strong>Cuidados:</strong> evite calor, umidade e curto-circuito. Se possível, isole os polos com fita.
          </li>
          <li>
            <strong>Destino:</strong> pontos de coleta em mercados, farmácias, lojas de eletrônicos e ecopontos.
          </li>
        </ul>

        <h3>2) Pequenos eletrônicos</h3>
        <ul>
          <li>Exemplos: celulares, tablets, roteadores, controles, fones, câmeras.</li>
          <li>
            <strong>Dica:</strong> guarde carregadores/cabos juntos para facilitar triagem.
          </li>
          <li>
            <strong>Destino:</strong> lojas com logística reversa, assistências, ecopontos, campanhas de coleta.
          </li>
        </ul>

        <h3>3) Cabos, carregadores e acessórios</h3>
        <ul>
          <li>Exemplos: cabos USB, HDMI, fontes, carregadores.</li>
          <li>
            <strong>Dica:</strong> enrole e prenda com elástico para reduzir bagunça e perda.
          </li>
          <li>
            <strong>Destino:</strong> ecopontos e coletores de e-lixo (varia por cidade).
          </li>
        </ul>

        <h3>4) Eletrodomésticos e eletrônicos maiores</h3>
        <ul>
          <li>Exemplos: micro-ondas, ventilador, TV, monitor, impressora.</li>
          <li>
            <strong>Destino:</strong> ecopontos municipais, programas de coleta agendada, pontos de entrega voluntária.
          </li>
        </ul>

        <h2>Onde descartar: caminhos práticos</h2>
        <p>
          Como a infraestrutura muda por cidade, use estes caminhos em ordem de praticidade:
        </p>
        <ol>
          <li>
            <strong>Ecopontos/PEVs municipais:</strong> normalmente aceitam eletroeletrônicos e volumosos.
          </li>
          <li>
            <strong>Logística reversa em lojas:</strong> redes e assistências podem receber itens específicos (ex.: baterias).
          </li>
          <li>
            <strong>Campanhas e mutirões:</strong> universidades, ONGs e prefeituras fazem ações periódicas.
          </li>
        </ol>

        <h2>Checklist rápido antes de descartar (sem entrar em detalhes técnicos)</h2>
        <ul>
          <li>
            <strong>Separar:</strong> pilhas/baterias nunca junto do lixo comum.
          </li>
          <li>
            <strong>Armazenar com segurança:</strong> evite amassar, perfurar ou deixar perto de calor.
          </li>
          <li>
            <strong>Organizar por tipo:</strong> baterias em um saco/caixa; cabos em outro; aparelhos em outro.
          </li>
        </ul>

        <h2>Como reduzir e-lixo (o que realmente funciona)</h2>
        <ul>
          <li>
            <strong>Manutenção e reparo</strong> quando for viável (troca de cabo, fonte, bateria, peça simples).
          </li>
          <li>
            <strong>Reuso</strong>: doar ou vender aparelhos funcionando.
          </li>
          <li>
            <strong>Compra consciente</strong>: priorizar durabilidade, disponibilidade de peças e assistência.
          </li>
        </ul>

        <p>
          Complemento útil: <Link href="/blog/reduzir-lixo-na-rotina">reduzir lixo na rotina</Link>.
        </p>

        <h2>Links úteis para continuar</h2>
        <ul>
          <li>
            <Link href="/blog/coleta-seletiva-no-brasil">Coleta seletiva no Brasil</Link>
          </li>
          <li>
            <Link href="/blog/o-que-pode-ser-reciclado">O que pode ser reciclado</Link>
          </li>
          <li>
            <Link href="/blog/reciclagem-plastico">Reciclagem de plástico</Link>
          </li>
          <li>
            <Link href="/reciclagem">Página pilar: Reciclagem</Link>
          </li>
        </ul>

        <h2>FAQ: dúvidas comuns sobre lixo eletrônico</h2>

        <h3>Posso jogar pilhas e baterias no lixo comum?</h3>
        <p>
          Não é recomendado. O ideal é levar a pontos de coleta específicos (logística reversa).
          Isso evita riscos ambientais e facilita a destinação correta.
        </p>

        <h3>Celular quebrado vai para reciclagem “normal”?</h3>
        <p>
          Não. Celulares são e-lixo e devem ir para pontos de coleta de eletrônicos, lojas com
          logística reversa ou ecopontos.
        </p>

        <h3>Cabos e carregadores são recicláveis?</h3>
        <p>
          Em geral, sim, mas via cadeia de e-lixo (não na coleta seletiva comum). Procure ecopontos
          ou coletores de eletrônicos.
        </p>

        <h3>Se minha cidade não tem ecoponto, o que faço?</h3>
        <p>
          Procure pontos de coleta em lojas (principalmente para pilhas/baterias) e acompanhe
          campanhas temporárias de coleta. Quando não houver alternativa, armazene com segurança até encontrar um ponto.
        </p>
      </article>

      {/* CTA final */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Próximo passo recomendado</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Para acertar o básico do descarte no dia a dia, revise o guia do que pode ser reciclado e
          como evitar contaminação na separação.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver guia: o que pode ser reciclado
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Voltar ao Blog
          </Link>
        </div>
      </section>
    </main>
  );
}
