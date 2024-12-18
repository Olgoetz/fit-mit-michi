"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { log } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import BackendError from "@/components/BackendError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service

    log({
      level: "error",
      filePath: "/app/admin/streams/%5Bid%5D/bearbeiten/error.tsx",
      message: "An error occurred",
      data: error,
    });
  }, [error]);

  return (
    <BackendError
      route="/admin/streams"
      //  message={error.message}
      directionText="Zurück zu Streams"
    />
  );
}
