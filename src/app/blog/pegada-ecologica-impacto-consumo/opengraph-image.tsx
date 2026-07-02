import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Pegada ecológica: o que é e como o consumo do dia a dia impacta o meio ambiente";

export default async function Image() {
  return generatePostImage("Sustentabilidade");
}
