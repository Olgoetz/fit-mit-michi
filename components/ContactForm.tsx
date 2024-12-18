"use client";

import React, { useActionState, useEffect } from "react";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { sendContactMessage } from "@/lib/actions/contact.actions";

import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { FormError } from "./FormError";
import { Label } from "./ui/label";

const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(sendContactMessage, {
    status: "INITIAL",
    message: "",
    data: { name: "", email: "", message: "" }, // Default form values
  });

  useEffect(() => {
    if (state.status === "SUCCESS") toast.success("Nachricht gesendet");
    if (state.errorCode === "VALIDATION_ERROR")
      toast.error("Validierungsfehler! Bitte überprüfe deine Eingaben");
    if (state.errorCode === "INTERNAL_ERROR")
      toast.error(
        "Interner Fehler! Bitte versuche es später nochmal oder kontaktiere mich direkt via Email."
      );
  }, [state]);

  return (
    <div id="kontakt" className=" container mx-auto max-w-[1200px] ">
      <div className="pb-12">
        <h2 className="text-2xl md:text-4xl font-bold">Kontakt</h2>
        <p className="text-pink-500 text-base">So erreichst du mich</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 w-full justify-center-center">
        <Image
          src="/michi_workout1.jpg"
          alt="Michaela Workout"
          width={400}
          height={400}
          className="rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <form action={formAction} className="space-y-4 md:col-span-2">
          <div>
            <Label>Name</Label>
            <Input
              defaultValue={state.data?.name}
              required
              name="name"
              placeholder="Max Mustermann"
            />
            {state.validationErrors && (
              <FormError styles="mt-2" message={state.validationErrors.name} />
            )}
          </div>
          <div>
            <Label>Email</Label>
            <Input
              defaultValue={state.data?.email}
              required
              name="email"
              placeholder="max@mustermann.de"
            />
            {state.validationErrors && (
              <FormError styles="mt-2" message={state.validationErrors.email} />
            )}
          </div>
          <div>
            <Label>Nachricht</Label>
            <Textarea
              defaultValue={state.data?.message}
              required
              name="message"
              rows={5}
            />
            {state.validationErrors && (
              <FormError
                styles="mt-2"
                message={state.validationErrors.message}
              />
            )}
          </div>
          <Button disabled={isPending}>
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin mr-4" />
                Sende
              </>
            ) : (
              "Abschicken"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
