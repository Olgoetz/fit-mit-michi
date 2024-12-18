import React from "react";
import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";

import { ReloadIcon } from "@radix-ui/react-icons";
import { AuthError } from "next-auth";

interface UserSignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserSignInForm({ className, ...props }: UserSignInFormProps) {
  //   const { isPending, executeFormAction, isSuccess, data, isError, error } =
  //     useServerAction(createAccount, {
  //       onError: ({ err }) => {
  //         if (err.code !== "INPUT_PARSE_ERROR") {
  //           console.error(err);
  //         }
  //       },
  //     });

  return (
    <div className="w-1/3 space-y-6">
      <h2 className="text-center font-bold text-2xl">Erstelle einen Account</h2>
      <div className="grid gap-6">
        <form
          action={async (formData: any) => {
            "use server";
            try {
              await signIn("credentials", formData);
            } catch (error: any) {
              if (error instanceof AuthError) {
                switch (error.type) {
                  case "CredentialsSignin":
                    return "Invalid credentials.";
                  default:
                    return "Something went wrong.";
                }
              }
              throw error;
            }
          }}
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
              <Label htmlFor="password">Passwort</Label>
              <Input type="password" id="password" name="password" />
              {/* {error?.fieldErrors?.password && (
                <p className="text-red-500 text-sm">
                  {error.fieldErrors.password}
                </p>
              )} */}
            </div>
            <Button type="submit">
              {/* {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )} */}
              Login
            </Button>
            {/* {error?.code !== "INPUT_PARSE_ERROR" && (
              <p className="text-red-500">{error?.message}</p>
            )} */}
            {/* {isPending && <div>Loading...</div>}
            {isSuccess && <div>Success: {JSON.stringify(data)}</div>}
            {isError && <div>Error: {JSON.stringify(error.message)}</div>} */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignInForm;
