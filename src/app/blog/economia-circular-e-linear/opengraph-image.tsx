import { generatePostImage, POST_IMAGE_SIZE } from "@/lib/og/generatePostImage";

export const size = POST_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Economia circular vs. economia linear: diferenças e exemplos";

export default async function Image() {
  return generatePostImage(
    "Economia circular vs. economia linear: diferenças e exemplos",
    "Economia circular"
  );
}
