import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarClock,
  Clock,
  Clock12,
  Euro,
  LinkIcon,
  TextCursorInput,
  TimerReset,
  VaultIcon,
} from "lucide-react";
import { formatDate, formatToCurrency } from "@/lib/utils";
import BookingCardCheckoutButton from "./BookingCardCheckoutButton";
import Image from "next/image";
import { BookingCardProps, BookingItem } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";
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
  const StreamCardBody = (item: Stream) => {
    return (
      <div>
        <CardContent className="space-y-4">
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>

          <div className="flex flex-col space-y-4">
            <div className="flex">
              <CalendarClock className="size-6 mr-4" />
              <p>{formatDate(item.startDate, true)} Uhr</p>
            </div>
            <div className="flex">
              <TimerReset className="size-6 mr-4" />
              <p>Dauer: {item.duration} min</p>
            </div>
            <div className="flex">
              <TextCursorInput className="size-6 mr-4" />
              <p>ID: {item.meetingId}</p>
            </div>
            <div className="flex">
              <VaultIcon className="size-6 mr-4" />
              <p>Password: {item.meetingPassword}</p>
            </div>
            <div className="mx-auto">
              <Countdown targetDate={item.startDate.toDateString()} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="color-gradient w-full hover:opacity-70">
            <Link href={item.zoomLink}>Teilnehmen</Link>
          </Button>
        </CardFooter>
      </div>
    );
  };
  const RecordingCardBody = (item: Recording) => {
    return (
      <div>
        <CardContent className="space-y-4">
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>

          <div className="flex flex-col space-y-4">
            <div className="flex">
              <TimerReset className="size-6 mr-4" />
              <p>Dauer: {item.duration} min</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="color-gradient w-full hover:opacity-70">
            <Link href="#">Jetzt trainieren</Link>
          </Button>
        </CardFooter>
      </div>
    );
  };
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
            />
          </div>
        </CardHeader>

        {isStream(item) && StreamCardBody(item)}
        {isRecording(item) && RecordingCardBody(item)}
      </Card>
    </>
  );
};

export default BookingCard;

{
  /* <CardContent className="space-y-4">
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>

          {isStream(item) && (
            <div className="flex flex-col space-y-4">
              <div className="flex">
                <CalendarClock className="size-6 mr-4" />
                <p>{formatDate(item.startDate, true)} Uhr</p>
              </div>
              <div className="flex">
                <Link className="size-6 mr-4" />
                <p>{item.zoomLink}</p>
              </div>
            </div>
          )}

          <div className="flex">
            <TimerReset className="size-6 mr-4" />
            <p>{item.duration} min</p>
          </div>
          {/* 
          {isRecording(item) && (
            <div className="flex">
              <CalendarClock className="size-6 mr-4" />
              <p>Gültigkeit: 10 Tage</p>
            </div>
          )} */
}
//   </CardContent>
//   <CardFooter>
//     <BookingCardCheckoutButton
//       isRecording={isRecording(item)}
//       //isStream={isStream(item)}
//       itemId={item.id}
//     />
//   </CardFooter>
// </Card> */}
