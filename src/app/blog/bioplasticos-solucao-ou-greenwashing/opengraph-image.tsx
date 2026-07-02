import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Bioplásticos: solução ou greenwashing? Entenda o que são e como descartar";

export default async function Image() {
  return generatePostImage(
    "Bioplásticos: solução ou greenwashing? Entenda o que são e como descartar",
    "Sustentabilidade"
  );
}
