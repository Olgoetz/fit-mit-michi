import { NavbarItem } from "@/types";
import { PersonIcon } from "@radix-ui/react-icons";
import { Contact, EuroIcon, HomeIcon, List } from "lucide-react";
import { string } from "zod";

export const IMAGE_MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
export const IMAGE_ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const SUBSCRIPTION_CONFIG = {
  standard: {
    productId: "prod_RLlawWPNr9Gzbj",
    priceId: "price_1QT43JFJZd14CrQ1xJpNRDe4",
  },
};

export const NavbarItems: NavbarItem[] = [
  { label: "Home", icon: HomeIcon, route: "/" },
  { label: "Kurse", icon: List, route: "/kurse" },
  { label: "Preise", icon: EuroIcon, route: "/#preise" },
  { label: "Über Mich", icon: PersonIcon, route: "/#ueber-mich" },
  { label: "Kontakt", icon: Contact, route: "/#kontakt" },
];

export const extraLinks: string[] = [
  "www.michaela-suessbauer.de",
  "www.kite-spirit-fun.de",
];
