/**
 * Slot IDs do Google AdSense — ca-pub-4436420746304287
 * Slots são valores públicos (aparecem no HTML), não precisam de env var.
 */

export const AD_SLOTS = {
  /** Topo de posts de artigos (leaderboard) */
  ARTICLE_LEADERBOARD_TOP: "5268487164",
  /** Rodapé de posts de artigos */
  ARTICLE_BOTTOM: "6440144201",
  /** Sidebar de artigos — posição do topo */
  ARTICLE_SIDEBAR_TOP: "2417138718",
  /** Sidebar de artigos — posição do meio */
  ARTICLE_SIDEBAR_MID: "3899565177",
  /** Topo da listagem do blog */
  BLOG_LEADERBOARD_TOP: "1163766793",
  /** Rodapé da listagem do blog (rectangle) */
  BLOG_RECTANGLE_BOTTOM: "1796146017",
  /** Home page e páginas pilar — posição do topo */
  DISPLAY_TOPO_PORTAL: "9417347710",
  /** Home page e páginas pilar — posição do rodapé */
  DISPLAY_FOOTER_GLOBAL: "9399259743",
} as const;
