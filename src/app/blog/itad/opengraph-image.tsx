import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "ITAD: o que é e como funciona (IT Asset Disposition)";

export default async function Image() {
  return generatePostImage("Sustentabilidade");
}
