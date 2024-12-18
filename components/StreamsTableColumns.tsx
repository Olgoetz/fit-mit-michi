"use client";

import { Stream } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { deleteStream, duplicateStream } from "@/lib/actions/stream.actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Copy, Edit2Icon, MoreHorizontal, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";

import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const streamColumns: ColumnDef<Stream>[] = [
  {
    header: "Veröffentlicht",
    accessorKey: "isPublished",
    cell: ({ row }) => {
      return row.original.isPublished ? "Ja" : "Nein";
    },
  },
  {
    header: "Titel",
    accessorKey: "title",
  },
  // {
  //   header: "Beschreibung",
  //   accessorKey: "description",
  // },
  {
    header: "Preis (in €)",
    accessorKey: "price",
  },
  {
    header: "Dauer (in min)",
    accessorKey: "duration",
  },

  // {
  //   header: "Erstellt am",
  //   accessorKey: "createdAt",
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.createdAt);
  //     return date.toLocaleDateString("de-DE");
  //   },
  // },
  // {
  //   header: "Aktualisiert am",
  //   accessorKey: "updatedAt",
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.updatedAt);
  //     return date.toLocaleDateString("de-DE");
  //   },
  // },
  {
    header: "Beginn",
    accessorKey: "startDate",
    cell: ({ row }) => {
      if (row.original.startDate < new Date()) {
        return <span className="text-red-500">beendet</span>;
      }
      return formatDate(row.original.startDate, true);
    },
  },
  {
    header: "Für Abonnenten verfügbar?",
    accessorKey: "isAvailableForSubscribers",
    cell: ({ row }) => {
      return row.original.isAvailableForSubscribers ? "Ja" : "Nein";
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const stream = row.original;
      const deleteStr = async (id: string) => {
        try {
          await deleteStream(id);
          toast.success("Stream erfolgreich gelöscht");
        } catch (error) {
          console.error("Fehler beim Löschen des Streams:", error);
          toast.error("Fehler beim Löschen des Streams");
        }
      };
      return (
        <>
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Löschvorgang</AlertDialogTitle>
                <AlertDialogDescription>
                  Möchstet du den Stream wirklich löschen?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => deleteStr(stream.id)}
                >
                  Bestätigen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href={`/admin/streams/${stream.id}/bearbeiten`}>
                    <Edit2Icon className="size-4 mr-2" /> Bearbeiten
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => duplicateStream(stream.id)}
                >
                  <Copy className="size-4 mr-2" /> Duplizieren
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-red-500 cursor-pointer">
                    <TrashIcon className="size-4 mr-2" /> <p>Löschen</p>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </AlertDialog>
        </>
      );
    },
  },
];
