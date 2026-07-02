import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Erros mais comuns na compostagem doméstica (e como corrigir)";

export default async function Image() {
  return generatePostImage("Guias");
}
