import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Reciclagem de plástico: tipos, símbolos e como separar corretamente";

export default async function Image() {
  return generatePostImage(
    "Reciclagem de plástico: tipos, símbolos e como separar corretamente",
    "Reciclagem"
  );
}
