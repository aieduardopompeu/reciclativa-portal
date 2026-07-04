import Link from "next/link";
import { relativeTimeFromNow, type RadarNoticiaPublic } from "@/lib/radar";
import { RadarTagBadge } from "./RadarTagBadge";

export function RadarMiniCard({ noticia }: { noticia: RadarNoticiaPublic }) {
  const tempo = noticia.publicado_em
    ? relativeTimeFromNow(new Date(noticia.publicado_em))
    : "";

  return (
    <Link
      href={`/radar/${noticia.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#d0e8d4] bg-white transition hover:border-[#b3d9bc] hover:bg-[#f5f9f5]"
    >
      {noticia.imagem_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- imagem externa e imprevisível, sem domínio fixo pro next/image otimizar
        <img
          src={noticia.imagem_url}
          alt=""
          className="h-32 w-full object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <RadarTagBadge tag={noticia.tag} />
        <h3 className="mt-3 line-clamp-2 text-sm font-bold text-[#0d1f12] group-hover:text-[#1a5c2e]">
          {noticia.titulo}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#0d1f12]/70">
          {noticia.resumo}
        </p>
        <p className="mt-3 text-xs font-semibold text-[#0d1f12]/50">
          {noticia.cidade_uf ? `${noticia.cidade_uf} · ` : ""}
          {tempo}
        </p>
      </div>
    </Link>
  );
}
