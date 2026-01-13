import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false, follow: true },
};

export default function TermosPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Termos de Uso</h1>
      <p className="mt-4 text-zinc-700">
        {/* seu conteúdo */}
      </p>
    </main>
  );
}
