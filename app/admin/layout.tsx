import React from "react";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 gap-8 pr-4">
      <AdminNavbar />
      <div className="py-12 flex-grow">{children}</div>
    </main>
  );
}
