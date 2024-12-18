"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check } from "lucide-react";
import { formatToCurrency } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import { PriceModelContent } from "@/types";
import { createCheckOutSession } from "@/lib/actions/stripe.actions";
import { sub } from "date-fns";
import { Badge } from "./ui/badge";

const payAsYouGo: PriceModelContent = {
  title: "Individuell",
  description: "Kein monatlicher Beitrag",
  price: formatToCurrency("14"),
  bullets: [
    "ohne Anmeldung möglich",
    "10 Tage Zugang zum Video",
    "Videolink per Mail",
    "Zoomlink per Mail",
    "Rechnung per Mail",
    "Paypal, Kreditkarte akzeptiert",
  ],
};

const subscriptions: PriceModelContent[] = [
  {
    title: "Premium",

    description: "Fixer Preis pro Monat",
    price: formatToCurrency("24.99"),
    bullets: [
      "einmalige Anmeldung",
      "unbegrenzter Zugang zur gesamten Bibliothek",
      "selbständiges Verwalten der Mitgliedschaft",
      "Rechnung als Download",
      "HD Videos aus Spanien und Italien",
      "Paypal, Kreditkarte akzeptiert",
    ],
    popular: true,
    subscriptionType: "standard",
  },
  {
    title: "Standard",

    description: "Fixer Preis pro Monat",
    price: formatToCurrency("19.99"),
    bullets: [
      "einmalige Anmeldung",
      "unbegrenzter Zugang zur gesamten Bibliothek",
      "selbständiges Verwalten der Mitgliedschaft",
      "Rechnung als Download",
      "Paypal, Kreditkarte akzeptiert",
    ],
    popular: false,
    subscriptionType: "standard",
  },
];

const Prices = () => {
  return (
    <div
      id="preise"
      className="mb-24 container mx-auto max-w-[1200px] bg-gray-100 p-8 rounded-lg"
    >
      <div className="pb-12">
        <h2 className="text-2xl md:text-4xl font-bold">Preise</h2>
        <p className="text-pink-500 text-base">
          Buche einmalig oder werde Mitglied
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              {payAsYouGo.title}
            </CardTitle>
            <div>
              <span className="text-3xl font-bold">{payAsYouGo.price}</span>
              <span className="text-muted-foreground">/pro Kurs/Video</span>
            </div>
            <CardDescription>{payAsYouGo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size={"lg"} className="color-gradient  text-white">
              <Link href="/kurse">Kurs buchen</Link>
            </Button>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {payAsYouGo.bullets.map((e: string) => (
                <span key={e} className="flex">
                  <Check className="text-pink-500" />{" "}
                  <h3 className="ml-2">{e}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>

        {/* Subscriptions  */}
        {subscriptions.map((s: PriceModelContent) => (
          <Card key={s.title}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {s.title}
                {s.popular && <Badge>Am beliebtesten</Badge>}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">{s.price}</span>
                <span className="text-muted-foreground">/pro Monat</span>
              </div>
              <CardDescription>{s.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size={"lg"}
                className="color-gradient  text-white"
                onClick={() =>
                  createCheckOutSession(s.subscriptionType!, "subscription")
                }
              >
                Mitgliedschaft abschließen
              </Button>
            </CardContent>
            <hr className="w-4/5 m-auto mb-4" />
            <CardFooter className="flex">
              <div className="space-y-4">
                {s.bullets.map((e: string) => (
                  <span key={e} className="flex">
                    <Check className="text-pink-500 shrink-0" />{" "}
                    <h3 className="ml-2">{e}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Prices;
