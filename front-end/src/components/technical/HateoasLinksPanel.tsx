import type { HateoasLinks } from "@/types/api.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, ExternalLink } from "lucide-react";

interface Props {
  links?: HateoasLinks;
  title?: string;
}

export function HateoasLinksPanel({ links, title = "Enlaces HATEOAS" }: Props) {
  const entries = links ? Object.entries(links) : [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Link2 className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          Las respuestas del backend incluyen enlaces HATEOAS para navegar entre
          recursos relacionados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no hay enlaces. Realiza una consulta o crea un proyecto para verlos.
          </p>
        ) : (
          <ul className="divide-y divide-border rounded-lg border border-border">
            {entries.map(([rel, link]) => (
              <li
                key={rel}
                className="flex flex-col gap-1 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-mono text-xs font-semibold text-primary">
                  {rel}
                </span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 break-all text-xs text-foreground hover:underline"
                >
                  {link.href}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
