import { Customer } from "@prisma/client";
import { decl } from "postcss";
import React from "react";

declare type ActionState = {
  data?: any; // Optional data
  error?: any;
  errorCode?: "VALIDATION_ERROR" | "INTERNAL_ERROR";
  message: string;
  status: "SUCCESS" | "ERROR" | "INITIAL";
  validationErrors?: Record<string, string>;
};

declare type AdminSidebarItem = {
  className?: string;
  Icon: React.ElementType;
  iconStyles?: string;
  label: string;
  route: string;
};

declare interface BackendErrorProps {
  route: string;
  message?: string;
  directionText: string;
}

type BookingItem = Recording | Stream;

declare interface BookingCardListProps {
  isSubscribed?: boolean;
  items: BookingItem[];
  query: string;
}

declare interface BookingCardProps {
  item: BookingItem;
}

declare interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

declare type Customer = Omit<Customer, "id">;

declare interface EmailWrapperProps {
  bookingText: string;
  children: React.ReactNode;
  imageUrl: string;
  invoiceUrl: string;
  customer: string;
}

declare interface EmailProps {
  stream?: Stream;
  recording?: Recording;
  invoiceUrl: string;
  customer: string;
}

declare interface FileUploaderProps {
  type: "image" | "video";
  onUploadComplete: (url: string) => void;
}

declare type LogLevel = "info" | "error" | "warning" | "debug";

declare interface LogOptions {
  level: LogLevel;
  filePath: string;
  message: string;
  data?: any;
}

declare interface ModalProps {
  props?: props;
  open: boolean;
  buttonLabel: string;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
}

declare type NavbarItem = {
  label: string;
  icon: React.ElementType;
  route: string;
};

declare interface NavbarProps {
  userId: string | null;
  stripeCustomerId: string | undefined | null;
  validSubscription: boolean | undefined;
}

declare type PriceModelContent = {
  title: string;
  description: string;
  price: string;
  bullets: string[];
  popular?: boolean;
  subscriptionType?: string;
};

declare type ProductType = "recording" | "stream";

declare interface RecordingFormProps {
  breadcrumbs: Breadcrumb[];
  description: string;
  recording?: Recording;
}

declare interface StreamFormProps {
  breadcrumbs: Breadcrumb[];
  description: string;
  stream?: Stream;
}

declare interface UpdateSubscriptionProps {
  stripeSubscriptionId: string;
  stripeSubscriptionStatus: string;
  stripeCurrentPeriodEnd: Date;
  stripeCustomerId: string;
  stripePriceId: string;
}
