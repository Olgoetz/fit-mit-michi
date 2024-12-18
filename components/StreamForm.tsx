"use client";

import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { streamSchema } from "@/schemas/stream.schema";

import { useServerAction } from "zsa-react";
import { createStream, editStream } from "@/lib/actions/stream.actions";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Form } from "./ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Loader2Icon, WebcamIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

import Image from "next/image";
import { log } from "@/lib/logger";
import Breadcrumbs from "./Breadcrumbs";
import { DateTimePicker } from "./ui/date-picker";
import { de } from "date-fns/locale";
import FileUploader from "./FileUploader";
import { StreamFormProps } from "@/types";

const StreamForm = (streamFormProps: StreamFormProps) => {
  const isCreation = !streamFormProps.stream;

  const streamId = streamFormProps.stream?.id;

  const serverAction = isCreation ? createStream : editStream;
  const { isPending, execute } = useServerAction(serverAction);

  const inputRef = useRef<HTMLInputElement>(null);
  const { breadcrumbs, description, stream } = streamFormProps;

  const form = useForm<z.infer<typeof streamSchema>>({
    resolver: zodResolver(streamSchema),
    defaultValues: {
      title: stream?.title || "",
      description: stream?.description || "",
      zoomLink: stream?.zoomLink || "",
      meetingId: stream?.meetingId || "",
      meetingPassword: stream?.meetingPassword || "",

      startDate: stream?.startDate || new Date(),
      price: stream?.price || 10,
      duration: stream?.duration || 0,
      imageUrl: stream?.imageUrl,
      isAvailableForSubscribers: false || stream?.isAvailableForSubscribers,
      isPublished: false || stream?.isPublished,
    },
  });

  async function onSubmit(values: z.infer<typeof streamSchema>) {
    log({
      level: "debug",
      filePath: "/components/StreamForm.tsx",
      message: "Handling Form",
      data: values,
    });
    const { imageFile, ...rest } = values;

    const payload = { id: streamId || "", ...rest };

    const [data, err] = await execute(payload);

    if (err) {
      // show a toast or something
      console.error(err.message);

      return;
    }
  }
  return (
    <>
      <Card className="w-full mx-auto flex flex-col gap-4 border-0 rounded-none shadow-none">
        <CardHeader className="p-0">
          <div className="flex items-center gap-x-2">
            <WebcamIcon className="size-16 bg-gray-100 p-2 rounded-lg text-pink-700" />
            <CardTitle>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </CardTitle>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titel</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beschreibung</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zoomLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zoomlink</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="meetingId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MeetingId</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="meetingPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preis (in €)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dauer (in min)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Datum</FormLabel>
                      <FormControl>
                        <DateTimePicker locale={de} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2 ">
                  <Controller
                    name="imageUrl"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FileUploader
                          {...field}
                          type="image"
                          onUploadComplete={(url) => {
                            form.setValue("imageUrl", url);
                            field.onChange(url);
                          }}
                        />

                        {form.getValues("imageUrl") && (
                          <Image
                            src={form.getValues("imageUrl")}
                            alt="image"
                            width={300}
                            height={300}
                          />
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="isAvailableForSubscribers"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-x-2">
                      <FormLabel>Für Abonnenten verfügbar?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-x-2">
                      <FormLabel>Veröffentlichen?</FormLabel>

                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? (
                  <Loader2Icon className="size-5 animate-spin" />
                ) : (
                  "Speichern"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* {data && <div>Message: {data}</div>}
      {error && <div>Error: {JSON.stringify(error.fieldErrors)}</div>} */}
    </>
  );
};

export default StreamForm;
