import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Entenda como o Reciclativa utiliza cookies e tecnologias similares para melhorar sua experiência e medir audiência.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Política de Cookies</h1>
        <p className="mt-4 text-muted-foreground">
          Esta Política explica como o <strong>Reciclativa</strong> utiliza cookies
          e tecnologias similares para funcionamento do site, análise de tráfego e,
          quando aplicável, publicidade.
        </p>
      </header>

      <section className="space-y-8 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. O que são cookies</h2>
          <p>
            Cookies são pequenos arquivos armazenados no seu navegador para
            lembrar preferências, melhorar a navegação e coletar informações
            estatísticas sobre o uso do site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Por que usamos cookies</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Essenciais:</strong> necessários para o funcionamento básico do site.
            </li>
            <li>
              <strong>Desempenho e análise:</strong> ajudam a entender como o site é utilizado
              e a melhorar conteúdo e experiência.
            </li>
            <li>
              <strong>Funcionalidade:</strong> lembram preferências do usuário quando aplicável.
            </li>
            <li>
              <strong>Publicidade:</strong> quando houver anúncios, podem ser usados para
              exibir publicidade e medir resultados.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Cookies de terceiros
          </h2>
          <p>
            Podemos utilizar serviços de terceiros (por exemplo, ferramentas de
            análise e redes de publicidade) que também podem definir cookies.
            Esses cookies são gerenciados pelos próprios terceiros, conforme suas
            políticas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Como gerenciar cookies
          </h2>
          <p>
            Você pode controlar e/ou excluir cookies nas configurações do seu
            navegador. Ao desativar cookies, algumas funcionalidades podem não
            operar corretamente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Alterações nesta política
          </h2>
          <p>
            Podemos atualizar esta Política de Cookies periodicamente. Recomendamos
            revisar esta página para se manter informado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Contato</h2>
          <p>
            Em caso de dúvidas, fale com a gente pela página de{" "}
            <Link
              href="/contato"
              className="text-primary underline underline-offset-4"
            >
              contato
            </Link>
            . Veja também nossa{" "}
            <Link
              href="/privacidade"
              className="text-primary underline underline-offset-4"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </section>
      </section>
    </main>
  );
}
