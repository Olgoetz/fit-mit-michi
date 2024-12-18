import sharp from "sharp";
import fs from "fs";

async function generateBlurDataURL(imagePath) {
  const buffer = await sharp(imagePath)
    .resize(10, 10) // Resize to a very small dimension
    .toBuffer();
  const base64 = `data:image/png;base64,${buffer.toString("base64")}`;
  return base64;
}

// Example usage
(async () => {
  const imagePath = "../public/heart.png"; // Path to your image
  const blurDataURL = await generateBlurDataURL(imagePath);
  console.log("BlurDataURL:", blurDataURL);
})();
