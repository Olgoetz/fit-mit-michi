"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const SettingsLink = (props: any) => {
  const user = useUser();
  if (!user) return null;
  return (
    <Link {...props} href="/einstellungen">
      Einstellung
    </Link>
  );
};

export default SettingsLink;
