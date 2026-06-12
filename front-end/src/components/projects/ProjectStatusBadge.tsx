import type { ProjectStatus } from "@/types/api.types";

interface Props {
  estado: ProjectStatus | string;
}

const STYLES: Record<string, string> = {
  ACTIVO: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  EN_PAUSA: "bg-amber-50 text-amber-800 ring-amber-600/20",
  FINALIZADO: "bg-blue-50 text-blue-700 ring-blue-600/20",
  CANCELADO: "bg-red-50 text-red-700 ring-red-600/20",
};

export function ProjectStatusBadge({ estado }: Props) {
  const cls = STYLES[estado] ?? "bg-muted text-muted-foreground ring-border";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}
    >
      {estado}
    </span>
  );
}
