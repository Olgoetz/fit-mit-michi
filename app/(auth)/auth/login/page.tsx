"use client";
import React from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";

import { FormError } from "@/components/FormError";
import { ReloadIcon } from "@radix-ui/react-icons";
import { logIn } from "@/actions/auth";
import { Lock } from "lucide-react";
import UserRegisterForm from "@/components/authentication/user-register-form";

interface UserSignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserLoginForm({ className, ...props }: UserSignInFormProps) {
  const { isPending, executeFormAction, isSuccess, data, isError, error } =
    useServerAction(logIn);

  // const [[data, error], submitAction, isPending] = useFormState(
  //   logIn,
  //   [null, null] // or [initialData, null]
  // );

  return (
    <div>
      <div className="flex items-center">
        <Lock className="h-8 w-8 mr-2" />
        <h2 className="text-center font-bold text-2xl">Login</h2>
      </div>
      <div className="grid gap-6 w-1/3">
        <form action={executeFormAction}>
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
              {error?.fieldErrors?.email && (
                <p className="text-red-500 text-sm">
                  {error.fieldErrors.email}
                </p>
              )}
              <Label htmlFor="password">Passwort</Label>
              <Input type="password" id="password" name="password" />
              {error?.fieldErrors?.password && (
                <p className="text-red-500 text-sm">
                  {error.fieldErrors.password}
                </p>
              )}
            </div>
            <FormError message={error?.message} />

            <Button type="submit">
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>

            {/* {isPending && <div>Loading...</div>}
            {isSuccess && <div>Success: {JSON.stringify(data)}</div>}
            {isError && <div>Error: {JSON.stringify(error)}</div>} */}
            {/* {isPending && <div>Loading...</div>}
            {data && <p>Message: {data}</p>}
            {error && <div>Error: {JSON.stringify(error.code)}</div>} */}
          </div>
        </form>
      </div>

      <UserRegisterForm />
    </div>
  );
}

export default UserLoginForm;
