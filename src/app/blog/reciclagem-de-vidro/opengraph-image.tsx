import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Reciclagem de vidro: por que ele é infinitamente reciclável e como descartar certo";

export default async function Image() {
  return generatePostImage("Reciclagem");
}
