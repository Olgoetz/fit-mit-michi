"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { createAccount } from "@/actions/auth";

import { ReloadIcon } from "@radix-ui/react-icons";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
  const { isPending, executeFormAction, isSuccess, data, isError, error } =
    useServerAction(createAccount, {
      onError: ({ err }) => {
        if (err.code !== "INPUT_PARSE_ERROR") {
          console.error(err);
        }
      },
    });

  return (
    <div className="w-1/3 space-y-6">
      <h2 className="text-center font-bold text-2xl">Erstelle einen Account</h2>
      <div className="grid gap-6">
        <form action={executeFormAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="foreName">Vorname</Label>
                  <Input type="text" id="foreName" name="foreName" />
                  {error?.fieldErrors?.foreName && (
                    <p className="text-red-500 text-sm">
                      {error.fieldErrors.foreName}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Nachname</Label>
                  <Input type="text" id="lastName" name="lastName" />
                  {error?.fieldErrors?.lastName && (
                    <p className="text-red-500 text-sm">
                      {error.fieldErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

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
              {error?.fieldErrors?.password && (
                <p className="text-red-500 text-sm">
                  {error.fieldErrors.password}
                </p>
              )}
              <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              {error?.fieldErrors?.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {error.fieldErrors.confirmPassword}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Account erstellen
            </Button>
            {error?.code !== "INPUT_PARSE_ERROR" && (
              <p className="text-red-500">{error?.message}</p>
            )}
            {/* {isPending && <div>Loading...</div>}
            {isSuccess && <div>Success: {JSON.stringify(data)}</div>}
            {isError && <div>Error: {JSON.stringify(error)}</div>} */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegisterForm;
