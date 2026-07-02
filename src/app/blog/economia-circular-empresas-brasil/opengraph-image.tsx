import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Economia circular nas empresas: cases reais no Brasil";

export default async function Image() {
  return generatePostImage("Economia circular");
}
