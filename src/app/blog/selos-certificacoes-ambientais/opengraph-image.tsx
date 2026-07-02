import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Selos e certificações ambientais: o que realmente significam";

export default async function Image() {
  return generatePostImage("Sustentabilidade");
}
