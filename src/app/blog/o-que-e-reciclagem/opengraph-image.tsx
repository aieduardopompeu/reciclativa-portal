import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "O que é reciclagem: conceito, etapas e por que isso muda tudo";

export default async function Image() {
  return generatePostImage("Reciclagem");
}
