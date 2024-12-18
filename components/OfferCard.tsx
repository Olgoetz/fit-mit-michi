import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import ActionButton from "./ActionButton";

interface OfferCardProps {
  imagePath: string;
  title: string;
  description: string;
}

const OfferCard = ({ description, title, imagePath }: OfferCardProps) => {
  return (
    <div>
      <div className="pb-4">
        <div className="relative h-[300px] w-full">
          <Image
            src={imagePath}
            alt={title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="pb-4">
        <h3 className="text-lg font-semibold pb-4">{title}</h3>
        <p className="text-muted-foreground font-light">{description}</p>
      </div>
      <div>
        <ActionButton link="/kurse" buttonText="Zu den Kursen" />
      </div>
    </div>
  );
};

export default OfferCard;
