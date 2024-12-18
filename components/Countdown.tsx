"use client";

import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = (date: string) => {
      const now = new Date().getTime();
      const target = new Date(date).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return null; // Countdown finished
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Set initial time left
    setTimeLeft(calculateTimeLeft(targetDate));

    // Update time left every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <p>Live Stream gestarted!</p>;
  }

  return (
    <div className="flex space-x-2 text-center">
      <div>
        <p className="text-2xl font-bold">{timeLeft.days}</p>
        <p>Tag(e)</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{timeLeft.hours}</p>
        <p>Stunden</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{timeLeft.minutes}</p>
        <p>Minuten</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{timeLeft.seconds}</p>
        <p>Sekunden</p>
      </div>
    </div>
  );
};

export default Countdown;
