"use client";

import { cn } from "@/lib/utils";
import { AdminSidebarItem } from "@/types";
import {
  HomeIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
  VideoIcon,
  WebcamIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const AdminSidebarItems: AdminSidebarItem[] = [
  {
    label: "Home",
    Icon: HomeIcon,

    route: "/admin",
  },
  {
    label: "High-Quality",
    Icon: StarIcon,
    route: "/admin/high-quality",
  },
  {
    label: "Streams",
    Icon: WebcamIcon,
    route: "/admin/streams",
  },
  {
    label: "Aufzeichungen",
    Icon: VideoIcon,
    route: "/admin/aufzeichnungen",
  },
  {
    label: "User",
    Icon: UserIcon,
    route: "/admin/user",
  },
  {
    label: "Einstellungen",
    Icon: SettingsIcon,
    route: "/admin/settings",
  },
];

const AdminSidebar = () => {
  const pathName = usePathname();
  return (
    <nav className="left-0 top-0 sticky flex flex-col h-screen w-fit text-white bg-pink-700 max-w-[300px]">
      <h1 className="text-center py-12 text-3xl">FitMitMichi</h1>
      <ul className="flex flex-col flex-grow gap-4 px-3   ">
        {AdminSidebarItems.map((item) => (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              "p-4 rounded-md border flex items-center justify-center gap-x-2 hover:bg-white hover:text-pink-700",

              item.route === pathName && "bg-white text-pink-700"
            )}
          >
            <item.Icon className={item.iconStyles} />
            <p>{item.label}</p>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default AdminSidebar;
