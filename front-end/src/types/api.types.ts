export type ProjectStatus = "ACTIVO" | "EN_PAUSA" | "FINALIZADO" | "CANCELADO";

export interface HateoasLink {
  href: string;
}
export type HateoasLinks = Record<string, HateoasLink>;

export interface EmployeeSummary {
  cedula: string;
  nombreCompleto: string;
  correo: string;
  cargo: string;
  area: string;
}

export interface ProjectAssignment {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: ProjectStatus;
  presupuesto: number;
  rolEnProyecto: string;
  fechaAsignacion: string;
  _links?: HateoasLinks;
}

export interface EmployeeProjectDetail extends EmployeeSummary {
  rolEnProyecto: string;
  fechaAsignacion: string;
  _links?: HateoasLinks;
}

export interface ProjectDetailResponse {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: ProjectStatus;
  presupuesto: number;
  empleados: EmployeeProjectDetail[];
  _links?: HateoasLinks;
}

export interface EmployeeProjectsResponse {
  empleado: EmployeeSummary;
  cantidadProyectos: number;
  proyectos: ProjectAssignment[];
  _links?: HateoasLinks;
}

export interface EmployeeAssignmentRequest {
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  cargo: string;
  area: string;
  rolEnProyecto: string;
  fechaAsignacion: string;
}

export interface CreateProjectRequest {
  codigo: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: ProjectStatus;
  presupuesto: number;
  empleados: EmployeeAssignmentRequest[];
}

export interface ApiError {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
}

export interface ApiCallInfo {
  method: string;
  url: string;
  accept: string;
  status?: number;
}
