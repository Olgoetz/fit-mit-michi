// import { NextApiRequest, NextApiResponse } from "next";
// import sharp from "sharp";
// import axios from "axios";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { imageUrl } = req.body;

//   if (!imageUrl) {
//     return res.status(400).json({ message: "Image URL is required" });
//   }

//   try {
//     // Fetch the image
//     const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
//     const buffer = Buffer.from(response.data);

//     // Generate a low-quality version of the image
//     const resizedBuffer = await sharp(buffer)
//       .resize(10, 10, { fit: "inside" })
//       .toBuffer();

//     // Encode to base64
//     const blurDataURL = `data:image/png;base64,${resizedBuffer.toString(
//       "base64"
//     )}`;

//     res.status(200).json({ blurDataURL });
//   } catch (error) {
//     console.error("Error generating blurDataURL:", error);
//     res.status(500).json({ message: "Error generating blurDataURL" });
//   }
// }
