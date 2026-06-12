import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, BookOpen, Eraser, ExternalLink } from "lucide-react";
import { API_ACCEPT, API_URL, SWAGGER_URL, getHealth } from "@/services/api";

interface Props {
  onClear: () => void;
}

export function ArchitectureInfoPanel({ onClear }: Props) {
  const [health, setHealth] = useState<{
    status: number;
    body?: any;
    ok: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    setLoading(true);
    const res = await getHealth();
    setHealth({ status: res.status, body: res.data, ok: res.ok });
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Documentación y utilidades</CardTitle>
        <CardDescription>
          Accesos directos a la documentación de la API y configuración actual.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="default" size="sm">
            <a href={SWAGGER_URL} target="_blank" rel="noreferrer noopener">
              <BookOpen className="mr-2 h-4 w-4" />
              Ver documentación Swagger
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={check}
            disabled={loading}
          >
            <Activity className="mr-2 h-4 w-4" />
            Probar Health Check
          </Button>
          <Button variant="ghost" size="sm" onClick={onClear}>
            <Eraser className="mr-2 h-4 w-4" />
            Limpiar resultados
          </Button>
        </div>

        <dl className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-background p-4 text-sm sm:grid-cols-2">
          <Info label="API URL" value={API_URL} mono />
          <Info label="Accept Header" value={API_ACCEPT} mono />
          <Info label="Consulta" value="GET /api/proyectos?cedula={cedula}" mono />
          <Info label="Creación" value="POST /api/proyectos" mono />
        </dl>

        {health && (
          <Alert variant={health.ok ? "default" : "destructive"}>
            <AlertTitle>
              Health Check: HTTP {health.status === 0 ? "Sin conexión" : health.status}
            </AlertTitle>
            <AlertDescription>
              <pre className="mt-2 overflow-auto rounded bg-muted/50 p-2 font-mono text-xs">
                {JSON.stringify(health.body ?? {}, null, 2)}
              </pre>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function Info({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd
        className={`mt-0.5 break-all text-sm text-foreground ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
