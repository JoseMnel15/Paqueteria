"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, getSession } from "@/lib/auth";

export function Topbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("John Doe");
  const [role, setRole] = useState("Administrador");

  useEffect(() => {
    const session = getSession();
    if (session?.user) {
      setUserName(session.user.name || session.user.email);
      setRole(session.user.role === "ADMIN" ? "Administrador" : "Recepción");
    }
  }, []);

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-light bg-content-light px-6 dark:border-border-dark dark:bg-content-dark">
      <div className="flex items-center gap-4" />
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium">{userName}</span>
          <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{role}</span>
        </div>
        <div
          className="size-10 rounded-full bg-cover bg-center bg-no-repeat"
          aria-label="Avatar"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCx47yrCKX_zgOL0bEvL5mwW44YY-F_ofTzr86N0t9zgfjnBlOdbWifXQN30I8EXtXZG5cABJGgE2waAO9g8YPgngzPIVn6EavTy4k_NifP-bOD6T5nY8xLFDPWIpcpgLxldjueuMohtsbUIKc4KpB-mZ8lS46FL26xVIASDMF178twZ5zF4HOpE2OxPoyZ1043cVmA_R7F34uLbfparUxYkRGc0x6I25C9LOIAC_RO79E75wHfnGaRwdr1ExO113oN09EqctoRwA')",
          }}
        />
        <button
          onClick={handleLogout}
          className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white"
        >
          <span className="truncate">Salir</span>
        </button>
      </div>
    </header>
  );
}
