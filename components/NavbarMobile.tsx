"use client";
import React, { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import ManageSubscriptionLink from "./ManageSubscriptionLink";
import { usePathname } from "next/navigation";
import { NavbarProps } from "@/types";
import { NavbarItems } from "@/constants";

const NavbarItemStyles = "cursor-pointer rounded-lg";

const NavbarMobile = ({
  userId,
  stripeCustomerId,
  validSubscription,
}: NavbarProps) => {
  const pathName = usePathname();

  //   const user = useUser();
  //   const { data } = useQuery({
  //     queryKey: ["isUserSubscribed"],
  //     queryFn: isUserSubscribed,
  //   });

  //   const isSubscribed = data?.success;
  //   if (pathName.startsWith("/admin")) {
  //     return null;
  //   }
  return (
    <nav
      className={cn(
        "absolute top-0 left-0 w-full z-50 bg-transparent flex justify-between p-4 md:hidden",
        pathName !== "/" && "bg-gradient-to-r from-pink-700 to-pink-300"
      )}
    >
      <div>
        <Link href={"/"} className="text-center text-white text-3xl">
          FitMitMichi
        </Link>
      </div>
      <div>
        <Sheet>
          <SheetTrigger className="">
            <Menu className="size-8 text-white" />
          </SheetTrigger>
          <SheetContent
            onCloseAutoFocus={(event) => event.preventDefault()}
            className="text-white bg-pink-700 border-none"
            side={"left"}
          >
            <SheetHeader>
              <SheetTitle className="text-white text-4xl">
                FitMitMichi
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-10 flex flex-col space-y-10 text-base ">
              {NavbarItems.map((item) => (
                <SheetClose asChild key={item.label}>
                  <Link href={item.route} className={cn(NavbarItemStyles)}>
                    <li className="flex items-center">
                      <item.icon className="size-8 mr-6" />
                      {item.label}{" "}
                      {validSubscription &&
                        userId &&
                        item.label === "Kurse" &&
                        "✨"}
                    </li>
                  </Link>
                </SheetClose>
              ))}

              {validSubscription && userId && (
                <ManageSubscriptionLink
                  styles={NavbarItemStyles}
                  stripeCustomerId={stripeCustomerId as string}
                />
              )}

              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <div className="flex items-center">
                  <LogIn className="size-8 mr-6" />
                  <SignInButton>Einloggen</SignInButton>
                </div>
              </SignedOut>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavbarMobile;
