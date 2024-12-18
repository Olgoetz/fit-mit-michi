import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const ActionButton = ({
  buttonText,
  link,
}: {
  buttonText: string;
  link: string;
}) => {
  return (
    <div>
      <Button
        asChild
        className="inline-flex h-12 text-white animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <Link href={link}>{buttonText}</Link>
      </Button>
    </div>
  );
};

export default ActionButton;
