import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface FormErrorProps {
  message?: string;
  styles?: string;
}
export const FormError = ({ message, styles }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div
      className={cn(
        "bg-destructive/15 p-4 flex rounded-md items-center gap-x-2 text-sm text-destructive",
        styles
      )}
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
