import * as React from "react";

import {
  Html,
  Body,
  Container,
  Tailwind,
  Img,
  Preview,
} from "@react-email/components";
import { EmailWrapperProps } from "@/types";

const env =
  process.env.NODE_ENV === "development" ? "dev" : process.env.VERCEL_ENV;

let computedBaseUrl: string | null;
switch (env) {
  case "development":
    computedBaseUrl = "/static";
    break;
  case "preview":
    computedBaseUrl = `https://${process.env.VERCEL_URL}`;
    break;
  case "production":
    computedBaseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    break;
  default:
    computedBaseUrl = "/static";
}

export const BookingEmailWrapper = (props: EmailWrapperProps) => {
  const { invoiceUrl, imageUrl, customer, children, bookingText } = props;

  return (
    <Html>
      <Tailwind>
        <Body className="bg-wite my-auto mx-auto ">
          <Container className="font-sans border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]">
            <Preview>Vielen Dank für deine Buchung</Preview>
            <h1 className="text-2xl">Liebe(r) {customer},</h1>
            <p className="mt-8">
              Vielen Dank für deine Buchung von <strong>{bookingText}</strong>
            </p>
            <div className="my-8">
              <Img
                src={imageUrl}
                width="50%"
                height="50%"
                alt=""
                className="my-0 mx-auto"
              />
            </div>

            {children}

            <p className="my-10 leading-loose">
              Deine Rechnung und deinen Zahlungsnachweis kannst Du hier
              herunterladen: <a href={invoiceUrl}>Rechnung</a>
            </p>

            <p>Ich freue mich auf Dich!</p>
            <p>Ganz liebe Grüße,</p>
            <Img
              src={`${computedBaseUrl}/heart.png`}
              width="30"
              height="30"
              alt="Heart Icon"
            />
            <p>Michaela</p>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
