import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Cores da coleta seletiva: padrão, variações e como não errar";

export default async function Image() {
  return generatePostImage(
    "Cores da coleta seletiva: padrão, variações e como não errar",
    "Guias"
  );
}
