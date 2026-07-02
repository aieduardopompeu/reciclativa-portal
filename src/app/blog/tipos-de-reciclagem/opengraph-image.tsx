import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Tipos de reciclagem: mecânica, química, energética e orgânica";

export default async function Image() {
  return generatePostImage("Reciclagem");
}
