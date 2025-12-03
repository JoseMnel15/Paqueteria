import {
  DailyReport,
  PackageRow,
  getDailyReport,
  getRecentPackages,
} from "@/lib/api";

const statusLabels: Record<string, { label: string; color: "green" | "yellow" | "gray" }> =
  {
    DELIVERED: { label: "Entregado", color: "green" },
    READY_FOR_PICKUP: { label: "Listo para entrega", color: "yellow" },
    RECEIVED: { label: "Recibido", color: "gray" },
    RETURNED: { label: "Devuelto", color: "gray" },
  };

export default async function DashboardPage() {
  const [report, recentDeliveries]: [DailyReport, PackageRow[]] = await Promise.all([
    getDailyReport(),
    getRecentPackages(),
  ]);

  const stats = [
    {
      title: "Paquetes pendientes",
      value: String(report.pending ?? 0),
      hint: "Resumen del día",
      icon: "pending_actions",
    },
    {
      title: "Entregados hoy",
      value: String(report.totalDelivered ?? 0),
      hint: "Movimientos cerrados",
      icon: "task_alt",
    },
    {
      title: "Nuevos paquetes",
      value: String(report.totalReceived ?? 0),
      hint: "Recepción del día",
      icon: "call_received",
    },
    {
      title: "Clientes activos",
      value: "128",
      hint: "+3 este mes",
      icon: "groups",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <span className="text-base font-medium">Dashboard</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-black tracking-tight">Bienvenido, John Doe!</p>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Aquí un resumen de la actividad de hoy.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              add_box
            </span>
            <span className="truncate">Registrar paquete</span>
          </button>
          <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-border-light bg-background-light px-4 text-sm font-bold leading-normal tracking-[0.015em] text-text-light dark:border-border-dark dark:bg-content-dark dark:text-text-dark">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              move_item
            </span>
            <span className="truncate">Despachar paquete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-border-light bg-content-light p-6 dark:border-border-dark dark:bg-content-dark"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                {card.title}
              </h3>
              <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                {card.icon}
              </span>
            </div>
            <p className="mt-2 text-4xl font-bold">{card.value}</p>
            <p className="mt-1 text-xs text-text-secondary-light dark:text-text-secondary-dark">
              {card.hint}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border-light bg-content-light dark:border-border-dark dark:bg-content-dark">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Entregas recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border-light text-sm dark:divide-border-dark">
            <thead className="bg-background-light dark:bg-background-dark">
              <tr>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
                  Tracking ID
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
                  Destinatario
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
                  Paquetería
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
                  Estado
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {recentDeliveries.map((item) => {
                const status = statusLabels[item.status] ?? statusLabels.RECEIVED;
                const pillColors =
                  status.color === "green"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                    : status.color === "yellow"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                      : "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200";

                return (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {item.trackingCode}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{item.recipient}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.courier}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillColors}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                      {item.date?.slice(0, 10) ?? '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
