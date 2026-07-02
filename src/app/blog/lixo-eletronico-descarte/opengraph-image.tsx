import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Lixo eletrônico: como descartar corretamente sem poluir";

export default async function Image() {
  return generatePostImage(
    "Lixo eletrônico: como descartar corretamente sem poluir",
    "Sustentabilidade"
  );
}
