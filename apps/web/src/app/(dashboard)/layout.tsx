"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../components/sidebar";
import { Topbar } from "../components/topbar";
import { getSession } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session?.token) {
      router.replace("/login");
      return;
    }
    setChecking(false);
  }, [router]);

  if (checking) {
    return <div className="flex h-screen items-center justify-center text-sm text-text-secondary-light dark:text-text-secondary-dark">Verificando sesión...</div>;
  }

  return (
    <div className="flex h-screen w-full bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
