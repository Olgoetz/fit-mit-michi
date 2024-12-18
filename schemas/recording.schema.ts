import * as z from "zod";

export const recordingSchema = z.object({
  title: z
    .string({ required_error: "Titel notwendig" })
    .min(1, { message: "Titel erforderlich" }),

  description: z.string({ required_error: "Beschreibung notwendig" }).min(20, {
    message: "Beschreibung muss mindestens 20 Zeichen beinhalten.",
  }),
  // link: z.string().url({ message: "Link muss eine URL sein" }),
  price: z.coerce.number({ required_error: "Preis erforderlich" }),
  duration: z.coerce.number({ required_error: "Dauert erforderlich" }),
  imageUrl: z.string(),
  videoUrl: z.string(),
  isAvailableForSubscribers: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});
