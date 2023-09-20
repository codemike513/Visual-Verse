import { ImageResults, ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImageResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });
    if (!res.ok) {
      throw new Error("Fetch Images Error!\n");
    }

    const imageResults: ImageResults = await res.json();

    // console.log(imageResults);

    // Parse Data with Zod Schema
    const parsedData = ImagesSchemaWithPhotos.parse(imageResults);

    if (parsedData.total_results === 0) return undefined;

    return parsedData;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
