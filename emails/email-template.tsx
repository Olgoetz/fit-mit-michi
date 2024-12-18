import * as React from "react";

import { Html, Body, Container, Tailwind } from "@react-email/components";

const env =
  process.env.NODE_ENV === "development" ? "dev" : process.env.VERCEL_ENV;

const baseUrl = {
  dev: process.env.NEXT_PUBLIC_VERCEL_URL,
  preview: `https://${process.env.VERCEL_URL}`,
  prod: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
};

let computedBaseUrl: string | undefined;
switch (env) {
  case "development":
    computedBaseUrl = baseUrl.dev;
    break;
  case "preview":
    computedBaseUrl = baseUrl.preview;
    break;
  case "production":
    computedBaseUrl = baseUrl.prod;
    break;
  default:
    computedBaseUrl = baseUrl.dev;
}

export const BookingEmailTemplate = ({
 
}) => {
  return (
    <Html>
    <Tailwind>
      <Body className="bg-wite my-auto mx-auto">
        <Container className="font-sans border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[600px]">
          <h1 className="text-2xl">Liebe(r) {customer},</h1>
          <p className="mt-8">
            Vielen Dank für deine Buchung von{" "}
            <strong>
              {product} am {date} um {time} Uhr.
            </strong>
          </p>
          <div className="my-8">
            <Img
              src={image_url}
              width="50%"
              height="50%"
              alt=""
              className="my-0 mx-auto"
            />
          </div>

          <div className="my-8">
            <p>Hier ist der Link zur Aufzeichnung:</p>
            <div className="pl-4">
              <a
                href={`${computedBaseUrl}/v/${video_id}?token=${token}`}
              >{`${computedBaseUrl}/v/${video_id}?token=${token}`}</a>
            </div>
          </div>

          <p>
            Deine Rechnung und deinen Zahlungsnachweis kannst Du hier
            herunterladen: <a href={invoice_url}>Rechnung</a>
          </p>

          <p className="my-4">Ich freue mich auf Dich!</p>
          <p>Ganz liebe Grüße,</p>
          <p>{sender}</p>
        </Container>
      </Body>
    </Tailwind>
  </Html>
  );
};
