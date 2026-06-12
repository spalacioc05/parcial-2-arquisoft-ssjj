import type { EmployeeAssignmentRequest } from "@/types/api.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  index: number;
  value: EmployeeAssignmentRequest;
  onChange: (next: EmployeeAssignmentRequest) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function EmployeeAssignmentForm({
  index,
  value,
  onChange,
  onRemove,
  canRemove,
}: Props) {
  function set<K extends keyof EmployeeAssignmentRequest>(
    key: K,
    v: EmployeeAssignmentRequest[K],
  ) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">
          Empleado #{index + 1}
        </p>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Quitar
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Pair label="Cédula">
          <Input
            value={value.cedula}
            onChange={(e) => set("cedula", e.target.value)}
          />
        </Pair>
        <Pair label="Nombre">
          <Input
            value={value.nombre}
            onChange={(e) => set("nombre", e.target.value)}
          />
        </Pair>
        <Pair label="Apellido">
          <Input
            value={value.apellido}
            onChange={(e) => set("apellido", e.target.value)}
          />
        </Pair>
        <Pair label="Correo">
          <Input
            type="email"
            value={value.correo}
            onChange={(e) => set("correo", e.target.value)}
          />
        </Pair>
        <Pair label="Cargo">
          <Input
            value={value.cargo}
            onChange={(e) => set("cargo", e.target.value)}
          />
        </Pair>
        <Pair label="Área">
          <Input
            value={value.area}
            onChange={(e) => set("area", e.target.value)}
          />
        </Pair>
        <Pair label="Rol en proyecto">
          <Input
            value={value.rolEnProyecto}
            onChange={(e) => set("rolEnProyecto", e.target.value)}
          />
        </Pair>
        <Pair label="Fecha asignación">
          <Input
            type="date"
            value={value.fechaAsignacion}
            onChange={(e) => set("fechaAsignacion", e.target.value)}
          />
        </Pair>
      </div>
    </div>
  );
}

function Pair({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
