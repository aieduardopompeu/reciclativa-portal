import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Coleta seletiva no Brasil: como funciona e como participar";

export default async function Image() {
  return generatePostImage(
    "Coleta seletiva no Brasil: como funciona e como participar",
    "Guias"
  );
}
