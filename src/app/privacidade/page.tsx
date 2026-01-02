import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como o Reciclativa coleta, utiliza e protege os dados dos usuários, em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-muted-foreground">
          Esta Política de Privacidade descreve como o <strong>Reciclativa</strong>{" "}
          coleta, utiliza e protege as informações dos usuários que acessam o
          portal.
        </p>
      </header>

      <section className="space-y-8 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Coleta de informações</h2>
          <p>
            Podemos coletar informações fornecidas voluntariamente pelo usuário,
            como nome e e-mail, por meio de formulários de contato, além de dados
            técnicos automaticamente coletados, como endereço IP, tipo de
            navegador, páginas acessadas e tempo de permanência.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. Uso das informações
          </h2>
          <p>
            As informações coletadas são utilizadas para melhorar a experiência
            do usuário, responder solicitações, gerar estatísticas de acesso,
            aprimorar conteúdos e garantir a segurança da plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Cookies e tecnologias similares
          </h2>
          <p>
            Utilizamos cookies e tecnologias semelhantes para análise de tráfego,
            personalização de conteúdo e exibição de anúncios. O usuário pode
            gerenciar o uso de cookies por meio das configurações do navegador.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Compartilhamento de dados
          </h2>
          <p>
            Não vendemos ou compartilhamos dados pessoais com terceiros, exceto
            quando necessário para o funcionamento do site (como serviços de
            análise e publicidade) ou por obrigação legal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Segurança das informações
          </h2>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger
            os dados contra acessos não autorizados, perda ou uso indevido.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Direitos do titular
          </h2>
          <p>
            O usuário pode solicitar a confirmação da existência de tratamento,
            acesso, correção ou exclusão de seus dados pessoais, conforme
            previsto na legislação vigente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            7. Alterações nesta política
          </h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente.
            Recomendamos a revisão regular desta página para se manter informado
            sobre eventuais mudanças.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Contato</h2>
          <p>
            Em caso de dúvidas sobre esta Política de Privacidade, entre em
            contato pela página de{" "}
            <Link
              href="/contato"
              className="text-primary underline underline-offset-4"
            >
              contato
            </Link>
            .
          </p>
        </section>
      </section>
    </main>
  );
}
