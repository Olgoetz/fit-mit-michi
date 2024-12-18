import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen items-center justify-center space-y-6 ">
      {children}
    </section>
  );
}
