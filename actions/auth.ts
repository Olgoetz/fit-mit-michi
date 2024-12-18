"use server";

import { createServerAction } from "zsa";
import { loginSchema } from "../schemas/auth.schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

// export async function login(prevState: string | undefined, formData: FormData) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error: any) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }

export const logIn = createServerAction()
  .input(loginSchema, {
    type: "formData",
  })
  .handler(async ({ input }) => {
    // await signIn("credentials", { ...input, redirectTo: "/" });
    try {
      await signIn("credentials", { ...input });
    } catch (error: any) {
      console.log("error", error.type);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            throw "Ungültige Anmeldedaten.";
          default:
            throw "Interner Serverfehler";
        }
      }
      redirect("/");
    }
  });
