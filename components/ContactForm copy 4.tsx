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
import { ZodIssue } from "zod";
import { se } from "date-fns/locale";

const ContactForm = () => {
  let _form = {
    name: "",
    email: "",
    message: "",
  };
  const [formValues, setFormValues] = useState(_form);
  const [formErrors, setFormErrors] = useState(_form);
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

  function formAction(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    setFormValues((prev) => ({ ...prev, ...data }));
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      result.error?.flatten((issue: ZodIssue) => {
        setFormErrors((prev) => ({
          ...prev,
          [issue.path[0]]: issue.message,
        }));
      });
      return;
    }

    dispatch(formData);
  }

  function validate(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    // Validate only the field being modified
    const fieldSchema =
      contactSchema.shape[name as keyof typeof contactSchema.shape]; // Extract the specific field schema
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      // Set error for the specific field
      setFormErrors((prev) => ({
        ...prev,
        [name]: result.error.errors[0].message,
      }));
    } else {
      // Clear error for the specific field
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

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
            defaultValue={formValues.name}
            onChange={validate}
            name="name"
            placeholder="Max Mustermann"
          />
          {formErrors.name && (
            <FormError styles="mt-2" message={formErrors.name} />
          )}
          {state.validationErrors && (
            <FormError styles="mt-2" message={state.validationErrors.name} />
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input
            defaultValue={state.data?.email}
            name="email"
            onChange={validate}
            placeholder="max@mustermann.de"
          />
          {formErrors.email && (
            <FormError styles="mt-2" message={formErrors.email} />
          )}
          {state.validationErrors && (
            <FormError styles="mt-2" message={state.validationErrors.email} />
          )}
        </div>
        <div>
          <Label>Nachricht</Label>
          <Textarea
            defaultValue={state.data?.message}
            name="message"
            onChange={validate}
            rows={5}
          />
          {formErrors.message && (
            <FormError styles="mt-2" message={formErrors.message} />
          )}
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
