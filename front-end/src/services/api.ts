import type {
  CreateProjectRequest,
  EmployeeProjectsResponse,
  ApiCallInfo,
  ProjectDetailResponse,
} from "@/types/api.types";

export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:8080";
export const API_ACCEPT =
  (import.meta.env.VITE_API_ACCEPT as string | undefined) ||
  "application/vnd.parcial.v1+json";

export interface ApiResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  errorMessage?: string;
  call: ApiCallInfo;
}

async function parseJsonSafe(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function getHealth(): Promise<
  ApiResult<{ status: string; service?: string }>
> {
  const url = `${API_URL}/api/health`;
  const call: ApiCallInfo = { method: "GET", url, accept: API_ACCEPT };
  try {
    const res = await fetch(url, { headers: { Accept: API_ACCEPT } });
    const data = await parseJsonSafe(res);
    return {
      ok: res.ok,
      status: res.status,
      data,
      call: { ...call, status: res.status },
      errorMessage: res.ok ? undefined : "Backend respondió con error",
    };
  } catch {
    return {
      ok: false,
      status: 0,
      call: { ...call, status: 0 },
      errorMessage: "No fue posible conectar con el backend",
    };
  }
}

export async function getProjectsByEmployeeCedula(
  cedula: string,
): Promise<ApiResult<EmployeeProjectsResponse>> {
  const url = `${API_URL}/api/proyectos?cedula=${encodeURIComponent(cedula)}`;
  const call: ApiCallInfo = { method: "GET", url, accept: API_ACCEPT };
  try {
    const res = await fetch(url, { headers: { Accept: API_ACCEPT } });
    const data = await parseJsonSafe(res);
    let errorMessage: string | undefined;
    if (!res.ok) {
      if (res.status === 400) errorMessage = "Debe ingresar una cédula válida";
      else if (res.status === 404)
        errorMessage = "No se encontró un empleado con esa cédula";
      else
        errorMessage =
          data?.message ?? `Error ${res.status} al consultar proyectos`;
    }
    return {
      ok: res.ok,
      status: res.status,
      data,
      errorMessage,
      call: { ...call, status: res.status },
    };
  } catch {
    return {
      ok: false,
      status: 0,
      call: { ...call, status: 0 },
      errorMessage: "No fue posible conectar con el backend",
    };
  }
}

export async function getProjectById(
  id: number,
): Promise<ApiResult<ProjectDetailResponse>> {
  const url = `${API_URL}/api/proyectos/${id}`;
  const call: ApiCallInfo = { method: "GET", url, accept: API_ACCEPT };
  try {
    const res = await fetch(url, { headers: { Accept: API_ACCEPT } });
    const data = await parseJsonSafe(res);
    return {
      ok: res.ok,
      status: res.status,
      data,
      call: { ...call, status: res.status },
      errorMessage: res.ok
        ? undefined
        : data?.message ?? `Error ${res.status} al consultar proyecto`,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      call: { ...call, status: 0 },
      errorMessage: "No fue posible conectar con el backend",
    };
  }
}

export async function createProject(
  payload: CreateProjectRequest,
): Promise<ApiResult<any>> {
  const url = `${API_URL}/api/proyectos`;
  const call: ApiCallInfo = { method: "POST", url, accept: API_ACCEPT };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: API_ACCEPT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await parseJsonSafe(res);
    let errorMessage: string | undefined;
    if (!res.ok) {
      if (res.status === 400)
        errorMessage =
          data?.message ?? "Datos inválidos. Verifique el formulario.";
      else if (res.status === 409)
        errorMessage = "Ya existe un proyecto con ese código";
      else errorMessage = data?.message ?? `Error ${res.status} al crear`;
    }
    return {
      ok: res.ok,
      status: res.status,
      data,
      errorMessage,
      call: { ...call, status: res.status },
    };
  } catch {
    return {
      ok: false,
      status: 0,
      call: { ...call, status: 0 },
      errorMessage: "No fue posible conectar con el backend",
    };
  }
}

export const SWAGGER_URL = `${API_URL}/swagger-ui/index.html`;
