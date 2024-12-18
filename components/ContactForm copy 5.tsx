"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { sendContactMessage } from "@/lib/actions/contact.actions";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { FormError } from "./FormError";
import { Label } from "./ui/label";
import { contactSchema } from "@/schemas/contact.schema";
import { set } from "date-fns";
import { z, ZodIssue } from "zod";
import { se } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [state, dispatch, isPending] = useActionState(sendContactMessage, {
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

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);

    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("email", values.email);
    payload.append("message", values.message);
    dispatch(payload);
  }

  return (
    <div id="kontakt" className="container mx-auto max-w-[1200px] ">
      <div className="pt-20 pb-12">
        <h2 className="text-2xl md:text-4xl font-bold">Kontakt</h2>
        <p className="text-sm">So erreichst du mich</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input placeholder="Max Mustermann" {...register("name")} />

          {errors.name && (
            <FormError styles="mt-2" message={errors.name.message} />
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} placeholder="max@mustermann.de" />
          {errors.email && (
            <FormError styles="mt-2" message={errors.email.message} />
          )}
        </div>
        <div>
          <Label>Nachricht</Label>
          <Textarea {...register("message")} rows={5} />
          {errors.message && (
            <FormError styles="mt-2" message={errors.message.message} />
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
  );
};

export default ContactForm;
