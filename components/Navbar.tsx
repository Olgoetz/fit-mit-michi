"use client";
import { cn } from "@/lib/utils";
import { NavbarItem, NavbarProps } from "@/types";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { isUserSubscribed } from "@/lib/actions/subscription.actions";
import ManageSubscriptionLink from "./ManageSubscriptionLink";
import { NavbarItems } from "@/constants";

const NavbarItemStyles = "cursor-pointer p-2 rounded-lg  hover:bg-slate-300/50";
const Navbar = ({
  userId,
  stripeCustomerId,
  validSubscription,
}: NavbarProps) => {
  const pathName = usePathname();

  // const user = useUser();
  // const { data } = useQuery({
  //   queryKey: ["isUserSubscribed"],
  //   queryFn: isUserSubscribed,
  // });

  //const isSubscribed = false;
  // const isSubscribed = data?.success;
  // if (pathName.startsWith("/admin")) {
  //   return null;
  // }

  return (
    <nav
      className={cn(
        "hidden md:flex absolute left-0 top-0 z-50 justify-between px-4 p-4 text-white w-full bg-transparent",
        pathName !== "/" && "bg-gradient-to-r from-pink-700 to-pink-300"
      )}
    >
      <Link href={"/"} className="text-center  text-3xl">
        FitMitMichi
      </Link>

      <ul className="flex gap-x-4 items-center justify-between ">
        {NavbarItems.map((item) => (
          <Link
            key={item.label}
            href={item.route}
            className={cn(
              NavbarItemStyles,
              pathName === item.route && "bg-slate-300/50"
            )}
          >
            <li>
              {item.label}{" "}
              {validSubscription &&
                // user.isSignedIn &&
                userId &&
                item.label === "Kurse" &&
                "✨"}
            </li>
          </Link>
        ))}

        {validSubscription && userId && (
          <ManageSubscriptionLink
            styles={NavbarItemStyles}
            stripeCustomerId={stripeCustomerId as string}
          />
        )}
        {/* <SettingsLink
          className={cn(
             NavbarItemStyles,
            pathName === "einstellungen" && "bg-slate-300/50"
          )}
        /> */}

        <SignedIn>
          {/* <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
            >
            Dashboard
            </Link> */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className={NavbarItemStyles}>Einloggen</button>
          </SignInButton>
        </SignedOut>
      </ul>
      {/* <div className="float-right">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div> */}
    </nav>
  );
};

export default Navbar;
