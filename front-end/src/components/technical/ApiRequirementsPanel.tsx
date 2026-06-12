import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Boxes,
  Braces,
  Link2,
  GitBranch,
  FileText,
  Container,
  Database,
  Server,
} from "lucide-react";

const ITEMS = [
  { icon: Boxes, label: "RESTful API" },
  { icon: Braces, label: "JSON" },
  { icon: Link2, label: "HATEOAS" },
  { icon: GitBranch, label: "Accept Header Versioning" },
  { icon: FileText, label: "Swagger / OpenAPI" },
  { icon: Container, label: "Docker" },
  { icon: Database, label: "PostgreSQL Supabase" },
  { icon: Server, label: "Spring Boot Backend" },
];

export function ApiRequirementsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Requisitos técnicos cumplidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5"
            >
              <Icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-xs font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
