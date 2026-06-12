import type { ApiCallInfo } from "@/types/api.types";

interface Props {
  call?: ApiCallInfo;
  title?: string;
}

function statusColor(status?: number) {
  if (!status) return "text-muted-foreground";
  if (status >= 200 && status < 300) return "text-emerald-700";
  if (status >= 400 && status < 500) return "text-amber-700";
  return "text-destructive";
}

export function ApiCallBox({ call, title = "Detalle técnico" }: Props) {
  if (!call) return null;
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/40 p-3 font-mono text-xs">
      <p className="mb-2 text-[10px] font-sans uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="space-y-1">
        <div>
          <span className="text-muted-foreground">Method: </span>
          <span className="font-semibold text-foreground">{call.method}</span>
        </div>
        <div className="break-all">
          <span className="text-muted-foreground">URL: </span>
          <span className="text-foreground">{call.url}</span>
        </div>
        <div className="break-all">
          <span className="text-muted-foreground">Accept: </span>
          <span className="text-foreground">{call.accept}</span>
        </div>
        {call.status !== undefined && (
          <div>
            <span className="text-muted-foreground">Status: </span>
            <span className={`font-semibold ${statusColor(call.status)}`}>
              {call.status === 0 ? "Sin conexión" : call.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
