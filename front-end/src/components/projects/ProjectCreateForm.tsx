import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle2,
  FilePlus,
  Loader2,
  Plus,
  Sparkles,
} from "lucide-react";
import type {
  CreateProjectRequest,
  EmployeeAssignmentRequest,
  HateoasLinks,
  ProjectStatus,
  ApiCallInfo,
} from "@/types/api.types";
import { createProject, API_URL, API_ACCEPT } from "@/services/api";
import { EmployeeAssignmentForm } from "./EmployeeAssignmentForm";
import { ApiCallBox } from "@/components/technical/ApiCallBox";
import { HateoasLinksPanel } from "@/components/technical/HateoasLinksPanel";

interface Props {
  onLinksReceived: (links?: HateoasLinks) => void;
}

const STATUSES: ProjectStatus[] = [
  "ACTIVO",
  "EN_PAUSA",
  "FINALIZADO",
  "CANCELADO",
];

function emptyEmployee(): EmployeeAssignmentRequest {
  return {
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    cargo: "",
    area: "",
    rolEnProyecto: "",
    fechaAsignacion: "",
  };
}

function emptyProject(): CreateProjectRequest {
  return {
    codigo: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "ACTIVO",
    presupuesto: 0,
    empleados: [emptyEmployee()],
  };
}

const SAMPLE: CreateProjectRequest = {
  codigo: "PRY-004",
  nombre: "Sistema de Gestión Documental",
  descripcion: "Sistema para administrar documentos internos de la empresa.",
  fechaInicio: "2026-06-15",
  fechaFin: "2026-09-30",
  estado: "ACTIVO",
  presupuesto: 12000000,
  empleados: [
    {
      cedula: "1001234567",
      nombre: "Santiago",
      apellido: "Palacio",
      correo: "santiago.palacio@empresa.com",
      cargo: "Desarrollador Backend",
      area: "Tecnología",
      rolEnProyecto: "Desarrollador Principal",
      fechaAsignacion: "2026-06-15",
    },
  ],
};

export function ProjectCreateForm({ onLinksReceived }: Props) {
  const [form, setForm] = useState<CreateProjectRequest>(emptyProject());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<any | null>(null);
  const [call, setCall] = useState<ApiCallInfo | undefined>();
  const [validation, setValidation] = useState<string | null>(null);

  function set<K extends keyof CreateProjectRequest>(
    key: K,
    v: CreateProjectRequest[K],
  ) {
    setForm((f) => ({ ...f, [key]: v }));
  }

  function validate(): string | null {
    if (!form.codigo.trim()) return "El código es obligatorio.";
    if (!form.nombre.trim()) return "El nombre es obligatorio.";
    if (!form.fechaInicio) return "La fecha de inicio es obligatoria.";
    if (form.presupuesto < 0) return "El presupuesto debe ser mayor o igual a cero.";
    if (form.fechaFin && form.fechaFin < form.fechaInicio)
      return "La fecha fin no puede ser menor que la fecha inicio.";
    if (!form.empleados.length) return "Debe agregar al menos un empleado.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const v = validate();
    setValidation(v);
    if (v) return;
    setLoading(true);
    const res = await createProject(form);
    setCall(res.call);
    if (res.ok) {
      setSuccess(res.data ?? { status: res.status });
      onLinksReceived(res.data?._links);
    } else {
      setError(res.errorMessage ?? "Error desconocido");
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <FilePlus className="h-5 w-5 text-primary" />
          Crear nuevo proyecto
        </CardTitle>
        <CardDescription>
          Registra un proyecto con la información general y los empleados
          asignados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setForm(structuredClone(SAMPLE))}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Cargar ejemplo
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setForm(emptyProject());
                setError(null);
                setSuccess(null);
                setValidation(null);
                setCall(undefined);
              }}
            >
              Limpiar
            </Button>
          </div>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Información del proyecto
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Pair label="Código">
                <Input
                  value={form.codigo}
                  onChange={(e) => set("codigo", e.target.value)}
                  placeholder="PRY-001"
                />
              </Pair>
              <Pair label="Nombre">
                <Input
                  value={form.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                />
              </Pair>
              <Pair label="Descripción" full>
                <Textarea
                  value={form.descripcion}
                  onChange={(e) => set("descripcion", e.target.value)}
                  rows={3}
                />
              </Pair>
              <Pair label="Fecha inicio">
                <Input
                  type="date"
                  value={form.fechaInicio}
                  onChange={(e) => set("fechaInicio", e.target.value)}
                />
              </Pair>
              <Pair label="Fecha fin">
                <Input
                  type="date"
                  value={form.fechaFin}
                  onChange={(e) => set("fechaFin", e.target.value)}
                />
              </Pair>
              <Pair label="Estado">
                <Select
                  value={form.estado}
                  onValueChange={(v) => set("estado", v as ProjectStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Pair>
              <Pair label="Presupuesto (COP)">
                <Input
                  type="number"
                  min={0}
                  value={form.presupuesto}
                  onChange={(e) =>
                    set("presupuesto", Number(e.target.value) || 0)
                  }
                />
              </Pair>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Empleados asignados
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  set("empleados", [...form.empleados, emptyEmployee()])
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar empleado
              </Button>
            </div>
            <div className="space-y-3">
              {form.empleados.map((emp, i) => (
                <EmployeeAssignmentForm
                  key={i}
                  index={i}
                  value={emp}
                  canRemove={form.empleados.length > 1}
                  onChange={(next) => {
                    const arr = [...form.empleados];
                    arr[i] = next;
                    set("empleados", arr);
                  }}
                  onRemove={() => {
                    set(
                      "empleados",
                      form.empleados.filter((_, idx) => idx !== i),
                    );
                  }}
                />
              ))}
            </div>
          </section>

          <div className="rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs">
            <div>
              <span className="text-muted-foreground">Endpoint: </span>
              <span className="text-foreground">POST /api/proyectos</span>
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

          {validation && (
            <Alert variant="destructive">
              <AlertTitle>Validación</AlertTitle>
              <AlertDescription>{validation}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FilePlus className="mr-2 h-4 w-4" />
              )}
              Crear proyecto
            </Button>
          </div>

          {call && <ApiCallBox call={call} title="Última petición" />}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>No se pudo crear el proyecto</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <div className="space-y-3">
              <Alert>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertTitle>Proyecto creado correctamente</AlertTitle>
                <AlertDescription>
                  El backend respondió con éxito (HTTP {call?.status}).
                </AlertDescription>
              </Alert>
              <div className="rounded-lg border border-border bg-background p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Respuesta del backend
                </p>
                <pre className="max-h-72 overflow-auto rounded bg-muted/50 p-3 font-mono text-xs text-foreground">
                  {JSON.stringify(success, null, 2)}
                </pre>
              </div>
              {success?._links && (
                <HateoasLinksPanel
                  links={success._links}
                  title="HATEOAS de la creación"
                />
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

function Pair({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
