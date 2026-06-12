import type { ProjectAssignment } from "@/types/api.types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { formatCurrencyCOP, formatDate } from "@/utils/formatters";
import { ExternalLink, Calendar, Briefcase, DollarSign, UserCircle } from "lucide-react";

interface Props {
  project: ProjectAssignment;
}

export function ProjectCard({ project }: Props) {
  const selfLink = project._links?.self?.href;
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-mono text-muted-foreground">
              {project.codigo}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              {project.nombre}
            </h3>
          </div>
          <ProjectStatusBadge estado={project.estado} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{project.descripcion}</p>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Inicio:</span>
            <span>{formatDate(project.fechaInicio)}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Fin:</span>
            <span>{formatDate(project.fechaFin)}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Presupuesto:</span>
            <span className="font-medium">
              {formatCurrencyCOP(project.presupuesto)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Rol:</span>
            <span>{project.rolEnProyecto}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground sm:col-span-2">
            <UserCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Asignación:</span>
            <span>{formatDate(project.fechaAsignacion)}</span>
          </div>
        </div>
        {selfLink && (
          <a
            href={selfLink}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            self · {selfLink}
          </a>
        )}
      </CardContent>
    </Card>
  );
}
