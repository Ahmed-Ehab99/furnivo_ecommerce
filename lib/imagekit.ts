import ImageKit from "imagekit";
import { env } from "./env";

// Server-side ImageKit instance (with private key)
export const imagekit = new ImageKit({
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
});

// Client-side safe config (no private key)
export const imagekitConfig = {
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
};

/**
 * Generate ImageKit URL for an image
 * @param path - Image path in ImageKit (e.g., "categories/living-room/chair1.webp")
 * @param transformations - Optional transformations
 */
export function getImageKitUrl(
  path: string,
  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "jpg" | "png";
  },
): string {
  const params: string[] = [];

  if (transformations) {
    if (transformations.width) params.push(`w-${transformations.width}`);
    if (transformations.height) params.push(`h-${transformations.height}`);
    if (transformations.quality) params.push(`q-${transformations.quality}`);
    if (transformations.format) params.push(`f-${transformations.format}`);
  }

  const transformationString =
    params.length > 0 ? `tr:${params.join(",")}` : "";
  const separator = transformationString ? "/" : "";

  return `${env.IMAGEKIT_URL_ENDPOINT}${separator}${transformationString}/${path}`;
}
