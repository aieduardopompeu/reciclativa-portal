import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Educação ambiental na prática: como aplicar em casa, na escola e no trabalho";

export default async function Image() {
  return generatePostImage("Sustentabilidade");
}
