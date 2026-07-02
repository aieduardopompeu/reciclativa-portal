import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Como reduzir lixo na rotina: hábitos simples com grande impacto";

export default async function Image() {
  return generatePostImage(
    "Como reduzir lixo na rotina: hábitos simples com grande impacto",
    "Sustentabilidade"
  );
}
