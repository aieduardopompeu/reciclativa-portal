import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Leia os Termos de Uso do Reciclativa e entenda as regras, responsabilidades e condições para utilização do portal.",
};

export default function TermosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Termos de Uso</h1>
        <p className="mt-4 text-muted-foreground">
          Ao acessar e utilizar o portal <strong>Reciclativa</strong>, você
          concorda com os termos e condições descritos abaixo. Caso não concorde,
          recomendamos que não utilize o site.
        </p>
      </header>

      <section className="space-y-8 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Aceitação dos termos
          </h2>
          <p>
            O uso do Reciclativa implica na aceitação integral destes Termos de
            Uso e de nossa{" "}
            <Link
              href="/privacidade"
              className="text-primary underline underline-offset-4"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Uso do conteúdo</h2>
          <p>
            Todo o conteúdo disponibilizado no portal é destinado a fins
            informativos, educacionais e de conscientização ambiental. É
            proibida a reprodução, distribuição ou modificação do conteúdo sem
            autorização prévia, salvo quando expressamente permitido por lei.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Responsabilidades do usuário
          </h2>
          <p>
            O usuário compromete-se a utilizar o site de forma ética e legal,
            não praticando atos que possam causar danos ao portal, a outros
            usuários ou a terceiros.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Propriedade intelectual
          </h2>
          <p>
            Textos, imagens, marcas, logotipos e demais elementos presentes no
            Reciclativa são protegidos por direitos autorais e outros direitos
            de propriedade intelectual, sendo vedado o uso não autorizado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Links externos</h2>
          <p>
            O portal pode conter links para sites de terceiros. O Reciclativa
            não se responsabiliza pelo conteúdo, políticas ou práticas desses
            sites externos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Modificações do serviço
          </h2>
          <p>
            O Reciclativa pode alterar, suspender ou descontinuar qualquer parte
            do site a qualquer momento, sem aviso prévio, visando melhorias ou
            adequações técnicas e legais.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            7. Limitação de responsabilidade
          </h2>
          <p>
            O Reciclativa não se responsabiliza por danos diretos ou indiretos
            decorrentes do uso ou da impossibilidade de uso do portal, incluindo
            decisões tomadas com base nas informações disponibilizadas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            8. Disposições gerais
          </h2>
          <p>
            Caso qualquer disposição destes Termos seja considerada inválida,
            as demais permanecerão em pleno vigor. Estes Termos são regidos pela
            legislação brasileira.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contato</h2>
          <p>
            Para dúvidas ou solicitações relacionadas a estes Termos de Uso,
            entre em contato pela página de{" "}
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
