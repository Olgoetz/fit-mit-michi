"use client";
import React, { useActionState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { contactSchema } from "@/schemas/contact.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { sendContactMessage } from "@/lib/actions/contact.actions";
import { useServerAction } from "zsa-react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Label } from "./ui/label";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  // Initialize `useActionState` with the server action and initial state
  const [state, formAction, isPending] = useActionState(sendContactMessage, {
    status: "INITIAL",
    message: "",
    errors: null,
  });

  // Display success or error messages based on the action state
  if (state.status === "SUCCESS") {
    toast.success(state.message || "Nachricht gesendet");
  } else if (state.status === "ERROR" && state.message) {
    toast.error(state.message);
  }

  const onSubmit = async (data: any) => {
    // Convert form data to FormData for server action
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    // Call the server action through formAction, which is now tracked by `useActionState`
    await formAction(formData);
  };

  return (
    <div id="kontakt" className="container mx-auto max-w-[1200px]">
      <h2 className="text-2xl font-bold">Kontakt</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            {...register("name")}
            placeholder="Max Mustermann"
            className="input"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <Label>Email</Label>
          <Input
            {...register("email")}
            placeholder="max@mustermann.de"
            className="input"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label>Message</Label>
          <Textarea {...register("message")} rows={5} className="textarea" />
          {errors.message && (
            <p className="text-red-600">{errors.message.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isPending} className="btn-primary">
          {isPending ? "Sending..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
