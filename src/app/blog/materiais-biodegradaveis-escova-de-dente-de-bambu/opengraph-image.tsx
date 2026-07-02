import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Materiais biodegradáveis: exemplos e por que a escova de bambu faz diferença";

export default async function Image() {
  return generatePostImage(
    "Materiais biodegradáveis: exemplos e por que a escova de bambu faz diferença",
    "Sustentabilidade"
  );
}
