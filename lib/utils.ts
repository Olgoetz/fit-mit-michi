import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { log } from "./logger";
import { getRecordingById } from "./actions/recording.actions";
import { getStreamById } from "./actions/stream.actions";

// import sharp from "sharp";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waitor(ms: number, filePath: string) {
  log({
    level: "debug",
    filePath,
    message: `Waiting for ${ms / 1000} seconds`,
  });
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatToCurrency(input: string) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(parseFloat(input));
}

export function formatDate(input: Date, addTime = false) {
  if (!addTime) {
    return input.toLocaleDateString("de-DE");
  }
  return input.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function getProductById(type: string, productId: string) {
  if (type === "recording") {
    const recording = await getRecordingById(productId);
    return recording;
  }
  if (type === "stream") {
    const recording = await getStreamById(productId);
    return recording;
  }

  return null;
}

/**
 * Format a string for a URL
 * @param input
 * @returns {string} URL
 */
export function formatForUrl(input: string): string {
  if (typeof input !== "string") {
    throw new Error("Input must be a string");
  }

  // Trim whitespace
  const trimmedInput = input.trim();

  // Encode unsafe characters
  const encodedInput = encodeURIComponent(trimmedInput);

  return encodedInput;
}

// export async function generateBlurDataURL(imageUrl: string) {
//   try {
//     // Fetch the image from the remote URL
//     const response = await fetch(imageUrl);

//     // Ensure the response is successful
//     if (!response.ok) {
//       throw new Error(`Failed to fetch image: ${response.statusText}`);
//     }

//     // Convert the response body into a Buffer
//     const arrayBuffer = await response.arrayBuffer();
//     const imageBuffer = Buffer.from(arrayBuffer);

//     // Resize the image to a small size (e.g., 10x10 pixels)
//     const resizedBuffer = await sharp(imageBuffer)
//       .resize(10, 10, { fit: "inside" })
//       .toBuffer();

//     // Convert the resized image buffer to a Base64-encoded string
//     const base64 = resizedBuffer.toString("base64");

//     // Construct the Data URL
//     const mimeType = response.headers.get("content-type") || "image/jpeg"; // Default to JPEG
//     return `data:${mimeType};base64,${base64}`;
//   } catch (error) {
//     console.error("Error generating blurDataURL:", error);
//     return null;
//   }
// }
