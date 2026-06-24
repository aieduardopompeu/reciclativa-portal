import AdUnit from "@/components/ads/AdUnit";
import { AD_SLOTS } from "@/config/ads";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* article-leaderboard-top — acima de cada post */}
      <div className="mx-auto w-full max-w-3xl px-4 pt-6">
        <AdUnit slot={AD_SLOTS.ARTICLE_LEADERBOARD_TOP} format="horizontal" showLabel={false} />
      </div>

      {children}

      {/* article-bottom — rodapé de todos os posts */}
      <div className="mx-auto w-full max-w-3xl px-4 pb-10">
        <AdUnit slot={AD_SLOTS.ARTICLE_BOTTOM} format="auto" />
      </div>
    </>
  );
}
