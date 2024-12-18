"use client";

import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { contactSchmea } from "@/schemas/contact.schema";
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

const ContactForm = () => {
  const form = useForm<z.infer<typeof contactSchmea>>({
    resolver: zodResolver(contactSchmea),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isPending, execute } = useServerAction(sendContactMessage);

  async function onSubmit(values: z.infer<typeof contactSchmea>) {
    const [data, err] = await execute(values);

    if (err) {
      // show a toast or something
      console.error(err.data);
      toast.error(
        "Etwas ist schief gelaufen. Versuche es bitte später nochmal oder direkt via Email!"
      );
      return;
    }
    form.reset();
  }

  return (
    <div id="kontakt" className="container mx-auto max-w-[1200px] ">
      <div className="pt-20 pb-12">
        <h2 className="text-2xl md:text-4xl font-bold">Kontakt</h2>
        <p className="text-sm">So erreichst du mich</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Max Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email-Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="max@mustermann..de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachricht</FormLabel>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
      </Form>
    </div>
  );
};

export default ContactForm;
