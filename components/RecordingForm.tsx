"use client";

import React, { Suspense, use, useEffect, useState } from "react";

// Actions
import { useServerAction } from "zsa-react";
import {
  createRecording,
  editRecording,
} from "@/lib/actions/recording.actions";

// Hooks
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Next
import Image from "next/image";
import Player from "next-video/player";
import Video from "next-video";

// UI Components
import Breadcrumbs from "./Breadcrumbs";
import FileUploader from "./FileUploader";
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
import { Loader2Icon, VideoIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

// Schemas
import { z } from "zod";
import { recordingSchema } from "@/schemas/recording.schema";

// Types
import { RecordingFormProps } from "@/types";
import { Skeleton } from "./ui/skeleton";

const RecordingForm = (recordingFormProps: RecordingFormProps) => {
  const isCreation = !recordingFormProps.recording;

  const recordingId = recordingFormProps.recording?.id;
  const { isPending, execute } = isCreation
    ? useServerAction(createRecording)
    : useServerAction(editRecording);

  const { description, recording, breadcrumbs } = recordingFormProps;

  const form = useForm<z.infer<typeof recordingSchema>>({
    resolver: zodResolver(recordingSchema),
    defaultValues: {
      title: recording?.title || "",
      description: recording?.description || "",
      price: recording?.price || 10,
      duration: recording?.duration || 0,
      imageUrl: recording?.imageUrl || "",
      videoUrl: recording?.videoUrl || "",
      isAvailableForSubscribers: recording?.isAvailableForSubscribers || false,
      isPublished: recording?.isPublished || false,
    },
  });

  async function onSubmit(values: z.infer<typeof recordingSchema>) {
    const payload = { id: recordingId || "", ...values };

    const [data, err] = await execute(payload);
    console.log("data", data);

    if (err) {
      // show a toast or something
      console.error(err);
      return;
    }
    // form.reset();
  }
  return (
    <>
      <Card className="w-full mx-auto flex flex-col gap-4 border-0 rounded-none shadow-none">
        <CardHeader className="p-0">
          <div className="flex items-center gap-x-2">
            <VideoIcon className="size-16 bg-gray-100 p-2 rounded-lg text-pink-700" />
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

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className=" flex flex-col items-center gap-2 ">
                  <Controller
                    name="imageUrl"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FileUploader
                          {...field}
                          type="image"
                          onUploadComplete={(url) => {
                            //form.setValue("imageUrl", url);
                            field.onChange(url);
                          }}
                        />

                        {form.getValues("imageUrl") && (
                          <Suspense
                            fallback={<Skeleton className="h-full w-full" />}
                          >
                            <div className="relative h-full w-full">
                              <Image
                                src={form.getValues("imageUrl")}
                                alt="image"
                                //  width={300}
                                //   height={300}
                                sizes="33vw"
                                fill
                                className="rounded-lg object-cover"
                              />
                            </div>
                          </Suspense>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col items-center gap-2 ">
                  <Controller
                    name="videoUrl"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FileUploader
                          {...field}
                          type="video"
                          onUploadComplete={(url) => {
                            //       form.setValue("videoUrl", url);
                            field.onChange(url);
                          }}
                        />

                        {form.getValues("videoUrl") && (
                          <div className="py-[4px] relative rounded-lg bg-black">
                            <Player
                              src={form.getValues("videoUrl")}
                              //   blurDataURL="data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDggNSc+CiAgICAgIDxmaWx0ZXIgaWQ9J2InIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0nc1JHQic+CiAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMScgLz4KICAgICAgPC9maWx0ZXI+CgogICAgICA8aW1hZ2UgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZScgZmlsdGVyPSd1cmwoI2IpJyB4PScwJyB5PScwJyBoZWlnaHQ9JzEwMCUnIHdpZHRoPScxMDAlJyAKICAgICAgaHJlZj0nZGF0YTppbWFnZS9hdmlmO2Jhc2U2NCwvOWovMndCREFBZ0dCZ2NHQlFnSEJ3Y0pDUWdLREJRTkRBc0xEQmtTRXc4VUhSb2ZIaDBhSEJ3Z0pDNG5JQ0lzSXh3Y0tEY3BMREF4TkRRMEh5YzVQVGd5UEM0ek5ETC8yd0JEQVFrSkNRd0xEQmdORFJneUlSd2hNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpML3dBQVJDQUFMQUJBREFTSUFBaEVCQXhFQi84UUFGZ0FCQVFFQUFBQUFBQUFBQUFBQUFBQUFCZ01GLzhRQUpoQUFBUU1EQXdJSEFBQUFBQUFBQUFBQUFnRURCQUFGRVFZU0lTSXhFekl6UVdHQnNmL0VBQlVCQVFFQUFBQUFBQUFBQUFBQUFBQUFBQU1FLzhRQUdoRUFBZ0lEQUFBQUFBQUFBQUFBQUFBQUFRTUFBaEVTVWYvYUFBd0RBUUFDRVFNUkFEOEFscU9VellyVEJnVzlsMHJnWWtTdW42ZTdzTzNudlFwKzRQWjJTNUxiNWtYV1lwakhIdGo1L0tjTk1OUzdoR2VrRDRyamFFb2tTcXVPblAzeldmcWFGRkNJOCtNZHRIY2VkQjVvV2tCdUJLMFVBcnQyZi8vWicgLz4KICAgIDwvc3ZnPgogIA=="
                            ></Player>
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>
                {/* <div className="flex flex-col items-center gap-2 ">
                  <FileUploader type="image" onUploadComplete={setImageUrl} />
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt="image"
                      width={300}
                      height={300}
                    />
                  )}
                </div> */}
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

export default RecordingForm;
