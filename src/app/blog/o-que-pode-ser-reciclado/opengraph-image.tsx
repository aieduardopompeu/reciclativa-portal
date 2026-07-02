import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "O que pode ser reciclado: guia rápido para acertar no descarte";

export default async function Image() {
  return generatePostImage(
    "O que pode ser reciclado: guia rápido para acertar no descarte",
    "Guias"
  );
}
