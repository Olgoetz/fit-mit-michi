"use client";

import React, { useActionState, useEffect } from "react";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { sendContactMessage } from "@/lib/actions/contact.actions";

import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { FormError } from "./FormError";
import { Label } from "./ui/label";
import { contactSchema } from "@/schemas/contact.schema";
import { z } from "zod";

const ContactForm = () => {

const initState = { name: "", email: "", message: "" }

const handleFormSubmit = async (prevState:any, formData: FormData) => {

try {

  const formValues  = Object.fromEntries(formData);

  await contactSchema.parseAsync(formValues);

} catch (error) {

  if (error instanceof z.ZodError) {
    const fieldErorrs = error.flatten().fieldErrors;

    setErrors(fieldErorrs as unknown as Record<string, string>);

    toast({
      title: "Error",
      description: "Please check your inputs and try again",
      variant: "destructive",
    });

    return { ...prevState, error: "Validation failed", status: "ERROR" };
  }

}
  
}

  const [state, formAction, isPending] = useActionState(sendContactMessage, {
    status: "INITIAL",
    message: "",
    data: initState, // Default form values
  });



  return (
    <div id="kontakt" className="container mx-auto max-w-[1200px] ">
      <div className="pt-20 pb-12">
        <h2 className="text-2xl md:text-4xl font-bold">Kontakt</h2>
        <p className="text-sm">So erreichst du mich</p>
      </div>

      <form action={formAction} className="space-y-4">
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
            <FormError styles="mt-2" message={state.validationErrors.message} />
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
