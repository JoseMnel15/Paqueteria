"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { getSession, saveSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@local.test");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const disabled = useMemo(() => loading || !email || !password, [email, password, loading]);

  useEffect(() => {
    const session = getSession();
    if (session?.token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      // Validación mínima: si el backend no valida, forzamos credenciales del seed.
      if (email.trim().toLowerCase() !== "admin@local.test" || password !== "admin123") {
        throw new Error("Credenciales incorrectas");
      }
      saveSession({ token: result.accessToken, user: result.user });
      if (!remember) {
        // Sesión corta: limpiar al cerrar pestaña.
        window.addEventListener("beforeunload", () => localStorage.removeItem("paqueteria.auth"), { once: true });
      }
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <div className="flex flex-1 items-center justify-center p-4 lg:p-8">
        <main className="flex w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-lg dark:bg-background-dark/50">
          <div className="hidden w-2/5 lg:flex">
            <div
              className="w-full bg-cover bg-center bg-no-repeat"
              aria-label="Abstract map with delivery routes"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCx0-EDvbmFPIxl7lKxsrmwcbC_udf2OKJXJUj1qwQUmapGzaITRZ6PvK6RmuNmvU4pXbgUH35bE8n92DX8Pv_ClexTHm8NDXG9VEhQ3rAAanpEzjOmD7w-_KYeYR2_z590mWqQAmFUdsWJKfFRdHAMaijI2UuohzyTIfxvsA3GOTeW46pWbozYgVY40ZH8zxUE-aYX97CqD5eCngbsticrjDShW9y4__hCzSYvEb5sardJDQiWR4buSBdQJr1fc6BizqdWfKo5LCk')",
              }}
            />
          </div>
          <div className="flex w-full items-center justify-center px-6 py-12 sm:px-16 lg:w-3/5">
            <div className="w-full max-w-md">
              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-primary">inventory_2</span>
                    <p className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark">
                      Paqueteria Huetamo
                    </p>
                  </div>
                  <p className="text-base font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">
                    Bienvenido de vuelta, inicia sesión para continuar.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-2">
                    <p className="text-base font-medium leading-normal text-text-light dark:text-text-dark">
                      Usuario
                    </p>
                    <input
                      className="form-input h-14 w-full rounded-lg border border-border-light bg-slate-50 p-[15px] text-base font-normal text-text-light placeholder:text-text-secondary-light transition-colors focus:border-primary focus:outline-0 focus:ring-0 dark:border-slate-600 dark:bg-slate-800 dark:text-text-dark"
                      placeholder="Ingresa tu usuario"
                      name="username"
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <p className="text-base font-medium leading-normal text-text-light dark:text-text-dark">
                      Contraseña
                    </p>
                    <div className="flex w-full items-stretch rounded-lg">
                      <input
                        className="form-input h-14 w-full rounded-l-lg border border-border-light border-r-0 bg-slate-50 p-[15px] pr-2 text-base font-normal text-text-light placeholder:text-text-secondary-light transition-colors focus:border-primary focus:outline-0 focus:ring-0 dark:border-slate-600 dark:bg-slate-800 dark:text-text-dark"
                      placeholder="Ingresa tu contraseña"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="flex items-center justify-center rounded-r-lg border border-border-light border-l-0 bg-slate-50 px-4 text-text-secondary-light transition-colors hover:text-text-light dark:border-slate-600 dark:bg-slate-800 dark:text-text-secondary-dark dark:hover:text-text-dark"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        <span className="material-symbols-outlined">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </label>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <input
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700"
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      Recuérdame
                    </label>
                    <a className="text-sm font-medium text-primary hover:underline" href="#">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  {error ? (
                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-200">
                      <span className="material-symbols-outlined text-base">error</span>
                      <p className="font-medium">{error}</p>
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={disabled}
                  className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-bold leading-normal text-white transition-all duration-150 hover:-translate-y-[1px] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
