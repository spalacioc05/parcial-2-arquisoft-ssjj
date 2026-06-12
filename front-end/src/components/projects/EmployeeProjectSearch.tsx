import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Search, FileSearch, Inbox } from "lucide-react";
import {
  getProjectsByEmployeeCedula,
  API_ACCEPT,
  API_URL,
} from "@/services/api";
import type { EmployeeProjectsResponse, HateoasLinks } from "@/types/api.types";
import { ProjectCard } from "./ProjectCard";
import { ApiCallBox } from "@/components/technical/ApiCallBox";
import type { ApiCallInfo } from "@/types/api.types";

interface Props {
  onLinksReceived: (links?: HateoasLinks) => void;
}

export function EmployeeProjectSearch({ onLinksReceived }: Props) {
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EmployeeProjectsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [call, setCall] = useState<ApiCallInfo | undefined>();
  const [searched, setSearched] = useState(false);

  const endpointPreview = `GET /api/proyectos?cedula=${cedula || "{cedula}"}`;

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!cedula.trim()) {
      setError("Debe ingresar una cédula válida");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    setSearched(true);
    const res = await getProjectsByEmployeeCedula(cedula.trim());
    setCall(res.call);
    if (res.ok && res.data) {
      setData(res.data);
      onLinksReceived(res.data._links);
    } else {
      setError(res.errorMessage ?? "Error desconocido");
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileSearch className="h-5 w-5 text-primary" />
          Consultar proyectos por empleado
        </CardTitle>
        <CardDescription>
          Ingrese la cédula de un empleado para ver los proyectos asignados.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="cedula">Cédula</Label>
            <Input
              id="cedula"
              inputMode="numeric"
              placeholder="Ej. 1001234567"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Consultar proyectos
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => setCedula("1001234567")}
            >
              Usar cédula de prueba
            </Button>
          </div>
        </form>

        <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-3 text-xs font-mono">
          <div>
            <span className="text-muted-foreground">Endpoint: </span>
            <span className="text-foreground">{endpointPreview}</span>
          </div>
          <div className="break-all">
            <span className="text-muted-foreground">Base: </span>
            <span className="text-foreground">{API_URL}</span>
          </div>
          <div className="break-all">
            <span className="text-muted-foreground">Accept: </span>
            <span className="text-foreground">{API_ACCEPT}</span>
          </div>
        </div>

        {call && <ApiCallBox call={call} title="Última petición" />}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>No se pudo completar la consulta</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {data && (
          <div className="space-y-5">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Empleado
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {data.empleado.nombreCompleto}
              </h3>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <Field label="Cédula" value={data.empleado.cedula} />
                <Field label="Correo" value={data.empleado.correo} />
                <Field label="Cargo" value={data.empleado.cargo} />
                <Field label="Área" value={data.empleado.area} />
                <Field
                  label="Cantidad de proyectos"
                  value={String(data.cantidadProyectos)}
                />
              </dl>
            </div>

            {data.proyectos && data.proyectos.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {data.proyectos.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background py-10 text-center">
                <Inbox className="h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Este empleado no tiene proyectos asignados.
                </p>
              </div>
            )}
          </div>
        )}

        {!loading && !data && !error && searched && (
          <p className="text-sm text-muted-foreground">Sin resultados.</p>
        )}
      </CardContent>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}
