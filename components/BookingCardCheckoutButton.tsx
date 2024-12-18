"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { createCheckOutSession } from "@/lib/actions/stripe.actions";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

interface BookingCardCheckoutButtonProps {
  itemId: string;
  isRecording?: boolean;
}

const BookingCardCheckoutButton = ({
  itemId,
  isRecording,
}: BookingCardCheckoutButtonProps) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  let type = isRecording ? "recording" : "stream";

  async function handleCheckout() {
    setIsProcessing(true);
    const result = await createCheckOutSession(itemId, type);
    if (result?.error) {
      toast.error("Fehler beim Erstellen der Checkout Session");
    }

    setIsProcessing(false);
  }
  return (
    <div className="w-full">
      <Button
        disabled={isProcessing}
        className="color-gradient w-full hover:opacity-70"
        onClick={handleCheckout}
      >
        {isProcessing ? <Loader2Icon className="animate-spin" /> : "Buchen"}
      </Button>
    </div>
  );
};

export default BookingCardCheckoutButton;
