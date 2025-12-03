export default function LoginPage() {
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
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-primary">inventory_2</span>
                    <p className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark">
                      Paqueteria
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
                        type="password"
                        name="password"
                        autoComplete="current-password"
                      />
                      <div className="flex items-center justify-center rounded-r-lg border border-border-light border-l-0 bg-slate-50 px-4 text-text-secondary-light dark:border-slate-600 dark:bg-slate-800 dark:text-text-secondary-dark">
                        <span className="material-symbols-outlined">visibility</span>
                      </div>
                    </div>
                  </label>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <input
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700"
                        type="checkbox"
                      />
                      Recuérdame
                    </label>
                    <a className="text-sm font-medium text-primary hover:underline" href="#">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <button className="flex h-14 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-bold leading-normal text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
