export function formatCurrencyCOP(value: number | string | undefined | null): string {
  const n = typeof value === "string" ? Number(value) : value ?? 0;
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n as number);
}

export function formatDate(value: string | undefined | null): string {
  if (!value) return "—";
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat("es-CO", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  } catch {
    return value;
  }
}
