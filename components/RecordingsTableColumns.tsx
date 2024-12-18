"use client";

import { Recording } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import {
  deleteRecording,
  duplicateRecording,
} from "@/lib/actions/recording.actions";

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

export const recordingColumns: ColumnDef<Recording>[] = [
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
  {
    header: "Für Abonnenten verfügbar?",
    accessorKey: "isAvailableForSubscribers",
    cell: ({ row }) => {
      return row.original.isAvailableForSubscribers ? "Ja" : "Nein";
    },
  },
  {
    header: "Erstellt am",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("de-DE");
    },
  },
  // {
  //   header: "Aktualisiert am",
  //   accessorKey: "updatedAt",
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.updatedAt);
  //     return date.toLocaleDateString("de-DE");
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const recording = row.original;
      const deleteRec = async (id: string) => {
        try {
          await deleteRecording(id);
          toast.success("Aufnahme erfolgreich gelöscht");
        } catch (error) {
          console.error("Fehler beim Löschen der Aufnahme:", error);
          toast.error("Fehler beim Löschen der Aufnahme");
        }
      };
      return (
        <>
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Löschvorgang</AlertDialogTitle>
                <AlertDialogDescription>
                  Möchstet du die Aufnahme wirklich löschen?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => deleteRec(recording.id)}
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
                  <Link
                    href={`/admin/aufzeichnungen/${recording.id}/bearbeiten`}
                  >
                    <Edit2Icon className="size-4 mr-2" /> Bearbeiten
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => duplicateRecording(recording.id)}
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
