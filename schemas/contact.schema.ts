import * as z from "zod";

export const contactSchema = z.object({
  name: z
    .string({ required_error: "Name notwendig" })
    .min(1, { message: "Name erforderlich" }),

  email: z.string().email({ message: "Gültige Email-Adresse erforderlich" }),
  message: z
    .string()
    .min(10, { message: "Nachricht muss mindestsn 10 Zeichen enthalten" }),
});
