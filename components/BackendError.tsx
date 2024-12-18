import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { BackendErrorProps } from "@/types";

const BackendError = (props: BackendErrorProps) => {
  const { route, message, directionText } = props;
  return (
    <div className="flex flex-col max-w-[700px] mx-auto place-content-center place-items-center h-full gap-4">
      <div className="bg-destructive/15 p-4 flex flex-col rounded-md items-center space-y-4 text-xl text-destructive">
        <ExclamationTriangleIcon className="size-16" />
        <p>
          {message ||
            "Etwas ist schief gelaufen. Bitte versuche später nochmal!"}
        </p>
        <Button className="w-[200px]" asChild>
          <Link href={route}>{directionText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default BackendError;
