"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const AdminLink = () => {
  const { user } = useUser();

  // Access custom role metadata
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!isAdmin) {
    return null;
  }

  return (
    <Link className="text-pink-700" href="/admin">
      Dashboard
    </Link>
  );
};

export default AdminLink;
