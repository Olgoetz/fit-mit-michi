"use client";
import { AdminSidebarItems } from "@/components/AdminNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default function Admin() {
  return (
    <div>
      <h1 className="text-3xl text-center w-full">
        Willkommen zurück <span className="text-pink-700">Michaela</span>!
      </h1>

      <Separator className="my-10" />

      <div className="grid md:grid-cols-2 gap-2 items-center justify-center">
        {AdminSidebarItems.map((item) => (
          <Link key={item.label} href={item.route}>
            <Card className="bg-pink-700  mx-auto h-[150px] flex flex-col place-content-center place-items-center hover:bg-pink-700/50">
              <div className="flex flex-col items-center justify-center text-white gap-3">
                <item.Icon className="size-16" />
                <p>{item.label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
