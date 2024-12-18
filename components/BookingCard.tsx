import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock, Clock, Clock12, Euro, TimerReset } from "lucide-react";
import { formatDate, formatToCurrency } from "@/lib/utils";
import BookingCardCheckoutButton from "./BookingCardCheckoutButton";
import Image from "next/image";
import { BookingCardProps, BookingItem } from "@/types";
import Countdown from "./Countdown";

// Type guard for Recording
function isRecording(item: BookingItem): item is Recording {
  if ("zoomLink" in item) return false;
  return true;
}

// Type guard for Stream
function isStream(item: BookingItem): item is Stream {
  return (item as Stream).zoomLink !== undefined; // Adjust based on your properties
}

const BookingCard = async ({ item }: BookingCardProps) => {
  return (
    <>
      <Card key={item.id}>
        <CardHeader>
          <div className="relative h-[300px] w-full">
            <Image
              className="object-cover rounded-lg"
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
          <div className="flex">
            <Euro className="size-6 mr-4" />
            <p>{formatToCurrency(item.price.toString()).replace("€", "")}</p>
          </div>

          {isStream(item) && (
            <div className="flex flex-col space-y-4">
              <div className="flex">
                <CalendarClock className="size-6 mr-4" />
                <p>{formatDate(item.startDate, true)} Uhr</p>
              </div>
              <div className="flex">
                <TimerReset className="size-6 mr-4" />
                <p>{item.duration} min</p>
              </div>
              <div className="mx-auto">
                <Countdown targetDate={item.startDate.toDateString()} />
              </div>
            </div>
          )}

          {isRecording(item) && (
            <>
              <div className="flex">
                <TimerReset className="size-6 mr-4" />
                <p>{item.duration} min</p>
              </div>
              <div className="flex">
                <CalendarClock className="size-6 mr-4" />
                <p>Gültigkeit: 10 Tage</p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <BookingCardCheckoutButton
            isRecording={isRecording(item)}
            //isStream={isStream(item)}
            itemId={item.id}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default BookingCard;
