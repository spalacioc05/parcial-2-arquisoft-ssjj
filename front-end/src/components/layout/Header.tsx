import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface HeaderProps {
  backendStatus: "checking" | "up" | "down";
}

export function Header({ backendStatus }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Gestión de Proyectos Empresariales
            </h1>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Parcial 2 · Arquitectura de Software
            </p>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Consulta proyectos por cédula y registra proyectos con empleados
              asignados. Frontend en React consumiendo una API REST en Spring Boot.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">RESTful API</Badge>
              <Badge variant="secondary">HATEOAS</Badge>
              <Badge variant="secondary">Accept Header Versioning</Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
