"use server";
import { contactSchema } from "@/schemas/contact.schema";
import { createServerAction } from "zsa";
import { waitor } from "../utils";
import { ActionState } from "@/types";

// export const sendContactMessage = createServerAction()
//   .input(contactSchmea)
//   .handler(async ({ input }) => {
//     await waitor(3000, "/lib/contact.actions.ts");

//     throw new Error("das war nix");
//   });

// export const sendContactMessage = async (state: any, form: FormData) => {
//   await waitor(3000, "/lib/contact.actions.ts");

//   try {
//     // const formValues = Object.fromEntries(form);

//     // await contactSchema.parseAsync(formValues);
//     throw new Error("das war nix");
//     const result = { message: "done" };

//     return JSON.parse(
//       JSON.stringify({ ...result, error: "", status: "SUCCESS" })
//     );
//   } catch (error) {
//     console.error(error);
//     //throw new Error("das war nix2");
//     return JSON.parse(JSON.stringify({ error: error, status: "ERROR" }));
//   }
// };

export const sendContactMessage = async (
  prevState: any,
  form: FormData
): Promise<ActionState> => {
  await waitor(1000, "/lib/contact.actions.ts");
  const formValues = Object.fromEntries(form);
  const validatedFields = contactSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors as Record<
        string,
        string
      >,
      errorCode: "VALIDATION_ERROR",
      message: "Validation error",
      data: formValues,
      status: "ERROR",
    };
  }

  try {
    return {
      message: "Message successfully sent",
      status: "SUCCESS",
    };
  } catch (error) {
    console.error(error);

    return {
      error,
      errorCode: "INTERNAL_ERROR",
      message: "Internal error happened",
      data: formValues,
      status: "ERROR",
    };
  }
};
